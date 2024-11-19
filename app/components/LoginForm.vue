<script setup lang="ts">
const username = ref('')
const password = ref('')

const { signIn } = useAuth()

const login = async () => {
  try {
    await signIn(
      { username: username.value, password: password.value },
      { callbackUrl: '/' }
    )
  } catch {
    error.value = 'Falscher Benutzername oder Passwort'
  }
}

const error = ref('')
</script>

<template>
  <form @submit.prevent="login" class="login-form">
    <div class="error" v-if="error">{{ error }}</div>
    <n-input
      type="text"
      placeholder="Benutzername"
      v-model:value="username"
      size="large"
    />
    <n-input
      type="password"
      placeholder="Passwort"
      show-password-on="click"
      v-model:value="password"
      size="large"
    />
    <n-button type="primary" attr-type="submit" size="large">Login</n-button>
    <NuxtLink to="/register" class="register-link">
      Neuen Account erstellen
    </NuxtLink>
  </form>
</template>

<style lang="scss" scoped>
.login-form {
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

  .register-link {
    font-size: 0.8rem;
    text-align: center;
    margin-top: 10px;
  }
}
</style>
