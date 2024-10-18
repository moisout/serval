import { getStorage } from '~/server/utils/storage'
import { DbUser } from '~/utils/DbUser'

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

  const storage = getStorage()

  const users = (await storage.get<DbUser[]>('users')) || []
  const user = users.find((user) => user.authToken === authToken)

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
