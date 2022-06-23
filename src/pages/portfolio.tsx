import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import DefaultLayout from '../layouts/DefaultLayout'

const Wrapper = styled(Container)`

`

function Portfolio() {
  return (
    <DefaultLayout>
      <Wrapper>
        <h1>Portfolio</h1>
      </Wrapper>
    </DefaultLayout>
  )
}

export default Portfolio