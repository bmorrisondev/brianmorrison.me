import React, { ReactNode } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import colors from '../colors'
import Footer from '../components/Footer'
import Navigation from '../components/Nav'

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url('img/bg.png');
    background-position: right bottom;
    background-repeat: no-repeat;
    background-color: ${colors.light.background};
    color: ${colors.light.text};
    min-height: 100vh;
  }

  #___gatsby{
    height: calc(100vh - 40px - 2.5rem);
  }

  #gatsby-focus-wrapper {
    height: 100%;
  }
`

const Wrapper = styled.div`
  height: 100%;

  .main {
    height: 100%;
    padding-bottom: 2.5rem;
  }
`

type Props = {
  children: ReactNode
}

function DefaultLayout(props: Props) {
  const { children } = props

  return (
    <Wrapper>
      <GlobalStyle />
      <Navigation />
      <div className="main">
        { children }
      </div>
      <Footer />
    </Wrapper>
  )
}

export default DefaultLayout