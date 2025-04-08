import textToSpeech from '@google-cloud/text-to-speech'
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

  if (!process.env.GOOGLE_PROJECT_ID || !process.env.GOOGLE_API_KEY) {
    setResponseStatus(event, 500)
    return {
      error: 'Google project ID or access token is not set'
    }
  }

  const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY,
    projectId: process.env.GOOGLE_PROJECT_ID
  })

  const [audio] = await client.synthesizeSpeech({
    input: {
      text: cleanedText
    },
    voice: {
      languageCode: query.lang?.toString() || 'de-DE',
      name: 'de-DE-Chirp3-HD-Leda'
    },
    audioConfig: {
      audioEncoding: 'MP3'
    }
  })

  if (!audio?.audioContent) {
    setResponseStatus(event, 500)
    return {
      error: 'Audio content is empty'
    }
  }

  const audioBlob = new Blob([audio.audioContent])

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
