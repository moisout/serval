<script setup lang="ts">
import globalVariables from '~/assets/styles/variables.module.scss'
const { textPrimary } = globalVariables

const props = defineProps<{
  icon: string
  color?: string
}>()

const emit = defineEmits<{ (e: 'click'): void }>()

const onClick = () => {
  emit('click')
}

const textColor = computed(() => {
  return props.color || textPrimary
})
</script>

<template>
  <div class="icon-button-outer" @click="onClick" :class="{ color }">
    <Icon class="icon-button" :name="icon" />
  </div>
</template>

<style lang="scss" scoped>
.icon-button-outer {
  border: solid 1px transparent;
  padding: 5px 5px 2px 5px;
  margin: auto 0;
  border-radius: 4px;
  cursor: pointer;
  color: v-bind(textColor);

  transition:
    color 0.2s,
    background-color 0.2s,
    border-color 0.2s;

  &.color {
    &:hover {
      background-color: v-bind(textColor);
      border-color: transparent;
      color: globals.$bg-primary;
    }
  }

  &:hover {
    border-color: globals.$gray-300;
    background-color: globals.$bg-primary;
  }
}
</style>
