import { motion } from 'framer-motion'
import { FaArrowRightLong, FaNpm } from 'react-icons/fa6'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { contributionItems, npmProfileUrl, spotlightContributionSlug } from '../data'

import { ContributionCard } from './ContributionCard'

type ContributionsPageProps = {
  onOpenContribution: (slug: string) => void
}

export function ContributionsPage({ onOpenContribution }: ContributionsPageProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.1, once: true })
  const spotlight = contributionItems.find((item) => item.slug === spotlightContributionSlug) ?? null

  return (
    <SectionWrapper
      id="contributions"
      eyebrow="Open Source"
      title="My Contributions"
      description="CLI tools and framework work I am publishing on npm."
      className="contributions-page"
      titleAs="h1"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="contributions-page__stack"
      >
        {spotlight ? (
          <motion.article variants={revealItem} className="contributions-spotlight">
            <div className="contributions-spotlight__copy">
              <p className="contributions-spotlight__eyebrow">Highlight</p>
              <h3 className="contributions-spotlight__title">{spotlight.title}</h3>
              <p className="contributions-spotlight__text">
                {spotlight.shortSummary}
              </p>
              <p className="contributions-spotlight__status">Coming soon as a dedicated framework product in my Express ecosystem.</p>
            </div>

            <div className="contributions-spotlight__actions">
              <button type="button" className="link-btn" onClick={() => onOpenContribution(spotlight.slug)}>
                Open Full Description <FaArrowRightLong />
              </button>
            </div>
          </motion.article>
        ) : null}

        <motion.div variants={revealItem} className="contributions-page__top-actions">
          <a href={npmProfileUrl} target="_blank" rel="noreferrer" className="link-btn link-btn--ghost">
            npm Profile <FaNpm />
          </a>
        </motion.div>

        <motion.div variants={revealItem} className="contributions-page__grid">
          {contributionItems.map((item) => (
            <ContributionCard key={item.id} item={item} onOpen={onOpenContribution} />
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
