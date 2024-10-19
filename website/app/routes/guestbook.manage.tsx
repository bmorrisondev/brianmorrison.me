import { getAuth } from '@clerk/remix/ssr.server'
import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useLoaderData, useNavigate } from '@remix-run/react'
import Container from '~/components/Container'
import GuestbookEntryRow from '~/components/GuestbookEntryRow'
import { GuestbookEntry } from '~/models'
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc } from 'drizzle-orm';
import { guestbookEntries } from '~/db/schema';

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args
  const { userId, sessionClaims } = await getAuth(args);
  if(!userId) {
    const url = new URL(request.url)
    return redirect(`/sign-in?redirect_url=${encodeURIComponent(url.pathname)}`)
  }

  const isAdmin = sessionClaims["metadata"] && sessionClaims["metadata"]["is_admin"] === "true"
  if(!isAdmin) {
    return redirect(`/?message=NOT_AUTHORIZED`)
  }

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);
  const entries = await db.select()
    .from(guestbookEntries)
    .orderBy(desc(guestbookEntries.createdOn))
    .execute();

  return json({
    entries
  })

}

function ManageGuestbookEntries() {
  const navigate = useNavigate()

  const { entries } = useLoaderData<typeof loader>()

  async function toggleApprovalStatus(entry: GuestbookEntry) {
    await fetch('/api/update-guestbook-entry', {
      method: 'POST',
      body: JSON.stringify({
        id: entry.id,
        isApproved: !entry.isApproved
      }),
    })
    navigate('.', { replace: true })
  }

  return (
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
  )
}

export default ManageGuestbookEntries