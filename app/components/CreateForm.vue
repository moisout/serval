<script setup lang="ts">
import { NButton, NInput } from 'naive-ui'
import { v4 } from 'uuid'

const props = defineProps<{ exercise: Exercise }>()

const exercise = toRef(props, 'exercise')

const addQuestion = () => {
  exercise.value.questions.push({
    id: v4(),
    type: 'yes-no',
    question: 'Neue Frage',
    additionalText: '',
    correctAnswer: 'yes'
  })
}

const deleteQuestion = (question: Question) => {
  exercise.value.questions = exercise.value.questions.filter(
    (q) => q.id !== question.id
  )
}

const moveQuestionUp = (question: Question) => {
  const index = exercise.value.questions.findIndex((q) => q.id === question.id)
  if (index > 0) {
    const tempQuestionAbove = exercise.value.questions[index - 1]
    const tempQuestionBelow = exercise.value.questions[index]
    if (tempQuestionAbove && tempQuestionBelow) {
      exercise.value.questions[index - 1] = tempQuestionBelow
      exercise.value.questions[index] = tempQuestionAbove
    }
  }
}

const moveQuestionDown = (question: Question) => {
  const index = exercise.value.questions.findIndex((q) => q.id === question.id)
  if (index < exercise.value.questions.length - 1) {
    const tempQuestionAbove = exercise.value.questions[index + 1]
    const tempQuestionBelow = exercise.value.questions[index]
    if (tempQuestionAbove && tempQuestionBelow) {
      exercise.value.questions[index + 1] = tempQuestionBelow
      exercise.value.questions[index] = tempQuestionAbove
    }
  }
}
</script>

<template>
  <div class="create-form">
    <n-input
      v-model:value="exercise.name"
      size="large"
      placeholder="Titel des Aufgabenbuchs"
    >
      <template #prefix><p class="label">Titel:</p></template>
    </n-input>
    <n-input
      v-model:value="exercise.topic"
      placeholder="Thema des Aufgabenbuchs"
      >
      <template #prefix><p class="label">Thema:</p></template>
    </n-input>

    <div
      class="form-question"
      v-for="(question, index) in exercise.questions"
      :key="question.id"
    >
      <FormQuestionYesNo
        v-if="exercise.questions[index]"
        v-model="exercise.questions[index]"
        @delete="deleteQuestion"
        @moveUp="moveQuestionUp"
        @moveDown="moveQuestionDown"
      />
    </div>
    <n-button @click="addQuestion">Frage hinzufügen</n-button>
  </div>
</template>

<style lang="scss" scoped>
.create-form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .label {
    font-weight: 500;
    font-size: 0.9rem;
  }
}
</style>
