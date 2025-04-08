<script setup lang="ts">
import { NPageHeader, NSpace, NButton } from 'naive-ui'
const { data: exercises } = useFetch('/api/exercises')
</script>

<template>
  <n-page-header>
    <template #title>Aufgabenbücher</template>
    <template #extra>
      <n-space>
        <NuxtLink to="/create">
          <n-button>
            <template v-slot:icon>
              <Icon name="material-symbols:add-notes-outline-rounded"
            /></template>
            Aufgabenbuch erstellen
          </n-button>
        </NuxtLink>
      </n-space>
    </template>
  </n-page-header>
  <div class="exercises">
    <ListExercise
      v-for="(exercise, index) in exercises"
      :exercise="exercise"
      :key="index"
    />
  </div>
</template>

<style lang="scss" scoped>
.exercises {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 0;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1em 2em;
}
</style>
