/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — this is the only file you need to edit.
 *
 *  Everything below is PLACEHOLDER copy written to be plausible
 *  for a CS graduate specialising in software development, AI/ML
 *  and computer vision. Swap in your real projects, roles, dates
 *  and URLs; the layout adapts to however many entries you keep.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Rey Iann Tigley",
  /** Shown under the name in the masthead. Keep it short. */
  role: "Software Engineer · Machine Learning · Computer Vision",
  /** Used for <title>, OG tags and the sitemap. Set this to your real domain before deploying. */
  url: "https://reyianntigley.com",
  location: "Philippines · Open to remote",
  /** One-line summary used for SEO description and OG cards. */
  tagline:
    "Computer science graduate building software that sees, reasons, and ships — from vision models on the edge to the systems that serve them.",
  monogram: "RIT",
  graduationYear: 2026,
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Work", href: "#work" },
  { label: "Record", href: "#record" },
  { label: "Contact", href: "#contact" },
];

/** Hero — the title page of the volume. */
export const hero = {
  eyebrow: "Portfolio · Est. 2026",
  headline: "Computer scientist working at the seam of software and perception.",
  intro:
    "I build production software and the machine learning systems inside it — training and shrinking vision models, wiring them into APIs that hold up under load, and designing interfaces that make their output legible to the people who depend on it.",
  /** Small statistics plate under the hero. Keep to 3–4 for balance. */
  facts: [
    { value: "6+", label: "Shipped projects" },
    { value: "3", label: "Research collaborations" },
    { value: "2026", label: "BS Computer Science" },
  ],
};

/** About — the colophon. Each string is rendered as its own paragraph. */
export const about = {
  paragraphs: [
    "I came to computer science through a curiosity about how machines interpret the world, and stayed for the engineering discipline it demands. A model that reaches 97% on a validation set is a hypothesis; a model that holds that accuracy on a factory camera at 2 a.m., under fluorescent flicker, is a system. Most of my work lives in the distance between those two things.",
    "My training spans classical software engineering — typed languages, tested code, sane deployment — and modern applied machine learning: deep learning for vision, retrieval-augmented language systems, and the quantisation and profiling work that makes them affordable to run. I care as much about latency budgets and failure modes as about architecture diagrams.",
    "Outside of shipping, I read papers with a pen, maintain a small collection of pre-war typography books, and believe that good documentation is a form of respect for the next engineer — usually a future version of me.",
  ],
  /**
   * The portrait plate beside the prose. The image itself is
   * `public/portrait.png` — a background-free cut-out; replace that file to
   * change the photograph (any transparent PNG with similar proportions works).
   */
  portrait: {
    alt: "Portrait of Rey Iann Tigley",
    caption: "Plate I",
  },
  /** Optional pull-quote set beside the prose. Set to null to omit. */
  pullQuote: {
    text: "A model is a hypothesis. A system is a promise.",
    attribution: "Working principle",
  },
};

export type ExpertiseGroup = {
  title: string;
  summary: string;
  items: string[];
};

export const expertise: ExpertiseGroup[] = [
  {
    title: "Machine Learning & AI",
    summary:
      "Supervised and self-supervised training pipelines, evaluation design, and the unglamorous work of making results reproducible.",
    items: [
      "PyTorch",
      "TensorFlow / Keras",
      "scikit-learn",
      "Hugging Face Transformers",
      "Experiment tracking (W&B, MLflow)",
      "RAG & vector search",
    ],
  },
  {
    title: "Computer Vision",
    summary:
      "Detection, segmentation and pose systems taken from annotation through to a camera running in the field.",
    items: [
      "OpenCV",
      "YOLO / DETR detection",
      "Semantic segmentation",
      "Pose estimation",
      "OCR & document layout",
      "Edge inference (ONNX, TFLite)",
    ],
  },
  {
    title: "Software Engineering",
    summary:
      "Typed, tested application code and the APIs that carry model output to real users.",
    items: [
      "TypeScript & React",
      "Next.js",
      "Python (FastAPI, Django)",
      "PostgreSQL & Redis",
      "REST & gRPC design",
      "Testing (pytest, Vitest, Playwright)",
    ],
  },
  {
    title: "Systems & Delivery",
    summary:
      "Containers, pipelines and observability — the substrate that keeps a demo from staying a demo.",
    items: [
      "Docker",
      "CI/CD (GitHub Actions)",
      "AWS & GCP fundamentals",
      "Linux & shell",
      "Model serving & profiling",
      "Git-based collaboration",
    ],
  },
];

