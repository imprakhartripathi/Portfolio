import type { ContactMethod } from '../types'

type ContactMethodCardProps = {
  method: ContactMethod
}

export function ContactMethodCard({ method }: ContactMethodCardProps) {
  const isExternal = method.href.startsWith('http')
  const Icon = method.icon

  return (
    <a
      className="contact-method-card"
      href={method.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      <span className="contact-method-card__icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="contact-method-card__meta">
        <span className="contact-method-card__label">{method.label}</span>
        <span className="contact-method-card__value">{method.value}</span>
      </span>
      <span className="contact-method-card__description">{method.description}</span>
    </a>
  )
}
