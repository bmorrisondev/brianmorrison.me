import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import DefaultLayout from '../layouts/DefaultLayout'
import { useStaticQuery, graphql, Link } from 'gatsby'
import parse from "html-react-parser"
import StylizedList from "../components/StylizedList"

const Wrapper = styled(Container)`

`

const PortfolioListItemWrapper = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }
`

function PortfolioListItem({item}) {
  let tags: string[] = []

  if(item.tags && item.tags.nodes && item.tags.nodes.length > 0) {
    item.tags.nodes.forEach((t: any) => tags.push(t.name))
  }

  return (
    <PortfolioListItemWrapper>
      <Link to={`/portfolio/${item.slug}`}>
        <h2>{parse(item.title)}</h2>
        <span className="excerpt">{ parse(item.excerpt)} </span>
      </Link>
      {tags.length > 0 && (
        <StylizedList>
          {tags.map(t => (
            <li key={`${item.id}-${t}`}>{t}</li>
          ))}
        </StylizedList>
      )}
    </PortfolioListItemWrapper>
  )
}

function Portfolio() {
  const data = useStaticQuery(graphql`
    {
      allWpPortfolioItem(sort: {fields: [date], order: DESC}) {
        edges {
          node {
            id
            slug
            excerpt
            title
            tags {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `)


  const posts = data.allWpPortfolioItem.edges.map(el => el.node)
  console.log(posts)
  return (
    <DefaultLayout>
      <Wrapper>
        <h1>Portfolio</h1>
        <div>
          {posts.map(p => <PortfolioListItem key={posts.id} item={p} />)}
        </div>
      </Wrapper>
    </DefaultLayout>
  )
}

export default Portfolio