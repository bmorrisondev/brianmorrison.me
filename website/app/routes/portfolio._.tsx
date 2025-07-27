import { Job, PortfolioItem, Tag } from '~/models'
import Container from '../components/Container'
import PortfolioListItem from "../components/PortfolioListItem"
import { json, useLoaderData, Link } from '@remix-run/react'
import { MetaFunction } from '@remix-run/node'
import { buildHeader } from '~/utils'

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

export const meta: MetaFunction = () => buildHeader({
  pageTitle: "Portfolio"
})

function Portfolio() {
  const { items } = useLoaderData<typeof loader>()

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white m-0 md:m-8 mt-20 rounded-xl">
      <Container>
        <h1>Portfolio</h1>
        <p>Here are some of the projects I&apos;ve worked on that use the multi-faceted skills I&apos;ve picked up over the years.</p>
        <p>If you&apos;re intersted in help on your own project, be sure to <Link to="/#contact">let me know</Link>!</p>
        <div className="grid md:grid-cols-3 gap-2">
          {items.map(p => <PortfolioListItem key={p.id} item={p} />)}
        </div>
      </Container>
    </div>
  )
}

export default Portfolio