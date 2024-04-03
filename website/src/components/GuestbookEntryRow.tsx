import React from 'react'
import { GuestbookEntry } from '../models'
import Box from './ui/Box'
import Button from './Button'

type Props = {
  entry: GuestbookEntry
  allowToggleApproval?: boolean
  onToggleApproval?: (entry: GuestbookEntry) => void
}

function GuestbookEntryRow({ entry, allowToggleApproval, onToggleApproval }: Props) {
  return (
    <Box className="flex md:flex-row gap-4">
      <img src={entry.imageUrl} alt={entry.name} className="w-8 h-8 rounded-full mt-1" />
      <div className='flex mb-2 gap-4 md:flex-row flex-col'>
        <div className="flex-1 flex flex-col">
          <span className="flex-1">{entry.name}</span>
          <span className="italic text-gray-700">{new Date(entry.createdOn).toLocaleDateString()}</span>
          {allowToggleApproval && onToggleApproval && (
            <>
              <span>{entry.isApproved ? "✅ Approved" : "⛔️ Not approved"} </span>
              <div>
                <Button onClick={() => onToggleApproval(entry)}>
                  {entry.isApproved ? "Unapprove" : "Approve"}
                </Button>
              </div>
            </>
          )}
        </div>
        <div>
          "{entry.message}"
        </div>
      </div>
    </Box>
  )
}

export default GuestbookEntryRow