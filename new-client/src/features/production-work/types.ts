export type ExperienceProject = {
  name: string
  summary: string
  highlights: string[]
  technologies: string[]
  projectId?: string
}

export type ExperienceCertificate = {
  label: string
  href: string
}

export type ProductionWorkEntry = {
  id: string
  slug: string
  company: string
  companyLogo: string
  position: string
  roleFocus?: string
  experienceType: string
  duration: string
  location: string
  stack?: string
  technologies: string[]
  skills: string[]
  summary: string
  responsibilities: string[]
  learnings: string[]
  achievements: string[]
  projects: ExperienceProject[]
  certificate?: ExperienceCertificate
}
