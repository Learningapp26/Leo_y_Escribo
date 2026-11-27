import { createWritingContent } from './writingLessonHelpers.js'

// Leo y escribo, p. 252. Copying becomes recognition and sentence building.
const { base, finish, word, present, select, order } = createWritingContent(
  'escritura-je-ji-ge-gi', '¡Escribamos palabras con je-ji y ge-gi!', 252,
  'Hay palabras que se escriben con j y otras con g. Observa los dibujos y lee las palabras. Después, forma oraciones y reconoce cómo se escribe cada palabra.',
)
const images = {
  jalea: 'j/jalea.png', gimnasia: 'escritura-je-ji-ge-gi/gimnasia.png',
  jardín: 'escritura-je-ji-ge-gi/jardin.png', jirafa: 'j/jirafa.png',
  girasol: 'ge-gi/girasol.png', jeringa: 'j/jeringa.png',
  gitana: 'escritura-je-ji-ge-gi/gitana.png', gigante: 'ge-gi/gigante.png',
  perejil: 'escritura-je-ji-ge-gi/perejil.png',
}
const pic = (text) => ({ ...word(text), image: `/images/lecciones/${images[text]}` })
const corrections = [
  ['jirafa', 'girafa', ['ji', 'ra', 'fa']],
  ['girasol', 'jirasol', ['gi', 'ra', 'sol']],
  ['jeringa', 'geringa', ['je', 'rin', 'ga']],
  ['gitana', 'jitana', ['gi', 'ta', 'na']],
  ['gigante', 'jigante', ['gi', 'gan', 'te']],
  ['perejil', 'peregil', ['pe', 're', 'jil']],
]
export const writingJeJiGeGiLesson = finish({
  ...base,
  activities: [
    { id: 'lectura', title: 'Observamos y leemos', exercises: [
      present('palabras-modelo', 252, 'Observa cada dibujo y lee la palabra que está a su lado. Algunas palabras se escriben con j y otras con g.',
        ['jalea', 'gimnasia', 'jardín'].map(pic)),
      present('recuadro', 252, 'Lee las palabras del recuadro. Fíjate en cómo se escriben: je y ji llevan j; ge y gi llevan g.',
        corrections.map(([text]) => pic(text))),
    ] },
    { id: 'oraciones', title: 'Formamos oraciones', exercises: [
      ['jalea', ['La', 'jalea', 'es', 'dulce.']],
      ['gimnasia', ['Ana', 'practica', 'gimnasia.']],
      ['jardín', ['El', 'jardín', 'tiene', 'flores.']],
    ].map(([text, pieces]) => ({
      ...order(`oracion-${word(text).id}`, 252, [...pieces].reverse(), pieces.join(' '), true),
      prompt: pic(text),
    })) },
    { id: 'reconocer', title: 'Elegimos la palabra correcta', exercises: corrections.map(([text, incorrect], index) =>
      select(`corregir-${text}`, 252, 'Observa el dibujo. Lee las dos opciones y selecciona la palabra que está bien escrita. Puedes consultar el recuadro con tu maestra.',
        (index % 2 ? [text, incorrect] : [incorrect, text]).map((value) => word(value)), [word(text).id],
        { prompt: pic(text), hideWord: true, teacherPrompt: corrections.map(([value]) => value).join(' · ') })),
    },
    { id: 'formar', title: 'Formamos las palabras', exercises: corrections.map(([text, , pieces]) => ({
      ...order(`formar-${text}`, 252, [...pieces].reverse(), text),
      prompt: pic(text), hideWord: true,
    })) },
  ],
})
