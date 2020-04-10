const config = require('./app.config.json')

module.exports = {
  siteMetadata: {
    title: 'Brian Morrison II, Software Engineer & Developer Advocate',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: "gatsby-source-graphql-universal",
      options: {
        typeName: "wpgraphql",
        fieldName: "wpgraphql",
        url: config.wpsourceurl
      },
    },
    'gatsby-plugin-sharp',    
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/img/`,
    //   },
    // },
    'gatsby-transformer-sharp',
    {
      resolve:'gatsby-plugin-purgecss',
      options: {
        develop: true,
        purgeOnly: ['/all.sass'],
      },
    },
  ],
}
