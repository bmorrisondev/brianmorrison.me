import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Container({ children }: Props) {
  return (
    <div>
      { children }
    </div>
  )
}

export default Container