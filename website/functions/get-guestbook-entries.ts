import { guestbookEntries } from './db/schema';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc, eq } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export const handler = async () => {
  try {
    let entries = await db.select()
      .from(guestbookEntries)
      .where(eq(guestbookEntries.isApproved, true))
      .orderBy(desc(guestbookEntries.createdOn))
      .execute();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entries),
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};