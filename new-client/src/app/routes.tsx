import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { certifications, getCertificationBySlug, getCertificationPdfPath } from '../features/certifications'
import {
  contributionItems,
  getContributionBySlug,
  npmProfileUrl,
  sculptorNpmOrgUrl,
  sculptorRepoUrl,
} from '../features/contributions'
import { ContactEndpointSection } from '../features/contact-endpoint'
import { SystemOverviewSection } from '../features/system-overview'
import { systemsDesignedCases } from '../features/systems-designed/data'
import { SectionWrapper } from '../layout/SectionWrapper'
import { useInViewport } from '../shared/hooks/useInViewport'

import {
  buildContributionPath,
  buildContributionGuidePath,
  buildCertificationPath,
  buildProjectPath,
  navigateTo,
  PORTFOLIO_ROUTE_EVENT,
  readRouteFromLocation,
  type PortfolioRoute,
} from './navigation'
import { applySeo, seoConstants } from './seo'

const LazyCapabilityMatrixSection = lazy(() =>
  import('../features/capability-matrix/components/CapabilityMatrixSection').then((module) => ({
    default: module.CapabilityMatrixSection,
  })),
)

const LazyProductionTimelineSection = lazy(() =>
  import('../features/production-work/components/ProductionTimelineSection').then((module) => ({
    default: module.ProductionTimelineSection,
  })),
)

const LazySystemsDesignedSection = lazy(() =>
  import('../features/systems-designed/components/SystemsDesignedSection').then((module) => ({
    default: module.SystemsDesignedSection,
  })),
)

const LazyProjectDetailsPage = lazy(() =>
  import('../features/systems-designed/components/ProjectDetailsPage').then((module) => ({
    default: module.ProjectDetailsPage,
  })),
)

const LazyCertificationsPage = lazy(() =>
  import('../features/certifications/components/CertificationsPage').then((module) => ({
    default: module.CertificationsPage,
  })),
)

const LazyCertificationDetailsPage = lazy(() =>
  import('../features/certifications/components/CertificationDetailsPage').then((module) => ({
    default: module.CertificationDetailsPage,
  })),
)

const LazyContributionsPage = lazy(() =>
  import('../features/contributions/components/ContributionsPage').then((module) => ({
    default: module.ContributionsPage,
  })),
)

const LazyContributionDetailsPage = lazy(() =>
  import('../features/contributions/components/ContributionDetailsPage').then((module) => ({
    default: module.ContributionDetailsPage,
  })),
)

const LazySculptorProductPage = lazy(() =>
  import('../features/contributions/components/SculptorProductPage').then((module) => ({
    default: module.SculptorProductPage,
  })),
)

const LazySculptorGuidePage = lazy(() =>
  import('../features/contributions/components/SculptorGuidePage').then((module) => ({
    default: module.SculptorGuidePage,
  })),
)

const LazySculptorSpotlightSection = lazy(() =>
  import('../features/contributions/components/SculptorSpotlightSection').then((module) => ({
    default: module.SculptorSpotlightSection,
  })),
)

const homeDescription =
  'Backend-focused full-stack engineer designing production-grade backend systems with transactional safety, role-aware access boundaries, and reliable deployments.'

const projectsDescription =
  'Domain-driven backend project portfolio covering Pharmetrix, Riwayat, Spendly, and Sahyogi with architecture decisions, outcomes, and production-focused stacks.'

const certificationsDescription =
  'Professional certifications from Google, DataCamp, Six Sigma, and Great Learning with credential IDs, verification links, and in-page PDF records.'

const contributionsDescription =
  'Open-source npm contributions including backend and frontend scaffolding CLIs and the upcoming Sculptor TS framework direction.'

const sculptorDescription =
  'Sculptor TS is a beta Express framework with a compact package split, config-driven runtime behavior, and a practical CLI workflow.'

const sculptorGuideDescription =
  'Sculptor TS documentation covering package architecture, routing styles, configuration, runtime flow, and command workflow.'

const pharmetrixDescription =
  'Pharmetrix is a pharmaceutical inventory and POS platform for batch-aware stock control, FEFO dispensing, cold-chain monitoring, and edge-cloud synchronization.'

