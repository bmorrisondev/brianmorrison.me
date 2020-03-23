import React from "react"
import HelmetWrapper from "./HelmetWrapper"
import Hero from "./Hero"
import Footer from "./Footer"

import './all.sass'

const IndexPage = ({children}) => (
  <div className="home-wrapper">
    <HelmetWrapper pageTitle="Home" />
    <Hero />
    <div>
      {children}
    </div>
    <Footer />
  </div>
)

export default IndexPage
