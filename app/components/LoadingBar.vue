<script setup lang="ts">
const loadingBar = useLoadingBar()
const { progress, isLoading, error, start, finish, clear } =
  useLoadingIndicator()

watch(isLoading, () => {
  if (isLoading.value) {
    start()
  } else {
    finish()
  }
})

onMounted(() => {
  start()
  setTimeout(() => {
    stop()
  }, 5000)
})
</script>

<template></template>
