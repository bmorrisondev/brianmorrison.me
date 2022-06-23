import { graphql, useStaticQuery, Link } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import DefaultLayout from '../layouts/DefaultLayout'

const BlogLink = styled(Link)`
  display: flex;
  font-weight: bold;
  font-size: 25px;
  text-decoration: none;
  color: inherit;
  height: 25px;
  align-items: center;
  margin-bottom: 20px;

  .post-icon {
    margin-right: 10px;
  }
`

function Blog() {
  const data = useStaticQuery(graphql`
    {
      allWpPost(sort: {fields: [date], order: DESC}) {
        edges {
          node {
            id
            slug
            uri
            title
            blogPostFields {
              icon {
                gatsbyImage(width: 25, height: 25)
              }
            }
          }
        }
      }
    }
  `)

  const posts = data.allWpPost.edges.map(el => el.node)

  return (
    <DefaultLayout>
      <Container>
        <h1>Blog</h1>
        {posts.map(p => (
          <BlogLink to={`/blog/${p.slug}`}>
            {p.blogPostFields && p.blogPostFields.icon
              ? <GatsbyImage className="post-icon" image={p.blogPostFields.icon.gatsbyImage} alt={p.blogPostFields.icon.altText} />
              : <StaticImage className="post-icon" src="../images/emoji/memo.png" alt="default post icon" />
            }
            {p.title}
          </BlogLink>
        ))}
      </Container>
    </DefaultLayout>
  )
}

export default Blog