import { Exercise } from '~/utils/Exercise'

export default defineEventHandler(async (event) => {
  const storage = useStorage('data')

  const exercises = await storage.get<Exercise[]>('exercises')

  return exercises || []
})
