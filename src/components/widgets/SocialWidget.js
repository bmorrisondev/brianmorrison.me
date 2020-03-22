import React from 'react'

const SocialWidget = ({shouldIncludeDiscord}) => (
  <div className="social-widget">
    <h4>Main Channel</h4>
    <div>            
      <a href="https://twitch.tv/brianmmdev">
        <img alt="twitch-logo" src='/img/social/twitch-logo.png' target="_blank" />
        Twitch Channel
      </a>
    </div>
    <h4>Channel Updates & IRL</h4>
    <div>            
      <a href="https://twitter.com/brianmmdev">
        <img alt="twitter-logo" src='/img/social/twitter-logo.png' target="_blank" />
        Twitter (@brianmmdev)
      </a>
    </div>
    <div>            
      <a href="https://www.instagram.com/brianmmdev/">
        <img alt="instagram-logo" src='/img/social/insta-logo.png' target="_blank" />
        Instagram
      </a>
    </div>
    <h4>Message Me</h4>
    <div>            
      <a href="https://m.me/brianmm02/">
        <img alt="messenger-logo" src='/img/social/messenger-logo.png' target="_blank" />
        Messenger
      </a>
    </div>
    <div>            
      <a href="https://wa.me/17083412229">
        <img alt="whatsapp-logo" src='/img/social/whatsapp-logo.png' target="_blank" />
        WhatsApp
      </a>
    </div>
    <h4>Others</h4>
    <div>            
      <a href="https://www.facebook.com/brianmm02">
        <img alt="facebook-logo" src='/img/social/facebook-logo.png' target="_blank" />
        Facebook  
      </a>
    </div>
    <div>            
      <a href="https://www.linkedin.com/in/brianmorrison2/">
        <img alt="linkedin-logo" src='/img/social/linkedin-logo.png' target="_blank" />
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