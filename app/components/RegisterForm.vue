<script setup lang="ts">
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
    <FormInput type="text" v-model="username" label="Benutzername" />
    <FormInput type="password" v-model="password" label="Passwort" />
    <FormInput type="text" v-model="accessCode" label="Zugangscode" />
    <PrimaryButton type="submit" text="Registrieren" filled />
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
