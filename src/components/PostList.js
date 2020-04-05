import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props

    return (
      <section className="section post-list">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2 blog-title">{title}</h1>
          </div>
          {posts.map(({ node: post }) => (
            <div
              className="content post-excerpt"
              key={post.id}
            >
              <p>
                <Link className="has-text-primary" to={`/blog/${post.slug}`}>
                  <h4>{post.title}</h4>
                </Link>
                <span className="post-excerpt-meta">
                  {(new Date(post.date)).toDateString()}
                  {/* {post.date} - posted by{' '}
                  <Link to={`/author/${post.author.slug}`}>
                    {post.author.name}
                  </Link> */}
                </span>
              </p>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.replace(/<p class="link-more.*/, ''),
                  }}
                />
                <Link className="button is-small" to={`/blog/${post.slug}`}>
                  Keep Reading →
                </Link>
              </div>
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
  }
`
