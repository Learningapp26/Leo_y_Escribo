let currentAudio = null

export function playAudio(source) {
  if (!source) {
    console.warn('No se proporcionó una ruta de audio.')
    return
  }

  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
  }

  currentAudio = new Audio(source)

  currentAudio.play().catch((error) => {
    console.error(
      `No se pudo reproducir el audio: ${source}`,
      error,
    )
  })
}

export function stopAudio() {
  if (!currentAudio) return

  currentAudio.pause()
  currentAudio.currentTime = 0
  currentAudio = null
}