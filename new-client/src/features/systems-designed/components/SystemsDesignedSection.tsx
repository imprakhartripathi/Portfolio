import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'

const LazyCaseStudyList = lazy(() =>
  import('./CaseStudyList').then((module) => ({
    default: module.CaseStudyList,
  })),
)

type SystemsDesignedSectionProps = {
  onOpenProject: (projectId: string) => void
  onOpenProjectsPage?: () => void
  onOpenCertificationsPage?: () => void
  onBackHome?: () => void
  titleAs?: 'h1' | 'h2'
  mode?: 'list' | 'cta'
  sectionId?: string
}

export function SystemsDesignedSection({
  onOpenProject,
  onOpenProjectsPage,
  // onOpenCertificationsPage,
  onBackHome,
  titleAs = 'h2',
  mode = 'list',
  sectionId = 'projects',
}: SystemsDesignedSectionProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.12, once: true })
  const isCtaMode = mode === 'cta'

  return (
    <SectionWrapper
      id={sectionId}
      eyebrow="Projects"
      title="Projects"
      description="Backend-focused systems delivered with production constraints and clear domain outcomes."
      className="systems-designed"
      titleAs={titleAs}
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="systems-designed__stack"
      >
        {isCtaMode ? (
          <motion.article variants={revealItem} className="projects-cta-card">
            <div className="projects-cta-card__copy">
              <h3 className="projects-cta-card__title">Project architecture, not just screenshots.</h3>
              <p className="projects-cta-card__text">
                Open the dedicated projects page to review domain context, architecture decisions, stack choices, and production outcomes.
              </p>
            </div>

            <div className="projects-cta-card__actions">
              {onOpenProjectsPage ? (
                <button type="button" className="link-btn" onClick={onOpenProjectsPage}>
                  Open Projects Page
                </button>
              ) : null}
              {/* {onOpenCertificationsPage ? (
                <button type="button" className="link-btn link-btn--ghost" onClick={onOpenCertificationsPage}>
                  Open Certifications
                </button>
              ) : null} */}
            </div>
          </motion.article>
        ) : null}

        {!isCtaMode && (onOpenProjectsPage || onBackHome) ? (
          <motion.div variants={revealItem} className="systems-designed__actions">
            {onOpenProjectsPage ? (
              <button type="button" className="link-btn" onClick={onOpenProjectsPage}>
                Open Projects Page
              </button>
            ) : null}

            {onBackHome ? (
              <button type="button" className="link-btn link-btn--ghost" onClick={onBackHome}>
                Back to Home
              </button>
            ) : null}
          </motion.div>
        ) : null}

        {!isCtaMode ? (
          <Suspense fallback={null}>
            <LazyCaseStudyList onOpenProject={onOpenProject} />
          </Suspense>
        ) : null}
      </motion.div>
    </SectionWrapper>
  )
}
