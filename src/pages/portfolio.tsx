import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import { useStaticQuery, graphql, Link } from 'gatsby'
import parse from "html-react-parser"
import StylizedList from "../components/StylizedList"
import Container from '../components/Container'

// const PortfolioListItemWrapper = styled.div`
//   a {
//     text-decoration: none;
//     color: inherit;
//   }
// `

function PortfolioListItem({item}) {
  let tags: string[] = []

  if(item.tags && item.tags.nodes && item.tags.nodes.length > 0) {
    item.tags.nodes.forEach((t: any) => tags.push(t.name))
  }

  return (
    <div>
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
    </div>
  )
}

function Portfolio({ location }) {
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