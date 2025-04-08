<script setup lang="ts">
definePageMeta({
  layout: 'exercise'
})

const route = useRoute()
const router = useRouter()

const headers = useRequestHeaders(['cookie'])
const { data: exercise } = useFetch<Exercise>(
  `/api/exercises/${route.params.id}`,
  {
    headers,
    credentials: 'include'
  }
)
const questionsCount = computed(() => exercise?.value?.questions?.length ?? 0)

const currentScreen = ref(-1)

const yellowButton = () => {
  if (currentScreen.value === -1) {
    currentScreen.value = 0
  } else if (currentScreen.value < questionsCount.value) {
    currentScreen.value++
  } else {
    router.push(`/exercise/${route.params.id}`)
  }
}

const redButton = () => {}

const greenButton = () => {}

const onButtonPress = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    yellowButton()
  } else if (event.key === 'ArrowRight') {
    redButton()
  } else if (event.key === 'ArrowDown') {
    greenButton()
  }
}

onMounted(() => {
  window.addEventListener('keyup', onButtonPress)
})
</script>

<template>
  <div class="solve" v-if="exercise">
    <div
      class="exercise-progress"
      v-if="currentScreen > -1 && currentScreen < questionsCount"
    >
      <p class="exercise-progress-text">
        {{ currentScreen + 1 }} / {{ questionsCount }}
      </p>
    </div>
    <SolveStartScreen v-if="currentScreen === -1" />
    <div class="question-screens" v-else-if="currentScreen < questionsCount">
      {{ currentScreen }}
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
    <SolveEndScreen v-else />
  </div>
  <div v-else>...</div>
</template>

<style lang="scss" scoped>
.solve {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: globals.$bg-primary;

  .exercise-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 9999;

    .exercise-progress-text {
      font-size: 3.2rem;
      color: globals.$gray-900;
    }
  }

  .question-screens {
    width: 100%;
    height: 100%;

    .question-screen {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }
  }
}
</style>
