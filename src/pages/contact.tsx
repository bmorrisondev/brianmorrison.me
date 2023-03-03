import React from 'react'
import ContactForm from '../components/ContactForm'
import Container from '../components/Container'
import DefaultLayout from '../layouts/DefaultLayout'

// const Wrapper = styled(Container)`
//   li {
//     font-size: 1.5rem;
//     line-height: 2.5rem;
//   }

//   .dev-li {
//     list-style-image: url('/img/emoji/dev.png');
//   }

//   .cloud-li {
//     list-style-image: url('/img/emoji/clouds.png');
//   }

//   .video-li {
//     list-style-image: url('/img/emoji/camera.png');
//   }
// `

function Contact({ location }) {
  return (
    <DefaultLayout location={location} pageTitle="Contact Me">
      <Container>
        <h1>Contact Me</h1>
        <div>
          <p>Interested in working with or collaborating with me? Feel free to drop me a note below!</p>
        </div>
        <ContactForm />
      </Container>
    </DefaultLayout>
  )
}

export default Contact