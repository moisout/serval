<script setup lang="ts">
import { NSpin } from 'naive-ui'

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
  audio.value.playbackRate = defaultValues.playbackRate

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
    <button
      type="button"
      class="audio-player"
      :aria-label="audioState.playing ? 'Pausieren' : 'Abspielen'"
      @click="toggleAudio"
    >
      <span class="icon">
        <Icon
          v-if="audioState.buffering"
          name="material-symbols:hourglass-top-rounded"
        />
        <Icon
          v-else-if="audioState.playing"
          name="material-symbols:pause-outline-rounded"
        />
        <Icon v-else name="material-symbols:play-arrow-outline-rounded" />
      </span>
      <span class="length">
        {{ getTimestampFromSeconds(audio?.duration) }}
      </span>
    </button>
  </n-spin>
</template>

<style lang="scss" scoped>
.audio-player {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border: solid 1px globals.$gray-300;
  background-color: globals.$bg-primary;
  border-radius: 10px;
  padding: 5px 15px 5px 5px;
  font-family: globals.$font-primary;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: globals.$gray-200;
  }

  &:focus-visible {
    outline: 2px solid globals.$primary;
    outline-offset: 2px;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    font-size: 18px;
    color: globals.$gray-900;
  }

  .length {
    color: globals.$gray-700;
    font-weight: 500;
  }
}
</style>
