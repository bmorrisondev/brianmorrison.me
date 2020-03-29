import React from "react"
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'

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
              <div>
                <Link to={`/blog/${post.slug}`}>
                  <h4>{post.title}</h4>
                </Link>
              </div>
              <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt}} />
              <div className="post-excerpt-footer">
                <Link to={`/blog/${post.slug}`}>
                  Keep Reading →
                </Link>
              </div>
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
