import type { PropsWithChildren, ReactNode } from 'react'

import { cn } from '../shared/lib/cn'

type SectionWrapperProps = PropsWithChildren<{
  id: string
  eyebrow: string
  title: string
  description: string
  titleAs?: 'h1' | 'h2'
  className?: string
  bodyClassName?: string
  headerAction?: ReactNode
}>

export function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  titleAs = 'h2',
  className,
  bodyClassName,
  headerAction,
  children,
}: SectionWrapperProps) {
  const TitleTag = titleAs

  return (
    <section id={id} className={cn('section-wrapper', className)}>
      <header className="section-wrapper__header">
        <div className="section-wrapper__header-copy">
          <p className="section-wrapper__eyebrow">{eyebrow}</p>
          <TitleTag className="section-wrapper__title">{title}</TitleTag>
          {description ? <p className="section-wrapper__description">{description}</p> : null}
        </div>
        {headerAction ? <div className="section-wrapper__header-action">{headerAction}</div> : null}
      </header>

      <div className={cn('section-wrapper__body', bodyClassName)}>{children}</div>
    </section>
  )
}
