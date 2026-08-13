// Registra un listener global que aplica/remueve la clase 'active' en botones
// que tengan `data-audio-src="..."` cuando se produzca el evento 'audio:state'.

function handleAudioState(e) {
  const { src, playing } = e.detail || {}

  // remover active de todos y luego aplicar solo al matching
  document.querySelectorAll('[data-audio-src].btn--audio').forEach((el) => {
    try {
      const elSrc = el.getAttribute('data-audio-src')
      if (!elSrc) return

      if (elSrc === src && playing) {
        el.classList.add('active')
        el.setAttribute('aria-pressed', 'true')
      } else {
        el.classList.remove('active')
        el.setAttribute('aria-pressed', 'false')
      }
    } catch (err) {
      // ignore
    }
  })
}

window.addEventListener('audio:state', handleAudioState)

export default {}
