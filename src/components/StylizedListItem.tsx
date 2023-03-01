import { Link } from 'gatsby'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  to?: string
  className?: string
}

function StylizedListItemBase({ children, className }: Props) {
  return (
    <li className={`inline-block bg-background-accent py-[3px] px-[15px] mr-2 mb-2 rounded ${className}`}>
      { children }
    </li>
  )
}

function StylizedListItem({ children, to }: Props) {
  if(to && to.startsWith("http")) {
    return <a href={to} target="_blank">
      <StylizedListItemBase className="text-black hover:bg-gradient-to-r from-gradientPurple to-gradientBlue hover:text-white">
        { children }
      </StylizedListItemBase>
    </a>
  }

  if(to && to.startsWith("/")) {
    return <Link to={to}>
      <StylizedListItemBase className="text-black hover:bg-gradient-to-r from-gradientPurple to-gradientBlue hover:text-white">
        { children }
      </StylizedListItemBase>
    </Link>
  }

  return <StylizedListItemBase>{ children }</StylizedListItemBase>
}

export default StylizedListItem