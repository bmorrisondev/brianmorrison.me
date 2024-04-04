import React, { useState } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import Container from '../../components/Container'
import { useUser } from "gatsby-plugin-clerk";
import {
  SignIn,
  SignedIn,
  RedirectToSignIn,
  SignedOut,
  UserButton,
  SignInButton
  } from 'gatsby-plugin-clerk'
import Button from '../../components/Button';
import Box from '../../components/ui/Box';

function AddToGuestbook({ location }) {
  const [message, setMessage] = useState('')
  const [isMessageSubmitted, setIsMessageSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    setIsLoading(true)
    // Submit the form
    await fetch('/.netlify/functions/submit-guestbook-entry', {
      method: 'POST',
      body: JSON.stringify({ message }),
    })

    setIsLoading(false)
    setIsMessageSubmitted(true)
  }

  return (
    <DefaultLayout location={location}>
      <Container>
        <SignedIn>
          <h1 className='mb-2'>Sign the guestbook</h1>
          <Box>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Message
              </label>
              <textarea
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
    </DefaultLayout>
  )
}

export default AddToGuestbook