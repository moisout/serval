import { Exercise } from '~/utils/Exercise'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const exerciseId = getRouterParam(event, 'id')
  const storage = getStorage()

  const exercises = await storage.get<Exercise[]>('exercises')

  const exercise = exercises?.find((exercise) => exercise.id === exerciseId)

  if (!exercise) {
    setResponseStatus(event, 404)

    return {
      success: false,
      error: 'Exercise not found'
    }
  }

  return exercise
})
