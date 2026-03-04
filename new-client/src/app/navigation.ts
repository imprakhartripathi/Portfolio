export const PORTFOLIO_ROUTE_EVENT = 'portfolio:routechange'

const PROJECTS_BASE_PATH = '/projects'

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
  | { page: 'not-found'; pathname: string }

export function buildProjectPath(projectId: string) {
  return `${PROJECTS_BASE_PATH}/${encodeURIComponent(projectId)}`
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
