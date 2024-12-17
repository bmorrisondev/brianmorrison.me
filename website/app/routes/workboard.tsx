import { Client } from '@notionhq/client'
import Container from '~/components/Container'
import { json, useLoaderData } from '@remix-run/react'
import Box from '~/components/ui/Box'

export const loader = async () => {
  // Fetch notion db entries where public = true
  const notion = new Client({
    auth: process.env.NOTION_TOKEN as string
  })

  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_PROJECTS_DBID as string,
    filter: {
      property: 'Public',
      checkbox: {
        equals: true
      }
    }
  })

  console.log(results)

  const projects = {
    "Next up": [],
    "In progress": [],
    "Done": []
  }

  results.forEach(r => {
    const id = r.id
    const name = r.properties["Name"].title[0].plain_text
    const status = r.properties["Status"].status.name
    const description = r.properties["Description"]?.rich_text[0]?.plain_text
    const iconUrl = r.icon?.external?.url
    const iconEmoji = r.icon?.emoji

    projects[status].push({
      id,
      name,
      description,
      iconUrl,
      iconEmoji
    })
  })

  return json({
    projects
  })
}

function Workboard() {
  const { projects } = useLoaderData<typeof loader>()

  return (
    <Container>
      <h1>Workboard</h1>
      <p>A sneak peek on what I'm building right now.</p>
      <div className='flex flex-col md:grid grid-cols-3 gap-4'>
        <div className='flex flex-col gap-2'>
          <span className='font-semibold'>Next up</span>
          {projects["Next up"].map(p => (
            <Box key={p.id}>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-1'>
                  {p.iconUrl && <img src={p.iconUrl} className='h-[20px] w-[20px] mt-0.5'  /> }
                  {p.iconEmoji && <span>{p.iconEmoji}</span>}
                  <div className='font-bold'>{p.name}</div>
                </div>
                <div>{p.description}</div>
              </div>
            </Box>
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-semibold'>In progress</span>
          {projects["In progress"].map(p => (
            <Box key={p.id}>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-1'>
                  {p.iconUrl && <img src={p.iconUrl} className='h-[20px] w-[20px] mt-0.5'  /> }
                  {p.iconEmoji && <span>{p.iconEmoji}</span>}
                  <div className='font-bold'>{p.name}</div>
                </div>
                <div>{p.description}</div>
              </div>
            </Box>
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-semibold'>Done</span>
          {projects["Done"].map(p => (
            <Box key={p.id}>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-1 '>
                  {p.iconUrl && <img src={p.iconUrl} className='h-[20px] w-[20px] mt-0.5'  /> }
                  {p.iconEmoji && <span>{p.iconEmoji}</span>}
                  <div className='font-bold'>{p.name}</div>
                </div>
                <div>{p.description}</div>
              </div>
            </Box>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Workboard
