import { UserLogin } from '~/utils/UserLogin'
import { usersTable } from '~~/server/database/schema'

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

  const existingUser = await drizzle.query.usersTable.findFirst({
    where: eq(usersTable.username, body.username)
  })

  if (!existingUser) {
    setResponseStatus(event, 401)
    return {
      success: false,
      message: 'User not found'
    }
  }

  const validPassword = await comparePassword(
    body.password,
    existingUser.password
  )
  if (!validPassword) {
    setResponseStatus(event, 401)
    return {
      success: false,
      message: 'Invalid password'
    }
  }

  return {
    success: true,
    token: existingUser.authToken
  }
})
