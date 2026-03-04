import { motion } from 'framer-motion'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { systemOverviewContent } from '../data'

export function SystemOverviewSection() {
  const { ref, inView } = useInViewReveal({ threshold: 0.2, once: true })

  return (
    <SectionWrapper
      id="system-overview"
      eyebrow="About"
      title={systemOverviewContent.name}
      description={systemOverviewContent.title}
      titleAs="h1"
      className="system-overview"
      bodyClassName="hero-content"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="hero-stack"
      >
        <motion.img
          variants={revealItem}
          src={systemOverviewContent.avatarUrl}
          alt="Prakhar Tripathi"
          className="hero-avatar"
          loading="eager"
        />

        <motion.p variants={revealItem} className="hero-summary">
          {systemOverviewContent.summary}
        </motion.p>

        <motion.div variants={revealItem} className="hero-actions">
          {systemOverviewContent.actions.map((action) => (
            <a
              key={action.id}
              href={action.href}
              className="hero-action"
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noreferrer' : undefined}
            >
              {action.label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
