import { eq } from 'drizzle-orm'
import { questionsTable, resultsTable } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event)

  const exerciseId = getRouterParam(event, 'exerciseId')

  if (!exerciseId) {
    setResponseStatus(event, 400)
    return {
      error: 'Missing exercise id'
    }
  }

  const drizzle = useDrizzle()

  const questionsResults = await drizzle
    .select()
    .from(questionsTable)
    .where(eq(questionsTable.exerciseId, exerciseId))
    .leftJoin(
      resultsTable,
      and(
        eq(resultsTable.questionId, questionsTable.id),
        eq(resultsTable.userId, user.id)
      )
    )
    .groupBy(questionsTable.id)
    .orderBy(questionsTable.createdAt)

  const questions = questionsResults.map((questionsResult) => ({
    questions: questionsResult.questions,
    results: questionsResult.results
      ? {
          id: questionsResult.results?.id || '',
          answer: questionsResult.results?.answer || '',
          isCorrect:
            questionsResult.questions.correctAnswer ===
            questionsResult.results?.answer,
          answeredOn: questionsResult.results?.createdAt || 0
        }
      : null
  }))

  return questions
})
