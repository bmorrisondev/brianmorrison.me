import React from 'react'
import Navbar from "./Navbar2"

const HeroComponent = () => (
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
    <div className="hero-cta-wrapper">
      <div className="hero-cta container">
        <div className="row">
          <div className="col-12">
            Follow me on Twitch!
          </div>
        </div>
      </div>
    </div> 
  </div>
)

export default HeroComponent
