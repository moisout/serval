<script setup lang="ts">
definePageMeta({ auth: false })
</script>

<template>
  <TitleBox>
    <div class="register-title-section">
      <p class="register-title">Registrierung</p>
    </div>
  </TitleBox>
  <div class="register">
    <RegisterForm />
  </div>
</template>

<style lang="scss" scoped>
.register-title-section {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  .register-title {
    font-size: 1.8rem;
  }
}

.register {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
  z-index: 10;
  position: relative;
}
</style>
