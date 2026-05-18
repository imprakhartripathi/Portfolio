import { motion } from 'framer-motion'
import { FaArrowRightLong } from 'react-icons/fa6'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { contactMethods } from '../data'

import { ContactMethodCard } from './ContactMethodCard'

export function ContactEndpointSection() {
  const { ref, inView } = useInViewReveal({ threshold: 0.16, once: true })

  return (
    <SectionWrapper
      id="contact"
      eyebrow="Contact"
      title="Direct connections, no messing around."
      description="Reach out through email, LinkedIn, GitHub, or npm. I keep contact simple, direct, and low-friction."
      className="contact-endpoint"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="contact-endpoint__stack"
      >
        <motion.article
          variants={revealItem}
          className="contact-endpoint__hero"
        >
          <p className="contact-endpoint__hero-kicker">
            Open to roles, collaborations, and product conversations
          </p>
          <h3 className="contact-endpoint__hero-title">
            If the work is interesting, send it straight to me.
          </h3>
          <p className="contact-endpoint__hero-copy">
            No submission queue, no hidden services, and no extra friction. Use
            the channel that fits the conversation: email for direct requests,
            LinkedIn for professional context, GitHub for code, and npm for
            package work.
          </p>

          <div className="contact-endpoint__cta-row">
            <a className="link-btn" href="mailto:dev@imprakhartripathi.in">
              Email <FaArrowRightLong />
            </a>
            <a
              className="link-btn link-btn--ghost"
              href="https://github.com/imprakhartripathi"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub <FaArrowRightLong />
            </a>
            <a
              className="link-btn"
              href="mailto:imprakhartripathiofficial@gmail.com"
            >
              Email (Backup) <FaArrowRightLong />
            </a>
          </div>
        </motion.article>

        <motion.div variants={revealItem} className="contact-endpoint__grid">
          {contactMethods.map((method) => (
            <ContactMethodCard key={method.id} method={method} />
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
