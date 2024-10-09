export type SeriesEntry = {
  order?: number
  title?: string
  slug?: string
}

export type SeriesCollection = {
  name?: string
  icon?: any
  entries?: SeriesEntry[]
}

export type GuestbookEntry = {
  id: number
  userId: string
  name: string
  imageUrl: string
  message: string
  createdOn: Date
  isApproved?: boolean
}

export type Job = {
  id: string;
  notion_id: string;
  jobType: {
    slug: string;
    name: string;
  };
  testimonialAuthor: string;
  companyName: string;
  relation_notableProjects: string[];
  notableProjects: PortfolioItem[]
  yearsActive: string;
  testimonial: string;
  title: string;
  slug: string;
  logo: string[];
  html: string;
  excerpt: string;
  cachedOn: number;
};

export type PortfolioItem = {
  id: string;
  notion_id: string;
  status: string;
  relation_job: string[]; // Replace 'any' with a more specific type if known
  relation_skillsUsed: string[]; // Replace 'any' with a more specific type if known
  tags: string[]; // Replace 'any' with a more specific type if known
  excerpt: string;
  title: string;
  slug: string;
  html: string;
  cachedOn: number;
}
