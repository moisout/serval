<script setup lang="ts">
const props = defineProps<{
  exercise: Exercise
}>()

const questionsText = computed(() => {
  if (props.exercise.questions?.length === 0) {
    return 'Keine Fragen'
  } else if (props.exercise.questions?.length === 1) {
    return `${props.exercise.questions?.length} Frage`
  } else {
    return `${props.exercise.questions?.length} Fragen`
  }
})

const topicText = computed(() => props.exercise.topic?.slice(0, 10))
</script>

<template>
  <div class="exercise">
    <p class="exercise-name">{{ exercise.name }}</p>

    <p class="exercise-author">{{ exercise.author }}</p>
    <div class="exercise-topic">
      <span>{{ topicText }}</span
      ><span> {{ questionsText }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.exercise {
  background-color: globals.$bg-primary;
  border-radius: 10px;
  padding: 10px 10px 40px 10px;
  cursor: pointer;
  border: 1px solid transparent;
  box-shadow: 0 1px 4px 0 #{globals.$primary}3a;
  position: relative;

  &:hover {
    border: 1px solid globals.$primary;
  }

  .exercise-name {
    font-size: 1.2rem;
    font-weight: 600;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 5px;
    display: -webkit-box;
    overflow: hidden;
    color: globals.$text-primary;
  }

  .exercise-author {
    font-size: 0.8rem;
    // font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: globals.$primary;
  }

  .exercise-topic {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 0.9rem;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    padding: 0 10px 10px 10px;
    color: globals.$text-secondary;
  }
}
</style>
