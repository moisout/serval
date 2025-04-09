import { usersTable } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id')

  if (!userId) {
    setResponseStatus(event, 400)
    return {
      success: false,
      error: 'Missing user id'
    }
  }
  const drizzle = useDrizzle()

  const result = await drizzle
    .delete(usersTable)
    .where(eq(usersTable.id, userId))

  if (result?.success) {
    return {
      success: true,
      message: 'User deleted successfully'
    }
  }
  setResponseStatus(event, 400)
  return {
    success: false,
    error: 'Failed to delete user'
  }
})
