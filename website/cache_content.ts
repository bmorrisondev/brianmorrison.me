import * as dotenv from 'dotenv'
import fs from 'fs'
import slugify from 'slugify'
import { Client } from '@notionhq/client'
import NotionToHtmlClient from './utils/notionToHtml'
import { DatabaseObjectResponse, PageObjectResponse, PartialDatabaseObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

dotenv.config()

const baseContentPath = './app/content/notion'
const baseImagePath = './public'

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const converter = new NotionToHtmlClient(process.env.NOTION_TOKEN)

export async function run() {
  await loadNotionContent('notionPost', process.env.NOTION_CMS_DBID as string)
  await loadNotionContent('notionPortfolioItem', process.env.NOTION_PORTFOLIOITEMS_DBID as string)
  await loadNotionContent('notionSeries', process.env.NOTION_SERIES_DBID as string)
  await loadNotionContent('notionEmploymentHistoryItem', process.env.NOTION_EMP_HIST_DBID as string)
  await loadNotionContent('notionTag', process.env.NOTION_TAGS_DBID as string)
  await loadNotionContent('notionPage', process.env.NOTION_PAGES_DBID as string)
  await loadNotionContent('notionExternalContent', process.env.NOTION_EXTCONTENT_DBID as string)
}

async function loadNotionContent(type: string, dbid: string) {
  console.log('loading type:', type)
  const { results } = await notion.databases.query({
    database_id: dbid
  })

  await processNotionContent(type, results)
}

type NotionPosts = (PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse)[]

async function processNotionContent(type: string, notionPosts: NotionPosts) {
  // load cach
  let needsRecache = false
  const cached = loadCachedContent(type)
  const normalized = []

  for(let i = 0; i < notionPosts.length; i++) {
    const p = notionPosts[i]

    // get last edited time
    const lastEdited = Math.floor(new Date(p.last_edited_time).getTime() / 1000)
    const cachedItem = cached.find(c => c.id === p.id)
    if(cachedItem && cachedItem.cachedOn >= lastEdited) {
      normalized.push(cachedItem)
      continue
    }

    const n = {
      id: p.id,
      notion_id: p.id
    }

    const slugOpts = {
      lower: true,
      strict: true
    }
    const filesProps = []

    Object.keys(p.properties).forEach(k => {
      const prop = p.properties[k]
      let fieldName = camelize(k)
      if(prop.type === "title" && prop.title.length > 0) {
        n.title = ""
        if(fieldName !== "title") {
          n[fieldName] = ""
        }
        n[fieldName] = ""
        prop.title.forEach(t => {
          if(fieldName !== "title") {
            n[fieldName] += t.text.content
          }
          n["title"] += t.text.content
        })
      }

      if(prop.type === "date" && prop.date) {
        if(prop.date.end) {
          n[fieldName] = {
            start: new Date(prop.date.start),
            end: new Date(prop.date.end)
          }
        } else {
          n[fieldName] = new Date(prop.date.start)
        }
      }

      if(prop.type === "rich_text") {
        n[fieldName] = ""
        if(fieldName === "slug") {
          if(prop.rich_text.length > 0) {
            n.slug = prop.rich_text[0].text.content
          }
        } else if(prop.rich_text.length > 0) {
          // TODO: Flatten this
          n[fieldName] = prop.rich_text[0].text.content
        }
      }

      if(prop.type === "status") {
        n[fieldName] = ""
        if(prop?.status?.name) {
          n[fieldName] = prop.status.name
        }
      }

      if(prop.type === "url") {
        n[fieldName] = prop.url
      }

      if(prop.type === "select" && prop.select?.name) {
        n[fieldName] = {
          slug: slugify(prop.select.name, slugOpts),
          name: prop.select.name
        }
      }

      if(prop.type === "multi_select") {
        n[fieldName] = []
        prop.multi_select.forEach(el => n[fieldName].push(el.name))
      }

      if(prop.type === "relation") {
        fieldName = `relation_${fieldName}`
        n[fieldName] = []
        prop.relation.forEach(el => n[fieldName].push(el.id))
      }

      if(prop.type === "number") {
        n[fieldName] = prop.number
      }

      // This is deferred to make sure the slug is set first
      if(prop.type === "files" && prop?.files?.length > 0) {
        filesProps.push({
          fieldName,
          prop
        })
      }

      if(prop.type === "checkbox") {
        n[fieldName] = prop.checkbox
      }
    }) // end loop

    if(!n.title) {
      console.warn("post does not have title:", n)
      continue
    }

    // Setup slug
    if(!n.slug) {
      n.slug = slugify(n.title, slugOpts)
    }

    // Now that the slug is set, cache files
    for(let j = 0; j < filesProps.length; j++) {
      const { fieldName, prop } = filesProps[j]
      n[fieldName] = await cacheFilesProp(n.slug, prop)
    }

    // Get page
    const { html, raw } = await converter.generate(p.id, { html: true, raw: true})
    n.html = html

    if(n.html.includes("wpms.brianmorrison.me")) {
      console.log("might have an external image:", n.title)
    }

    // Cache images
    n.html = await cacheImagesAndUpdateHtml(n.slug, n.html)

    // Cache featured image
    if(p.cover?.file?.url) {
      n.featuredImage = await cacheImage(n.slug, p.cover?.file?.url)
    }

    // Cache post icon
    if(p.icon?.file?.url) {
      n.icon = await cacheImage(n.slug, p.icon?.file?.url)
    }

    if(!n.excerpt) {
      if (raw.length > 120) {
        n.excerpt = raw.slice(0, 117) + "..."
      } else {
        n.excerpt = raw
      }
    }

    n.cachedOn = Math.floor(new Date().getTime() / 1000)

    // Add to putput
    normalized.push(n)

    // If we got to this point, it needs to be recached
    needsRecache = true
  }

  if(needsRecache) {
    saveCachedContent(type, normalized)
  }

  return normalized
}

async function cacheFilesProp(slug, prop) {
  const srcs = []
  for(let i = 0; i < prop.files.length; i++) {
    const file = prop.files[i]
    if(file?.file?.url) {
      const src = await cacheImage(slug, file.file.url)
      srcs.push(src)
    }
  }
  return srcs
}

// TODO: Export this
// #region Utils

function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word: string, index: number) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

