import { Exercise } from '~/utils/Exercise'
import { exercisesTable, questionsTable } from '../database/schema'

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

  const questionsToInsert = body.questions.map((question) => ({
    id: question.id,
    exerciseId: body.id,
    question: question.question,
    additionalText: question.additionalText,
    correctAnswer: question.correctAnswer
  }))

  if (questionsToInsert?.length) {
    await drizzle.insert(questionsTable).values(questionsToInsert)
  }

  return body
})
