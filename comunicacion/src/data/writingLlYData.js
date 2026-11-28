import { createWritingContent } from './writingLessonHelpers.js'

// Leo y escribo, Paso 2, p. 253. Dictation/copying become recognition and word building.
const { base, finish, word, syllable, instruction, present, order } = createWritingContent(
  'escritura-ll-y', '¡Escribamos palabras con ll-y!', 253,
  'Hay palabras que se escriben con ll y otras con y. Lee y escucha las palabras. Después, reconoce las combinaciones y forma los nombres de los dibujos.',
  [
    "Bella.mp3",
    "Cabello.mp3",
    "Calle.mp3",
    "Collar.mp3",
    "Costillas.mp3",
    "Ensayar.mp3",
    "Felicitacion-final.mp3",
    "Hoyo.mp3",
    "Instruccion-combinaciones.mp3",
    "Instruccion-introduccion.mp3",
    "Instruccion-lista.mp3",
    "Instruccion-ordenar-silabas.mp3",
    "Intenta-otra-vez.mp3",
    "Inyecci\u00f3n.mp3",
    "Llamar.mp3",
    "Llanura.mp3",
    "Llave.mp3",
    "Lleno.mp3",
    "Mejilla.mp3",
    "Respuesta-correcta.mp3",
    "Silaba-Cos.mp3",
    "Silaba-Ve.mp3",
    "Silaba-be.mp3",
    "Silaba-ca.mp3",
    "Silaba-cion.mp3",
    "Silaba-co.mp3",
    "Silaba-ho.mp3",
    "Silaba-in.mp3",
    "Silaba-lla.mp3",
    "Silaba-llar.mp3",
    "Silaba-lle.mp3",
    "Silaba-llec.mp3",
    "Silaba-llo.mp3",
    "Silaba-llu.mp3",
    "Silaba-ti.mp3",
    "Silaba-ya.mp3",
    "Yacimiento.mp3",
    "Yegua.mp3",
    "Yema.mp3",
    "Yerno.mp3",
    "Yodo.mp3",
    "Yuca.mp3",
  ],
  {
    "silaba-yu.mp3": "Silaba-llu.mp3",
    "silaba-yar.mp3": "Silaba-llar.mp3",
    "silaba-ye.mp3": "Silaba-lle.mp3",
    "silaba-yec.mp3": "Silaba-llec.mp3",
    "silaba-yo.mp3": "Silaba-llo.mp3",
    "inyeccion.mp3": "Inyecci\u00f3n.mp3",
    "instruccion-lista-0-0.mp3": "Instruccion-lista.mp3",
    "instruccion-lista-0-1.mp3": "Instruccion-lista.mp3",
  },
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
