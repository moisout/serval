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
    playScreenAudio()
  } else if (currentScreen.value < questionsCount.value) {
    currentScreen.value++
    playScreenAudio()
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

const audioElement = ref<HTMLAudioElement | null>(null)

const playScreenAudio = async () => {
  let textToPlay = ''
  if (currentScreen.value === -1) {
    textToPlay = defaultTexts.startScreen
  } else if (currentScreen.value < questionsCount.value) {
    textToPlay = getSpokenText(exercise.value?.questions[currentScreen.value])
  } else {
    textToPlay = defaultTexts.endScreen
  }

  const audioResponse = await $fetch('/api/tts/synthesize', {
    method: 'POST',
    body: {
      text: textToPlay,
      lang: 'de-DE'
    }
  })
  const audioError = (audioResponse as any)?.error
  if (!audioResponse || audioError) {
    console.log(audioError || 'Audio not found')
    return
  }
  const audioBlob = new Blob([audioResponse as unknown as string], {
    type: 'audio/mpeg'
  })
  const audioUrl = URL.createObjectURL(audioBlob)
  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value?.removeEventListener('canplay', playAudio)
    audioElement.value = null
  }
  audioElement.value = new Audio(audioUrl)
  audioElement.value.addEventListener('canplay', playAudio)
}

const playAudio = () => {
  if (audioElement.value) {
    audioElement.value.play()
  }
}

onMounted(() => {
  window.addEventListener('keyup', onButtonPress)

  playScreenAudio()
})

onBeforeUnmount(() => {
  window.removeEventListener('keyup', onButtonPress)
  if (audioElement.value) {
    audioElement.value.pause()
    audioElement.value = null
  }
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
