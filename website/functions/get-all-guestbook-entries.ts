import { guestbookEntries } from './db/schema';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc, eq } from 'drizzle-orm';
import { validateSession } from './shared/auth';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export const handler = async (event) => {
  try {
    let validateTokenResponse = await validateSession(event);
    if(!validateTokenResponse.isValid || !validateTokenResponse.claims || !validateTokenResponse.isAdmin) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
      };
    }

    let entries = await db.select()
      .from(guestbookEntries)
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