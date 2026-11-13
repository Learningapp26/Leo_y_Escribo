import { createBookContent } from './bookLessonHelpers.js'

const content = createBookContent('gue-con-dieresis')
// Keep audio buttons prepared while recordings are pending.
const audio = (...args) => ({ ...content.audio(...args), available: false })
const word = (text) => ({ ...content.word(text), audio: audio(content.word(text).id, text, 'Palabras') })
const pic = (text) => ({ ...word(text), image: content.word(text, true).image })
const words = (values) => values.map(word)
const instruction = (id, text) => audio(`instruccion-${id}`, text)
const present = (id, page, text, items, extra = {}) => ({
  id, page, type: 'present', instruction: instruction(id, text), items, ...extra,
})
const select = (id, page, text, options, answers, extra = {}) => ({
  id, page, type: 'select', instruction: instruction(id, text), options, answers, ...extra,
})
const oral = (id, page, text, extra = {}) => ({
  id, page, type: 'oral', instruction: instruction(id, text),
  practiceLabel: 'Ya dije mi oración', ...extra,
})

const syllable = (text) => {
  const id = text.replace('ü', 'u-dieresis-')
  return { id, label: text, audio: audio(`silaba-${id}`, text, 'Sílabas') }
}

const paragraphs = [
  'Güicho es un niño muy travieso. El otro día, Güicho estaba jugando con el ungüento de su tía. Por descuido, se le cayó en el desagüe. Güicho sentía mucha vergüenza por lo que había pasado y le contó a su tía. Ella lo disculpó.',
]
const story = audio('relato-guicho', paragraphs.join('\n\n'), 'Historia')

// Page 244, left column followed by right column. Definitions are reading aids.
export const gueGuiVocabulary = [
  ['antigüedad', 'Tiempo que ha pasado desde que algo existe.'],
  ['agüita', 'Una manera cariñosa de decir agua.'],
  ['sinvergüenza', 'Persona que hace algo indebido sin sentir vergüenza.'],
  ['bilingüe', 'Que habla dos idiomas.'],
  ['güisquil', 'Verdura verde de forma parecida a una pera, también llamada chayote.'],
  ['güicoy', 'Una clase de calabaza que se come como verdura.'],
  ['güipil', 'Blusa tradicional tejida, a menudo con figuras y colores.'],
  ['cigüeña', 'Ave grande de cuello y patas largas y pico alargado.'],
  ['agüero', 'Señal que algunas personas creen que anuncia algo que va a pasar.'],
  ['güiro', 'Instrumento musical que suena al raspar sus ranuras con un palito.'],
  ['desagüe', 'Conducto o abertura por donde sale el agua.'],
  ['yegüita', 'Una yegua pequeña. La yegua es la hembra del caballo.'],
  ['trilingüe', 'Que habla tres idiomas.'],
  ['vergüenza', 'Lo que puedes sentir cuando algo que haces o te pasa te hace querer esconderte.'],
  ['zarigüeya', 'Animal que lleva a sus crías en una bolsa de su vientre.'],
  ['pedigüeño', 'Que pide cosas con mucha frecuencia.'],
].map(([text, definition]) => ({ ...word(text), definition,
  definitionAudio: audio(`significado-${word(text).id}`, `${text}. ${definition}`, 'Significados'),
}))

const illustratedWords = ['cigüeña', 'pingüino', 'güicoy']
const storyWords = ['Güicho', 'niño', 'travieso', 'ungüento', 'tía', 'desagüe', 'vergüenza', 'disculpó']
const sentenceExercises = [
  { id: 'guipil', blank: 'El ____ es de mi hermana.', full: 'El güipil es de mi hermana.',
    bank: ['güipil', 'vergüenza', 'agüita'], answer: 'güipil',
    help: 'Piensa qué podría decir tu hermana sobre su güipil.' },
  { id: 'bilingue', blank: 'Güicho habla dos idiomas. Es ____.', full: 'Güicho habla dos idiomas. Es bilingüe.',
    bank: ['güisquil', 'bilingüe', 'yegüita'], answer: 'bilingüe',
    help: 'Piensa qué podrías contar sobre los idiomas que habla Güicho.' },
]

