<script setup lang="ts">
definePageMeta({ auth: false })
</script>

<template>
  <TitleBox>
    <div class="login-title-section">
      <p class="login-title">Login</p>
    </div>
  </TitleBox>
  <div class="login">
    <LoginForm />
  </div>
</template>

<style lang="scss" scoped>
.login-title-section {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  .login-title {
    font-size: 1.8rem;
  }
}

.login {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
  z-index: 10;
  position: relative;
}
</style>
