export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const drizzle = useDrizzle()

  const exercises = await drizzle.query.exercises.findMany()

  return exercises || []
})
