
import { Link } from '@remix-run/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  to: string
  className?: string
  onClick?: () => void
}

function MobileNavLink({ children, to, className, onClick }: Props) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <Link to={to} className={`text-white text-xl px-8 py-4 ${className}`} onClick={handleClick}>
      { children }
    </Link>
  )
}

export default MobileNavLink