import React, { useState, useEffect } from "react"

const DiscordWidget = () => {
  const [name, setName] = useState(0)
  const [memberCount, setMemberCount] = useState(0)
  const [activeCount, setActiveCount] = useState(0)
  const [inviteLink, setInviteLink] = useState(0)

  useEffect(() => {
    // get data from GitHub api
    fetch(`https://discordapp.com/api/guilds/553773331674038282/widget.json`)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setName(resultData.name)
        setMemberCount(resultData.members.length)
        setActiveCount(resultData.presence_count)
        setInviteLink(resultData.instant_invite)
      }) // set data for the number of stars
  }, [])
  
  return (
    <div className="discord-widget">
      {/* <h2>Discord</h2>
      <div>{name}</div>
      <div>{memberCount}</div>
      <div>{activeCount}</div>
      <div>{inviteLink}</div> */}
    </div>
  )
}

export default DiscordWidget