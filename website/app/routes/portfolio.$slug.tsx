import Container from '../components/Container'
import parse from "html-react-parser"
import { replaceCode } from "../components/PostCode"
import { PortfolioItem } from '~/models'
import portfolioItems from '../content/notion/notionPortfolioItem.json'
import { LoaderFunctionArgs } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'
import tags from '../content/notion/notionTag.json'
import { Tag } from '~/models'
import StylizedListItem from '~/components/StylizedListItem'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const item: PortfolioItem = portfolioItems.find(el => el.slug === params.slug)

  item.skillsUsed = []
  item.relation_skillsUsed.forEach(sid => {
    // TODO: This is ignored because `Tag` doesn't match the data.
    // The fields are not named the same for some of the relations
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const tag = (tags as Tag[]).find(t => t.id === sid)
    if(tag) {
      item.skillsUsed.push(tag)
    }
      })

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

        {item.skillsUsed && item.skillsUsed.length > 0 && (
          <div className="flex flex-col gap-2 mb-2">
           <div className="font-bold">Created with:</div>
           <div className="flex gap-2">
            {item.skillsUsed.map((tag, index) => (
              <StylizedListItem key={index} className="flex items-center gap-0.5">
                <img key={`${item.notion_id}-${item.slug}`} src={tag.icon} alt={tag.name} className="max-w-[20px] max-h-[20px] border-none !m-0"/>
                <div>{tag.name}</div>
              </StylizedListItem>
            ))}
          </div>
          </div>
        )}

        {!!item.html && (
          <div className="post-content">{parse(item.html, { replace: replaceCode })}</div>
        )}
      </article>
    </Container>
    </div>
  )
}

export default PortfolioItemView
