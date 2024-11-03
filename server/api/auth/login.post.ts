import { UserLogin } from '~/utils/UserLogin'
import { DbUser } from '~/utils/DbUser'
import { getStorage } from '~~/server/utils/storage'

export default defineEventHandler(async (event) => {
  const body = await readBody<UserLogin>(event)

  const storage = getStorage()
  const users = (await storage.get<DbUser[]>('users')) || []

  if (!body.username || !body.password) {
    setResponseStatus(event, 400)
    return {
      success: false,
      message: 'Invalid request'
    }
  }

  const existingUser = users.find((user) => user.username === body.username)

  if (!existingUser) {
    setResponseStatus(event, 401)
    return {
      success: false,
      message: 'User not found'
    }
  }

  const validPassword = await comparePassword(
    body.password,
    existingUser!.password
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
    token: existingUser?.authToken
  }
})
