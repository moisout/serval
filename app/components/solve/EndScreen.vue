<template>
  <div class="end-screen">
    <p class="end-text">{{ defaultTexts.endScreen }}</p>
    <Icon
      name="material-symbols:radio-button-checked-outline"
      size="100"
      class="push-button"
    />
  </div>
</template>

<style lang="scss" scoped>
.end-screen {
  height: 100%;
  background-color: globals.$gray-100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;

  .end-text {
    font-size: 3.2rem;
  }

  .push-button {
    color: #eaea00;
  }
}
</style>
