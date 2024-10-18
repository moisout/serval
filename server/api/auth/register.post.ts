import { DbUser } from '~/utils/DbUser'
import { UserLogin } from '~/utils/UserLogin'
import { v4 } from 'uuid'
import { getStorage } from '~/server/utils/storage'

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

  if (existingUser) {
    setResponseStatus(event, 400)
    return {
      success: false,
      message: 'User already exists'
    }
  }

  const newUser: DbUser = {
    id: v4(),
    username: body.username,
    password: await hashPassword(body.password),
    role: 'student',
    authToken: v4()
  }

  await storage.set('users', [...users, newUser])

  return {
    success: true,
    token: newUser.authToken
  }
})
