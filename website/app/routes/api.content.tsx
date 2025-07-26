import { ContentItem, ContentItemIconType } from '~/models';

// Data
import notionPosts from '../content/notion/notionPost.json'
import notionExternalContent from '../content/notion/notionExternalContent.json'
import { json } from '@remix-run/node';

export const loader = () => {
  // Year: Month: ContentItem
  const contentItems: ContentItem[] = []
  // const contentItemsMap: {number?: {number?: ContentItem}} = {}

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

  // contentItems.forEach(ci => {
  //   const year = ci.date.getFullYear()
  //   const month = ci.date.getMonth()
  //   if (!contentItemsMap[year]) {
  //     contentItemsMap[year] = {}
  //   }
  //   if (!contentItemsMap[year][month]) {
  //     contentItemsMap[year][month] = ci
  //   }
  // })

  const uniqueSources = new Set(contentItems.map(ci => ci.subtitle))

  return json({
    contentItems,
    uniqueSources: uniqueSources.size
  })
}