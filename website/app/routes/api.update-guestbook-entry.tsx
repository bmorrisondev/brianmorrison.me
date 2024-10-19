import { getAuth } from "@clerk/remix/ssr.server";
import { ActionFunctionArgs } from "@remix-run/node";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { guestbookEntries } from '~/db/schema';

type Body = {
  id: number,
  isApproved: boolean
}

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args

  const { userId, sessionClaims } = await getAuth(args);
  if(!userId) {
    return new Response("", { status: 401 })
  }

  const isAdmin = sessionClaims["metadata"] && sessionClaims["metadata"]["is_admin"] === "true"
  if(!isAdmin) {
    return new Response("", { status: 401 })
  }


  const { id, isApproved }: Body = await request.json()

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);
  await db.update(guestbookEntries)
    .set({ isApproved: isApproved })
    .where(eq(guestbookEntries.id, id))
    .execute();

  return new Response("", { status: 200 })
}