import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  fluid?: boolean
}

function Container({ children, className, fluid }: Props) {
  return (
    <div className={`container main p-4 ${!fluid ? "mx-auto max-w-4xl" : ""} ${className}`}>
      { children }
    </div>
  )
}

export default Container