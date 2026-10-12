import type { SystemOverviewContent } from './types'

export const resumeversion = 20260714; // Increment this value (yyyymmdd) to force browsers to fetch the latest version of the resume PDF instead of using a cached version.
export const resumeUrl = `/Prakhar-Tripathi-Resume.pdf?uAt=${resumeversion}`

export const systemOverviewContent: SystemOverviewContent = {
  name: "PRAKHAR TRIPATHI",
  title: "Forward Deployed Software Engineer",
  summary:
    "Forward Deployed Software Engineer building production AI systems and resilient backends. Deep in TypeScript and Python with an enterprise Java foundation, shipping systems meant to survive beyond localhost—alongside open-source tools like SculptorTS.",
  avatarUrl: "/prakhar.jpeg",
  actions: [
    {
      id: "resume",
      label: "Resume",
      href: resumeUrl,
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
