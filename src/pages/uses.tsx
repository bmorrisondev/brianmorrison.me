import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import StylizedList from '../components/StylizedList'
import { StaticImage } from 'gatsby-plugin-image'
import Container from '../components/Container'

function Uses({ location }) {
  const rig = [
    { "item": "CoolerMaster MB511", "url": "https://amzn.to/2AZfPUc" },
    { "item": "GIGABYTE X570 AORUS Elite Wifi", "url": "https://amzn.to/2AZijlt" },
    { "item": "Sabrent 1TB Rocket", "url": "https://amzn.to/316zIDy" },
    { "item": "Corsair Vengeance RGB Pro 64GB", "url": "https://amzn.to/3epbybf" },
    { "item": "AMD Ryzen 9 3900X", "url": "https://amzn.to/2CxwYov" },
    { "item": "ASUS ROG STRIX GeForce GTX 1080", "url": "https://amzn.to/3hYuEar" },
  ]

  const streamGear = [
    { "item": "SteelSeries Arctis 7", "url": "https://amzn.to/3hOUpJX" },
    { "item": "Elgato Game Capture HD60 Pro", "url": "https://amzn.to/2V8nTc8" },
    { "item": "Logitech C922x Pro Stream", "url": "https://amzn.to/2V7PKZY" },
    { "item": "TaoTronics Camera Light", "url": "https://amzn.to/37QI4Ax" },
    { "item": "InnoGear Microphone Arm", "url": "https://amzn.to/37Ql8Bk" },
    { "item": "Audio-Technica AT2005USB", "url": "https://amzn.to/3ajIuRh" },
  ]
  return (
    <DefaultLayout location={location} pageTitle="Uses">
      <Container>
        <h1>Uses</h1>
        <p>Here is a list of the various tech I use on a daily basis.</p>
        <h2>Software</h2>
        <StylizedList>
          <li>VS Code</li>
          <li>Visual Studio</li>
          <li>Sublime Text</li>
          <li>Postman</li>
          <li>Adobe CS6</li>
          <li>Affinity Designer</li>
          <li>Notion</li>
          <li>Trello</li>
          <li>Todoist</li>
          <li>Streamlabs OBS</li>
          <li>Office 365</li>
          <li>Windows</li>
        </StylizedList>
        <h2>Hardware</h2>
        <p>All items below are clickable Amazon Affiliate links.</p>
        <h3>My Rig</h3>
        <StylizedList>
          {rig.map(item => (
            <a key={item.url} href={item.url} target="_blank">
              <li>{ item.item }</li>
            </a>
          ))}
        </StylizedList>
        <h3>Streaming Gear</h3>
        <StylizedList>
          {streamGear.map(item => (
            <a key={item.url} href={item.url} target="_blank">
              <li>{ item.item }</li>
            </a>
          ))}
        </StylizedList>
        <h2>Pics</h2>
        <p>This is where I work every day. Desk is adjustable, and the cables actually run into the basement where the computer is near my server.</p>
        <StaticImage src="../images/uses-desk.jpg" alt="my desk" className="uses-img"/>
        <p>Here is one of the computer right after I built it.</p>
        <StaticImage src="../images/uses-computer.jpg" alt="my computer" className="uses-img"/>
        <p>And here is my HP Server that I use for testing & backups of all my data. (Excuse the mess 😅)</p>
        <StaticImage src="../images/uses-server.jpg" alt="my server" className="uses-img"/>
      </Container>
    </DefaultLayout>
  )
}

export default Uses