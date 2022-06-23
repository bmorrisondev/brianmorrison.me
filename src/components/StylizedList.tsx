import React, { ReactNode } from 'react'
import styled from 'styled-components'
import colors from '../colors'

const Wrapper = styled.ul`
  padding: 0;

  li:first-child {
    margin-left: 0px;
  }

  li {
    display: inline-block;
    background-color: ${colors.light.backgroundAccent};
    padding: 3px 15px;
    margin: 5px;
    border-radius: 5px;
    font-size: 1rem;
    line-height: 1.4rem;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: white !important;
      -webkit-text-fill-color: inherit !important;
    }

    li:hover {
      background: linear-gradient(45deg, ${colors.global.gradientPurple}, ${colors.global.gradientBlue} 50%);
    }
  }
`

type Props = {
  children: ReactNode
}

function StylizedList(props: Props) {
  const { children } = props

  return (
    <Wrapper>
      { children }
    </Wrapper>
  )
}

export default StylizedList