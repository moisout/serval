import { Exercise } from '~/utils/Exercise'
import { exercises } from '../database/schema'

export default defineEventHandler(async (event) => {
  const session = await requireTeacherSession(event)

  const body = await readBody<Exercise>(event)

  const drizzle = useDrizzle()

  if (!body) {
    throw createError({ statusCode: 400, message: 'Missing exercise body' })
  }

  await drizzle.insert(exercises).values({
    authorId: session.id,
    id: body.id,
    name: body.name,
    topic: body.topic
  })

  return body
})
