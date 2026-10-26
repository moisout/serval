export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api/')) {
    return
  }

  const ip = getClientIp(event)
  if (!ip) {
    return
  }

  await enforceRateLimit(event, rateLimitRules.api, ip)
})
