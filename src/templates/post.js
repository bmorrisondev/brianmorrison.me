/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react'
import Helmet from 'react-helmet'
// import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

import PostMetaWidget from '../components/widgets/PostMetaWidget'

export const BlogPostTemplate = ({
  content,
  title,
  date,
  author,
  featuredImage,
  categories,
  tags
}) => {
  return (
    <section className="section">
      <div className="container content">
        <div className="row">
          <div className="col-md-8 post">
            {featuredImage && (
              <div>
                <img src={featuredImage.azureFeaturedImageUrl} alt={featuredImage.altText} className="img-fluid post-featured-image" />
              </div>
            )}
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <div className="col-md-4">
            <PostMetaWidget 
              date={date}
              author={author} />
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
        author={pageContext.author}
        featuredImage={pageContext.featuredImage}
        categories={pageContext.categories}
        tags={pageContext.tags}
      />
    </Layout>
  )
}

export default BlogPost
