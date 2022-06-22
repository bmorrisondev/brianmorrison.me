import React from 'react'
import styled from 'styled-components'
import colors from '../colors'
import socials from '../socials'
import Discord from './svgs/Discord'
import GitHub from './svgs/GitHub'
import Hashnode from './svgs/Hashnode'
import Instagram from './svgs/Instagram'
import Twitter from './svgs/Twitter'
import YouTube from './svgs/YouTube'
import LinkedIn from './svgs/LinkedIn'

const Wrapper = styled.div`
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  a {
    color: inherit;
  }

  svg {
    margin-left: 5px;
    fill: ${colors.light.text};
    height: 25px;
    width: 25px;
  }
`

function Socials() {
  return (
    <Wrapper>
      <a href={socials.youtube} target="_blank"><YouTube /></a>
      <a href={socials.discord} target="_blank"><Discord /></a>
      <a href={socials.twitter} target="_blank"><Twitter /></a>
      <a href={socials.instagram} target="_blank"><Instagram /></a>
      <a href={socials.github} target="_blank"><GitHub /></a>
      <a href={socials.linkedin} target="_blank"><LinkedIn /></a>
    </Wrapper>
  )
}

export default Socials