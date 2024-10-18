import { Exercise } from '~/utils/Exercise'
import { getStorage } from '../utils/storage'

export default defineEventHandler(async (event) => {
  const storage = getStorage()

  const exercises = await storage.get<Exercise[]>('exercises')

  return exercises || []
})
