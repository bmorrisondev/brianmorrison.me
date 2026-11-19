import type { MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import ContactForm from "~/components/ContactForm";
import StylizedListItem from "~/components/StylizedListItem";
import {
  featuredCaseStudySlugs,
  jobs,
  portfolioItems,
  systechTestimonial,
} from "~/content/portfolio";
import socials from "~/socials";
import { buildHeader } from "~/utils";
import me from "../images/me.jpg";
import coalesceIcon from "../images/products/coalesce.png";
import dailyRepsIcon from "../images/products/dailyreps.png";
import guardianForgeIcon from "../images/products/guardianforge.png";

const featuredWriting = [
  {
    title: "How to Design a Multi-Tenant SaaS Architecture",
    publisher: "Clerk",
    url: "https://clerk.com/blog/how-to-design-multitenant-saas-architecture",
  },
  {
    title: "Horizontal scaling with Postgres replication",
    publisher: "Readyset",
    url: "https://readyset.io/blog/horizontal-scaling-with-postgres-replication",
  },
  {
    title: "How to take your Clerk application to production",
    publisher: "Clerk",
    url: "https://clerk.com/blog/how-to-take-your-clerk-app-to-prod",
  },
];

const independentProducts = [
  {
    name: "Coalesce",
    description:
      "A training planner that fits running, lifting, and other workouts into one week while accounting for recovery.",
    url: "https://coalescefitness.com/",
    icon: coalesceIcon,
  },
  {
    name: "DailyReps",
    description:
      "Set daily workout goals, log reps or time, and track your progress and streaks.",
    url: "https://dailyreps.in/",
    icon: dailyRepsIcon,
  },
  {
    name: "GuardianForge",
    description:
      "Find community builds, save snapshots of your loadouts, and share Destiny 2 builds with a link.",
    url: "https://guardianforge.net/",
    icon: guardianForgeIcon,
  },
];

export const loader = () => {
  const caseStudies = featuredCaseStudySlugs.flatMap((slug) => {
    const item = portfolioItems.find((entry) => entry.slug === slug);
    if (!item) return [];

    return [
      {
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        company: item.job?.[0]?.companyName,
      },
    ];
  });

  const featuredJobs = [
    "homerun-presales",
    "lead-backend-developer",
    "api-developer-sr-systems-engineer",
  ].flatMap((slug) => {
    const job = jobs.find((entry) => entry.slug === slug);
    if (!job) return [];

    return [
      {
        slug: job.slug,
        companyName: job.companyName,
        title: job.title,
        yearsActive: job.yearsActive,
        summary: job.summary,
      },
    ];
  });

  return json({ caseStudies, featuredJobs, systechTestimonial });
};

export const meta: MetaFunction = () => {
  const description =
    "Brian Morrison II, Engineering Manager at Homerun Presales. Customer integrations, architecture, and engineering delivery.";

  return buildHeader({ description, url: "https://brianmorrison.me/" }).map(
    (tag) =>
      tag.name === "description" ? { ...tag, content: description } : tag,
  );
};

export default function Index() {
  const { caseStudies, featuredJobs, systechTestimonial } =
    useLoaderData<typeof loader>();

  return (
    <main>
      <section className="bg-gradient md:mx-8 md:rounded-xl">
        <div className="mx-auto grid max-w-5xl gap-5 px-5 pb-12 pt-6 sm:gap-8 sm:px-8 sm:pb-24 sm:pt-20 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <img
            src={me}
            alt="Brian Morrison II"
            width={144}
            height={144}
            className="h-16 w-16 rounded-full border border-neutral-200 object-cover sm:h-24 sm:w-24 md:order-last md:mr-8 md:h-36 md:w-36"
          />
          <div>
            <h1 className="m-0 max-w-[16ch] text-balance text-4xl leading-tight tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
              I build software around how customers work.
            </h1>
            <p className="mb-0 mt-5 max-w-2xl text-base leading-relaxed text-neutral-700 sm:text-lg">
              I’m Brian Morrison II, Engineering Manager at Homerun Presales,
              where I lead engineering delivery for a product deployed across
              50+ tenants. I’ve built customer integrations in logistics,
              redesigned a fleet dashboard for a customer tracking nearly 30,000
              assets, and created developer tools at PlanetScale.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 font-sans text-sm font-semibold sm:gap-3 sm:text-base">
              <Link
                to="#selected-work"
                className="rounded-md bg-neutral-900 px-3 py-3 text-white sm:px-4 hover:bg-neutral-700"
              >
                View selected work
              </Link>
              <a
                href="/docs/brian-morrison-ii-resume.pdf"
                download
                className="rounded-md border border-neutral-300 bg-white px-3 py-3 text-neutral-900 sm:px-4 hover:border-neutral-500"
              >
                Download resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="selected-work"
        aria-labelledby="selected-work-heading"
        className="mx-auto max-w-5xl scroll-mt-20 px-5 pb-16 pt-4 sm:px-8"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <h2 id="selected-work-heading" className="!my-0 text-3xl sm:text-4xl">
            Selected work
          </h2>
          <Link
            to="/portfolio"
            className="font-sans font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
          >
            View full portfolio
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {caseStudies.map(({ slug, title, excerpt, company }) => {
            const isRenewalsStudy = slug === "proposals-app";
            return (
              <article
                key={slug}
                className={`grid content-start gap-5 rounded-lg border border-neutral-200 bg-white p-5 sm:p-7 ${
                  isRenewalsStudy
                    ? "md:col-span-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
                    : ""
                }`}
              >
                <div>
                  {company && (
                    <p className="mb-2 text-sm text-neutral-600">{company}</p>
                  )}
                  <h3 className="!mt-0 text-xl leading-snug sm:text-2xl">
                    <Link
                      to={`/portfolio/${slug}`}
                      className="!border-0 !text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                    >
                      {title}
                    </Link>
                  </h3>
                  <p className="mb-0 mt-3 text-base leading-relaxed text-neutral-700">
                    {excerpt}
                  </p>
                  {isRenewalsStudy && (
                    <p className="mb-0 mt-4 font-sans text-sm font-semibold">
                      <Link to="/demos/waystone">
                        Try the Waystone prototype walkthrough
                      </Link>
                    </p>
                  )}
                  {slug === "iot-dashboard-optimizations" && (
                    <p className="mb-0 mt-4 font-sans text-sm font-semibold">
                      <Link to="/portfolio/graphql-api-and-dynamic-groups">
                        Related work on Go and dynamic asset groups
                      </Link>
                    </p>
                  )}
                </div>
                {isRenewalsStudy && systechTestimonial.quote && (
                  <figure className="rounded-md bg-neutral-100 p-4 sm:p-5">
                    <blockquote>
                      <p className="mb-2 text-base leading-relaxed">
                        “{systechTestimonial.quote}”
                      </p>
                    </blockquote>
                    <figcaption className="text-sm text-neutral-700">
                      {systechTestimonial.author}, Systech Information Services
                    </figcaption>
                  </figure>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="experience-heading"
        className="bg-gradient-to-b from-gray-100 to-white md:mx-8 md:rounded-xl"
      >
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 id="experience-heading" className="!my-0 text-3xl sm:text-4xl">
              Work experience
            </h2>
            <Link
              to="/work-with-me#work-history"
              className="font-sans font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
            >
              View full work history
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredJobs.map((job) => (
              <Link
                to={`/work-with-me#${job.slug}`}
                key={job.slug}
                className="rounded-lg border border-neutral-200 bg-white p-5 text-neutral-900 transition hover:border-neutral-400 hover:shadow-sm"
              >
                <h3 className="!mt-0 text-xl">{job.companyName}</h3>
                <p className="mb-1 mt-2 font-sans text-base">{job.title}</p>
                <p className="mb-3 text-sm text-neutral-600">
                  {job.yearsActive}
                </p>
                <p className="mb-0 text-base leading-relaxed text-neutral-700">
                  {job.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="content"
        aria-labelledby="writing-heading"
        className="scroll-mt-20 bg-neutral-900 md:mx-8 md:rounded-xl"
      >
        <div className="mx-auto max-w-5xl px-5 py-12 text-white sm:px-8 sm:py-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 id="writing-heading" className="!my-0 text-3xl sm:text-4xl">
              Selected writing
            </h2>
            <Link
              to="/content"
              className="font-sans font-semibold text-white underline underline-offset-4 hover:text-blue-200"
            >
              View full archive
            </Link>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {featuredWriting.map(({ title, publisher, url }) => (
              <li key={url} className="m-0">
                <a
                  href={url}
                  className="flex h-full flex-col gap-2 rounded-lg border border-neutral-600 bg-neutral-800 p-5 text-white transition hover:border-white"
                >
                  <span className="text-sm text-neutral-300">{publisher}</span>
                  <span className="font-sans text-lg font-semibold">
                    {title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="independent-products"
        aria-labelledby="products-heading"
        className="mx-auto max-w-5xl scroll-mt-20 px-5 py-14 sm:px-8"
      >
        <h2 id="products-heading" className="!mt-0 mb-6 text-3xl sm:text-4xl">
          Independent products
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {independentProducts.map(({ name, description, url, icon }) => (
            <li
              key={name}
              className="m-0 flex flex-col rounded-lg border border-neutral-200 bg-gradient p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <img
                  src={icon}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 shrink-0 rounded-lg object-contain"
                />
                <h3 className="!mt-0 text-xl">{name}</h3>
              </div>
              <p className="mb-4 mt-3 text-base leading-relaxed text-neutral-700">
                {description}
              </p>
              <a
                href={url}
                className="mt-auto self-start font-sans text-base font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900"
              >
                Visit {name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-20 bg-gradient-to-b from-gray-100 to-white md:mx-8 md:rounded-xl"
      >
        <div className="mx-auto flex max-w-xl flex-col gap-2 px-5 py-12 text-center sm:px-8">
          <h2 id="contact-heading" className="!mt-0 text-3xl sm:text-4xl">
            Contact me
          </h2>
          <ContactForm />
          <div className="mt-3 flex flex-wrap justify-center">
            <StylizedListItem to={socials.linkedin}>LinkedIn</StylizedListItem>
            <StylizedListItem to={socials.twitter}>Twitter</StylizedListItem>
            <StylizedListItem to={socials.github}>GitHub</StylizedListItem>
          </div>
        </div>
      </section>
    </main>
  );
}
