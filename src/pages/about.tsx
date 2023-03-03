import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Container from '../components/Container'
import React from 'react'
import StylizedList from '../components/StylizedList'
import DefaultLayout from '../layouts/DefaultLayout'
import socials from '../socials'
import StylizedListItem from '../components/StylizedListItem'
import BlockQuote from '../components/BlockQuote'
import List from '../components/List'

function About({ location }) {
  return (
    <DefaultLayout location={location} pageTitle="About Me">
      <Container>
        <div>
          <h1 className='gradient-header'>About Me</h1>
          <div>
            <p>I'm a full stack software developer currently working in the IoT space. I also develop technical content for <a href={socials.youtube} target="_blank">YouTube</a> and my <Link to="/blog">blog</Link>.</p>
          </div>
          <div className="certifications">
            <h2>Certifications</h2>
            <div className='flex space-x-2'>
              <a href="https://www.youracclaim.com/badges/885db61f-cf70-4922-bbbe-d66cb02a6336/public_url"
                className='text-black flex flex-col items-center bg-white border-background-accent border-[1px] hover:border-gradientBlue rounded-lg p-1'
                target="_blank">
                <StaticImage src="../images/cert-badges/aws-dev-assoc.png" alt="AWS Dev Assoc Image" />
                <span>2019 - 2022</span>
              </a>
              <a href="https://www.youracclaim.com/badges/0740ed31-39a7-4515-b3df-1a51478ddbc7/public_url"
                className='text-black flex flex-col items-center bg-white border-background-accent border-[1px] hover:border-gradientBlue rounded-lg p-1'
                target="_blank">
                <StaticImage src="../images/cert-badges/aws-sa-assoc.png" alt="AWS Solutions Architect Assoc Image" />
                <span>2019 - 2022</span>
              </a>
              <a href="https://www.youracclaim.com/badges/f24caf74-41fc-4cdb-a032-dcf9c20c9b4b/public_url"
                className='text-black flex flex-col items-center bg-white border-background-accent border-[1px] hover:border-gradientBlue rounded-lg p-1'
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
              <StylizedListItem>Jenkins</StylizedListItem>
              <StylizedListItem>Octopus</StylizedListItem>
            </StylizedList>
          </div>
          <h2>More</h2>
          <p>I have a great passion for technology and simply love working with it to help solve problems. While most of my jobs have started with a focus on systems & networking, I have always found ways to build tools and automations for the companies I've worked with over the years as a means to both exercise my love for software development and provide more value to the company.</p>
          <p>Outside of tech, I love spending time with my wife and three sons, playing Destiny 2 on Google Stadia (@brianmm02), and moving heavy things 9-12 times for sets (as in, I love to workout 💪). </p>

          <div className="work-history">
            <h2>Work History</h2>
            <p>I've been working in the tech industry since 2008. Below is a chronological order of my work history.</p>

            <StaticImage src="../images/logos/onyx.png" className="max-w-[300px]" alt="onyx computer repair logo"  />
            <h3>Onyx Computer Repair</h3>
            <span className="italic mb-2">2009 - 2013</span>
            <p>I started working at a big box retailer as a computer repair specialist before leaving to start my own company focusing on computer repair, networking, and general systems configuration. I worked with individuals as well as business to help solve computer-related issues, regardless of the scale. I also built several websites and applications, including <Link to="/portfolio/proposals-app">Proposals App</Link> & <Link to="/portfolio/contact-notebooks">Contact Notebooks</Link> detailed in my portfolio.</p>
            <p>In 2013, my now wife and I were getting serious about starting a life together, so I made the decision to move away from being a solopreneur to getting a job for more steady income.</p>

            <hr className="my-2" />
            <StaticImage src="../images/logos/systech.png" className="max-w-[300px]" alt="systech logo" />
            <h3>Systech Information Services</h3>
            <span className='italic mb-2'>2013 - 2015</span>
            <BlockQuote citation="Jack Prager, President, Systech Information Services">
              I had the pleasure of working with Brian at Systech. We at Systech are an IT Managed services provider. During Brian's engagement with us we had required customized software on many occasions. Brian was easy to work with and listened well to our needs and the customer's needs and was able to boil down those needs into a deliverable software solution. I would recommend Brian for any of your software programming requirements.
            </BlockQuote>
            <p>I joined Systech in 2013 as a Network Engineer, it was a job very similar to my own company where the daily requirements were very dynamic. I was constantly working with new and interesting technologies as required by our customers. My primary focuses were;</p>
            <List>
              <li>Repairing computers & servers</li>
              <li>Provisioning new machines & networking equipment</li>
              <li>Managing Office 365 tenants</li>
              <li>Pretty much anything that was requested by our clients</li>
            </List>
            <p>Midway through my tenure at Systech, my role was changed to focus specifically on onboarding new clients into our system. I designed a project template that was used on a number of clients to ensure that all of the required hardware & software were correctly procured, configured, and deployed to the client site.</p>
            <p>Through all of this, I had a secondary focus of building applications for internal use, and for several clients. Here are the notable development projects I worked on at Systech;</p>
            <List>
              <li><Link to="/portfolio/project-unify">Systech Unify</Link></li>
              <li><Link to="/portfolio/quoting-pro">Quoting Pro</Link></li>
            </List>

            <hr className="my-2" />
            <StaticImage src="../images/logos/lesaint.png" className="max-w-[300px]" alt="lesaint logo" />
            <h3>LeSaint Logistics</h3>
            <span className="italic mb-2">2015 - 2019</span>
            <p>In 2015, I joined LeSaint Logistics as a Systems Engineer with a focus with assisting help desk support, as well as maintaining a datacenter & network of 20 warehouses across the US. I was quickly promoted to Senior Systems Engineer where I was put in charge of managing projects as related to the IT Operations department and ensuring successful execution of these projects in a timely manner. Some of my notable systems projects are;</p>
            <List>
              <li>Migrating 1500+ users from an on-premise exchange environment to Office 365</li>
              <li>Upgrading our Fiber SAN, including replication to a backup DC at a different warehouse</li>
              <li>Implementing a ShoreTel VOIP system</li>
            </List>
            <p>As with my role at Systech, I also worked on smaller software development projects on the side to assist in automating various parts of the department. These included;</p>
            <List>
              <li>A Windows Server Update utility</li>
              <li>A redesigned portal for external users</li>
              <li>A system that automates onboarding new employees</li>
            </List>
            <p>In early 2018, our in-house developer left the company and I was offered the position of Software Engineer due to my successful side-projects in the organization. I was given the responsibility of onboarding new integration customers, facilitating a successful integration and extending the functionality of our .NET API as needed, all while retaining my responsibilities as a Senior Systems Engineer while a my replacement could be found.</p>
            <p>In 2019, I decided I wanted to focus my career on software development & cloud infrastructure, so I obtained my AWS certifications as a Solutions Architect & Developer, both Associate level certifications.</p>

            <hr className="my-2" />
            <StaticImage src="../images/logos/temeda.png" className="max-w-[300px]" alt="temeda logo"/>
            <h3>Temeda</h3>
            <span className="italic mb-2">2019 - Current</span>
            <p>My current role has me at Temeda LLC as a Senior Software Developer. I work on both the API built in .NET, and the front end application built with a combination of React & AngularJS. I also work on various integrations with vendors and clients as needed, and act as a resource to assist with designing architecture in Azure. </p>
            <p>Some notable projects so far;</p>
            <List>
              <li>Clusterpoints</li>
              <li>Dynamic Query</li>
              <li>Inspections Feature</li>
              <li>Multi-Account User Switching</li>
            </List>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default About
