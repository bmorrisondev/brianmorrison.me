import React, { useState, useEffect } from 'react';
import { PiArticleThin, PiMicrophoneThin, PiMicrophoneStageThin, PiVideoThin, PiCubeThin, PiChatsThin, PiArrowSquareUpRightLight, PiCaretDownBold } from "react-icons/pi";
import { ContentItem, ContentItemIconType } from '~/models';

// Data
import { Link } from '@remix-run/react';


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
  const [itemsByYear, setItemsByYear] = useState<Record<number, ContentItem[]>>({})
  const [displayLimit, setDisplayLimit] = useState(20)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch('/api/content')
      const { contentItems, uniqueSources } = await res.json()
      setContentItems(contentItems)
      setUniqueSources(uniqueSources)
      
      // Group content items by year
      const groupedByYear: Record<number, ContentItem[]> = {}
      contentItems.forEach((item: ContentItem) => {
        const year = new Date(item.date).getFullYear()
        if (!groupedByYear[year]) {
          groupedByYear[year] = []
        }
        groupedByYear[year].push(item)
      })
      
      // Sort items within each year by date (newest first)
      Object.keys(groupedByYear).forEach((year) => {
        groupedByYear[parseInt(year)].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      })
      
      setItemsByYear(groupedByYear)
    }
    fetchContent()
  }, [])

  return (
      <div className="bg-neutral-900 h-full m-0 md:m-8 md:rounded-xl text-white p-8">
        <div className="text-center text-sm">{new Date().getFullYear() - 2020} years • {contentItems.length} pieces • {uniqueSources} publications</div>
        <h2 className="!mt-2 text-center">Content</h2>
        <div className="mb-8 max-w-3xl mx-auto text-center">
          <p>As a self-taught developer, I enjoy creating content to help other developers learn and grow while avoiding the same pitfalls I&apos;ve fallen into.</p>
        </div>
        <div className='text-white max-w-xl mx-auto relative'>          
          {/* Content items with grid layout */}
          <div className='grid grid-cols-[60px_1fr] gap-x-3'>
            {contentItems.slice(0, showAll ? contentItems.length : displayLimit).map((p, idx) => {

              const itemYear = new Date(p.date).getFullYear();

              const isFirstOfYear = itemsByYear[itemYear] &&
                itemsByYear[itemYear][0] &&
                itemsByYear[itemYear][0].id === p.id;
              
              return (
                <React.Fragment key={`content-item-${idx}`}>
                  {/* Year column */}
                  <div className={`flex gap-2 ${idx !== 0 ? 'border-r border-r-1 border-gray-600' : ''}`}>
                    {isFirstOfYear && (
                      <>
                        <div className='my-2'>
                          <span className='text-gray-400 text-sm font-mono'>{itemYear}</span>
                        </div>
                        <div className='flex mt-5 flex-1 relative'>
                          <hr className='w-full h-px border-b border-b-1 border-gray-600' />
                          {idx === 0 && (
                            <div className='absolute top-0 right-0 h-full border-r border-r-1 border-gray-600' style={{ height: 'calc(100% + 1000px)' }}></div>
                          )}
                        </div>
                      </>
                    )}
                    {idx === contentItems.length - 1 && (
                      <>
                        <div className='my-2 relative'>
                          <span className='text-gray-400 text-sm font-mono'>Start</span>
                        </div>
                        <div className='flex mt-5 flex-1 relative'>
                          <hr className='w-full h-px border-b border-b-1 border-gray-600' />
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Content column */}
                  <div className='my-2'>
                    { p.url ? (
                      <a href={p.url} target='_blank' rel='noreferrer' className='text-white transition hover:text-gradientBlue flex group'>
                        <PostTypeIcon iconType={p.icon!} />
                        <div className='flex flex-col gap-1'>
                          <span className='text-xl flex items-center'>{p.title}  <PiArrowSquareUpRightLight className='ml-1 opacity-0 group-hover:opacity-100' /></span>
                          <span className='text-gray-200 text-sm'>{ p.subtitle } </span>
                        </div>
                      </a>
                    ) : (
                      <Link to={`/blog/${p.slug}`} className='text-white transition hover:text-gradientBlue flex'>
                        <PostTypeIcon iconType={p.icon!} />
                        <div className='flex flex-col gap-1'>
                          <span className='text-xl'>{p.title}</span>
                          <span className='text-gray-200 text-sm'>brianmorrison.me</span>
                        </div>
                      </Link>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
            
            {/* Show more button */}
            {contentItems.length > displayLimit && !showAll && (
              <React.Fragment>
                <div className="col-span-2 flex justify-center mt-6">
                  <button 
                    onClick={() => setShowAll(true)} 
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>Show more</span>
                    <PiCaretDownBold className="text-sm" />
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
  )
}