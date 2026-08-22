// Placeholder copy — swap every field below for the real thing before deploying.
// Nothing here is wired to a CMS; it's just data the sections import.

export const SITE = {
  name: "Rey Iann Tigley",
  initials: "RIT",
  role: "Software Engineer",
  email: "hello@example.com",
  location: "Remote",
};

export const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

export const ABOUT = {
  paragraphs: [
    "I'm a software engineer who likes working across the whole stack — from interface details down to the infrastructure that keeps them running. I care most about the seams: the API contract, the build pipeline, the handoff between design and code.",
    "Most recently I've been building with TypeScript, React, and Next.js on the front end, and Node with Postgres on the back — with a growing interest in real-time, WebGL-driven interfaces like the one this site is built on.",
  ],
  focus: [
    {
      title: "Product engineering",
      description: "Shipping interfaces that hold up under real usage, not just demo conditions.",
    },
    {
      title: "Systems & infra",
      description: "APIs, data pipelines, and the deploy tooling that makes shipping boring.",
    },
    {
      title: "Interactive graphics",
      description: "WebGL and shader work — this hero scene included — for interfaces that feel alive.",
    },
  ],
  stats: [
    { value: "5+", label: "Years building software" },
    { value: "20+", label: "Shipped projects" },
    { value: "3", label: "Core stacks" },
  ],
};

export const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "GLSL"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Three.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend & data",
    items: ["Node.js", "PostgreSQL", "REST / GraphQL", "Redis"],
  },
  {
    title: "Tools & infra",
    items: ["Docker", "AWS", "GitHub Actions", "Vercel", "Git"],
  },
];

export const EXPERIENCE = [
  {
    id: "acme",
    index: "01",
    role: "Senior Software Engineer",
    company: "Acme Corp",
    period: "2023 — Present",
    location: "Remote",
    description:
      "Leading front-end architecture for a real-time analytics product used by teams monitoring distributed systems.",
    highlights: [
      "Rebuilt the dashboard rendering pipeline, cutting median load time by 40%.",
      "Introduced a shared component library adopted across 4 product teams.",
    ],
  },
  {
    id: "northwind",
    index: "02",
    role: "Software Engineer",
    company: "Northwind Labs",
    period: "2021 — 2023",
    location: "Remote",
    description:
      "Built and maintained developer-facing tooling, from CI dashboards to deploy automation.",
    highlights: [
      "Shipped a CI/CD observability tool now used by every engineering team.",
      "Migrated the core API from REST to GraphQL with zero downtime.",
    ],
  },
  {
    id: "fieldstone",
    index: "03",
    role: "Junior Developer",
    company: "Fieldstone Studio",
    period: "2019 — 2021",
    location: "Hybrid",
    description:
      "Worked across small client projects, from marketing sites to internal admin tools.",
    highlights: [
      "Delivered 10+ client sites end-to-end, from design handoff to launch.",
      "Built an internal CMS that replaced a spreadsheet-based workflow.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "orbital",
    index: "01",
    title: "Orbital",
    blurb: "Real-time data visualization platform for monitoring distributed systems at a glance.",
    tags: ["React", "WebSockets", "D3"],
    year: "2025",
    href: "#",
  },
  {
    id: "signal",
    index: "02",
    title: "Signal",
    blurb: "Developer analytics dashboard that turns CI and deploy events into a single timeline.",
    tags: ["Next.js", "Postgres", "Node"],
    year: "2024",
    href: "#",
  },
  {
    id: "lumen",
    index: "03",
    title: "Lumen",
    blurb: "Generative design tool for exploring layout variations with a parametric grid engine.",
    tags: ["TypeScript", "Canvas", "WebGL"],
    year: "2024",
    href: "#",
  },
  {
    id: "nova",
    index: "04",
    title: "Nova",
    blurb: "Headless storefront with sub-second navigation and an inventory sync worker underneath.",
    tags: ["Next.js", "GraphQL", "Redis"],
    year: "2023",
    href: "#",
  },
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Resume", href: "#" },
];
