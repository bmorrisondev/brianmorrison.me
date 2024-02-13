import React from "react"
import Container from "../components/Container"
import DefaultLayout from "../layouts/DefaultLayout"
import BentoBlock from "../components/BentoBlock"

export default function Home({ location }) {
  return (
    <DefaultLayout location={location}>
      <Container className="home-container w-full flex flex-col items-center">
        <div className="grid grid-cols-9 gap-2 mt-8 sm:mt-28 lg:w-[900px] w-full">
          <BentoBlock className="row-span-2 col-span-3">
            Lg
          </BentoBlock>
          <BentoBlock className="col-span-3">
            Md
          </BentoBlock>
          <BentoBlock className="col-span-3">
            Md
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
        {/* <div className='text-[5.8rem] font-bold mb-4 leading-[5.5rem] md:leading-[6.4rem] xl:leading-[7rem] mt-8 sm:mt-28 gradient-header'>Hi, my name is Brian</div>
        <div className="text-4xl">I'm a full stack developer & content creator.</div> */}
      </Container>
    </DefaultLayout>
  )
}
