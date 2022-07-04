import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../colors'
import { SeriesCollection } from '../models'
import Twitter from './svgs/Twitter'

const Wrapper = styled.div`
  background-color: ${colors.light.backgroundAccent};
  border-radius: 5px;
  padding: 10px;

  .section {
    margin-bottom: 15px;
  }

  .section-header {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    margin: 5px 0px;

    .icon {
      margin-right: 5px;
    }
  }

  .share-section {
    svg {
      height: 40px;
      width: 40px;
    }
  }

  .series-section {
    .entries {
      display: flex;
      flex-direction: column;

      .active {
        font-weight: bold;
      }
    }
  }
`

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
    <Wrapper>
      <div className="section share-section">
        <span className="section-header">
          Share this article
        </span>
        <div>
          <a href={twitterHref} target="_blank">
            <Twitter />
          </a>
        </div>
      </div>
      {seriesCollection && (
        <div className="section series-section">
          <span className="section-header">
            {seriesCollection.icon && <GatsbyImage className="icon" image={seriesCollection.icon.gatsbyImage} alt={seriesCollection.icon.altText} />}
            Series: { seriesCollection.name }
          </span>
          <div className="entries">
            {seriesCollection.entries && seriesCollection.entries.map(e => (
              <Link key={e.slug}
                className={e.slug == activeSlug ? "active" : ""}
                to={`/blog/${e.slug}`}>{e.order}: {e.title}</Link>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default BlogFooter