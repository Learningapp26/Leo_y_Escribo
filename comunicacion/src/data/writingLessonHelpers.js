import { createBookContent } from './bookLessonHelpers.js'

// Shared metadata for the book's final writing pages. No recordings supplied yet.
export function createWritingContent(id, title, page, introduction) {
  const content = createBookContent(id)
  const originalAudio = content.audio
  const pending = (value) => {
    if (!value || typeof value !== 'object') return value
    if (value.src) value.available = false
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
