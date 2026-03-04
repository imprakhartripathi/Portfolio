import { useEffect, useState } from 'react'
import type { MouseEvent, PropsWithChildren } from 'react'
import { FaMicrochip, FaXmark } from 'react-icons/fa6'

import { GridOverlay } from './GridOverlay'
import { NoiseLayer } from './NoiseLayer'

const sectionLinks = [
  { href: '#system-overview', label: 'Overview' },
  { href: '#technical-expertise', label: 'Technical Expertise' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

function isProjectViewFromLocation() {
  return new URLSearchParams(window.location.search).has('project')
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

  useEffect(() => {
    const syncRouteState = () => {
      const nextIsProjectView = isProjectViewFromLocation()
      setIsProjectView(nextIsProjectView)

      if (nextIsProjectView) {
        setIsPortalOpen(false)
      }
    }

    const onEscapeClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPortalOpen(false)
      }
    }

    window.addEventListener('popstate', syncRouteState)
    window.addEventListener('portfolio:routechange', syncRouteState as EventListener)
    window.addEventListener('keydown', onEscapeClose)

    return () => {
      window.removeEventListener('popstate', syncRouteState)
      window.removeEventListener('portfolio:routechange', syncRouteState as EventListener)
      window.removeEventListener('keydown', onEscapeClose)
    }
  }, [])

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault()
    setIsPortalOpen(false)

    const url = new URL(window.location.href)
    const hadProject = url.searchParams.has('project')
    url.searchParams.delete('project')

    const nextUrl = `${url.pathname}${url.search}${href}`
    window.history.pushState({}, '', nextUrl)
    window.dispatchEvent(new Event('portfolio:routechange'))

    if (hadProject) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToSection(href))
      })
      return
    }

    scrollToSection(href)
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
                    onClick={(event) => handleNavClick(event, item.href)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                className="topbar__portal-btn"
                aria-label="Open navigation portal"
                aria-expanded={isPortalOpen}
                onClick={() => setIsPortalOpen((current) => !current)}
              >
                <FaMicrochip />
              </button>
            </>
          ) : null}
        </header>

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
                    key={`portal-${item.href}`}
                    href={item.href}
                    className="portal-nav__link"
                    onClick={(event) => handleNavClick(event, item.href)}
                  >
                    {item.label}
                  </a>
                ))}
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
          </div>
        </footer>
      </div>
    </div>
  )
}
