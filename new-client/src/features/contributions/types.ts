export type ContributionItem = {
  id: string
  slug: string
  title: string
  packageName: string
  status: 'Published' | 'Coming Soon' | 'Beta'
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
  summary: string
  responsibilities: string[]
}

export type SculptorDocMapEntry = {
  title: string
  path: string
  summary: string
}

export type SculptorGuideDoc = SculptorDocMapEntry

export type SculptorProductSpec = {
  brand: string
  namespace: string
  cli: string
  betaNote: string
  positioning: string
  overview: string
  packageDocs: SculptorDocMapEntry[]
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
  runtimeFlow: string[]
  commandSheet: Array<{
    command: string
    summary: string
  }>
  platformCapabilities: string[]
  successCriteria: string[]
  betaCautions: string[]
}
