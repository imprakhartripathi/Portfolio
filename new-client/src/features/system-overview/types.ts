export type HeroAction = {
  id: string
  label: string
  href: string
  external?: boolean
}

export type SystemOverviewContent = {
  name: string
  title: string
  summary: string
  avatarUrl: string
  actions: HeroAction[]
}
