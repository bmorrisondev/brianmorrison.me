import React from "react"
// import { Link } from "gatsby"
import CallToAction from "../components/CallToActionComponent"

import HomeLayout from "../components/HomeLayout"
import SocialWidget from "../components/widgets/SocialWidget"

const IndexPage = () => (
  <HomeLayout>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>About Me</h2>
          <p>Thanks for visiting! I’m a Sr Software Dev based in the west Chicago suburbs, working primarily in the IoT space. I’m also a 2x AWS Certified Associate (Solutions Architect & Developer). I love anything and everything to do with software development and cloud infrastructure.</p>
          <p>Work aside, I have a beautiful wife and three awesome boys! Most of my spare time is spent with them as my family is the most important thing in my life.</p>
          <p>I love connecting with others, so feel free to reach out for anything.</p>
        </div>
        <div className="col-md-6">
          <h2>Current Projects</h2>
        </div>
      </div>
    </div>
    <CallToAction
      className="skills-cta"
      title="Skills & Experience"
      content="Learn more about my skill-set and experiences of over 10 years in IT!"
      buttonText="Learn More"
      buttonLink="/about-me" />
    <div className="contact-area contact-wrapper parallax">
      <div className="container"> 
        <div className="row">
          <div className="col-12">
            <h2>Get in Touch</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h4>Discord</h4>
            <p>The easiest way to contact me is on my Discord server, where we discuss code, hobbies, and participate in weekly challenges:</p>
            <iframe src="https://discordapp.com/widget?id=553773331674038282&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
          </div>
          <div className="col-md-6">
            <SocialWidget />
          </div>
        </div>
      </div>
    </div>
  </HomeLayout>
)

export default IndexPage
