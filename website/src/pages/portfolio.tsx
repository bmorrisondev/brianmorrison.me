import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { useStaticQuery, graphql } from 'gatsby'
import Container from '../components/Container'
import PortfolioListItem from "../components/PortfolioListItem"

function Portfolio({ location }) {
  const data = useStaticQuery(graphql`
    {
      allNotionPortfolioItem(
        filter: {
          status: {
            eq: "Published"
          }
        }
        sort: {
          date: DESC
        }
      ) {
        edges {
          node {
            id
            slug
            title
            excerpt
            tags
            date
            skillsUsed {
              icon
              name
            }
            job {
              companyName
            }
          }
        }
      }
    }
  `)

  const posts = data.allNotionPortfolioItem.edges.map(el => el.node)

  return (
    <DefaultLayout location={location} pageTitle="Portfolio">
      <Container>
        <h1>Portfolio</h1>
        <div className="grid md:grid-cols-3 gap-2">
          {posts.map(p => <PortfolioListItem key={posts.id} item={p} />)}
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default Portfolio