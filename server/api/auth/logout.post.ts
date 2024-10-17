export default defineEventHandler(async (event) => {
  const authToken = event.headers.get('Authorization')
  if (!authToken) {
    setResponseStatus(event, 401)
  }

  return {
    success: true
  }
})
