import React from 'react'
import socials from '../../data/social-links.json'

const SocialWidget = ({shouldIncludeDiscord}) => (
  <div className="social-widget">
    <h4>Main Channel</h4>
    <div>            
      <a href={socials.twitch} target="_blank" rel="noopener noreferrer">
        <img alt="twitch-logo" src='/img/social/twitch-logo.png'/>
        Twitch Channel
      </a>
    </div>
    <h4>Channel Updates & IRL</h4>
    <div>            
      <a href={socials.twitter} target="_blank" rel="noopener noreferrer"> 
        <img alt="twitter-logo" src='/img/social/twitter-logo.png' />
        Twitter (@brianmmdev)
      </a>
    </div>
    <div>            
      <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
        <img alt="instagram-logo" src='/img/social/insta-logo.png' />
        Instagram
      </a>
    </div>
    <h4>Message Me</h4>
    <div>            
      <a href="https://m.me/brianmm02/" target="_blank" rel="noopener noreferrer">
        <img alt="messenger-logo" src='/img/social/messenger-logo.png' />
        Messenger
      </a>
    </div>
    <div>            
      <a href="https://wa.me/17083412229" target="_blank" rel="noopener noreferrer">
        <img alt="whatsapp-logo" src='/img/social/whatsapp-logo.png' />
        WhatsApp
      </a>
    </div>
    <h4>Others</h4>
    <div>            
      <a href="https://www.facebook.com/brianmm02" target="_blank" rel="noopener noreferrer">
        <img alt="facebook-logo" src='/img/social/facebook-logo.png' />
        Facebook  
      </a>
    </div>
    <div>            
      <a href="https://www.linkedin.com/in/brianmorrison2/" target="_blank" rel="noopener noreferrer">
        <img alt="linkedin-logo" src='/img/social/linkedin-logo.png' />
        LinkedIn
      </a>
    </div>
    <div>            
      <a href="mailto:brian@brianmorrison.me">
        <img alt="email-logo" src='/img/social/email-logo.png' />
        Email (brian@brianmorrison.me)
      </a>
    </div>
  </div>
)

export default SocialWidget