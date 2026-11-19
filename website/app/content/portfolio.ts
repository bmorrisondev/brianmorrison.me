import type { Job, PortfolioItem } from "~/models";
import employmentHistory from "./notion/notionEmploymentHistoryItem.json";
import portfolioContent from "./notion/notionPortfolioItem.json";
import tags from "./notion/notionTag.json";

export const featuredCaseStudySlugs = [
  "proposals-app",
  "iot-dashboard-optimizations",
  "reliable-releases-at-homerun-presales",
];

const jobsById = new Map(employmentHistory.map((job) => [job.id, job]));
const tagsById = new Map(tags.map((tag) => [tag.id, tag]));
const allPortfolioItems: PortfolioItem[] = portfolioContent.map((item) => ({
  ...item,
  job: item.relation_job.flatMap((id) => {
    const job = jobsById.get(id);
    return job ? [{ companyName: job.companyName }] : [];
  }),
  skillsUsed: item.relation_skillsUsed.flatMap((id) => {
    const tag = tagsById.get(id);
    return tag ? [{ id: tag.id, name: tag.name, icon: tag.icon }] : [];
  }),
}));

export const portfolioItems = allPortfolioItems
  .filter((item) => item.status === "Published")
  .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

export function getPortfolioItem(slug: string | undefined) {
  return allPortfolioItems.find((item) => item.slug === slug);
}

export const jobs: Job[] = employmentHistory.flatMap((job) => {
  if (job.visibility?.slug !== "public") return [];

  return [
    {
      ...job,
      visibility: job.visibility,
      logo: job.logo ?? [],
      notableProjects: job.relation_notableProjects.flatMap((id) => {
        const project = portfolioItems.find((item) => item.id === id);
        return project ? [project] : [];
      }),
    },
  ];
});

const systechJob = jobs.find((job) => job.slug === "network-engineer");
export const systechTestimonial = {
  quote: systechJob?.testimonial ?? "",
  author: systechJob?.testimonialAuthor ?? "",
};
