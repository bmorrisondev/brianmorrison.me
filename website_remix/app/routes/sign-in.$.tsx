import { SignIn } from '@clerk/remix'
import Container from '~/components/Container'

export default function SignInPage() {
  return (
    <Container>
      <div className='flex justify-center'>
        <SignIn />
      </div>
    </Container>
  )
}