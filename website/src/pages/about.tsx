import { Link, graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Container from '../components/Container'
import React from 'react'
import StylizedList from '../components/StylizedList'
import DefaultLayout from '../layouts/DefaultLayout'
import socials from '../socials'
import StylizedListItem from '../components/StylizedListItem'
import BlockQuote from '../components/BlockQuote'
import PortfolioListItem from '../components/PortfolioListItem'

function About({ location }) {
  const data = useStaticQuery(graphql`
    {
      allNotionEmploymentHistoryItem(filter: {
        jobType: {
          slug: {
            ne: "contractor"
          }
        }
      }, sort:{
        yearsActive: DESC
      }) {
        edges {
          node {
            id
            title
            jobType {
              slug
              name
            }
            companyName
            yearsActive
            html
            logo
            testimonial
            testimonialAuthor
            notableProjects {
              slug
              title
              excerpt
              status
              skillsUsed {
                icon
                name
              }
            }
          }
        }
      }
    }
  `)

  const jobs = data.allNotionEmploymentHistoryItem.edges.map(el => el.node)

  return (
    <DefaultLayout location={location} pageTitle="About Me">
      <Container>
        <div>
          <h1>About Me</h1>
          <div>
            <p>I'm a full stack software developer with a passion for all things tech, from web development to cloud infrastructure. I also develop technical <Link to="/blog">content</Link> to help other developers learn new and interesting things in the tech space.</p>
          </div>
          <div className="certifications">
            <h2>Certifications</h2>
            <div className='flex space-x-2'>
              <a href="https://www.youracclaim.com/badges/885db61f-cf70-4922-bbbe-d66cb02a6336/public_url"
                className='shadow-sm text-black flex flex-col items-center bg-white border-background-accent border-[1px] hover:shadow-lg rounded p-1 transition-all'
                target="_blank">
                <StaticImage src="../images/cert-badges/aws-dev-assoc.png" alt="AWS Dev Assoc Image" />
                <span>2019 - 2022</span>
              </a>
              <a href="https://www.youracclaim.com/badges/0740ed31-39a7-4515-b3df-1a51478ddbc7/public_url"
                className='shadow-sm text-black flex flex-col items-center bg-white border-background-accent border-[1px] hover:shadow-lg rounded p-1 transition-all'
                target="_blank">
                <StaticImage src="../images/cert-badges/aws-sa-assoc.png" alt="AWS Solutions Architect Assoc Image" />
                <span>2019 - 2022</span>
              </a>
              <a href="https://www.youracclaim.com/badges/f24caf74-41fc-4cdb-a032-dcf9c20c9b4b/public_url"
                className='shadow-sm text-black flex flex-col items-center bg-white border-background-accent border-[1px] hover:shadow-lg rounded p-1 transition-all'
                target="_blank">
                <StaticImage src="../images/cert-badges/ccna-rs.png" alt="CCNA Routing and Switching" />
                <span>2015 - 2018</span>
              </a>
            </div>
          </div>
          <div className="proficiencies">
            <h2>Proficiencies</h2>
            <h3>Languages:</h3>
            <StylizedList>
              <StylizedListItem>JavaScript</StylizedListItem>
              <StylizedListItem>C#</StylizedListItem>
              <StylizedListItem>Go</StylizedListItem>
            </StylizedList>
            <h3>Frameworks:</h3>
            <StylizedList>
              <StylizedListItem>.NET Core/Framework</StylizedListItem>
              <StylizedListItem>React</StylizedListItem>
              <StylizedListItem>Gatsby</StylizedListItem>
              <StylizedListItem>Vue</StylizedListItem>
              <StylizedListItem>Gridsome</StylizedListItem>
            </StylizedList>
            <h3>Cloud/Infrastructure:</h3>
            <StylizedList>
              <StylizedListItem>AWS</StylizedListItem>
              <StylizedListItem>Azure</StylizedListItem>
              <StylizedListItem>Netlify</StylizedListItem>
              <StylizedListItem>Digital Ocean</StylizedListItem>
              <StylizedListItem>Linux (Ubuntu, Centos)</StylizedListItem>
              <StylizedListItem>Windows Server</StylizedListItem>
              <StylizedListItem>Networking</StylizedListItem>
            </StylizedList>
            <h3>DevOps:</h3>
            <StylizedList>
              <StylizedListItem>Azure DevOps</StylizedListItem>
              <StylizedListItem>GitHub Actions</StylizedListItem>
              <StylizedListItem>Jenkins</StylizedListItem>
              <StylizedListItem>Octopus</StylizedListItem>
            </StylizedList>
          </div>
          <h2>More</h2>
          <p>I have a great passion for technology and simply love working with it to help solve problems. While most of my jobs have started with a focus on systems & networking, I have always found ways to build tools and automations for the companies I've worked with over the years as a means to both exercise my love for software development and provide more value to the company.</p>
          <p>Outside of tech, I love spending time with my wife and three sons, gaming on the PlayStation or Steam Deck, and being active when I can. </p>

          <div className="work-history">
            <h2 className="mb-8">Work history</h2>
            {jobs.map(j => (
              <div className="mb-8">
                {j.logo && j.logo.length > 0 && <img src={j.logo[0]} alt={`${j.companyName} logo`} className="max-w-[300px] py-2"></img>}
                <h3>{j.title} @ {j.companyName}</h3>
                <div className="italic mb-2">{ j.yearsActive }</div>
                {j.testimonial && (
                  <BlockQuote citation={j.testimonialAuthor}>
                    { j.testimonial }
                  </BlockQuote>
                )}
                <div dangerouslySetInnerHTML={{__html: j.html}}></div>
                {j.notableProjects && j.notableProjects.length > 0 && j.notableProjects.filter(p => p.status === "Published").length > 0 && (
                  <div>
                    <p className="italic">Notable projects:</p>
                    <div className="grid md:grid-cols-3 gap-2">
                      {j.notableProjects.filter(p => p.status === "Published").map(el => (
                        <PortfolioListItem item={el} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default About
