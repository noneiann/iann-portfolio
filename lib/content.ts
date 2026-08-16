export interface SocialLink {
    label: string;
    href: string;
}

export interface NavLink {
    label: string;
    href: string;
    id: string;
}

export interface Project {
    title: string;
    description: string;
    tags: string[];
}

export const socialLinks: SocialLink[] = [
    { label: "Email", href: "mailto:reyianntigley1@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rey-iann-tigley-1b0a4b1b6/" },
    { label: "Github", href: "https://github.com/noneiann" },
];

export const navLinks: NavLink[] = [
    { label: "About", href: "#about", id: "about" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Contact", href: "#contact", id: "contact" },
];

// Placeholder copy — swap for the real thing.
export const aboutParagraphs: string[] = [
    "I'm a software engineer who likes building things that feel deliberate — interfaces where the motion means something and the structure holds up under scrutiny.",
    "Most of my time goes to the web: TypeScript, React, and the layer where design decisions become engineering ones. I care about the details that survive contact with real users.",
];

export const aboutFacts: { label: string; value: string }[] = [
    { label: "Focus", value: "Frontend / Interaction" },
    { label: "Stack", value: "TypeScript · React · Next.js" },
    { label: "Location", value: "Philippines" },
    { label: "Status", value: "Open to work" },
];

// Placeholder projects — replace with real work.
export const projects: Project[] = [
    {
        title: "Project One",
        description:
            "A placeholder for the first thing worth showing. Describe the problem it solved and the part that was actually hard.",
        tags: ["Next.js", "TypeScript", "GSAP"],
    },
    {
        title: "Project Two",
        description:
            "A placeholder for the second. Keep the description short — the work should carry it, not the copy.",
        tags: ["React", "Three.js", "Tailwind"],
    },
    {
        title: "Project Three",
        description:
            "A placeholder for the third. Swap in a real case study once there's something to link to.",
        tags: ["Node", "Postgres"],
    },
];
