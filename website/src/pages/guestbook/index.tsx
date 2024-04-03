import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import Container from '../../components/Container'
import Button from '../../components/Button'
import Box from '../../components/ui/Box'
import { Modal } from 'react-responsive-modal';
import { navigate } from 'gatsby'

export type GuestbookEntry = {
  id: number
  userId: string
  name: string
  imageUrl: string
  message: string
  createdOn: Date
  isApproved?: boolean
}

function Guestbook({ location }) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])

  useEffect(() => {
    async function init() {
      let res = await fetch('/.netlify/functions/get-guestbook-entries')
      let json = await res.json()
      setEntries(json)
    }
    init()
  }, [])

  return (
    <DefaultLayout location={location} pageTitle="Guestbook">
      <Container>
        <div className="flex justify-between mb-2">
          <h1>Guestbook</h1>
          <Button onClick={() => navigate("/guestbook/add")}>
            Add a message
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {entries.map((entry, i) => (
            <Box key={i} className="flex flex-row gap-4">
              <div className='flex items-center mb-2 gap-2'>
                <img src={entry.imageUrl} alt={entry.name} className="w-8 h-8 rounded-full" />
                <div className="flex-1 flex flex-col">
                  <span className="flex-1">{entry.name}</span>
                  <span className="italic">{new Date(entry.createdOn).toLocaleDateString()}</span>
                </div>
              </div>
              <div>{entry.message}</div>
            </Box>
          ))}
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default Guestbook