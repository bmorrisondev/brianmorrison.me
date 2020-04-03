import React from "react"
import { Link, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import CallToAction from "../components/CallToActionComponent"
import DiscordWidget from "../components/widgets/DiscordWidget"
import HomeLayout from "../components/HomeLayout"
import SocialWidget from "../components/widgets/SocialWidget"

const IndexPage = ({data}) => {
  const post = data

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
    wpgraphql {
      posts(where:{ 
        orderby:{
          field: DATE
        	order: DESC
        }
      }, first: 1) {
        edges {
          node {
            id
            title
            excerpt
            date
            slug
          }
        }
      }
    }
  }
`

export default IndexPage
