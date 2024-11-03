<script setup lang="ts">
definePageMeta({
  layout: 'exercise'
})

const route = useRoute()

const { data: exercise } = useFetch<Exercise>(
  `/api/exercise/${route.params.id}`
)

const currentScreen = ref(-1)

const greenButton = () => {
  if (currentScreen.value === -1) {
    currentScreen.value = 0
  } else {
    currentScreen.value++
  }
}

const redButton = () => {}

const yellowButton = () => {}

const onButtonPress = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    greenButton()
  } else if (event.key === 'ArrowRight') {
    redButton()
  } else if (event.key === 'ArrowDown') {
    yellowButton()
  }
}

onMounted(() => {
  window.addEventListener('keyup', onButtonPress)
})

const questionsCount = computed(() => exercise?.value?.questions?.length ?? 0)
</script>

<template>
  <div class="solve" v-if="exercise">
    <SolveStartScreen v-if="currentScreen === -1" />
    <div class="question-screens" v-else-if="currentScreen < questionsCount">
      <div
        class="question-screen"
        v-for="(question, index) in exercise.questions"
      >
        <SolveQuestionScreen
          v-if="index === currentScreen"
          :question="question"
        />
      </div>
    </div>
  </div>
  <div v-else>...</div>
</template>

<style lang="scss" scoped>
.solve {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: globals.$bg-primary;

  .question-screens {
    width: 100%;
    height: 100%;

    .question-screen {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
}
</style>
