import React from "react"
import Container from "../components/Container"
import DefaultLayout from "../layouts/DefaultLayout"

export default function Home({ location }) {
  return (
    <DefaultLayout location={location}>
      <Container className="home-container w-full flex flex-col">
        <div className='text-[5.8rem] font-bold mb-4 leading-[5.5rem] md:leading-[6.4rem] xl:leading-[7rem] mt-28 gradient-header'>Hi, my name is Brian</div>
        <div className="text-4xl">I'm a full stack developer & content creator.</div>
      </Container>
    </DefaultLayout>
  )
}
