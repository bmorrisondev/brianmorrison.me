const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
// const { paginate } = require('gatsby-awesome-pagination')

const getOnlyPublished = function(edges) {
  return edges.filter(e => e.status === 'publish');
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const postsQuery = `
    {
      wpgraphql {
        posts {
          nodes {
            id,
            slug,
            status
          }
        }
      }
    }
  `

  return graphql(postsQuery)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const pageTemplate = path.resolve(`./src/templates/post.js`)

      let allPosts = result.data.wpgraphql.posts.nodes
      allPosts = JSON.parse(JSON.stringify(allPosts))
      const pages =
        process.env.NODE_ENV === 'production'
          ? getOnlyPublished(allPosts)
          : allPosts
          
      pages.forEach(p => {
        createPage({
          path: `/blog/${p.slug}/`,
          component: pageTemplate,
          context: {
            id: p.id,
          },
        })
      });
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
