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
    { value: "8+", label: "Shipped Projects" },
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
    blurb: "Lightweight navigation framework using homography-based Bird's-Eye-View rectification and DAVE2-style CNN steering prediction.",
    tags: ["Python", "PyTorch", "OpenCV", "Computer Vision"],
    year: "2026",
    href: "https://github.com/noneiann",
  },
  {
    id: "riceblast-abm",
    index: "02",
    title: "Agent-Based RiceBlast Model",
    blurb: "Multithreaded SLIR simulation with an advection-diffusion dispersal kernel and stochastic wind vector modeling.",
    tags: ["C++", "SDL3", "OpenGL", "Multithreading"],
    year: "2025",
    href: "https://github.com/noneiann/RICEBLAST_ABM",
  },
  {
    id: "blueracket",
    index: "03",
    title: "BlueRacket",
    blurb: "Two-sided mobile marketplace connecting customers with blue-collar workers with real-time updates.",
    tags: ["Expo", "React Native", "Supabase", "Zustand"],
    year: "2025",
    href: "https://github.com/noneiann",
  },
  {
    id: "digital-miam",
    index: "04",
    title: "Digital MIAM",
    blurb: "Professional mediation services platform featuring isolated client and admin portals.",
    tags: ["Next.js 14", "Supabase", "Tailwind CSS", "shadcn/ui"],
    year: "2025",
    href: "https://github.com/noneiann",
  },
  {
    id: "iligan-commuter",
    index: "05",
    title: "IliganonGO",
    blurb: "Transit mapping platform for local jeepney routes featuring an integrated fare calculation system.",
    tags: ["Flutter", "Google Maps API", "Firebase"],
    year: "2024",
    href: "https://github.com/noneiann/Iligan_Commuter",
  },
];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Resume", href: "#" },
];
