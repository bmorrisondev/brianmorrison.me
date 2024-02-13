import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

function BentoBlock({ children, className }: Props) {
  return (
    <div className={`bento-block bg-white shadow-sm border-b-1 border-b-gray-500 rounded p-1 ${className ? className : ""}`}>
      {children}
    </div>
  )
}

export default BentoBlock