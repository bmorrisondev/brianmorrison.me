import React from 'react'
import Navbar from "./Navbar"
import CallToAction from "./CallToActionComponent"
import socials from "../data/social-links.json"
import DiscordWidget from "./widgets/DiscordWidget"
import SocialWidget from "./widgets/SocialWidget"

const HeroComponent = () => (
  <div className="hero-wrapper parallax">
    <Navbar />
    <div className="hero container">
      <div className="row">
        <div className="col-12">
          <h1 className="hero-header">Hi, my name is Brian.</h1>
          <div className="hero-content">I'm a software engineer and live coder on <a href={socials.twitch}>Twitch</a>.</div>
        </div>
      </div>
    </div>
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
    {/* <CallToAction
      className="hero-cta"
      title="Follow me on Twitch!"
      content="Live coding every Thurs at 8:30pm Central Time."
      buttonText="My Twitch Channel"
      buttonLink={socials.twitch} /> */}
  </div>
)

export default HeroComponent
