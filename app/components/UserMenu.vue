<script setup lang="ts">
const { data, status, signOut } = useAuth()

const dialog = useDialog()

const logout = () => {
  dialog.warning({
    title: 'Abmelden',
    content: 'Möchtest du dich wirklich abmelden?',
    positiveText: 'Abbrechen',
    negativeText: 'Ja, abmelden',
    onNegativeClick: () => signOut({ callbackUrl: '/login' }),
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
  <div class="user-menu" v-if="status === 'authenticated'">
    <div class="user-name">
      <Icon class="user-icon" name="material-symbols:account-circle" />
      <div class="user-name-inner">
        <span class="user-text"> {{ data?.username }}</span>
        <span class="user-role">{{ data?.role }}</span>
      </div>
    </div>
    <NuxtLink to="/admin">
      <n-button quaternary round>Verwalten</n-button>
    </NuxtLink>
    <n-button quaternary round @click="logout" icon-placement="right">
      <template v-slot:icon> <Icon name="material-symbols:logout" /> </template>
      Abmelden
    </n-button>
  </div>
</template>

<style lang="scss" scoped>
.user-menu {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;

  .user-name {
    display: flex;
    margin: auto 10px;
    align-items: center;
    gap: 10px;

    .user-icon {
      font-size: 2rem;
      color: globals.$gray-700;
    }

    .user-name-inner {
      display: flex;
      flex-direction: column;

      .user-text {
        font-weight: bold;
      }

      .user-role {
        font-size: 0.7rem;
        color: globals.$gray-800;
      }
    }
  }
}
</style>
