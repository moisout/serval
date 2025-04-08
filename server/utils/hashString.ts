export const hashString = async (text: string): Promise<string> => {
  const encoder = new TextEncoder()
  const encodedText = encoder.encode(text)
  const textHash = await crypto.subtle.digest('SHA-1', encodedText)

  const hashArray = Array.from(new Uint8Array(textHash))
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

  return hashHex
}
