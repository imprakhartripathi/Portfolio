import type { PropsWithChildren } from 'react'

import { cn } from '../shared/lib/cn'

type SectionWrapperProps = PropsWithChildren<{
  id: string
  eyebrow: string
  title: string
  description: string
  titleAs?: 'h1' | 'h2'
  className?: string
  bodyClassName?: string
}>

export function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  titleAs = 'h2',
  className,
  bodyClassName,
  children,
}: SectionWrapperProps) {
  const TitleTag = titleAs

  return (
    <section id={id} className={cn('section-wrapper', className)}>
      <header className="section-wrapper__header">
        <p className="section-wrapper__eyebrow">{eyebrow}</p>
        <TitleTag className="section-wrapper__title">{title}</TitleTag>
        {description ? <p className="section-wrapper__description">{description}</p> : null}
      </header>

      <div className={cn('section-wrapper__body', bodyClassName)}>{children}</div>
    </section>
  )
}
