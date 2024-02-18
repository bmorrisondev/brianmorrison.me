import React from 'react'

type Props = {
  href: string
  children: React.ReactNode
}

function ButtonLink({ href, children }: Props) {
  return (
    <a href={href}
      className="text-sm bg-white py-2 px-3` rounded-full border hover:shadow hover:cursor-pointer text-gray-800 transition-all flex gap-2 items-center">
      { children }
    </a>
  )
}

export default ButtonLink