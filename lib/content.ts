// Placeholder copy — swap every field below for the real thing before deploying.
// Nothing here is wired to a CMS; it's just data the sections import.

export const SITE = {
  name: "Rey Iann Tigley",
  initials: "RIT",
  role: "Software Engineer",
  email: "reyianntigley1@gmail.com",
  location: "Iligan City, Philippines",
  timezone: "GMT+8",

  // ── SEO ────────────────────────────────────────────────────────────────
  // `url` is the canonical origin: it anchors metadataBase, the sitemap, the
  // robots.txt sitemap pointer and every absolute OG/Twitter image URL. Set
  // NEXT_PUBLIC_SITE_URL on the host (Vercel: Project → Settings → Environment
  // Variables) if the real domain differs from the fallback below. No trailing
  // slash.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://reyianntigley.work",

  // One line, used verbatim as the meta description and the OG card subtitle.
  // Mirrors the hero copy so the search result and the page agree.
  tagline:
    "Software engineer working across interfaces, infrastructure, and the seams in between.",

  // Longer form for the <meta name="description"> — search engines show
  // roughly 155 characters, so the important nouns come first.
  description:
    "Rey Iann Tigley is a software engineer in Iligan City, Philippines building full-stack web and mobile products, computer vision pipelines, and high-performance simulations.",

  availability: "Available from Jun 2026",
};

// Drives the top nav, the right-edge section rail, and the "01 / About"
// eyebrow numbering — one source of truth so they can never drift.
export const NAV_ITEMS = [
  { id: "hero", index: "00", label: "Home" },
  { id: "about", index: "01", label: "About" },
  { id: "skills", index: "02", label: "Skills" },
  { id: "experience", index: "03", label: "Experience" },
  { id: "projects", index: "04", label: "Work" },
  { id: "contact", index: "05", label: "Contact" },
];

export const ABOUT = {
  paragraphs: [
    "I'm a Software Developer working across full-stack product engineering, machine learning, and systems development.",
    "I focus on building robust, scalable software tailored for real-world operations. My adaptability towards different stacks and my curiousity empowers me to strive for innovation and quality. I am passionate about leveraging my expertise to solve problems and deliver solutions.",
  ],
  focus: [
    {
      title: "Full-Stack & Mobile",
      description: "Building production web apps and mobile solutions with Next.js, React Native, and Supabase.",
    },
    {
      title: "Computer Vision, Machine Learning, & AI",
      description: "Implementing geometric camera localization, behavioral cloning CNNs, and real-time video analytics pipelines.",
    },
    {
      title: "Systems & Simulation",
      description: "Developing high-performance, multithreaded simulations and graphics applications using C++, SDL3, and OpenGL.",
    },
  ],
  stats: [
    { value: "10+", label: "Shipped Projects" },
    { value: "10+", label: "Languages & Tools" },
    { value: "BSCS", label: "MSU-IIT Graduate 2026" },
  ],
};

export const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "Dart", "PHP", "Java", "C#"],
  },
  {
    title: "Frontend & Mobile",
    items: ["Next.js", "React", "React Native", "Expo", "Flutter", "Tailwind CSS"],
  },
  {
    title: "Backend & Cloud",
    items: ["Node.js", "PostgreSQL", "Supabase", "Firebase", "Docker", "Flask"],
  },
  {
    title: "AI, Vision & Systems",
    items: ["PyTorch", "OpenCV", "OpenGL", "SDL3", "Git", "WordPress"],
  },
];

