import { motion } from 'framer-motion'
import { FaArrowRightLong } from 'react-icons/fa6'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { contributionItems, sculptorNpmOrgUrl } from '../data'

type SculptorSpotlightSectionProps = {
  onOpenSculptorPage: () => void
  onOpenSculptorGuide: () => void
  sectionId?: string
}

export function SculptorSpotlightSection({ onOpenSculptorPage, onOpenSculptorGuide, sectionId = 'sculptor-spotlight' }: SculptorSpotlightSectionProps) {
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
        <motion.article variants={revealItem} className="projects-cta-card sculptor-spotlight-card">
          <div className="projects-cta-card__visual sculptor-spotlight-card__visual">
            <div className="projects-cta-card__visual-frame sculptor-spotlight-card__visual-frame">
              <img
                src="sculptor-nobg.png"
                alt="Sculptor TS Logo"
                className="projects-cta-card__visual-image sculptor-spotlight-card__visual-image"
              />
            </div>
          </div>

          <div className="sculptor-spotlight-card__copy">
            <div className="projects-cta-card__eyebrow-row">
              {/* <span className="projects-cta-card__eyebrow">Framework Spotlight</span> */}
              <span className="projects-cta-card__status">{sculptor.version}</span>
            </div>

            <h3 className="projects-cta-card__title">Package-aware Express framework</h3>
            <p className="projects-cta-card__text">
              Sculptor TS keeps framework structure explicit: package ownership, request context, config loading, and CLI-driven generation all stay visible in one place.
            </p>

            <div className="sculptor-spotlight-card__action-grid">
              <button type="button" className="sculptor-spotlight-card__action-card" onClick={onOpenSculptorGuide}>
                <span className="sculptor-spotlight-card__action-kicker">Guide</span>
                <span className="sculptor-spotlight-card__action-title">Read the docs map</span>
                <span className="sculptor-spotlight-card__action-copy">
                  Runtime flow, package docs, config model, and the live markdown reader.
                </span>
                <span className="sculptor-spotlight-card__action-footer">Open guide <FaArrowRightLong aria-hidden="true" /></span>
              </button>

              <a
                href={sculptorNpmOrgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sculptor-spotlight-card__action-card sculptor-spotlight-card__action-card--link"
              >
                <span className="sculptor-spotlight-card__action-kicker">npm org</span>
                <span className="sculptor-spotlight-card__action-title">See published packages</span>
                <span className="sculptor-spotlight-card__action-copy">
                  Quick access to the Sculptor package family and package releases.
                </span>
                <span className="sculptor-spotlight-card__action-footer">Open npm <FaArrowRightLong aria-hidden="true" /></span>
              </a>
            </div>

            <button type="button" className="hero-action sculptor-spotlight-card__product-link" onClick={onOpenSculptorPage}>
              Open product page
            </button>
          </div>
        </motion.article>
      </motion.div>
    </SectionWrapper>
  )
}
