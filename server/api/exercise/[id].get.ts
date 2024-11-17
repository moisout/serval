import { exercises } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const exerciseId = getRouterParam(event, 'id')

  if (!exerciseId) {
    throw createError({ statusCode: 400, message: 'Missing exercise id' })
  }

  const drizzle = useDrizzle()

  const exercise = await drizzle.query.exercises.findFirst({
    where: eq(exercises.id, exerciseId)
  })

  if (!exercise) {
    setResponseStatus(event, 404)

    return {
      success: false,
      error: 'Exercise not found'
    }
  }

  return exercise
})
