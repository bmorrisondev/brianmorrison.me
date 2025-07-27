import React from 'react'

interface Props {
  to?: string
  title?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  subtitle?: string
  className?: string
}

function Card({ to, title, children, footer, subtitle, className }: Props) {

  // if(to !== undefined) {
  //   return (
  //     <Link to={to}
  //       className="group/portfolio-item text-black bg-white flex flex-col justify-between p-2 hover:shadow hover:border-neutral-300 border border-neutral-200 rounded-sm transition-all">
  //       <div className="flex flex-col">
  //       {item.skillsUsed && item.skillsUsed.length > 0 && (
  //         <div className="flex gap-1 mt-1 mb-2">
  //         {item.skillsUsed && item.skillsUsed.map(su =>
  //           <img key={`${item.notion_id}-${item.slug}`} src={su.icon} alt={su.name} className="max-w-[20px] max-h-[20px]"/>)}
  //         </div>
  //       )}
  //       <div className="font-bold font-sans mb-1">{ parse(item.title)}</div>
  //       <div className="excerpt">{ item.excerpt } </div>
  //     </div>
  //     <div>
  //       <div className="flex justify-between items-center mt-2">
  //         <div className="italic text-sm text-gray-700">
  //           { item.date && new Date(item.date).getFullYear() }
  //           { item.job && item.job[0] && item.job[0].companyName && ` @ ${item.job[0].companyName}`}
  //         </div>
  //         <ArrowRight className="opacity-0 group-hover/portfolio-item:opacity-100 transition-all" />
  //       </div>
  //     </div>
  //   </Link>
  // )

  return (
    <div
      className={"group/card text-black bg-white flex flex-col justify-between p-2 border border-neutral-200 rounded-sm" + (className || "")}>
      <div className="flex flex-col">
        {subtitle && <div className="italic text-sm text-gray-700">{subtitle}</div>}
        <div className="font-bold font-sans mb-1">{title}</div>
        <div>
          {children}
        </div>
      </div>
      {footer && <div className="flex justify-between items-center mt-2">
        <div className="italic text-sm text-gray-700"> { footer } </div>
      </div>}
    </div>
  )
}

export default Card