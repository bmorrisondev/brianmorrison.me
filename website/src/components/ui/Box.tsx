import React from 'react'

type Prop = {
  className?: string
  children?: React.ReactNode
}

function Box({ className, children }: Prop) {
  return (
    <div className={`rounded border bg-white shadow-sm border-gray-100 p-4 ${className ? className: ''}`}>
      { children }
    </div>
  )
}

export default Box