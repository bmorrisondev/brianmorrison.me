import { Link } from 'gatsby'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  to?: string
  className?: string
}

function StylizedListItemBase({ children, className }: Props) {
  return (
    <div className={`flex bg-background-accent py-[3px] px-[15px] mr-2 mb-2 rounded space-x-2 ${className}`}>
      { children }
    </div>
  )
}

function StylizedListItem({ children, to, className }: Props) {
  if(to && to.startsWith("http")) {
    return <a href={to} target="_blank">
      <StylizedListItemBase className={`text-black hover:bg-gradient-to-r from-gradientPurple to-gradientBlue hover:text-white ${className}`}>
        { children }
      </StylizedListItemBase>
    </a>
  }

  if(to && to.startsWith("/")) {
    return <Link to={to}>
      <StylizedListItemBase className={`text-black hover:bg-gradient-to-r from-gradientPurple to-gradientBlue hover:text-white ${className}`}>
        { children }
      </StylizedListItemBase>
    </Link>
  }

  return <StylizedListItemBase className={className}>{ children }</StylizedListItemBase>
}

export default StylizedListItem