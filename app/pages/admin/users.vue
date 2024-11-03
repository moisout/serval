<script setup lang="ts">
const { data: users } = useFetch('/api/admin/users')
</script>

<template>
  <TitleBox>
    <div class="users-title-section">
      <p class="users-title">Nutzer</p>
    </div>
  </TitleBox>
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
.users-title-section {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  .users-title {
    font-size: 1.8rem;
  }
}

.users-list {
  padding: 20px;
  z-index: 10;
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

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
