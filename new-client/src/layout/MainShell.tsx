import { useEffect, useState } from 'react'
import type { MouseEvent, PropsWithChildren } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaArrowLeftLong, FaArrowUpLong, FaGithub, FaHouse, FaLinkedin, FaMicrochip, FaGlasses, FaNpm, FaXmark } from 'react-icons/fa6'

import { navigateTo, PORTFOLIO_ROUTE_EVENT } from '../app/navigation'
import { GridOverlay } from './GridOverlay'
import { NoiseLayer } from './NoiseLayer'

type NavigationLink = {
  href: string
  label: string
  kind: 'section' | 'route'
  tone?: 'accent'
}

type PortalLink = NavigationLink & {
  iconLabel?: string
  tone?: 'accent'
}

const sectionLinks: NavigationLink[] = [
  { href: '#system-overview', label: 'Overview', kind: 'section' },
  { href: '#sculptor-spotlight', label: 'Sculptor TS', kind: 'section' },
  { href: '#technical-expertise', label: 'Technical Expertise', kind: 'section' },
  { href: '#experience', label: 'Experience', kind: 'section' },
  { href: '#projects', label: 'Projects', kind: 'section' },
  // { href: '/certifications', label: 'Certifications', kind: 'route' },
  { href: '#contact', label: 'Contact', kind: 'section' },
]

const portalRouteLinks: PortalLink[] = [
  { href: '/Sculptor', label: 'Sculptor Product', kind: 'route', },
  { href: '/Sculptor/guide', label: 'Sculptor Guide', kind: 'route', },
  { href: '/certifications', label: 'Certifications', kind: 'route' },
  { href: '/contributions', label: 'Open-Source Work', kind: 'route' },
]

const portalSocialLinks = [
  { href: 'https://github.com/imprakhartripathi', label: 'GitHub', icon: FaGithub },
  { href: 'https://www.npmjs.com/~imprakhartripathi', label: 'npm', icon: FaNpm },
  { href: 'https://www.linkedin.com/in/imprakhartripathi', label: 'LinkedIn', icon: FaLinkedin },
] as const

function isProjectViewFromLocation() {
  return window.location.pathname.startsWith('/projects/')
}

function isSculptorGuideViewFromLocation() {
  const pathname = window.location.pathname
  return pathname.startsWith('/Sculptor/guide') || pathname.startsWith('/contributions/sculptor-ts/guide')
}

