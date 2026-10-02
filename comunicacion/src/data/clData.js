export const CL_LESSON_ID = 'cl'

const CL_IMAGE_FOLDER =
  '/images/lecciones/cl'

// ============================================================
// Lectura: página 131
// ============================================================

export const clReading = {
  title: 'El sueño de un clavo',

  paragraphs: [
    'En una caja de herramientas había muchos clavos de todos tamaños. En particular, había uno muy grande. Su sueño era que lo escogieran para algo importante. Cada vez que alguien iba a buscar un clavo, él se emocionaba mucho porque esperaba que lo eligieran.',

    'Así pasó mucho tiempo, y el clavo seguía en la caja de herramientas. Un día, para su sorpresa, lo escogieron. El clavo estaba muy contento. No sabía para qué lo necesitaban, pero se sentía importante.',

    'Un señor lo clavó en la sala de una casa para colgar un hermoso cuadro. Era una pintura grande. El clavo tenía el tamaño perfecto para sostenerlo. Desde ese día, el clavo vive muy feliz porque adorna la casa con un lindo cuadro.',
  ],

  image:
    `${CL_IMAGE_FOLDER}/el-sueno-de-un-clavo.png`,

  imageAlt:
    'Caja de herramientas con varios clavos',
}

export const clComprehensionQuestions = [
  '¿Qué es una caja de herramientas? ¿Qué cosas contiene?',
  '¿Por qué no elegían al clavo grande?',
  '¿Qué hizo que lo escogieran?',
  '¿Por qué ahora el clavo vive muy feliz?',
]

// ============================================================
// Reconocimiento del sonido: página 132
// ============================================================

export const clSoundIntro = {
  letters: ['c', 'l'],
  combination: 'cl',

  mainWord: {
    id: 'clavo',
    name: 'clavo',
    image: `${CL_IMAGE_FOLDER}/clavo.png`,
    imageAlt: 'Un clavo',
  },
}

// Debe seleccionar camión porque comienza
// con un sonido diferente.
export const clInitialSoundItems = [
  {
    id: 'clavel',
    name: 'clavel',
    image: `${CL_IMAGE_FOLDER}/clavel.png`,
    startsWithCl: true,
  },
  {
    id: 'cloro',
    name: 'cloro',
    image: `${CL_IMAGE_FOLDER}/cloro.png`,
    startsWithCl: true,
  },
  {
    id: 'clip',
    name: 'clip',
    image: `${CL_IMAGE_FOLDER}/clip.png`,
    startsWithCl: true,
  },
  {
    id: 'camion',
    name: 'camión',
    image: `${CL_IMAGE_FOLDER}/camion.png`,
    startsWithCl: false,
  },
]

// Debe seleccionar chicle y ancla.
export const clContainsSoundItems = [
  {
    id: 'chicle',
    name: 'chicle',
    image: `${CL_IMAGE_FOLDER}/chicle.png`,
    containsCl: true,
  },
  {
    id: 'huevo',
    name: 'huevo',
    image: `${CL_IMAGE_FOLDER}/huevo.png`,
    containsCl: false,
  },
  {
    id: 'casa',
    name: 'casa',
    image: `${CL_IMAGE_FOLDER}/casa.png`,
    containsCl: false,
  },
  {
    id: 'ancla',
    name: 'ancla',
    image: `${CL_IMAGE_FOLDER}/ancla.png`,
    containsCl: true,
  },
]

export const clTongueTwister = {
  lines: [
    'Clarita clavó un clavito,',
    'dos clavitos clavó Clarita.',
    '¿Cuántos clavitos clavó Clarita?',
    'Clarita clavó tres clavitos.',
  ],

  image:
    `${CL_IMAGE_FOLDER}/clarita-clavitos.png`,

  imageAlt:
    'Clarita clavando un clavo',
}

// ============================================================
// Combinación CL: página 133
// ============================================================

export const clSyllables = [
  'cla',
  'cle',
  'cli',
  'clo',
  'clu',
]

export const clExampleWords = [
  {
    id: 'clase',
    name: 'clase',
    image: `${CL_IMAGE_FOLDER}/clase.png`,
    syllable: 'cla',
  },
  {
    id: 'clinica',
    name: 'clínica',
    image: `${CL_IMAGE_FOLDER}/clinica.png`,
    syllable: 'cli',
  },
  {
    id: 'bicicleta',
    name: 'bicicleta',
    image:
      `${CL_IMAGE_FOLDER}/bicicleta.png`,
    syllable: 'cle',
  },
  {
    id: 'cloro',
    name: 'cloro',
    image: `${CL_IMAGE_FOLDER}/cloro.png`,
    syllable: 'clo',
  },
]

// Adaptación de la sopa de letras.
export const clWordRecognition = [
  {
    id: 'clip',
    word: 'clip',
    containsCl: true,
  },
  {
    id: 'clavo',
    word: 'clavo',
    containsCl: true,
  },
  {
    id: 'chicle',
    word: 'chicle',
    containsCl: true,
  },
  {
    id: 'teclado',
    word: 'teclado',
    containsCl: true,
  },
  {
    id: 'club',
    word: 'club',
    containsCl: true,
  },
  {
    id: 'claridad',
    word: 'claridad',
    containsCl: true,
  },

  {
    id: 'huevo',
    word: 'huevo',
    containsCl: false,
  },
  {
    id: 'casa',
    word: 'casa',
    containsCl: false,
  },
  {
    id: 'queso',
    word: 'queso',
    containsCl: false,
  },
]

// ============================================================
// Ordenar sílabas: página 134
// ============================================================

export const clWordBuilding = [
  {
    id: 'claro',
    word: 'claro',
    syllables: ['ro', 'cla'],
    correctOrder: ['cla', 'ro'],
  },
  {
    id: 'clima',
    word: 'clima',
    syllables: ['ma', 'cli'],
    correctOrder: ['cli', 'ma'],
  },
  {
    id: 'clase',
    word: 'clase',
    syllables: ['se', 'cla'],
    correctOrder: ['cla', 'se'],
  },
]

// ============================================================
// Relacionar oraciones e imágenes: página 134
// ============================================================

export const clSentenceExercises = [
  {
    id: 'clara',

    image:
      `${CL_IMAGE_FOLDER}/carlos-clara.png`,

    imageAlt:
      'Carlos separando la clara de un huevo',

    options: [
      {
        id: 'carlos',
        text: 'Carlos separa la clara.',
      },
      {
        id: 'quique',
        text: 'Quique come queso.',
      },
    ],

    answer: 'carlos',
  },
  {
    id: 'clarin',

    image:
      `${CL_IMAGE_FOLDER}/clarita-clarin.png`,

    imageAlt:
      'Clarita tocando el clarín',

    options: [
      {
        id: 'cati',
        text: 'Cati usa el cloro.',
      },
      {
        id: 'clarita',
        text: 'Clarita toca el clarín.',
      },
    ],

    answer: 'clarita',
  },
]