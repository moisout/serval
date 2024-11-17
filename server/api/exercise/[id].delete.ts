import { exercises } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  await requireTeacherSession(event)

  const exerciseId = getRouterParam(event, 'id')

  if (!exerciseId) {
    throw createError({ statusCode: 400, message: 'Missing exercise id' })
  }

  const drizzle = useDrizzle()

  await drizzle.delete(exercises).where(eq(exercises.id, exerciseId))

  return {
    success: true
  }
})
