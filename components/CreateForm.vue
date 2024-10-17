<script setup lang="ts">
const { data } = useAuth()

const exercise = reactive<Exercise>({
  name: 'Neues Aufgabenbuch',
  topic: 'z.B. Mathe',
  author: data.value?.username || 'Unbekannt',
  questions: []
})

const name = toRef(exercise, 'name')
const topic = toRef(exercise, 'topic')

const addQuestion = () => {
  exercise.questions.push({
    id: (Math.random() * 10000).toString(),
    type: 'yes-no',
    question: 'Neue Frage',
    correctAnswer: 'yes'
  })
}
</script>

<template>
  <div class="create-form">
    <FormEditable v-model="name" title />
    <FormEditable v-model="topic" label="Thema" />

    <div
      class="form-question"
      v-for="(question, index) in exercise.questions"
      :key="question.id"
    >
      <FormQuestionYesNo v-model="exercise.questions[index]" />
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
