import type { H3Event } from 'h3'
import { requireUserSession } from './requireUserSession'

export const requireTeacherSession = async (event: H3Event) => {
  const session = await requireUserSession(event)

  if (session.role !== 'teacher') {
    throw createError({
      statusCode: 403,
      message: 'Forbidden'
    })
  }

  return session
}
