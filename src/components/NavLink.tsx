import { Link } from 'gatsby'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  to: string
}

function NavLink({ children, to }: Props) {
  return (
    <Link to={to} className='text-black text-opacity-70 hover:text-opacity-100'>
      { children }
    </Link>
  )
}

export default NavLink