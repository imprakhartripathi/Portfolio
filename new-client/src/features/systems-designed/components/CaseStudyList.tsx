import { motion } from 'framer-motion'

import { revealItem } from '../../../shared/motion/variants'
import { systemsDesignedCases } from '../data'

import { CaseStudyCard } from './CaseStudyCard'

type CaseStudyListProps = {
  onOpenProject: (projectId: string) => void
}

export function CaseStudyList({ onOpenProject }: CaseStudyListProps) {
  return (
    <motion.div variants={revealItem} className="case-study-grid">
      {systemsDesignedCases.map((study) => (
        <CaseStudyCard key={study.id} study={study} onOpenProject={onOpenProject} />
      ))}
    </motion.div>
  )
}
