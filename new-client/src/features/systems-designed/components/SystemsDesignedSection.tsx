import { motion } from 'framer-motion'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { systemsDesignedCases } from '../data'

import { CaseStudyCard } from './CaseStudyCard'

type SystemsDesignedSectionProps = {
  onOpenProject: (projectId: string) => void
  onOpenProjectsPage?: () => void
  onBackHome?: () => void
  titleAs?: 'h1' | 'h2'
  mode?: 'list' | 'cta'
}

export function SystemsDesignedSection({
  onOpenProject,
  onOpenProjectsPage,
  onBackHome,
  titleAs = 'h2',
  mode = 'list',
}: SystemsDesignedSectionProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.12, once: true })
  const isCtaMode = mode === 'cta'

  return (
    <SectionWrapper
      id="projects"
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
          <motion.div variants={revealItem} className="case-study-grid">
            {systemsDesignedCases.map((study) => (
              <CaseStudyCard key={study.id} study={study} onOpenProject={onOpenProject} />
            ))}
          </motion.div>
        ) : null}
      </motion.div>
    </SectionWrapper>
  )
}
