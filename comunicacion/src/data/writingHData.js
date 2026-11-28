import { createWritingContent } from './writingLessonHelpers.js'

// Leo y escribo, Paso 2, p. 255. Original clues, numbering and crossing layout.
const { base, finish, word, audio, instruction, present } = createWritingContent(
  'escritura-h', '¡Escribamos palabras con h!', 255,
  'Recuerda que la letra h es muda porque no tiene sonido. Fíjate en las palabras que se escriben con h. Léelas y completa el crucigrama.',
  [
    "Felicitacion-final.mp3",
    "Habas.mp3",
    "Hacha.mp3",
    "Hamaca.mp3",
    "Harina.mp3",
    "Helado.mp3",
    "Hielo.mp3",
    "Hierba.mp3",
    "Hierro.mp3",
    "Hija.mp3",
    "Hilo.mp3",
    "Hipop\u00f3tamo.mp3",
    "Horchata.mp3",
    "Hormiga.mp3",
    "Horno.mp3",
    "Hospital.mp3",
    "Huerto.mp3",
    "Huevo.mp3",
    "Humo.mp3",
    "Instruccion-horizontales.mp3",
    "Instruccion-introduccion.mp3",
    "Instruccion-palabras.mp3",
    "Instruccion-verticales.mp3",
    "Intenta-otra-vez.mp3",
    "Pista-horizontal-1.mp3",
    "Pista-horizontal-2.mp3",
    "Pista-horizontal-3.mp3",
    "Pista-horizontal-4.mp3",
    "Pista-vertical-1.mp3",
    "Pista-vertical-2.mp3",
    "Pista-vertical-3.mp3",
    "Respuesta-correcta.mp3",
  ],
  {
    "hipopotamo.mp3": "Hipop\u00f3tamo.mp3",
    "instruccion-palabras-0.mp3": "Instruccion-palabras.mp3",
    "instruccion-palabras-1.mp3": "Instruccion-palabras.mp3"
  },
)
const vocabulary = [
  ['hierba', 'huevo', 'hamaca', 'harina', 'hilo', 'hija'],
  ['hierro', 'hospital', 'hormiga', 'habas', 'hipopótamo', 'humo'],
]
export const writingHCrossword = {
  rows: 9, columns: 9,
  entries: [
    { id: 'horizontal-1', number: 1, direction: 'across', row: 0, col: 2, answer: 'huerto', clue: 'Lugar donde se siembran hortalizas.' },
    { id: 'horizontal-2', number: 2, direction: 'across', row: 2, col: 0, answer: 'huevo', clue: 'Es lo que pone la gallina.' },
    { id: 'horizontal-3', number: 3, direction: 'across', row: 4, col: 1, answer: 'horchata', clue: 'Fresco que se hace con arroz.' },
    { id: 'horizontal-4', number: 4, direction: 'across', row: 7, col: 3, answer: 'helado', clue: 'Golosina fría que se sirve en un cono.' },
    { id: 'vertical-1', number: 1, direction: 'down', row: 0, col: 2, answer: 'hielo', clue: 'Agua congelada.' },
    { id: 'vertical-2', number: 2, direction: 'down', row: 4, col: 1, answer: 'horno', clue: 'Lugar donde se cocina el pan.' },
    { id: 'vertical-3', number: 3, direction: 'down', row: 3, col: 6, answer: 'hacha', clue: 'Se usa para cortar leña.' },
  ],
}
const across = writingHCrossword.entries.filter((entry) => entry.direction === 'across')
const down = writingHCrossword.entries.filter((entry) => entry.direction === 'down')
const crosswordExercise = (entries, vertical) => ({
  id: vertical ? 'verticales' : 'horizontales', page: 255, type: 'match',
  instruction: instruction(vertical ? 'verticales' : 'horizontales', vertical
    ? 'Encuentra las palabras verticales. Escucha las pistas y fíjate en las letras que comparten con las horizontales.'
    : 'Lee las pistas y descubre la palabra que va en el crucigrama. Guíate por los números y las flechas. Empieza por las palabras horizontales.'),
  crossword: { ...writingHCrossword, ...(vertical ? { prefilled: Object.fromEntries(across.map((entry) => [entry.id, entry.answer])) } : {}) },
  groups: entries.map((entry) => ({ id: entry.id, label: `${entry.number}. ${entry.clue}`,
    listenLabel: 'Escuchar pista', audio: audio(`pista-${entry.id}`, entry.clue, 'Pistas'), answer: entry.answer,
    options: entries.map((option) => word(option.answer)),
  })),
})
export const writingHLesson = finish({
  ...base,
  activities: [
    { id: 'palabras', title: 'Leemos palabras con h', exercises: vocabulary.map((items, index) =>
      present(`palabras-${index}`, 255, 'Fíjate en las palabras que se escriben con h. Escucha y lee cada palabra con tu maestra.', items.map((text) => word(text)))),
    },
    { id: 'horizontales', title: 'Crucigrama: horizontales', exercises: [crosswordExercise(across, false)] },
    { id: 'verticales', title: 'Crucigrama: verticales', exercises: [crosswordExercise(down, true)] },
  ],
})
