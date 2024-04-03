require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Brian Morrison II`,
    siteUrl: `https://brianmorrison.me`,
    description: "Personal blog of Brian Morrison II, full stack developer & developer educator."
  },
  plugins: [
    'gatsby-plugin-postcss',
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    'gatsby-transformer-remark',
    'gatsby-plugin-clerk',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mdcontent`,
        path: `${__dirname}/content/md`,
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Playfair Display`,
            file: `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap`,
          },
          {
            name: `Alice`,
            file: `https://fonts.googleapis.com/css2?family=Alice&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap`,
          },
          {
            name: `Fira Code`,
            file: `https://fonts.googleapis.com/css2?family=Alice&family=Fira+Code:wght@300..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap`,
          },
        ],
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
