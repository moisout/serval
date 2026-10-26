import { v4 } from 'uuid'
import { UserRegistration } from '~/utils/UserRegistration'
import { accessCodesTable, usersTable } from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody<UserRegistration>(event)

  if (!body.username || !body.password || !body.accessCode) {
    throw createError({
      statusCode: 400,
      message: 'Bad request'
    })
  }

  const ip = getClientIp(event)

  if (ip) {
    if (
      (await getRateLimitCount(rateLimitRules.registerFailuresPerIp, ip)) >=
      rateLimitRules.registerFailuresPerIp.limit
    ) {
      throwTooManyRequests(event, rateLimitRules.registerFailuresPerIp)
    }
    if (
      (await getRateLimitCount(rateLimitRules.registerPerIp, ip)) >=
      rateLimitRules.registerPerIp.limit
    ) {
      throwTooManyRequests(event, rateLimitRules.registerPerIp)
    }
  }

  const drizzle = useDrizzle()

  const accessCode = await drizzle.query.accessCodesTable.findFirst({
    where: eq(accessCodesTable.code, body.accessCode)
  })

  if (!accessCode) {
    // Access codes are short, so guessing attempts are limited strictly
    if (ip) {
      await consumeRateLimit(rateLimitRules.registerFailuresPerIp, ip)
    }
    throw createError({
      statusCode: 403,
      message: 'Invalid access code'
    })
  }

  const existingUser = await drizzle.query.usersTable.findFirst({
    where: eq(usersTable.username, body.username)
  })

  if (existingUser) {
    setResponseStatus(event, 400)
    return {
      success: false,
      message: 'User already exists'
    }
  }

  if (ip) {
    await consumeRateLimit(rateLimitRules.registerPerIp, ip)
  }

  const authToken = v4()

  await drizzle.insert(usersTable).values({
    id: v4(),
    username: body.username,
    password: await hashPassword(body.password),
    role: accessCode.role,
    authToken
  })

  return {
    success: true,
    token: authToken
  }
})
