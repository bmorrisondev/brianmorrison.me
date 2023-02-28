import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode,
  href: string
}

function SocialIconLink({ children, href }: Props) {
  return (
    <a href={href} target="_blank" className='w-[25px] h-[25px]'>{ children }</a>
  )
}

export default SocialIconLink