import React from 'react'
// import styled from 'styled-components'
import colors from '../colors'
import socials from '../socials'
import Discord from './svgs/Discord'
import GitHub from './svgs/GitHub'
import Hashnode from './svgs/Hashnode'
import Instagram from './svgs/Instagram'
import Twitter from './svgs/Twitter'
import YouTube from './svgs/YouTube'
import LinkedIn from './svgs/LinkedIn'
import breakpoints from '../breakpoints'
import SocialIconLink from './SocialIconLink'

// const Wrapper = styled.div`
//   width: 150px;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;

//   @media screen and (max-width: ${breakpoints.sm}) {
//     width: 100%;
//     justify-content: center;
//     align-items: center;
//   }

//   a {
//     color: inherit;
//   }

//   svg {
//     margin-left: 5px;
//     fill: ${colors.light.text};
//     height: 25px;
//     width: 25px;
//   }
// `

function Socials() {
  return (
    <div className='w-[150px] flex justify-end'>
      <SocialIconLink href={socials.youtube}><YouTube /></SocialIconLink>
      <SocialIconLink href={socials.discord}><Discord /></SocialIconLink>
      <SocialIconLink href={socials.twitter}><Twitter /></SocialIconLink>
      <SocialIconLink href={socials.instagram}><Instagram /></SocialIconLink>
      <SocialIconLink href={socials.github}><GitHub /></SocialIconLink>
      <SocialIconLink href={socials.linkedin}><LinkedIn /></SocialIconLink>
    </div>
  )
}

export default Socials