import { motion } from 'framer-motion'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { systemsDesignedCases } from '../data'

import { CaseStudyCard } from './CaseStudyCard'

type SystemsDesignedSectionProps = {
  onOpenProject: (projectId: string) => void
}

export function SystemsDesignedSection({ onOpenProject }: SystemsDesignedSectionProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.12, once: true })

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Projects"
      title="Projects"
      description="Backend-focused systems delivered with production constraints and clear domain outcomes."
      className="systems-designed"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="systems-designed__stack"
      >
        <motion.div variants={revealItem} className="case-study-grid">
          {systemsDesignedCases.map((study) => (
            <CaseStudyCard key={study.id} study={study} onOpenProject={onOpenProject} />
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
