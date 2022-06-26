import React from "react"
import { Container } from "react-bootstrap"
import styled from "styled-components"
import breakpoints from "../breakpoints"
import colors from "../colors"
import DefaultLayout from "../layouts/DefaultLayout"

const Wrapper = styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .intro-main, .intro-sub {
    width: 80%;
  }

  .intro-main {
    margin-top: 4rem;
    font-weight: bold;
    font-size: 4rem;
    line-height: 4.2rem;
    padding-bottom: 1rem;
    background: -webkit-linear-gradient(45deg, ${colors.global.gradientPurple}, ${colors.global.gradientBlue} 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 15px rgba(0,0,0,0.2);

    @media screen and (min-width: ${breakpoints.xl}) {
      font-size: 6rem;
      line-height: 6.3rem;
      padding-bottom: 2rem;
      margin-top: 200px !important;
    }
  }

  .intro-sub {
    font-size: 2rem;
    line-height: 2.5rem;
  }
`

export default function Home({ location }) {
  return (
    <DefaultLayout location={location}>
      <Wrapper className="home-container">
        <div className="intro-main">Hi, my name is Brian</div>
        <div className="intro-sub">I'm a freelance software developer & content creator.</div>
      </Wrapper>
    </DefaultLayout>
  )
}