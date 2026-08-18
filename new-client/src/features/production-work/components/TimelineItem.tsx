import { motion } from 'framer-motion'
import type { CSSProperties, MouseEvent } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'

import { buildExperiencePath } from '../../../app/navigation'
import type { ProductionWorkEntry } from '../types'

type TimelineItemProps = {
  entry: ProductionWorkEntry
  index: number
  total: number
  onOpenExperience: (experienceSlug: string) => void
}

export function TimelineItem({ entry, index, total, onOpenExperience }: TimelineItemProps) {
  const path = buildExperiencePath(entry.slug)
  const progress = total <= 1 ? 0 : (index / (total - 1)) * 100

  function onExperienceLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    event.preventDefault()
    onOpenExperience(entry.slug)
  }

  return (
    <motion.li
      className="experience-roadmap__stop"
      style={{ '--stop-progress': `${progress}%` } as CSSProperties}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.32, delay: index * 0.08 }}
    >
      <button type="button" className="experience-roadmap__node" onClick={() => onOpenExperience(entry.slug)}>
        <img src={entry.companyLogo} alt={`${entry.company} logo`} />
      </button>
      <div className="experience-roadmap__copy">
        <span className="experience-roadmap__phase">0{total - index}</span>
        <h3>{entry.company}</h3>
        <p>{entry.position}</p>
        <div className="experience-roadmap__meta">
          <span>{entry.experienceType}</span>
          <span>{entry.duration}</span>
          <span>{entry.location}</span>
        </div>
        <a href={path} className="experience-roadmap__link" onClick={onExperienceLinkClick}>
          Open experience <FaArrowRightLong />
        </a>
      </div>
    </motion.li>
  )
}
