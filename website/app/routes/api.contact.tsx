import { ActionFunctionArgs } from "@remix-run/node";

type Body = {
  name: string
  emailAddress: string
  message: string
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const contactInfo: Body = await request.json()

    let message = `😄 **New Contact Submitted:**\n`
    message += `**Name:** ${contactInfo.name}\n`
    message += `**EmailAddress:** ${contactInfo.emailAddress}\n`
    message += `\`\`\`${contactInfo.message}\`\`\``

    await fetch(process.env.CONTACT_WEBHOOK as string, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: message })
    })

    return new Response("", {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
  } catch (err) {
    console.log(err)
    return new Response("", { status: 400 })
  }
}