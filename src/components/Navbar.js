import React from 'react'
import { Link } from 'gatsby'
import socials from '../data/social-links.json'

export default function Navbar() {
  return (
    <div className="container">
      <div className="row">
        <nav className="navbar navbar-expand-lg col-12">
          
          <Link to="/" className="navbar-item">
            <img src='/img/logo-light-retina.png' alt="Brian Morrison II" className="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul> */}
            <ul className="navbar-nav ml-auto align-items-right">
              <li className="nav-item nav-text-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item nav-text-item">
                <Link to="/portfolio" className="nav-link">
                  Portfolio
                </Link>
              </li>
              <li className="nav-item nav-text-item">
                <Link to="/blog" className="nav-link">
                  Blog
                </Link>
              </li>
              <li className="nav-item nav-social-item">
                <a className="nav-link nav-link-twitch" href={socials.twitch} target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-twitch"></i>
                </a>
              </li>
              <li className="nav-item nav-social-item">
                <a className="nav-link nav-link-twitter" href={socials.twitter} target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-twitter"></i>
                </a>
              </li>
              <li className="nav-item nav-social-item">
                <a className="nav-link nav-link-youtube" href={socials.youtube} target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-youtube"></i>
                </a>
              </li>
              <li className="nav-item nav-social-item">
                <a className="nav-link nav-link-instagram" href={socials.instagram} target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
              <li className="nav-item nav-social-item">
                <a className="nav-link nav-link-github" href={socials.github} target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-github"></i>
                </a>
              </li>
            </ul>
            {/* <ul class="nav navbar-nav navbar-right">
              <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
              <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
            </ul> */}
            {/* <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
          </div>
        </nav>
      </div>
    </div>
  )
}
