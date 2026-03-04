import { motion } from 'framer-motion'

import type { ProductionWorkEntry } from '../types'

type TimelineItemProps = {
  entry: ProductionWorkEntry
  index: number
  isLast: boolean
}

export function TimelineItem({ entry, index, isLast }: TimelineItemProps) {
  return (
    <motion.li className="timeline-item" whileHover={{ y: -2 }} transition={{ duration: 0.18 }}>
      <div className="timeline-item__rail" aria-hidden="true">
        <span className="timeline-item__node">{index + 1}</span>
        {!isLast ? <span className="timeline-item__line" /> : null}
      </div>

      <article className="timeline-card timeline-card--lively">
        <header className="timeline-card__header">
          <div className="timeline-card__identity">
            {entry.logo ? <img src={entry.logo} alt={`${entry.company} logo`} className="timeline-card__logo" /> : null}
            <div>
              <h3 className="timeline-card__role">
                {entry.company} - {entry.role}
              </h3>
              <p className="timeline-card__period">{entry.period}</p>
            </div>
          </div>
          <p className="timeline-card__focus-tag">{entry.focusTag}</p>
        </header>

        <ul className="timeline-card__highlights">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <div className="timeline-card__stack">
          {entry.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </article>
    </motion.li>
  )
}
