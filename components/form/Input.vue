<script setup lang="ts">
defineProps<{
  type: string
  label: string
}>()

const model = defineModel()
</script>

<template>
  <input class="form-input" :type="type" v-model="model" :placeholder="label" />
</template>

<style lang="scss" scoped>
.form-input {
  padding: 10px;
  border: 1px solid globals.$gray-300;
  border-radius: 5px;
  width: 100%;

  &:focus-within {
    border-color: globals.$primary;
    outline: none;
  }
}
</style>
