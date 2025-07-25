import { Link } from '@remix-run/react'
import { LinkIcon } from 'lucide-react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  to?: string
  className?: string
  onClick?: () => void
}

function StylizedListItemBase({ children, className }: Props) {
  return (
    <div className={`flex bg-white shadow-sm py-[3px] px-[15px] mr-2 mb-2 rounded-sm space-x-2 items-center ${className}`}>
      { children }
    </div>
  )
}

function StylizedListItem({ children, to, className, onClick }: Props) {
  if(to && to.startsWith("http")) {
    return <a className="stylized-li" href={to} target="_blank" rel="noreferrer">
      <StylizedListItemBase className={`text-black transition-all hover:shadow-lg ${className}`}>
        { children } <span className="ml-1 text-gray-300"><LinkIcon className="h-[16px] w-[16px]" /></span>
      </StylizedListItemBase>
    </a>
  }

  if(to && to.startsWith("/")) {
    return <Link to={to}>
      <StylizedListItemBase className={`text-black ${className}`}>
        { children }
      </StylizedListItemBase>
    </Link>
  }

  if(onClick) {
    return (
      <button onClick={() => onClick()}>
        <StylizedListItemBase className={`text-black transition-all hover:shadow-lg ${className}`}>
          { children } <span className="ml-1"><LinkIcon /></span>
        </StylizedListItemBase>
      </button>
    )
  }

  return <StylizedListItemBase className={className}>{ children }</StylizedListItemBase>
}

export default StylizedListItem