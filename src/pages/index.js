import React from "react"
// import { Link } from "gatsby"
import CallToAction from "../components/CallToActionComponent"
import DiscordWidget from "../components/widgets/DiscordWidget"
import HomeLayout from "../components/HomeLayout"
import SocialWidget from "../components/widgets/SocialWidget"

const IndexPage = () => (
  <HomeLayout>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="home-panel">
            <h2>Get in touch.</h2>
            <DiscordWidget />
            <SocialWidget />
          </div>
        </div>
        <div className="col-md-6">
          <div className="home-panel">
            <h2>From the blog.</h2>
          </div>
        </div>
      </div>
    </div>
  </HomeLayout>
)

export default IndexPage
