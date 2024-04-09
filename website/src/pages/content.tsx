import { graphql, useStaticQuery, Link } from 'gatsby'
import React from 'react'
import Container from '../components/Container'
import DefaultLayout from '../layouts/DefaultLayout'
import { PiArticleThin, PiMicrophoneThin, PiMicrophoneStageThin, PiVideoThin, PiCubeThin, PiChatsThin, PiArrowSquareUpRightLight } from "react-icons/pi";

enum ContentItemIconType {
  Default,
  Article,
  Podcast,
  Talk,
  Video,
  Social
}

type ContentItem = {
  id: string
  slug?: string
  icon: ContentItemIconType
  title: string
  date: Date
  url?: string
  subtitle?: string
  img?: string
}

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

function Blog({ location }) {
  // Year: Month: ContentItem
  let contentItems: ContentItem[] = []
  const contentItemsMap: {number: {number: ContentItem}} = {}

  const data = useStaticQuery(graphql`
    {
      allNotionPost(sort: {publishOn: DESC}, filter: {status:{ eq:"Published"}}) {
        edges {
          node {
            id
            slug
            title
            publishOn(formatString: "MMMM DD, YYYY")
          }
        }
      }
      allNotionExternalContent {
        edges {
          node {
            id
            slug
            uRL
            title
            subtitle
            date
            kind {
              slug
            }
          }
        }
      }
    }
  `)

  let posts = data.allNotionPost.edges.map(el => el.node)
  posts.forEach(p => {
    contentItems.push({
      id: p.id,
      slug: p.slug,
      icon: ContentItemIconType.Article,
      title: p.title,
      date: new Date(p.publishOn),
    })
  })

  let externalItems = data.allNotionExternalContent.edges.map(el => el.node)
  externalItems.forEach(p => {
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
    let subtitle = p.subtitle ? p.subtitle : (new URL(p.uRL)).hostname.replace('www.', '')
    contentItems.push({
      id: p.id,
      icon: icon,
      title: p.title,
      date: new Date(p.date),
      url: p.uRL,
      subtitle: subtitle
    })
  })

  contentItems.sort((a, b) => new Date(b.date) - new Date(a.date))

  contentItems.forEach(ci => {
    let year = ci.date.getFullYear()
    let month = ci.date.getMonth()
    if (!contentItemsMap[year]) {
      contentItemsMap[year] = {}
    }
    if (!contentItemsMap[year][month]) {
      contentItemsMap[year][month] = ci
    }
  })

  return (
    <DefaultLayout location={location} pageTitle="Blog">
      <Container>
        <h1>Content</h1>
        <div className='flex flex-col mt-2'>
          {/* {Object.keys(contentItemsMap).map(year => (
            <div className='my-2'>
              <h2>{year}</h2>
              <div className='flex flex-col'>
                {Object.keys(contentItemsMap[year]).map(month => (
                  <div className='my-2'>
                    <h3>{new Date(parseInt(year), parseInt(month)).toLocaleString('default', { month: 'long' })}</h3>
                    <div className='flex flex-col'>
                      <div className='flex flex-col'>
                        <PostTypeIcon iconType={contentItemsMap[year][month].icon} />
                        <span className='text-lg'>{contentItemsMap[year][month].title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))} */}


          {contentItems.map(p => (
            <div className='my-2'>
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
    </DefaultLayout>
  )
}

export default Blog