// In-memory anti-spam guards for the contact form (rate limiting, duplicate
// submissions, minimum time-to-submit).
//
// This deliberately does NOT use a database. The project has Postgres
// available (Neon, via Prisma — see prisma/schema.prisma), which would give
// a shared, cross-instance store, but adding a new table for this requires
// running a real migration against production, and that can't be verified
// or performed from this environment. Shipping code that depends on a
// migration nobody has confirmed would risk silently breaking every real
// submission if the table doesn't exist. An in-memory Map needs no new
// infrastructure and can't fail that way.
//
// The tradeoff: this is best-effort per serverless instance. It resets on
// cold start and isn't shared across concurrent instances, so a determined
// attacker spread across many requests could see a higher effective limit
// than RATE_LIMIT_MAX suggests. For a low-traffic contact form this is a
// reasonable starting point — if spam becomes a real problem, the natural
// upgrade path is a Postgres-backed table using the same Prisma client
// already used for accounts and orders.

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT_MAX = 5 // max submissions per identifier per window

const DUPLICATE_WINDOW_MS = 5 * 60 * 1000 // 5 minutes

const MIN_SUBMIT_MS = 3000 // fastest a real visitor could plausibly fill and submit the form

const rateLimitStore = new Map<string, number[]>() // identifier -> submission timestamps
const duplicateStore = new Map<string, number>() // email+message hash -> last-seen timestamp

/** True if `identifier` (typically an IP) is still within its rate limit. Records the attempt either way. */
export function checkRateLimit(identifier: string): boolean {
  const now = Date.now()

  // Opportunistic cleanup — cheap at this traffic volume, keeps the map
  // from growing unbounded over a long-lived instance.
  for (const [key, timestamps] of rateLimitStore) {
    const fresh = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
    if (fresh.length === 0) rateLimitStore.delete(key)
    else rateLimitStore.set(key, fresh)
  }

  const timestamps = rateLimitStore.get(identifier) ?? []
  if (timestamps.length >= RATE_LIMIT_MAX) {
    return false
  }
  timestamps.push(now)
  rateLimitStore.set(identifier, timestamps)
  return true
}

/** True if this (email, message) pair hasn't been submitted within the duplicate window. */
export function checkDuplicate(email: string, message: string): boolean {
  const now = Date.now()

  for (const [key, ts] of duplicateStore) {
    if (now - ts > DUPLICATE_WINDOW_MS) duplicateStore.delete(key)
  }

  const key = `${email.trim().toLowerCase()}::${message.trim().toLowerCase()}`
  if (duplicateStore.has(key)) {
    return false
  }
  duplicateStore.set(key, now)
  return true
}

/** True if the submission arrived faster than a human could plausibly have filled the form. */
export function isSubmittedTooFast(renderedAt: number): boolean {
  return Date.now() - renderedAt < MIN_SUBMIT_MS
}
