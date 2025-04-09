<script setup lang="ts">
import { NSelect, useDialog, NFlex, NButton } from 'naive-ui'

const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  (e: 'refresh'): void
}>()

const { data } = useAuth()

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

const dialog = useDialog()
const deleteUser = () => {
  dialog.error({
    title: 'WARNUNG',
    content: () =>
      h('pre', {
        innerHTML: `Möchtest du den Nutzer/die Nutzerin "${props.user.username}"
wirklich löschen?
Diese Aktion kann nicht rückgängig gemacht werden.
Dies wird alle Daten des Nutzers löschen!

Das bedeutet:
- Alle erstellten Aufgabenbücher
- Alle gelösten Aufgaben mit Resultaten

Falls diese Person eine Lehrperson ist,
werden ALLE erstellten Aufgabenbücher
unwiederbringlich gelöscht!`
      }),
    positiveText: 'Abbrechen',
    negativeText: 'Löschen',
    onNegativeClick: async () => {
      await fetch(`/api/admin/users/${props.user.id}`, {
        method: 'DELETE'
      })
      emit('refresh')
    },
    negativeButtonProps: {
      size: 'large'
    },
    positiveButtonProps: {
      size: 'large'
    }
  })
}
</script>

<template>
  <div class="user-list-item">
    <p class="user-row">{{ props.user.username }}</p>
    <n-flex class="user-row" justify="space-between">
      <n-select
        class="user-row"
        v-model:value="userRole"
        :options="userRoles"
        @update:value="changeUserRole"
      />
      <n-button
        type="error"
        @click="deleteUser"
        v-if="props.user.username !== data?.username"
      >
        <template #icon>
          <Icon name="material-symbols:delete-outline-rounded" /></template
      ></n-button>
    </n-flex>
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
