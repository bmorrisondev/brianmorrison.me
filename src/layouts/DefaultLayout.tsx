import React, { ReactNode } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import colors from '../colors'
import Footer from '../components/Footer'
import Navigation from '../components/Nav'

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url('/img/bg.png');
    background-position: right bottom;
    background-repeat: no-repeat;
    background-color: ${colors.light.background} !important;
    color: ${colors.light.text};
    min-height: 100vh;
  }

  #___gatsby{
    // 106px = 66px from nav + 40px from footer
    min-height: calc(100vh - 106px);
  }

  #gatsby-focus-wrapper {
    min-height: calc(100vh - 106px);
  }

  h1 {
    display: inline-block;
    font-size: calc(2rem + 1.5vw) !important;
    margin-top: 3rem !important;
    padding-bottom: 1.3rem !important;
    background: -webkit-linear-gradient(45deg, ${colors.global.gradientPurple}, ${colors.global.gradientBlue} 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 15px rgba(0,0,0,0.2);
  }

  h2 {
    margin-top: 2rem !important;
  }

  h3 {
    margin-top: 1.3rem !important;
    font-weight: 400 !important;
  }
`

const Wrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - 106px);

  .main {
    height: 100%;
    padding-bottom: 2.5rem;
    min-height: calc(100vh - 106px);

    img {
      border-radius: 5px;
      border: 1px solid ${colors.light.backgroundAccent};
    }
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