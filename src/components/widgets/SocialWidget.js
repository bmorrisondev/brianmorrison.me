import React from 'react'

const SocialWidget = ({shouldIncludeDiscord}) => (
  <div className="social-widget">
    <h4>Main Channel</h4>
    <div>            
      <a href="https://twitch.tv/brianmmdev">
        <img alt="twitch-logo" src="../../img/social/twitch-logo.png" />
        Twitch Channel
      </a>
    </div>
    <h4>Channel Updates & IRL</h4>
    <div>            
      <a href="https://twitter.com/brianmmdev">
        <img alt="twitter-logo" src="https://brianmorrison.me/wp-content/uploads/2019/04/twitch-e1554421266872.png" />
        Twitter (@brianmmdev)
      </a>
    </div>
    <div>            
      <a href="https://www.instagram.com/brianmmdev/">
        <img alt="instagram-logo" src="https://brianmorrison.me/wp-content/uploads/2019/04/twitch-e1554421266872.png" />
        Instagram
      </a>
    </div>
    <h4>Message Me</h4>
    <div>            
      <a href="https://m.me/brianmm02/">
        <img alt="messenger-logo" src="https://brianmorrison.me/wp-content/uploads/2019/04/twitch-e1554421266872.png" />
        Messenger
      </a>
    </div>
    <div>            
      <a href="https://wa.me/17083412229">
        <img alt="whatsapp-logo" src="https://brianmorrison.me/wp-content/uploads/2019/04/twitch-e1554421266872.png" />
        WhatsApp
      </a>
    </div>
    <h4>Others</h4>
    <div>            
      <a href="https://www.facebook.com/brianmm02">
        <img alt="facebook-logo" src="https://brianmorrison.me/wp-content/uploads/2019/04/twitch-e1554421266872.png" />
        Facebook
      </a>
    </div>
    <div>            
      <a href="https://www.linkedin.com/in/brianmorrison2/">
        <img alt="linkedin-logo" src="https://brianmorrison.me/wp-content/uploads/2019/04/twitch-e1554421266872.png" />
        LinkedIn
      </a>
    </div>
    <div>            
      <a href="mailto:brian@brianmorrison.me">
        <img alt="email-logo" src="https://brianmorrison.me/wp-content/uploads/2019/04/twitch-e1554421266872.png" />
        Email (brian@brianmorrison.me)
      </a>
    </div>
  </div>
)

export default SocialWidget