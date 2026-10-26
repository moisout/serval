import type { H3Event } from 'h3'
import { rateLimitsTable } from '~~/server/db/schema'

interface RateLimitRule {
  name: string
  limit: number
  windowSeconds: number
}

// A school usually shares one IP, so per-IP limits must allow a whole class
export const rateLimitRules = {
  api: { name: 'api', limit: 2000, windowSeconds: 60 },
  loginFailuresPerUser: { name: 'login-user', limit: 5, windowSeconds: 900 },
  loginFailuresPerIp: { name: 'login-ip', limit: 30, windowSeconds: 900 },
  registerFailuresPerIp: {
    name: 'register-fail-ip',
    limit: 10,
    windowSeconds: 3600
  },
  registerPerIp: { name: 'register-ip', limit: 40, windowSeconds: 3600 },
  ttsGenerationsPerUser: { name: 'tts-user', limit: 300, windowSeconds: 3600 }
} satisfies Record<string, RateLimitRule>

// Internal SSR requests carry no client IP and are skipped
export const getClientIp = (event: H3Event) =>
  getRequestHeader(event, 'cf-connecting-ip') ?? getRequestIP(event)

const getWindow = (rule: RateLimitRule, key: string) => {
  const now = Math.floor(Date.now() / 1000)
  const window = Math.floor(now / rule.windowSeconds)

  return {
    key: `${rule.name}:${key}:${window}`,
    expiresAt: (window + 1) * rule.windowSeconds,
    now
  }
}

export const getRateLimitCount = async (rule: RateLimitRule, key: string) => {
  const window = getWindow(rule, key)

  const row = await useDrizzle().query.rateLimitsTable.findFirst({
    where: eq(rateLimitsTable.key, window.key)
  })

  return row?.count ?? 0
}

export const consumeRateLimit = async (rule: RateLimitRule, key: string) => {
  const window = getWindow(rule, key)
  const drizzle = useDrizzle()

  const [row] = await drizzle
    .insert(rateLimitsTable)
    .values({ key: window.key, count: 1, expiresAt: window.expiresAt })
    .onConflictDoUpdate({
      target: rateLimitsTable.key,
      set: { count: sql`${rateLimitsTable.count} + 1` }
    })
    .returning({ count: rateLimitsTable.count })

  // Occasionally clean up expired windows
  if (Math.random() < 0.01) {
    await drizzle
      .delete(rateLimitsTable)
      .where(sql`${rateLimitsTable.expiresAt} < ${window.now}`)
  }

  return row?.count ?? 0
}

export const throwTooManyRequests = (
  event: H3Event,
  rule: RateLimitRule
): never => {
  const { expiresAt, now } = getWindow(rule, '')
  setResponseHeader(event, 'Retry-After', String(expiresAt - now))

  throw createError({
    statusCode: 429,
    message: 'Too many requests'
  })
}

export const enforceRateLimit = async (
  event: H3Event,
  rule: RateLimitRule,
  key: string
) => {
  if ((await consumeRateLimit(rule, key)) > rule.limit) {
    throwTooManyRequests(event, rule)
  }
}
