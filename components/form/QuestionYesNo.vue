<script setup lang="ts">
const props = defineProps<{ modelValue: Question }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Question): void
}>()

const yesId = useId()
const noId = useId()

const questionTitle = computed({
  get: () => props.modelValue?.question,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, question: value })
  }
})

const correctAnswer = computed({
  get: () => props.modelValue?.correctAnswer,
  set: (value) => {
    emit('update:modelValue', { ...props.modelValue, correctAnswer: value })
  }
})
</script>

<template>
  <div class="form-question-yes-no">
    <FormEditable title v-model="questionTitle" />
    <p class="form-question-yes-no-label">Korrekte Antwort</p>
    <input
      type="radio"
      name="yes-no"
      :id="yesId"
      value="yes"
      v-model="correctAnswer"
    />
    <label :for="yesId">Ja</label>
    <input
      type="radio"
      name="yes-no"
      :id="noId"
      value="no"
      v-model="correctAnswer"
    />
    <label :for="noId">Nein</label>
  </div>
</template>
