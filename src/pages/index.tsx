import React from "react"
import { Container } from "react-bootstrap"
import styled from "styled-components"
import colors from "../colors"
import DefaultLayout from "../layouts/DefaultLayout"

const Wrapper = styled(Container)`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .intro-main, .intro-sub {
    width: 80%;
  }

  .intro-main {
    font-weight: bold;
    font-size: 6.5em;
    line-height: 1em;
    padding-bottom: 16px;
    background: -webkit-linear-gradient(45deg, ${colors.global.gradientPurple}, ${colors.global.gradientBlue} 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
