import type { SystemOverviewContent } from './types'

export const resumeversion = 20260617; // Increment this value (yyyymmdd) to force browsers to fetch the latest version of the resume PDF instead of using a cached version.

export const systemOverviewContent: SystemOverviewContent = {
  name: "PRAKHAR TRIPATHI",
  title: "Backend-Focused Full-Stack Engineer",
  summary:
    "I design production-grade backend systems and build Sculptor TS, a TypeScript-first Express framework shaped around clear package ownership, CLI ergonomics, and dependable runtime behavior.",
  avatarUrl: "/prakhar.jpeg",
  actions: [
    {
      id: "resume",
      label: "Resume",
      href: `/Prakhar-Tripathi-Resume.pdf?uAt=${resumeversion}`,
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/imprakhartripathi",
      external: true,
    },
    {
      id: "contributions",
      label: "Open-Source Work",
      href: "/contributions",
      external: false,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/imprakhartripathi",
      external: true,
    },
    {
      id: "sponsor",
      label: "Sponsor",
      href: "https://github.com/sponsors/imprakhartripathi",
      external: true,
    },
  ],
};
