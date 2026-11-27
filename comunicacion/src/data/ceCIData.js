import { createBookContent } from './bookLessonHelpers.js'

const { audio, word, syllable, instruction, select, present } = createBookContent('ce-ci')
const words = (values) => values.map((text) => word(text))
const pic = (text) => word(text, true)
const pics = (values) => values.map(pic)

const paragraphs = [
  'Celia estudia cerca de Ciudad Vieja. Todos los días camina doce cuadras. Pasa cerca de un estanque de cisnes y sube un pequeño cerro. Al llegar a la cima, baja corriendo y llega a la escuela. ¡Eso hace Celia todos los días!',
]
const story = audio('celia', `Celia\n\n${paragraphs.join('\n\n')}`, 'Historia')
const storyWords = ['Celia', 'estudia',  'cerca' , 'Ciudad' , 'Vieja', 'Todos',  'días',  'camina',  'doce', 'cuadras', 'Pasa', 'cerca', 'estanque', 'cisnes', 'sube', 'pequeño', 'cerro', 'llegar', 'cima', 'baja', 'corriendo', 'llega', 'escuela', 'Eso', 'hace', 'Celia', 'todos', 'días']
const withCeCi = (text) => /c[eéií]/i.test(text)
const wordList = [
  'cine', 'hacienda', 'celular', 'entonces', 'cielo', 'maceta', 'cincuenta', 'nueces',
  'celeste', 'pecera', 'ceja', 'lapicero', 'ciudad', 'cocina', 'chimpancé', 'cerezas',
]

const sentenceWords = ['ciruela', 'cerdo', 'pecera', 'cebolla']
const sentenceOptions = sentenceWords.map((text) => ({
  ...word(text),
  completionImage: pic(text).image,
}))

const completeSentence = (id, before, after, answer, sentence) => select(
  `completar-${id}`,
  240,
  'Escucha la oración y selecciona del banco de cuatro palabras la que mejor la completa.',
  sentenceOptions,
  [word(answer).id],
  {
    sentenceCompletion: {
      before,
      after,
      audio: audio(`oracion-${id}`, sentence, 'Oraciones'),
    },
  },
)

export const ceCiLesson = {
  id: 'ce-ci', letter: 'ce ci', unitId: 6, pages: '239–240', showReadingSource: false, centeredItems: true,
  completionTitle: '¡Terminaste la lección de ce y ci!',
  reading: {
    title: 'Celia', paragraphs,
    instruction: instruction('lectura', 'Escucha el relato. Fíjate en las palabras que llevan ce y ci.'),
    audio: story,
    image: '/images/lecciones/ce-ci/celia.png',
    imageAlt: 'Celia junto al estanque de cisnes y subiendo el cerro.',
    questions: [
      '¿Qué palabras con ce o ci escuchaste en el relato?',
      '¿Qué lugares pasa Celia antes de llegar a la escuela?',
    ].map((text) => ({ text })),
  },
  feedback: {
    correct: audio('respuesta-correcta', '¡Correcto! Puedes continuar.'),
    retry: audio('intenta-otra-vez', 'Escucha de nuevo e inténtalo otra vez.'),
    completed: audio('felicitacion-final', '¡Terminaste la lección de ce y ci! Vuelve a las lecciones de la Unidad 6.'),
  },
  activities: [
    { id: 'sonidos', title: 'Escuchamos ce y ci', exercises: [
      present('sonido-ce-ci', 239, 'Ya conoces el sonido de la letra c. Ahora aprenderás que cuando se combina con las vocales e - i, suena s, igual que la letra s. ¿Qué dibujo aparece al lado? Repite ce - pi - llo. Repite ce y ci.',
        ['ce', 'ci'].map(syllable), {
          prompt: { ...pic('cepillo'), audio: audio('silabas-cepillo', 'ce-pi-llo. Cepillo.', 'Sílabas') },
          sound: audio('sonido-ce-ci', 's', 'Sonidos'),
        }),
      select('dibujos-ce-ci', 239, 'Repite en voz alta lo que muestra cada dibujo. Selecciona las figuras donde escuches ce o ci.',
        pics(['cinco', 'queso', 'cebra', 'cinturón']), ['cinco', 'cebra', word('cinturón').id], { multiple: true, showOptionLabels: true }),
    ] },
    { id: 'palabras', title: 'Leemos palabras con ce y ci', exercises: [
      select('palabras-relato', 239, 'Escucha otra vez el relato de Celia. Selecciona todas las palabras que lleven ce y ci.',
        words(storyWords), storyWords.filter(withCeCi).map((text) => word(text).id), {
          multiple: true, hideWord: true,
          prompt: { id: 'relato', label: 'Celia', listenLabel: 'el relato', audio: story },
        }),
      present('lista-palabras', 240, 'Lee varias veces las palabras de la lista. Todas llevan la letra c en alguna parte de la palabra. Fíjate bien y escucha cada palabra.',
        words(wordList)),
    ] },
    { id: 'oraciones', title: 'Formamos oraciones con ce y ci', exercises: [
      present('palabras-dibujos', 240, 'Lee las palabras que identifican a los dibujos. Escucha cada una.',
        pics(sentenceWords)),
      completeSentence('ciruela', 'La ', ' es dulce.', 'ciruela', 'La ciruela es dulce.'),
      completeSentence('pecera', 'Hay muchos peces en la ', '.', 'pecera', 'Hay muchos peces en la pecera.'),
      completeSentence('cerdo', 'El ', ' no come cebolla.', 'cerdo', 'El cerdo no come cebolla.'),
    ] },
  ],
}
