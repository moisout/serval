<script setup lang="ts">
import { NInput, NButton } from 'naive-ui'
const username = ref('')
const password = ref('')
const accessCode = ref('')

const { signUp } = useAuth()

const register = async () => {
  try {
    await signUp(
      {
        username: username.value,
        password: password.value,
        accessCode: accessCode.value
      },
      { callbackUrl: '/' }
    )
  } catch {
    error.value = 'Registrierung fehlgeschlagen'
  }
}

const error = ref('')
</script>

<template>
  <form @submit.prevent="register" class="register-form">
    <div class="error" v-if="error">{{ error }}</div>
    <n-input
      type="text"
      v-model:value="username"
      placeholder="Benutzername"
      size="large"
    />
    <n-input
      type="password"
      v-model:value="password"
      placeholder="Passwort"
      show-password-on="click"
      size="large"
    />
    <n-input
      type="text"
      v-model:value="accessCode"
      placeholder="Zugangscode"
      size="large"
    />
    <n-button type="primary" attr-type="submit" size="large"
      >Registrieren</n-button
    >
    <NuxtLink to="/login" class="login-link"> Stadtdessen einloggen </NuxtLink>
  </form>
</template>

<style lang="scss" scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid globals.$gray-300;
  padding: 20px;
  background-color: globals.$bg-primary;
  border-radius: 10px;

  .error {
    font-size: 0.8rem;
    text-align: center;
    color: globals.$danger;
  }

  .login-link {
    font-size: 0.8rem;
    text-align: center;
    margin-top: 10px;
  }
}
</style>
