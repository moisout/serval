<template>
  <div class="start-screen">
    <p class="start-text">Drücke den grünen Knopf, um die Aufgabe zu starten</p>
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
    font-size: 3rem;
  }

  .push-button {
    color: green;
  }
}
</style>
