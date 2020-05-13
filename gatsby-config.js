const config = require('./app.config.js')

module.exports = {
  siteMetadata: {
    title: 'Brian Morrison II, Software Engineer & Developer Advocate',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: "gatsby-source-graphql-universal",
      options: {
        typeName: "wpgraphql",
        fieldName: "wpgraphql",
        url: config.graphQlSource,
        headers: {
          Authorization: `Basic ${config.wpBasicToken}`
        }
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsTrackingId,
      }
    },
    // TODO: Figure out how to get this working with headers only - https://github.com/typekit/webfontloader
    // {
    //   resolve: 'gatsby-plugin-web-font-loader',
    //   options: {
    //     google: {
    //       families: ['Montserrat']
    //     }
    //   }
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/img/`,
    //   },
    // },
    {
      resolve:'gatsby-plugin-purgecss',
      options: {
        develop: true,
        purgeOnly: ['/all.sass'],
      },
    },
  ],
}
