import { motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'

import type { CapabilityCategory } from '../types'

type CapabilityCategoryModalProps = {
  category: CapabilityCategory | null
  onClose: () => void
  renderIcons: boolean
}

export function CapabilityCategoryModal({ category, onClose, renderIcons }: CapabilityCategoryModalProps) {
  if (!category) {
    return null
  }

  const skills = category.skillRows.flat()

  return (
    <motion.div
      className="capability-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="skills-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <motion.button
        type="button"
        className="capability-modal__backdrop"
        onClick={onClose}
        aria-label="Close skills modal"
      />

      <motion.article
        className="capability-modal__panel"
        initial={{ opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <header className="capability-modal__header">
          <h3 id="skills-modal-title" className="capability-modal__title">
            {category.title}
          </h3>
          <button type="button" className="capability-modal__close" onClick={onClose} aria-label="Close skills modal">
            <FaXmark />
          </button>
        </header>

        <div className="capability-modal__skills-grid">
          {skills.map((skill) => {
            const SkillIcon = skill.icon
            return (
              <span key={skill.id} className="capability-modal__skill-card">
                {renderIcons ? (
                  <span className="capability-icon-tile capability-icon-tile--modal" aria-hidden="true">
                    <SkillIcon />
                  </span>
                ) : (
                  <span className="capability-icon-tile capability-icon-tile--modal capability-icon-tile--placeholder" aria-hidden="true" />
                )}
                <span className="capability-modal__skill-label">{skill.label}</span>
              </span>
            )
          })}
        </div>
      </motion.article>
    </motion.div>
  )
}
