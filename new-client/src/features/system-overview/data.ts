import type { SystemOverviewContent } from './types'

export const systemOverviewContent: SystemOverviewContent = {
  name: 'PRAKHAR TRIPATHI',
  title: 'Backend-Focused Full-Stack Engineer',
  summary:
    'I design production-grade backend systems with clear access boundaries, transactional safety, and real-world deployment constraints. I build systems that survive beyond localhost.',
  avatarUrl: 'https://avatars.githubusercontent.com/u/120323432?v=4',
  actions: [
    {
      id: 'resume',
      label: 'Resume',
      href: '/Prakhar-Tripathi-Resume.pdf',
      external: true,
    },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/imprakhartripathi',
      external: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/imprakhartripathi',
      external: true,
    },
    {
      id: 'sponsor',
      label: 'Sponsor',
      href: 'https://github.com/sponsors/imprakhartripathi',
      external: true,
    },
  ],
}
