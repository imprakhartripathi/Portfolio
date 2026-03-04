import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa6'

import type { ContactEndpoint } from '../types'

type EndpointRowProps = {
  endpoint: ContactEndpoint
}

function getEndpointIcon(endpointId: string) {
  if (endpointId === 'email') return <FaEnvelope className="endpoint-row__icon" />
  if (endpointId === 'linkedin') return <FaLinkedin className="endpoint-row__icon" />
  if (endpointId === 'github') return <FaGithub className="endpoint-row__icon" />
  if (endpointId === 'phone') return <FaPhone className="endpoint-row__icon" />
  return <FaEnvelope className="endpoint-row__icon" />
}

export function EndpointRow({ endpoint }: EndpointRowProps) {
  const isExternal = endpoint.href.startsWith('http')

  return (
    <article className="endpoint-row endpoint-row--lively">
      <p className="endpoint-row__label">{endpoint.label}</p>
      <a
        className="endpoint-row__target"
        href={endpoint.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
      >
        {getEndpointIcon(endpoint.id)}
        <span>{endpoint.value}</span>
      </a>
    </article>
  )
}
