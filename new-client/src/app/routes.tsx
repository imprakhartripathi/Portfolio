import { useEffect, useMemo, useState } from 'react'

import { CapabilityMatrixSection } from '../features/capability-matrix'
import { ContactEndpointSection } from '../features/contact-endpoint'
import { ProductionTimelineSection } from '../features/production-work'
import { SystemOverviewSection } from '../features/system-overview'
import { ProjectDetailsPage, systemsDesignedCases, SystemsDesignedSection } from '../features/systems-designed'
import { SectionWrapper } from '../layout/SectionWrapper'

import { buildProjectPath, navigateTo, PORTFOLIO_ROUTE_EVENT, readRouteFromLocation, type PortfolioRoute } from './navigation'
import { applySeo, seoConstants } from './seo'

const homeDescription =
  'Backend-focused full-stack engineer designing production-grade backend systems with transactional safety, role-aware access boundaries, and reliable deployments.'

const projectsDescription =
  'Domain-driven backend project portfolio covering Pharmetrix, Riwayat, Spendly, and Sahyogi with architecture decisions, outcomes, and production-focused stacks.'

type NotFoundPageProps = {
  pathname: string
  onGoHome: () => void
}

function NotFoundPage({ pathname, onGoHome }: NotFoundPageProps) {
  return (
    <SectionWrapper
      id="not-found"
      eyebrow="Error"
      title="Page Not Found"
      description={`No page exists at ${pathname}.`}
      className="project-detail"
      bodyClassName="project-detail__body"
      titleAs="h1"
    >
      <div className="project-detail__stack">
        <article className="project-detail__card">
          <h3>Try this instead</h3>
          <p>Use the homepage for full navigation, or open the projects index page.</p>
          <div className="project-detail__external-links">
            <button type="button" className="link-btn" onClick={onGoHome}>
              Back to Home
            </button>
            <a href="/projects" className="link-btn link-btn--ghost">
              View Projects
            </a>
          </div>
        </article>
      </div>
    </SectionWrapper>
  )
}

export function PortfolioRoutes() {
  const [route, setRoute] = useState<PortfolioRoute>(() => readRouteFromLocation())

  useEffect(() => {
    const syncRoute = () => setRoute(readRouteFromLocation())

    window.addEventListener('popstate', syncRoute)
    window.addEventListener(PORTFOLIO_ROUTE_EVENT, syncRoute as EventListener)

    return () => {
      window.removeEventListener('popstate', syncRoute)
      window.removeEventListener(PORTFOLIO_ROUTE_EVENT, syncRoute as EventListener)
    }
  }, [])

  const activeProject = useMemo(
    () => (route.page === 'project-detail' ? systemsDesignedCases.find((project) => project.id === route.projectId) ?? null : null),
    [route],
  )

  useEffect(() => {
    if (route.page === 'home') {
      applySeo({
        title: 'Prakhar Tripathi | Backend-Focused Full-Stack Engineer',
        description: homeDescription,
        path: '/',
        keywords:
          'Prakhar Tripathi, Backend Engineer, Full Stack Engineer, Node.js, Express, ASP.NET Core, MongoDB, MySQL, Docker, RBAC, JWT, Portfolio',
      })
      return
    }

    if (route.page === 'projects') {
      applySeo({
        title: 'Projects | Prakhar Tripathi',
        description: projectsDescription,
        path: '/projects',
        keywords:
          'Prakhar Tripathi projects, backend projects, pharmetrix, spendly, sahyogi, riwayat, nodejs portfolio, engineering case studies',
        structuredData: [
          {
            '@type': 'CollectionPage',
            '@id': `${seoConstants.siteUrl}/projects#collection`,
            name: 'Projects | Prakhar Tripathi',
            url: `${seoConstants.siteUrl}/projects`,
            description: projectsDescription,
            inLanguage: 'en-IN',
            about: {
              '@type': 'Person',
              name: 'Prakhar Tripathi',
              url: seoConstants.siteUrl,
            },
          },
          {
            '@type': 'ItemList',
            itemListElement: systemsDesignedCases.map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: project.name,
              url: `${seoConstants.siteUrl}${buildProjectPath(project.id)}`,
            })),
          },
        ],
      })
      return
    }

    if (route.page === 'project-detail' && activeProject) {
      const projectPath = buildProjectPath(activeProject.id)
      applySeo({
        title: `${activeProject.name} Project | Prakhar Tripathi`,
        description: `${activeProject.shortSummary} Domain: ${activeProject.domain}`,
        path: projectPath,
        image: `${seoConstants.siteUrl}${activeProject.icon}`,
        type: 'article',
        keywords: `${activeProject.name}, ${activeProject.techStack.join(', ')}, ${activeProject.skillTags.join(', ')}, backend architecture, case study`,
        structuredData: [
          {
            '@type': 'SoftwareSourceCode',
            name: activeProject.name,
            description: activeProject.shortSummary,
            codeRepository: activeProject.githubUrl,
            url: `${seoConstants.siteUrl}${projectPath}`,
            image: `${seoConstants.siteUrl}${activeProject.icon}`,
            author: {
              '@type': 'Person',
              name: 'Prakhar Tripathi',
              url: seoConstants.siteUrl,
            },
            programmingLanguage: activeProject.techStack,
            keywords: activeProject.skillTags.join(', '),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: seoConstants.siteUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Projects',
                item: `${seoConstants.siteUrl}/projects`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: activeProject.name,
                item: `${seoConstants.siteUrl}${projectPath}`,
              },
            ],
          },
        ],
      })
      return
    }

    if (route.page === 'project-detail') {
      applySeo({
        title: 'Project Not Found | Prakhar Tripathi',
        description: 'The requested project page does not exist.',
        path: `/projects/${route.projectId}`,
        noindex: true,
      })
      return
    }

    applySeo({
      title: 'Page Not Found | Prakhar Tripathi',
      description: 'This page does not exist on imprakhartripathi.in.',
      path: route.page === 'not-found' ? route.pathname : '/',
      noindex: true,
    })
  }, [route, activeProject])

  function openProject(projectId: string) {
    navigateTo(buildProjectPath(projectId))
    setRoute({ page: 'project-detail', projectId })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function closeProject() {
    navigateTo('/projects', { replace: true })
    setRoute({ page: 'projects' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goProjects() {
    navigateTo('/projects')
    setRoute({ page: 'projects' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goHome() {
    navigateTo('/')
    setRoute({ page: 'home' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (route.page === 'project-detail' && activeProject) {
    return <ProjectDetailsPage study={activeProject} onBack={closeProject} />
  }

  if (route.page === 'project-detail' && !activeProject) {
    return <NotFoundPage pathname={`/projects/${route.projectId}`} onGoHome={goHome} />
  }

  if (route.page === 'projects') {
    return <SystemsDesignedSection onOpenProject={openProject} onBackHome={goHome} titleAs="h1" mode="list" />
  }

  if (route.page === 'not-found') {
    return <NotFoundPage pathname={route.pathname} onGoHome={goHome} />
  }

  return (
    <>
      <SystemOverviewSection />
      <CapabilityMatrixSection />
      <ProductionTimelineSection />
      <SystemsDesignedSection onOpenProject={openProject} onOpenProjectsPage={goProjects} mode="cta" />
      <ContactEndpointSection />
    </>
  )
}
