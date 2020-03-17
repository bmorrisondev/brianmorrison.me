import React from 'react'
import logo from '../img/logo-light-retina.png'

export default function Navbar() {
  return (
    <div className="nav-wrapper">
      <div className="container">
        <div className="row">
          <div className="nav col-12">
            <img src={logo} alt="Brian Morrison II" className="logo" />
          </div>
        </div>
      </div>
    </div>
  )
}
