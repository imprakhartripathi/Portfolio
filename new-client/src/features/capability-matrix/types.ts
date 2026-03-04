import type { IconType } from 'react-icons'

export type CapabilityMatrixItem = {
  id: string
  label: string
  icon: IconType
}

export type CapabilityCategory = {
  id: string
  title: string
  icon: IconType
  skillRows: CapabilityMatrixItem[][]
}
