import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaArrowLeftLong, FaArrowUpRightFromSquare, FaFilePdf } from 'react-icons/fa6'

import { SectionWrapper } from '../../../layout/SectionWrapper'
import { useInViewReveal } from '../../../shared/hooks/useInViewReveal'
import { revealContainer, revealItem } from '../../../shared/motion/variants'
import { getCertificationPdfPath } from '../data'
import type { CertificationRecord } from '../types'

type CertificationDetailsPageProps = {
  certification: CertificationRecord
  onBack: () => void
}

type PdfAvailabilityState = 'none' | 'checking' | 'available' | 'missing'
type ProbedPdfState = { path: string; status: Exclude<PdfAvailabilityState, 'none'> } | null

export function CertificationDetailsPage({ certification, onBack }: CertificationDetailsPageProps) {
  const { ref, inView } = useInViewReveal({ threshold: 0.1, once: true })
  const pdfPath = getCertificationPdfPath(certification)
  const [probedPdf, setProbedPdf] = useState<ProbedPdfState>(null)
  const pdfAvailability: PdfAvailabilityState =
    !pdfPath ? 'none' : probedPdf?.path === pdfPath ? probedPdf.status : 'checking'

  useEffect(() => {
    if (!pdfPath) {
      return
    }
    const targetPath: string = pdfPath

    let ignore = false

    async function probePdf() {
      try {
        const response = await fetch(targetPath, { method: 'HEAD', cache: 'no-store' })
        const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''
        const isPdf = response.ok && contentType.includes('pdf')
        if (!ignore) {
          setProbedPdf({ path: targetPath, status: isPdf ? 'available' : 'missing' })
        }
      } catch {
        if (!ignore) {
          setProbedPdf({ path: targetPath, status: 'missing' })
        }
      }
    }

    probePdf()

    return () => {
      ignore = true
    }
  }, [pdfPath])

  return (
    <SectionWrapper
      id="certification-detail"
      eyebrow="Certification Detail"
      title={certification.title}
      description={certification.provider}
      className="certification-detail"
      bodyClassName="certification-detail__body"
      titleAs="h1"
    >
      <motion.div
        ref={ref}
        variants={revealContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="project-detail__stack"
      >
        <motion.div variants={revealItem} className="project-detail__top">
          <button type="button" className="link-btn link-btn--ghost" onClick={onBack}>
            <FaArrowLeftLong /> Back to Certifications
          </button>
          <div className="project-detail__external-links">
            {certification.credentialUrl ? (
              <a href={certification.credentialUrl} target="_blank" rel="noreferrer" className="link-btn link-btn--ghost">
                Credential <FaArrowUpRightFromSquare />
              </a>
            ) : null}
            {pdfPath && pdfAvailability === 'available' ? (
              <a href={pdfPath} target="_blank" rel="noreferrer" className="link-btn link-btn--ghost">
                Open PDF <FaFilePdf />
              </a>
            ) : null}
          </div>
        </motion.div>

        <motion.div variants={revealItem} className="project-detail__grid">
          <article className="project-detail__card">
            <h3>Provider</h3>
            <p>{certification.provider}</p>
          </article>
          <article className="project-detail__card">
            <h3>Issued</h3>
            <p>{certification.issued ?? 'Date not listed'}</p>
          </article>
        </motion.div>

        <motion.article variants={revealItem} className="project-detail__card">
          <h3>Credential ID</h3>
          <p>{certification.credentialId ?? 'Not listed'}</p>
        </motion.article>

        {certification.skills?.length ? (
          <motion.article variants={revealItem} className="project-detail__card">
            <h3>Skills</h3>
            <div className="certification-card__skills">
              {certification.skills.map((skill) => (
                <span key={skill} className="certification-skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </motion.article>
        ) : null}

        <motion.article variants={revealItem} className="project-detail__card certification-detail__viewer-card">
          <h3>Certificate PDF</h3>
          {pdfPath && pdfAvailability === 'available' ? (
            <div className="certification-detail__viewer">
              <iframe
                src={pdfPath}
                title={`${certification.title} PDF`}
                loading="lazy"
                className="certification-detail__pdf-frame"
              />
            </div>
          ) : null}

          {pdfPath && pdfAvailability === 'checking' ? (
            <p>Checking certificate PDF availability...</p>
          ) : null}

          {pdfPath && pdfAvailability === 'missing' ? (
            <div className="certification-detail__pdf-fallback">
              <h4>PDF Not Available Yet</h4>
              <p>
                This certificate entry exists, but the PDF file is not present in the public certifications directory.
              </p>
              <p>Expected file: {certification.pdfFileName}</p>
            </div>
          ) : null}

          {!pdfPath ? (
            <div className="certification-detail__pdf-fallback">
              <h4>PDF Not Linked</h4>
              <p>This certification currently has no PDF linked in the data source.</p>
            </div>
          ) : (
            null
          )}
        </motion.article>
      </motion.div>
    </SectionWrapper>
  )
}
