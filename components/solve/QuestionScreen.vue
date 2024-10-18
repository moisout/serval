<script setup lang="ts">
defineProps<{
  question: Question
}>()
</script>

<template>
  <div class="question-screen">
    <p class="question-text">{{ question.question }}</p>
  </div>
</template>

<style lang="scss" scoped>
.question-screen {
  height: 100%;
  background-color: globals.$gray-100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;

  .question-text {
    font-size: 3rem;
  }

  .push-button {
    color: green;
  }
}
</style>
