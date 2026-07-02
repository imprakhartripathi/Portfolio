import type { IconType } from 'react-icons'

export type BrandedRedirectKey = 'github' | 'npm' | 'linkedin'

export type BrandedRedirectConfig = {
  key: BrandedRedirectKey
  platformName: string
  description: string
  destinationUrl: string
  icon: IconType
  countdownDuration: number
  path: `/${BrandedRedirectKey}`
  seo: {
    title: string
    description: string
    keywords: string
  }
}
