<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="correct-screen">
    <p class="correct-text">{{ text }}</p>
    <Icon
      name="material-symbols:radio-button-checked-outline"
      size="100"
      class="push-button"
    />
  </div>
</template>

<style lang="scss" scoped>
.correct-screen {
  background-color: globals.$gray-100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;

  .correct-text {
    font-size: 3.2rem;
  }

  .push-button {
    color: #eaea00;
  }
}
</style>
