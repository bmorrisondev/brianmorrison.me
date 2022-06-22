import React from 'react'
import styled from 'styled-components'
import colors from '../../colors'

const Wrapper = styled.svg`
  &:hover {
    fill: ${colors.global.instagramPink};
  }
`

function Instagram() {
  return (
    <Wrapper className="insta-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M16,3H8C5.239,3,3,5.239,3,8v8c0,2.761,2.239,5,5,5h8c2.761,0,5-2.239,5-5V8C21,5.239,18.761,3,16,3z M12,17c-2.761,0-5-2.239-5-5s2.239-5,5-5s5,2.239,5,5S14.761,17,12,17z M18,7c-0.552,0-1-0.448-1-1s0.448-1,1-1s1,0.448,1,1S18.552,7,18,7z"/>
      <path d="M12 9A3 3 0 1 0 12 15A3 3 0 1 0 12 9Z"/>
    </Wrapper>
  )
}

export default Instagram