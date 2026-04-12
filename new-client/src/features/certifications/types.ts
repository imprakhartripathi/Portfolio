export type CertificationRecord = {
  id: string
  slug: string
  title: string
  provider: string
  issued?: string
  credentialId?: string
  credentialUrl?: string
  pdfFileName?: string
  skills?: string[]
}

