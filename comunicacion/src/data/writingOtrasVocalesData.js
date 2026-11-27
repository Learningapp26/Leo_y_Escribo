import { createWritingContent } from './writingLessonHelpers.js'

// Leo y escribo, pp. 249–250. Cutting, pasting and writing become ordering and selecting.
const { base, finish, word, syllable, audio, instruction, present } = createWritingContent(
  'escritura-otras-vocales-juntas', 'Otras palabras con vocales juntas', 249,
  'Hay otras palabras que llevan dos vocales juntas, pero no están en la misma sílaba; por eso sí se pueden separar.',
)
const images = { cuerda: 'l/cuerda', lengua: 'l/lengua', fuente: 'f/fuente', koala: 'k/koala' }
const pic = (text) => ({ ...word(text, true), ...(images[text] ? { image: `/images/lecciones/${images[text]}.png` } : {}) })
const split = (text, parts) => ({ ...word(text), label: parts })

// Page 249: words said slowly, syllable by syllable.
const slowWords = [['mareo', 'ma-re-o'], ['héroe', 'hé-ro-e'], ['caer', 'ca-er'], ['leer', 'le-er'], ['peor', 'pe-or'],
  ['poeta', 'po-e-ta'], ['teatro', 'te-a-tro'], ['correo', 'co-rre-o'], ['área', 'á-re-a']]

// Page 249 drawings with their printed syllable boxes.
const boxes = [['leer', ['le', 'er']], ['toalla', ['to', 'a', 'lla']], ['maestra', ['ma', 'es', 'tra']]]

// Page 249 cards: every name is formed from the same set of syllable cards.
const cards = ['ca', 'la', 'llo', 'no', 'a', 'ar', 'tra', 'cue', 'pe', 'jau']
const names = [['trapear', ['tra', 'pe', 'ar']], ['jaula', ['jau', 'la']], ['canoa', ['ca', 'no', 'a']], ['cuello', ['cue', 'llo']]]

// Page 250 drawings and their names split in syllables.
const matching = [['cuerda', 'cuer - da'], ['lengua', 'len - gua'], ['fuente', 'fuen - te'], ['koala', 'ko - a - la']]

// Syllables of the word plus three from the other words, mixed in a fixed order.
const withExtras = (parts, all) => {
  const extras = all.filter((piece) => !parts.includes(piece))
  const start = parts.join('').length % extras.length
  const pieces = [...new Set([...parts, ...[0, 2, 4].map((step) => extras[(start + step) % extras.length])])]
  let seed = [...parts.join('')].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
  for (let i = pieces.length - 1; i > 0; i -= 1) {
    seed = (seed * 1103515245 + 12345) >>> 0
    const j = seed % (i + 1)
    ;[pieces[i], pieces[j]] = [pieces[j], pieces[i]]
  }
  return pieces
}
const boxPieces = [...new Set([...boxes, ...names].flatMap(([, parts]) => parts))]

const orderPieces = (id, page, text, parts, options, text2) => ({
  id, page, type: 'order', compactOptions: true, prompt: pic(text),
  instruction: instruction(id.startsWith('tarjetas') ? 'tarjetas' : 'separar', text2),
  options: options.map(syllable), answer: text, answerLength: parts.length, separator: '',
  resultAudio: word(text).audio,
})

export const writingOtrasVocalesLesson = finish({
  ...base,
  pages: '249–250',
  activities: [
    { id: 'escuchar', title: 'Escuchamos y separamos', exercises: [
      present('repetir-despacio', 249, 'Escucha y luego repite despacio cada palabra, sílaba por sílaba.',
        slowWords.map(([text, parts]) => ({ ...word(text), label: `${text}\n${parts}`,
          audio: audio(`silabas-${word(text).id}`, `${parts}. ${text}.`, 'Sílabas') }))),
      ...boxes.map(([text, parts]) => orderPieces(`separar-${text}`, 249, text, parts, withExtras(parts, boxPieces),
        'Observa el dibujo. Busca sus sílabas y selecciónalas en orden para formar la palabra. ¡Cuidado, sobran algunas! Fíjate en las vocales que están juntas. Puedes quitar la última para corregir.')),
    ] },
    { id: 'tarjetas', title: 'Formamos nombres con tarjetas', exercises: names.map(([text, parts]) =>
      orderPieces(`tarjetas-${text}`, 249, text, parts, cards,
        'Busca las tarjetas con las sílabas que forman el nombre del dibujo. Selecciónalas en orden. Puedes quitar la última para corregir.')) },
    { id: 'unir', title: 'Unimos dibujo y nombre', exercises: [
      { id: 'dibujo-nombre', page: 250, type: 'match',
        instruction: instruction('dibujo-nombre', 'Observa los dibujos. Lee las sílabas. Selecciona el nombre de cada figura.'),
        groups: matching.map(([text], i) => ({ ...pic(text), answer: word(text).id,
          options: [i, (i + 1) % 4, (i + 2) % 4].map((index) => split(...matching[index]))
            .sort((a, b) => a.label.localeCompare(b.label, 'es')),
        })),
      },
    ] },
  ],
})
