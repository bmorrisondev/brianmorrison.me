import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

function Container({ children, className }: Props) {
  return (
    <div className={className}>
      { children }
    </div>
  )
}

export default Container