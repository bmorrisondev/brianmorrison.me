import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
// import { Container } from 'react-bootstrap'
// import styled from 'styled-components'
import colors from '../colors'
import StylizedList from '../components/StylizedList'
import DefaultLayout from '../layouts/DefaultLayout'
import socials from '../socials'

// const Wrapper = styled(Container)`
//   .more-icon {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//   }

//   .cert-block {
//     display: inline-flex;
//     flex-direction: column;
//     align-items: center;
//     text-decoration: none;
//     color: inherit;

//     img {
//       height: 120px
//       width: 120px
//     }

//     span {
//       font-weight: bold;
//     }

//     &:hover {
//       span {
//         background: linear-gradient(45deg, ${colors.global.gradientPurple}, ${colors.global.gradientBlue} 50%);
//         -webkit-background-clip: text;
//         -webkit-text-fill-color: transparent;
//       }

//     }
//   }

//   .cert-block-ccna {
//     img {
//       background-color: white;
//       border: 1px solid ${colors.light.backgroundAccent};
//       border-radius: 20px;
//     }
//   }

//   .proficiencies {
//     .subheader {
//       font-style: italic;
//     }
//   }

//   .work-history {
//     .work-years {
//       font-style: italic;
//       font-size: 1.2rem;
//     }

//     .employer-logo {
//       margin: 20px 0px;
//       max-width: 300px;
//     }
//   }

// `

