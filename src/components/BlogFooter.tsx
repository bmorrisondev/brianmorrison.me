import { Link } from 'gatsby'
import React, { useState, useEffect } from 'react'
import { SeriesCollection } from '../models'
import Twitter from './svgs/Twitter'
import Button from './Button'

type Props = {
  seriesCollection?: SeriesCollection
  articleTitle: string
  location: any
}

function BlogFooter(props: Props) {
  const { seriesCollection, location, articleTitle } = props
  const [activeSlug, setActiveSlug] = useState("")
  const [twitterHref, setTwitterHref] = useState("")

  useEffect(() => {
    if(location && location.pathname) {
      let idx = location.pathname.split("/").length - 1
      if(location.pathname.endsWith("/")) {
        idx = location.pathname.split("/").length - 2
      }
      let as = location.pathname.split("/")[idx]
      setActiveSlug(as)
    }

    if(location && location.href) {
      setTwitterHref(`https://twitter.com/intent/tweet?text=${articleTitle} by @brianmmdev%0A%0A&url=${location.href}`)
    }
  }, [])

  function openFsc(): void {
    window.open("https://fullstack.chat", "_blank")
  }

  return (
    <div className='mb-2 '>
      <div className="grid md:grid-cols-2 md:gap-2">
        <div className='bg-accent-1 border-accent-2 border mb-2 p-4 rounded'>
          <div className="text-lg font-bold">
            Join my Discord
          </div>
          <div className='mb-2'>
            Interested in joining an open and welcoming community of developers?
          </div>
          <Button onClick={openFsc}>Join fullstack.chat</Button>
        </div>
        <div className='bg-accent-1 border-accent-2 border mb-2 p-4 rounded'>
          <div className="text-lg font-bold">
            Share this article
          </div>
          <div>
            <a href={twitterHref} target="_blank">
              <Twitter />
            </a>
          </div>
        </div>
      </div>
      {seriesCollection && (
        <div className='bg-accent-1 border-accent-2 border mb-2 p-4 rounded'>
          <span className="text-lg font-bold">
            Series: { seriesCollection.name }
          </span>
          <div className="flex flex-col">
            {seriesCollection.entries && seriesCollection.entries.map(e => (
              <span key={e.slug}>
                {e.slug === activeSlug ? (
                  <div className='italic'> {e.order}: {e.title} </div>
                ) : (
                  <Link to={`/blog/${e.slug}`}>{e.order}: {e.title} </Link>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogFooter