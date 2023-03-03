import React from "react"
import breakpoints from "../breakpoints"
import colors from "../colors"
import Container from "../components/Container"
import DefaultLayout from "../layouts/DefaultLayout"

// const Wrapper = styled(Container)`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   .intro-main, .intro-sub {
//     width: 80%;
//   }

//   .intro-main {
//     margin-top: 4rem;
//     font-weight: bold;
//     font-size: 4rem;
//     line-height: 4.2rem;
//     padding-bottom: 1rem;
//     background: -webkit-linear-gradient(45deg, ${colors.global.gradientPurple}, ${colors.global.gradientBlue} 50%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     text-shadow: 2px 2px 15px rgba(0,0,0,0.2);

//     @media screen and (min-width: ${breakpoints.xl}) {
//       font-size: 6rem;
//       line-height: 6.3rem;
//       padding-bottom: 2rem;
//       margin-top: 200px !important;
//     }
//   }

//   .intro-sub {
//     font-size: 2rem;
//     line-height: 2.5rem;
//   }
// `

export default function Home({ location }) {
  return (
    <DefaultLayout location={location}>
      <Container className="home-container w-[80%] flex flex-col">
        <div className='text-[6rem] font-bold mb-4 leading-[6rem] xl:leading-[7rem] mt-28 gradient-header'>Hi, my name is Brian</div>
        <div className="text-4xl">I'm a full stack developer & content creator.</div>
      </Container>
    </DefaultLayout>
  )
}
