<script setup lang="ts">
import { NFlex } from 'naive-ui'
defineProps<{
  question: Question
}>()
</script>

<template>
  <div class="question-screen">
    <p class="question-text">{{ question.question }}</p>
    <p class="additional-text">
      {{ question.additionalText }}
    </p>
    <n-flex justify="space-evenly">
      <Icon
        name="material-symbols:radio-button-checked-outline"
        size="160"
        class="push-button-green"
      />
      <Icon
        name="material-symbols:radio-button-checked-outline"
        size="160"
        class="push-button-red"
      />
    </n-flex>
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
    font-size: 3.5rem;
  }

  .additional-text {
    font-size: 3rem;
  }

  .push-button-green {
    color: green;
    margin: 0 40px;
  }
  .push-button-red {
    color: red;
    margin: 0 40px;
  }
}
</style>
