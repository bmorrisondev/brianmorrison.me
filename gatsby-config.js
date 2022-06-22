/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const buildConfig = require("./build-config.json")

module.exports = {
  siteMetadata: {
    title: `Brian Morrison II`,
    siteUrl: `https://brianmorrison.me`
  },
  plugins: [
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        "url": buildConfig.url,
        auth: {
          htaccess: {
            username: buildConfig.username,
            password: buildConfig.password
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
        "trackingId": buildConfig.trackingId
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
