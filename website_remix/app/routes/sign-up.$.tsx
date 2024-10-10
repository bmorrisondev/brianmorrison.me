import { SignUp } from '@clerk/remix'
import Container from '~/components/Container'

export default function SignUpPage() {
  return (
    <Container>
      <div className='flex justify-center'>
        <SignUp />
      </div>
    </Container>
  )
}