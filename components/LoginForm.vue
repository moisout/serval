<script setup lang="ts">
const username = ref('')
const password = ref('')

const { signIn } = useAuth()

const login = () => {
  signIn(
    { username: username.value, password: password.value },
    { callbackUrl: '/' }
  )
}
</script>

<template>
  <form @submit.prevent="login" class="login-form">
    <FormInput type="text" v-model="username" label="Benutzername" />
    <FormInput type="password" v-model="password" label="Passwort" />
    <PrimaryButton type="submit" text="Login" filled />
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
}
</style>
