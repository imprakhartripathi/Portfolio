import type { IconType } from 'react-icons'

export type ContactMethod = {
  id: string
  label: string
  value: string
  href: string
  description: string
  icon: IconType
}
