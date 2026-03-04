import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { FaArrowRightLong, FaGithub } from 'react-icons/fa6'
import { MdLaunch } from 'react-icons/md'

import { buildProjectPath } from '../../../app/navigation'
import { getTechIcon } from '../../../shared/lib/tech-icons'
import type { SystemCaseStudy } from '../types'

type CaseStudyCardProps = {
  study: SystemCaseStudy
  onOpenProject: (projectId: string) => void
}

export function CaseStudyCard({ study, onOpenProject }: CaseStudyCardProps) {
  const projectPath = buildProjectPath(study.id)

  function onProjectLinkClick(event: MouseEvent<HTMLElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    onOpenProject(study.id)
  }

  return (
    <motion.article
      className="case-study-card case-study-card--clickable"
      whileHover={{ y: -3, scale: 1.003 }}
      transition={{ duration: 0.2 }}
      role="button"
      tabIndex={0}
      onClick={() => onOpenProject(study.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpenProject(study.id)
        }
      }}
    >
      <header className="case-study-card__header">
        <div className="case-study-card__meta">
          <h3 className="case-study-card__headline">{study.name}</h3>
          <p className="case-study-card__period">{study.period}</p>
        </div>
      </header>

      <div className="case-study-card__layout">
        <section className="case-study-card__left">
          <p className="case-study-card__subhead">Domain</p>
          <p className="case-study-card__text">{study.domain}</p>

          <p className="case-study-card__subhead">Problem</p>
          <p className="case-study-card__text">{study.problem}</p>

          <p className="case-study-card__subhead">Status</p>
          <p className="case-study-card__text">{study.outcome}</p>

          <p className="case-study-card__short">{study.shortSummary}</p>

          <div className="case-study-card__links">
            <a
              href={projectPath}
              className="link-btn"
              onClick={(event) => onProjectLinkClick(event)}
            >
              Full Details <FaArrowRightLong />
            </a>
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="link-btn link-btn--ghost"
              onClick={(event) => event.stopPropagation()}
            >
              <FaGithub /> GitHub
            </a>
            {study.liveUrl ? (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="link-btn link-btn--ghost"
                onClick={(event) => event.stopPropagation()}
              >
                <MdLaunch /> Live
              </a>
            ) : null}
          </div>
        </section>

        <aside className="case-study-card__right">
          <p className="case-study-card__subhead">Tech Stack</p>
          <div className="case-study-card__tech-grid">
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

          <p className="case-study-card__subhead">Skills / Patterns</p>
          <div className="case-study-card__skill-pills">
            {study.skillTags.map((item) => (
              <span key={item} className="case-study-card__skill-pill">
                {item}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </motion.article>
  )
}
