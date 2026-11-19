import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import parse, { domToReact, Element, type DOMNode } from "html-react-parser";
import BlockQuote from "~/components/BlockQuote";
import Container from "~/components/Container";
import { replaceCode } from "~/components/PostCode";
import StylizedListItem from "~/components/StylizedListItem";
import { getPortfolioItem, systechTestimonial } from "~/content/portfolio";
import { buildHeader } from "~/utils";

export const loader = ({ params }: LoaderFunctionArgs) => {
  const item = getPortfolioItem(params.slug);
  if (!item) throw new Response("Portfolio item not found", { status: 404 });

  return json({ item });
};

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  buildHeader({
    pageTitle: data?.item.title ?? "Portfolio",
    description: data?.item.excerpt,
  });

function replacePortfolioHtml(node: DOMNode) {
  if (
    node instanceof Element &&
    node.name === "a" &&
    node.attribs.href === "https://brianmorrison.me/demos/waystone"
  ) {
    return (
      <Link to="/demos/waystone">{domToReact(node.children as DOMNode[])}</Link>
    );
  }

  return replaceCode(node) || undefined;
}

export default function PortfolioItemView() {
  const { item } = useLoaderData<typeof loader>();

  return (
    <main className="rounded-xl bg-gradient-to-b from-gray-100 to-white md:m-8">
      <Container>
        <article
          className="blog-post"
          itemScope
          itemType="https://schema.org/Article"
        >
          <h1 itemProp="headline">{item.title}</h1>

          {!!item.skillsUsed?.length && (
            <div
              className="mb-4 flex flex-wrap gap-2"
              aria-label="Technologies used"
            >
              {item.skillsUsed.map((tag) => (
                <StylizedListItem
                  key={tag.id}
                  className="flex items-center gap-1"
                >
                  {tag.icon && (
                    <img
                      src={tag.icon}
                      alt=""
                      className="!m-0 w-5 border-none"
                    />
                  )}
                  <span>{tag.name}</span>
                </StylizedListItem>
              ))}
            </div>
          )}

          {item.html && (
            <div className="post-content">
              {parse(item.html, { replace: replacePortfolioHtml })}
            </div>
          )}

          {item.slug === "proposals-app" && (
            <section aria-labelledby="related-work">
              <h2 id="related-work">Related work</h2>
              <p>
                <Link to="/portfolio/waystone">
                  Waystone and a sample AI-assisted transaction import
                </Link>
              </p>
              {systechTestimonial.quote && (
                <BlockQuote
                  citation={`${systechTestimonial.author}, Systech Information Services`}
                >
                  {systechTestimonial.quote}
                </BlockQuote>
              )}
            </section>
          )}

          {item.slug === "iot-dashboard-optimizations" && (
            <p className="mt-6">
              <Link to="/portfolio/graphql-api-and-dynamic-groups">
                How I built Temeda’s first Go service for dynamic asset groups
              </Link>
            </p>
          )}
        </article>
      </Container>
    </main>
  );
}
