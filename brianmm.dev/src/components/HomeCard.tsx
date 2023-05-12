import React, { ReactNode } from 'react'

type Props = {
  href: string
  title?: string
  children: ReactNode
  color?: string
}

const colors: any = {
  "default": "bg-gray-100/30 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
  "youtube": "bg-gray-100/30 hover:border-red-300 hover:bg-red-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
  "twitter": "bg-gray-100/30 hover:border-blue-300 hover:bg-blue-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
  "purple": "bg-gray-100/30 hover:border-purple-300 hover:bg-purple-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
}

function HomeCard({href, title, children, color}: Props) {
  return (
    <a
      href={href}
      className={`group rounded-lg border border-transparent px-5 py-4 transition-colors ${color ? colors[color] : colors["default"]}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title && (
        <h2 className={`mb-3 text-2xl font-semibold`}>
          {title}{' '}
        </h2>
      )}
      <p className={`m-0 max-w-[30ch] text-sm opacity-50 flex gap-1 items-center`}>
        { children }
      </p>
    </a>
  )
}

export default HomeCard