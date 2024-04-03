import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import Container from '../../components/Container'
import Button from '../../components/Button'
import { GuestbookEntry } from '../../models'
import { navigate } from 'gatsby'
import GuestbookEntryRow from '../../components/GuestbookEntryRow'

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
          {entries.map((entry, i) => <GuestbookEntryRow key={i} entry={entry} />)}
        </div>
      </Container>
    </DefaultLayout>
  )
}

export default Guestbook