import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode,
  href: string
}

function SocialIconLink({ children, href }: Props) {
  return (
    <span className='w-[25px] h-[25px]'>
      <a href={href} target="_blank">
        { children }
      </a>
    </span>
  )
}

export default SocialIconLink