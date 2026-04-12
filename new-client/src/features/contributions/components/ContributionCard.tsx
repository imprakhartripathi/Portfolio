import { FaArrowRightLong, FaNpm } from 'react-icons/fa6'

import type { ContributionItem } from '../types'

type ContributionCardProps = {
  item: ContributionItem
  onOpen: (slug: string) => void
}

export function ContributionCard({ item, onOpen }: ContributionCardProps) {
  return (
    <article className="contribution-card">
      <header className="contribution-card__header">
        <div>
          <h3 className="contribution-card__title">{item.title}</h3>
          <p className="contribution-card__package">{item.packageName}</p>
        </div>
        <span className={`contribution-card__status contribution-card__status--${item.status === 'Coming Soon' ? 'coming' : 'live'}`}>
          {item.status}
        </span>
      </header>

      <p className="contribution-card__summary">{item.shortSummary}</p>

      <div className="contribution-card__tech">
        {item.techStack.slice(0, 5).map((tech) => (
          <span key={tech} className="certification-skill-pill">
            {tech}
          </span>
        ))}
      </div>

      <div className="contribution-card__actions">
        <button type="button" className="link-btn" onClick={() => onOpen(item.slug)}>
          Full Details <FaArrowRightLong />
        </button>
        {item.npmUrl ? (
          <a href={item.npmUrl} target="_blank" rel="noreferrer" className="link-btn link-btn--ghost">
            npm <FaNpm />
          </a>
        ) : null}
      </div>
    </article>
  )
}
