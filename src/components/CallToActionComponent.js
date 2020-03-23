import React from 'react'
import { Link } from 'gatsby'

const CallToAction = ({
  title,
  content,
  buttonLink,
  buttonText,
  className
}) => {
  let _className = "cta"
  
  if(className) {
    _className += ` ${className}`
  }

  return(
    <div className={_className}>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h2>{title}</h2>
            <div>{content}</div>
          </div>
          <div className="col-sm-6">
            <div className="float-md-right">
              {buttonLink.includes("http") && (
                <a className="btn btn-primary cta-button" href={buttonLink} target="_blank" rel="noopener noreferrer">
                  {buttonText}
                </a>
              )}
              {!buttonLink.includes("http") && (
                <Link to={buttonLink} className="btn btn-primary cta-button">
                  {buttonText}
                </Link>
              )}
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction