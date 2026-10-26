import { UserLogin } from '~/utils/UserLogin'
import { usersTable } from '~~/server/db/schema'

// Compared against for unknown users, so the response time doesn't reveal them
const dummyPasswordHash =
  '$2b$10$CwTycUXWue0Thq9StjUM0uJ8DPLKXt1FYlwYpaW9xr9Shz6mV7c5e'

export default defineEventHandler(async (event) => {
  const body = await readBody<UserLogin>(event)

  if (!body.username || !body.password) {
    setResponseStatus(event, 400)
    return {
      success: false,
      message: 'Invalid request'
    }
  }

  const ip = getClientIp(event)

  if (
    (await getRateLimitCount(
      rateLimitRules.loginFailuresPerUser,
      body.username
    )) >= rateLimitRules.loginFailuresPerUser.limit
  ) {
    throwTooManyRequests(event, rateLimitRules.loginFailuresPerUser)
  }
  if (
    ip &&
    (await getRateLimitCount(rateLimitRules.loginFailuresPerIp, ip)) >=
      rateLimitRules.loginFailuresPerIp.limit
  ) {
    throwTooManyRequests(event, rateLimitRules.loginFailuresPerIp)
  }

  const drizzle = useDrizzle()

  const existingUser = await drizzle.query.usersTable.findFirst({
    where: eq(usersTable.username, body.username)
  })

  const validPassword = await comparePassword(
    body.password,
    existingUser?.password ?? dummyPasswordHash
  )

  if (!existingUser || !validPassword) {
    await consumeRateLimit(rateLimitRules.loginFailuresPerUser, body.username)
    if (ip) {
      await consumeRateLimit(rateLimitRules.loginFailuresPerIp, ip)
    }

    setResponseStatus(event, 401)
    return {
      success: false,
      message: 'Invalid username or password'
    }
  }

  return {
    success: true,
    token: existingUser.authToken
  }
})
