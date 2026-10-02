let currentAudio = null
let currentSrc = null

// playAudio ahora actúa como toggle para la misma pista:
// - si se llama con la misma `source` y el audio está reproduciéndose, lo pausa
// - si se llama con la misma `source` y está pausado, lo reanuda
// - si se llama con otra `source`, para la anterior (si existe) y reproduce la nueva
// Devuelve el objeto Audio (o null si no se proporcionó source).
export function playAudio(source) {
  if (!source) {
    console.warn('No se proporcionó una ruta de audio.')
    return null
  }

  // mismo source -> toggle
  if (currentAudio && currentSrc === source) {
    try {
      if (!currentAudio.paused) {
        currentAudio.pause()
        // notificar cambio de estado
        try { window.dispatchEvent(new CustomEvent('audio:state', { detail: { src: currentSrc, playing: false } })) } catch { /* El estado visual del audio es opcional. */ }
      } else {
        currentAudio.play().catch(() => {})
        try { window.dispatchEvent(new CustomEvent('audio:state', { detail: { src: currentSrc, playing: true } })) } catch { /* El estado visual del audio es opcional. */ }
      }
    } catch (err) {
      console.error('Error al toggle audio', err)
    }

    return currentAudio
  }

  // otra pista: parar la anterior y reproducir la nueva
  if (currentAudio) {
    try {
      currentAudio.pause()
      currentAudio.currentTime = 0
    } catch {
      // ignore
    }
  }

  currentAudio = new Audio(source)
  currentSrc = source

  currentAudio.addEventListener('ended', () => {
    currentAudio = null
    currentSrc = null
    try { window.dispatchEvent(new CustomEvent('audio:state', { detail: { src: source, playing: false } })) } catch { /* El estado visual del audio es opcional. */ }
  })

  currentAudio.play().catch((error) => {
    console.error(`No se pudo reproducir el audio: ${source}`, error)
  })
  try { window.dispatchEvent(new CustomEvent('audio:state', { detail: { src: source, playing: true } })) } catch { /* El estado visual del audio es opcional. */ }
  return currentAudio
}

export function stopAudio() {
  if (!currentAudio) return

  try {
    currentAudio.pause()
    currentAudio.currentTime = 0
  } catch {
    // ignore
  }

  currentAudio = null
  currentSrc = null
  try { window.dispatchEvent(new CustomEvent('audio:state', { detail: { src: null, playing: false } })) } catch { /* El estado visual del audio es opcional. */ }
}