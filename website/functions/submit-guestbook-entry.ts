import { guestbookEntries } from './db/schema';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { validateSession } from './shared/auth';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export const handler = async (event) => {
  try {
    let validateTokenResponse = await validateSession(event);
    if(!validateTokenResponse.isValid || !validateTokenResponse.claims) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
      };
    }

    const { message } = JSON.parse(event.body);

    await db.insert(guestbookEntries).values({
      userId: validateTokenResponse.claims.sub as string,
      name: validateTokenResponse.claims.name,
      imageUrl: validateTokenResponse.claims.image_url,
      message,
    }).execute();

    // Send Discord Webhook
    let webhookMessage = {
      username: "New Guestbook Submission",
      "embeds": [{
        "author": {
          "name": validateTokenResponse.claims.name,
          "icon_url": validateTokenResponse.claims.image_url
        },
        description: `${message}\n\n[Manage guestbook](https://brianmorrison.me/guestbook/manage)`,
        "footer": {
          "text": `userId: ${validateTokenResponse.claims.sub}`
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

    return {
      statusCode: 200
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};