export const EXPERIENCE = [
  {
    id: "anura-junior",
    index: "01",
    role: "Junior Developer",
    company: "Anura Innovations",
    period: "Aug 2025 — Jun 2026",
    location: "Iligan City / Hybrid",
    description:
      "Shipped production web and mobile features across client platforms using Next.js, React Native, Node.js, and Supabase.",
    highlights: [
      "Owned features end-to-end from database schema and backend APIs to responsive front-end UI.",
      "Collaborated in an agile team handling code reviews, QA tracking, and Docker-based deployments.",
    ],
  },
  {
    id: "anura-intern",
    index: "02",
    role: "Software Developer Intern",
    company: "Anura Innovations",
    period: "Jun 2025 — Jul 2025",
    location: "Iligan City / Hybrid",
    description:
      "Built and maintained features for internal and client projects using Next.js, Supabase, and PostgreSQL.",
    highlights: [
      "Contributed core feature work and integrations to the eReferral and Digital MIAM platforms.",
      "Assisted in database query optimization and API layer standardizations.",
    ],
  },
  {
    id: "dreamteam",
    index: "03",
    role: "WordPress Developer",
    company: "DreamTeam PH",
    period: "Sep 2024 — Dec 2024",
    location: "Remote",
    description:
      "Developed and customized WordPress sites, themes, and plugins to client specifications.",
    highlights: [
      "Built responsive, high-performance page layouts and tailored custom CMS workflows.",
      "Handled production site maintenance, updates, and cross-browser troubleshooting.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "thesis-nav",
    index: "01",
    title: "End-to-End Autonomous Navigation",
    blurb: "Lightweight navigation framework using homography-based Bird's-Eye-View rectification and DAVE2-style CNN steering prediction. Cleared all 40 closed-loop trials across four track topologies without leaving the lane.",
    tags: ["Python", "PyTorch", "OpenCV", "Computer Vision"],
    year: "2026",
    href: "https://github.com/noneiann",
  },
  {
    id: "icarus",
    index: "02",
    title: "Icarus",
    blurb: "Universal computer vision engine for CCTV systems — a unified pipeline for real-time detection and analytics across heterogeneous camera feeds.",
    tags: ["Computer Vision", "Python", "Real-Time Analytics"],
    year: "2025",
    href: "https://github.com/noneiann",
  },
  {
    id: "riceblast-abm",
    index: "03",
    title: "Agent-Based RiceBlast Model",
    blurb: "Agent-based SLIR model with an advection-diffusion dispersal kernel and a wind vector driving stochastic spore dispersal. Multithreaded for a 1.75x speedup over serial.",
    tags: ["C++", "SDL3", "OpenGL", "Multithreading"],
    year: "2025",
    href: "https://github.com/noneiann/RICEBLAST_ABM",
  },
  {
    id: "blueracket",
    index: "04",
    title: "BlueRacket",
    blurb: "Two-sided mobile marketplace connecting customers with blue-collar workers, backed by Supabase Auth, Postgres, Storage, and Realtime.",
    tags: ["Expo", "React Native", "Supabase", "Zustand"],
    year: "2025",
    href: "https://github.com/noneiann",
  },
  {
    id: "digital-miam",
    index: "05",
    title: "Digital MIAM",
    blurb: "Professional mediation services platform with separate client and admin applications.",
    tags: ["Next.js 14", "Supabase", "Tailwind CSS", "shadcn/ui"],
    year: "2025",
    href: "https://github.com/noneiann",
  },
  {
    id: "ereferral",
    index: "06",
    title: "eReferral",
    blurb: "Electronic referral management system for coordinating patient referrals between healthcare providers.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    year: "2025",
    href: "https://github.com/noneiann",
  },
  {
    id: "pedros-roving-market",
    index: "07",
    title: "Pedro's Roving Market",
    blurb: "Digital marketplace and ordering platform for a roving market vendor, built during client work at Anura Innovations.",
    tags: ["Next.js", "Supabase", "PostgreSQL"],
    year: "2025",
    href: "https://github.com/noneiann",
  },
  {
    id: "trigoride",
    index: "08",
    title: "TriGoRide",
    blurb: "Tricycle booking app for Oroquieta that matches passengers with nearby riders through a distance and rating-based heuristic, with rider profiles, plate numbers, and ride history.",
    tags: ["Flutter", "Firebase", "Google Maps API"],
    year: "2024",
    href: "https://github.com/noneiann/TriGoRide",
  },
  {
    id: "iligan-commuter",
    index: "09",
    title: "IliganCommuter",
    blurb: "Commuting map of jeepney routes in Iligan City with an integrated fares calculator.",
    tags: ["Flutter", "Google Maps API", "Firebase"],
    year: "2024",
    href: "https://github.com/noneiann/IliganCommuter",
  },
  {
    id: "pawpal",
    index: "10",
    title: "PawPal",
    blurb: "Collaborative veterinarian system where clients manage pet profiles and reserve appointments while veterinarians accept bookings, review profiles, and upload documents.",
    tags: ["Web App", "Full-Stack", "CRUD"],
    year: "2024",
    href: "https://github.com/noneiann",
  },
];

export const CONTACT = {
  heading: "LET'S WORK TOGETHER",
  blurb:
    "I recently graduated with a Bachelor's Degree in Computer Science at MSU-IIT. I'm always open to new opportunities, projects, and ideas. Feel free to reach out!",
  status: "Available from Jun 2026",
};

// `value` is what a reader actually needs to see (the handle, the address);
// `label` is just the channel name. Contact renders both.
export const SOCIALS = [
  { label: "GitHub", value: "@noneiann", href: "https://github.com/noneiann" },
  { label: "LinkedIn", value: "/in/rey-iann-tigley-86a6bb424", href: "https://www.linkedin.com/in/rey-iann-tigley-86a6bb424" },
  { label: "Resume", value: "PDF", href: "/resume.pdf" },
];
