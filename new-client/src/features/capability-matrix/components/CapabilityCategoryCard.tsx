import { motion } from 'framer-motion'

import type { CapabilityCategory } from '../types'

type CapabilityCategoryCardProps = {
  category: CapabilityCategory
  onOpen: (categoryId: string) => void
}

export function CapabilityCategoryCard({ category, onOpen }: CapabilityCategoryCardProps) {
  const CategoryIcon = category.icon
  const skills = category.skillRows.flat()
  const drawerPrimary = skills.slice(0, 4)
  const drawerSecondary = skills.slice(4, 8)
  const drawerPrimarySlots = [...drawerPrimary, ...Array.from({ length: Math.max(0, 4 - drawerPrimary.length) }, () => null)]
  const drawerSecondarySlots = [...drawerSecondary, ...Array.from({ length: Math.max(0, 4 - drawerSecondary.length) }, () => null)]

  const iconGridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.06,
      },
    },
  }

  const iconItemVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.22, ease: 'easeOut' as const },
    },
  }

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

      <motion.div
        className="capability-category__desktop-icons"
        aria-hidden="true"
        variants={iconGridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((skill) => {
          const SkillIcon = skill.icon
          return (
            <motion.span
              key={skill.id}
              className="capability-icon-tile capability-icon-tile--desktop"
              title={skill.label}
              variants={iconItemVariants}
              whileHover={{ y: -2, scale: 1.06 }}
              transition={{ duration: 0.14 }}
            >
              <SkillIcon />
            </motion.span>
          )
        })}
      </motion.div>

      <div className="capability-category__drawer" aria-hidden="true">
        <motion.div
          className="capability-category__drawer-grid"
          variants={iconGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {drawerPrimarySlots.map((skill, index) => {
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
              <motion.span
                key={skill.id}
                className="capability-icon-tile capability-icon-tile--drawer-lg"
                title={skill.label}
                variants={iconItemVariants}
                whileHover={{ y: -1, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <SkillIcon />
              </motion.span>
            )
          })}
        </motion.div>
        <motion.div
          className="capability-category__drawer-mini-grid"
          variants={iconGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {drawerSecondarySlots.map((skill, index) => {
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
              <motion.span
                key={skill.id}
                className="capability-icon-tile capability-icon-tile--drawer-sm"
                title={skill.label}
                variants={iconItemVariants}
                whileHover={{ y: -1, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <SkillIcon />
              </motion.span>
            )
          })}
        </motion.div>
      </div>
    </motion.button>
  )
}
