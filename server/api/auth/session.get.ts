import { users } from '~~/server/database/schema'
import { getStorage } from '~~/server/utils/storage'

export default defineEventHandler(async (event) => {
  const auth = event.headers.get('Authorization')

  const authToken = auth?.split('Bearer ')[1]

  if (!authToken) {
    setResponseStatus(event, 401)

    return {
      success: false,
      error: 'Unauthorized'
    }
  }
  const drizzle = useDrizzle()

  const user = await drizzle.query.users.findFirst({
    where: eq(users.authToken, authToken)
  })

  if (!user) {
    setResponseStatus(event, 401)

    return {
      success: false,
      error: 'Unauthorized'
    }
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role
  }
})
