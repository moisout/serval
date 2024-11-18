<script setup lang="ts">
const { data, status, signOut } = useAuth()
</script>

<template>
  <div class="user-menu" v-if="status === 'authenticated'">
    <p class="user-name">
      <Icon name="material-symbols:person" /> {{ data?.username }}
    </p>
    <PrimaryButton text="Manage" light type="link" to="/admin" />
    <PrimaryButton
      text="Logout"
      light
      type="button"
      @click="signOut({ callbackUrl: '/login' })"
    >
      <template v-slot:icon-after>
        <Icon name="material-symbols:logout" />
      </template>
    </PrimaryButton>
  </div>
</template>

<style lang="scss" scoped>
.user-menu {
  display: flex;
  flex-direction: row;
  gap: 10px;

  .user-name {
    display: flex;
    margin: auto 10px;

    span {
      margin: auto 5px auto 0;
    }
  }
}
</style>
