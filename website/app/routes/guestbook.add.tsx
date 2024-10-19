import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from '@clerk/remix';
import { getAuth } from '@clerk/remix/ssr.server';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { useState } from 'react';
import Button from '~/components/Button';
import Container from '~/components/Container';
import Box from '~/components/ui/Box';

export const loader = async(args: ActionFunctionArgs) => {
  const { request } = args
  const { userId } = await getAuth(args);
  if(!userId) {
    const url = new URL(request.url)
    return redirect(`/sign-in?redirect_url=${encodeURIComponent(url.pathname)}`)
  }
  return {}
}

function AddGuestbookEntry() {
  const [message, setMessage] = useState('')
  const [isMessageSubmitted, setIsMessageSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    setIsLoading(true)
    // Submit the form
    await fetch('/api/guestbook-entries', {
      method: 'POST',
      body: JSON.stringify({ message }),
    })

    setIsLoading(false)
    setIsMessageSubmitted(true)
  }

  return (
    <Container>
      <SignedIn>
        <h1 className='mb-2'>Sign the guestbook</h1>
        <Box>
          <div>
            <label htmlFor='message' className="block text-gray-700 text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              name='message'
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}  />
          </div>
          <div className="flex justify-between">
            <Button onClick={() => onSubmit()} disabled={isLoading}>
              Submit
            </Button>
            <UserButton />
          </div>
        </Box>
        {isMessageSubmitted && (
          <Box className='mt-2'>
            <span className="font-extrabold">✅ You've signed the guestbook!</span> I'll review and approve it when I have a free moment. Thanks!
          </Box>
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Container>
  )
}

export default AddGuestbookEntry