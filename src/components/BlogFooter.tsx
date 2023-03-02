import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useState, useEffect } from 'react'
import colors from '../colors'
import { SeriesCollection } from '../models'
import Twitter from './svgs/Twitter'

// const Wrapper = styled.div`
//   background-color: ${colors.light.backgroundAccent};
//   border-radius: 5px;
//   padding: 10px;

//   .section {
//     margin-bottom: 15px;
//   }

//   .section-header {
//     display: flex;
//     align-items: center;
//     font-weight: bold;
//     font-size: 18px;
//     margin: 5px 0px;

//     .icon {
//       margin-right: 5px;
//     }
//   }

//   .share-section {
//     svg {
//       height: 40px;
//       width: 40px;
//     }
//   }

//   .series-section {
//     .entries {
//       display: flex;
//       flex-direction: column;

//       .active {
//         font-weight: bold;
//       }
//     }
//   }
// `

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
      let as = location.pathname.split("/")[location.pathname.split("/").length - 1]
      setActiveSlug(as)
    }

    if(location && location.href) {
      setTwitterHref(`https://twitter.com/intent/tweet?text=${articleTitle} by @brianmmdev%0A%0A&url=${location.href}`)
    }
  }, [])

  return (
    <div className='bg-accent-1 border-accent-2 border mb-2 p-4 rounded'>
      <div className="mb-2">
        <span className="text-xl font-bold">
          Share this article
        </span>
        <div>
          <a href={twitterHref} target="_blank">
            <Twitter />
          </a>
        </div>
      </div>
      {seriesCollection && (
        <div>
          <span className="text-xl font-bold">
            Series: { seriesCollection.name }
          </span>
          <div className="flex flex-col">
            {seriesCollection.entries && seriesCollection.entries.map(e => (
              <Link key={e.slug}
                className={e.slug == activeSlug ? "font-bold" : ""}
                to={`/blog/${e.slug}`}>{e.order}: {e.title}</Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogFooter