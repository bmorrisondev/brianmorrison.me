import assert from "node:assert/strict";
import test from "node:test";
import {
  featuredCaseStudySlugs,
  getPortfolioItem,
  jobs,
  portfolioItems,
} from "../app/content/portfolio";

test("each selected case study is published and associated with a company", () => {
  for (const slug of featuredCaseStudySlugs) {
    const item = portfolioItems.find((item) => item.slug === slug);
    assert.ok(
      item?.job?.length,
      `Missing published case study or company for ${slug}`,
    );
  }
});

test("the Homerun job links to the release case study", () => {
  const job = jobs.find((job) => job.slug === "homerun-presales");
  assert.ok(
    job?.notableProjects.some(
      (item) => item.slug === "reliable-releases-at-homerun-presales",
    ),
  );
});

test("public Homerun copy omits customer deployment counts", () => {
  const job = jobs.find((job) => job.slug === "homerun-presales");
  const release = portfolioItems.find(
    ({ slug }) => slug === "reliable-releases-at-homerun-presales",
  );
  assert.ok(job && release);
  const publicCopy = [
    job.summary,
    job.html,
    release.excerpt,
    release.html,
  ].join(" ");
  assert.doesNotMatch(
    publicCopy,
    /\b\d[\d,]*\+?\s+(?:(?:separately|independently) deployed\s+)?(?:customer\s+)?(?:tenants|environments|instances)\b/i,
  );
});

test("independent product pages describe the product and technology stack", () => {
  for (const slug of ["coalesce", "daily-reps", "guardianforge"]) {
    const item = getPortfolioItem(slug);
    assert.ok(item?.excerpt, `Missing About page for ${slug}`);
    const headings = [...item.html.matchAll(/<h2>(.*?)<\/h2>/g)].map(
      (match) => match[1],
    );
    assert.deepEqual(headings, ["What I built", "Stack"]);
    assert.match(item.html, /<h2>Stack<\/h2>[\s\S]*<li>/);
  }
});
