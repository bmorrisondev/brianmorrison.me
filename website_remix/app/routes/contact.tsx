import ContactForm from '../components/ContactForm'
import Container from '../components/Container'
import { buildHeader } from '~/utils'

export const meta = () => buildHeader("Contact me")

function Contact() {
  return (
    <Container>
      <h1>Contact Me</h1>
      <div>
        <p>Interested in working with or collaborating with me? Feel free to drop me a note below!</p>
      </div>
      <ContactForm />
    </Container>
  )
}

export default Contact