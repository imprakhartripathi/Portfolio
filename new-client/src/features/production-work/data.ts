import type { ProductionWorkEntry } from './types'

export const productionWorkEntries: ProductionWorkEntry[] = [
  {
    id: 'ferth-sde-intern',
    company: 'Ferth',
    role: 'SDE Intern',
    period: 'Feb 2025 - Aug 2025',
    logo: '/brands/ferth.webp',
    focusTag: 'Performance & Stability',
    highlights: [
      'Delivered performance upgrades in Angular and Next.js production apps',
      'Improved runtime stability and frontend throughput',
      'Maintained Asha Child Care production systems',
    ],
    stack: ['Angular', 'Next.js', 'Production Tuning'],
  },
  {
    id: 'ferth-fullstack-intern',
    company: 'Ferth',
    role: 'Full Stack Developer Intern',
    period: 'Jun 2024 - Oct 2024',
    logo: '/brands/ferth.webp',
    focusTag: 'Healthcare Workflow Delivery',
    highlights: [
      'Built patient management system',
      'Angular + ASP.NET Core + MySQL',
      'Delivered appointment workflows for clinic operations',
    ],
    stack: ['Angular', 'ASP.NET Core', 'MySQL'],
  },
]
