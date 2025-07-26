import Container from '../components/Container'
import parse from "html-react-parser"
import { replaceCode } from "../components/PostCode"
import { PortfolioItem } from '~/models'
import portfolioItems from '../content/notion/notionPortfolioItem.json'
import { LoaderFunctionArgs } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const item: PortfolioItem = portfolioItems.find(el => el.slug === params.slug)

  return json({
    item
  });
}

function PortfolioItemView() {
  const { item } = useLoaderData<typeof loader>()

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white m-8 rounded-xl">
      <Container>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{item.title}</h1>
        </header>

        {!!item.html && (
          <div className="post-content">{parse(item.html, { replace: replaceCode })}</div>
        )}
      </article>
    </Container>
    </div>
  )
}

export default PortfolioItemView
