export const getTimestampFromSeconds = (seconds?: number): string => {
  if (!seconds) {
    return '00:00'
  }

  seconds = Math.floor(seconds)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  const secondsLeft = seconds - hours * 3600 - minutes * 60

  let timestamp = ''
  if (hours > 0) {
    timestamp += hours + ':'
  }
  if (minutes < 10) {
    timestamp += '0'
  }
  timestamp += minutes + ':'
  if (secondsLeft < 10) {
    timestamp += '0'
  }
  timestamp += secondsLeft.toFixed(0)

  return timestamp
}
