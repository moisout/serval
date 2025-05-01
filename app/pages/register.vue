<script setup lang="ts">
import { NPageHeader } from 'naive-ui'
definePageMeta({ auth: false })
</script>

<template>
  <n-page-header class="register-page-header">
    <template #title>Register</template>
  </n-page-header>
  <div class="register">
    <PrivacyNotice />
    <LicenseNotice />
    <RegisterForm />
  </div>
</template>

<style lang="scss" scoped>
.register-page-header {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}

.register {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px 0;
  z-index: 10;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
