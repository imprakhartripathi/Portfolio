import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { capabilityCategories } from '../data'

import { CapabilityCategoryCard } from './CapabilityCategoryCard'
import { CapabilityCategoryModal } from './CapabilityCategoryModal'

type CapabilityMatrixSectionProps = {
  sectionId?: string
}

type IdleRenderCallback = () => void
type IdleLikeCallback = (cb: () => void, options?: { timeout?: number }) => number

function requestIdleRender(callback: IdleRenderCallback) {
  if (typeof window === 'undefined') {
    callback()
    return () => undefined
  }

  const requestIdle = window.requestIdleCallback as IdleLikeCallback | undefined
  const cancelIdle = window.cancelIdleCallback as ((id: number) => void) | undefined

  if (requestIdle) {
    const id = requestIdle(() => callback(), { timeout: 1200 })
    return () => cancelIdle?.(id)
  }

  const timeoutId = window.setTimeout(callback, 100)
  return () => window.clearTimeout(timeoutId)
}

function scheduleTimeout(callback: IdleRenderCallback, delay: number) {
  if (typeof window === 'undefined') {
    callback()
    return () => undefined
  }

  const timeoutId = window.setTimeout(callback, delay)
  return () => window.clearTimeout(timeoutId)
}

export function CapabilityMatrixSection({ sectionId = 'technical-expertise' }: CapabilityMatrixSectionProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.08, once: true })
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [renderIcons, setRenderIcons] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.matchMedia('(max-width: 900px)').matches
  })

  const activeCategory = useMemo(
    () => capabilityCategories.find((category) => category.id === activeCategoryId) ?? null,
    [activeCategoryId],
  )
  const shouldRenderIcons = renderIcons || inView

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

  useEffect(() => {
    const cleanupIdle = requestIdleRender(() => setRenderIcons(true))
    const cleanupTimeout = scheduleTimeout(() => setRenderIcons(true), 1800)

    const onFirstInteraction = () => {
      setRenderIcons(true)
      window.removeEventListener('scroll', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
    }

    window.addEventListener('scroll', onFirstInteraction, { passive: true })
    window.addEventListener('touchstart', onFirstInteraction, { passive: true })

    return () => {
      cleanupIdle()
      cleanupTimeout()
      window.removeEventListener('scroll', onFirstInteraction)
      window.removeEventListener('touchstart', onFirstInteraction)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(max-width: 900px)')
    const syncViewport = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches)
    }

    mediaQuery.addEventListener('change', syncViewport)
    return () => mediaQuery.removeEventListener('change', syncViewport)
  }, [])

  return (
    <SectionWrapper
      id={sectionId}
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
            <CapabilityCategoryCard
              key={category.id}
              category={category}
              onOpen={setActiveCategoryId}
              renderIcons={shouldRenderIcons}
              isMobileViewport={isMobileViewport}
            />
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {activeCategory ? (
          <CapabilityCategoryModal
            category={activeCategory}
            onClose={() => setActiveCategoryId(null)}
            renderIcons={shouldRenderIcons}
          />
        ) : null}
      </AnimatePresence>
    </SectionWrapper>
  )
}
