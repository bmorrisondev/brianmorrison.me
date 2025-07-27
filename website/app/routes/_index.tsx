import type { MetaFunction } from "@remix-run/node";
import { buildHeader } from "~/utils";
import { Link, json, useLoaderData } from "@remix-run/react";
import StylizedListItem from "~/components/StylizedListItem";
import me from "../images/me.jpg"
import wishPinLists1 from "../images/wishpin/1-lists.png"
import wishPinLists2 from "../images/wishpin/2-list.png"
import wishPinLists3 from "../images/wishpin/3-search-amazon.png"
import wishPinLists4 from "../images/wishpin/4-list-settings.png"
import ContentList from "~/components/ContentList";
import ContactForm from "~/components/ContactForm";
import socials from "~/socials";
import type { Job } from "~/models.ts";
import type { PortfolioItem } from "~/models.ts";
import type { Tag } from "~/models.ts";

// Data
import employmentHistory from '../content/notion/notionEmploymentHistoryItem.json';
import portfolioItems from '../content/notion/notionPortfolioItem.json';
import tags from '../content/notion/notionTag.json';
import PortfolioListItem from "~/components/PortfolioListItem";
import { ArrowRight } from "lucide-react";
import Card from "~/components/Card";


export const loader = async () => {
  // Filter for just the three companies we want
  const jobData = (employmentHistory as Job[])
  
  const featuredJobs = jobData.filter(job => 
    job.companyName === "Clerk" || 
    job.companyName === "Temeda LLC" || 
    job.companyName === "LeSaint Logistics"
  );

  const portfolioData = (portfolioItems as PortfolioItem[]).filter(i => i.status === "Published" && i.featured)
  portfolioData.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1)

  portfolioData.forEach(el => {
    el.job = []
    el.relation_job.forEach(jid => {
      const j = jobData.find(j => j.id === jid)
      if(j) {
        el.job?.push(j)
      }
    })

    el.skillsUsed = []
    el.relation_skillsUsed.forEach(sid => {
      // TODO: This is ignored because `Tag` doesn't match the data.
      // The fields are not named the same for some of the relations
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const tag = (tags as Tag[]).find(t => t.id === sid)
      if(tag) {
        el.skillsUsed.push(tag)
      }
    })
  })

  return json({
    jobs: featuredJobs,
    portfolioItems: portfolioData
  });
}

export const meta: MetaFunction = () => buildHeader({})

export default function Index() {
  const { jobs, portfolioItems } = useLoaderData<typeof loader>();
  return (
    <div className='-mt-20'>
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col gap-3 max-w-3xl text-center mx-1">
          <img src={me} alt="Brian Morrison" className="w-32 h-32 rounded-full mx-auto" />
          <div className='text-5xl font-bold font-sans gradient-header pb-2'>My name is Brian</div>
          <div className="md:text-4xl text-3xl font-bold text-neutral-700">I&apos;m a full stack developer with 15+ years experience.</div>
          <Link to="#contact" className="flex justify-center gap-2 font-bold text-2xl">Let&apos;s talk</Link>
        </div>
      </div>

      <div className="md:min-h-screen">
        <div className="bg-gradient h-full md:m-8 md:rounded-xl p-8 mb-8 overflow-x-hidden">
          <div className="flex flex-col gap-2 text-center max-w-xl mx-auto">
            <div className="text-sm">Latest project • Mobile App</div>
            <h2 className="!mt-2">WishPin</h2>
            <p className="!mb-0">WishPin is a web application that allows users to create collaborative wishlists for their loved ones.</p>
            <div className="flex gap-2 items-center mb-2 flex-wrap justify-center">
              <StylizedListItem>React Native</StylizedListItem>
              <StylizedListItem>Docker</StylizedListItem>
              <StylizedListItem>Convex</StylizedListItem>
              <StylizedListItem>Clerk</StylizedListItem>
            </div>
            <div className="flex justify-center mb-2 gap-8">
              {/* <Link to="/portfolio" className="flex justify-center gap-2 font-bold">Learn More</Link> */}
              <Link to="https://wishpin.app" className="flex justify-center gap-2 font-bold">Visit Website</Link>
            </div>
          </div>

          <div className="mt-6 w-full">
            <div className="flex gap-4 items-center justify-center">
              <img src={wishPinLists1} alt="WishPin App - Lists screen" className="lg:h-96 md:h-72 sm:h-64 h-56" />
              <img src={wishPinLists2} alt="WishPin App - Wishlist screen" className="lg:h-96 md:h-72 sm:h-64 h-56" />
              <img src={wishPinLists3} alt="WishPin App - Search Amazon screen" className="lg:h-96 md:h-72 sm:h-64 h-56" />
              <img src={wishPinLists4} alt="WishPin App - List settings screen" className="lg:h-96 md:h-72 sm:h-64 h-56" />
            </div>
          </div>
        </div>
      </div>      
      
      {/* Other Notable Projects */}
      <div className="min-h-screen">
        <div className="h-full md:m-8 md:rounded-xl p-8 mb-8">
          <div className="flex flex-col gap-2 text-center max-w-xl mx-auto">
            <h2 className="!mt-2">Other Notable Projects</h2>
            <p className="!mb-0">Here are some of the more notable projects I&apos;ve worked on that showcase my skills and expertise as a tech professional.</p>
            <div className="flex justify-center mb-6">
              <Link to="/portfolio" className="flex justify-center gap-2 font-bold">View Portfolio</Link>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {portfolioItems.map(item => (
              <PortfolioListItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Work Experience */}
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
              <Link to={`/work-with-me#${job.slug}`} key={job.id} className="group/job-item bg-white rounded p-6 flex flex-col transition-colors hover:shadow hover:border-neutral-300 border border-neutral-200 text-inherit">
                <div className="flex justify-center mb-4">
                  {job.logo && job.logo.length > 0 && 
                    <img src={job.logo[0]} alt={`${job.companyName} logo`} className="h-16 object-contain" />
                  }
                </div>
                <div className="flex flex-col gap-0.5 mb-4">
                  <h3 className="text-xl font-bold">{job.companyName}</h3>
                  <div className="text-gray-700">{job.title}</div>
                  <div className="text-gray-500 text-sm">{job.yearsActive}</div>
                </div>
                <div className="text-sm flex-grow">
                  {job.summary}
                </div>
                <div className='flex justify-end'>
                  <ArrowRight className="opacity-20 group-hover/job-item:opacity-100 transition-all" />
                </div>
              </Link>
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