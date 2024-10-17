<script setup lang="ts">
const { data, status, signOut } = useAuth()
</script>

<template>
  <div class="user-menu" v-if="status === 'authenticated'">
    <p class="user-name">{{ data?.username }}</p>
    <PrimaryButton
      text="Logout"
      type="button"
      filled
      @click="signOut({ callbackUrl: '/login' })"
    />
  </div>
</template>

<style lang="scss" scoped>
.user-menu {
  display: flex;
  flex-direction: row;
  gap: 10px;

  .user-name {
    margin: auto 0;
  }
}
</style>
