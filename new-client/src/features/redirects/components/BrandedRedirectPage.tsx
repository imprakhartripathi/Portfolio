import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import type { BrandedRedirectConfig } from '../types'

type BrandedRedirectPageProps = {
  config: BrandedRedirectConfig
}

export function BrandedRedirectPage({ config }: BrandedRedirectPageProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(config.countdownDuration)
  const Icon = config.icon

  useEffect(() => {
    if (secondsRemaining <= 0) {
      window.location.assign(config.destinationUrl)
      return
    }

    const timerId = window.setTimeout(() => {
      setSecondsRemaining((currentValue) => currentValue - 1)
    }, 1000)

    return () => window.clearTimeout(timerId)
  }, [config.destinationUrl, secondsRemaining])

  return (
    <SectionWrapper
      id={`${config.key}-redirect`}
      eyebrow="External Profile"
      title={config.platformName}
      description={config.description}
      titleAs="h1"
      className="branded-redirect"
      bodyClassName="branded-redirect__body"
    >
      <motion.article
        className="project-detail__card branded-redirect__card"
        variants={revealContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={revealItem} className="branded-redirect__icon" aria-hidden="true">
          <Icon />
        </motion.div>

        <motion.div variants={revealItem} className="branded-redirect__copy">
          <h2>Redirecting to {config.platformName}</h2>
          <p>
            You are being redirected to my {config.platformName} profile. You can wait for the countdown or open the
            destination immediately.
          </p>
        </motion.div>

        <motion.div variants={revealItem} className="branded-redirect__countdown" aria-live="polite">
          <span className="branded-redirect__countdown-value">{secondsRemaining}</span>
        </motion.div>

        <motion.div variants={revealItem} className="project-detail__external-links branded-redirect__actions">
          <a href={config.destinationUrl} target="_self" className="link-btn branded-redirect__primary-action">
            Visit {config.platformName}
            <FaArrowUpRightFromSquare aria-hidden="true" />
          </a>
        </motion.div>

        <noscript>
          <p className="branded-redirect__noscript">
            JavaScript is disabled. Open{' '}
            <a href={config.destinationUrl} className="branded-redirect__inline-link">
              {config.platformName}
            </a>
            .
          </p>
        </noscript>
      </motion.article>
    </SectionWrapper>
  )
}
