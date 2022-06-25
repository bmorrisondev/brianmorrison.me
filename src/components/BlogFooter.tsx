import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import colors from '../colors'
import { SeriesCollection } from '../models'

const Wrapper = styled.div`
  background-color: ${colors.light.backgroundAccent};
  border-radius: 5px;
  padding: 10px;

  .series-meta {
    .name {
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 18px;
      margin: 5px 0px;

      .icon {
        margin-right: 5px;
      }

    }

    .entries {
      display: flex;
      flex-direction: column;
    }
  }
`

type Props = {
  seriesCollection?: SeriesCollection
}

function BlogFooter(props: Props) {
  const { seriesCollection } = props

  return (
    <Wrapper>
      {/* <div>TODO: Newsletter Signup</div> */}
      {seriesCollection && (
        <div className="series-meta">
          <span className="name">
            {seriesCollection.icon && <GatsbyImage className="icon" image={seriesCollection.icon.gatsbyImage} alt={seriesCollection.icon.altText} />}
            Series: { seriesCollection.name }
          </span>
          <div className="entries">
            {seriesCollection.entries && seriesCollection.entries.map(e => (
              <Link key={e.slug} to={`/blog/${e.slug}`}>{e.order}: {e.title}</Link>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default BlogFooter