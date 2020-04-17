const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const Prism = require('prismjs')
const jsdom = require('jsdom')
const loadLanguages = require('prismjs/components/index.js');

loadLanguages()
// const { paginate } = require('gatsby-awesome-pagination')

const getOnlyPublished = function(edges) {
  return edges.filter(e => e.status === 'publish');
}

const highlightCode = function(content) {
  const dom = new jsdom.JSDOM(content);
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
  return dom.window.document.body.innerHTML;
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const postsQuery = `
    {
      wpgraphql {
        posts {
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
  if(process.env.NODE_ENV === 'production') {
    posts = getOnlyPublished(posts)
  }

  // console.log(JSON.stringify(posts))
      
  posts.forEach(p => {
    const highlightedContent = highlightCode(p.content)
    createPage({
      path: `/blog/${p.slug}/`,
      component: pageTemplate,
      context: {
        id: p.id,
        content: highlightedContent,
        title: p.title,
        date: p.date,
        author: p.author,
        featuredImage: p.featuredImage,
        categories: p.categories,
        tags: p.tags
      },
    })
  });
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
