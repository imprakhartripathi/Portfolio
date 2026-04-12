import type { ReactElement } from 'react'
import { FaArrowRightLong, FaArrowUpRightFromSquare, FaFilePdf } from 'react-icons/fa6'
import { FaAward, FaGraduationCap } from 'react-icons/fa'
import { SiDatacamp, SiGoogle } from 'react-icons/si'

import { getCertificationPdfPath } from '../data'
import type { CertificationRecord } from '../types'

type CertificationCardProps = {
  certification: CertificationRecord
  onOpenCertification: (slug: string) => void
}

export function CertificationCard({ certification, onOpenCertification }: CertificationCardProps) {
  const pdfPath = getCertificationPdfPath(certification)
  const providerIcon = getProviderIconNode(certification.provider)

  return (
    <article className="certification-card">
      <div className="certification-card__layout">
        <div className="certification-card__provider-rail" aria-hidden="true">
          <span className="certification-card__provider-icon">
            {providerIcon}
          </span>
        </div>
        <div className="certification-card__body">
          <div className="certification-card__header">
            <h3 className="certification-card__title">{certification.title}</h3>
            <p className="certification-card__provider">{certification.provider}</p>
          </div>

          <div className="certification-card__meta">
            {certification.issued ? <p>Issued: {certification.issued}</p> : null}
            {certification.credentialId ? <p>Credential ID: {certification.credentialId}</p> : null}
          </div>

          {certification.skills?.length ? (
            <div className="certification-card__skills">
              {certification.skills.map((skill) => (
                <span key={skill} className="certification-skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          ) : null}

          <div className="certification-card__actions">
            <button type="button" className="link-btn" onClick={() => onOpenCertification(certification.slug)}>
              Full Details <FaArrowRightLong />
            </button>
            {certification.credentialUrl ? (
              <a href={certification.credentialUrl} target="_blank" rel="noreferrer" className="link-btn link-btn--ghost">
                Credential <FaArrowUpRightFromSquare />
              </a>
            ) : null}
            {pdfPath ? (
              <a href={pdfPath} target="_blank" rel="noreferrer" className="link-btn link-btn--ghost">
                PDF <FaFilePdf />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

function getProviderIconNode(provider: string): ReactElement {
  switch (provider.toLowerCase()) {
    case 'google':
      return <SiGoogle />
    case 'datacamp':
      return <SiDatacamp />
    case 'great learning':
      return <FaGraduationCap />
    case 'six sigma certification online in india':
      return <FaAward />
    default:
      return <FaAward />
  }
}
