import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import Container from '../../components/Container'
import { GuestbookEntry } from '../../models'
import Box from '../../components/ui/Box'
import Button from '../../components/Button'
import GuestbookEntryRow from '../../components/GuestbookEntryRow'

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
    await fetch('/.netlify/functions/update-guestbook-entry', {
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
            <GuestbookEntryRow
              key={i}
              entry={entry}
              allowToggleApproval
              onToggleApproval={toggleApprovalStatus} />
          ))}
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default ManageGuestbookEntries