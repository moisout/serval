import type { H3Event } from 'h3'
import { verifySession } from './verifySession'

export const requireUserSession = async (event: H3Event) => {
  const session = verifySession(event)

  return session
}
