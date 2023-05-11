import Image from 'next/image'
import HomeCard from '../components/HomeCard'
import ProfileImg from '../assets/profile.png'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:gap-4 p-24">
      <div className="z-10 w-full font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 
          flex w-full items-center justify-center gap-2 border-b
          border-gray-300 bg-gradient-to-b from-zinc-200 
          py-1 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-2 lg:pr-3 lg:dark:bg-zinc-800/30 text-lg">
          <Image src={ProfileImg} alt="profile image" className="rounded-full h-[50px] w-auto" /> 
          Brian Morrison II
        </p>
      </div>

      <div className="mb-32 grid lg:mb-0 xl:grid-cols-5 lg:grid-cols-4 text-left gap-4">
        <HomeCard href="https://youtube.com/@brianmmdev" title="YouTube" color="red">
          @brianmmdev
        </HomeCard>
        <HomeCard href="https://twitter.com/@brianmmdev" title="Twitter" color="blue">
          @brianmmdev
        </HomeCard>
        <HomeCard href="https://twitter.com/@brianmmdev" title="LinkedIn">
          @brianmmdev
        </HomeCard>
        <HomeCard href="https://brianmorrison.me/blog" title="Blog" color="purple">
          brianmorrison.me
        </HomeCard>
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
