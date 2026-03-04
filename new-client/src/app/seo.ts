const SITE_URL = 'https://imprakhartripathi.in'
const DEFAULT_IMAGE = 'https://imprakhartripathi.in/myicon.png'
const ROUTE_SCHEMA_SCRIPT_ID = 'route-schema'

type SeoPayload = {
  title: string
  description: string
  path: string
  image?: string
  keywords?: string
  type?: 'website' | 'article'
  noindex?: boolean
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
}

function upsertMetaByName(name: string, content: string) {
  let element = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    document.head.append(element)
  }

  element.setAttribute('content', content)
}

function upsertMetaByProperty(property: string, content: string) {
  let element = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('property', property)
    document.head.append(element)
  }

  element.setAttribute('content', content)
}

function upsertCanonical(url: string) {
  let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.append(canonical)
  }

  canonical.setAttribute('href', url)
}

function setStructuredData(structuredData?: Record<string, unknown> | Array<Record<string, unknown>>) {
  const current = document.getElementById(ROUTE_SCHEMA_SCRIPT_ID)

  if (!structuredData) {
    current?.remove()
    return
  }

  const graphPayload = Array.isArray(structuredData) ? { '@context': 'https://schema.org', '@graph': structuredData } : structuredData

  let script = current as HTMLScriptElement | null

  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = ROUTE_SCHEMA_SCRIPT_ID
    document.head.append(script)
  }

  script.textContent = JSON.stringify(graphPayload)
}

function buildAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

export function applySeo(payload: SeoPayload) {
  const absoluteUrl = buildAbsoluteUrl(payload.path)
  const imageUrl = payload.image ?? DEFAULT_IMAGE
  const robotsValue = payload.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  document.title = payload.title

  upsertMetaByName('description', payload.description)
  upsertMetaByName('keywords', payload.keywords ?? 'Prakhar Tripathi, Backend Engineer, Full Stack Engineer, Portfolio')
  upsertMetaByName('robots', robotsValue)
  upsertMetaByName('googlebot', robotsValue)
  upsertMetaByName('twitter:title', payload.title)
  upsertMetaByName('twitter:description', payload.description)
  upsertMetaByName('twitter:image', imageUrl)

  upsertMetaByProperty('og:type', payload.type ?? 'website')
  upsertMetaByProperty('og:title', payload.title)
  upsertMetaByProperty('og:description', payload.description)
  upsertMetaByProperty('og:url', absoluteUrl)
  upsertMetaByProperty('og:image', imageUrl)

  upsertCanonical(absoluteUrl)
  setStructuredData(payload.structuredData)
}

export const seoConstants = {
  siteUrl: SITE_URL,
}
