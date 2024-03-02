import React from 'react'
import { useState } from 'react'
import Button from './Button'
import Spinner from './svgs/Spinner'

enum FormState {
  None,
  Submitting,
  Success,
  Error
}

function ContactForm() {
  const [formState, setFormState] = useState(FormState.None)
  const [name, setName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [message, setMessage] = useState("")
  const [optInToNewsletter, setOptInToNewsletter] = useState(false)

  async function submit() {
    let contactInfo = {
      name,
      emailAddress,
      message,
      optInToNewsletter
    }
    let url = '/.netlify/functions/contact'
    let opts = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactInfo)
    }

    setFormState(FormState.Submitting)

    let response = await fetch(url, opts)

    if(response.status === 200) {
      setFormState(FormState.Success)
    } else {
      setFormState(FormState.Error)
    }
  }

  return (
    <form className='rounded border bg-white shadow-sm border border-gray-100 p-4'>
      <div className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text" />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email address
        </label>
        <input
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={emailAddress}
          onChange={e => setEmailAddress(e.target.value)}
          type="text"  />
      </div>
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
      <div className='flex space-x-2 items-center mb-2'>
        <input
          type="checkbox"
          checked={optInToNewsletter}
          onChange={() => setOptInToNewsletter(!optInToNewsletter)}
          />
        <span>Opt in to newsletter</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={() => submit()} disabled={formState !== FormState.None}>
          Send
        </Button>
        {formState == FormState.Submitting && <span className="form-response-message loading-icon"><Spinner /></span>}
        {formState == FormState.Success && <span className="form-response-message text-gray-700">✅ You're info has been received!</span>}
        {formState == FormState.Error && <span className="form-response-message text-gray-700">❌ An error occurred, please try again later.</span>}
      </div>
    </form>
  )
}

export default ContactForm