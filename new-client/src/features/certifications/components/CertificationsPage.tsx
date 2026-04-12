import { motion } from 'framer-motion'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { certifications } from '../data'

import { CertificationCard } from './CertificationCard'

type CertificationsPageProps = {
  onOpenCertification: (slug: string) => void
}

export function CertificationsPage({ onOpenCertification }: CertificationsPageProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.08, once: true })

  return (
    <SectionWrapper
      id="certifications"
      eyebrow="Certifications"
      title="Licenses & Certifications"
      description="Verified credentials, certificate IDs, and PDF records."
      className="certifications-page"
      titleAs="h1"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="certifications-page__stack"
      >
        <motion.div variants={revealItem} className="certifications-page__grid">
          {certifications.map((certification) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              onOpenCertification={onOpenCertification}
            />
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}

