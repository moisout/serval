// Pages for managing exercises and users, the API enforces the same check
export default defineNuxtRouteMiddleware(() => {
  const { data } = useAuth()

  if (data.value?.role !== 'teacher') {
    return navigateTo('/')
  }
})
