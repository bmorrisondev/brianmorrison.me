import React, { ReactNode } from 'react'
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

function DefaultLayout(props: Props) {
  const { children, pageTitle, location, ogImageUrl, description } = props

  const origin = "https://brianmorrison.me"
  const defaultDescription = "Personal blog of Brian Morrison II, full stack developer & content creator."
  const titleHeader = pageTitle ? pageTitle : "Brian Morrison II"

  console.log(location)

  return (
    <div>
      <Helmet>
        <title>{pageTitle ? `${pageTitle} - ` : ""}Brian Morrison II</title>
        <meta property="og:image" content={ogImageUrl ? origin + ogImageUrl  : `${origin}/img/social.png`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={titleHeader} />
        <meta property="og:description" content={description ? description.replace(/(<([^>]+)>)/ig, '') : defaultDescription} />
        <meta property="og:url" content={origin + location.pathname} />
        <meta property="og:site_name" content="Brian Morrison II" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={titleHeader} />
        <meta property="twitter:site" content="@brianmmdev" />
        <meta property="twitter:creator" content="@brianmmdev" />
        <meta property="twitter:description" content={description ? description.replace(/(<([^>]+)>)/ig, '') : defaultDescription} />
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
