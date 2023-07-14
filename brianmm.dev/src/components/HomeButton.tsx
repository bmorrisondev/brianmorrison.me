import React, { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  className?: string
}

function HomeButton({href, children, className}: Props) {
  return (
    <a
      href={href}
      className={`bg-[#8246C3] text-white group rounded-lg border border-transparent hover:border-[#8246C3] px-3 py-2 transition-all hover:shadow-xl`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p className={`m-0 max-w-[30ch] flex gap-1 items-center`}>
        { children }
      </p>
    </a>
  )
}

export default HomeButton