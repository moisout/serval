<script setup lang="ts">
import {
  NPageHeader,
  NBreadcrumb,
  NBreadcrumbItem,
  NSpace,
  NButton
} from 'naive-ui'

const { data: users } = useFetch('/api/admin/users')

useHead({
  title: 'Nutzer',
  meta: [
    {
      name: 'description',
      content: 'Nutzerverwaltung'
    }
  ]
})
</script>

<template>
  <n-page-header>
    <template #title>Nutzer</template>
    <template #header>
      <n-breadcrumb>
        <n-breadcrumb-item @click="$router.push('/')">
          Admin
        </n-breadcrumb-item>
        <n-breadcrumb-item>Nutzer</n-breadcrumb-item>
      </n-breadcrumb>
    </template>
    <template #extra>
      <n-space>
        <nuxt-link to="/admin/access">
          <n-button>
            <template #icon>
              <Icon name="material-symbols:key-outline-rounded" />
            </template>
            Zugangschlüssel verwalten</n-button
          >
        </nuxt-link>
      </n-space>
    </template>
  </n-page-header>
  <div class="users-list" v-if="users">
    <div class="users-list-inner">
      <div class="users-list-header">
        <p>Benutzername</p>
        <p>Rolle</p>
      </div>
      <ListUser v-for="user in users" :user="user" :key="user.id" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.users-list {
  z-index: 10;
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 20px auto 0 auto;

  .users-list-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 1px 4px 0 #{globals.$primary}3a;
    background-color: globals.$bg-primary;

    .users-list-header {
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
