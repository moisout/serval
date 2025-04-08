import { exercisesTable, questionsTable } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  await requireTeacherSession(event)

  const exerciseId = getRouterParam(event, 'id')

  if (!exerciseId) {
    throw createError({ statusCode: 400, message: 'Missing exercise id' })
  }

  const drizzle = useDrizzle()

  await drizzle
    .delete(questionsTable)
    .where(eq(questionsTable.exerciseId, exerciseId))

  await drizzle.delete(exercisesTable).where(eq(exercisesTable.id, exerciseId))

  return {
    success: true
  }
})
