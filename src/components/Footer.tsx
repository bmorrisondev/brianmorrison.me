import React from 'react'
import { Link } from 'gatsby'
import socials from '../socials'
import SocialIconLink from './SocialIconLink'
import Discord from './svgs/Discord'
import GitHub from './svgs/GitHub'
import Instagram from './svgs/Instagram'
import LinkedIn from './svgs/LinkedIn'
import Twitter from './svgs/Twitter'
import YouTube from './svgs/YouTube'

function Footer() {
  return (
    <div className='flex align-middle justify-between h-[40px] px-2'>
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