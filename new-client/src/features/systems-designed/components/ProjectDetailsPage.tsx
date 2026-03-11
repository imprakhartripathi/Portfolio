import { motion } from 'framer-motion'
import { FaArrowLeftLong, FaGithub } from 'react-icons/fa6'
import { MdLaunch } from 'react-icons/md'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { getTechIcon } from '../../../shared/lib/tech-icons'
import type { SystemCaseStudy } from '../types'

type ProjectDetailsPageProps = {
  study: SystemCaseStudy
  onBack: () => void
}

export function ProjectDetailsPage({ study, onBack }: ProjectDetailsPageProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.1, once: true })

  return (
    <SectionWrapper
      id="project-detail"
      eyebrow="Project Detail"
      title={study.name}
      description={study.period}
      className="project-detail"
      bodyClassName="project-detail__body"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="project-detail__stack"
      >
        <motion.div variants={revealItem} className="project-detail__top">
          <button type="button" className="link-btn link-btn--ghost" onClick={onBack}>
            <FaArrowLeftLong /> Back to Projects
          </button>
          <div className="project-detail__external-links">
            
            {study.githubUrl ? (
              <a href={study.githubUrl} target="_blank" rel="noreferrer" className="link-btn link-btn--ghost">
                <FaGithub /> GitHub
              </a>
            ) : null}
            {study.liveUrl ? (
              <a href={study.liveUrl} target="_blank" rel="noreferrer" className="link-btn link-btn--ghost">
                <MdLaunch /> Live
              </a>
            ) : null}
          </div>
        </motion.div>

        <motion.section variants={revealItem} className="project-detail__hero-banner">
          <img
            src={study.icon}
            alt={`${study.name} logo`}
            className={`project-detail__hero-image ${study.bgcolor ? 'project-detail__hero-image--with-bg' : ''}`}
            style={study.bgcolor ? { backgroundColor: study.bgcolor } : undefined}
          />
          <div className="project-detail__hero-copy">
            <h2 className="project-detail__name">{study.name}</h2>
            <p className="project-detail__period">{study.period}</p>
            <p className="project-detail__summary">{study.shortSummary}</p>
          </div>
        </motion.section>

        <motion.div variants={revealItem} className="project-detail__grid">
          <article className="project-detail__card">
            <h3>Domain</h3>
            <p>{study.domain}</p>
          </article>
          <article className="project-detail__card">
            <h3>Problem</h3>
            <p>{study.problem}</p>
          </article>
        </motion.div>

        <motion.article variants={revealItem} className="project-detail__card">
          <h3>Architecture Decisions</h3>
          <ul>
            {study.architectureDecisions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.article>

        <motion.article variants={revealItem} className="project-detail__card">
          <h3>Tech Stack</h3>
          <div className="project-detail__tech-grid">
            {study.techStack.map((tech) => {
              const Icon = getTechIcon(tech)
              return (
                <span key={tech} className="case-study-card__tech-item">
                  <Icon className="case-study-card__tech-icon" />
                  <span className="case-study-card__tech-label">{tech}</span>
                </span>
              )
            })}
          </div>
        </motion.article>

        <motion.article variants={revealItem} className="project-detail__card">
          <h3>Outcome / Status</h3>
          <p>{study.outcome}</p>
        </motion.article>
      </motion.div>
    </SectionWrapper>
  )
}
