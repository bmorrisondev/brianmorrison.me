import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function List({ children }: Props) {
  return (
    <ul className='list-disc ml-4 mb-4'>
      { children }
    </ul>
  )
}

export default List