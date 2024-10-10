import StylizedList from '../components/StylizedList'
import Container from '../components/Container'
import StylizedListItem from '../components/StylizedListItem'
import { buildHeader } from '~/utils'

// Images
import desk from "../images/uses-desk.jpg"
import computer from "../images/uses-computer.jpg"
import server from "../images/uses-server.jpg"

export const meta = () => buildHeader("Uses")

function Uses() {
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
      <Container>
        <h1>Uses</h1>
        <p>Here is a list of the various tech I use on a daily basis.</p>
        <h2>Software</h2>
        <StylizedList>
          <StylizedListItem>VS Code</StylizedListItem>
          <StylizedListItem>Visual Studio</StylizedListItem>
          <StylizedListItem>Sublime Text</StylizedListItem>
          <StylizedListItem>Postman</StylizedListItem>
          <StylizedListItem>Adobe CS6</StylizedListItem>
          <StylizedListItem>Affinity Designer</StylizedListItem>
          <StylizedListItem>Notion</StylizedListItem>
          <StylizedListItem>Trello</StylizedListItem>
          <StylizedListItem>Todoist</StylizedListItem>
          <StylizedListItem>Streamlabs OBS</StylizedListItem>
          <StylizedListItem>Office 365</StylizedListItem>
          <StylizedListItem>Windows</StylizedListItem>
        </StylizedList>
        <h2>Hardware</h2>
        <p>All items below are clickable Amazon Affiliate links.</p>
        <h3>My Rig</h3>
        <StylizedList>
          {rig.map(item => (
            <StylizedListItem key={item.url} to={item.url}>
              { item.item }
            </StylizedListItem>
          ))}
        </StylizedList>
        <h3>Streaming Gear</h3>
        <StylizedList>
          {streamGear.map(item => (
            <StylizedListItem key={item.url} to={item.url}>
              { item.item }
            </StylizedListItem>
          ))}
        </StylizedList>
        <h2>Pics</h2>
        <p>This is where I work every day. Desk is adjustable, and the cables actually run into the basement where the computer is near my server.</p>
        <img src={desk} alt="my desk" className="uses-img"/>
        <p>Here is one of the computer right after I built it.</p>
        <img src={computer} alt="my computer" className="uses-img"/>
        <p>And here is my HP Server that I use for testing & backups of all my data. (Excuse the mess 😅)</p>
        <img src={server} alt="my server" className="uses-img"/>
      </Container>
  )
}

export default Uses