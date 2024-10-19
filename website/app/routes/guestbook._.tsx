import { json, useLoaderData, useNavigate } from '@remix-run/react'
import Button from '~/components/Button'
import Container from '~/components/Container'
import GuestbookEntryRow from '~/components/GuestbookEntryRow'
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc, eq } from 'drizzle-orm';
import { guestbookEntries } from '~/db/schema';


export const loader = async() => {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);
  const entries = await db.select()
    .from(guestbookEntries)
    .where(eq(guestbookEntries.isApproved, true))
    .orderBy(desc(guestbookEntries.createdOn))
    .execute();

    return json({ entries })
}

function Guestbook() {
  const navigate = useNavigate();
  const { entries } = useLoaderData<typeof loader>()

  return (
    <Container>
      <div className="flex justify-between mb-2">
        <h1>Guestbook</h1>
        <div className="flex items-center">
          <Button onClick={() => navigate("/guestbook/add")}>
            Add a message
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {entries?.map((entry, i) =>
          <GuestbookEntryRow key={i} entry={entry} />
        )}
      </div>
    </Container>
  )
}

export default Guestbook