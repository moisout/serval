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

  const newAccessCode = {
    id: v4(),
    code: v4().slice(0, 6),
    role: body.role
  }

  const result = drizzle
    .insert(accessCodesTable)
    .values(newAccessCode)
    .execute()

  if (!result) {
    setResponseStatus(event, 500)
    return {
      error: 'Failed to create access code'
    }
  }
  return {
    success: true,
    accessCode: newAccessCode
  }
})
