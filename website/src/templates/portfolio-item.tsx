import React from "react"
import { graphql, navigate } from "gatsby"
import Container from '../components/Container'
import parse from "html-react-parser"
import DefaultLayout from "../layouts/DefaultLayout"
import { replaceCode } from "../components/PostCode"

export const pageQuery = graphql`
  query PortfolioItemById(
    $id: String!
  ) {
    post: notionPortfolioItem(id: { eq: $id }) {
      id
      excerpt
      html
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`

const BlogPostTemplate = ({ data, location }) => {
  const { post } = data

  return (
    <DefaultLayout location={location} pageTitle={post.title}>
      <Container>
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1 itemProp="headline">{post.title}</h1>
          </header>

          {!!post.html && (
            <div className="post-content">{parse(post.html, { replace: replaceCode })}</div>
          )}
        </article>
      </Container>
    </DefaultLayout>
  )
}

export default BlogPostTemplate
