<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string
    to?: string
    type?: 'link' | 'submit' | 'button'
    filled?: boolean
    light?: boolean
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
  <NuxtLink
    v-if="type === 'link'"
    :to="to"
    class="primary-button"
    :class="{ filled, light }"
    >{{ text }}
    <div class="icon-after">
      <slot name="icon-after" />
    </div>
  </NuxtLink>
  <button
    v-else-if="type === 'submit'"
    type="submit"
    class="primary-button"
    :class="{ filled, light }"
  >
    {{ text }}
    <div class="icon-after">
      <slot name="icon-after" class="icon-after" />
    </div>
  </button>
  <button
    v-else
    type="button"
    class="primary-button"
    :class="{ filled, light }"
    @click="onClick"
  >
    {{ text }}
    <div class="icon-after">
      <slot name="icon-after" class="icon-after" />
    </div>
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
  display: flex;
  gap: 5px;
  font-family: globals.$font-primary;

  .icon-after {
    display: flex;
    :deep(span) {
      display: block;
      margin: auto 0;
    }
  }

  &.light {
    border: none;
    box-shadow: none;
  }

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
