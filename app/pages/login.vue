<script setup lang="ts">
import { NPageHeader } from 'naive-ui'
definePageMeta({ auth: false })
</script>

<template>
  <n-page-header class="login-page-header">
    <template #title>Login</template>
  </n-page-header>
  <div class="login">
    <LoginForm />
  </div>
</template>

<style lang="scss" scoped>
.login-page-header {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}

.login {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px 0;
  z-index: 10;
  position: relative;
}
</style>
