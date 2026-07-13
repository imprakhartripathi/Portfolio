import type { ProductionWorkEntry } from './types'

export const productionWorkEntries: ProductionWorkEntry[] = [
  {
    id: 'capgemini-fellowship',
    slug: 'capgemini-fellowship',
    company: 'Capgemini',
    companyLogo: '/experience/capgemini.jpg',
    position: 'Software Engineer Trainee (Fellowship)',
    experienceType: 'Fellowship',
    duration: 'Dec 2025 - May 2026',
    location: 'In-Campus Program',
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'React',
      'PostgreSQL',
      'Redis',
      'RabbitMQ',
      'Docker',
      'AWS EC2',
      'JWT',
      'OAuth2',
    ],
    skills: [
      'Microservices architecture',
      'Enterprise backend development',
      'RESTful API design',
      'RBAC',
      'Clean architecture',
      'API documentation',
      'Backend testing',
      'Team-based delivery',
    ],
    summary:
      "Completed Capgemini's Software Engineer Fellowship focused on enterprise backend development using Java, Spring Boot, and distributed microservices architecture.",
    responsibilities: [
      'Built backend services around Spring Boot, REST APIs, authentication, and role-aware access boundaries.',
      'Designed service responsibilities for a distributed finance platform with cache, messaging, and persistence layers.',
      'Documented APIs, debugged backend flows, and validated behavior across authentication, budgeting, analytics, and notification paths.',
      'Practiced team-based software delivery with enterprise architecture expectations and clean implementation boundaries.',
    ],
    learnings: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'Enterprise application architecture',
      'Microservices architecture',
      'RESTful API development',
      'JWT Authentication',
      'OAuth2',
      'Role-Based Access Control (RBAC)',
      'Redis session caching',
      'RabbitMQ messaging',
      'Docker containerization',
      'AWS EC2 deployment',
      'Enterprise software development practices',
      'Clean architecture',
      'API documentation',
      'Backend testing and debugging',
      'Team-based software development',
    ],
    achievements: [
      'Completed a fellowship curriculum centered on enterprise backend engineering and distributed architecture.',
      'Built SpendSmart as an 11-service microservices platform with production-minded infrastructure components.',
      'Connected authentication, budgeting, analytics, reporting, email notifications, and scheduled reminders into one platform experience.',
    ],
    projects: [
      {
        name: 'SpendSmart',
        projectId: 'spendsmart',
        summary:
          'Enterprise-grade personal finance platform featuring an 11-microservice based architecture, Spring Boot backend, React frontend, and cloud deployment.',
        highlights: [
          '11-microservice based architecture',
          'Authentication, budget management, analytics, and reporting',
          'Email notifications and scheduled reminders',
          'Dockerized deployment to AWS EC2',
        ],
        technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'AWS EC2'],
      },
    ],
    certificate: {
      label: 'View Fellowship Certificate',
      href: '/experience/Capgemini-Fellowship-Certificate-PrakharTripathi.pdf',
    },
  },
  {
    id: 'ferth-sde-intern',
    slug: 'ferth-sde-intern',
    company: 'Ferth',
    companyLogo: '/brands/ferth.webp',
    position: 'SDE Intern',
    experienceType: 'Internship',
    duration: 'Feb 2025 - Aug 2025',
    location: 'Remote (India)',
    technologies: ['Angular', 'Next.js', 'Production Tuning'],
    skills: ['Performance optimization', 'Runtime stability', 'Production support', 'Frontend delivery'],
    summary: 'Delivered performance upgrades and stability improvements across production-facing Angular and Next.js applications.',
    responsibilities: [
      'Delivered performance upgrades in Angular and Next.js production apps',
      'Improved runtime stability and frontend throughput',
      'Maintained Asha Child Care production systems',
    ],
    learnings: [
      'Production debugging',
      'Frontend performance profiling',
      'Healthcare workflow maintenance',
      'Cross-framework delivery with Angular and Next.js',
    ],
    achievements: [
      'Improved runtime behavior for active production applications.',
      'Contributed to stability work on healthcare systems used in real operational contexts.',
    ],
    projects: [
      {
        name: 'Asha Child Care production systems',
        summary: 'Healthcare-facing production systems maintained and improved during the internship.',
        highlights: ['Frontend performance work', 'Operational stability improvements', 'Production maintenance'],
        technologies: ['Angular', 'Next.js'],
      },
    ],
  },
  {
    id: 'ferth-fullstack-intern',
    slug: 'ferth-fullstack-intern',
    company: 'Ferth',
    companyLogo: '/brands/ferth.webp',
    position: 'Full Stack Developer Intern',
    experienceType: 'Internship',
    duration: 'Jun 2024 - Oct 2024',
    location: 'Remote (India)',
    technologies: ['Angular', 'ASP.NET Core', 'MySQL'],
    skills: ['Full-stack development', 'Healthcare workflows', 'API integration', 'Relational data modeling'],
    summary: 'Built patient management workflows using Angular, ASP.NET Core, and MySQL for clinic operations.',
    responsibilities: [
      'Built patient management system',
      'Angular + ASP.NET Core + MySQL',
      'Delivered appointment workflows for clinic operations',
    ],
    learnings: [
      'Full-stack feature delivery',
      'ASP.NET Core API development',
      'MySQL-backed workflow modeling',
      'Appointment and patient management flows',
    ],
    achievements: [
      'Delivered structured appointment workflows for clinic operations.',
      'Integrated frontend screens with backend APIs and relational persistence.',
    ],
    projects: [
      {
        name: 'Patient management system',
        summary: 'Clinic workflow system covering patient records and appointment operations.',
        highlights: ['Patient management', 'Appointment workflows', 'Angular and ASP.NET Core integration'],
        technologies: ['Angular', 'ASP.NET Core', 'MySQL'],
      },
    ],
  },
]

export const latestExperience = productionWorkEntries[0]

export function getExperienceBySlug(slug: string) {
  return productionWorkEntries.find((entry) => entry.slug === slug) ?? null
}
