<script setup lang="ts">
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
  return tempValue.value.length * 0.9
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
    <Icon
      v-if="mode === 'view'"
      name="material-symbols:edit-outline"
      @click="edit"
      class="editable-edit-btn"
    />
    <Icon
      v-if="mode === 'edit'"
      name="material-symbols:check"
      @click="save"
      class="editable-edit-btn save"
    />
    <Icon
      v-if="mode === 'edit'"
      name="material-symbols:close"
      @click="cancel"
      class="editable-edit-btn cancel"
    />
  </div>
</template>

<style lang="scss" scoped>
.editable {
  display: flex;
  gap: 5px;

  &.title {
    .editable-view {
      font-size: 1.8rem;
    }

    .editable-input {
      font-size: 1.4rem;
    }

    .editable-edit-btn {
      font-size: 1.4rem;

      &.save {
        color: globals.$success;
      }

      &.cancel {
        color: globals.$danger;
      }
    }
  }

  .editable-input {
    padding: 5px;
    border: 1px solid globals.$gray-300;
    border-radius: 5px;

    &:focus-within {
      border-color: globals.$primary;
      outline: none;
    }
  }

  .editable-edit-btn {
    cursor: pointer;
    margin: auto 0;
  }
}
</style>
