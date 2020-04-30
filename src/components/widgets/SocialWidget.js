import React from 'react'
import socials from '../../data/social-links.json'

const SocialWidget = ({shouldIncludeDiscord}) => (
  <div className="social-widget">
    <div className="row">
      {/* <div className="col-12">
        <h4>Main Channel</h4>
      </div> */}
      {/* <span>
        <img alt="twitch-logo" src='/img/social/twitch-logo.png' />
        <a href={socials.twitch} target="_blank" rel="noopener noreferrer">
          Twitch Channel
        </a>
      </span> */}
      <span>
        <img alt="mixer-logo" src='/img/social/mixer-logo.png' />
        <a href={socials.mixer} target="_blank" rel="noopener noreferrer">
          Mixer Channel
        </a>
      </span>
      <span>    
        <img alt="youtube-logo" src='/img/social/youtube-logo.png' />
        <a href={socials.youtube} target="_blank" rel="noopener noreferrer"> 
          YouTube Channel
        </a>
      </span>
      <span>    
        <img alt="twitter-logo" src='/img/social/twitter-logo.png' />
        <a href={socials.twitter} target="_blank" rel="noopener noreferrer"> 
          Twitter (@brianmmdev)
        </a>
      </span>
      <span>                
        <img alt="instagram-logo" src='/img/social/insta-logo.png' />
        <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </span>
      <span>                  
        <img alt="facebook-logo" src='/img/social/facebook-logo.png' />
        <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
          Facebook  
        </a>
      </span>
      <span>
        <img alt="messenger-logo" src='/img/social/messenger-logo.png' />
        <a href={socials.messenger} target="_blank" rel="noopener noreferrer">
          Messenger
        </a>
      </span>
      <span>                
        <img alt="whatsapp-logo" src='/img/social/whatsapp-logo.png' />
        <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </span>
      <span>                            
        <img alt="linkedin-logo" src='/img/social/linkedin-logo.png' />
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </span>
      <span>                     
        <img alt="email-logo" src='/img/social/email-logo.png' />
        <a href="mailto:brian@brianmorrison.me">
          Email (brian@brianmorrison.me)
        </a>
      </span>
    </div>
  </div>
)

export default SocialWidget