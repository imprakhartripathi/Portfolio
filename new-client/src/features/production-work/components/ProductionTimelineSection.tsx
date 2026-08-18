import { motion } from 'framer-motion'
import { FaArrowRightLong, FaAward } from 'react-icons/fa6'
import { MdWorkspaces } from 'react-icons/md'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { latestExperience } from '../data'

type ProductionTimelineSectionProps = {
  sectionId?: string
  onOpenExperience?: (experienceSlug: string) => void
  onOpenExperiencesPage?: () => void
}

export function ProductionTimelineSection({
  sectionId = 'experience',
  onOpenExperience,
  onOpenExperiencesPage,
}: ProductionTimelineSectionProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.15, once: true })
  const experience = latestExperience

  return (
    <SectionWrapper
      id={sectionId}
      eyebrow="Experience"
      title="Experience Spotlight"
      description="Current full-time role across Java full-stack engineering, enterprise delivery, and applied AI systems."
      className="production-work experience-spotlight"
      headerAction={
        onOpenExperiencesPage ? (
          <button
            type="button"
            className="link-btn"
            onClick={onOpenExperiencesPage}
          >
            View All Experiences
          </button>
        ) : null
      }
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="experience-spotlight__shell"
      >
        <motion.article
          variants={revealItem}
          className="experience-spotlight__panel"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.22 }}
        >
          <div className="experience-spotlight__orbital" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="experience-spotlight__identity">
            <div className="experience-spotlight__logo-frame">
              <img
                src={experience.companyLogo}
                alt={`${experience.company} logo`}
                className="experience-spotlight__logo"
              />
            </div>
            <div>
              <p className="experience-spotlight__kicker">
                <MdWorkspaces /> Latest Experience
              </p>
              <h3>{experience.company}</h3>
              <p>{experience.position}</p>
            </div>
          </div>

          <div className="experience-spotlight__content">
            <div className="experience-spotlight__copy">
              <div className="experience-spotlight__meta-row">
                <span>{experience.experienceType}</span>
                <span>{experience.duration}</span>
                <span>{experience.location}</span>
              </div>
              <p className="experience-spotlight__summary">
                {experience.summary}
              </p>
              <div className="experience-spotlight__actions">
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => onOpenExperience?.(experience.slug)}
                >
                  View Full Experience <FaArrowRightLong />
                </button>
                {experience.certificate ? (
                  <a
                    href={experience.certificate.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-btn link-btn--ghost"
                  >
                    <FaAward /> Certificate
                  </a>
                ) : null}
                {onOpenExperiencesPage ? (
                  <button
                    type="button"
                    className="link-btn link-btn--ghost"
                    onClick={onOpenExperiencesPage}
                  >
                    View All Experiences
                  </button>
                ) : null}
              </div>
            </div>

            <div className="experience-spotlight__signal">
              <div>
                <span>Role</span>
                <strong>
                  {experience.position} ({experience.experienceType})
                </strong>
              </div>
              <div>
                <span>Stack</span>
                <strong>{experience.stack}</strong>
              </div>
              <div>
                <span>Focus</span>
                <strong>{experience.roleFocus}</strong>
              </div>
            </div>
          </div>

          <div className="experience-spotlight__chip-columns">
            <div>
              <p>Technologies</p>
              <div className="experience-chip-row">
                {experience.technologies.slice(0, 8).map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>
            <div>
              <p>Skills Gained</p>
              <div className="experience-chip-row experience-chip-row--muted">
                {experience.skills.slice(0, 8).map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </motion.div>
    </SectionWrapper>
  );
}
