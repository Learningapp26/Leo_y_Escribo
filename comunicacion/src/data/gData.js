// Para la parte del cuento
export const gReading = {
  title: 'El gato goloso y el gato prudente',
  paragraphs: [
    'Dos gatos paseaban por los tejados de las casas cuando, de pronto, vieron una enorme bolsa. Curiosos, se acercaron para abrirla. Ambos deseaban que estuviera llena de comida, porque ya llevaban días sin comer.',
    // TODO: agregar los párrafos restantes de la fábula tal como aparecen en el libro.
  ],
  image: '/images/lecciones/g/gato-goloso-prudente.png',
  imageAlt: 'gato goloso y gato prudente',
  instructionAudio: '/audio/lecciones/g/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/g/gato-goloso-prudente.mp3',
}

// Preguntas
export const gComprehensionQuestions = [
  '¿Puedes explicar qué es ser goloso? ¿Conoces a alguien que sea goloso?',
  '¿En qué eran diferentes los gatos de esta fábula?',
  '¿Qué lección aprendió el gato goloso?',
  '¿Qué hubieras hecho al encontrar una bolsa llena de tu comida favorita?',
]

// ============================================================
// ACTIVIDAD DE RECONOCER SONIDOS
// ============================================================

// Fase 1: mostrar la G (mayúscula y minúscula), escuchar su sonido
// y luego la palabra "gato"
export const gSoundIntro = {
  instructionAudio: '/audio/lecciones/g/instruccion-g.mp3',
  mainWord: {
    name: 'gato',
    image: '/images/lecciones/g/gato.png',
    audio: '/audio/lecciones/g/gato.mp3',
  },
  soundAudioG: '/audio/lecciones/g/sonido-g.mp3',
}

// Fase 2: seleccionar las imágenes cuyo nombre EMPIEZA con el sonido /g/
export const gSelectionInstructionAudio =
  '/audio/lecciones/g/instruccion-sonido-g.mp3'

export const gImagePool = [
  {
    id: 'gato',
    name: 'gato',
    image: '/images/lecciones/g/gato.png',
    audio: '/audio/lecciones/g/gato.mp3',
    startsWithG: true,
  },
  {
    id: 'guante',
    name: 'guante',
    image: '/images/lecciones/g/guante.png',
    audio: '/audio/lecciones/g/guante.mp3',
    startsWithG: true,
  },
  {
    id: 'gusano',
    name: 'gusano',
    image: '/images/lecciones/g/gusano.png',
    audio: '/audio/lecciones/g/gusano.mp3',
    startsWithG: true,
  },
  {
    id: 'gallina',
    name: 'gallina',
    image: '/images/lecciones/g/gallina.png',
    audio: '/audio/lecciones/g/gallina.mp3',
    startsWithG: true,
  },
  {
    id: 'gota',
    name: 'gota',
    image: '/images/lecciones/g/gota.png',
    audio: '/audio/lecciones/g/gota.mp3',
    startsWithG: true,
  },
  {
    id: 'banco',
    name: 'banco',
    image: '/images/lecciones/g/banco.png',
    audio: '/audio/lecciones/g/banco.mp3',
    startsWithG: false,
  },
]

// Fase 3: parejas. Se tocan dos imágenes cuyo nombre empieza con la misma
// sílaba (ejemplo: ga-rra y ga-vio-ta). Cada carta tiene un id único; dos
// cartas forman pareja cuando comparten el mismo pairId.
export const gPairsInstructionAudio =
  '/audio/lecciones/g/instruccion-parejas-inicio-g.mp3'

export const gPairPool = [
  {
    id: 'garra',
    pairId: 'ga',
    name: 'garra',
    image: '/images/lecciones/g/garra.png',
    audio: '/audio/lecciones/g/garra.mp3',
  },
  {
    id: 'guitarra',
    pairId: 'gui',
    name: 'guitarra',
    image: '/images/lecciones/g/guitarra.png',
    audio: '/audio/lecciones/g/guitarra.mp3',
  },
  {
    id: 'galleta',
    pairId: 'ga',
    name: 'galleta',
    image: '/images/lecciones/g/galleta.png',
    audio: '/audio/lecciones/g/galleta.mp3',
  },
  {
    id: 'goma',
    pairId: 'go',
    name: 'goma',
    image: '/images/lecciones/g/goma.png',
    audio: '/audio/lecciones/g/goma.mp3',
  },
  {
    id: 'guinda',
    pairId: 'gui',
    name: 'guinda',
    image: '/images/lecciones/g/guinda.png',
    audio: '/audio/lecciones/g/guinda.mp3',
  },
  {
    id: 'gorra',
    pairId: 'go',
    name: 'gorra',
    image: '/images/lecciones/g/gorra.png',
    audio: '/audio/lecciones/g/gorra.mp3',
  },
  {
    id: 'gaviota',
    pairId: 'ga',
    name: 'gaviota',
    image: '/images/lecciones/g/gaviota.png',
    audio: '/audio/lecciones/g/gaviota.mp3',
  },
  {
    id: 'gallina',
    pairId: 'ga',
    name: 'gallina',
    image: '/images/lecciones/g/gallina.png',
    audio: '/audio/lecciones/g/gallina.mp3',
  },
]

