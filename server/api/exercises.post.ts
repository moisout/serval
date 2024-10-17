import { Exercise } from '~/utils/Exercise'

export default defineEventHandler(async (event) => {
  const body = await readBody<Exercise>(event)

  const storage = useStorage('data')

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
