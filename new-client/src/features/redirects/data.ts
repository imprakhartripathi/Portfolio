import { FaGithub, FaLinkedin, FaNpm } from 'react-icons/fa6'

import type { BrandedRedirectConfig, BrandedRedirectKey } from './types'

export const brandedRedirects: Record<BrandedRedirectKey, BrandedRedirectConfig> = {
  github: {
    key: 'github',
    platformName: 'GitHub',
    description:
      'Open my GitHub profile for source code, open-source repositories, SculptorTS framework work, backend experiments, and implementation-focused project history.',
    destinationUrl: 'https://github.com/imprakhartripathi',
    icon: FaGithub,
    countdownDuration: 3,
    path: '/github',
    seo: {
      title: 'GitHub | Prakhar Tripathi',
      description:
        'Visit Prakhar Tripathi on GitHub for open-source repositories, SculptorTS work, backend tooling, and project source code. This page redirects to the GitHub profile.',
      keywords: 'Prakhar Tripathi GitHub, imprakhartripathi, open source, SculptorTS, backend repositories',
    },
  },
  npm: {
    key: 'npm',
    platformName: 'npm',
    description:
      'Open my npm profile for published packages, TypeScript backend tooling, SculptorTS-related work, CLI utilities, and package experiments.',
    destinationUrl: 'https://www.npmjs.com/~imprakhartripathi',
    icon: FaNpm,
    countdownDuration: 3,
    path: '/npm',
    seo: {
      title: 'npm | Prakhar Tripathi',
      description:
        'Visit Prakhar Tripathi on npm for published packages, TypeScript tooling, SculptorTS packages, and CLI utilities. This page redirects to the npm profile.',
      keywords: 'Prakhar Tripathi npm, imprakhartripathi npm, TypeScript packages, SculptorTS, CLI tooling',
    },
  },
  linkedin: {
    key: 'linkedin',
    platformName: 'LinkedIn',
    description:
      'Open my LinkedIn profile for professional background, engineering experience, project context, work history, and direct professional connections.',
    destinationUrl: 'https://www.linkedin.com/in/imprakhartripathi',
    icon: FaLinkedin,
    countdownDuration: 3,
    path: '/linkedin',
    seo: {
      title: 'LinkedIn | Prakhar Tripathi',
      description:
        'Visit Prakhar Tripathi on LinkedIn for professional background, engineering experience, project context, and work history. This page redirects to the LinkedIn profile.',
      keywords: 'Prakhar Tripathi LinkedIn, imprakhartripathi, software engineer profile, backend engineer',
    },
  },
}

export function getBrandedRedirectConfig(key: BrandedRedirectKey) {
  return brandedRedirects[key]
}