function About({ location }) {
  return (
    <DefaultLayout location={location} pageTitle="About Me">
      <div>
        <div>
          <h1>About Me</h1>
          <div>
            <p>I'm a full stack software developer currently working in the IoT space. I also develop technical content for <a href={socials.youtube} target="_blank">YouTube</a> and my <Link to="/blog">blog</Link>.</p>
          </div>
          <div className="certifications">
            <h2>Certifications</h2>
            <a href="https://www.youracclaim.com/badges/885db61f-cf70-4922-bbbe-d66cb02a6336/public_url" className="cert-block" target="_blank">
              <StaticImage src="../images/cert-badges/aws-dev-assoc.png" alt="AWS Dev Assoc Image" />
              <span>2019 - 2022</span>
            </a>
            <a href="https://www.youracclaim.com/badges/0740ed31-39a7-4515-b3df-1a51478ddbc7/public_url" className="cert-block" target="_blank">
              <StaticImage src="../images/cert-badges/aws-sa-assoc.png" alt="AWS Solutions Architect Assoc Image" />
              <span>2019 - 2022</span>
            </a>
            <a href="https://www.youracclaim.com/badges/f24caf74-41fc-4cdb-a032-dcf9c20c9b4b/public_url" className="cert-block cert-block-ccna" target="_blank">
              <StaticImage src="../images/cert-badges/ccna-rs.png" alt="CCNA Routing and Switching" />
              <span>2015 - 2018</span>
            </a>
          </div>
          <div className="proficiencies">
            <h2>Proficiencies</h2>
            <h3>Languages:</h3>
            <StylizedList>
              <li>JavaScript</li>
              <li>C#</li>
            </StylizedList>
            <h3>Frameworks:</h3>
            <StylizedList>
              <li>.NET Core/Framework</li>
              <li>React</li>
              <li>Gatsby</li>
              <li>Vue</li>
              <li>Gridsome</li>
            </StylizedList>
            <h3>Cloud/Infrastructure:</h3>
            <StylizedList>
              <li>AWS</li>
              <li>Azure</li>
              <li>Netlify</li>
              <li>Digital Ocean</li>
              <li>Linux (Ubuntu, Centos)</li>
              <li>Windows Server</li>
              <li>Networking</li>
            </StylizedList>
            <h3>DevOps:</h3>
            <StylizedList>
              <li>Azure DevOps</li>
              <li>Jenkins</li>
              <li>Octopus</li>
            </StylizedList>
          </div>
          <h2>More</h2>
          <p>I have a great passion for technology and simply love working with it to help solve problems. While most of my jobs have started with a focus on systems & networking, I have always found ways to build tools and automations for the companies I've worked with over the years as a means to both exercise my love for software development and provide more value to the company.</p>
          <p>Outside of tech, I love spending time with my wife and three sons, playing Destiny 2 on Google Stadia (@brianmm02), and moving heavy things 9-12 times for sets (as in, I love to workout 💪). </p>

          <div className="work-history">
            {/* <a name="work-history" /> */}
            <h2>Work History</h2>
            <p>I've been working in the tech industry since 2008. Below is a chronological order of my work history.</p>

            <StaticImage src="../images/logos/onyx.png" className="employer-logo" alt="onyx computer repair logo"  />
            <h3>Onyx Computer Repair</h3>
            <span className="work-years">2009 - 2013</span>
            <hr />
            <p>I started working at a big box retailer as a computer repair specialist before leaving to start my own company focusing on computer repair, networking, and general systems configuration. I worked with individuals as well as business to help solve computer-related issues, regardless of the scale. I also built several websites and applications, including <Link to="/portfolio/proposals-app">Proposals App</Link> & <Link to="/portfolio/contact-notebooks">Contact Notebooks</Link> detailed in my portfolio.</p>
            <p>In 2013, my now wife and I were getting serious about starting a life together, so I made the decision to move away from being a solopreneur to getting a job for more steady income.</p>

            <StaticImage src="../images/logos/systech.png" className="employer-logo" alt="systech logo" />
            <h3>Systech Information Services</h3>
            <span className="work-years">2013 - 2015</span>
            <hr />
            <blockquote><p>I had the pleasure of working with Brian at Systech. We at Systech are an IT Managed services provider. During Brian's engagement with us we had required customized software on many occasions. Brian was easy to work with and listened well to our needs and the customer's needs and was able to boil down those needs into a deliverable software solution. I would recommend Brian for any of your software programming requirements.</p><cite>- Jack Prager, President, Systech Information Services</cite></blockquote>

            <p>I joined Systech in 2013 as a Network Engineer, it was a job very similar to my own company where the daily requirements were very dynamic. I was constantly working with new and interesting technologies as required by our customers. My primary focuses were;</p>
            <ul>
              <li>Repairing computers & servers</li>
              <li>Provisioning new machines & networking equipment</li>
              <li>Managing Office 365 tenants</li>
              <li>Pretty much anything that was requested by our clients</li>
            </ul>
            <p>Midway through my tenure at Systech, my role was changed to focus specifically on onboarding new clients into our system. I designed a project template that was used on a number of clients to ensure that all of the required hardware & software were correctly procured, configured, and deployed to the client site.</p>
            <p>Through all of this, I had a secondary focus of building applications for internal use, and for several clients. Here are the notable development projects I worked on at Systech;</p>
            <ul>
              <li><Link to="/portfolio/project-unify">Systech Unify</Link></li>
              <li><Link to="/portfolio/quoting-pro">Quoting Pro</Link></li>
            </ul>

            <StaticImage src="../images/logos/lesaint.png" className="employer-logo" alt="lesaint logo" />
            <h3>LeSaint Logistics</h3>
            <span className="work-years">2015 - 2019</span>
            <hr />
            <p>In 2015, I joined LeSaint Logistics as a Systems Engineer with a focus with assisting help desk support, as well as maintaining a datacenter & network of 20 warehouses across the US. I was quickly promoted to Senior Systems Engineer where I was put in charge of managing projects as related to the IT Operations department and ensuring successful execution of these projects in a timely manner. Some of my notable systems projects are;</p>
            <ul>
              <li>Migrating 1500+ users from an on-premise exchange environment to Office 365</li>
              <li>Upgrading our Fiber SAN, including replication to a backup DC at a different warehouse</li>
              <li>Implementing a ShoreTel VOIP system</li>
            </ul>
            <p>As with my role at Systech, I also worked on smaller software development projects on the side to assist in automating various parts of the department. These included;</p>
            <ul>
              <li>A Windows Server Update utility</li>
              <li>A redesigned portal for external users</li>
              <li>A system that automates onboarding new employees</li>
            </ul>
            <p>In early 2018, our in-house developer left the company and I was offered the position of Software Engineer due to my successful side-projects in the organization. I was given the responsibility of onboarding new integration customers, facilitating a successful integration and extending the functionality of our .NET API as needed, all while retaining my responsibilities as a Senior Systems Engineer while a my replacement could be found.</p>
            <p>In 2019, I decided I wanted to focus my career on software development & cloud infrastructure, so I obtained my AWS certifications as a Solutions Architect & Developer, both Associate level certifications.</p>

            <StaticImage src="../images/logos/temeda.png" className="employer-logo" alt="temeda logo"/>
            <h3>Temeda</h3>
            <span className="work-years">2019 - Current</span>
            <hr />
            <p>My current role has me at Temeda LLC as a Senior Software Developer. I work on both the API built in .NET, and the front end application built with a combination of React & AngularJS. I also work on various integrations with vendors and clients as needed, and act as a resource to assist with designing architecture in Azure. </p>
            <p>Some notable projects so far;</p>
            <ul>
              <li>Clusterpoints</li>
              <li>Dynamic Query</li>
              <li>Inspections Feature</li>
              <li>Multi-Account User Switching</li>
            </ul>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default About
