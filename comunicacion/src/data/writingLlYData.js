import { createWritingContent } from './writingLessonHelpers.js'

// Leo y escribo, Paso 2, p. 253. Dictation/copying become recognition and word building.
const { base, finish, word, syllable, instruction, present, order } = createWritingContent(
  'escritura-ll-y', '¡Escribamos palabras con ll-y!', 253,
  'Hay palabras que se escriben con ll y otras con y. Lee y escucha las palabras. Después, reconoce las combinaciones y forma los nombres de los dibujos.',
)
const ll = ['llave', 'llamar', 'lleno', 'llanura', 'bella', 'cabello', 'calle', 'collar', 'mejilla', 'costillas']
const y = ['yo', 'yegua', 'yema', 'yerno', 'yuca', 'yodo', 'yacimiento', 'ensayar', 'inyección', 'hoyo']
const pictures = [
  ['collar', ['llar', 'yar'], 'llar', ['co', 'llar'], '/images/lecciones/cr/collar.png'],
  ['yuca', ['yu', 'llu'], 'yu', ['yu', 'ca']],
  ['llave', ['lla', 'ya'], 'lla', ['lla', 've'], '/images/lecciones/ll/llave.png'],
  ['calle', ['ye', 'lle'], 'lle', ['ca', 'lle']],
  ['inyección', ['llec', 'yec'], 'yec', ['in', 'yec', 'ción']],
  ['cabello', ['yo', 'llo'], 'llo', ['ca', 'be', 'llo']],
  ['hoyo', ['llo', 'yo'], 'yo', ['ho', 'yo']],
  ['costillas', ['yas', 'llas'], 'llas', ['cos', 'ti', 'llas']],
]
const pic = ([text, , , , image]) => ({ ...word(text, true), ...(image ? { image } : {}) })
export const writingLlYLesson = finish({
  ...base,
  activities: [
    { id: 'palabras', title: 'Leemos palabras con ll y con y', exercises: [ll, y].flatMap((list, column) =>
      [list.slice(0, 5), list.slice(5)].map((items, index) => present(`lista-${column}-${index}`, 253,
        `Lee y escucha las palabras que se escriben con ${column === 0 ? 'll' : 'y'}. Repítelas con tu maestra.`, items.map((text) => word(text))))),
    },
    { id: 'combinaciones', title: 'Elegimos ll o y', exercises: [pictures.slice(0, 4), pictures.slice(4)].map((items, index) => ({
      id: `dibujos-${index}`, page: 253, type: 'match', uniformChoices: true,
      instruction: instruction('combinaciones', 'Observa los dibujos. Selecciona la combinación con la que se escribe el nombre de cada figura. Puedes escuchar la palabra.'),
      groups: items.map((item) => ({ ...pic(item), answer: item[2], options: item[1].map(syllable) })),
    })) },
    { id: 'formar', title: 'Formamos las palabras', exercises: pictures.map((item) => ({
      ...order(`formar-${word(item[0]).id}`, 253, [...item[3]].reverse(), item[0]),
      prompt: pic(item),
    })) },
  ],
})
