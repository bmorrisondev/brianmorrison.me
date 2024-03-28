import * as React from "react"
import { graphql } from "gatsby"
import DefaultLayout from "../layouts/DefaultLayout"
import Container from "../components/Container"

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
  location
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <DefaultLayout location={location} pageTitle={frontmatter.title}>
      <Container>
        <h1>{frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </DefaultLayout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`