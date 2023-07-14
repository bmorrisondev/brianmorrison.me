import Image from 'next/image'
import HomeCard from '../components/HomeCard'
import Twitter from '@/components/svgs/Twitter'
import LinkedIn from '@/components/svgs/LinkedIn'
import Paper from '@/components/svgs/Paper'
import { BiLogoLinkedin, BiLogoTwitter, BiLogoYoutube } from 'react-icons/bi'
import { MdArticle, MdOutlineDownload, MdOutlineOpenInBrowser, MdOutlineOpenInFull, MdOutlineOpenInNew } from 'react-icons/md'
import { GrProjects } from 'react-icons/gr'
import HomeButton from '@/components/HomeButton'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:gap-4 lg:p-24 p-4 pt-24">
      <div className="z-10 w-full font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 
          flex w-full items-center justify-center gap-2 border-b lg:border-0
          border-accent-2 bg-gradient-to-b 
          py-2 backdrop-blur-2xl lg:static lg:w-auto lg:p-2 lg:pr-3 
          lg:dark:bg-zinc-800/30 text-lg">
          <img src="/img/profile.png" alt="profile image" className="rounded-full h-[50px] w-auto" /> 
          Brian Morrison II
        </p>
      </div>
      <div className="mb-4 flex items-center justify-center lg:justify-start">
        <span>Developer Educator @ <a href="https://planetscale.com" className="ml-1 border-b border-b-gray-400 hover:border-b-gray-700 transition">PlanetScale</a>.</span>
      </div>

      <div className="mb-4 grid lg:mb-0 xl:grid-cols-5 lg:grid-cols-4 grid-cols-2 text-left gap-4">
        <HomeCard href="https://youtube.com/@brianmmdev" color="youtube">
          <BiLogoYoutube className="text-red-500 text-2xl" /> @brianmmdev
        </HomeCard>
        <HomeCard href="https://threads.net/@brianmmdev" color="twitter" sub="@brianmmdev">
          🧵 @brianmmdev
        </HomeCard>
        <HomeCard href="https://twitter.com/@brianmmdev" color="twitter">
          <BiLogoTwitter className="text-twitterBlue text-2xl" /> @brianmmdev
        </HomeCard>
        <HomeCard href="https://www.linkedin.com/in/brianmmdev">
          <BiLogoLinkedin className="text-linkedinBlue text-xl" /> @brianmmdev
        </HomeCard>
        <HomeCard href="https://brianmorrison.me/blog" color="purple">
          <MdArticle className="text-2xl text-purple-800" /> Blog
        </HomeCard>
        <HomeCard href="https://brianmorrison.me/portfolio" color="purple">
          <GrProjects className="text-xl text-purple-800" /> Portfolio
        </HomeCard>
      </div>

      <div className="mb-4 grid md:grid-cols-2 lg:justify-start gap-4">
        <div className="border-b border-accent-2 pb-4 md:border-0">
          <h3>Coming up</h3>
          <div>I{`'`}ll be speaking at THAT Conference in WI on July 26, 2023. Come hang out with me!</div>
          <a href="https://that.us/activities/rI4h7emwuA6uShUNiatO" target="__blank">
            <img className="rounded shadow-sm hover:shadow-lg transition-all border-2 border-accent-2" src="/img/thatimg.png" />
          </a>
        </div>
        <div className="border-b border-accent-2 pb-4 md:border-0">
          <h3>Let{`'`}s work together!</h3>
          <div>
            <p>
              I{`'`}m a seasoned backend developer with over a decade of experience in the tech industry ranging from managing services & networking equipment to building complex integration systems for an IoT platform.
            </p>
            <p>
              If you feel we could do great work together, reach out and lets have a conversation!
            </p>
          </div>
          <div className="flex gap-2">
            <HomeButton className="shadow hover:shadow-lg transition-all" href="https://brianmorrison.me/contact">
              <MdOutlineOpenInNew /> Contact me
            </HomeButton>
            <HomeButton className="shadow hover:shadow-lg transition-all" href="/files/bmorrison-backend-2023.pdf">
              <MdOutlineDownload /> Resume
            </HomeButton>
          </div>
        </div>
      </div>


      <div className='md:col-span-2 border-accent-2 border rounded-lg'>
        <iframe src="https://embeds.beehiiv.com/db8ca15b-ac1c-4aa3-9912-46fec9df6688"
          data-test-id="beehiiv-embed"
          width="100%"
          height="300"
          className="rounded m-0 bg-transparent"></iframe>
      </div>
    </main>
  )
}
