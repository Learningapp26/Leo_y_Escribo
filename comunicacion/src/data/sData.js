// Contenido de la lección S basado en las páginas de referencia del libro.
// Los audios de esta letra todavía no forman parte del repositorio, por eso no
// se declaran rutas de audio que puedan fallar al cargar.

export const sReading = {
  title: 'El sapo que sopló más',
  paragraphs: [
    'Un sapo pequeño era muy presumido. Cerca de él vivía un sapo grande, a quien molestaba diciendo que era mejor que él.',
    'Cansado de escucharlo, el sapo grande le propuso una competencia para ver quién soplaba más. Cada uno infló un globo, pero el sapo grande lo hizo más rápido y ganó.',
    'El sapo pequeño aprendió que no es bueno ser presumido y dejó de molestar al sapo grande.',
  ],
  image: '/images/lecciones/s/sapos-globos.png',
  imageAlt: 'Dos sapos inflan globos durante una competencia junto a un lago.',
}

export const sComprehensionQuestions = [
  '¿Cuál es el título de la fábula?',
  '¿Qué competencia hicieron los sapos?',
  '¿Quién ganó la competencia?',
  '¿Qué aprendió el sapo pequeño?',
]

export const sSoundStartChoices = [
  {
    id: 'sapo',
    word: 'sapo',
    image: '/images/lecciones/s/sapos-globos.png',
    startsWithS: true,
  },
  {
    id: 'sal',
    word: 'sal',
    image: '/images/lecciones/y/sal.png',
    startsWithS: true,
  },
  {
    id: 'mama',
    word: 'mamá',
    image: '/images/lecciones/m/mama.png',
    startsWithS: false,
  },
  {
    id: 'luna',
    word: 'luna',
    image: '/images/lecciones/l/luna.png',
    startsWithS: false,
  },
]

export const sSoundEndChoices = [
  {
    id: 'panes',
    word: 'panes',
    image: '/images/lecciones/y/panes.png',
    endsWithS: true,
  },
  {
    id: 'lapiz',
    word: 'lápiz',
    image: '/images/lecciones/y/lapiz.png',
    endsWithS: true,
  },
  {
    id: 'sol-end',
    word: 'sol',
    image: '/images/lecciones/y/sol.png',
    endsWithS: false,
  },
  {
    id: 'mano-end',
    word: 'mano',
    image: '/images/lecciones/m/mano.png',
    endsWithS: false,
  },
]

export const sSyllables = ['sa', 'se', 'si', 'so', 'su']

export const sSyllableChallenges = [
  {
    id: 'sapo',
    word: 'sapo',
    pattern: '__po',
    answer: 'sa',
  },
  {
    id: 'seda',
    word: 'seda',
    pattern: '__da',
    answer: 'se',
  },
  {
    id: 'sillon',
    word: 'sillón',
    pattern: '__llón',
    answer: 'si',
  },
  {
    id: 'sol-syllable',
    word: 'sol',
    pattern: '__l',
    answer: 'so',
  },
  {
    id: 'suma',
    word: 'suma',
    pattern: '__ma',
    answer: 'su',
  },
]

export const sWordBuilding = [
  {
    id: 'sala',
    word: 'sala',
    options: ['sa', 'la', 'ma'],
  },
  {
    id: 'masa',
    word: 'masa',
    options: ['ma', 'sa', 'la'],
  },
  {
    id: 'suma-build',
    word: 'suma',
    options: ['su', 'ma', 'la'],
  },
]

export const sFinalActivities = {
  sound: {
    prompt: 'Toca la palabra que empieza con el sonido /s/.',
    options: ['sal', 'oso', 'mesa'],
    answer: 'sal',
  },
  syllable: {
    prompt: 'Completa la palabra con la sílaba correcta.',
    pattern: '__la',
    options: ['sa', 'se', 'su'],
    answer: 'sa',
    word: 'sala',
  },
  word: {
    prompt: 'Toca las sílabas en orden para formar la palabra.',
    word: 'sale',
    options: ['sa', 'le', 'la'],
  },
  reading: {
    sentence: 'Susi usa la mesa.',
    prompt: 'Lee la oración y toca el nombre propio.',
    options: ['Susi', 'usa', 'mesa'],
    answer: 'Susi',
  },
}
