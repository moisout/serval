<script setup lang="ts">
const { data: exercises } = useFetch('/api/exercises')
</script>

<template>
  <TitleBox>
    <div class="home-title-section">
      <p class="home-title">Aufgabenbücher</p>
      <PrimaryButton to="/create" text="Aufgabenbuch erstellen" />
    </div>
  </TitleBox>
  <div class="exercises">
    <ListExercise
      v-for="(exercise, index) in exercises"
      :exercise="exercise"
      :key="index"
    />
  </div>
</template>

<style lang="scss" scoped>
.home-title-section {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  .home-title {
    font-size: 1.8rem;
  }
}

.exercises {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1em 2em;
}
</style>
