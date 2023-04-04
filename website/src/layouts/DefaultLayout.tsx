import React, { ReactNode, useState } from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Navigation from '../components/Nav'

type Props = {
  children: ReactNode
  location: any
  description?: string
  ogImageUrl?: string
  pageTitle?: string
}

const defaultDescription = "Personal blog of Brian Morrison II, full stack developer & content creator."
const origin = "https://brianmorrison.me"

function fixupDescription(description: string): string {
  let temp = ""
  let spl = description.split(" ")
  for(let i = 0; temp.length < 100 && i - 1 < spl.length; i++) {
    temp += spl[i]
    if(temp.length < 100) {
      temp += " "
    }
  }
  if(temp.length >= 100) {
    temp += "..."
  }
  temp = temp.replace(/(<([^>]+)>)/ig, '')
  return temp
}

function DefaultLayout(props: Props) {
  const { children, pageTitle, location, ogImageUrl, description } = props

  const titleHeader = pageTitle ? pageTitle : "Brian Morrison II"
  const desc = description ? fixupDescription(description) : defaultDescription;

  return (
    <div>
      <Helmet>
        <title>{pageTitle ? `${pageTitle} - ` : ""}Brian Morrison II</title>
        <meta property="og:image" content={ogImageUrl ? origin + ogImageUrl  : `${origin}/img/social.png`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={titleHeader} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={origin + location.pathname} />
        <meta property="og:site_name" content="Brian Morrison II" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={titleHeader} />
        <meta property="twitter:site" content="@brianmmdev" />
        <meta property="twitter:creator" content="@brianmmdev" />
        <meta property="twitter:description" content={desc} />
      </Helmet>
      <Navigation />
      <div className="main">
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