export type Project = {
  /** Folio number rendered beside the title, e.g. "01". */
  no: string;
  title: string;
  kicker: string;
  year: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Optional headline metric, printed as a plate on the card. */
  metric?: { value: string; label: string };
  links?: { label: string; href: string }[];
};

// TODO: replace the placeholder repository URLs below with your own.
export const projects: Project[] = [
  {
    no: "01",
    title: "Sentinel Vision",
    kicker: "Computer vision · Edge deployment",
    year: "2026",
    summary:
      "Real-time safety-compliance monitoring for industrial floors. A detection model watches RTSP camera feeds for missing protective equipment and raises an alert within a second, running entirely on-premise so no footage leaves the building.",
    highlights: [
      "Fine-tuned a YOLO-family detector on 18k annotated frames, with hard-negative mining for low-light and partial-occlusion cases.",
      "Exported to ONNX Runtime with INT8 quantisation, cutting inference cost by ~4× while holding mAP within a point of the float baseline.",
      "Built a FastAPI alerting service with per-camera thresholds, an audit log, and a review queue for contested detections.",
    ],
    stack: ["PyTorch", "ONNX Runtime", "OpenCV", "FastAPI", "PostgreSQL", "Docker"],
    metric: { value: "62 ms", label: "median latency per frame" },
    links: [{ label: "Repository", href: "https://github.com/noneiann" }],
  },
  {
    no: "02",
    title: "Palimpsest",
    kicker: "Applied AI · Document intelligence",
    year: "2025",
    summary:
      "A retrieval-augmented search system for scanned institutional archives. It reads decades of mixed-quality documents, preserves their layout structure, and answers natural-language questions with citations back to the exact page.",
    highlights: [
      "Layout-aware OCR pipeline that keeps tables and multi-column text intact before chunking.",
      "Hybrid retrieval — dense embeddings in pgvector combined with BM25 — improving answer-grounding accuracy over dense-only baselines.",
      "Every answer carries page-level citations; unsupported claims are withheld rather than guessed.",
    ],
    stack: ["Python", "Transformers", "pgvector", "FastAPI", "Next.js", "Tesseract"],
    metric: { value: "40k+", label: "pages indexed" },
    links: [{ label: "Repository", href: "https://github.com/noneiann" }],
  },
  {
    no: "03",
    title: "Cadence",
    kicker: "Computer vision · Mobile",
    year: "2025",
    summary:
      "A rehabilitation companion that watches a patient perform prescribed exercises through a phone camera, counts valid repetitions, and flags form deviations that would otherwise go uncorrected between clinic visits.",
    highlights: [
      "On-device pose estimation with joint-angle heuristics tuned in consultation with a physiotherapist.",
      "Runs fully offline — no video ever leaves the handset, which removed the main objection during user testing.",
      "Adherence reports summarised for the clinician without exposing raw footage.",
    ],
    stack: ["MediaPipe", "TensorFlow Lite", "React Native", "TypeScript", "SQLite"],
    metric: { value: "94%", label: "repetition-count agreement" },
    links: [{ label: "Repository", href: "https://github.com/noneiann" }],
  },
  {
    no: "04",
    title: "Foliage",
    kicker: "Machine learning · Agriculture",
    year: "2024",
    summary:
      "A crop-disease classifier deployed to a Raspberry Pi for use in fields without reliable connectivity, built with smallholder farmers rather than for them.",
    highlights: [
      "Transfer learning over a class-imbalanced dataset, corrected with focal loss and targeted augmentation.",
      "Post-training quantisation to fit the model in memory on a Pi 4 with sub-second inference.",
      "Grad-CAM overlays show which region of the leaf drove the prediction, so users can sanity-check the model.",
    ],
    stack: ["TensorFlow", "TFLite", "Raspberry Pi", "NumPy", "Flask"],
    metric: { value: "0.91", label: "macro F1 across 12 classes" },
    links: [{ label: "Repository", href: "https://github.com/noneiann" }],
  },
  {
    no: "05",
    title: "Ledgerly",
    kicker: "Full-stack software",
    year: "2024",
    summary:
      "A shared-expense platform for households and small teams: multi-currency ledgers, receipt capture, and settlement suggestions that minimise the number of transfers required.",
    highlights: [
      "Server-rendered Next.js application with typed end-to-end data access and row-level authorisation.",
      "Receipt OCR extracts line items automatically, with a correction interface for the cases it gets wrong.",
      "Debt-simplification algorithm reduces settlement transfers substantially for larger groups.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Playwright"],
    links: [{ label: "Repository", href: "https://github.com/noneiann" }],
  },
  {
    no: "06",
    title: "Arbiter",
    kicker: "Developer tooling",
    year: "2023",
    summary:
      "A lightweight command-line experiment tracker for researchers who want reproducibility without standing up a service — runs, metrics and artefacts recorded to a local analytical database.",
    highlights: [
      "Captures git SHA, environment and hyperparameters automatically on every run.",
      "Instant cross-run comparison queries over thousands of records via an embedded columnar store.",
      "Single-command export to a shareable static report.",
    ],
    stack: ["Python", "DuckDB", "Typer", "Rich", "pytest"],
    links: [{ label: "Repository", href: "https://github.com/noneiann" }],
  },
];

