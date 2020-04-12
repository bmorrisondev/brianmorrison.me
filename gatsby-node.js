const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const Prism = require('prismjs')
const jsdom = require('jsdom')
const loadLanguages = require('prismjs/components/index.js');

loadLanguages()
// import "prismjs/plugins/autoloader/prism-autoloader"

// const { paginate } = require('gatsby-awesome-pagination')

const getOnlyPublished = function(edges) {
  return edges.filter(e => e.status === 'publish');
}

// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     node: {
//       fs: 'empty'
//     }
//   })
// }

const highlightCode = function(content) {
  const dom = new jsdom.JSDOM(content);
  // const parsedHtml = dom.window.document;
  dom.window.document.querySelectorAll("code").forEach(c => {
    // console.log(c)
    // const highlighted = Prism.highlightElement(c);
    // c.innerHTML = highlighted;
    const code = c.textContent;
    const name = c.className
      .replace("language-", "")
      .replace("lang-", "");
    console.log("code", code)
    console.log("name", name)
    console.log("Prism.languages[name]", Prism.languages[name])
    if(name) {
      const processed = Prism.highlight(code, Prism.languages[name], name);
      c.innerHTML = processed;
      c.parentNode.className = `${c.parentNode.className} language-${name}`
    }
  });
  return dom.window.document.body.innerHTML;
  // return parsedHtml.querySelector("body").innerHTML
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
            status,
            title,
            content,
            date
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
          
      // pages.forEach(p => {
      //   createPage({
      //     path: `/blog/${p.slug}/`,
      //     component: pageTemplate,
      //     context: {
      //       id: p.id,
      //     },
      //   })
      // });
          
      pages.forEach(p => {
        const highlightedContent = highlightCode(p.content)
        createPage({
          path: `/blog/${p.slug}/`,
          component: pageTemplate,
          context: {
            content: highlightedContent,
            title: p.title,
            date: p.date
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
