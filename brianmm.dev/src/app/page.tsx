import Image from 'next/image'
import ButtonLink from '../components/ButtonLink'
import Twitter from '@/components/svgs/Twitter'
import LinkedIn from '@/components/svgs/LinkedIn'
import Paper from '@/components/svgs/Paper'
import { BiLogoLinkedin, BiLogoTwitter, BiLogoYoutube } from 'react-icons/bi'
import { MdArticle, MdOutlineDownload, MdOutlineOpenInBrowser, MdOutlineOpenInFull, MdOutlineOpenInNew } from 'react-icons/md'
import { GrProjects } from 'react-icons/gr'
import HomeButton from '@/components/HomeButton'
import BentoBlock from '@/components/BentoBlock'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:gap-4 lg:p-24 p-4 pt-24 max-w-6xl mx-auto">
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
        <ButtonLink href="https://youtube.com/@brianmmdev">
          <BiLogoYoutube className="text-red-500 text-2xl" /> @brianmmdev
        </ButtonLink>
        <ButtonLink href="https://threads.net/@brianmmdev">
          🧵 @brianmmdev
        </ButtonLink>
        <ButtonLink href="https://twitter.com/@brianmmdev">
          <BiLogoTwitter className="text-twitterBlue text-2xl" /> @brianmmdev
        </ButtonLink>
        <ButtonLink href="https://www.linkedin.com/in/brianmmdev">
          <BiLogoLinkedin className="text-linkedinBlue text-xl" /> @brianmmdev
        </ButtonLink>
        <ButtonLink href="https://brianmorrison.me/blog">
          <MdArticle className="text-2xl text-purple-800" /> Blog
        </ButtonLink>
        <ButtonLink href="https://brianmorrison.me/portfolio">
          <GrProjects className="text-xl text-purple-800" /> Portfolio
        </ButtonLink>
      </div>

      <div className="mb-4 grid md:grid-cols-2 lg:justify-start gap-4">
        <BentoBlock className="p-4 md:border-0 flex flex-col">
          <h3>Let{`'`}s chat!</h3>
          <div className="flex-1">
            <p>My 2024 goal is to foster my existing relationships and build new ones! I{`'`}ve opened my calendar for specific timeslots to have quick chats about programming, life, or anything else you want to chat about.</p>
            <p>Feel free to schedule some time on my calendar, even if just for a quick 15 min intro:</p>
          </div>
          <div className="flex gap-2">
            <ButtonLink href="https://cal.com/brianmmdev">
            <MdOutlineOpenInNew /> Schedule a chat
            </ButtonLink>
          </div>
        </BentoBlock>

        <BentoBlock className="p-4 md:border-0">
          <h3>Let{`'`}s work together!</h3>
          <div>
            <p>I{`'`}m a seasoned backend developer with over a decade of experience in the tech industry ranging from managing services & networking equipment to building complex integration systems for an IoT platform.</p>
            <p>If you feel we could do great work together, reach out and lets have a conversation!</p>
          </div>
          <div className="flex gap-2">
            <ButtonLink href="https://brianmorrison.me/contact">
              <MdOutlineOpenInNew /> Contact me
            </ButtonLink>
            <ButtonLink href="/files/bmorrison-backend-2023.pdf">
              <MdOutlineDownload /> Resume
            </ButtonLink>
          </div>
        </BentoBlock>

      </div>


      <div className='md:col-span-2 shadow border-b-1 border-b-gray-500 rounded-lg bg-white'>
        <iframe src="https://embeds.beehiiv.com/db8ca15b-ac1c-4aa3-9912-46fec9df6688"
          data-test-id="beehiiv-embed"
          width="100%"
          height="300"
          className="rounded m-0 bg-transparent"></iframe>
      </div>
    </main>
  )
}
