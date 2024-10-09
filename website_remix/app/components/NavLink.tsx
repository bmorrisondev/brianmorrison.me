import { Link } from '@remix-run/react'
import{ ReactNode } from 'react'

type Props = {
  children: ReactNode
  to: string
  className?: string
}

function NavLink({ children, to, className}: Props) {
  return (
    <Link to={to} className={`text-black text-opacity-70 hover:text-opacity-100 ${className}`}>
      { children }
    </Link>
  )
}

export default NavLink