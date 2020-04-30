/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react'
import Helmet from 'react-helmet'
// import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

export const CategoryTemplate = ({
  name,
  posts
}) => {
  return (
    <section className="section">
      <div className="container content">
        <div className="row">
          <div className="col-md-8 post">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {name}
            </h1>
            <p>This is where the post list will go</p>
            {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
          </div>
          <div className="col-md-4">
            This is category info will go, including random other articles from this category. Maybe related categories.
          </div>
        </div>
      </div>
    </section>
  )
}

const Category = ({
  pageContext
}) => {
  return (
    <Layout>
      <Helmet title={`${pageContext.name} | Blog`} />
      
      <CategoryTemplate
        title={pageContext.name}
        tags={pageContext.posts}
      />
    </Layout>
  )
}

export default Category
