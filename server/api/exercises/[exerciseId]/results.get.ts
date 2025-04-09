import { eq } from 'drizzle-orm'
import {
  questionsTable,
  resultsTable,
  usersTable
} from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const user = await requireTeacherSession(event)

  const exerciseId = getRouterParam(event, 'exerciseId')

  if (!exerciseId) {
    setResponseStatus(event, 400)
    return {
      error: 'Missing exercise id'
    }
  }

  const drizzle = useDrizzle()

  const usersResults = await drizzle
    .select({
      id: usersTable.id,
      username: usersTable.username
    })
    .from(usersTable)

  const resultsForExercise = await drizzle
    .select()
    .from(resultsTable)
    .where(eq(resultsTable.exerciseId, exerciseId))

  const questionsForExercise = await drizzle
    .select()
    .from(questionsTable)
    .where(eq(questionsTable.exerciseId, exerciseId))

  const resultsByUser = usersResults
    .map((user) => {
      return {
        userId: user.id,
        username: user.username,
        questions: questionsForExercise.map((question) => {
          const userResult = resultsForExercise.find(
            (result) =>
              result.userId === user.id && result.questionId === question.id
          )

          let result = null

          if (userResult) {
            result = {
              id: userResult.id,
              answer: userResult.answer,
              isCorrect: question.correctAnswer === userResult.answer,
              answeredOn: userResult.createdAt
            }
          }

          return {
            questionId: question.id,
            question: question.question,
            additionalText: question.additionalText,
            correctAnswer: question.correctAnswer,
            result
          }
        })
      }
    })
    .filter((user) => {
      return user.questions.some((question) => question.result !== null)
    })

  return resultsByUser
})
