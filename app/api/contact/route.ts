import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/lib/contact/schema'
import { checkDuplicate, checkRateLimit, isSubmittedTooFast } from '@/lib/contact/spamGuard'

// Contact form submission endpoint. Delivers to CONTACT_NOTIFICATION_EMAIL
// (defaults to contact@gsxok.com) via Resend, server-side only — the API
// key never reaches the browser.
//
// Layered anti-spam, in order: honeypot -> timing check -> rate limit ->
// duplicate check -> send. The honeypot and timing checks respond with the
// same `{ ok: true }` shape as a real success — a bot that trips either one
// gets no signal it was caught, so it has no reason to adapt. Rate-limit
// failures get a real error (a visitor being genuinely blocked should know
// it didn't go through); duplicate-submission failures get a success
// response, since the visitor's own message was already delivered the
// first time and telling them otherwise would just be confusing.

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_request' }, { status: 400 })
  }

  const parsed = contactFormSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_fields' }, { status: 400 })
  }

  const { name, email, phone, company, reason, message, renderedAt, gsxHpToken } = parsed.data

  // Honeypot — real visitors never see or fill this field.
  if (gsxHpToken) {
    return NextResponse.json({ ok: true })
  }

  // Minimum time-to-submit — rejects submissions that arrive faster than a
  // human could have read the form and typed a message.
  if (isSubmittedTooFast(renderedAt)) {
    return NextResponse.json({ ok: true })
  }

  const identifier = getClientIdentifier(request)

  if (!checkRateLimit(identifier)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }

  if (!checkDuplicate(email, message)) {
    return NextResponse.json({ ok: true })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set, cannot deliver message')
    return NextResponse.json({ ok: false, error: 'delivery_unavailable' }, { status: 503 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const to = process.env.CONTACT_NOTIFICATION_EMAIL || 'contact@gsxok.com'
    const from = process.env.EMAIL_FROM || 'GSX <contact@gsxok.com>'

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New contact form message: ${reason}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        company ? `Company: ${company}` : null,
        `Reason: ${reason}`,
        '',
        message,
      ]
        .filter((line): line is string => line !== null)
        .join('\n'),
    })

    if (error) {
      console.error('[contact] Resend error', error)
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error sending message', err)
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 500 })
  }
}
