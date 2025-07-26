import Container from '../components/Container'
import StylizedList from '../components/StylizedList'
import StylizedListItem from '../components/StylizedListItem'
import BlockQuote from '../components/BlockQuote'
import PortfolioListItem from '../components/PortfolioListItem'
import { json, Link, MetaFunction, useLoaderData } from '@remix-run/react'
import { buildHeader } from '~/utils'
import { Job } from '~/models'

// Images
import ccna from "../images/ccna-rs.png"
import sa from "../images/aws-sa-assoc.png"
import awsdev from "../images/aws-dev-assoc.png"
import me from "../images/me.jpg"

// Data
import employmentHistory from '../content/notion/notionEmploymentHistoryItem.json'
import portfolioItems from '../content/notion/notionPortfolioItem.json'

// Certifications data
interface Certification {
  url: string;
  image: string;
  alt: string;
  period: string;
}

const certifications: Certification[] = [
  {
    url: "https://www.youracclaim.com/badges/885db61f-cf70-4922-bbbe-d66cb02a6336/public_url",
    image: awsdev,
    alt: "AWS Dev Assoc",
    period: "2019 - 2022"
  },
  {
    url: "https://www.youracclaim.com/badges/0740ed31-39a7-4515-b3df-1a51478ddbc7/public_url",
    image: sa,
    alt: "AWS Solutions Architect Assoc",
    period: "2019 - 2022"
  },
  {
    url: "https://www.youracclaim.com/badges/f24caf74-41fc-4cdb-a032-dcf9c20c9b4b/public_url",
    image: ccna,
    alt: "CCNA Routing and Switching",
    period: "2015 - 2018"
  }
];

// Proficiencies data
const proficiencies: Record<string, string[]> = {
  "Languages": ["JavaScript", "C#", "Go"],
  "Frameworks": [".NET Core/Framework", "React", "Gatsby", "Vue", "Gridsome"],
  "Cloud/Infrastructure": ["AWS", "Azure", "Netlify", "Digital Ocean", "Linux (Ubuntu, Centos)", "Windows Server", "Networking"],
  "DevOps": ["Azure DevOps", "GitHub Actions", "Jenkins", "Octopus"]
}

export const loader = async () => {
  let jobs: Job[] = JSON.parse(JSON.stringify(employmentHistory))
  jobs = jobs.filter(j => j.visibility?.slug === "public")
  jobs.forEach(el => {
    el.notableProjects = []
    el.relation_notableProjects.forEach(rel => {
      const proj = portfolioItems.find(pi => pi.id === rel)
      if(proj) {
        el.notableProjects.push(proj)
      }
    })
  })
  return json({
    jobs
  })
}

export const meta: MetaFunction = () => buildHeader({
  pageTitle: "Work with me"
})

function WorkWithMe() {
  const { jobs } = useLoaderData<typeof loader>()
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white m-8 mt-20 rounded-xl">
      <Container>
      <div>
        <h1>Work with me</h1>
        {/* Intro section */}
        <div className='flex gap-4 md:flex-row flex-col'>
          <img src={me} alt="Brian Morrison II" className="w-[150px] h-[150px] rounded-sm border-[1px] mb-4" />
          <div className='flex flex-col gap-2'>
            <div className='font-bold text-xl'>Brian Morrison II</div>
            <p>I&apos;m a full stack software developer with over 15 years of experience in the tech space. I have a passion for all things tech, from web development to cloud infrastructure. </p>
            <p>I am always interested in chatting about new collaboration opportunities, so be sure to <Link to="/contact" className="underline px-[5px] mx-[-4px] font-bold hover:bg-white rounded-sm transition-colors">reach out</Link> if you are interested in working with me!</p>
          </div>
        </div>

        {/* Proficiencies section */}
        <div className="proficiencies">
          <h2>Proficiencies</h2>
          {Object.entries(proficiencies).map(([category, items]) => (
            <div key={category}>
              <h3>{category}:</h3>
              <StylizedList>
                {items.map((item, index) => (
                  <StylizedListItem key={`${category.toLowerCase()}-${index}`}>{item}</StylizedListItem>
                ))}
              </StylizedList>
            </div>
          ))}
        </div>

        {/* Work history section */}
        <div className="work-history" id="work-history">
          <h2 className="mb-8">Work history</h2>
          {jobs.map(j => (
            <div key={j.id} className="mb-8" id={j.slug}>
              {j.logo && j.logo.length > 0 && <img src={j.logo[0]} alt={`${j.companyName} logo`} className="max-w-[300px] py-2"></img>}
              <h3>{j.title} @ {j.companyName}</h3>
              <div className="italic mb-2 font-sans">{ j.yearsActive }</div>
              {j.testimonial && (
                <BlockQuote citation={j.testimonialAuthor}>
                  { j.testimonial }
                </BlockQuote>
              )}
              <div dangerouslySetInnerHTML={{__html: j.html}}></div>
              {j.notableProjects && j.notableProjects.length > 0 && j.notableProjects.filter(p => p.status === "Published").length > 0 && (
                <div>
                  <p className="italic font-sans">Notable projects:</p>
                  <div className="grid md:grid-cols-3 gap-2">
                    {j.notableProjects.filter(p => p.status === "Published").map(el => (
                      <PortfolioListItem key={el.id} item={el} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Certifications section */}
        <div className="certifications">
          <h2>Certifications</h2>
          <div className='flex space-x-2'>
            {certifications.map((cert, index) => (
              <a 
                key={`cert-${index}`}
                href={cert.url}
                className='shadow-sm text-black flex flex-col items-center bg-white hover:bg-[rgba(255,255,255,0.8)] rounded-sm p-1 transition-all'
                target="_blank" 
                rel="noreferrer"
              >
                <img src={cert.image} alt={cert.alt} />
                <span>{cert.period}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Container>
    </div>
  )
}

export default WorkWithMe
