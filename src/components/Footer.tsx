import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Socials from './Socials'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
  height: 2.5rem;

  a {
    color: inherit;
    text-decoration: none;
    margin-left: 5px;
  }

  .footer-left {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }

  .footer-right {
    display: flex;
    align-items: center;
  }
`

function Footer() {
  return (
    <Wrapper>
      <div className="footer-left">
        <span className="copyright-about-this-site">© {new Date().getFullYear()}&nbsp;•<Link to="/about-this-site">About this site</Link></span>
      </div>
      <div className="footer-right">
        <Socials />
      </div>
    </Wrapper>
  )
}

export default Footer