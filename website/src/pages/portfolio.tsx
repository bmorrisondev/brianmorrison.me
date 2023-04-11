import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { useStaticQuery, graphql, Link } from 'gatsby'
import parse from "html-react-parser"
import StylizedList from "../components/StylizedList"
import Container from '../components/Container'
import StylizedListItem from '../components/StylizedListItem'

function PortfolioListItem({item}) {
  return (
    <div>
      <Link to={`/portfolio/${item.slug}`} className="text-black">
        <h2>{parse(item.title)}</h2>
        <span className="excerpt">{ item.excerpt } </span>
      </Link>
      {item.tags && item.tags.length > 0 && (
        <StylizedList>
          {item.tags.map(t => (
            <StylizedListItem key={`${item.id}-${t}`}>{t}</StylizedListItem>
          ))}
        </StylizedList>
      )}
    </div>
  )
}

function Portfolio({ location }) {
  const data = useStaticQuery(graphql`
    {
      allNotionPortfolioItem(sort:{date: DESC}) {
        edges {
          node {
            id
            slug
            title
            excerpt
            tags
          }
        }
      }
    }
  `)

  console.log(data)

  const posts = data.allNotionPortfolioItem.edges.map(el => el.node)

  return (
    <DefaultLayout location={location} pageTitle="Portfolio">
      <Container>
        <h1>Portfolio</h1>
        <div>
          {posts.map(p => <PortfolioListItem key={posts.id} item={p} />)}
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default Portfolio