<script setup lang="ts">
import { NSelect, NButton, useDialog, NFlex } from 'naive-ui'

const props = defineProps<{
  accessCode: AccessCode
}>()
const emit = defineEmits<{
  (e: 'refresh'): void
}>()

const dialog = useDialog()
const deleteAccessCode = () => {
  dialog.warning({
    title: 'Aufgabenbuch löschen',
    content: `Möchtest du den Zugangschlüssel wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`,
    positiveText: 'Abbrechen',
    negativeText: 'Löschen',
    onNegativeClick: async () => {
      await fetch(`/api/admin/access-codes/${props.accessCode.id}`, {
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
    <p class="user-row">{{ props.accessCode.code }}</p>
    <n-flex class="user-row" justify="space-between">
      {{ userRoles[props.accessCode.role] }}
      <n-button type="error" @click="deleteAccessCode">
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
