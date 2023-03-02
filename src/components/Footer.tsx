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
    <div className='flex mx-auto justify-center items-center sm:justify-between h-[40px] p-4 sm:flex-row flex-col-reverse'>
      <div className='flex space-x-2 md:mb-0 mb-2'>
        <span>© {new Date().getFullYear()}</span>
        <div>•</div>
        <Link to="/about-this-site" className="text-black">About this site</Link>
      </div>
      <div className="flex space-x-2 md:mb-0 mb-2">
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