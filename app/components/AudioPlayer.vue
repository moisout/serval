<script setup lang="ts">
import { NButton, NSpace, NSpin } from 'naive-ui'

const props = defineProps<{
  text: string
}>()

const audio = ref<HTMLAudioElement>()

const audioState = reactive({
  playing: false,
  buffering: true
})

const error = ref<string>('error help')

onMounted(async () => {
  await requestAudio()
})

watch(
  () => props.text,
  async (newText) => {
    if (newText) {
      audio.value?.pause()
      audio.value = undefined
      audioState.playing = false
      audioState.buffering = true
      error.value = ''
      await requestAudio()
    }
  }
)

const requestAudio = async () => {
  const audioResponse = await $fetch('/api/tts/synthesize', {
    method: 'POST',
    body: {
      text: props.text,
      lang: 'de-DE'
    }
  })

  const audioError = (audioResponse as any)?.error

  if (!audioResponse || audioError) {
    error.value = audioError || 'Audio not found'
    return
  }

  const audioBlob = new Blob([audioResponse as unknown as string], {
    type: 'audio/mpeg'
  })

  const audioUrl = URL.createObjectURL(audioBlob)

  const audioElement = new Audio(audioUrl)
  audio.value = audioElement

  registerEventListeners(audioElement)
}

const registerEventListeners = (audioElement: HTMLAudioElement) => {
  audioElement.addEventListener('canplay', () => {
    audioState.buffering = false
  })
  audioElement.addEventListener('playing', () => {
    audioState.playing = true
    audioState.buffering = false
  })
  audioElement.addEventListener('pause', () => {
    audioState.playing = false
    audioState.buffering = false
  })
  audioElement.addEventListener('waiting', () => {
    audioState.buffering = true
  })
  audioElement.addEventListener('ended', () => {
    audioState.playing = false
    audioState.buffering = false
  })
}

const toggleAudio = () => {
  if (audio.value) {
    if (!audioState.buffering) {
      if (audioState.playing) {
        audio.value.pause()
      } else {
        audio.value.play()
      }
    } else {
      audio.value.currentTime = 0
    }
  }
}
</script>

<template>
  <n-spin :show="audioState.buffering">
    <n-space class="audio-player" align="center">
      <n-button @click="toggleAudio" quaternary circle>
        <template #icon>
          <Icon
            v-if="audioState.buffering"
            name="material-symbols:hourglass-top-rounded"
          />
          <Icon
            v-if="audioState.playing"
            name="material-symbols:pause-outline-rounded"
          />
          <Icon v-else name="material-symbols:play-arrow-outline-rounded" />
        </template>
      </n-button>
      <p class="length">
        {{ getTimestampFromSeconds(audio?.duration) }}
      </p>
    </n-space>
  </n-spin>
</template>

<style lang="scss" scoped>
.audio-player {
  border: solid 1px globals.$gray-300;
  background-color: globals.$bg-primary;
  border-radius: 10px;
  padding: 5px 15px 5px 5px;

  .length {
    color: globals.$gray-700;
    font-weight: 500;
  }
}
</style>
