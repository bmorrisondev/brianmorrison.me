import parse from "html-react-parser"
import ArrowRight from "./svgs/ArrowRight";
import { Link } from "@remix-run/react";
import { PortfolioItem } from "~/models";

type Props = {
  item: PortfolioItem
}

function PortfolioListItem({ item }: Props) {
  return (
    <Link to={`/portfolio/${item.slug}`}
      className="gap-4 group/portfolio-item text-black bg-white flex flex-col justify-between p-2 hover:shadow hover:border-neutral-300 border border-neutral-200 rounded-sm transition-all">

      <div className="flex flex-col">
        {item.skillsUsed && item.skillsUsed.length > 0 && (
          <div className="flex gap-2 mt-1 mb-4">
          {item.skillsUsed && item.skillsUsed.map(su =>
            <img key={`${item.notion_id}-${item.slug}`} src={su.icon} alt={su.name} className="max-w-[20px] max-h-[20px]"/>)}
          </div>
        )}
        <div className="font-bold font-sans mb-2">{parse(item.title)}</div>
        <div className="excerpt">{ item.excerpt } </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="italic text-sm text-gray-700">
          { item.date && new Date(item.date).getFullYear() }
          { item.job && item.job[0] && item.job[0].companyName && ` @ ${item.job[0].companyName}`}
        </div>
        <ArrowRight className="opacity-20 group-hover/portfolio-item:opacity-100 transition-all" />
      </div>
    </Link>
  )
}

export default PortfolioListItem