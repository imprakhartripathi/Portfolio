import { motion } from 'framer-motion'
import { FaArrowLeftLong, FaAward, FaDiagramProject } from 'react-icons/fa6'

import { buildProjectPath } from '../../../app/navigation'
import { SectionWrapper } from '../../../layout/SectionWrapper'
import { getTechIcon } from '../../../shared/lib/tech-icons'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import type { ProductionWorkEntry } from '../types'

type ExperienceDetailsPageProps = {
  experience: ProductionWorkEntry
  onBack: () => void
  onOpenProject: (projectId: string) => void
}

export function ExperienceDetailsPage({ experience, onBack, onOpenProject }: ExperienceDetailsPageProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.1, once: true })

  return (
    <SectionWrapper
      id="experience-detail"
      eyebrow="Experience Case Study"
      title={experience.company}
      description={experience.position}
      className="experience-detail"
      bodyClassName="experience-detail__body"
      titleAs="h1"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="experience-detail__stack"
      >
        <motion.div variants={revealItem} className="project-detail__top">
          <button type="button" className="link-btn link-btn--ghost" onClick={onBack}>
            <FaArrowLeftLong /> Back to Experiences
          </button>
          {experience.certificate ? (
            <a href={experience.certificate.href} target="_blank" rel="noreferrer" className="link-btn">
              <FaAward /> {experience.certificate.label}
            </a>
          ) : null}
        </motion.div>

        <motion.section variants={revealItem} className="experience-detail__hero">
          <div className="experience-detail__logo-frame">
            <img src={experience.companyLogo} alt={`${experience.company} logo`} />
          </div>
          <div className="experience-detail__hero-copy">
            <div className="experience-detail__meta-row">
              <span>{experience.experienceType}</span>
              <span>{experience.duration}</span>
              <span>{experience.location}</span>
            </div>
            <h2>{experience.position}</h2>
            <p>{experience.summary}</p>
          </div>
        </motion.section>

        <motion.div variants={revealItem} className="experience-detail__grid experience-detail__grid--dense">
          <article className="experience-detail__panel">
            <h3>Technologies</h3>
            <div className="project-detail__tech-grid">
              {experience.technologies.map((technology) => {
                const Icon = getTechIcon(technology)
                return (
                  <span key={technology} className="case-study-card__tech-item">
                    <Icon className="case-study-card__tech-icon" />
                    <span className="case-study-card__tech-label">{technology}</span>
                  </span>
                )
              })}
            </div>
          </article>

          <article className="experience-detail__panel">
            <h3>Skills</h3>
            <div className="case-study-card__skill-pills">
              {experience.skills.map((skill) => (
                <span key={skill} className="case-study-card__skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </motion.div>

        <motion.div variants={revealItem} className="experience-detail__grid">
          <ExperienceList title="Responsibilities" items={experience.responsibilities} />
          <ExperienceList title="What I Learned" items={experience.learnings} />
        </motion.div>

        <motion.div variants={revealItem} className="experience-detail__grid">
          <ExperienceList title="Major Achievements" items={experience.achievements} />
          <article className="experience-detail__panel">
            <h3>Related Projects</h3>
            <div className="experience-detail__projects">
              {experience.projects.map((project) => (
                <section
                  key={project.name}
                  className={`experience-detail__project ${project.projectId ? 'experience-detail__project--clickable' : ''}`}
                  role={project.projectId ? 'button' : undefined}
                  tabIndex={project.projectId ? 0 : undefined}
                  onClick={() => {
                    if (project.projectId) {
                      onOpenProject(project.projectId)
                    }
                  }}
                  onKeyDown={(event) => {
                    if (!project.projectId || (event.key !== 'Enter' && event.key !== ' ')) {
                      return
                    }

                    event.preventDefault()
                    onOpenProject(project.projectId)
                  }}
                >
                  <div>
                    <h4>
                      <FaDiagramProject /> {project.name}
                    </h4>
                    <p>{project.summary}</p>
                  </div>
                  <ul>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="experience-chip-row">
                    {project.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                  {project.projectId ? (
                    <a
                      href={buildProjectPath(project.projectId)}
                      className="link-btn link-btn--ghost"
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        onOpenProject(project.projectId!)
                      }}
                    >
                      Open Project
                    </a>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}

type ExperienceListProps = {
  title: string
  items: string[]
}

function ExperienceList({ title, items }: ExperienceListProps) {
  return (
    <article className="experience-detail__panel">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}
