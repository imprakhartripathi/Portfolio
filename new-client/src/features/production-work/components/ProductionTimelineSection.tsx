import { motion } from 'framer-motion'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { productionWorkEntries } from '../data'

import { TimelineItem } from './TimelineItem'

export function ProductionTimelineSection() {
  const { ref, inView } = useInViewReveal({ threshold: 0.15, once: true })

  return (
    <SectionWrapper
      id="experience"
      eyebrow="Experience"
      title="Experience"
      description="Ferth internships with production-facing delivery outcomes."
      className="production-work"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="production-work__stack"
      >
        <motion.ol variants={revealItem} className="timeline-list">
          {productionWorkEntries.map((entry, index) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === productionWorkEntries.length - 1}
            />
          ))}
        </motion.ol>
      </motion.div>
    </SectionWrapper>
  )
}
