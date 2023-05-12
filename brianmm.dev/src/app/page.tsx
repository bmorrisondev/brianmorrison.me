import Image from 'next/image'
import HomeCard from '../components/HomeCard'
import ProfileImg from '../assets/profile.png'
import YouTube from '@/components/svgs/YouTube'
import Twitter from '@/components/svgs/Twitter'
import LinkedIn from '@/components/svgs/LinkedIn'
import Globe from '@/components/svgs/Globe'
import Paper from '@/components/svgs/Paper'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:gap-4 lg:p-24 p-4 pt-24">
      <div className="z-10 w-full font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 
          flex w-full items-center justify-center gap-2 border-b
          border-gray-300 bg-gradient-to-b from-zinc-200 
          py-2 backdrop-blur-2xl lg:static lg:w-auto  
          lg:rounded-xl lg:border lg:bg-gray-200 lg:p-2 lg:pr-3 
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
          <YouTube /> @brianmmdev
        </HomeCard>
        <HomeCard href="https://twitter.com/@brianmmdev" color="twitter">
          <Twitter /> @brianmmdev
        </HomeCard>
        <HomeCard href="https://www.linkedin.com/in/brianmmdev">
          <LinkedIn /> @brianmmdev
        </HomeCard>
        <HomeCard href="https://brianmorrison.me/blog" color="purple">
          <Paper /> my blog
        </HomeCard>
      </div>

      <div className='md:col-span-2 border-accent-2 border rounded-lg'>
        <iframe src="https://embeds.beehiiv.com/db8ca15b-ac1c-4aa3-9912-46fec9df6688"
          data-test-id="beehiiv-embed"
          width="100%"
          height="300"
          className="rounded m-0 bg-transparent"></iframe>
      </div>

      {/* <div className="mb-32 grid lg:mb-0 xl:grid-cols-5 lg:grid-cols-4 text-left gap-4">
        <HomeCard href="" title="YouTube">
          I publish new videos to my YouTube channel every week!
        </HomeCard>
        <HomeCard href="" title="Twitter">
          Follow me on Twitter.
        </HomeCard>
        <HomeCard href="https://brianmorrison.me" title="Website">
          Read all about me on my Website.
        </HomeCard>
      </div> */}
    </main>
  )
}
