import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function StylizedListItem({ children }: Props) {
  return (
    <li className='inline-block bg-background-accent py-[3px] px-[15px] mr-2 mb-2 rounded'>
      { children }
    </li>
  )
}

export default StylizedListItem