// Fase 4: seleccionar los nombres que tienen el sonido /g/ en la última
// sílaba (containsG = true cuando la g está en la última sílaba)
export const gFinalInstructionAudio =
  '/audio/lecciones/g/instruccion-g-final.mp3'

export const gFinalSoundMatching = {
  instructionAudio: gFinalInstructionAudio,
  items: [
    {
      id: 'fuego',
      name: 'fuego',
      image: '/images/lecciones/g/fuego.png',
      audio: '/audio/lecciones/g/fuego.mp3',
      containsG: true,
    },
    {
      id: 'mago',
      name: 'mago',
      image: '/images/lecciones/g/mago.png',
      audio: '/audio/lecciones/g/mago.mp3',
      containsG: true,
    },
    {
      id: 'leon',
      name: 'león',
      image: '/images/lecciones/g/leon.png',
      audio: '/audio/lecciones/g/leon.mp3',
      containsG: false,
    },
    {
      id: 'lechuga',
      name: 'lechuga',
      image: '/images/lecciones/g/lechuga.png',
      audio: '/audio/lecciones/g/lechuga.mp3',
      containsG: true,
    },
    {
      id: 'tornillo',
      name: 'tornillo',
      image: '/images/lecciones/g/tornillo.png',
      audio: '/audio/lecciones/g/tornillo.mp3',
      containsG: false,
    },
    {
      id: 'tortuga',
      name: 'tortuga',
      image: '/images/lecciones/g/tortuga.png',
      audio: '/audio/lecciones/g/tortuga.mp3',
      containsG: true,
    },
  ],
}

// ============================================================
// ACTIVIDAD DE SÍLABAS

//Fase1
// Conocer la letra G y sus combinaciones.
export const gLetterPresentation = {
  instructionAudio: '/audio/lecciones/g/instruccion-letra-g.mp3',
  soundAudio: '/audio/lecciones/g/sonido-g.mp3',
  combinations: [
    { syllable: 'ga', audio: '/audio/lecciones/g/silaba-ga.mp3' },
    { syllable: 'go', audio: '/audio/lecciones/g/silaba-go.mp3' },
    { syllable: 'gu', audio: '/audio/lecciones/g/silaba-gu.mp3' },
  ],
  specialCombinations: [
    { syllable: 'gue', audio: '/audio/lecciones/g/silaba-gue.mp3' },
    { syllable: 'gui', audio: '/audio/lecciones/g/silaba-gui.mp3' },
  ],
}
 
// Fase 2: Buscar sílabas que contengan la letra G
export const gSyllableSearch = {
  instructionAudio: '/audio/lecciones/g/instruccion-buscar-silabas.mp3',
  targetSyllables: ['ga', 'go', 'gu', 'gue', 'gui'],
  options: [
    { syllable: 'ga', audio: '/audio/lecciones/g/silaba-ga.mp3' },
    { syllable: 'ma', audio: '/audio/lecciones/g/silaba-ma.mp3' },
    { syllable: 'gue', audio: '/audio/lecciones/g/silaba-gue.mp3' },
    { syllable: 'sa', audio: '/audio/lecciones/g/silaba-sa.mp3' },
    { syllable: 'que', audio: '/audio/lecciones/g/silaba-que.mp3' },
    { syllable: 'gui', audio: '/audio/lecciones/g/silaba-gui.mp3' },
    { syllable: 'ta', audio: '/audio/lecciones/g/silaba-ta.mp3' },
    { syllable: 'po', audio: '/audio/lecciones/g/silaba-po.mp3' },
    { syllable: 'da', audio: '/audio/lecciones/g/silaba-da.mp3' },
    { syllable: 'go', audio: '/audio/lecciones/g/silaba-go.mp3' },
    { syllable: 'lu', audio: '/audio/lecciones/g/silaba-lu.mp3' },
    { syllable: 'gu', audio: '/audio/lecciones/g/silaba-gu.mp3' },
    { syllable: 'fu', audio: '/audio/lecciones/g/silaba-fu.mp3' },
  ],
}


// Fase 3: completar la palabra con la sílaba que falta
export const gSyllableOptions = ['ga', 'gue', 'gui', 'go', 'gu']

export const gCompletionInstructionAudio =
  '/audio/lecciones/g/instruccion-completar-g.mp3'

