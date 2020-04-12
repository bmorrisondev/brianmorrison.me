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

    // wordpressPost(id: { eq: $id }) {
    //   id
    //   title
    //   slug
    //   content
    //   date(formatString: "MMMM DD, YYYY")
    //   categories {
    //     name
    //     slug
    //   }
    //   tags {
    //     name
    //     slug
    //   }
    //   author {
    //     name
    //     slug
    //   }
    // }

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
