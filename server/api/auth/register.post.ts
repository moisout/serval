import { v4 } from 'uuid'
import { UserRegistration } from '~/utils/UserRegistration'
import { accessCodes, users } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody<UserRegistration>(event)

  if (!body.username || !body.password || !body.accessCode) {
    throw createError({
      statusCode: 400,
      message: 'Bad request'
    })
  }

  const drizzle = useDrizzle()

  const accessCode = await drizzle.query.accessCodes.findFirst({
    where: eq(accessCodes.code, body.accessCode)
  })

  if (!accessCode) {
    throw createError({
      statusCode: 403,
      message: 'Invalid access code'
    })
  }

  const existingUser = await drizzle.query.users.findFirst({
    where: eq(users.username, body.username)
  })

  if (existingUser) {
    setResponseStatus(event, 400)
    return {
      success: false,
      message: 'User already exists'
    }
  }

  const authToken = v4()

  await drizzle.insert(users).values({
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
