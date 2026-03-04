import { useEffect, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'

type UseInViewportOptions = {
  rootMargin?: string
  threshold?: number
  once?: boolean
  initialInView?: boolean
}

type UseInViewportResult<T extends HTMLElement> = {
  ref: MutableRefObject<T | null>
  isInViewport: boolean
}

export function useInViewport<T extends HTMLElement>(options?: UseInViewportOptions): UseInViewportResult<T> {
  const elementRef = useRef<T | null>(null)
  const [isInViewport, setIsInViewport] = useState(() => {
    if (options?.initialInView) {
      return true
    }

    if (typeof window === 'undefined') {
      return false
    }

    return typeof window.IntersectionObserver === 'undefined'
  })

  useEffect(() => {
    if (isInViewport && (options?.once ?? true)) {
      return
    }

    const node = elementRef.current
    if (!node) {
      return
    }

    if (typeof window === 'undefined' || typeof window.IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (!firstEntry?.isIntersecting) {
          return
        }

        setIsInViewport(true)
        if (options?.once ?? true) {
          observer.disconnect()
        }
      },
      {
        root: null,
        rootMargin: options?.rootMargin ?? '0px',
        threshold: options?.threshold ?? 0.12,
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [options?.once, options?.rootMargin, options?.threshold, isInViewport])

  return { ref: elementRef, isInViewport }
}
