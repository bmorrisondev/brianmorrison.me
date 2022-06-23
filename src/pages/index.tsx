import React from "react"
import { Container } from "react-bootstrap"
import styled from "styled-components"
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
    margin-top: 200px;
    font-weight: bold;
    font-size: 6.5em;
    line-height: 1em;
    padding-bottom: 16px;
    background: -webkit-linear-gradient(45deg, ${colors.global.gradientPurple}, ${colors.global.gradientBlue} 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 15px rgba(0,0,0,0.2);
  }

  .intro-sub {
    font-size: 2.5em;
  }
`

export default function Home() {
  return (
    <DefaultLayout>
      <Wrapper>
        <div className="intro-main">Hi, my name is Brian</div>
        <div className="intro-sub">I'm a freelance software developer & content creator.</div>
      </Wrapper>
    </DefaultLayout>
  )
}
