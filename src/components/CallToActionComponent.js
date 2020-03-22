import React from 'react'

const CallToAction = ({
  title,
  content,
  buttonLink,
  buttonText,
  className
}) => {
  var _className = "cta"
  
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
            <div>TODO: Put button here</div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallToAction