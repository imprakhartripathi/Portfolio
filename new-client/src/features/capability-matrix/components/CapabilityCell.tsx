import { motion } from 'framer-motion'

import type { CapabilityMatrixItem } from '../types'

type CapabilityCellProps = {
  item: CapabilityMatrixItem
}

export function CapabilityCell({ item }: CapabilityCellProps) {
  const Icon = item.icon

  return (
    <motion.article className="capability-cell" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <div className="capability-cell__head">
        <span className="capability-cell__icon" aria-hidden="true">
          <Icon />
        </span>
        <h3 className="capability-cell__title">{item.label}</h3>
      </div>
    </motion.article>
  )
}
