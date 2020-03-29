import React from "react"
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

// import { Link } from "gatsby"
import CallToAction from "../components/CallToActionComponent"
import DiscordWidget from "../components/widgets/DiscordWidget"
import HomeLayout from "../components/HomeLayout"
import SocialWidget from "../components/widgets/SocialWidget"

const IndexPage = ({data}) => {
  const post = data.allWordpressPost.edges[0].node

  return (  
    <HomeLayout>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="home-panel">
              <h2>Get in touch.</h2>
              <DiscordWidget />
              <SocialWidget />
            </div>
          </div>
          <div className="col-md-6">
            <div className="home-panel">
              <h2>From the blog.</h2>
              {post.title}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}


IndexPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export const pageQuery = graphql`
  query IndexQuery {
    allWordpressPost(
      sort: { fields: date, order: DESC }
      limit: 1
    ) {
      edges {
        node {
          id
          title
          excerpt
          author {
            name
            slug
            avatar_urls {
              wordpress_48
            }
          }
          date(formatString: "MMMM DD, YYYY")
          slug
        }
      }
    }
  }
`

export default IndexPage
