import React from 'react'
import { Link } from 'gatsby'
import { DateFormatter } from '../formatters/CommonFormatters'
import PrettyCodeDivider from '../PrettyCodeDivider'

const PostMetaWidget = ({
  date,
  author,
  categories,
  tags
}) => {
  return (
    <div className="post-meta-widget">
      <DateFormatter className="post-meta-date" date={date} />
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
      {/* {categories && categories.length > 0 && ( */}
      {false && (
        <div>
          <PrettyCodeDivider />
          <div className="row categories-panel">
            <h4>Categories</h4>
          </div>
        </div>
      )}
      {/* {tags && tags.length > 0 && ( */}
      {false && (
        <div>
          <PrettyCodeDivider />
          <div className="row tags-panel">
            <h4>Tags</h4>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostMetaWidget