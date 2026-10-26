export const useIsTeacher = () => {
  const { data } = useAuth()

  return computed(() => data.value?.role === 'teacher')
}
