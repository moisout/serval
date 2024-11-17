import { verifySession } from '~~/server/utils/verifySession'

export default defineEventHandler(async (event) => {
  const session = await verifySession(event)

  return {
    id: session.id,
    username: session.username,
    role: session.role
  }
})