export const gWordCompletion = [
  {
    id: 'guitarra',
    word: 'guitarra',
    pattern: '___tarra',
    image: '/images/lecciones/g/guitarra.png',
    audio: '/audio/lecciones/g/guitarra.mp3',
    answer: 'gui',
  },
  {
    id: 'gotero',
    word: 'gotero',
    pattern: '__tero',
    image: '/images/lecciones/g/gotero.png',
    audio: '/audio/lecciones/g/gotero.mp3',
    answer: 'go',
  },
  {
    id: 'gusano',
    word: 'gusano',
    pattern: '__sano',
    image: '/images/lecciones/g/gusano.png',
    audio: '/audio/lecciones/g/gusano.mp3',
    answer: 'gu',
  },
  {
    id: 'guerrero',
    word: 'guerrero',
    pattern: '___rrero',
    image: '/images/lecciones/g/guerrero.png',
    audio: '/audio/lecciones/g/guerrero.mp3',
    answer: 'gue',
  },
]


 
// Fase 4: emparejar palabras que contienen la misma sílaba con G.
export const gSyllablePairsInstructionAudio =
  '/audio/lecciones/g/instruccion-parejas-silabas.mp3'

export const gSyllablePairPool = [
  {
    id: 'gallina',
    pairId: 'ga',
    name: 'gallina',
    image: '/images/lecciones/g/gallina.png',
    audio: '/audio/lecciones/g/gallina.mp3',
  },
  {
    id: 'gaviota',
    pairId: 'ga',
    name: 'gaviota',
    image: '/images/lecciones/g/gaviota.png',
    audio: '/audio/lecciones/g/gaviota.mp3',
  },
  {
    id: 'goma',
    pairId: 'go',
    name: 'goma',
    image: '/images/lecciones/g/goma.png',
    audio: '/audio/lecciones/g/goma.mp3',
  },
  {
    id: 'gorra',
    pairId: 'go',
    name: 'gorra',
    image: '/images/lecciones/g/gorra.png',
    audio: '/audio/lecciones/g/gorra.mp3',
  },
  {
    id: 'guante',
    pairId: 'gu',
    name: 'guante',
    image: '/images/lecciones/g/guante.png',
    audio: '/audio/lecciones/g/guante.mp3',
  },
  {
    id: 'gusano',
    pairId: 'gu',
    name: 'gusano',
    image: '/images/lecciones/g/gusano.png',
    audio: '/audio/lecciones/g/gusano.mp3',
  },
  {
    id: 'guerrero',
    pairId: 'gue',
    name: 'guerrero',
    image: '/images/lecciones/g/guerrero.png',
    audio: '/audio/lecciones/g/guerrero.mp3',
  },
  {
    id: 'juguetes',
    pairId: 'gue',
    name: 'juguetes',
    image: '/images/lecciones/g/juguetes.png',
    audio: '/audio/lecciones/g/juguetes.mp3',
  },
  {
    id: 'guitarra',
    pairId: 'gui',
    name: 'guitarra',
    image: '/images/lecciones/g/guitarra.png',
    audio: '/audio/lecciones/g/guitarra.mp3',
  },
  {
    id: 'guinda',
    pairId: 'gui',
    name: 'guinda',
    image: '/images/lecciones/g/guinda.png',
    audio: '/audio/lecciones/g/guinda.mp3',
  },
]
 
