export default defineEventHandler(async (event) => {
  const authToken = event.headers.get('Authorization')
  if (!authToken) {
    setResponseStatus(event, 401)

    return {
      success: false,
      error: 'Unauthorized'
    }
  }

  return {
    id: 1,
    username: 'admin'
  }
})
