import { useEffect, useMemo, useState } from 'react'

import { CapabilityMatrixSection } from '../features/capability-matrix'
import { ContactEndpointSection } from '../features/contact-endpoint'
import { ProductionTimelineSection } from '../features/production-work'
import { SystemOverviewSection } from '../features/system-overview'
import { ProjectDetailsPage, systemsDesignedCases, SystemsDesignedSection } from '../features/systems-designed'

function readProjectIdFromSearch() {
  const params = new URLSearchParams(window.location.search)
  return params.get('project')
}

function setProjectIdInSearch(projectId: string | null) {
  const url = new URL(window.location.href)

  if (projectId) {
    url.searchParams.set('project', projectId)
  } else {
    url.searchParams.delete('project')
  }

  const query = url.searchParams.toString()
  const nextUrl = `${url.pathname}${query ? `?${query}` : ''}${url.hash}`
  window.history.pushState({}, '', nextUrl)
  window.dispatchEvent(new Event('portfolio:routechange'))
}

export function PortfolioRoutes() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() => readProjectIdFromSearch())

  useEffect(() => {
    const onPopState = () => {
      setActiveProjectId(readProjectIdFromSearch())
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const activeProject = useMemo(
    () => systemsDesignedCases.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId],
  )

  function openProject(projectId: string) {
    setProjectIdInSearch(projectId)
    setActiveProjectId(projectId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function closeProject() {
    setProjectIdInSearch(null)
    setActiveProjectId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (activeProject) {
    return <ProjectDetailsPage study={activeProject} onBack={closeProject} />
  }

  return (
    <>
      <SystemOverviewSection />
      <CapabilityMatrixSection />
      <ProductionTimelineSection />
      <SystemsDesignedSection onOpenProject={openProject} />
      <ContactEndpointSection />
    </>
  )
}
