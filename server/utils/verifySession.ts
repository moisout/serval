import { H3Event } from 'h3'
import { usersTable } from '~~/server/database/schema'

export const verifySession = async (event: H3Event) => {
  const auth = event.headers.get('Authorization')

  let authToken = auth?.split('Bearer ')[1]

  if (!authToken) {
    authToken = getCookie(event, 'auth.token')
  }

  if (!authToken) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
  const drizzle = useDrizzle()

  const user = await drizzle.query.usersTable.findFirst({
    where: eq(usersTable.authToken, authToken)
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role
  }
}
