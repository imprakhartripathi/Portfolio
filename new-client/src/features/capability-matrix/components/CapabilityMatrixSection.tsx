import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { capabilityCategories } from '../data'

import { CapabilityCategoryCard } from './CapabilityCategoryCard'
import { CapabilityCategoryModal } from './CapabilityCategoryModal'

export function CapabilityMatrixSection() {
  const { ref, inView } = useInViewReveal({ threshold: 0.18, once: true })
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)

  const activeCategory = useMemo(
    () => capabilityCategories.find((category) => category.id === activeCategoryId) ?? null,
    [activeCategoryId],
  )

  useEffect(() => {
    if (!activeCategoryId) {
      return
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveCategoryId(null)
      }
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [activeCategoryId])

  useEffect(() => {
    if (!activeCategoryId) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeCategoryId])

  return (
    <SectionWrapper
      id="technical-expertise"
      eyebrow="Skills"
      title="Technical Expertise"
      description="Category-based stack overview. Open any category to view the complete skill list."
      className="capability-matrix"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="capability-matrix__stack"
      >
        <motion.div variants={revealItem} className="capability-drawer">
          {capabilityCategories.map((category) => (
            <CapabilityCategoryCard key={category.id} category={category} onOpen={setActiveCategoryId} />
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {activeCategory ? <CapabilityCategoryModal category={activeCategory} onClose={() => setActiveCategoryId(null)} /> : null}
      </AnimatePresence>
    </SectionWrapper>
  )
}
