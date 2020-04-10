const config = require('./app.config.json')

module.exports = {
  siteMetadata: {
    title: 'Brian Morrison II, Software Engineer & Developer Advocate',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    // Simple config, passing URL
    {
      resolve: "gatsby-source-graphql-universal",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "wpgraphql",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "wpgraphql",
        // Url to query from
        // url: "http://localhost:8088/graphql",
        url: config.wpsourceurl
      },
    },
    // {
    //   resolve: 'gatsby-source-wordpress',
    //   options: {
    //     // The base url to your WP site.
    //     baseUrl: 'brianmorrison.me',
    //     // WP.com sites set to true, WP.org set to false
    //     hostingWPCOM: false,
    //     // The protocol. This can be http or https.
    //     protocol: 'https',
    //     // Use 'Advanced Custom Fields' Wordpress plugin
    //     useACF: false,
    //     auth: {},
    //     // Set to true to debug endpoints on 'gatsby build'
    //     verboseOutput: false,
    //   },
    // },
    'gatsby-plugin-sharp',    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/img/`,
      },
    },
    'gatsby-transformer-sharp',
    {
      // Removes unused css rules
      resolve:'gatsby-plugin-purgecss',
      options: {
        // Activates purging in gatsby develop
        develop: true,
        // Purge only the main css file
        purgeOnly: ['/all.sass'],
      },
    }, // must be after other CSS plugins
  ],
}
