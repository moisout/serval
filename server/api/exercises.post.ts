import { Exercise } from '~/utils/Exercise'
import { exercisesTable } from '../database/schema'

export default defineEventHandler(async (event) => {
  const session = await requireTeacherSession(event)

  const body = await readBody<Exercise>(event)

  const drizzle = useDrizzle()

  if (!body) {
    throw createError({ statusCode: 400, message: 'Missing exercise body' })
  }

  await drizzle.insert(exercisesTable).values({
    authorId: session.id,
    id: body.id,
    name: body.name,
    topic: body.topic
  })

  return body
})