export type RecordEntry = {
  period: string;
  title: string;
  organisation: string;
  description: string;
  details?: string[];
};

/** Professional experience — most recent first. */
export const experience: RecordEntry[] = [
  {
    period: "2025 — 2026",
    title: "Machine Learning Engineer, Intern",
    organisation: "Northbound Analytics",
    description:
      "Worked on the vision team taking research prototypes into production for manufacturing clients.",
    details: [
      "Rebuilt the training pipeline around reproducible configs, cutting the time to reproduce a past result from days to minutes.",
      "Shipped a quantised detection model to eight on-premise sites without a regression in field accuracy.",
    ],
  },
  {
    period: "2024 — 2025",
    title: "Software Engineer, Intern",
    organisation: "Kite & Compass Labs",
    description:
      "Full-stack product work on a customer-facing analytics dashboard used by mid-sized logistics operators.",
    details: [
      "Owned the reporting module end to end, from schema design through to the front-end charts.",
      "Introduced integration tests to the release path, which stopped a recurring class of deployment regressions.",
    ],
  },
  {
    period: "2023 — 2025",
    title: "Undergraduate Research Assistant",
    organisation: "Vision & Learning Laboratory",
    description:
      "Supported research on robust perception under degraded imaging conditions.",
    details: [
      "Built and maintained the annotation tooling and dataset versioning used across three concurrent studies.",
      "Co-authored an undergraduate research paper on low-light detection robustness.",
    ],
  },
];

/** Education and honours — most recent first. */
export const education: RecordEntry[] = [
  {
    period: "2022 — 2026",
    title: "BS Computer Science",
    organisation: "University Placeholder",
    description:
      "Specialisation in artificial intelligence and machine learning. Thesis on robust object detection under low-light and motion-blur conditions.",
    details: ["Graduated with honours", "Dean's List, six semesters"],
  },
];

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  /** Marks the entry rendered as the primary call to action. */
  primary?: boolean;
};

export const contact = {
  heading: "Correspondence",
  invitation:
    "I'm open to software engineering, machine learning and computer vision roles, as well as research collaborations and well-defined freelance work. The fastest way to reach me is email — I answer everything that isn't a bulk template.",
  links: [
    {
      label: "Email",
      value: "reyianntigley@gmail.com",
      href: "mailto:reyianntigley@gmail.com",
      primary: true,
    },
    {
      label: "GitHub",
      value: "github.com/noneiann",
      href: "https://github.com/noneiann",
    },
    {
      // TODO: replace with your real LinkedIn URL.
      label: "LinkedIn",
      value: "linkedin.com/in/reyianntigley",
      href: "https://www.linkedin.com/in/reyianntigley",
    },
  ] satisfies ContactLink[],
};
