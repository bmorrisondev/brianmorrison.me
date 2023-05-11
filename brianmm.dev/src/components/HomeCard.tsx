import React, { ReactNode } from 'react'

type Props = {
  href: string
  title: string
  children: ReactNode
  color?: string
}

const colors: any = {
  "default": "bg-gray-100/30 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
  "red": "bg-gray-100/30 hover:border-red-300 hover:bg-red-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
  "blue": "bg-gray-100/30 hover:border-blue-300 hover:bg-blue-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
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
      <h2 className={`mb-3 text-2xl font-semibold`}>
        {title}{' '}
        {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span> */}
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        { children }
      </p>
    </a>
  )
}

export default HomeCard