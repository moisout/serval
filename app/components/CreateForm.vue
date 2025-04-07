<script setup lang="ts">
import { v4 } from 'uuid'

const props = defineProps<{ exercise: Exercise }>()

const exercise = toRef(props, 'exercise')

const addQuestion = () => {
  exercise.value.questions.push({
    id: v4(),
    type: 'yes-no',
    question: 'Neue Frage',
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
    <FormEditable v-model="exercise.name" title />
    <FormEditable v-model="exercise.topic" label="Thema" />

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
    <PrimaryButton
      class="add-question-btn"
      text="Frage hinzufügen"
      type="button"
      @click="addQuestion"
    />
  </div>
</template>

<style lang="scss" scoped>
.create-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
