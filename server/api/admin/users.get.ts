import { DbUser } from '~/utils/DbUser'

export default defineEventHandler(async (event) => {
  const storage = getStorage()

  const users = await storage.get<DbUser[]>('users')

  return users?.map((user) => ({
    id: user.id,
    username: user.username,
    role: user.role
  }))
})