export const gueGuiLesson = {
  id: 'gue-con-dieresis', letter: 'güe güi', unitId: 6, pages: '243–244',
  heading: 'Combinaciones güe y güi', showReadingSource: false, centeredItems: true,
  completionTitle: '¡Terminaste la lección de güe y güi!',
  reading: {
    title: 'Güicho', paragraphs, audio: story,
    instruction: instruction('lectura', ' Sigue la lectura del relato de Güicho. Fíjate en las palabras que llevan güe y güi.'),
    image: '/images/lecciones/gue-con-dieresis/lectura-gue-gui.png',
    imageAlt: 'Güicho, con camisa azul, mira preocupado el tubo de ungüento que cayó junto al desagüe de una pila.',
    discussionInstruction: instruction('preguntas-relato', 'Escucha cada pregunta y responde en voz alta. Puedes volver a escuchar el cuento cuando lo necesites.'),
    questions: [
      '¿Con qué estaba jugando Güicho y qué pasó?',
      '¿Cómo se sintió Güicho? ¿A quién le contó lo que había pasado?',
      '¿Qué hizo su tía cuando Güicho le contó?',
    ].map((text, index) => ({ text, audio: audio(`pregunta-relato-${index + 1}`, text, 'Preguntas') })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Revisa las palabras e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de güe y güi! Vuelve a las lecciones de la Unidad 6.'),
  },
  activities: [
    { id: 'sonidos', title: 'Conocemos güe y güi', exercises: [
      present('silabas-conocidas', 243, 'Escucha y repite: ga, gue, gui, go, gu. En gue y gui, la u no se pronuncia. Puedes presionar el botón de audio de cada sílaba para escucharla otra vez.',
        ['ga', 'gue', 'gui', 'go', 'gu'].map(syllable)),
      present('dieresis', 243, 'Observa güe y güi. Los dos puntos sobre la u se llaman diéresis. En güe y güi, la u sí se pronuncia. Lee despacio: güe, güi.',
        ['güe', 'güi'].map(syllable)),
      present('guisquil', 243, 'Observa el güisquil. Di despacio: güis-quil. ¿Escuchas la u antes de la i? La u se pronuncia porque lleva diéresis.', [], {
        prompt: { ...pic('güisquil'), audio: audio('silabas-guisquil', 'güis-quil. Güisquil.', 'Sílabas') },
      }),
      present('repetimos-palabras', 243, 'Presiona el botón de audio de cada palabra. Escucha y repite despacio: ver-güen-za, un-güen-to, ye-güi-ta, a-güi-ta.',
        ['vergüenza', 'ungüento', 'yegüita', 'agüita'].map((text) => ({ ...word(text), audio: audio(`silabas-${word(text).id}`,
          { 'vergüenza': 'ver-güen-za', 'ungüento': 'un-güen-to', 'yegüita': 'ye-güi-ta', 'agüita': 'a-güi-ta' }[text], 'Sílabas') }))),
    ] },
    { id: 'dibujos-relato', title: 'Leemos dibujos y palabras del relato', exercises: [
      ...illustratedWords.flatMap((text) => [
        select(`dibujo-${word(text).id}`, 243, 'Observa el dibujo y di su nombre. Selecciona la palabra que lo representa.',
          words(text === 'pingüino' ? ['güicoy', 'cigüeña', 'pingüino'] : illustratedWords), [word(text).id],
          { prompt: pic(text), hideWord: true }),
        oral(`oracion-${word(text).id}`, 243, `Lee ${text}, forma una oración con esta palabra y dísela a tu maestra.`, { items: [pic(text)] }),
      ]),
      select('palabras-relato', 243, 'Presiona «Escuchar el relato» y sigue la lectura. Selecciona todas las palabras de estas tarjetas que llevan güe o güi. Después, escucha cada palabra y repítela varias veces.',
        words(storyWords), ['guicho', 'unguento', 'desague', 'verguenza'], {
          multiple: true,
          prompt: { id: 'relato', label: paragraphs[0], listenLabel: 'el relato', audio: story },
        }),
    ] },
    { id: 'vocabulario', title: 'Descubrimos palabras con güe y güi', exercises: [
      present('lista-palabras', 244, 'Escucha y lee varias veces las palabras. Si no conoces alguna, abre «¿Qué significa?» y presiona «Escuchar significado».', gueGuiVocabulary),
      oral('tres-palabras', 244, 'Escoge tres palabras nuevas para ti. Puedes escuchar su significado. Forma una oración con cada una y dísela a tu maestra. Luego confirma que dijiste tus tres oraciones.', {
        options: gueGuiVocabulary, multiple: true, selectionCount: 3,
        practiceLabel: 'Ya dije mis tres oraciones',
      }),
      ...[
        ['cigüeña', ['güiro', 'vergüenza', 'cigüeña', 'agüita']],
        ['güipil', ['güipil', 'güicoy', 'desagüe', 'bilingüe']],
        ['desagüe', ['yegüita', 'güisquil', 'trilingüe', 'desagüe']],
        ['vergüenza', ['antigüedad', 'vergüenza', 'zarigüeya', 'pedigüeño']],
      ].map(([text, options], index) => select(`reconocimiento-${index + 1}`, 244,
        'Presiona «Escuchar la palabra». Escucha con atención y selecciona la palabra que oíste. Puedes volver a presionar el botón para escucharla otra vez.',
        words(options), [word(text).id], {
          prompt: { id: `palabra-${index + 1}`, label: `Palabra ${index + 1}`, listenLabel: 'la palabra', audio: word(text).audio },
        })),
    ] },
    { id: 'oraciones', title: 'Completamos y decimos oraciones', exercises: sentenceExercises.flatMap(({ id, blank, full, bank, answer, help }) => [
      select(`completar-${id}`, 244, 'Lee la oración y selecciona la palabra del recuadro que la completa. Después, lee la oración completa en voz alta.',
        words(bank), [word(answer).id], {
          ...(id === 'guipil' ? { items: [pic('güipil')] } : {}),
          prompt: { id: `oracion-${id}`, label: blank, listenLabel: 'la oración', audio: audio(`oracion-incompleta-${id}`, blank.replace('____', '...'), 'Oraciones') },
          resultAudio: audio(`oracion-completa-${id}`, full, 'Oraciones'), resultText: full,
        }),
      oral(`otra-oracion-${id}`, 244, `Lee: «${full}» Ahora inventa otra oración relacionada con esta y dísela a tu maestra.`, {
        prompt: { id: `oracion-completa-${id}`, label: full, audio: audio(`oracion-completa-${id}`, full, 'Oraciones') },
        teacherPrompt: `${help} Acepta cualquier oración que tenga relación con la anterior; no hay una respuesta única.`,
      }),
    ]) },
  ],
}
