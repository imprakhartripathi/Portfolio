export type ContributionItem = {
  id: string
  slug: string
  title: string
  packageName: string
  version?: string
  status: 'Published' | 'Coming Soon' | 'Beta' | 'Stable' | 'Depricated'
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
  url: string
  summary: string
}

export type SculptorPackageSection = {
  name: string
  summary: string
  responsibilities: string[]
  guideAnchor: string
  readmePath: string
  npmPackage: string
  npmUrl: string
}

export type NpmDownloadStat = {
  downloads: number;
  start: string;
  end: string;
  package: string;
};

export type SculptorGuideDoc = SculptorDocMapEntry

export type SculptorProductSpec = {
  brand: string
  namespace: string
  cli: string
  version: string
  positioning: string
  overview: string
  packageSections: SculptorPackageSection[]
  routingModes: Array<{
    name: string
    summary: string
    filename: string
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
  releaseNotes: string[]
}
