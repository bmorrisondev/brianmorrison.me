import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

export const BlogPostTemplate = ({
  content,
  // categories,
  // tags,
  title,
  date,
  // author,
}) => {
  return (
    <section className="section">
      <div className="container content">
        <div className="row">
          <div className="col-8-md post">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <div>Posted on {(new Date(date)).toDateString()}</div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div style={{ marginTop: `4rem` }}>
              <p>
                {/* <Link to={`/author/${author.slug}`}>{author.name}</Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { post } = data.wpgraphql

  return (
    <Layout>
      <Helmet title={`${post.title} | Blog`} />
      <BlogPostTemplate
        content={post.content}
        // categories={post.categories}
        // tags={post.tags}
        title={post.title}
        date={post.date}
        // author={post.author}
      />
    </Layout>
  )
}

// BlogPost.propTypes = {
//   data: PropTypes.shape({
//     markdownRemark: PropTypes.object,
//   }),
// }

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: ID!) {
    wpgraphql {
      post(id: $id) {
        id
        title
        slug
        content
        date
      }
    }
  }
`

    // wordpressPost(id: { eq: $id }) {
    //   id
    //   title
    //   slug
    //   content
    //   date(formatString: "MMMM DD, YYYY")
    //   categories {
    //     name
    //     slug
    //   }
    //   tags {
    //     name
    //     slug
    //   }
    //   author {
    //     name
    //     slug
    //   }
    // }
