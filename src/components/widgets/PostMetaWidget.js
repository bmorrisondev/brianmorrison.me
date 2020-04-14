import React from 'react'
import { Link } from 'gatsby'
import { DateFormatter } from '../formatters/CommonFormatters'

const PostMetaWidget = ({
  date,
  author
}) => {
  return (
    <div className="post-meta-widget">
      <DateFormatter date={date} />
      <div className="row author-panel">
        <div className="col-md-4">
          <img src={author.avatar.url} 
            className="img-fluid rounded-circle author-image" />
        </div>
        <div className="col-md-8 my-auto author-name">
          <h3>By {author.name}</h3>
        </div>
        <div className="col-md-12 author-description" 
          dangerouslySetInnerHTML={{ __html: author.description}} />
        {/* <div className="col-md-12 author-link">
          <Link to={`authors/${author.slug}`}>
            More from {author.name} <i class="fas fa-angle-double-right"></i>
          </Link>
        </div> */}
      </div>
    </div>
  )
}

export default PostMetaWidget