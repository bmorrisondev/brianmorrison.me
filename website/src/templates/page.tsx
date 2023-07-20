import React from "react"
import { graphql } from "gatsby"
import Container from '../components/Container'
import parse from "html-react-parser"
import DefaultLayout from "../layouts/DefaultLayout"
import { replaceCode } from "../components/PostCode"

export const pageQuery = graphql`
  query PageById(
    $id: String!
  ) {
    page: notionPage(id: { eq: $id }) {
      id
      excerpt
      html
      title
    }
  }
`

const PageTemplate = ({ data, location }) => {
  const { page } = data

  return (
    <DefaultLayout location={location} pageTitle={page.title}>
      <Container>
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1 itemProp="headline">{page.title}</h1>
          </header>

          {!!page.html && (
            <div className="post-content">{parse(page.html, { replace: replaceCode })}</div>
          )}
        </article>
      </Container>
    </DefaultLayout>
  )
}

export default PageTemplate
