import type { MetaFunction } from "@remix-run/node";
import { buildHeader } from "~/utils";
import { Link, json, useLoaderData } from "@remix-run/react";
import StylizedListItem from "~/components/StylizedListItem";
import me from "../images/me.jpg"
import mockup1 from "../images/mockups/iphone-mockup1.svg"
import mockup2 from "../images/mockups/iphone-mockup2.svg"
import mockup3 from "../images/mockups/iphone-mockup3.svg"
import ContentList from "~/components/ContentList";
import ContactForm from "~/components/ContactForm";
import socials from "~/socials";
import type { Job } from "~/models.ts";

// Data
import employmentHistory from '../content/notion/notionEmploymentHistoryItem.json';

export const loader = async () => {
  // Filter for just the three companies we want
  const jobData = (employmentHistory as Job[]).filter(job => 
    job.companyName === "Clerk" || 
    job.companyName === "Temeda LLC" || 
    job.companyName === "LeSaint Logistics"
  );
  
  return json({
    jobs: jobData
  });
}

export const meta: MetaFunction = () => buildHeader({})

export default function Index() {
  const { jobs } = useLoaderData<typeof loader>();
  return (
    <div className='-mt-20'>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col gap-3 max-w-3xl text-center">
          <img src={me} alt="Brian Morrison" className="w-32 h-32 rounded-full mx-auto" />
          <div className='text-5xl font-bold font-sans gradient-header'>My name is Brian</div>
          <div className="md:text-4xl text-3xl font-bold text-neutral-700">I&apos;m a full stack developer with 15+ years experience.</div>
          <Link to="#contact" className="flex justify-center gap-2 font-bold text-2xl underline">Let&apos;s talk</Link>
        </div>
      </div>

      <div className="min-h-screen">
        <div className="bg-gradient h-full md:m-8 md:rounded-xl p-8 mb-8">
          <div className="flex flex-col gap-2 text-center max-w-xl mx-auto">
            <div className="text-sm">Latest project • Mobile App</div>
            <h2 className="!mt-2">WishPin</h2>
            <p className="!mb-0">WishPin is a web application that allows users to create and manage wish lists for their loved ones.</p>
            <div className="flex gap-2 items-center mb-2 flex-wrap justify-center">
              <StylizedListItem>React Native</StylizedListItem>
              <StylizedListItem>Docker</StylizedListItem>
              <StylizedListItem>Convex</StylizedListItem>
              <StylizedListItem>Clerk</StylizedListItem>
            </div>
            <div className="flex justify-center mb-2">
              <Link to="/portfolio" className="flex justify-center gap-2 font-bold">View Project</Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <img src={mockup1} alt="WishPin App - Lists Screen" className="h-80" />
              <img src={mockup2} alt="WishPin App - Items Screen" className="h-80" />
              <img src={mockup3} alt="WishPin App - Add Item Screen" className="h-80" />
            </div>
          </div>
        </div>
      </div>      
      
      <div className="min-h-screen">
        <div className="h-full md:m-8 md:rounded-xl p-8 mb-8">
          <div className="flex flex-col gap-2 text-center max-w-xl mx-auto">
            <h2 className="!mt-2">Other notable projects</h2>
            <p className="!mb-0">Here are some of the more notable projects I&apos;ve worked on that showcase my skills and expertise as a tech professional.</p>
            <div className="flex justify-center mb-2">
              <Link to="/portfolio" className="flex justify-center gap-2 font-bold">View Portfolio</Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <img src={mockup1} alt="WishPin App - Lists Screen" className="h-80" />
              <img src={mockup2} alt="WishPin App - Items Screen" className="h-80" />
              <img src={mockup3} alt="WishPin App - Add Item Screen" className="h-80" />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen">
        <div className="bg-gradient-to-b from-gray-100 to-white h-full md:m-8 md:rounded-xl p-8 mb-8">

          <div className="flex flex-col gap-2 text-center max-w-xl mx-auto mb-4">
            <div className="text-sm">Applications • Infrastructure • Automation</div>
            <h2 className="!mt-2">Work Experience</h2>
            <p className="!mb-0">Key positions I&apos;ve held over the course of my 15 year career in tech.</p>
            <Link to="/work-with-me#work-history" className="flex justify-center gap-2 font-bold">View my full work history</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg p-6 flex flex-col">
                <div className="flex justify-center mb-4">
                  {job.logo && job.logo.length > 0 && 
                    <img src={job.logo[0]} alt={`${job.companyName} logo`} className="h-16 object-contain" />
                  }
                </div>
                <h3 className="text-xl font-bold mb-2">{job.companyName}</h3>
                <div className="text-gray-700 mb-2">{job.title}</div>
                <div className="text-gray-500 text-sm mb-4">{job.yearsActive}</div>
                <div className="text-sm flex-grow mb-4">
                  {job.summary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="content">
        <ContentList />
      </div>

      
      <div className="min-h-screen" id="contact">
        <div className="h-full md:m-8 md:rounded-xl p-8 mb-8 bg-gradient-to-b from-gray-100 to-white">
          <div className="flex flex-col gap-2 text-center max-w-xl mx-auto">
            <div className="text-sm">Let&apos;s talk</div>
            <h2 className="!mt-2">Contact me</h2>
            <p className="!mb-2">I&apos;m always looking for new opportunities to work with talented individuals and teams. If you&apos;re interested in working with me, let me know!</p>
            <ContactForm />
            <p className="!mt-2">You can also reach me on your favorite social network:</p>
            <div className="flex justify-center">
              <StylizedListItem to={socials.linkedin}>LinkedIn</StylizedListItem>
              <StylizedListItem to={socials.twitter}>Twitter</StylizedListItem>
              <StylizedListItem to={socials.github}>GitHub</StylizedListItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}