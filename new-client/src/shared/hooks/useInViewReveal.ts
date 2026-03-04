import { useInView } from 'react-intersection-observer'

type UseInViewRevealOptions = {
  threshold?: number
  once?: boolean
}

export function useInViewReveal(options?: UseInViewRevealOptions) {
  const { ref, inView } = useInView({
    threshold: options?.threshold ?? 0.25,
    triggerOnce: options?.once ?? true,
  })

  return { ref, inView }
}
