import React, { useState, useEffect } from "react"

const DiscordWidget = ({
  guildId
}) => {
  const [name, setName] = useState(0)
  const [activeCount, setActiveCount] = useState(0)
  const [inviteLink, setInviteLink] = useState(0)

  useEffect(() => {
    // get data from GitHub api
    fetch(`https://discordapp.com/api/guilds/${guildId}/widget.json`)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setName(resultData.name)
        setActiveCount(resultData.presence_count)
        setInviteLink(resultData.instant_invite)
      }) // set data for the number of stars
  }, [])
  
  return (
    <div className="discord-widget">
      <div className="content-panel">
        <span className="widget-title">Chat on my Discord Community</span>
        <div className="info-panel">
          <span>{name} • </span>
          <span>online members: {activeCount}</span>
        </div>
      </div>
      <a href={inviteLink} className="connect-button" alt="join-on-discord-button"><i className="fab fa-discord"></i>Join</a>
    </div>
  )
}

export default DiscordWidget