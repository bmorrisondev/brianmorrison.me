import React from 'react'

const Footer = () => (
  <div className="footer footer-wrapper">
    <div className="container">
      <div className="row">
        <div className="col-md-12 footer-content">
          {`© ${(new Date).getFullYear()} Brian Morrison II`}
          {/* © {(new Date).getFullYear()} Brian Morrison II */}
        </div>
      </div>
    </div>
  </div>
)

export default Footer