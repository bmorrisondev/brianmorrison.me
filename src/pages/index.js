import React from "react"
import { Link } from "gatsby"
import Helmet from 'react-helmet'

import Navbar from "../components/Navbar"
// import Layout from "../components/Layout"
// import Image from "../components/Image"
// import SEO from "../components/Seo"

const IndexPage = () => (
  // <Layout>
  //   {/* <SEO title="Home" /> */}
  //   <h1>Hi people</h1>
  //   <p>Welcome to your new Gatsby site.</p>
  //   <p>Now go build something great.</p>
  //   <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
  //     {/* <Image /> */}
  //   </div>
  //   <Link to="/page-2/">Go to page 2</Link>
  // </Layout>
  <div className="home-wrapper">
    <Helmet title="Home | Gatsby + WordPress">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
    </Helmet>
    <div className="hero-wrapper">
      <Navbar />
      <div className="hero container">
        <div className="row">
          <div className="col-12">
            <h1 className="hero-header">Here comes new stuff!</h1>
          </div>
          <div className="col-4">
            <div className="hero-content">
              Col 1
            </div>
          </div>
          <div className="col-4">
            <div className="hero-content">
              Col 2
            </div>
          </div>
          <div className="col-4">
            <div className="hero-content">
              Col 3
            </div>
          </div>
        </div>
      </div>
      {/* <svg class="vc_shape-divider" fill="#6441a5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 300" preserveAspectRatio="none">  
        <path d="M 1014 264 v 122 h -808 l -172 -86 s 310.42 -22.84 402 -79 c 106 -65 154 -61 268 -12 c 107 46 195.11 5.94 275 137 z"></path>   <path d="M -302 55 s 235.27 208.25 352 159 c 128 -54 233 -98 303 -73 c 92.68 33.1 181.28 115.19 235 108 c 104.9 -14 176.52 -173.06 267 -118 c 85.61 52.09 145 123 145 123 v 74 l -1306 10 z"></path>  
        <path d="M -286 255 s 214 -103 338 -129 s 203 29 384 101 c 145.57 57.91 178.7 50.79 272 0 c 79 -43 301 -224 385 -63 c 53 101.63 -62 129 -62 129 l -107 84 l -1212 12 z"></path>  
        <path d="M -24 69 s 299.68 301.66 413 245 c 8 -4 233 2 284 42 c 17.47 13.7 172 -132 217 -174 c 54.8 -51.15 128 -90 188 -39 c 76.12 64.7 118 99 118 99 l -12 132 l -1212 12 z"></path>  
        <path d="M -12 201 s 70 83 194 57 s 160.29 -36.77 274 6 c 109 41 184.82 24.36 265 -15 c 55 -27 116.5 -57.69 214 4 c 49 31 95 26 95 26 l -6 151 l -1036 10 z"></path> 
      </svg> */}
    </div>
    <div className="hero-cta-wrapper">
      <div className="hero-cta container">
        <div className="row">
          <div className="col-12">
            Follow me on Twitch!
          </div>
        </div>
      </div>
    </div>
    <h1>welcome home</h1>
  </div>
)

export default IndexPage
