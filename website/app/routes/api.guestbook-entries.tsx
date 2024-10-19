import { getAuth } from "@clerk/remix/ssr.server";
import { neon } from "@neondatabase/serverless";
import { ActionFunctionArgs } from "@remix-run/node";
import { drizzle } from "drizzle-orm/neon-http";
import { guestbookEntries } from "~/db/schema";

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args
  const { userId, sessionClaims } = await getAuth(args);
  if(!userId) {
    return new Response("", { status: 401 })
  }
  const { message } = await request.json();

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);
  await db.insert(guestbookEntries).values({
    userId: sessionClaims.sub as string,
    name: sessionClaims.name,
    imageUrl: sessionClaims.image_url,
    message,
  }).execute();

  // Send Discord Webhook
  const webhookMessage = {
    username: "New Guestbook Submission",
    "embeds": [{
      "author": {
        "name": sessionClaims.name,
        "icon_url": sessionClaims.image_url
      },
      description: `${message}\n\n[Manage guestbook](https://brianmorrison.me/guestbook/manage)`,
      "footer": {
        "text": `userId: ${sessionClaims.sub}`
      }
    }]
  }
  await fetch(process.env.CONTACT_WEBHOOK as string, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(webhookMessage)
  });

  return new Response("", { status: 200 })
}