<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string
    to?: string
    type?: 'link' | 'submit' | 'button'
    filled?: boolean
  }>(),
  {
    type: 'link',
    to: '#'
  }
)

const emit = defineEmits<{
  (e: 'click'): void
}>()

const onClick = () => {
  emit('click')
}
</script>

<template>
  <nuxt-link
    v-if="type === 'link'"
    :to="to"
    class="primary-button"
    :class="{ filled }"
    >{{ text }}</nuxt-link
  >
  <button
    v-else-if="type === 'submit'"
    type="submit"
    class="primary-button"
    :class="{ filled }"
  >
    {{ text }}
  </button>
  <button
    v-else
    type="button"
    class="primary-button"
    :class="{ filled }"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
.primary-button {
  padding: 0 15px;
  background-color: globals.$bg-primary;
  color: globals.$text-primary;
  box-shadow: 0 1px 4px 0 #{globals.$primary}1a;
  border-radius: 5px;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;
  border: solid 1px globals.$primary;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;

  &.filled {
    background-color: globals.$primary;
    color: globals.$bg-primary;

    &:hover {
      background-color: globals.$primary-dark;
    }
  }

  &:hover {
    background-color: globals.$primary-translucent;
    // color: globals.$bg-primary;
  }
}
</style>
