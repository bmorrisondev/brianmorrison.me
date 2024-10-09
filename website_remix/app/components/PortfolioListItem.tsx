import parse from "html-react-parser"
import ArrowRight from "./svgs/ArrowRight";
import { Link } from "@remix-run/react";

function PortfolioListItem({ item }) {
  return (
    <Link to={`/portfolio/${item.slug}`}
      className="group/portfolio-item text-black bg-white flex flex-col justify-between p-2 shadow-sm hover:shadow-lg rounded transition-all">
      <div className="flex flex-col">
        {item.skillsUsed && item.skillsUsed.length > 0 && (
          <div className="flex gap-1 mt-1 mb-2">
          {item.skillsUsed && item.skillsUsed.map(su =>
            <img src={su.icon} alt={su.name} className="max-w-[20px] max-h-[20px]"/>)}
          </div>
        )}
        <div className="font-bold">{parse(item.title)}</div>
        <div className="excerpt">{ item.excerpt } </div>
      </div>
      <div>
        <div className="flex justify-between items-center mt-2">
          <div className="italic text-sm text-gray-700">
            { item.date && new Date(item.date).getFullYear() }
            { item.job && item.job[0] && item.job[0].companyName && ` @ ${item.job[0].companyName}`}
          </div>
          <ArrowRight className="opacity-0 group-hover/portfolio-item:opacity-100 transition-all" />
        </div>
      </div>
    </Link>
  )
}

export default PortfolioListItem