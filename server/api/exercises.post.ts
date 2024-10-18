import { Exercise } from '~/utils/Exercise'
import { getStorage } from '../utils/storage'

export default defineEventHandler(async (event) => {
  const body = await readBody<Exercise>(event)

  const storage = getStorage()

  if (body) {
    const exercises = await storage.get<Exercise[]>('exercises')

    if (!exercises) {
      await storage.set('exercises', [body])
    } else {
      await storage.set('exercises', [...exercises, body])
    }

    return body
  }
})
