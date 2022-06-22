import React from 'react'
import styled from 'styled-components'
import colors from '../../colors'

const Wrapper = styled.svg`
  &:hover {
    fill: ${colors.global.hashnodeBlue};
  }
`

function Hashnode() {
  return (
    <Wrapper className="hashnode-icon" fill="none" height="337" viewBox="0 0 337 337" width="337">
      <rect height="111" rx="55.5" width="111" x="113" y="113"/>
      <path clip-rule="evenodd" d="M23.155 112.598c-30.873 30.874-30.873 80.93 0 111.804l89.443 89.443c30.874 30.873 80.93 30.873 111.804 0l89.443-89.443c30.873-30.874 30.873-80.93 0-111.804l-89.443-89.443c-30.874-30.873-80.93-30.873-111.804 0l-89.443 89.443zm184.476 95.033c21.612-21.611 21.612-56.651 0-78.262-21.611-21.612-56.651-21.612-78.262 0-21.612 21.611-21.612 56.651 0 78.262 21.611 21.612 56.651 21.612 78.262 0z" fill-rule="evenodd"/>
    </Wrapper>
  )
}

export default Hashnode