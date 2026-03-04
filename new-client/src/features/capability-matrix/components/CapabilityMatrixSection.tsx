import { motion } from 'framer-motion'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { capabilityMatrixRows } from '../data'

import { CapabilityCell } from './CapabilityCell'

export function CapabilityMatrixSection() {
  const { ref, inView } = useInViewReveal({ threshold: 0.18, once: true })

  return (
    <SectionWrapper
      id="technical-expertise"
      eyebrow="Skills"
      title="Technical Expertise"
      description=""
      className="capability-matrix"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="capability-matrix__stack"
      >
        <motion.div variants={revealItem} className="capability-grid capability-grid--flat">
          {capabilityMatrixRows.map((item) => (
            <CapabilityCell key={item.id} item={item} />
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
