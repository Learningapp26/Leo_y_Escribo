// Contenido de la lección S. Las imágenes reutilizan recursos ya existentes.
// Los audios de esta letra todavía no forman parte del repositorio, por eso no
// se declaran rutas de audio que puedan fallar al cargar.

export const sReading = {
  title: 'Susi y el sol',
  paragraphs: [
    'Susi sale temprano y mira el sol. Se sienta junto a la mesa del patio.',
    'Sobre la mesa hay sal para la sopa. Susi sonríe y saluda a su mamá.',
    'Susi sabe que, si observa con calma, puede encontrar muchas palabras con la letra S.',
  ],
  image: '/images/lecciones/y/susi.png',
  imageAlt: 'Ilustración de Susi sonriendo y saludando.',
}

export const sComprehensionQuestions = [
  '¿Quién sale temprano?',
  '¿Qué mira Susi?',
  '¿Qué hay sobre la mesa?',
  '¿Qué palabras con S recuerdas del cuento?',
]

export const sSoundStartChoices = [
  {
    id: 'sol',
    word: 'sol',
    image: '/images/lecciones/y/sol.png',
    startsWithS: true,
  },
  {
    id: 'sal',
    word: 'sal',
    image: '/images/lecciones/y/sal.png',
    startsWithS: true,
  },
  {
    id: 'sopa',
    word: 'sopa',
    image: '/images/lecciones/p/sopa.png',
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
    id: 'suma',
    word: 'suma',
    pattern: '__ma',
    answer: 'su',
  },
  {
    id: 'sol-syllable',
    word: 'sol',
    pattern: '__l',
    answer: 'so',
  },
]

export const sWordBuilding = [
  {
    id: 'sala',
    word: 'sala',
    options: ['sa', 'la', 'ma'],
  },
  {
    id: 'suma-build',
    word: 'suma',
    options: ['su', 'ma', 'la'],
  },
  {
    id: 'sapo-build',
    word: 'sapo',
    options: ['sa', 'po', 'so'],
  },
]

export const sFinalActivities = {
  sound: {
    prompt: 'Toca la palabra que empieza con el sonido /s/.',
    options: ['sopa', 'luna', 'mamá'],
    answer: 'sopa',
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
    word: 'suma',
    options: ['su', 'ma', 'sa'],
  },
  reading: {
    sentence: 'Susi usa la mesa.',
    prompt: 'Lee la oración y toca la palabra que comienza con S.',
    options: ['Susi', 'usa', 'mesa'],
    answer: 'Susi',
  },
}
