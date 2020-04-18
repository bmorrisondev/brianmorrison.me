import React from 'react'
import { Link } from 'gatsby'
import socials from '../data/social-links.json'

export default function Navbar({
  hideBackground
}) {

  let navWrapperClassName = "nav-wrapper nav-wrapper-bg"
  if(hideBackground === true) {
    navWrapperClassName = "nav-wrapper"
  }

  return (
    <div className={navWrapperClassName}>
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg col-12">
            
            <Link to="/" className="navbar-item">
              <img src='/img/logo-light-retina-2.png' alt="Brian Morrison II" className="logo img-fluid" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto align-items-right">
                {/* <li className="nav-item nav-text-item">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item nav-text-item">
                  <Link to="/portfolio" className="nav-link">
                    Portfolio
                  </Link>
                </li> */}
                <li className="nav-item nav-text-item">
                  <Link to="/blog" className="nav-link">
                    Blog
                  </Link>
                </li>
                <li className="nav-item nav-social-items">
                  <a className="nav-link nav-link-twitch" href={socials.twitch} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitch" />
                  </a>
                  <a className="nav-link nav-link-twitter" href={socials.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="nav-link nav-link-youtube" href={socials.youtube} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube" />
                  </a>
                  <a className="nav-link nav-link-instagram" href={socials.instagram} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram" />
                  </a>
                  <a className="nav-link nav-link-github" href={socials.github} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
