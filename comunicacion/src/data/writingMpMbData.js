import { createWritingContent } from './writingLessonHelpers.js'

// Leo y escribo, p. 251. The dictation becomes choosing the word you hear.
const { base, finish, word, syllable, audio, instruction, present, select } = createWritingContent(
  'escritura-mp-mb', '¡Escribamos palabras con mp-mb!', 251,
  'Antes de p y b, se escribe la letra m. Escucha las palabras y encuentra mp o mb.',
)
const images = { tambor: 'y/tambor' }
const pic = (text) => ({ ...word(text, true), ...(images[text] ? { image: `/images/lecciones/${images[text]}.png` } : {}) })

// Page 251 words, read again stretching the m sound.
const stretched = [['bomba', 'bommmba'], ['siembra', 'siemmmbra'], ['cambio', 'cammmbio'], ['timbre', 'timmmbre'],
  ['compra', 'commmpra'], ['empleo', 'emmmpleo'], ['tiempo', 'tiemmmpo'], ['trampa', 'trammmpa']]
const withMb = stretched.map(([text]) => text).filter((text) => text.includes('mb'))
const withMp = stretched.map(([text]) => text).filter((text) => text.includes('mp'))

// Page 251 drawings.
const drawings = ['bombera', 'campesinos', 'tambor', 'trompeta']

// Page 251 dictation: [word, the same word misspelled with n, another dictation word].
const dictation = [['comprar', 'conprar'], ['limpiar', 'linpiar'], ['temprano', 'tenprano'],
  ['sembrar', 'senbrar'], ['tramposo', 'tranposo'], ['cumplido', 'cunplido']]
const dictationWords = dictation.map(([text]) => text)

export const writingMpMbLesson = finish({
  ...base,
  activities: [
    { id: 'leer', title: 'Leemos palabras con mp y mb', exercises: [
      present('alargar-m', 251, 'Lee las palabras. Vuelve a leerlas, pero alargando el sonido m. Antes de p y b, se escribe la letra m.',
        stretched.map(([text, long]) => ({ ...word(text), audio: audio(`alargar-${text}`, `${long}. ${text}.`, 'Palabras') }))),
      select('palabras-mb', 251, 'Selecciona todas las palabras que llevan mb.',
        stretched.map(([text]) => word(text)), withMb, { multiple: true }),
      select('palabras-mp', 251, 'Selecciona todas las palabras que llevan mp.',
        stretched.map(([text]) => word(text)), withMp, { multiple: true }),
    ] },
    { id: 'dibujos', title: 'Encontramos mp o mb', exercises: [
      { id: 'combinacion-dibujos', page: 251, type: 'match',
        instruction: instruction('combinacion-dibujos', 'Observa los dibujos. Lee las palabras que los identifican. Selecciona la combinación mp o mb que encuentres.'),
        groups: drawings.map((text) => ({ ...pic(text), answer: text.includes('mp') ? 'mp' : 'mb', options: ['mp', 'mb'].map(syllable) })),
      },
    ] },
    { id: 'escuchar', title: 'Escuchamos y elegimos', exercises: dictation.map(([text, wrong], index) => select(
      `escuchar-${text}`, 251, 'Escucha la palabra. Selecciona la palabra que escuchaste, bien escrita. Recuerda: antes de p y b, se escribe m.',
      [text, wrong, dictationWords[(index + 1) % dictationWords.length]]
        .map((value) => ({ ...word(value), audio: undefined }))
        .sort((a, b) => a.label.localeCompare(b.label, 'es')),
      [text], { prompt: word(text), hideWord: true },
    )) },
  ],
})
