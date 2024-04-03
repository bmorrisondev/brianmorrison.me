import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?: string
}

function Button({ children, onClick, disabled, className }: Props) {
  return (
    <button onClick={onClick}
      disabled={disabled}
      className={`bg-gradientBlue px-4 text-white rounded-full shadow-sm hover:shadow-lg hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none ${className}`}>
      { children }
    </button>
  )
}

export default Button