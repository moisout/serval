<script lang="ts" setup>
defineProps<{
  exercise: Exercise
}>()

const mapAnswer = (answer: string) => {
  switch (answer) {
    case 'yes':
      return 'Ja'
    case 'no':
      return 'Nein'
    default:
      return answer
  }
}
</script>

<template>
  <div class="exercise-detail">
    <p class="exercise-questions">Fragen</p>
    <div
      class="questions"
      v-for="(question, index) in exercise.questions"
      :key="question.id"
    >
      <div class="question">
        <p class="question-text">{{ index + 1 }}. {{ question.question }}</p>
        <p class="additional-text" v-if="question.additionalText">
          {{ question.additionalText }}
        </p>
        <p class="answer-text">
          Korrekte Antwort: {{ mapAnswer(question.correctAnswer) }}
        </p>
        <AudioPlayer :text="getSpokenText(question)" />
      </div>
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
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .question-text {
        font-size: 1.1rem;
      }
      .answer-text {
        font-size: 1rem;
        color: globals.$gray-600;
      }
    }
  }
}
</style>
