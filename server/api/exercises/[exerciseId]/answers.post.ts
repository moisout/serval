import { v4 } from 'uuid'
import { resultsTable } from '~~/server/database/schema'
export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event)

  const exerciseId = getRouterParam(event, 'exerciseId')

  if (!exerciseId) {
    setResponseStatus(event, 400)
    return {
      error: 'Missing exercise or question id'
    }
  }

  const body = await readBody<{ answer: string; questionId: string }>(event)

  if (!body?.answer) {
    setResponseStatus(event, 400)
    return {
      error: 'Missing answer'
    }
  }

  if (!body?.questionId) {
    setResponseStatus(event, 400)
    return {
      error: 'Missing question id'
    }
  }

  const drizzle = useDrizzle()

  const existingResult = await drizzle.query.resultsTable.findFirst({
    where: and(
      eq(resultsTable.exerciseId, exerciseId),
      eq(resultsTable.userId, user.id),
      eq(resultsTable.questionId, body.questionId)
    )
  })

  if (existingResult) {
    const updateResult = await drizzle
      .update(resultsTable)
      .set({
        answer: body.answer
      })
      .where(
        and(
          eq(resultsTable.exerciseId, exerciseId),
          eq(resultsTable.userId, user.id),
          eq(resultsTable.questionId, body.questionId)
        )
      )

    if (!updateResult) {
      setResponseStatus(event, 500)
      return {
        error: 'Failed to update result'
      }
    }
    return {
      success: true,
      result: 'Result updated successfully'
    }
  }

  const insertResult = await drizzle.insert(resultsTable).values({
    id: v4(),
    answer: body.answer,
    exerciseId,
    questionId: body.questionId,
    userId: user.id
  })

  if (!insertResult) {
    setResponseStatus(event, 500)
    return {
      error: 'Failed to insert result'
    }
  }

  return {
    success: true,
    result: 'Result inserted successfully'
  }
})
