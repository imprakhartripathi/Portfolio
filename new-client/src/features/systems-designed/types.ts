export type SystemCaseStudy = {
  id: string
  name: string
  period: string
  icon: string
  bgcolor: string | null
  shortSummary: string
  domain: string
  problem: string
  architectureDecisions: string[]
  techStack: string[]
  skillTags: string[]
  outcome: string
  githubUrl: string
  liveUrl?: string
}
