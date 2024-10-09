
import { Link } from '@remix-run/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  to: string
  className?: string
}

function MobileNavLink({ children, to, className }: Props) {
  return (
    <Link to={to} className={`text-white text-xl px-8 py-4 ${className}`}>
      { children }
    </Link>
  )
}

export default MobileNavLink