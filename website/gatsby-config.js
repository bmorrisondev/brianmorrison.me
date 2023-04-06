require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Brian Morrison II`,
    siteUrl: `https://brianmorrison.me`,
    description: "Personal blog of Brian Morrison II, full stack developer & content creator."
  },
  plugins: [
    'gatsby-plugin-postcss',
    // {
    //   resolve: 'gatsby-source-wordpress',
    //   options: {
    //     "url": process.env.WP_URL,
    //     auth: {
    //       htaccess: {
    //         username: process.env.WP_USERNAME,
    //         password: process.env.WP_PASSWORD
    //       }
    //     },
    //     html: {
    //       useGatsbyImage: false,
    //     },
    //     develop: {
    //       hardCacheMediaFiles: true,
    //     },
    //   }
    // },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-7070984643674033`
      },
    },
    // {
    //   resolve: 'gatsby-plugin-feed',
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         title: "Brian Morrison II Blog RSS Feed",
    //         output: "rss.xml",
    //         query: `
    //           {
    //             allWpPost(sort: {fields: [date], order: DESC}) {
    //               edges {
    //                 node {
    //                   id
    //                   slug
    //                   uri
    //                   title
    //                   excerpt
    //                   content
    //                 }
    //               }
    //             }
    //           }
    //         `,
    //         // serialize: ({ query: { site, allWpPost } }) => {
    //         serialize: (input) => {
    //           const { query: { site, allWpPost } } = input
    //           return allWpPost.edges.map(({ node }) => {
    //             return Object.assign({}, {
    //               url: `${site.siteMetadata.siteUrl}/blog/${node.slug}`,
    //               guid: node.id,
    //               title: node.title,
    //               description: node.excerpt,
    //               custom_elements: [{ "content:encoded": node.content }],
    //             })
    //           })
    //         },
    //       }
    //     ]
    //   }
    // }
  ]
}
