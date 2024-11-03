<script setup lang="ts">
const props = defineProps<{
  user: User
}>()
</script>

<template>
  <div class="user-list-item">
    <p>{{ props.user.username }}</p>
    <p>{{ props.user.role }}</p>
  </div>
</template>

<style lang="scss" scoped>
.user-list-item {
  display: flex;
  padding: 10px 20px;

  p {
    flex: 1;
  }
}
</style>
