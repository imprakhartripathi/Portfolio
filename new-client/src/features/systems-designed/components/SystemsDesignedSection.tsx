import { motion } from 'framer-motion'
import { Suspense, lazy } from 'react'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { systemsDesignedCases } from '../data'

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
  const featuredProject = systemsDesignedCases.find((project) => project.id === 'pharmetrix') ?? systemsDesignedCases[0]

  return (
    <SectionWrapper
      id={sectionId}
      eyebrow="Projects"
      title="Projects"
      description="Backend-focused systems delivered with production constraints and clear domain outcomes."
      className="systems-designed"
      titleAs={titleAs}
      headerAction={
        onOpenProjectsPage ? (
          <button type="button" className="link-btn" onClick={onOpenProjectsPage}>
            See All Projects
          </button>
        ) : null
      }
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
              <div className="projects-cta-card__eyebrow-row">
                <span className="projects-cta-card__eyebrow">Featured Project</span>
                <span className="projects-cta-card__status">{featuredProject.period}</span>
              </div>
              <h3 className="projects-cta-card__title">{featuredProject.name}</h3>
              <p className="projects-cta-card__text">
                {featuredProject.shortSummary}
              </p>
              <div className="projects-cta-card__meta-grid">
                <div className="projects-cta-card__meta-item">
                  <span>Domain</span>
                  <strong>{featuredProject.domain}</strong>
                </div>
                <div className="projects-cta-card__meta-item">
                  <span>Problem</span>
                  <strong>{featuredProject.problem}</strong>
                </div>
                <div className="projects-cta-card__meta-item projects-cta-card__meta-item--wide">
                  <span>Outcome</span>
                  <strong>{featuredProject.outcome}</strong>
                </div>
                <div className="projects-cta-card__meta-item projects-cta-card__meta-item--wide">
                  <span>Architecture</span>
                  <strong>{featuredProject.architectureDecisions.slice(0, 3).join(' • ')}</strong>
                </div>
              </div>
              <div className="projects-cta-card__chip-row">
                {featuredProject.techStack.slice(0, 4).map((tech) => (
                  <span key={tech} className="projects-cta-card__chip">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="projects-cta-card__chip-row projects-cta-card__chip-row--muted">
                {featuredProject.skillTags.slice(0, 4).map((skill) => (
                  <span key={skill} className="projects-cta-card__chip projects-cta-card__chip--muted">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="projects-cta-card__visual">
              <div className="projects-cta-card__visual-frame">
                <img
                  src={featuredProject.icon}
                  alt={`${featuredProject.name} logo`}
                  className="projects-cta-card__visual-image"
                />
              </div>
              <button type="button" className="link-btn projects-cta-card__visual-action" onClick={() => onOpenProject(featuredProject.id)}>
                Open Pharmetrix
              </button>
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
