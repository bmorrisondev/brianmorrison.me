import React from "react"
import { Link, graphql } from 'gatsby'
import DiscordWidget from "../components/widgets/DiscordWidget"
import HomeLayout from "../components/HomeLayout"
import SocialWidget from "../components/widgets/SocialWidget"
import { fixImageUrl } from "../utils/imageUtils"
import { DateFormatter } from '../components/formatters/CommonFormatters'

const IndexPage = ({data}) => {
  const post = data.wpgraphql.posts.edges[0].node

  if(post.featuredImage) {
    post.featuredImage = fixImageUrl(post.featuredImage)
  }

  return (  
    <HomeLayout>
      <div className="container">
        <div className="row h-100">
          <div className="col-md-6">
            <div className="home-panel">
              <h2>Get in touch.</h2>
              {/* TODO: Move to config */}
              <DiscordWidget guildId="553773331674038282" />
              <SocialWidget />
            </div>
          </div>
          <div className="col-md-6">
            <div className="home-panel">
              <h2>From the blog.</h2>
              <div>
                {/* {post.featuredImage && (
                  <img src={post.featuredImage.azureFeaturedImageUrl} alt={post.featuredImage.altText} className="img-fluid img-thumbnail" />
                )} */}
                <Link to={`/blog/${post.slug}`}>
                  <h4>{post.title}</h4>
                </Link>
                <span className="post-excerpt-meta"><DateFormatter date={post.date} /></span>
              </div>
              <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt}} />
              <div className="post-excerpt-footer">
                <Link to={`/blog/${post.slug}`}>
                  Keep Reading <i class="fas fa-angle-double-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
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
            featuredImage {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  }
`

export default IndexPage
