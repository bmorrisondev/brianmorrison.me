import React from 'react'
import { Link } from 'gatsby'
import Socials from './Socials'
import breakpoints from "../breakpoints"

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   padding: 15px;
//   width: 100%;
//   height: 2.5rem;

//   @media screen and (max-width: ${breakpoints.sm}) {
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     margin-bottom: 20px;

//     .footer-left, .footer-right {
//       margin-bottom: 10px;
//     }

//     .footer-right {
//       justify-content: center;
//       align-items: center;
//       width: 100%;
//     }
//   }

//   a {
//     color: inherit;
//     text-decoration: none;
//     margin-left: 5px;
//   }

//   .footer-left {
//     display: flex;
//     flex-direction: row;
//     justify-content: left;
//     align-items: center;
//   }

//   .footer-right {
//     display: flex;
//     align-items: center;
//   }
// `

function Footer() {
  return (
    <div>
      <div className="footer-left">
        <span className="copyright-about-this-site">© {new Date().getFullYear()}&nbsp;•<Link to="/about-this-site">About this site</Link></span>
      </div>
      <div className="footer-right">
        <Socials />
      </div>
    </div>
  )
}

export default Footer