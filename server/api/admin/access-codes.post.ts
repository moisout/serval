import { v4 } from 'uuid'
import { AccessCode } from '~/utils/AccessCode'
import { accessCodesTable } from '~~/server/database/schema'
import { requireTeacherSession } from '~~/server/utils/requireTeacherSession'

export default defineEventHandler(async (event) => {
  await requireTeacherSession(event)

  const body = await readBody<{
    role: AccessCode['role']
  }>(event)

  if (!body?.role) {
    setResponseStatus(event, 400)
    return {
      error: 'Role is required'
    }
  }

  const drizzle = useDrizzle()

  drizzle
    .insert(accessCodesTable)
    .values({
      id: v4(),
      code: v4().slice(0, 6),
      role: body.role
    })
    .execute()
})
