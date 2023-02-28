import React from 'react'
import { Link } from 'gatsby'
import Socials from './Socials'
import breakpoints from "../breakpoints"
import socials from '../socials'
import SocialIconLink from './SocialIconLink'
import Discord from './svgs/Discord'
import GitHub from './svgs/GitHub'
import Instagram from './svgs/Instagram'
import LinkedIn from './svgs/LinkedIn'
import Twitter from './svgs/Twitter'
import YouTube from './svgs/YouTube'

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
    <div className='flex align-middle justify-between h-[50px]'>
      <div>
        <span className="copyright-about-this-site">© {new Date().getFullYear()}&nbsp;•<Link to="/about-this-site">About this site</Link></span>
      </div>
      <div>
        <SocialIconLink href={socials.youtube}><YouTube /></SocialIconLink>
        <SocialIconLink href={socials.discord}><Discord /></SocialIconLink>
        <SocialIconLink href={socials.twitter}><Twitter /></SocialIconLink>
        <SocialIconLink href={socials.instagram}><Instagram /></SocialIconLink>
        <SocialIconLink href={socials.github}><GitHub /></SocialIconLink>
        <SocialIconLink href={socials.linkedin}><LinkedIn /></SocialIconLink>
      </div>
    </div>
  )
}

export default Footer