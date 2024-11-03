<script setup lang="ts">
import globalVariables from '~/assets/styles/variables.module.scss'
const { danger, success } = globalVariables

defineProps<{
  title?: boolean
  label?: string
}>()
const model = defineModel<string>()
const mode = ref<'view' | 'edit'>('view')

const tempValue = ref<string>(model.value || '')

const inputRef = ref<HTMLInputElement | null>(null)

const edit = () => {
  tempValue.value = model.value || ''
  mode.value = 'edit'
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const save = () => {
  model.value = tempValue.value
  mode.value = 'view'
}

const cancel = () => {
  tempValue.value = model.value || ''
  mode.value = 'view'
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    save()
  } else if (e.key === 'Escape') {
    cancel()
  }
}

const textWidth = computed(() => {
  const width = tempValue.value.length * 0.9
  return Math.max(width, 1)
})
</script>

<template>
  <div class="editable" :class="{ title }">
    <p v-if="label" class="editable-label">{{ label }}:</p>
    <p v-if="mode === 'view'" class="editable-view">
      {{ model }}
    </p>
    <input
      v-else
      v-model="tempValue"
      ref="inputRef"
      class="editable-input"
      :size="textWidth"
      @keydown="onKeyDown"
    />
    <IconButton
      v-if="mode === 'view'"
      icon="material-symbols:edit-outline"
      @click="edit"
      class="editable-edit-btn"
    />
    <IconButton
      v-if="mode === 'edit'"
      icon="material-symbols:check"
      @click="save"
      class="editable-edit-btn"
      :color="success"
    />
    <IconButton
      v-if="mode === 'edit'"
      icon="material-symbols:close"
      @click="cancel"
      class="editable-edit-btn"
      :color="danger"
    />
  </div>
</template>

<style lang="scss" scoped>
.editable {
  display: flex;
  gap: 5px;

  &.title {
    .editable-view {
      margin: auto 0;
      font-size: 1.6rem;
    }

    .editable-input {
      font-size: 1.3rem;
    }

    .editable-edit-btn {
      font-size: 1.3rem;
    }
  }

  .editable-input {
    padding: 5px;
    border: 1px solid globals.$gray-300;
    border-radius: 5px;
    font-family: 'Montserrat', sans-serif;

    &:focus-within {
      border-color: globals.$primary;
      outline: none;
    }
  }

  .editable-edit-btn {
    margin: auto 0;
    padding: 2px 4px 0 4px;
  }
}
</style>
