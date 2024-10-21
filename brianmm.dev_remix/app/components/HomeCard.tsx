import { ReactNode } from 'react'

type Props = {
  href: string
  title?: string
  children: ReactNode
  color?: string
  className?: string
  sub?: string
}

const colors: {[key: string]: string} = {
  "default": "bg-accent-2 hover:shadow-lg hover:border-accent-2 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
  "youtube": "bg-accent-2 hover:shadow-lg hover:border-red-300 hover:bg-red-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
  "twitter": "bg-accent-2 hover:shadow-lg hover:border-blue-300 hover:bg-blue-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
  "purple": "bg-accent-2 hover:shadow-lg hover:border-purple-300 hover:bg-purple-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30",
}

function HomeCard({href, title, children, color, className}: Props) {
  return (
    <a
      href={href}
      className={`group rounded-lg border border-transparent px-5 py-4 transition-colors ${color ? colors[color] : colors["default"]} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title && (
        <h2 className={`mb-3 text-2xl font-semibold`}>
          {title}{' '}
        </h2>
      )}
      <p className={`m-0 max-w-[30ch] flex gap-1 items-center`}>
        { children }
      </p>
    </a>
  )
}

export default HomeCard