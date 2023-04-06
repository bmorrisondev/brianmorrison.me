require('dotenv').config()
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
  await loadNotionPosts(actions, createNodeId, createContentDigest)
};

exports.createPages = async gatsbyUtilities => {
  const notionPosts = await getNotionPosts(gatsbyUtilities)
  if (!notionPosts.length) {
    return
  }
  await createIndividualBlogPostPages({ posts: notionPosts, gatsbyUtilities })

  // const posts = await getPosts(gatsbyUtilities)
  // if (!posts.length) {
  //   return
  // }
  // await createIndividualBlogPostPages({ posts, gatsbyUtilities })

  // const portfolioItems = await getPortfolioItems(gatsbyUtilities)
  // if (!portfolioItems.length) {
  //   return
  // }
  // await createIndividualPortfolioItemPages({ portfolioItems, gatsbyUtilities })
}

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
        n[fieldName] = ""
        prop.title.forEach(t => {
          n[fieldName] += t.text.content
        })
      }

      if(prop.type === "date") {
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
            console.log(fieldName, prop)
          }
        } else {

        }
      }


    })

    // Flatten title
    // if(p.properties.Title) {
    //   p.properties.Title.title.forEach(t => {
    //     n.title += t.text.content
    //   })
    // }

    // if(p.properties["Publish on"]) {
    //   n.publishOn = new Date(p.properties["Publish on"].date.start)
    // }

    // if(p.properties["Slug"] && p.properties["Slug"].rich_text) {
    //   console.log(p.properties["Slug"])
    //   // TODO: figure out how to grab this one
    // } else {
    //   n.slug = slugify(n.title)
    // }

    // Setup slug
    if(!n.title) {
      console.warn("post does not have title:", n)
      return
    }

    if(!n.slug) {
      n.slug = slugify(n.title, {
        lower: true,
        strict: true
      })
    }

    // Get page
    n.html = await converter.generateHtmlFromPage(p.id)

    // Add to putput
    normalized.push(n)
  }

  return normalized
}

function parseNotionPost(post) {
  let n = {
    id: p.id
  }
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
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

async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query WpPosts {
      allWpPost(sort: { fields: [date], order: DESC }) {
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

  return graphqlResult.data.allWpPost.edges
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