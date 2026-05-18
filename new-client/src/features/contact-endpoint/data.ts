import { FaEnvelope, FaGithub, FaLinkedin, FaNpm } from 'react-icons/fa6'

import type { ContactMethod } from './types'

export const contactMethods: ContactMethod[] = [
  {
    id: "email",
    label: "Email",
    value: "dev@imprakhartripathi.in",
    href: "mailto:dev@imprakhartripathi.in",
    description: "Best for project scopes, opportunities, and direct introductions.",
    icon: FaEnvelope,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/imprakhartripathi",
    href: "https://www.linkedin.com/in/imprakhartripathi",
    description: "Good for professional context, referrals, and longer conversations.",
    icon: FaLinkedin,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/imprakhartripathi",
    href: "https://github.com/imprakhartripathi",
    description: "Best for repos, code review, and open-source collaboration.",
    icon: FaGithub,
  },
  {
    id: "npm",
    label: "npm",
    value: "npmjs.com/~imprakhartripathi",
    href: "https://www.npmjs.com/~imprakhartripathi",
    description: "Use this for package work, publishing, and framework tooling.",
    icon: FaNpm,
  },
]
