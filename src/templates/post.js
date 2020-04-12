import React from 'react'
import Helmet from 'react-helmet'
// import { graphql, Link } from 'gatsby'
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
          <div className="col-12-md post">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <div>
              {/* TODO: Style name should be renamed and style below should go into scss file */}
              <span className="post-excerpt-meta">
                <i className="far fa-calendar" style={{paddingRight: 5 + 'px'}} />
                {(new Date(date)).toDateString()}
              </span> 
            </div>
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

const BlogPost = ({
  pageContext
}) => {
  return (
    <Layout>
      <Helmet title={`${pageContext.title} | Blog`} />
      <BlogPostTemplate
        content={pageContext.content}
        // categories={post.categories}
        // tags={post.tags}
        title={pageContext.title}
        date={pageContext.date}
        // author={post.author}
      />
    </Layout>
  )
}

export default BlogPost
