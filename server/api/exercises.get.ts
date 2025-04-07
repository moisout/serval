import { count, eq } from 'drizzle-orm'
import { exercisesTable, questionsTable, usersTable } from '../database/schema'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const drizzle = useDrizzle()

  const exercises = await drizzle
    .select({
      id: exercisesTable.id,
      name: exercisesTable.name,
      topic: exercisesTable.topic,
      questionCount: count(questionsTable.exerciseId),
      author: usersTable.username
    })
    .from(exercisesTable)
    .leftJoin(questionsTable, eq(exercisesTable.id, questionsTable.exerciseId))
    .groupBy(questionsTable.exerciseId)
    .leftJoin(usersTable, eq(exercisesTable.authorId, usersTable.id))

  return (exercises || []).map((exercise) => ({
    ...exercise,
    author: exercise.author || 'unknown',
    questions: []
  }))
})
