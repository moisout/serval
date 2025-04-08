import {
  exercisesTable,
  questionsTable,
  usersTable
} from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const exerciseId = getRouterParam(event, 'id')

  if (!exerciseId) {
    throw createError({ statusCode: 400, message: 'Missing exercise id' })
  }

  const drizzle = useDrizzle()

  const exercise = await drizzle.query.exercisesTable.findFirst({
    where: eq(exercisesTable.id, exerciseId)
  })

  const exerciseQuestions = await drizzle.query.questionsTable.findMany({
    where: eq(questionsTable.exerciseId, exerciseId)
  })

  let exerciseAuthor = 'unknown'
  if (exercise?.authorId) {
    const exerciseUser = await drizzle.query.usersTable.findFirst({
      where: eq(usersTable.id, exercise?.authorId)
    })
    exerciseAuthor = exerciseUser?.username ?? 'unknown'
  }

  if (!exercise) {
    setResponseStatus(event, 404)

    return {
      error: 'Exercise not found'
    }
  }

  return {
    ...exercise,
    questions: exerciseQuestions ?? [],
    author: exerciseAuthor
  }
})
