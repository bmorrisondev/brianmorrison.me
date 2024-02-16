import React from "react"
import Container from "../components/Container"
import DefaultLayout from "../layouts/DefaultLayout"
import BentoBlock from "../components/BentoBlock"
import { StaticImage } from "gatsby-plugin-image"

export default function Home({ location }) {
  return (
    <DefaultLayout location={location}>
      <div className="w-full flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-9 gap-3 w-full p-10">
          <BentoBlock className="row-span-2 col-span-3">
            <StaticImage src="../images/me.png" alt="Brian's face" className="rounded-lg mx-2 mt-2" />
            <div className="m-2">
              <div className="text-2xl height">Hello, my name is</div>
              <div className="text-5xl font-bold gradient-header">Brian</div>
            </div>
          </BentoBlock>
          <BentoBlock className="col-span-3 flex flex-col">
            <div className="m-2 flex-1">
              <div className="font-bold">Full Stack Developer</div>
              <div className="text-sm">I have over 15 years of experience, from building internal tooling to automations and enterprise software.</div>
            </div>
            <div className="linear-grad-bg rounded-b">
              <div className="flex overflow-clip textured-bg">
                <div className="bg-white mx-2 my-2 p-2 ml-[-5px] rounded shadow-sm align-center justify-center items-center flex">
                  <StaticImage src="../images/tech-logos/aws.png" alt="AWS logo" className="w-[45px] h-[45px]" />
                </div>
                <div className="bg-white mx-2 my-2 p-2 rounded shadow-sm align-center justify-center items-center flex">
                  <StaticImage src="../images/tech-logos/go.png" alt="AWS logo" className="w-[45px] h-[45px]" />
                </div>
                <div className="bg-white mx-2 my-2 p-2 rounded shadow-sm align-center justify-center items-center flex">
                  <StaticImage src="../images/tech-logos/js.png" alt="AWS logo" className="w-[45px] h-[45px]" />
                </div>
                <div className="bg-white mx-2 my-2 p-2 rounded shadow-sm align-center justify-center items-center flex">
                  <StaticImage src="../images/tech-logos/azure.png" alt="AWS logo" className="w-[45px] h-[45px]" />
                </div>
                <div className="bg-white mx-2 my-2 p-2 rounded shadow-sm align-center justify-center items-center flex">
                  <StaticImage src="../images/tech-logos/docker.png" alt="AWS logo" className="w-[45px] h-[45px]" />
                </div>
                <div className="bg-white mx-2 my-2 p-2 rounded shadow-sm align-center justify-center items-center flex">
                  <StaticImage src="../images/tech-logos/csharp.png" alt="AWS logo" className="w-[45px] h-[45px]" />
                </div>
                <div className="bg-white mx-2 my-2 p-2 rounded shadow-sm align-center justify-center items-center flex">
                  <StaticImage src="../images/tech-logos/docker.png" alt="AWS logo" className="w-[45px] h-[45px]" />
                </div>
              </div>
            </div>
          </BentoBlock>
          <BentoBlock className="col-span-3">
            <StaticImage src="../images/planetscale.png" alt="PlanetScale logo" className="rounded-lg mx-2 mt-2" />
            <div className="m-2">
              <div>
                <div className="font-bold">Developer Educator, PlanetScale</div>
                <div className="text-sm">I teach developers how to use PlanetScale, as well as write about MySQL and all things databases.</div>
              </div>
            </div>
          </BentoBlock>
          <BentoBlock className="col-span-3">
            Md
          </BentoBlock>
          <BentoBlock>
            Sm
          </BentoBlock>
          <BentoBlock>
            Sm
          </BentoBlock>
          <BentoBlock>
            Sm
          </BentoBlock>
          <div className="col-span-3 mt-2">
            <a href="/about" className="text-sm bg-white py-2 px-3 rounded-full border hover:shadow hover:cursor-pointer text-gray-800 transition-all">
              More about me <span className="opacity-30">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
