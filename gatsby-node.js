const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const Prism = require('prismjs')
const jsdom = require('jsdom')
const loadLanguages = require('prismjs/components/index.js');
const config = require('./app.config')

console.info(`Building with config:`, config);

loadLanguages()
// const { paginate } = require('gatsby-awesome-pagination')

// const getOnlyPublished = function(edges) {
//   console.info("Getting published items only...")
//   return edges.filter(e => e.status === 'publish');
// }

const highlightCode = function(content) {
  const dom = new jsdom.JSDOM(content);

  // Transform prismatic blocks from WordPress
  dom.window.document.querySelectorAll("code").forEach(c => {
    const code = c.textContent;
    const name = c.className
      .replace("language-", "")
      .replace("lang-", "");
    if(name) {
      const processed = Prism.highlight(code, Prism.languages[name], name);
      c.innerHTML = processed;
      c.parentNode.className = `${c.parentNode.className} language-${name}`
    }
  });
  
  // Transform inline code
  dom.window.document.querySelectorAll("p").forEach(p => {
    const regex = /`([^`]*?)`/gm;
    const matches = p.innerHTML.match(regex);
    if(matches) {
      matches.forEach(m => {
        const originalMatch = m;
        // m = m.replace('`', '<code class=\'language-bash\'>')
        m = m.replace('`', '<code class=\'language-bash\'>')
        m = m.replace('`', '</code>')
        // m = `<pre class='inline language-bash'>${m}</pre>`
        p.innerHTML = p.innerHTML.replace(originalMatch, m);
      })
    }
  })

  return dom.window.document.body.innerHTML;
}

const addResponsiveImageTags = function(content) {
  const dom = new jsdom.JSDOM(content);
  dom.window.document.querySelectorAll("img").forEach(img => {
    let classList = img.className.split(" ");
    if(!classList.includes("img-fluid")) {
      classList.push("img-fluid");
      img.className = classList.join(" ");
    }
  })
  return dom.window.document.body.innerHTML;
}

const makeVideoEmbedsResponsive = function(content) {
  const dom = new jsdom.JSDOM(content);
  dom.window.document.querySelectorAll(".wp-block-embed__wrapper").forEach(el => {
    const classList = el.className.split(" ");
    if(!classList.includes("embed-responsive")) {
      classList.push("embed-responsive");
      classList.push("embed-responsive-16by9");
      el.className = classList.join(" ");
    }
  })
  return dom.window.document.body.innerHTML;
}

const generatePostPages = async function(createPageFn, graphql) {
  const postsQuery = `
    {
      wpgraphql {
        posts(
          first: 100, 
          where:{
            stati: [
              FUTURE,
              PUBLISH
            ]
          }
        ) {
          nodes {
            id
            slug
            featuredImage {
              uri
              altText
              mediaItemUrl
            }
            status
            title
            content
            date
            author {
              id
              slug
              name
              lastName
              description
              avatar {
                url
              }
            }
            tags {
              nodes {
                id
                name
                slug
              }
            }
            categories {
              nodes {
                id
                name
                slug
              }
            }
            gatsbyMeta {
              githubRepo
            }
            series {
              nodes {
                name
                slug
              }
            }
            seriesMeta {
              order
            }
          }
        }
      }
    }
  `

  const queryResult = await graphql(postsQuery);

  if (queryResult.errors) {
    // eslint-disable-next-line no-console
    queryResult.errors.forEach(e => console.error(e.toString()))
    throw queryResult.errors
  }

  const pageTemplate = path.resolve(`./src/templates/post.js`)

  let posts = queryResult.data.wpgraphql.posts.nodes
  posts = JSON.parse(JSON.stringify(posts))
  // console.log("posts", posts[0])
  // if(!(config.env === 'dev' || config.env === 'test')) {
  //   posts = getOnlyPublished(posts)
  // }
      
  posts.forEach(p => {
    let transformedContent = highlightCode(p.content)
    transformedContent = addResponsiveImageTags(transformedContent)
    transformedContent = makeVideoEmbedsResponsive(transformedContent)

    if(p.featuredImage) {
      p.featuredImage.azureFeaturedImageUrl = p.featuredImage.mediaItemUrl.replace("https://wp2.brianmorrison.me/wp-content/uploads", "https://cdn.brianmorrison.me/images")
    }

    const context = {
      id: p.id,
      content: transformedContent,
      title: p.title,
      date: p.date,
      author: p.author,
      featuredImage: p.featuredImage,
      categories: p.categories,
      tags: p.tags
    }

    // Fixup Series Meta
    if(p.series && p.series.nodes && p.series.nodes.length === 1) { 
      context.series = {
        name: p.series.nodes[0].name,
        slug: p.series.nodes[0].slug
      }
      if(p.seriesMeta) {
        context.series.order = p.seriesMeta.order
      }
    }

    if(p.gatsbyMeta) {
      context.repoLink = p.gatsbyMeta.githubRepo
    }

    createPageFn({
      path: `/blog/${p.slug}/`,
      component: pageTemplate,
      context
    })
  });
}

const generateCategoryPages = async function(createPageFn, graphql) {
  const categoriesQuery = `
    {
      wpgraphql {
        categories{
          nodes{
              id
              name
              slug
              posts {
                nodes {
                    id
                    title
                    excerpt
                    slug
                }
              }
          }
        }
      }
    }
  `

  const queryResult = await graphql(categoriesQuery);

  if (queryResult.errors) {
    // eslint-disable-next-line no-console
    queryResult.errors.forEach(e => console.error(e.toString()))
    throw queryResult.errors
  }

  const pageTemplate = path.resolve(`./src/templates/category.js`)

  let categories = queryResult.data.wpgraphql.categories.nodes
  categories = JSON.parse(JSON.stringify(categories))
 
  categories.forEach(c => {
    createPageFn({
      path: `/blog/categories/${c.slug}/`,
      component: pageTemplate,
      context: {
        id: c.id,
        name: c.name,
        posts: c.posts
      },
    })
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  await generatePostPages(createPage, graphql)
  await generateCategoryPages(createPage, graphql)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
