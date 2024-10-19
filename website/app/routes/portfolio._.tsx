import { Job, PortfolioItem, Tag } from '~/models'
import Container from '../components/Container'
import PortfolioListItem from "../components/PortfolioListItem"
import { json, useLoaderData } from '@remix-run/react'

// Data
import portfolioItems from "../content/notion/notionPortfolioItem.json"
import employmentHistory from "../content/notion/notionEmploymentHistoryItem.json"
import tags from "../content/notion/notionTag.json"

export const loader = () => {
  const items: PortfolioItem[] = JSON.parse(JSON.stringify(portfolioItems.filter(i => i.status === "Published")))
  items.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1)

  items.forEach(el => {
    el.job = []
    el.relation_job.forEach(jid => {
      const j = (employmentHistory as Job[]).find(j => j.id === jid)
      if(j) {
        el.job.push(j)
      }
    })

    el.skillsUsed = []
    el.relation_skillsUsed.forEach(sid => {
      // TODO: This is ignored because `Tag` doesn't match the data.
      // The fields are not named the same for some of the relations
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const tag = (tags as Tag[]).find(t => t.id === sid)
      if(tag) {
        el.skillsUsed.push(tag)
      }
    })
  })

  return json({
    items
  })
}

function Portfolio() {
  const { items } = useLoaderData<typeof loader>()
  // const data = useStaticQuery(graphql`
  //   {
  //     allNotionPortfolioItem(
  //       filter: {
  //         status: {
  //           eq: "Published"
  //         }
  //       }
  //       sort: {
  //         date: DESC
  //       }
  //     ) {
  //       edges {
  //         node {
  //           id
  //           slug
  //           title
  //           excerpt
  //           tags
  //           date
  //           skillsUsed {
  //             icon
  //             name
  //           }
  //           job {
  //             companyName
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)

  // const posts = data.allNotionPortfolioItem.edges.map(el => el.node)

  return (
    <Container>
      <h1>Portfolio</h1>
      <div className="grid md:grid-cols-3 gap-2">
        {items.map(p => <PortfolioListItem key={p.id} item={p} />)}
      </div>
    </Container>
  )
}

export default Portfolio