// #endregion

// TODO: Export this into a new file
// #region Caching

function loadCachedContent(type: string) {
  const path = `${baseContentPath}/${type}.json`

  try {
    if (fs.existsSync(path)) {
      const str = fs.readFileSync(path)
      return JSON.parse(str)
    }
  } catch(err) {
    console.error(err)
  }

  return []
}

function saveCachedContent(type: string, content: object) {
  const path = `${baseContentPath}/${type}.json`
  fs.writeFileSync(path, JSON.stringify(content), 'utf8');
}

async function cacheImagesAndUpdateHtml(slug: string, html: string) {
  const regexp = /<img.*?src=['"](.*?)['"].*?>/g;
  const matches = [...html.matchAll(regexp)];
  const imgUrls: string[] = []
  matches.forEach(m => {
    if(m[1]) {
      imgUrls.push(m[1])
    }
  })

  for(let i = 0; i < imgUrls.length; i++) {
    const imageUrl = imgUrls[i]

    // Cache images and replace img url in the html
    const src = await cacheImage(slug, imageUrl)
    html = html.replace(imageUrl, src)
  }

  return html
}

async function cacheImage(slug: string, imageUrl: string) {
  const spl = imageUrl.split("/")
  const fileName = `${spl[spl.length-2]}-${spl[spl.length - 1].split("?")[0]}`
  let imagePath = `/img/n/${slug}`
  const downloadPath = baseImagePath + imagePath
  const filePath = downloadPath + `/${fileName}`

  // If the file doesnt exist, make the dir & download the file
  if(!fs.existsSync(filePath)) {
    await fs.promises.mkdir(downloadPath, { recursive: true })
    await downloadImage(imageUrl, filePath)
  }

  // Return the value to use in `src`
  return imagePath += `/${fileName}`
}

const downloadImage = async (url: string, path: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.promises.writeFile(path, buffer);
}

// #endregion

;(async() => {
  await run()
})()