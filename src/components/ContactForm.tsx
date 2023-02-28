import React from 'react'
import { useState } from 'react'
import Button from './Button'

// const Wrapper = styled(Form)`
//   label {
//     margin-top: 5px;
//     font-weight: bold
//   }

//   .form-check {
//     display: flex;
//     align-items: center;

//     label {
//       margin-top: 2px;
//       margin-left: 5px;
//     }
//   }

//   .button-row {
//     margin-top: 10px;
//     display: flex;
//     align-items: center;

//     span {
//       margin-left: 10px;
//     }

//     .spinner-grow {
//       background: ${colors.global.gradientBlue};
//     }

//     .success::before {
//       content: "✅ "
//     }

//     .error::before {
//       content: "🔴 "
//     }
//   }
// `

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
    <div>
      {/* <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} placeholder="What's your name?" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="text" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} placeholder="What's your email address?" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="What can I help with?" />
      </Form.Group>
      <Form.Check
        type="switch"
        label="Opt In to Newsletter"
        checked={optInToNewsletter}
        onChange={e => setOptInToNewsletter(e.target.checked)}
      /> */}
      <div className="button-row">
        <Button onClick={() => submit()} disabled={formState !== FormState.None}>
          Send
        </Button>
        {formState == FormState.Submitting && <span className="form-response-message loading-icon"><Spinner animation="grow" /></span>}
        {formState == FormState.Success && <span className="form-response-message success">You're info has been received!</span>}
        {formState == FormState.Error && <span className="form-response-message error">An error occurred, please try again later.</span>}
      </div>
    </div>
  )
}

export default ContactForm