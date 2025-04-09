import { accessCodesTable } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    setResponseStatus(event, 400)
    return {
      error: 'Missing access code id'
    }
  }

  const drizzle = useDrizzle()

  await drizzle
    .delete(accessCodesTable)
    .where(eq(accessCodesTable.id, id))
    .execute()

  return {
    success: true
  }
})
