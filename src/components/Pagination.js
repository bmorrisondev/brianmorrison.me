import React from 'react'
import { Link } from 'gatsby'

const Pagination = ({ pageContext, pathPrefix }) => {
  const { previousPagePath, nextPagePath } = pageContext

  return (
    <div className="container">
      <div className="row">
        <nav className="pagination" role="navigation">
          <div className="navbar navbar-menu">
            {previousPagePath && (
              <div className="navbar-item">
                <Link to={previousPagePath} rel="prev">
                  Previous
                </Link>
              </div>
            )}
            {nextPagePath && (
              <div className="navbar-item">
                <Link to={nextPagePath} rel="next">
                  Next
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Pagination
