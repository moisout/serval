import { Exercise } from '~/utils/Exercise'

export default defineEventHandler(async (event) => {
  const exerciseId = getRouterParam(event, 'id')
  const storage = getStorage()

  const exercises = await storage.get<Exercise[]>('exercises')

  const filteredExercises = exercises?.filter(
    (exercise) => exercise.id !== exerciseId
  )

  await storage.set('exercises', filteredExercises)

  return {
    success: true
  }
})
