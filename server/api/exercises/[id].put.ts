import { Exercise } from '~/utils/Exercise'
import { exercisesTable, questionsTable } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const exerciseId = getRouterParam(event, 'id')

  if (!exerciseId) {
    throw createError({ statusCode: 400, message: 'Missing exercise id' })
  }

  const drizzle = useDrizzle()

  const existingExercise = await drizzle.query.exercisesTable.findFirst({
    where: eq(exercisesTable.id, exerciseId)
  })

  if (!existingExercise) {
    setResponseStatus(event, 404)

    return {
      error: 'Exercise not found'
    }
  }

  const body = await readBody<Exercise>(event)
  const exerciseToUpdate = {
    ...existingExercise,
    ...body
  }

  const updateResults = await drizzle
    .update(exercisesTable)
    .set({
      authorId: exerciseToUpdate.authorId,
      name: exerciseToUpdate.name,
      topic: exerciseToUpdate.topic
    })
    .where(eq(exercisesTable.id, exerciseId))

  const existingQuestions = await drizzle.query.questionsTable.findMany({
    where: eq(questionsTable.exerciseId, exerciseId)
  })

  const questionsToDelete = existingQuestions.filter(
    (question) => !exerciseToUpdate.questions.some((q) => q.id === question.id)
  )
  const questionsToInsert = exerciseToUpdate.questions.filter(
    (question) => !existingQuestions.some((q) => q.id === question.id)
  )
  const questionsToUpdate = exerciseToUpdate.questions.filter((question) =>
    existingQuestions.some((q) => q.id === question.id)
  )

  // Delete questions that are no longer in the exercise
  for (const question of questionsToDelete) {
    await drizzle
      .delete(questionsTable)
      .where(eq(questionsTable.id, question.id))
  }
  // Insert new questions
  for (const question of questionsToInsert) {
    await drizzle.insert(questionsTable).values({
      id: question.id,
      // order: question.order,
      exerciseId: exerciseId,
      question: question.question,
      correctAnswer: question.correctAnswer,
      createdAt: question.createdAt,
      additionalText: question.additionalText
    })
  }
  // Update existing questions
  for (const question of questionsToUpdate) {
    await drizzle
      .update(questionsTable)
      .set({
        // order: question.order,
        question: question.question,
        correctAnswer: question.correctAnswer,
        additionalText: question.additionalText
      })
      .where(eq(questionsTable.id, question.id))
  }

  if (updateResults.success) {
    return {
      success: true,
      message: 'Exercise updated successfully'
    }
  }

  setResponseStatus(event, 500)
  return {
    success: false,
    error: 'Failed to update exercise'
  }
})
