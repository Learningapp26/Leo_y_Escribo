import { createBookContent } from './bookLessonHelpers.js'

// Only supplied recordings are enabled; preserve their exact filename casing.
export function createWritingContent(id, title, page, introduction, recordings = []) {
  const content = createBookContent(id)
  const originalAudio = content.audio
  const recordedFiles = new Map(recordings.map((file) => [file.toLowerCase(), file]))
  const pending = (value) => {
    if (!value || typeof value !== 'object') return value
    if (value.src) {
      const file = recordedFiles.get(value.src.split('/').pop().toLowerCase())
      value.available = Boolean(file)
      if (file) value.src = `/audio/lecciones/${id}/${file}`
    }
    Object.values(value).forEach(pending)
    return value
  }
  return {
    ...content,
    finish: pending,
    base: {
      id, title, heading: title, unitId: 7, pages: String(page),
      showReadingSource: false, centeredItems: true,
      reading: { instruction: content.instruction('introduccion', introduction) },
      completionTitle: '¡Terminaste esta lección de escritura!',
      feedback: {
        correct: originalAudio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
        retry: originalAudio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
        completed: originalAudio('felicitacion-final', '¡Terminaste! Vuelve a las lecciones del Planeta Escritor.'),
      },
    },
  }
}
