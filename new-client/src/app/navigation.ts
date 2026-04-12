export const PORTFOLIO_ROUTE_EVENT = 'portfolio:routechange'

const PROJECTS_BASE_PATH = '/projects'
const CERTIFICATIONS_BASE_PATH = '/certifications'
const CONTRIBUTIONS_BASE_PATH = '/contributions'

function normalizePathname(pathname: string) {
  if (!pathname) {
    return '/'
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

export type PortfolioRoute =
  | { page: 'home' }
  | { page: 'projects' }
  | { page: 'project-detail'; projectId: string }
  | { page: 'certifications' }
  | { page: 'certification-detail'; certificationSlug: string }
  | { page: 'contributions' }
  | { page: 'contribution-detail'; contributionSlug: string }
  | { page: 'not-found'; pathname: string }

export function buildProjectPath(projectId: string) {
  return `${PROJECTS_BASE_PATH}/${encodeURIComponent(projectId)}`
}

export function buildCertificationPath(certificationSlug: string) {
  return `${CERTIFICATIONS_BASE_PATH}/${encodeURIComponent(certificationSlug)}`
}

export function buildContributionPath(contributionSlug: string) {
  return `${CONTRIBUTIONS_BASE_PATH}/${encodeURIComponent(contributionSlug)}`
}

export function readRouteFromLocation(locationRef: Pick<Location, 'pathname'> = window.location): PortfolioRoute {
  const pathname = normalizePathname(locationRef.pathname)

  if (pathname === '/') {
    return { page: 'home' }
  }

  if (pathname === PROJECTS_BASE_PATH) {
    return { page: 'projects' }
  }

  if (pathname.startsWith(`${PROJECTS_BASE_PATH}/`)) {
    const projectId = decodeURIComponent(pathname.slice(PROJECTS_BASE_PATH.length + 1))
    if (projectId) {
      return { page: 'project-detail', projectId }
    }
    return { page: 'projects' }
  }

  if (pathname === CERTIFICATIONS_BASE_PATH) {
    return { page: 'certifications' }
  }

  if (pathname.startsWith(`${CERTIFICATIONS_BASE_PATH}/`)) {
    const certificationSlug = decodeURIComponent(pathname.slice(CERTIFICATIONS_BASE_PATH.length + 1))
    if (certificationSlug) {
      return { page: 'certification-detail', certificationSlug }
    }
    return { page: 'certifications' }
  }

  if (pathname === CONTRIBUTIONS_BASE_PATH) {
    return { page: 'contributions' }
  }

  if (pathname.startsWith(`${CONTRIBUTIONS_BASE_PATH}/`)) {
    const contributionSlug = decodeURIComponent(pathname.slice(CONTRIBUTIONS_BASE_PATH.length + 1))
    if (contributionSlug) {
      return { page: 'contribution-detail', contributionSlug }
    }
    return { page: 'contributions' }
  }

  return { page: 'not-found', pathname }
}

export function isProjectRoute(locationRef: Pick<Location, 'pathname'> = window.location) {
  const pathname = normalizePathname(locationRef.pathname)
  return pathname === PROJECTS_BASE_PATH || pathname.startsWith(`${PROJECTS_BASE_PATH}/`)
}

export function dispatchPortfolioRouteChange() {
  window.dispatchEvent(new Event(PORTFOLIO_ROUTE_EVENT))
}

export function navigateTo(path: string, options?: { replace?: boolean }) {
  const targetPath = normalizePathname(path)
  const method = options?.replace ? 'replaceState' : 'pushState'

  window.history[method]({}, '', targetPath)
  dispatchPortfolioRouteChange()
}
