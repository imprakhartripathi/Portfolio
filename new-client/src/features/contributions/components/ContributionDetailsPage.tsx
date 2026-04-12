import { motion } from 'framer-motion'
import { FaArrowLeftLong, FaNpm } from 'react-icons/fa6'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { npmProfileUrl } from '../data'
import type { ContributionItem } from '../types'

type ContributionDetailsPageProps = {
  item: ContributionItem
  onBack: () => void
}

export function ContributionDetailsPage({ item, onBack }: ContributionDetailsPageProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.1, once: true })

  return (
    <SectionWrapper
      id="contribution-detail"
      eyebrow="Contribution Detail"
      title={item.title}
      description={item.packageName}
      className="project-detail"
      bodyClassName="project-detail__body"
      titleAs="h1"
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
            <FaArrowLeftLong /> Back to Contributions
          </button>
          <div className="project-detail__external-links">
            {item.npmUrl ? (
              <a href={item.npmUrl} target="_blank" rel="noreferrer" className="link-btn link-btn--ghost">
                Package on npm <FaNpm />
              </a>
            ) : null}
            <a href={npmProfileUrl} target="_blank" rel="noreferrer" className="link-btn link-btn--ghost">
              npm Profile <FaNpm />
            </a>
          </div>
        </motion.div>

        <motion.article variants={revealItem} className="project-detail__card">
          <h3>What It Is</h3>
          <p>{item.description}</p>
        </motion.article>

        <motion.article variants={revealItem} className="project-detail__card">
          <h3>Key Features</h3>
          <ul>
            {item.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </motion.article>

        <motion.article variants={revealItem} className="project-detail__card">
          <h3>Tech Stack</h3>
          <div className="certification-card__skills">
            {item.techStack.map((tech) => (
              <span key={tech} className="certification-skill-pill">
                {tech}
              </span>
            ))}
          </div>
        </motion.article>

        <motion.article variants={revealItem} className="project-detail__card">
          <h3>Quick Start</h3>
          <div className="contribution-detail__commands">
            {item.quickStart.map((command) => (
              <code key={command} className="contribution-detail__command">
                {command}
              </code>
            ))}
          </div>
        </motion.article>
      </motion.div>
    </SectionWrapper>
  )
}
