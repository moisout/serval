import { hashString } from '~~/server/utils/hashString'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const { text } = await readBody<{ text: string }>(event)

  const query = getQuery(event)

  const cleanedText = text.trim()

  const textHash = await hashString(cleanedText)
  const fileName = `${textHash}.mp3`

  const existingFile = await hubBlob().get(fileName)

  if (existingFile) {
    return hubBlob().serve(event, fileName)
  }

  if (!process.env.TTS_RELAY_SECRET_KEY) {
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
      secretKey: process.env.TTS_RELAY_SECRET_KEY
    }
  })

  if (!audioResponse) {
    setResponseStatus(event, 500)
    return {
      error: 'Audio content is empty'
    }
  }

  const audioBlob = new Blob([audioResponse as any])

  const uploadedAudio = await hubBlob().put(fileName, audioBlob, {
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

  return hubBlob().serve(event, fileName)
})
