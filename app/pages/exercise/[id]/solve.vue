<script setup lang="ts">
import { NButton } from 'naive-ui'

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
    playScreenAudio()
  } else {
    router.push(`/exercise/${route.params.id}`)
  }
}

const currentlySpeaking = ref(false)

const correctScreenVisible = ref(false)
const incorrectScreenVisible = ref(false)

const redButton = async () => {
  const currentQuestion = exercise.value?.questions[currentScreen.value]
  if (currentQuestion?.correctAnswer === 'no') {
    correctScreenVisible.value = true
    await playScreenAudio()
    correctScreenVisible.value = false
  } else {
    incorrectScreenVisible.value = true
    await playScreenAudio()
    incorrectScreenVisible.value = false
  }
  storeAnswer('no')
  currentScreen.value++
  await playScreenAudio()
}

const greenButton = async () => {
  const currentQuestion = exercise.value?.questions[currentScreen.value]
  if (currentQuestion?.correctAnswer === 'yes') {
    correctScreenVisible.value = true
    await playScreenAudio()
    correctScreenVisible.value = false
  } else {
    incorrectScreenVisible.value = true
    await playScreenAudio()
    incorrectScreenVisible.value = false
  }
  storeAnswer('yes')
  currentScreen.value++
  await playScreenAudio()
}

const storeAnswer = async (answer: string) => {
  const currentQuestion = exercise.value?.questions[currentScreen.value]
  if (currentQuestion) {
    await $fetch(`/api/exercises/${exercise.value?.id}/answers`, {
      method: 'POST',
      body: {
        answer,
        questionId: currentQuestion.id
      },
      credentials: 'include'
    })
  }
}

const onButtonPress = (event: KeyboardEvent) => {
  if (currentlySpeaking.value) {
    return
  }

  if (event.key === 'ArrowLeft') {
    yellowButton()
  } else if (event.key === 'ArrowDown') {
    redButton()
  } else if (event.key === 'ArrowUp') {
    greenButton()
  }
}

const audioElement = ref<HTMLAudioElement | null>(null)

const playScreenAudio = async () => {
  currentlySpeaking.value = true

  let textToPlay = ''
  if (correctScreenVisible.value) {
    textToPlay = defaultTexts.correct
  } else if (incorrectScreenVisible.value) {
    textToPlay = defaultTexts.incorrect
  } else {
    if (currentScreen.value === -1) {
      textToPlay = defaultTexts.startScreen
    } else if (currentScreen.value < questionsCount.value) {
      textToPlay = getSpokenText(exercise.value?.questions[currentScreen.value])
    } else if (currentScreen.value === questionsCount.value) {
      textToPlay = defaultTexts.endScreen
    }
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
  return new Promise((resolve) => {
    audioElement.value = new Audio(audioUrl)
    audioElement.value.playbackRate = defaultValues.playbackRate

    const ended = () => {
      currentlySpeaking.value = false
      audioElement.value?.removeEventListener('ended', ended)
      resolve(true)
    }

    audioElement.value.addEventListener('ended', ended)
    audioElement.value.addEventListener('canplay', playAudio)
  })
}

const playAudio = async () => {
  if (audioElement.value) {
    audioElement.value.play()
  }
  return new Promise((resolve) => {
    const resolvePromise = () => {
      resolve(true)
      audioElement.value?.removeEventListener('canplay', resolvePromise)
    }
    audioElement.value?.addEventListener('ended', resolvePromise)
  })
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
    <div class="status">
      <nuxt-link :to="`/exercise/${route.params.id}`">
        <n-button>
          <template #icon>
            <Icon name="material-symbols:cancel-outline-rounded" />
          </template>
          Übung abbrechen
        </n-button>
      </nuxt-link>
    </div>
    <div
      class="repeat-info"
      v-if="currentScreen > -1 && currentScreen < questionsCount"
    >
      <Icon
        name="material-symbols:radio-button-checked-outline"
        size="50"
        class="push-button"
      />
      <p>Gesprochenes wiederholen</p>
    </div>
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
    <SolveOverlay v-if="correctScreenVisible" :text="defaultTexts.correct" />
    <SolveOverlay
      v-if="incorrectScreenVisible"
      :text="defaultTexts.incorrect"
    />
  </div>
  <div v-else>...</div>
</template>

<style lang="scss" scoped>
.solve {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: globals.$bg-primary;

  .status {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    margin: 10px;
  }

  .repeat-info {
    position: fixed;
    z-index: 9999;
    bottom: 0;
    left: 0;
    margin: 10px;
    display: flex;
    align-items: center;
    gap: 10px;

    .push-button {
      color: #eaea00;
    }

    p {
      font-size: 2rem;
      color: globals.$gray-900;
    }
  }

  .exercise-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 999;

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