function normalizePathname(pathname: string) {
  if (!pathname) {
    return '/'
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

const INTERNAL_NAV_STACK_KEY = 'portfolio:internal-nav-stack'
const GUIDE_MAP_OPEN_EVENT = 'portfolio:guide-map:open'
const GUIDE_MAP_CLOSE_EVENT = 'portfolio:guide-map:close'
const GUIDE_MAP_STATE_EVENT = 'portfolio:guide-map:state'

function readInternalNavStack() {
  try {
    const raw = window.sessionStorage.getItem(INTERNAL_NAV_STACK_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter((item): item is string => typeof item === 'string' && item.length > 0)
  } catch {
    return []
  }
}

function writeInternalNavStack(stack: string[]) {
  try {
    window.sessionStorage.setItem(INTERNAL_NAV_STACK_KEY, JSON.stringify(stack))
  } catch {
    // Ignore storage failures and keep the nav functional.
  }
}

function syncInternalNavStack(pathname: string) {
  const currentPath = normalizePathname(pathname)
  const stack = readInternalNavStack()

  if (!stack.length) {
    const nextStack = [currentPath]
    writeInternalNavStack(nextStack)
    return nextStack
  }

  if (stack[stack.length - 1] === currentPath) {
    return stack
  }

  const existingIndex = stack.lastIndexOf(currentPath)
  const nextStack = existingIndex >= 0 ? stack.slice(0, existingIndex + 1) : [...stack, currentPath]
  writeInternalNavStack(nextStack)
  return nextStack
}

function scrollToSection(href: string) {
  const sectionId = href.replace('#', '')
  const target = document.getElementById(sectionId)

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function MainShell({ children }: PropsWithChildren) {
  const [isPortalOpen, setIsPortalOpen] = useState(false)
  const [isProjectView, setIsProjectView] = useState(() => isProjectViewFromLocation())
  const [isSculptorGuideView, setIsSculptorGuideView] = useState(() => isSculptorGuideViewFromLocation())
  const [isAtTop, setIsAtTop] = useState(() => window.scrollY <= 8)
  const [canGoBack, setCanGoBack] = useState(() => readInternalNavStack().length > 1)
  const [isGuideMapOpen, setIsGuideMapOpen] = useState(false)
  const isHomeRoute = window.location.pathname === '/'

  useEffect(() => {
    syncInternalNavStack(window.location.pathname)

    const syncRouteState = () => {
      const nextIsProjectView = isProjectViewFromLocation()
      const nextIsSculptorGuideView = isSculptorGuideViewFromLocation()
      setIsProjectView(nextIsProjectView)
      setIsSculptorGuideView(nextIsSculptorGuideView)
      setCanGoBack(syncInternalNavStack(window.location.pathname).length > 1)

      if (nextIsProjectView) {
        setIsPortalOpen(false)
      }
    }

    const onEscapeClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPortalOpen(false)
      }
    }

    const onScroll = () => {
      setIsAtTop(window.scrollY <= 8)
    }

    const onGuideMapState = (event: Event) => {
      const detail = (event as CustomEvent<{ open?: boolean }>).detail
      setIsGuideMapOpen(Boolean(detail?.open))
    }

    window.addEventListener('popstate', syncRouteState)
    window.addEventListener(PORTFOLIO_ROUTE_EVENT, syncRouteState as EventListener)
    window.addEventListener('keydown', onEscapeClose)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener(GUIDE_MAP_STATE_EVENT, onGuideMapState as EventListener)

    onScroll()
    return () => {
      window.removeEventListener('popstate', syncRouteState)
      window.removeEventListener(PORTFOLIO_ROUTE_EVENT, syncRouteState as EventListener)
      window.removeEventListener('keydown', onEscapeClose)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener(GUIDE_MAP_STATE_EVENT, onGuideMapState as EventListener)
    }
  }, [])

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, link: NavigationLink) {
    event.preventDefault()
    setIsPortalOpen(false)

    if (link.kind === 'route') {
      navigateTo(link.href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const isAwayFromHome = window.location.pathname !== '/'
    const nextUrl = `/${link.href}`
    navigateTo(nextUrl)

    if (isAwayFromHome) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToSection(link.href))
      })
      return
    }

    scrollToSection(link.href)
  }

  function handleBackToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleGoBack() {
    if (window.history.length > 1) {
      window.history.back()
      return
    }

    navigateTo('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleGoHome() {
    navigateTo('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function nextFrame(callback: () => void) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(callback)
    })
  }

  function openGuideMap() {
    if (isGuideMapOpen) {
      setIsPortalOpen(false)
      window.dispatchEvent(new Event(GUIDE_MAP_CLOSE_EVENT))
      return
    }

    if (isPortalOpen) {
      setIsPortalOpen(false)
      nextFrame(() => {
        window.dispatchEvent(new Event(GUIDE_MAP_OPEN_EVENT))
      })
      return
    }

    window.dispatchEvent(new Event(GUIDE_MAP_OPEN_EVENT))
  }

  function openPortalThenCloseGuideMap() {
    if (isPortalOpen) {
      setIsPortalOpen(false)
      return
    }

    if (isGuideMapOpen) {
      window.dispatchEvent(new Event(GUIDE_MAP_CLOSE_EVENT))
      nextFrame(() => {
        setIsPortalOpen(true)
      })
      return
    }

    setIsPortalOpen(true)
  }

  return (
    <div className="app-shell">
      <NoiseLayer />
      <GridOverlay />

      <div className="app-shell__inner">
        <header className="topbar">
          <p className="topbar__label">PRAKHAR TRIPATHI</p>

          {!isProjectView ? (
            <>
              <nav className="topbar__nav topbar__nav--desktop" aria-label="Primary">
                {sectionLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="topbar__link"
                    onClick={(event) => handleNavClick(event, item)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </>
          ) : null}
        </header>

        <motion.div className="sculptor-page-nav" layout>
          <AnimatePresence initial={false}>
            {isSculptorGuideView ? (
              <motion.button
                key="open-guide-map"
                type="button"
                className="sculptor-fab-btn sculptor-fab-btn--guide-map"
                aria-label={isGuideMapOpen ? 'Close file map' : 'Open file map'}
                title={isGuideMapOpen ? 'Close file map' : 'Open file map'}
                onClick={() => {
                  if (isGuideMapOpen) {
                    window.dispatchEvent(new Event(GUIDE_MAP_CLOSE_EVENT))
                    return
                  }

                  openGuideMap()
                }}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                layout
              >
                <FaGlasses aria-hidden="true" />
              </motion.button>
            ) : null}

            {!isAtTop ? (
              <motion.button
                key="back-to-top"
                type="button"
                className="sculptor-fab-btn"
                aria-label="Back to top"
                title="Back to top"
                onClick={handleBackToTop}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                layout
              >
                <FaArrowUpLong aria-hidden="true" />
              </motion.button>
            ) : null}

            {canGoBack ? (
              <motion.button
                key="go-back"
                type="button"
                className="sculptor-fab-btn"
                aria-label="Go back"
                title="Go back"
                onClick={handleGoBack}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                layout
              >
                <FaArrowLeftLong aria-hidden="true" />
              </motion.button>
            ) : null}

            {!isHomeRoute ? (
              <motion.button
                key="go-home"
                type="button"
                className="sculptor-fab-btn"
                aria-label="Go home"
                title="Go home"
                onClick={handleGoHome}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                layout
              >
                <FaHouse aria-hidden="true" />
              </motion.button>
            ) : null}

            {!isProjectView ? (
              <motion.button
                key="open-portal"
                type="button"
                className="sculptor-fab-btn"
                aria-label={isPortalOpen ? 'Close navigation portal' : 'Open navigation portal'}
                aria-expanded={isPortalOpen}
                onClick={openPortalThenCloseGuideMap}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                layout
              >
                <FaMicrochip aria-hidden="true" />
              </motion.button>
            ) : null}
          </AnimatePresence>
        </motion.div>

        {!isProjectView ? (
          <div className={`portal-nav ${isPortalOpen ? 'is-open' : ''}`} aria-hidden={!isPortalOpen}>
            <button
              type="button"
              className="portal-nav__backdrop"
              aria-label="Close navigation portal"
              onClick={() => setIsPortalOpen(false)}
            />

            <div className="portal-nav__panel" role="dialog" aria-modal="true" aria-label="Navigation portal">
              <div className="portal-nav__head">
                <p className="portal-nav__title">Portal Navigation</p>
                <button
                  type="button"
                  className="portal-nav__close"
                  aria-label="Close navigation portal"
                  onClick={() => setIsPortalOpen(false)}
                >
                  <FaXmark />
                </button>
              </div>

              <div className="portal-nav__grid">
                {sectionLinks.map((item) => (
                  <a
                    key={`portal-section-${item.href}`}
                    href={item.href}
                    className={`portal-nav__link ${item.tone === 'accent' ? 'portal-nav__link--accent' : ''}`}
                    onClick={(event) => handleNavClick(event, item)}
                  >
                    {item.label}
                  </a>
                ))}

                {portalRouteLinks.map((item) => (
                  <a
                    key={`portal-route-${item.href}`}
                    href={item.href}
                    className={`portal-nav__link ${item.tone === 'accent' ? 'portal-nav__link--accent' : ''}`}
                    onClick={(event) => handleNavClick(event, item)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="portal-nav__social-row" aria-label="Profile links">
                {portalSocialLinks.map((item) => {
                  const Icon = item.icon

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="portal-nav__social-link"
                      aria-label={item.label}
                      title={item.label}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        ) : null}

        <main className="main-content">{children}</main>

        <footer className="app-footer" aria-label="Footer">
          <p className="app-footer__line">Built by Prakhar Tripathi with clean architecture and shipping discipline.</p>
          <div className="app-footer__links">
            <a href="mailto:dev@imprakhartripathi.in">Email</a>
            <a href="https://github.com/imprakhartripathi" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/imprakhartripathi" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://www.npmjs.com/~imprakhartripathi" target="_blank" rel="noreferrer">npm</a>
            <a href="/certifications">Certifications</a>
            <a href="/contributions">Open-Source Work</a>
          </div>
        </footer>
      </div>
    </div>
  )
}
