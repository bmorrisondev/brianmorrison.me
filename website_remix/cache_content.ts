import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import slugify from 'slugify'
import { Client } from '@notionhq/client'
import NotionToHtmlClient from './utils/notionToHtml'

dotenv.config()

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const converter = new NotionToHtmlClient(process.env.NOTION_TOKEN)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type notionPost implements Node {
      series: [notionSeries] @link(by: "notion_id", from: "relation_series")
    }
    type notionSeries implements Node {
      posts: [notionPost] @link(by: "notion_id", from: "relation_posts")
    }
    type notionEmploymentHistoryItem implements Node {
      notableProjects: [notionPortfolioItem] @link(by: "notion_id", from: "relation_notableProjects")
    }
    type notionPortfolioItem implements Node {
      skillsUsed: [notionTag] @link(by: "notion_id", from: "relation_skillsUsed")
      job: [notionEmploymentHistoryItem] @link(by: "notion_id", from: "relation_job")
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  await loadNotionContent('notionPost', process.env.NOTION_CMS_DBID, actions, createNodeId, createContentDigest)
  await loadNotionContent('notionPortfolioItem', process.env.NOTION_PORTFOLIOITEMS_DBID, actions, createNodeId, createContentDigest)
  await loadNotionContent('notionSeries', process.env.NOTION_SERIES_DBID, actions, createNodeId, createContentDigest)
  await loadNotionContent('notionEmploymentHistoryItem', process.env.NOTION_EMP_HIST_DBID, actions, createNodeId, createContentDigest)
  await loadNotionContent('notionTag', process.env.NOTION_TAGS_DBID, actions, createNodeId, createContentDigest)
  await loadNotionContent('notionPage', process.env.NOTION_PAGES_DBID, actions, createNodeId, createContentDigest)
  await loadNotionContent('notionExternalContent', process.env.NOTION_EXTCONTENT_DBID, actions, createNodeId, createContentDigest)

  // await loadCategories()
};

// async function loadCategories({ graphql, reporter }) {
//   let categories = await getNotionPostCategories()
// }

async function loadNotionContent(type, dbid, actions, createNodeId, createContentDigest) {
  console.log('loading type:', type)
  const { results } = await notion.databases.query({
    database_id: dbid
  })

  const normalized = await processNotionContent(type, results)

  normalized.forEach(n => {
    actions.createNode({
      ...n,
      id: createNodeId(n.id),
      internal: {
        type,
        contentDigest: createContentDigest(n)
      }
    })
  })
}

async function processNotionContent(type, notionPosts) {
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

exports.createPages = async gatsbyUtilities => {
  try {
    const notionPosts = await getNotionPosts(gatsbyUtilities)
    if (!notionPosts.length) {
      return
    }
    await createIndividualBlogPostPages({ posts: notionPosts, gatsbyUtilities })

    const portfolioItems = await getPortfolioItems(gatsbyUtilities)
    if (!portfolioItems.length) {
      return
    }
    await createIndividualPortfolioItemPages({ portfolioItems, gatsbyUtilities })

    const pages = await getNotionPages(gatsbyUtilities)
    if (!pages.length) {
      return
    }
    await createIndividualNotionPages({ pages, gatsbyUtilities })

    // const postCategories = await getNotionPostCategories(gatsbyUtilities)
    // if (!portfolioItems.length) {
    //   return
    // }
    // await createCategoryPages({ postCategories, gatsbyUtilities })`
  } catch (err) {
    console.error(err)
  }
}

async function getNotionPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query NotionPosts {
      allNotionPost(sort: {publishOn: DESC}) {
        edges {
          previous {
            id
          }
          post: node {
            id
            slug
          }
          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allNotionPost.edges
}


async function getNotionPostCategories({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query NotionPostCategories {
      allNotionPost {
        edges {
          post: node {
            category {
              name
              slug
            }
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  const categories = []
  graphqlResult.data.allNotionPost.edges.forEach(edge => {
    const { post } = edge
    if(post.category) {
      const existing = categories.find(c => c.slug === post.category.slug)
      if(!existing) {
        categories.push(post.category)
      }
    }
  })
  return categories
}

const createIndividualBlogPostPages = async function ({ posts, gatsbyUtilities }) {
    await Promise.all(
      posts.map(({ previous, post, next }) =>
        gatsbyUtilities.actions.createPage({
          path: `/blog/${post.slug}`,
          component: path.resolve(`./src/templates/blog-post.tsx`),
          context: {
            id: post.id,
            previousPostId: previous ? previous.id : null,
            nextPostId: next ? next.id : null,
          },
        }
      )
    )
  )
}

async function getPortfolioItems({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query NotionPortfolioItems {
      allNotionPortfolioItem(sort: {date: DESC}) {
        edges {
          post: node {
            id
            slug
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allNotionPortfolioItem.edges
}

const createIndividualPortfolioItemPages = async ({ portfolioItems, gatsbyUtilities }) => {
  await Promise.all(
    portfolioItems.map(({ previous, post, next }) =>
      gatsbyUtilities.actions.createPage({
        path: `/portfolio/${post.slug}`,
        component: path.resolve(`./src/templates/portfolio-item.tsx`),
        context: {
          id: post.id
        },
      })
    )
  )
}

async function getPortfolioItems({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query NotionPortfolioItems {
      allNotionPortfolioItem(sort: {date: DESC}) {
        edges {
          post: node {
            id
            slug
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allNotionPortfolioItem.edges
}

const createIndividualNotionPages = async ({ pages, gatsbyUtilities }) => {
  await Promise.all(
    pages.map(({ page }) =>
      gatsbyUtilities.actions.createPage({
        path: page.slug,
        component: path.resolve(`./src/templates/page.tsx`),
        context: {
          id: page.id
        },
      })
    )
  )
}

async function getNotionPages({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query NotionPages {
      allNotionPage {
        edges {
          page: node {
            id
            slug
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allNotionPage.edges
}

// TODO: Export this
// #region Utils

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

// #endregion

// TODO: Export this into a new file
// #region Caching

function loadCachedContent(type) {
  const path = `./content/${type}.json`

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

function saveCachedContent(type, content) {
  const path = `./content/${type}.json`
  fs.writeFileSync(path, JSON.stringify(content), 'utf8');
}

async function cacheImagesAndUpdateHtml(slug, html) {
  const regexp = /<img.*?src=['"](.*?)['"].*?>/g;
  const matches = [...html.matchAll(regexp)];
  const imgUrls = []
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

async function cacheImage(slug, imageUrl) {
  const spl = imageUrl.split("/")
  const fileName = `${spl[spl.length-2]}-${spl[spl.length - 1].split("?")[0]}`
  let imagePath = `/img/n/${slug}`
  const downloadPath = "./static" + imagePath
  const filePath = downloadPath + `/${fileName}`

  // If the file doesnt exist, make the dir & download the file
  if(!fs.existsSync(filePath)) {
    await fs.promises.mkdir(downloadPath, { recursive: true })
    await downloadImage(imageUrl, filePath)
  }

  // Return the value to use in `src`
  return imagePath += `/${fileName}`
}

const downloadImage = async (url, path) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.promises.writeFile(path, buffer);
}

// #endregion