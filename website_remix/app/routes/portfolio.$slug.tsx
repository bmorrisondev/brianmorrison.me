import Container from '../components/Container'
import parse from "html-react-parser"
import { replaceCode } from "../components/PostCode"
import { json, LoaderFunctionArgs, useLoaderData } from 'react-router'
import { PortfolioItem } from '~/models'
import portfolioItems from '../content/notionPortfolioItem.json'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const item: PortfolioItem = portfolioItems.find(el => el.slug === params.slug)

  return json({
    item
  });
}

function PortfolioItemView() {
  const { item } = useLoaderData<typeof loader>()

  return (
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
  )
}

export default PortfolioItemView
