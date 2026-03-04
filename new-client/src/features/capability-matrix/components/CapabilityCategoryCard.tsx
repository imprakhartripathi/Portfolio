import { motion } from 'framer-motion'

import type { CapabilityCategory } from '../types'

type CapabilityCategoryCardProps = {
  category: CapabilityCategory
  onOpen: (categoryId: string) => void
  renderIcons: boolean
  isMobileViewport: boolean
}

export function CapabilityCategoryCard({ category, onOpen, renderIcons, isMobileViewport }: CapabilityCategoryCardProps) {
  const CategoryIcon = category.icon
  const skills = category.skillRows.flat()
  const drawerPrimary = skills.slice(0, 4)
  const drawerSecondary = skills.slice(4, 8)
  const drawerPrimarySlots = [...drawerPrimary, ...Array.from({ length: Math.max(0, 4 - drawerPrimary.length) }, () => null)]
  const drawerSecondarySlots = [...drawerSecondary, ...Array.from({ length: Math.max(0, 4 - drawerSecondary.length) }, () => null)]
  const renderedPrimarySlots = renderIcons ? drawerPrimarySlots : drawerPrimarySlots.map(() => null)
  const renderedSecondarySlots = renderIcons ? drawerSecondarySlots : drawerSecondarySlots.map(() => null)

  return (
    <motion.button
      type="button"
      className="capability-category"
      whileHover={{ y: -4, scale: 1.004 }}
      whileTap={{ scale: 0.996 }}
      transition={{ duration: 0.2 }}
      onClick={() => onOpen(category.id)}
      aria-label={`Open ${category.title} skills`}
    >
      <div className="capability-category__top">
        <span className="capability-category__group-icon" aria-hidden="true">
          <CategoryIcon />
        </span>
        <div className="capability-category__titles">
          <h3 className="capability-category__title">{category.title}</h3>
        </div>
      </div>

      {!isMobileViewport ? (
        <div
          className="capability-category__desktop-icons"
          aria-hidden="true"
        >
          {renderIcons
            ? skills.map((skill) => {
                const SkillIcon = skill.icon
                return (
                  <span
                    key={skill.id}
                    className="capability-icon-tile capability-icon-tile--desktop"
                    title={skill.label}
                  >
                    <SkillIcon />
                  </span>
                )
              })
            : skills.map((skill) => (
                <span
                  key={`desktop-placeholder-${category.id}-${skill.id}`}
                  className="capability-icon-tile capability-icon-tile--desktop capability-icon-tile--placeholder"
                  aria-hidden="true"
                />
              ))}
        </div>
      ) : null}

      {isMobileViewport ? (
        <div className="capability-category__drawer" aria-hidden="true">
          <div className="capability-category__drawer-grid">
            {renderedPrimarySlots.map((skill, index) => {
              if (!skill) {
                return (
                  <span
                    key={`drawer-primary-placeholder-${category.id}-${index}`}
                    className="capability-icon-tile capability-icon-tile--drawer-lg capability-icon-tile--placeholder"
                    aria-hidden="true"
                  />
                )
              }

              const SkillIcon = skill.icon
              return (
                <span
                  key={skill.id}
                  className="capability-icon-tile capability-icon-tile--drawer-lg"
                  title={skill.label}
                >
                  <SkillIcon />
                </span>
              )
            })}
          </div>
          <div className="capability-category__drawer-mini-grid">
            {renderedSecondarySlots.map((skill, index) => {
              if (!skill) {
                return (
                  <span
                    key={`drawer-secondary-placeholder-${category.id}-${index}`}
                    className="capability-icon-tile capability-icon-tile--drawer-sm capability-icon-tile--placeholder"
                    aria-hidden="true"
                  />
                )
              }

              const SkillIcon = skill.icon
              return (
                <span
                  key={skill.id}
                  className="capability-icon-tile capability-icon-tile--drawer-sm"
                  title={skill.label}
                >
                  <SkillIcon />
                </span>
              )
            })}
          </div>
        </div>
      ) : null}
    </motion.button>
  )
}
