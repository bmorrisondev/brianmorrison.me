import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  citation?: string
}

function BlockQuote({ children, citation }: Props) {
  return (
    <blockquote className='my-2 p-4 bg-background-accent rounded-lg'>
      <div className='mb-2'>{ children }</div>
      {citation && <cite>- {citation}</cite>}
    </blockquote>
  )
}

export default BlockQuote