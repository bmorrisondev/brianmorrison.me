import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import Container from '../../components/Container'
import { GuestbookEntry } from '.'
import Box from '../../components/ui/Box'
import Button from '../../components/Button'

function ManageGuestbookEntries({ location }) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])

  useEffect(() => {
    async function init() {
      let res = await fetch('/.netlify/functions/get-all-guestbook-entries')
      let json = await res.json()
      setEntries(json)
    }
    init()
  }, [])

  async function toggleApprovalStatus(entry: GuestbookEntry) {
    let res = await fetch('/.netlify/functions/update-guestbook-entry', {
      method: 'POST',
      body: JSON.stringify({ id: entry.id, isApproved: !entry.isApproved }),
    })

    let newEntries = entries.map(e => {
      if (e.id === entry.id) {
        e.isApproved = !e.isApproved
      }
      return e
    })
    setEntries(newEntries)
  }

  return (
    <DefaultLayout location={location}>
      <Container>
        <h1>Manage Guestbook Entries</h1>
        <div className="flex flex-col gap-2">
          {entries.map((entry, i) => (
            <Box key={i} className="flex flex-row gap-4">
              <div className='flex items-center mb-2 gap-2'>
                <img src={entry.imageUrl} alt={entry.name} className="w-8 h-8 rounded-full" />
                <div className="flex-1 flex flex-col">
                  <span className="flex-1">{entry.name}</span>
                  <span className="italic">{new Date(entry.createdOn).toLocaleDateString()}</span>
                  <span>Status: {entry.isApproved ? "Approved" : "Not approved"} </span>
                  <Button onClick={() => toggleApprovalStatus(entry)}>
                    {entry.isApproved ? "Unapprove" : "Approve"}
                  </Button>
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

export default ManageGuestbookEntries