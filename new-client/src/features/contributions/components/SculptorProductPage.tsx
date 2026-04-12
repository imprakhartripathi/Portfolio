import { motion } from 'framer-motion'
import { FaArrowLeftLong, FaArrowRightLong, FaNpm } from 'react-icons/fa6'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { npmProfileUrl, sculptorProductSpec } from '../data'

type SculptorProductPageProps = {
  onBack: () => void
  onOpenContributions: () => void
}

type CodeEditorBlockProps = {
  filename: string
  lines: string[]
  language?: string
}

function CodeEditorBlock({ filename, lines, language = 'json' }: CodeEditorBlockProps) {
  return (
    <div className="sculptor-editor" role="region" aria-label={`${filename} code preview`}>
      <div className="sculptor-editor__chrome">
        <div className="sculptor-editor__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="sculptor-editor__filename">{filename}</p>
        <span className="sculptor-editor__lang">{language}</span>
      </div>

      <pre className="sculptor-editor__body">
        {lines.map((line, index) => (
          <div key={`${filename}-${line}-${index}`} className="sculptor-editor__line">
            <span className="sculptor-editor__line-no">{index + 1}</span>
            <code className="sculptor-editor__line-code">{line}</code>
          </div>
        ))}
      </pre>
    </div>
  )
}

export function SculptorProductPage({ onBack, onOpenContributions }: SculptorProductPageProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.1, once: true })
  const spec = sculptorProductSpec

  return (
    <SectionWrapper
      id="sculptor-product"
      eyebrow="Framework Product"
      title={spec.brand}
      description={`${spec.namespace} • CLI: ${spec.cli}`}
      className="sculptor-product"
      bodyClassName="sculptor-product__body"
      titleAs="h1"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="sculptor-product__stack"
      >
        <motion.article variants={revealItem} className="sculptor-product__hero">
          <div className="sculptor-product__hero-copy">
            <p className="sculptor-product__status">Coming Soon</p>
            <h2 className="sculptor-product__hero-title">Spring Boot comfort. Express freedom. TypeScript elegance.</h2>
            <p className="sculptor-product__hero-text">
              {spec.vision.join(' ')}
            </p>
            <p className="sculptor-product__hero-note">{spec.philosophy}</p>
          </div>
          <div className="sculptor-product__hero-actions">
            <button type="button" className="link-btn" onClick={onOpenContributions}>
              View All Contributions <FaArrowRightLong />
            </button>
            <a href={npmProfileUrl} target="_blank" rel="noreferrer" className="link-btn link-btn--ghost">
              npm Profile <FaNpm />
            </a>
            <button type="button" className="link-btn link-btn--ghost" onClick={onBack}>
              <FaArrowLeftLong /> Back
            </button>
          </div>
        </motion.article>

        <motion.section variants={revealItem} className="sculptor-product__section">
          <h3>Package Architecture</h3>
          <div className="sculptor-product__modules">
            {spec.packageModules.map((module) => (
              <article key={module.name} className="sculptor-product__module-card">
                <h4>{module.name}</h4>
                <div className="sculptor-product__pill-list">
                  {module.responsibilities.map((responsibility) => (
                    <span key={responsibility} className="certification-skill-pill">
                      {responsibility}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section variants={revealItem} className="sculptor-product__section">
          <h3>Routing Options</h3>
          <div className="sculptor-product__routing-grid">
            {spec.routingModes.map((mode) => (
              <article key={mode.name} className="sculptor-product__routing-card">
                <h4>{mode.name}</h4>
                <p>{mode.summary}</p>
                <CodeEditorBlock
                  filename={mode.name === 'Class-based Controller Mode' ? 'user.controller.ts' : 'users.routes.ts'}
                  lines={mode.example}
                  language="ts"
                />
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section variants={revealItem} className="sculptor-product__section">
          <h3>Configuration Model</h3>
          <div className="sculptor-product__config-grid">
            {spec.configuration.map((config) => (
              <article key={config.file} className="sculptor-product__config-card">
                <h4>{config.file}</h4>
                <p>{config.purpose}</p>
                <ul>
                  {config.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <CodeEditorBlock filename={config.file} lines={config.snippet} />
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section variants={revealItem} className="sculptor-product__section">
          <h3>Platform Capabilities</h3>
          <div className="sculptor-product__pill-list">
            {spec.platformCapabilities.map((capability) => (
              <span key={capability} className="certification-skill-pill">
                {capability}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section variants={revealItem} className="sculptor-product__section">
          <h3>What Success Looks Like</h3>
          <ul className="sculptor-product__success-list">
            {spec.successCriteria.map((criterion) => (
              <li key={criterion}>{criterion}</li>
            ))}
          </ul>
        </motion.section>
      </motion.div>
    </SectionWrapper>
  )
}
