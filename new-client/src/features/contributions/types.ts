export type ContributionItem = {
  id: string
  slug: string
  title: string
  packageName: string
  status: 'Published' | 'Coming Soon'
  shortSummary: string
  description: string
  features: string[]
  techStack: string[]
  quickStart: string[]
  npmUrl?: string
  keywords: string[]
}

export type SculptorPackageModule = {
  name: string
  responsibilities: string[]
}

export type SculptorProductSpec = {
  brand: string
  namespace: string
  cli: string
  philosophy: string
  vision: string[]
  packageModules: SculptorPackageModule[]
  routingModes: Array<{
    name: string
    summary: string
    example: string[]
  }>
  configuration: Array<{
    file: string
    purpose: string
    highlights: string[]
    snippet: string[]
  }>
  platformCapabilities: string[]
  successCriteria: string[]
}
