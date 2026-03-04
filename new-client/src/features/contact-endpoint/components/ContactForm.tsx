import { useState } from 'react'
import type { FormEvent } from 'react'

import type { ContactFormPayload } from '../types'

const initialState: ContactFormPayload = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function getApiBaseUrl() {
  const explicitBaseUrl = import.meta.env.VITE_API_BASE_URL
  if (explicitBaseUrl) {
    return explicitBaseUrl.replace(/\/$/, '')
  }

  return import.meta.env.DEV ? 'http://localhost:5000' : 'https://portfolio-backend-4hpl.onrender.com'
}

function validateForm(payload: ContactFormPayload) {
  if (!payload.name.trim() || !payload.email.trim() || !payload.subject.trim() || !payload.message.trim()) {
    return 'Please fill all fields.'
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    return 'Please enter a valid email address.'
  }

  if (payload.message.trim().length < 20) {
    return 'Message must be at least 20 characters.'
  }

  return null
}

export function ContactForm() {
  const [payload, setPayload] = useState<ContactFormPayload>(initialState)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  async function sendToEndpoint(url: string) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    let body: { message?: string } = {}
    try {
      body = (await response.json()) as { message?: string }
    } catch {
      body = {}
    }

    return { response, body }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationError = validateForm(payload)
    if (validationError) {
      setStatus('error')
      setFeedback(validationError)
      return
    }

    setStatus('sending')
    setFeedback('Sending message...')

    try {
      const baseUrl = getApiBaseUrl()
      let request = await sendToEndpoint(`${baseUrl}/api/contact`)

      if (request.response.status === 404) {
        request = await sendToEndpoint(`${baseUrl}/send-email`)
      }

      if (!request.response.ok) {
        throw new Error(request.body.message ?? 'Failed to send message.')
      }

      setStatus('success')
      setFeedback(request.body.message ?? 'Message sent successfully.')
      setPayload(initialState)
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Failed to send message.')
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <label htmlFor="contact-name">Name</label>
      <input
        id="contact-name"
        required
        value={payload.name}
        onChange={(event) => setPayload((previous) => ({ ...previous, name: event.target.value }))}
      />

      <label htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        type="email"
        required
        value={payload.email}
        onChange={(event) => setPayload((previous) => ({ ...previous, email: event.target.value }))}
      />

      <label htmlFor="contact-subject">Subject</label>
      <input
        id="contact-subject"
        required
        value={payload.subject}
        onChange={(event) => setPayload((previous) => ({ ...previous, subject: event.target.value }))}
      />

      <label htmlFor="contact-message">Message</label>
      <textarea
        id="contact-message"
        rows={5}
        required
        value={payload.message}
        onChange={(event) => setPayload((previous) => ({ ...previous, message: event.target.value }))}
      />

      <button type="submit" className="contact-form__submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Submit'}
      </button>

      {feedback ? (
        <p className={status === 'error' ? 'contact-form__feedback contact-form__feedback--error' : 'contact-form__feedback'}>
          {feedback}
        </p>
      ) : null}
    </form>
  )
}
