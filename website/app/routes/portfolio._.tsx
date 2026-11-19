import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import Container from "~/components/Container";
import PortfolioListItem from "~/components/PortfolioListItem";
import { featuredCaseStudySlugs, portfolioItems } from "~/content/portfolio";
import { buildHeader } from "~/utils";

export const loader = () => {
  const featuredItems = featuredCaseStudySlugs.flatMap((slug) => {
    const item = portfolioItems.find((entry) => entry.slug === slug);
    return item ? [item] : [];
  });
  const otherItems = portfolioItems.filter(
    (item) => !featuredCaseStudySlugs.includes(item.slug),
  );

  return json({ featuredItems, otherItems });
};

export const meta: MetaFunction = () => buildHeader({ pageTitle: "Portfolio" });

export default function Portfolio() {
  const { featuredItems, otherItems } = useLoaderData<typeof loader>();

  return (
    <main className="rounded-xl bg-gradient-to-b from-gray-100 to-white md:m-8">
      <Container>
        <h1>Portfolio</h1>
        <section aria-labelledby="case-studies">
          <h2 id="case-studies">Selected case studies</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {featuredItems.map((item) => (
              <PortfolioListItem key={item.id} item={item} />
            ))}
          </div>
        </section>
        <section aria-labelledby="other-projects">
          <h2 id="other-projects">Other projects</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {otherItems.map((item) => (
              <PortfolioListItem key={item.id} item={item} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
