export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (body.username !== 'admin' || body.password !== 'admin') {
    setResponseStatus(event, 401)
  }

  return {
    success: true,
    token: 'eyJhbGciczqr8x37n0489q3740z'
  }
})
