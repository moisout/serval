import { blob } from 'hub:blob'
import { hashString } from '~~/server/utils/hashString'

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event)

  const { text } = await readBody<{ text: string }>(event)

  const query = getQuery(event)

  const cleanedText = text.trim()

  const textHash = await hashString(cleanedText)
  const fileName = `${textHash}.mp3`

  const existingFile = await blob.get(fileName)

  if (existingFile) {
    return blob.serve(event, fileName)
  }

  // Nitro doesn't populate process.env on Cloudflare, secrets live on the request env
  const secretKey: string | undefined =
    event.context.cloudflare?.env?.TTS_RELAY_SECRET_KEY ??
    process.env.TTS_RELAY_SECRET_KEY

  // Only generating new audio costs money, cached audio isn't limited
  await enforceRateLimit(event, rateLimitRules.ttsGenerationsPerUser, user.id)

  if (!secretKey) {
    setResponseStatus(event, 500)
    return {
      error: 'TTS relay secret key is not set'
    }
  }

  const audioResponse = await $fetch('http://tts-relay.m0.is/api/tts', {
    method: 'POST',
    body: {
      text: cleanedText,
      lang: query.lang?.toString() || 'de-DE',
      secretKey
    }
  })

  if (!audioResponse) {
    setResponseStatus(event, 500)
    return {
      error: 'Audio content is empty'
    }
  }

  const audioBlob = new Blob([audioResponse as any])

  const uploadedAudio = await blob.put(fileName, audioBlob, {
    customMetadata: {
      originalText: cleanedText
    }
  })

  if (!uploadedAudio) {
    setResponseStatus(event, 500)
    return {
      error: 'Failed to store audio'
    }
  }

  return blob.serve(event, fileName)
})
