import { v4 } from 'uuid'
import { UserLogin } from '~/utils/UserLogin'
import { users } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody<UserLogin>(event)

  if (!body.username || !body.password) {
    setResponseStatus(event, 400)
    return {
      success: false,
      message: 'Invalid request'
    }
  }
  const drizzle = useDrizzle()

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
    role: 'student',
    authToken
  })

  return {
    success: true,
    token: authToken
  }
})
