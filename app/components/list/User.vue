<script setup lang="ts">
import { NSelect } from 'naive-ui'

const props = defineProps<{
  user: User
}>()

const userRole = ref(props.user.role)
const userRoles = [
  { label: 'Lehrperson', value: 'teacher' },
  { label: 'Schüler*in', value: 'student' }
]

const changeUserRole = async () => {
  await $fetch(`/api/admin/users/${props.user.id}`, {
    method: 'PUT',
    credentials: 'include',
    body: {
      role: userRole.value
    }
  })
}
</script>

<template>
  <div class="user-list-item">
    <p class="user-row">{{ props.user.username }}</p>
    <n-select
      class="user-row"
      v-model:value="userRole"
      :options="userRoles"
      @update:value="changeUserRole"
    />
  </div>
</template>

<style lang="scss" scoped>
.user-list-item {
  display: flex;
  padding: 10px 20px;

  .user-row {
    flex: 1;
  }
}
</style>
