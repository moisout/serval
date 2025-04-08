<template>
  <div class="start-screen">
    <p class="start-text">{{ defaultTexts.endScreen }}</p>
    <Icon
      name="material-symbols:radio-button-checked-outline"
      size="100"
      class="push-button"
    />
  </div>
</template>

<style lang="scss" scoped>
.start-screen {
  height: 100%;
  background-color: globals.$gray-100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;

  .start-text {
    font-size: 3.2rem;
  }

  .push-button {
    color: #eaea00;
  }
}
</style>
