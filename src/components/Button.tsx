import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick?: Function
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="bg-gradientBlue p-2 text-white rounded shadow-sm hover:shadow-lg hover:bg-opacity-90">
      { children }
    </button>
  )
}

export default Button