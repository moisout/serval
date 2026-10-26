import { inArray } from 'drizzle-orm'
import {
  exercisesTable,
  questionsTable,
  resultsTable,
  usersTable
} from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  await requireTeacherSession(event)

  const userId = getRouterParam(event, 'id')

  if (!userId) {
    setResponseStatus(event, 400)
    return {
      success: false,
      error: 'Missing user id'
    }
  }
  const drizzle = useDrizzle()

  // exercises.author_id can't be null, so the user's exercises go with them
  const authoredExercises = await drizzle
    .select({ id: exercisesTable.id })
    .from(exercisesTable)
    .where(eq(exercisesTable.authorId, userId))
  const authoredExerciseIds = authoredExercises.map((exercise) => exercise.id)

  if (authoredExerciseIds.length) {
    await drizzle
      .delete(resultsTable)
      .where(inArray(resultsTable.exerciseId, authoredExerciseIds))
    await drizzle
      .delete(questionsTable)
      .where(inArray(questionsTable.exerciseId, authoredExerciseIds))
    await drizzle
      .delete(exercisesTable)
      .where(inArray(exercisesTable.id, authoredExerciseIds))
  }

  await drizzle.delete(resultsTable).where(eq(resultsTable.userId, userId))
  await drizzle.delete(usersTable).where(eq(usersTable.id, userId))

  return {
    success: true,
    message: 'User deleted successfully'
  }
})