type NotFoundPageProps = {
  pathname: string
  onGoHome: () => void
}

type DeferredViewportMountProps = {
  anchorId: string
  children: ReactNode
  rootMargin?: string
  minHeight?: number
}

function DeferredViewportMount({ anchorId, children, rootMargin = '0px 0px', minHeight = 180 }: DeferredViewportMountProps) {
  const { ref, isInViewport } = useInViewport<HTMLDivElement>({
    rootMargin,
    threshold: 0.01,
    once: true,
  })

  return (
    <div
      id={anchorId}
      ref={ref}
      className="deferred-section-anchor"
      style={isInViewport ? undefined : { minHeight }}
    >
      {isInViewport ? children : null}
    </div>
  )
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
            <a href="/certifications" className="link-btn link-btn--ghost">
              View Certifications
            </a>
            <a href="/contributions" className="link-btn link-btn--ghost">
              View Contributions
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

  const activeCertification = useMemo(
    () => (route.page === 'certification-detail' ? getCertificationBySlug(route.certificationSlug) : null),
    [route],
  )

  const activeContribution = useMemo(
    () =>
      route.page === 'contribution-detail' || route.page === 'contribution-guide'
        ? getContributionBySlug(route.contributionSlug)
        : null,
    [route],
  )
  const isSculptorContribution = activeContribution?.slug === 'sculptor-ts'

  useEffect(() => {
    if (route.page === 'home') {
      applySeo({
        title: 'Prakhar Tripathi | Backend-Focused Full-Stack Engineer',
        description: homeDescription,
        path: '/',
        priority: 'high',
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

    if (route.page === 'certifications') {
      applySeo({
        title: 'Certifications | Prakhar Tripathi',
        description: certificationsDescription,
        path: '/certifications',
        keywords:
          'Prakhar Tripathi certifications, Google AI certificates, Coursera certificates, DataCamp certification, Six Sigma, Great Learning',
        structuredData: [
          {
            '@type': 'CollectionPage',
            '@id': `${seoConstants.siteUrl}/certifications#collection`,
            name: 'Certifications | Prakhar Tripathi',
            url: `${seoConstants.siteUrl}/certifications`,
            description: certificationsDescription,
            inLanguage: 'en-IN',
            about: {
              '@type': 'Person',
              name: 'Prakhar Tripathi',
              url: seoConstants.siteUrl,
            },
          },
          {
            '@type': 'ItemList',
            itemListElement: certifications.map((certification, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: certification.title,
              url: `${seoConstants.siteUrl}${buildCertificationPath(certification.slug)}`,
            })),
          },
        ],
      })
      return
    }

    if (route.page === 'contributions') {
      applySeo({
        title: 'My Contributions | Prakhar Tripathi',
        description: contributionsDescription,
        path: '/contributions',
        keywords:
          'Prakhar Tripathi npm, scafollder, reactron, sculptor ts, routesculpt, express framework, open source contributions',
        structuredData: [
          {
            '@type': 'CollectionPage',
            '@id': `${seoConstants.siteUrl}/contributions#collection`,
            name: 'My Contributions | Prakhar Tripathi',
            url: `${seoConstants.siteUrl}/contributions`,
            description: contributionsDescription,
            inLanguage: 'en-IN',
            about: {
              '@type': 'Person',
              name: 'Prakhar Tripathi',
              url: seoConstants.siteUrl,
              sameAs: [npmProfileUrl],
            },
          },
          {
            '@type': 'ItemList',
            itemListElement: contributionItems.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.title,
              url: `${seoConstants.siteUrl}${buildContributionPath(item.slug)}`,
            })),
          },
        ],
      })
      return
    }

    if (route.page === 'contribution-detail' && activeContribution) {
      const contributionPath = buildContributionPath(activeContribution.slug)

      if (activeContribution.slug === 'sculptor-ts') {
        applySeo({
          title: 'Sculptor TS | Express Framework by Prakhar Tripathi',
          description: sculptorDescription,
          path: contributionPath,
          priority: 'high',
          type: 'website',
          keywords:
            'Sculptor TS, Express framework, TypeScript backend framework, @sculptor/core, @sculptor/router, @sculptor/config, @sculptor/cli, npm, backend tooling',
          structuredData: [
            {
              '@type': 'SoftwareApplication',
              name: 'Sculptor TS',
              description: sculptorDescription,
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Cross-platform',
              url: `${seoConstants.siteUrl}${contributionPath}`,
              author: {
                '@type': 'Person',
                name: 'Prakhar Tripathi',
                url: seoConstants.siteUrl,
              },
              sameAs: [sculptorRepoUrl, sculptorNpmOrgUrl],
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
                  name: 'My Contributions',
                  item: `${seoConstants.siteUrl}/contributions`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Sculptor TS',
                  item: `${seoConstants.siteUrl}${contributionPath}`,
                },
              ],
            },
          ],
        })
        return
      }

      applySeo({
        title: `${activeContribution.title} | My Contributions`,
        description: activeContribution.shortSummary,
        path: contributionPath,
        type: 'article',
        keywords: `${activeContribution.title}, ${activeContribution.packageName}, ${activeContribution.keywords.join(', ')}`,
        structuredData: [
          {
            '@type': 'SoftwareSourceCode',
            name: activeContribution.title,
            description: activeContribution.description,
            url: `${seoConstants.siteUrl}${contributionPath}`,
            codeRepository: activeContribution.npmUrl ?? npmProfileUrl,
            programmingLanguage: activeContribution.techStack,
            author: {
              '@type': 'Person',
              name: 'Prakhar Tripathi',
              url: seoConstants.siteUrl,
            },
            keywords: activeContribution.keywords.join(', '),
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
                name: 'My Contributions',
                item: `${seoConstants.siteUrl}/contributions`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: activeContribution.title,
                item: `${seoConstants.siteUrl}${contributionPath}`,
              },
            ],
          },
        ],
      })
      return
    }

    if (route.page === 'contribution-guide' && activeContribution && isSculptorContribution) {
      const contributionPath = buildContributionPath(activeContribution.slug)
      const guidePath = buildContributionGuidePath(activeContribution.slug)

      applySeo({
        title: 'Sculptor TS Guide | Documentation & Architecture',
        description: sculptorGuideDescription,
        path: guidePath,
        priority: 'high',
        type: 'article',
        keywords:
          'Sculptor TS guide, framework documentation, Express framework, TypeScript backend framework, @sculptor/core, @sculptor/router, @sculptor/config, @sculptor/cli, architecture',
        structuredData: [
          {
            '@type': 'TechArticle',
            name: 'Sculptor TS Guide',
            description: sculptorGuideDescription,
            url: `${seoConstants.siteUrl}${guidePath}`,
            author: {
              '@type': 'Person',
              name: 'Prakhar Tripathi',
              url: seoConstants.siteUrl,
            },
            about: {
              '@type': 'SoftwareApplication',
              name: activeContribution.title,
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Cross-platform',
              url: `${seoConstants.siteUrl}${contributionPath}`,
            },
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
                name: 'My Contributions',
                item: `${seoConstants.siteUrl}/contributions`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: activeContribution.title,
                item: `${seoConstants.siteUrl}${contributionPath}`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Guide',
                item: `${seoConstants.siteUrl}${guidePath}`,
              },
            ],
          },
        ],
      })
      return
    }

    if (route.page === 'contribution-guide') {
      applySeo({
        title: 'Guide Not Found | Prakhar Tripathi',
        description: 'The requested Sculptor guide page does not exist.',
        path: `/contributions/${route.contributionSlug}/guide`,
        noindex: true,
      })
      return
    }

    if (route.page === 'contribution-detail') {
      applySeo({
        title: 'Contribution Not Found | Prakhar Tripathi',
        description: 'The requested contribution page does not exist.',
        path: `/contributions/${route.contributionSlug}`,
        noindex: true,
      })
      return
    }

    if (route.page === 'certification-detail' && activeCertification) {
      const certificationPath = buildCertificationPath(activeCertification.slug)
      const pdfPath = getCertificationPdfPath(activeCertification)

      applySeo({
        title: `${activeCertification.title} | Certification`,
        description: `${activeCertification.title} by ${activeCertification.provider}${activeCertification.credentialId ? `. Credential ID: ${activeCertification.credentialId}.` : '.'}`,
        path: certificationPath,
        type: 'article',
        keywords: `${activeCertification.title}, ${activeCertification.provider}, credential, certification, Prakhar Tripathi`,
        structuredData: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: activeCertification.title,
            credentialCategory: 'Professional Certification',
            recognizedBy: {
              '@type': 'Organization',
              name: activeCertification.provider,
            },
            identifier: activeCertification.credentialId,
            url: activeCertification.credentialUrl ?? `${seoConstants.siteUrl}${certificationPath}`,
            inLanguage: 'en-IN',
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
                name: 'Certifications',
                item: `${seoConstants.siteUrl}/certifications`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: activeCertification.title,
                item: `${seoConstants.siteUrl}${certificationPath}`,
              },
            ],
          },
          {
            '@type': 'WebPage',
            '@id': `${seoConstants.siteUrl}${certificationPath}#webpage`,
            url: `${seoConstants.siteUrl}${certificationPath}`,
            name: `${activeCertification.title} | Certification`,
            isPartOf: {
              '@type': 'WebSite',
              url: seoConstants.siteUrl,
            },
            primaryImageOfPage: pdfPath ? `${seoConstants.siteUrl}${pdfPath}` : undefined,
          },
        ],
      })
      return
    }

    if (route.page === 'certification-detail') {
      applySeo({
        title: 'Certification Not Found | Prakhar Tripathi',
        description: 'The requested certification page does not exist.',
        path: `/certifications/${route.certificationSlug}`,
        noindex: true,
      })
      return
    }

    if (route.page === 'project-detail' && activeProject) {
      const projectPath = buildProjectPath(activeProject.id)

      if (activeProject.id === 'pharmetrix') {
        applySeo({
          title: 'Pharmetrix | Pharmaceutical Inventory & POS Platform',
          description: pharmetrixDescription,
          path: projectPath,
          priority: 'high',
          image: `${seoConstants.siteUrl}${activeProject.icon}`,
          type: 'article',
          keywords:
            'Pharmetrix, pharmaceutical inventory system, POS platform, FEFO, cold-chain monitoring, edge-cloud synchronization, batch stock tracking, React, Node.js, Express',
          structuredData: [
            {
              '@type': 'SoftwareApplication',
              name: 'Pharmetrix',
              description: pharmetrixDescription,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              url: `${seoConstants.siteUrl}${projectPath}`,
              image: `${seoConstants.siteUrl}${activeProject.icon}`,
              author: {
                '@type': 'Person',
                name: 'Prakhar Tripathi',
                url: seoConstants.siteUrl,
              },
              sameAs: activeProject.liveUrl ? [activeProject.liveUrl] : undefined,
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
                  name: 'Pharmetrix',
                  item: `${seoConstants.siteUrl}${projectPath}`,
                },
              ],
            },
          ],
        })
        return
      }

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
  }, [route, activeProject, activeCertification, activeContribution, isSculptorContribution])

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

  function goCertifications() {
    navigateTo('/certifications')
    setRoute({ page: 'certifications' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goContributions() {
    navigateTo('/contributions')
    setRoute({ page: 'contributions' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openCertification(certificationSlug: string) {
    navigateTo(buildCertificationPath(certificationSlug))
    setRoute({ page: 'certification-detail', certificationSlug })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function closeCertification() {
    navigateTo('/certifications', { replace: true })
    setRoute({ page: 'certifications' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openContribution(contributionSlug: string) {
    navigateTo(buildContributionPath(contributionSlug))
    setRoute({ page: 'contribution-detail', contributionSlug })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openContributionGuide(contributionSlug: string) {
    navigateTo(buildContributionGuidePath(contributionSlug))
    setRoute({ page: 'contribution-guide', contributionSlug })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function closeContribution() {
    navigateTo('/contributions', { replace: true })
    setRoute({ page: 'contributions' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openContributionProduct(contributionSlug: string) {
    navigateTo(buildContributionPath(contributionSlug))
    setRoute({ page: 'contribution-detail', contributionSlug })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goHome() {
    navigateTo('/')
    setRoute({ page: 'home' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (route.page === 'project-detail' && activeProject) {
    return (
      <Suspense fallback={null}>
        <LazyProjectDetailsPage study={activeProject} onBack={closeProject} />
      </Suspense>
    )
  }

  if (route.page === 'project-detail' && !activeProject) {
    return <NotFoundPage pathname={`/projects/${route.projectId}`} onGoHome={goHome} />
  }

  if (route.page === 'certification-detail' && activeCertification) {
    return (
      <Suspense fallback={null}>
        <LazyCertificationDetailsPage certification={activeCertification} onBack={closeCertification} />
      </Suspense>
    )
  }

  if (route.page === 'certification-detail' && !activeCertification) {
    return <NotFoundPage pathname={`/certifications/${route.certificationSlug}`} onGoHome={goHome} />
  }

  if (route.page === 'contribution-detail' && activeContribution) {
    return (
      <Suspense fallback={null}>
        {isSculptorContribution ? (
        <LazySculptorProductPage
          onBack={closeContribution}
          onOpenContributions={goContributions}
          onOpenGuide={() => openContributionGuide(activeContribution.slug)}
        />
        ) : (
          <LazyContributionDetailsPage item={activeContribution} onBack={closeContribution} />
        )}
      </Suspense>
    )
  }

  if (route.page === 'contribution-guide' && activeContribution && isSculptorContribution) {
    return (
      <Suspense fallback={null}>
        <LazySculptorGuidePage
          contribution={activeContribution}
          onBackProduct={() => openContributionProduct(activeContribution.slug)}
          onOpenContributions={goContributions}
        />
      </Suspense>
    )
  }

  if (route.page === 'contribution-guide') {
    return <NotFoundPage pathname={`/contributions/${route.contributionSlug}/guide`} onGoHome={goHome} />
  }

  if (route.page === 'contribution-detail' && !activeContribution) {
    return <NotFoundPage pathname={`/contributions/${route.contributionSlug}`} onGoHome={goHome} />
  }

  if (route.page === 'contributions') {
    return (
      <Suspense fallback={null}>
        <LazyContributionsPage onOpenContribution={openContribution} />
      </Suspense>
    )
  }

  if (route.page === 'certifications') {
    return (
      <Suspense fallback={null}>
        <LazyCertificationsPage onOpenCertification={openCertification} />
      </Suspense>
    )
  }

  if (route.page === 'projects') {
    return (
      <Suspense fallback={null}>
        <LazySystemsDesignedSection
          onOpenProject={openProject}
          onBackHome={goHome}
          titleAs="h1"
          mode="list"
          sectionId="projects"
        />
      </Suspense>
    )
  }

  if (route.page === 'not-found') {
    return <NotFoundPage pathname={route.pathname} onGoHome={goHome} />
  }

  return (
    <>
      <SystemOverviewSection />
      <DeferredViewportMount anchorId="sculptor-spotlight" minHeight={240} rootMargin="140px 0px">
        <Suspense fallback={null}>
          <LazySculptorSpotlightSection
            onOpenSculptorPage={() => openContribution('sculptor-ts')}
            onOpenSculptorGuide={() => openContributionGuide('sculptor-ts')}
            sectionId="sculptor-spotlight-content"
          />
        </Suspense>
      </DeferredViewportMount>
      <DeferredViewportMount anchorId="technical-expertise" minHeight={480} rootMargin="220px 0px">
        <Suspense fallback={null}>
          <LazyCapabilityMatrixSection sectionId="technical-expertise-content" />
        </Suspense>
      </DeferredViewportMount>
      <DeferredViewportMount anchorId="experience" minHeight={320} rootMargin="0px 0px">
        <Suspense fallback={null}>
          <LazyProductionTimelineSection sectionId="experience-content" />
        </Suspense>
      </DeferredViewportMount>
      <DeferredViewportMount anchorId="projects" minHeight={280} rootMargin="0px 0px">
        <Suspense fallback={null}>
          <LazySystemsDesignedSection
            onOpenProject={openProject}
            onOpenProjectsPage={goProjects}
            onOpenCertificationsPage={goCertifications}
            mode="cta"
            sectionId="projects-content"
          />
        </Suspense>
      </DeferredViewportMount>
      <ContactEndpointSection />
    </>
  )
}
