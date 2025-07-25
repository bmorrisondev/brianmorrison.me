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

  const uniqueSources = new Set(contentItems.map(ci => ci.subtitle))

  return json({
    contentItems,
    uniqueSources: uniqueSources.size
  })
}

export default function ContentPage() {
  const { contentItems, uniqueSources } = useLoaderData<typeof loader>()

  return (
      <Container>
        <h1>Content</h1>
        <div className="mb-8">
          <p>As a self-taught developer, I enjoy creating content to help other developers learn and grow while avoiding the same pitfalls I&apos;ve fallen into.</p>
          <p>Over the past {new Date().getFullYear() - 2020} years, I have created <span className="font-bold">{contentItems.length}</span> pieces of content across <span className="font-bold">{uniqueSources}</span> different publications and platforms including blog articles, live streams, podcasts, videos, and speaking engagements.</p>
        </div>
        <div className='flex flex-col'>
          {contentItems.map((p, idx) => (
            <div key={`content-item-${idx}`} className='my-2'>
              { p.url ? (
                <a href={p.url} target='_blank' rel='noreferrer' className='text-black transition hover:text-gradientBlue flex group'>
                  <PostTypeIcon iconType={p.icon} />
                  <div className='flex flex-col gap-1'>
                    <span className='text-xl flex items-center font-sans'>{p.title}  <PiArrowSquareUpRightLight className='ml-1 opacity-0 group-hover:opacity-100' /></span>
                    <span className='italic text-gray-600 text-sm'>{ p.subtitle } </span>
                  </div>
                </a>
              ) : (
                <Link to={`/blog/${p.slug}`} className='text-black transition hover:text-gradientBlue flex'>
                  <PostTypeIcon iconType={p.icon} />
                  <div className='flex flex-col gap-1'>
                    <span className='text-xl font-sans'>{p.title}</span>
                    <span className='italic text-gray-600 text-sm'>brianmorrison.me</span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </Container>
  )
}