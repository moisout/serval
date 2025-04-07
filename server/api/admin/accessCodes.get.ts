import { requireTeacherSession } from '~~/server/utils/requireTeacherSession'

export default defineEventHandler(async (event) => {
  await requireTeacherSession(event)

  const drizzle = useDrizzle()

  const accessCodes = await drizzle.query.accessCodesTable.findMany()

  return (
    accessCodes?.map((accessCode) => ({
      id: accessCode.id,
      code: accessCode.code,
      role: accessCode.role
    })) || []
  )
})
