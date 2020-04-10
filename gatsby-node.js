const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
// const { paginate } = require('gatsby-awesome-pagination')

// const getOnlyPublished = edges =>
//   _.filter(edges, ({ node }) => node.status === 'publish')

const getOnlyPublished = function(edges) {
  console.log('here 7')
  return edges.filter(e => e.status === 'publish');
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  console.log('here 1')

  return graphql(`
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
  `)
    .then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }
      console.log('here 2')

      const pageTemplate = path.resolve(`./src/templates/qlpost.js`)

      // Only publish pages with a `status === 'publish'` in production. This
      // excludes drafts, future posts, etc. They will appear in development,
      // but not in a production build.

      let allPosts = result.data.wpgraphql.posts.nodes
      allPosts = JSON.parse(JSON.stringify(allPosts))
      console.log(allPosts);
      const pages =
        process.env.NODE_ENV === 'production'
          ? getOnlyPublished(allPosts)
          : allPosts
          
      console.log('here 3')

      // Call `createPage()` once per WordPress page
      pages.forEach(p => {
        createPage({
          path: `/blog/${p.slug}/`,
          component: pageTemplate,
          context: {
            id: p.id,
          },
        })
      });

      
      console.log('here 4')
      // _.each(pages, ({ node: page }) => {
      //   createPage({
      //     path: `/${page.slug}/`,
      //     component: pageTemplate,
      //     context: {
      //       id: page.id,
      //     },
      //   })
      // })
    });
}

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
//   console.log('here 5')

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
  
//   console.log('here 6')
// }
