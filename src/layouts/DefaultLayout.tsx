import React, { ReactNode } from 'react'
import Helmet from 'react-helmet'
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
  }

  .container:not(.home-container) {
    max-width: 960px !important;
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }

  figcaption {
    color: ${colors.light.textAccent};
    text-align: center;
    font-style: italic;
  }
`

type Props = {
  children: ReactNode
  location: any
  description?: string
  ogImageUrl?: string
  pageTitle?: string
}

function DefaultLayout(props: Props) {
  const { children, pageTitle, location, ogImageUrl, description } = props

  const origin = "https://brianmorrison.me"
  const defaultDescription = "Personal blog of Brian Morrison II, full stack developer & content creator."

  return (
    <Wrapper>
      <Helmet>
        <title>{pageTitle ? `${pageTitle} - ` : ""}Brian Morrison II</title>
        <meta property="og:image" content={ogImageUrl ? origin + ogImageUrl  : `${origin}/img/social.png`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brian Morrison II" />
        <meta property="og:description" content={description ? description.replace(/(<([^>]+)>)/ig, '') : defaultDescription} />
        <meta property="og:url" content={origin + location.path} />
        <meta property="og:site_name" content="Brian Morrison II" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${pageTitle ? `${pageTitle} - ` : ""}Brian Morrison II`} />
        <meta property="twitter:site" content="@brianmmdev" />
        <meta property="twitter:creator" content="@brianmmdev" />
        <meta property="twitter:description" content={description ? description.replace(/(<([^>]+)>)/ig, '') : defaultDescription} />
      </Helmet>
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