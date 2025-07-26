import { PiArticleThin, PiMicrophoneThin, PiMicrophoneStageThin, PiVideoThin, PiCubeThin, PiChatsThin, PiArrowSquareUpRightLight } from "react-icons/pi";
import { ContentItem, ContentItemIconType } from '~/models';

// Data
import { Link } from '@remix-run/react';
import { useState, useEffect } from 'react';


function PostTypeIcon({ iconType }: { iconType: ContentItemIconType }) {
  switch (iconType) {
    case ContentItemIconType.Article:
      return <span className='text-2xl mr-2 mt-[2px] text-white'><PiArticleThin /></span>
    case ContentItemIconType.Podcast:
      return <span className='text-2xl mr-2 mt-[2px] text-white'><PiMicrophoneThin /></span>
    case ContentItemIconType.Talk:
      return <span className='text-2xl mr-2 mt-[2px] text-white'><PiMicrophoneStageThin /></span>
    case ContentItemIconType.Video:
      return <span className='text-2xl mr-2 mt-[2px] text-white'><PiVideoThin /></span>
    case ContentItemIconType.Social:
      return <span className='text-2xl mr-2 mt-[2px] text-white'><PiChatsThin /></span>
    default:
      return <span className='text-2xl mr-2 mt-[2px] text-white'><PiCubeThin /></span>
  }
}

export default function ContentPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [uniqueSources, setUniqueSources] = useState(0)

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch('/api/content')
      const { contentItems, uniqueSources } = await res.json()
      setContentItems(contentItems)
      setUniqueSources(uniqueSources)
    }
    fetchContent()
  }, [])

  return (
      <div className="bg-neutral-900 h-full m-8 rounded-lg text-white p-8">
        <div className="text-center">{new Date().getFullYear() - 2020} years • {contentItems.length} pieces • {uniqueSources} publications</div>
        <h2 className="!mt-2 text-center">Content</h2>
        <div className="mb-8 max-w-3xl mx-auto text-center">
          <p>As a self-taught developer, I enjoy creating content to help other developers learn and grow while avoiding the same pitfalls I&apos;ve fallen into.</p>
        </div>
        <div className='flex flex-col text-white max-w-xl mx-auto'>
          {contentItems.map((p, idx) => (
            <div key={`content-item-${idx}`} className='my-2'>
              { p.url ? (
                <a href={p.url} target='_blank' rel='noreferrer' className='text-white transition hover:text-gradientBlue flex group'>
                  <PostTypeIcon iconType={p.icon!} />
                  <div className='flex flex-col gap-1'>
                    <span className='text-xl flex items-center font-sans'>{p.title}  <PiArrowSquareUpRightLight className='ml-1 opacity-0 group-hover:opacity-100' /></span>
                    <span className='italic text-gray-200 text-sm'>{ p.subtitle } </span>
                  </div>
                </a>
              ) : (
                <Link to={`/blog/${p.slug}`} className='text-white transition hover:text-gradientBlue flex'>
                  <PostTypeIcon iconType={p.icon!} />
                  <div className='flex flex-col gap-1'>
                    <span className='text-xl font-sans'>{p.title}</span>
                    <span className='italic text-gray-200 text-sm'>brianmorrison.me</span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
  )
}