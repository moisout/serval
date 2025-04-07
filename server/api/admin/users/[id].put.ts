import { usersTable } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const session = await requireTeacherSession(event)

  const userId = getRouterParam(event, 'id')

  if (!userId) {
    setResponseStatus(event, 400)
    return {
      success: false,
      error: 'Missing user id'
    }
  }

  const drizzle = useDrizzle()
  const existingUser = await drizzle.query.usersTable.findFirst({
    where: eq(usersTable.id, userId)
  })
  if (!existingUser) {
    setResponseStatus(event, 404)
    return {
      success: false,
      error: 'User not found'
    }
  }

  const body = await readBody(event)

  const userToUpdate = {
    ...existingUser
  }

  if (body.username) {
    userToUpdate.username = body.username
  }
  if (body.role) {
    userToUpdate.role = body.role
  }

  const updateResults = await drizzle
    .update(usersTable)
    .set({
      username: userToUpdate.username,
      role: userToUpdate.role
    })
    .where(eq(usersTable.id, userId))

  if (updateResults.success) {
    return {
      success: true,
      message: 'User updated successfully'
    }
  }

  setResponseStatus(event, 500)
  return {
    success: false,
    error: 'Failed to update user'
  }
})
