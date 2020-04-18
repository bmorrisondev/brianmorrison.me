import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import { DateFormatter } from './formatters/CommonFormatters'
import PrettyCodeDivider from './PrettyCodeDivider'
import { fixImageUrl } from '../utils/imageUtils'

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props
    
    posts.forEach(({ node: p }) => {
      if(p.featuredImage) {
        p.featuredImage = fixImageUrl(p.featuredImage)
      }
    })

    return (
      <section className="section post-list">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2 blog-title">{title}</h1>
          </div>
          {posts.map(({ node: post }, index) => (
            <div className="row">
              <div className="col-md-12">
                <div
                  className="content post-excerpt"
                  key={post.id}
                >
                  <div>
                    <Link className="has-text-primary" to={`/blog/${post.slug}`}>
                      
                      {post.featuredImage && (
                        <img src={post.featuredImage.azureFeaturedImageUrl} 
                          alt={post.featuredImage.altText} 
                          className="img-fluid post-featured-image" />
                      )}
                      <h4>{post.title}</h4>
                    </Link>
                    <span className="post-excerpt-meta">
                      <DateFormatter date={post.date} />
                    </span>
                  </div>
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.replace(/<p class="link-more.*/, ''),
                      }}
                    />
                    <Link className="button is-small" to={`/blog/${post.slug}`}>
                      Keep Reading <i class="fas fa-angle-double-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              {index !== (posts.length - 1) && (
                <div className="col-md-12">
                  <PrettyCodeDivider />
                </div>
              )}
            </div>
          ))} 
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

// export const pageQuery = graphql`
//   {
//     wpgraphql {
//       posts(first: 100) {
//         nodes {
//           id
//           slug
//           featuredImage {
//             uri
//             altText
//             mediaItemUrl
//           }
//           status
//           title
//           content
//           date
//           author {
//             id
//             slug
//             name
//             lastName
//             description
//             avatar {
//               url
//             }
//           }
//           tags {
//             nodes {
//               id
//               name
//               slug
//             }
//           }
//           categories {
//             nodes {
//               id
//               name
//               slug
//             }
//           }
//         }
//       }
//     }
//   }
// `

export const pageQuery = graphql`
  fragment PostListFields on wpgraphql_Post {
    id
    title
    excerpt
    author {
      name
      slug
      avatar {
        url
      }
    }
    date
    slug
    featuredImage {
      uri
      altText
      mediaItemUrl
    }
  }
`