// ============================================================
// ACTIVIDAD Completar palabras 

 
// Fase 1: completar la palabra con la sílaba correcta
export const gSyllableCompletion = [
  {
    id: 'garra',
    word: 'garra',
    pattern: '__rra',
    image: '/images/lecciones/g/garra.png',
    audio: '/audio/lecciones/g/garra.mp3',
    options: [
      {
        syllable: 'gui',
        audio: '/audio/lecciones/g/silaba-gui.mp3',
        isCorrect: false,
      },
      {
        syllable: 'ga',
        audio: '/audio/lecciones/g/silaba-ga.mp3',
        isCorrect: true,
      },
    ],
  },
  {
    id: 'mago',
    word: 'mago',
    pattern: 'ma__',
    image: '/images/lecciones/g/mago.png',
    audio: '/audio/lecciones/g/mago.mp3',
    options: [
      {
        syllable: 'go',
        audio: '/audio/lecciones/g/silaba-go.mp3',
        isCorrect: true,
      },
      {
        syllable: 'gu',
        audio: '/audio/lecciones/g/silaba-gu.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'aguja',
    word: 'aguja',
    pattern: 'a__ja',
    image: '/images/lecciones/g/aguja.png',
    audio: '/audio/lecciones/g/aguja.mp3',
    options: [
      {
        syllable: 'gu',
        audio: '/audio/lecciones/g/silaba-gu.mp3',
        isCorrect: true,
      },
      {
        syllable: 'ga',
        audio: '/audio/lecciones/g/silaba-ga.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'juguetes',
    word: 'juguetes',
    pattern: 'ju___tes',
    image: '/images/lecciones/g/juguetes.png',
    audio: '/audio/lecciones/g/juguetes.mp3',
    options: [
      {
        syllable: 'gue',
        audio: '/audio/lecciones/g/silaba-gue.mp3',
        isCorrect: true,
      },
      {
        syllable: 'go',
        audio: '/audio/lecciones/g/silaba-go.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'aguila',
    word: 'águila',
    pattern: 'á___la',
    image: '/images/lecciones/g/aguila.png',
    audio: '/audio/lecciones/g/aguila.mp3',
    options: [
      {
        syllable: 'ga',
        audio: '/audio/lecciones/g/silaba-ga.mp3',
        isCorrect: false,
      },
      {
        syllable: 'gui',
        audio: '/audio/lecciones/g/silaba-gui.mp3',
        isCorrect: true,
      },
    ],
  },
  {
    id: 'gota',
    word: 'gota',
    pattern: '__ta',
    image: '/images/lecciones/g/gota.png',
    audio: '/audio/lecciones/g/gota.mp3',
    options: [
      {
        syllable: 'gu',
        audio: '/audio/lecciones/g/silaba-gu.mp3',
        isCorrect: false,
      },
      {
        syllable: 'go',
        audio: '/audio/lecciones/g/silaba-go.mp3',
        isCorrect: true,
      },
    ],
  },
]

// Fase 2: seleccionar la figura que complete la oración 

export const gSentenceCompletionInstructionAudio =
  '/audio/lecciones/g/instruccion-oraciones-g.mp3'

export const gSentenceCompletion = [
  {
    id: 'oracion1g',
    sentence: 'El ___ se vende.',
    image: '/images/lecciones/g/aguacate.png',
    imageAlt: 'Un aguacate',
    options: [
      { name: 'aguacate', audio: '/audio/lecciones/g/aguacate.mp3', isCorrect: true, },
      { name: 'garra', audio: '/audio/lecciones/g/garra.mp3', isCorrect: false },
    ],
  },
  {
    id: 'oracion2g',
    sentence: '___ es muy linda.',
    image: '/images/lecciones/g/guatemala.png',
    imageAlt: 'Mapa de Guatemala',
    options: [
      { name: 'aguacate', audio: '/audio/lecciones/g/aguacate.mp3', isCorrect: false },
      { name: 'Guatemala', audio: '/audio/lecciones/g/guatemala.mp3', isCorrect: true },
    ],
  },

 {
    id: 'oracion3g',
    sentence: 'La ___ es muy rica.',
    image: '/images/lecciones/g/guinda.png',
    imageAlt: 'Una guinda',
    options: [
      { name: 'gorra', audio: '/audio/lecciones/g/gorra.mp3', isCorrect: false },
      { name: 'guinda', audio: '/audio/lecciones/g/guinda.mp3', isCorrect: true },
    ],
  },
]

// Actividad final
//completa las oraciones con las palabras del recuadro.
// Van a aparecer oraciones y se debe elegir la palabra correcta del recuadro para completar la oración.
export const gFinalActivity = {
  instructionAudio: '/audio/lecciones/g/instruccion-actividad-final-g.mp3',
  wordBank: [
    { id: 'gato-1', word: 'gato' },
    { id: 'lago-1', word: 'lago' },
    { id: 'agua-1', word: 'agua' },
    { id: 'lago-2', word: 'lago' },
    { id: 'gato-2', word: 'gato' },
    { id: 'largo-1', word: 'largo' },
    { id: 'Gabriel-1', word: 'Gabriel' },
    { id: 'gato-3', word: 'gato' },
    { id: 'aguacate-1', word: 'aguacate' },
    { id: 'golosinas-1', word: 'golosinas' },
  ],
  sentences: [
    {
      id: 'og1',
      sentence: 'El domingo salió Gabriel con su ___.',
      acceptedAnswers: [['gato']],
    },
    {
      id: 'og2',
      sentence: 'Se fueron a pasear al ___.',
      acceptedAnswers: [['lago']],
    },
    {
      id: 'og3',
      sentence: 'El gato tomó ___ en el ___.',
      acceptedAnswers: [['agua', 'lago']],
    },
    {
      id: 'og4',
      sentence: 'Gabriel y su ___ jugaron ___ tiempo.',
      acceptedAnswers: [['gato', 'largo']],
    },
    {
      id: 'og5',
      sentence: 'Al volver, ___ y su ___ comieron ___ y ___.',
      acceptedAnswers: [
        ['Gabriel', 'gato', 'aguacate', 'golosinas'],
        ['Gabriel', 'gato', 'golosinas', 'aguacate'],
      ],
    },
  ],
}
