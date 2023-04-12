require('dotenv').config()
const fs = require('fs')
const path = require(`path`)
const slugify = require('slugify')
const { Client } = require("@notionhq/client")
const NotionToHtmlClient = require('./utils/notionToHtml')

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

let converter = new NotionToHtmlClient(process.env.NOTION_TOKEN)

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  // await loadNotionPosts(actions, createNodeId, createContentDigest)
  await loadNotionPortfolioItems(actions, createNodeId, createContentDigest)
};

async function loadNotionPosts(actions, createNodeId, createContentDigest) {
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_CMS_DBID
  })

  let normalized = await normalizePosts(results)

  normalized.forEach(n => {
    actions.createNode({
      ...n,
      id: createNodeId(n.id),
      internal: {
        type: 'notionPost',
        contentDigest: createContentDigest(n)
      }
    })
  })
}

async function loadNotionPostSeries(actions, createNodeId, createContentDigest) {

}

async function loadNotionPortfolioItems(actions, createNodeId, createContentDigest) {
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_PORTFOLIOITEMS_DBID
  })

  console.log(results)

  let normalized = await normalizePosts(results)

  normalized.forEach(n => {
    actions.createNode({
      ...n,
      id: createNodeId(n.id),
      internal: {
        type: 'notionPortfolioItem',
        contentDigest: createContentDigest(n)
      }
    })
  })
}

async function normalizePosts(notionPosts) {
  let normalized = []
  for(let i = 0; i < notionPosts.length; i++) {
    let p = notionPosts[i]

    let n = {
      id: p.id
    }

    Object.keys(p.properties).forEach(k => {
      let prop = p.properties[k]
      let fieldName = camelize(k)
      if(prop.type === "title" && prop.title.length > 0) {
        n.title = ""
        prop.title.forEach(t => {
          n[fieldName] += t.text.content
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
        } else {
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
        n[fieldName] = prop.select.name.toLowerCase()
      }

      if(prop.type === "multi_select") {
        n[fieldName] = []
        prop.multi_select.forEach(el => n[fieldName].push(el.name))
      }
    })

    // Setup slug
    if(!n.title) {
      console.warn("post does not have title:", n)
      continue
    }

    if(!n.slug) {
      n.slug = slugify(n.title, {
        lower: true,
        strict: true
      })
    }

    // Get page
    let { html, raw } = await converter.generate(p.id, { html: true, raw: true})
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
      n.excerpt = raw.slice(0, 120) + "..."
    }

    // Add to putput
    normalized.push(n)
  }

  return normalized
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
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
    let imageUrl = imgUrls[i]

    // Cache images and replace img url in the html
    let src = await cacheImage(slug, imageUrl)
    html = html.replace(imageUrl, src)
  }

  return html
}

async function cacheImage(slug, imageUrl) {
  let spl = imageUrl.split("/")
  let fileName = `${spl[spl.length-2]}-${spl[spl.length - 1].split("?")[0]}`
  let imagePath = `/img/n/${slug}`
  let downloadPath = "./static" + imagePath
  let filePath = downloadPath + `/${fileName}`

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

exports.createPages = async gatsbyUtilities => {
  try {
    // const notionPosts = await getNotionPosts(gatsbyUtilities)
    // if (!notionPosts.length) {
    //   return
    // }
    // await createIndividualBlogPostPages({ posts: notionPosts, gatsbyUtilities })

    // const portfolioItems = await getPortfolioItems(gatsbyUtilities)
    // if (!portfolioItems.length) {
    //   return
    // }
    // await createIndividualPortfolioItemPages({ portfolioItems, gatsbyUtilities })
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

const createIndividualPortfolioItemPages = async ({ portfolioItems, gatsbyUtilities }) => {
  await Promise.all(
    portfolioItems.map(({ previous, post, next }) =>
      gatsbyUtilities.actions.createPage({
        path: `/portfolio/${post.slug}`,
        component: path.resolve(`./src/templates/portfolio-item.tsx`),
        context: {
          id: post.id,
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )
}

async function getPortfolioItems({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query WpPortfolioItems {
      allWpPortfolioItem(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          post: node {
            id
            slug
            uri
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

  return graphqlResult.data.allWpPortfolioItem.edges
}