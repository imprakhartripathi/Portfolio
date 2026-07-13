import { motion } from 'framer-motion'
import { FaArrowLeftLong } from 'react-icons/fa6'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { productionWorkEntries } from '../data'

import { TimelineItem } from './TimelineItem'

type ExperiencesPageProps = {
  onOpenExperience: (experienceSlug: string) => void
  onBackHome: () => void
}

export function ExperiencesPage({ onOpenExperience, onBackHome }: ExperiencesPageProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.1, once: true })

  return (
    <SectionWrapper
      id="experience"
      eyebrow="Experience"
      title="Experience Roadmap"
      description="A connected progression from full-stack delivery to enterprise microservices engineering."
      className="experience-roadmap"
      bodyClassName="experience-roadmap__body"
      titleAs="h1"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="experience-roadmap__stack"
      >
        <motion.div variants={revealItem} className="experience-roadmap__top">
          <button type="button" className="link-btn link-btn--ghost" onClick={onBackHome}>
            <FaArrowLeftLong /> Back to Home
          </button>
        </motion.div>

        <motion.div variants={revealItem} className="experience-roadmap__canvas">
          <div className="experience-roadmap__track" aria-hidden="true">
            <span />
          </div>
          <ol className="experience-roadmap__list">
            {productionWorkEntries.map((entry, index) => (
              <TimelineItem
                key={entry.id}
                entry={entry}
                index={index}
                total={productionWorkEntries.length}
                onOpenExperience={onOpenExperience}
              />
            ))}
          </ol>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
