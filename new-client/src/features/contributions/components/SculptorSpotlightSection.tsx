import { motion } from 'framer-motion'
import { FaArrowRightLong } from 'react-icons/fa6'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { contributionItems } from '../data'

type SculptorSpotlightSectionProps = {
  onOpenSculptorPage: () => void
  sectionId?: string
}

export function SculptorSpotlightSection({ onOpenSculptorPage, sectionId = 'sculptor-spotlight' }: SculptorSpotlightSectionProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.12, once: true })
  const sculptor = contributionItems.find((item) => item.slug === 'sculptor-ts')

  if (!sculptor) {
    return null
  }

  return (
    <SectionWrapper
      id={sectionId}
      eyebrow="Framework Spotlight"
      title="Sculptor TS"
      description="A productized framework layer for building Express-based backends with architecture discipline and CLI ergonomics."
      className="sculptor-spotlight"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="sculptor-spotlight__stack"
      >
        <motion.article variants={revealItem} className="sculptor-spotlight__card">
          <div className="sculptor-spotlight__copy">
            <p className="sculptor-spotlight__status">Coming Soon</p>
            <h3 className="sculptor-spotlight__title">{sculptor.shortSummary}</h3>
            <p className="sculptor-spotlight__text">
              Read the complete product definition including architecture packages, config model, routing modes, and platform capabilities.
            </p>
          </div>
          <div className="sculptor-spotlight__actions">
            <button type="button" className="link-btn" onClick={onOpenSculptorPage}>
              Open Product Page <FaArrowRightLong />
            </button>
          </div>
        </motion.article>
      </motion.div>
    </SectionWrapper>
  )
}

