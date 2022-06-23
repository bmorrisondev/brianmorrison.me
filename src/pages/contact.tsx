import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import ContactForm from '../components/ContactForm'
import DefaultLayout from '../layouts/DefaultLayout'

const Wrapper = styled(Container)`
  li {
    font-size: 1.5rem;
    line-height: 2.5rem;
  }

  .dev-li {
    list-style-image: url('../assets/images/emoji/dev.png');
  }

  .cloud-li {
    list-style-image: url('../assets/images/emoji/clouds.png');
  }

  .video-li {
    list-style-image: url('../assets/images/emoji/camera.png');
  }
`

function Contact() {
  return (
    <DefaultLayout>
      <Wrapper>
        <h1>Contact Me</h1>
        <div>
          <p>I currently freelance in the following services:</p>
          <ul>
            <li className="dev-li">Web & Desktop Software Development</li>
            <li className="cloud-li">Cloud Computing (AWS, Azure, etc)</li>
            <li className="video-li">Technical Video Production</li>
          </ul>
          <p>I'm always willing to have a conversation if you're interested in something else, please feel free to contact me:</p>
        </div>
        <ContactForm />
      </Wrapper>
    </DefaultLayout>
  )
}

export default Contact