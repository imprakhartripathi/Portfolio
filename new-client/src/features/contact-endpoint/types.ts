export type ContactEndpoint = {
  id: string
  label: string
  value: string
  href: string
}

export type ContactFormPayload = {
  name: string
  email: string
  subject: string
  message: string
}
