const path = require(`path`)
const chunk = require(`lodash/chunk`)

exports.createPages = async gatsbyUtilities => {
  const posts = await getPosts(gatsbyUtilities)
  if (!posts.length) {
    return
  }
  await createIndividualBlogPostPages({ posts, gatsbyUtilities })

  const portfolioItems = await getPortfolioItems(gatsbyUtilities)
  if (!portfolioItems.length) {
    return
  }
  await createIndividualPortfolioItemPages({ portfolioItems, gatsbyUtilities })
}


const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
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