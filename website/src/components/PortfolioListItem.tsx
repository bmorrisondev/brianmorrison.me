import React from "react";
import parse from "html-react-parser"
import { Link } from "gatsby";
import StylizedList from "./StylizedList";
import StylizedListItem from "./StylizedListItem";

function PortfolioListItem({item}) {
  return (
    <div>
      <Link to={`/portfolio/${item.slug}`} className="text-black">
        <h2>{parse(item.title)}</h2>
        <span className="excerpt">{ item.excerpt } </span>
      </Link>
      {item.tags && item.tags.length > 0 && (
        <StylizedList>
          {item.tags.map(t => (
            <StylizedListItem key={`${item.id}-${t}`}>{t}</StylizedListItem>
          ))}
        </StylizedList>
      )}
    </div>
  )
}

export default PortfolioListItem