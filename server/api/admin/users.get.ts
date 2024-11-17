import { requireTeacherSession } from '~~/server/utils/requireTeacherSession'

export default defineEventHandler(async (event) => {
  const session = await requireTeacherSession(event)

  const drizzle = useDrizzle()

  const users = await drizzle.query.users.findMany()

  return (
    users?.map((user) => ({
      id: user.id,
      username: user.username,
      role: user.role
    })) || []
  )
})
