import Container from '../components/Container'
import { PiArticleThin, PiMicrophoneThin, PiMicrophoneStageThin, PiVideoThin, PiCubeThin, PiChatsThin, PiArrowSquareUpRightLight } from "react-icons/pi";
import { ContentItem, ContentItemIconType } from '~/models';

// Data
import notionPosts from '../content/notion/notionPost.json'
import notionExternalContent from '../content/notion/notionExternalContent.json'
import { json, Link, useLoaderData } from '@remix-run/react';
import { MetaFunction } from '@remix-run/node'
import { buildHeader } from '~/utils';


function PostTypeIcon({ iconType }: { iconType: ContentItemIconType }) {
  switch (iconType) {
    case ContentItemIconType.Article:
      return <span className='text-2xl mr-2 mt-[2px]'><PiArticleThin /></span>
    case ContentItemIconType.Podcast:
      return <span className='text-2xl mr-2 mt-[2px]'><PiMicrophoneThin /></span>
    case ContentItemIconType.Talk:
      return <span className='text-2xl mr-2 mt-[2px]'><PiMicrophoneStageThin /></span>
    case ContentItemIconType.Video:
      return <span className='text-2xl mr-2 mt-[2px]'><PiVideoThin /></span>
    case ContentItemIconType.Social:
      return <span className='text-2xl mr-2 mt-[2px]'><PiChatsThin /></span>
    default:
      return <span className='text-2xl mr-2 mt-[2px]'><PiCubeThin /></span>
  }
}

export const meta: MetaFunction = () => buildHeader({
  pageTitle: "Content"
})

export const loader = () => {
  // Year: Month: ContentItem
  let contentItems: ContentItem[] = []
  const contentItemsMap: {number: {number: ContentItem}} = {}

  notionPosts.forEach(p => {
    if(p.status === "Published") {
      contentItems.push({
        id: p.id,
        slug: p.slug,
        icon: ContentItemIconType.Article,
        title: p.title,
        date: new Date(p.publishOn as string),
      })
    }
  })

  notionExternalContent.forEach(p => {
    let icon = ContentItemIconType.Default;
    switch (p.kind.slug) {
      case 'article':
        icon = ContentItemIconType.Article
        break
      case 'blog-post':
        icon = ContentItemIconType.Article
        break
      case 'podcast-guest':
        icon = ContentItemIconType.Podcast
        break
      case 'talk':
        icon = ContentItemIconType.Talk
        break
      case 'social-post':
        icon = ContentItemIconType.Social
        break
      case 'video':
        icon = ContentItemIconType.Video
        break
    }
    const subtitle = p.subtitle ? p.subtitle : (new URL(p.uRL)).hostname.replace('www.', '')
    contentItems.push({
      id: p.id,
      icon: icon,
      title: p.title,
      date: new Date(p.date),
      url: p.uRL,
      subtitle: subtitle
    })
  })

  contentItems.sort((a, b) => new Date(b.date) > new Date(a.date) ? 1 : -1)

  contentItems.forEach(ci => {
    const year = ci.date.getFullYear()
    const month = ci.date.getMonth()
    if (!contentItemsMap[year]) {
      contentItemsMap[year] = {}
    }
    if (!contentItemsMap[year][month]) {
      contentItemsMap[year][month] = ci
    }
  })

  return json({
    contentItems
  })

}

export default function ContentPage() {
  const { contentItems } = useLoaderData<typeof loader>()

  return (
      <Container>
        <h1>Content</h1>
        <div className='flex flex-col mt-2'>
          {contentItems.map((p, idx) => (
            <div key={`content-item-${idx}`} className='my-2'>
              { p.url ? (
                <a href={p.url} target='_blank' rel='noreferrer' className='text-black transition hover:text-gradientBlue flex group'>
                  <PostTypeIcon iconType={p.icon} />
                  <div className='flex flex-col'>
                    <span className='text-xl flex items-center'>{p.title}  <PiArrowSquareUpRightLight className='ml-1 opacity-0 group-hover:opacity-100' /></span>
                    <span className='italic text-gray-600'>{ p.subtitle } </span>
                  </div>
                </a>
              ) : (
                <Link to={`/blog/${p.slug}`} className='text-black transition hover:text-gradientBlue flex'>
                  <PostTypeIcon iconType={p.icon} />
                  <div className='flex flex-col'>
                    <span className='text-xl'>{p.title}</span>
                    <span className='italic text-gray-600'>brianmorrison.me</span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </Container>
  )
}