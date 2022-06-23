require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Brian Morrison II`,
    siteUrl: `https://brianmorrison.me`
  },
  plugins: [
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        "url": process.env.WP_URL,
        auth: {
          htaccess: {
            username: process.env.WP_USERNAME,
            password: process.env.WP_PASSWORD
          }
        },
        html: {
          useGatsbyImage: false,
        },
        develop: {
          hardCacheMediaFiles: true,
        },
      }
    },
    "gatsby-plugin-styled-components",
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        "trackingId": process.env.GA_TRACKINGID
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }
  ]
}
