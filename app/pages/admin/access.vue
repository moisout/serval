<script setup lang="ts">
import {
  NPageHeader,
  NBreadcrumb,
  NBreadcrumbItem,
  NFlex,
  NSpace,
  NButton,
  NSelect
} from 'naive-ui'

const { data: accessCodes, refresh } = useFetch('/api/admin/access-codes')

useHead({
  title: 'Zugangsschlüssel',
  meta: [
    {
      name: 'description',
      content: 'Zugangsschlüsselverwaltung'
    }
  ]
})

const createAccessCode = async () => {
  await $fetch('/api/admin/access-codes', {
    method: 'POST',
    body: {
      role: selectedRole.value
    },
    credentials: 'include'
  })
  await refresh()
}

const selectedRole = ref('student')
const roles = [
  {
    label: 'Schüler*in',
    value: 'student'
  },
  {
    label: 'Lehrperson',
    value: 'teacher'
  }
]
</script>

<template>
  <n-page-header>
    <template #title>Zugangschlüssel</template>
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item @click="$router.push('/')">
          Admin
        </n-breadcrumb-item>
        <n-breadcrumb-item>Zugangschlüssel</n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    <template #extra>
      <n-flex>
        <n-select
          v-model:value="selectedRole"
          :options="roles"
          placeholder="Rolle auswählen"
          style="width: 200px"
        />
        <n-button @click="createAccessCode">
          <template #icon>
            <Icon name="material-symbols:add-2-rounded" />
          </template>
          Zugangschlüssel erstellen</n-button
        >
      </n-flex>
    </template>
  </n-page-header>
  <div class="access-code-list" v-if="accessCodes?.length">
    <div class="access-code-list-inner">
      <div class="access-code-list-header">
        <p>Zugangsschlüssel</p>
        <p>Rolle</p>
      </div>
      <ListAccessCode
        v-for="accessCode in accessCodes"
        :accessCode="accessCode"
        :key="accessCode.id"
        @refresh="refresh"
      />
    </div>
  </div>
  <div v-else>
    <n-space class="access-code-list" align="center">
      <p>Keine Zugangsschlüssel gefunden</p>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
.access-code-list {
  padding: 20px 0;
  z-index: 10;
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  .access-code-list-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 1px 4px 0 #{globals.$primary}3a;
    background-color: globals.$bg-primary;

    .access-code-list-header {
      display: flex;
      padding: 10px 20px;
      color: globals.$text-primary;

      p {
        flex: 1;
        font-weight: bold;
      }
    }
  }
}
</style>
