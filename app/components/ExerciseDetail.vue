<script lang="ts" setup>
defineProps<{
  exercise: Exercise
}>()
</script>

<template>
  <div class="exercise-detail">
    <p class="exercise-questions">Fragen</p>
    <div
      class="questions"
      v-for="(question, index) in exercise.questions"
      :key="question.id"
    >
      <p class="question">{{ index + 1 }}. {{ question.question }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.exercise-detail {
  border: solid 1px globals.$gray-300;
  padding: 20px;
  border-radius: 10px;
  z-index: 10;
  position: relative;
  background-color: globals.$bg-primary;
  display: flex;
  gap: 20px;
  flex-direction: column;

  .exercise-questions {
    font-size: 1.6rem;
  }

  .questions {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .question {
      background-color: globals.$gray-200;
      padding: 10px 15px;
      border-radius: 10px;
    }
  }
}
</style>
