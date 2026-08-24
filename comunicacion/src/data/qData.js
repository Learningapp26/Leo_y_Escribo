export const qReading = {
  title: 'El queso viajero',
  paragraphs: [
    'Cierta vez, una señora dejó un queso cerca de la ventana de la cocina, para que le diera el aire. El olor del queso atrajo a un zope, quien se lo llevó hasta su nido. Lo dejó ahí y se fue volando.',
    'El olor atrajo a una ardilla que paseaba cerca. La ardilla llegó al nido del zope y se llevó el queso muy rápido. De camino a su casa, se le cayó el queso y fue a dar a un río. El agua del río lo arrastró hasta la orilla. Una niña que estaba pescando tomó el queso y se lo llevó a su casa. Esa noche la familia cenó tortillas con queso. Así terminó el viaje del queso.',
  ],
  image: '/images/lecciones/q/lectura-queso-viajero.png',
  imageAlt:
    'Un queso viajando desde la ventana de una cocina hasta un río, llevado por un zope y una ardilla',
  instructionAudio: '/audio/lecciones/q/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/q/el-queso-viajero.mp3',
}

// Audio de instrucción para la actividad de ordenar las escenas
export const qOrderInstructionAudio =
  '/audio/lecciones/q/instruccion-ordenar-escenas.mp3'

// Opciones de número que puede recibir cada escena
export const qOrderOptions = ['1', '2', '3', '4']

export const qOrderScenes = [
  {
    id: 'escena-rio',
    scene: '3',
    image: '/images/lecciones/q/lectura-queso-viajero.png',
    imageAlt:
      'El queso cae al río y el agua lo arrastra hasta la orilla',
    answer: '3',
  },
  {
    id: 'escena-ardilla',
    scene: '2',
    image: '/images/lecciones/q/escena-ardilla.png',
    imageAlt: 'La ardilla se lleva el queso del nido del zope',
    answer: '2',
  },
  {
    id: 'escena-nina',
    scene: '4',
    image: '/images/lecciones/q/escena-nina.png',
    imageAlt: 'La niña recoge el queso que llegó a la orilla del río',
    answer: '4',
  },
  {
    id: 'escena-zope',
    scene: '1',
    image: '/images/lecciones/q/escena-zope.png',
    imageAlt: 'El zope se lleva el queso de la ventana hasta su nido',
    answer: '1',
  },
]

export const qComprehensionQuestions = [
  '¿Qué hubiera pasado si la niña no recoge el queso del río?',
  '¿A dónde hubiera llegado ese queso?',
]

// ============================================================
// ACTIVIDAD 1 — SONIDOS (página 66)

// Fase 1: escuchar la palabra queso y el sonido /q/
export const qSoundIntro = {
  instructionAudio: '/audio/lecciones/q/instruccion-sonido-q.mp3',
  mainWord: {
    name: 'queso',
    image: '/images/lecciones/q/queso.png',
    audio: '/audio/lecciones/q/queso.mp3',
  },
  soundAudio: '/audio/lecciones/q/sonido-q.mp3',
}

// Palabras de ejemplo de la página 67 para escuchar y repetir
export const qSoundExamples = [
  { word: 'quilete', audio: '/audio/lecciones/q/quilete.mp3' },
  { word: 'quemada', audio: '/audio/lecciones/q/quemada.mp3' },
  { word: 'esquina', audio: '/audio/lecciones/q/esquina.mp3' },
]

// Fase 2 (página 66): tocar los dibujos que empiezan con el mismo
// sonido que queso. quince y quetzal sí comienzan igual; silla y mano no.
export const qInitialSoundInstructionAudio =
  '/audio/lecciones/q/instruccion-seleccion-inicial-q.mp3'

export const qInitialSoundImages = [
  {
    id: 'quince',
    name: 'quince',
    image: '/images/lecciones/q/quince.png',
    audio: '/audio/lecciones/q/quince.mp3',
    startsWithQ: true,
  },
  {
    id: 'quetzal',
    name: 'quetzal',
    image: '/images/lecciones/q/quetzal.png',
    audio: '/audio/lecciones/q/quetzal.mp3',
    startsWithQ: true,
  },
  {
    id: 'silla',
    name: 'silla',
    image: '/images/lecciones/q/silla.png',
    audio: '/audio/lecciones/q/silla.mp3',
    startsWithQ: false,
  },
  {
    id: 'mano',
    name: 'mano',
    image: '/images/lecciones/q/mano.png',
    audio: '/audio/lecciones/q/mano.mp3',
    startsWithQ: false,
  },
]

export const qMiddleSoundInstructionAudio =
  '/audio/lecciones/q/instruccion-sonido-silaba-q.mp3'

export const qMiddleSoundWords = [
  {
    id: 'queso-silaba',
    word: 'queso',
    syllables: ['que', 'so'],
    answerIndex: 0,
    audio: '/audio/lecciones/q/queso.mp3',
  },
  {
    id: 'tanque',
    word: 'tanque',
    syllables: ['tan', 'que'],
    answerIndex: 1,
    audio: '/audio/lecciones/q/tanque.mp3',
  },
  {
    id: 'cheque',
    word: 'cheque',
    syllables: ['che', 'que'],
    answerIndex: 1,
    audio: '/audio/lecciones/q/cheque.mp3',
  },
  {
    id: 'guisquil',
    word: 'güisquil',
    syllables: ['güis', 'quil'],
    answerIndex: 1,
    audio: '/audio/lecciones/q/guisquil.mp3',
  },
  {
    id: 'parque',
    word: 'parque',
    syllables: ['par', 'que'],
    answerIndex: 1,
    audio: '/audio/lecciones/q/parque.mp3',
  },
  {
    id: 'bosque',
    word: 'bosque',
    syllables: ['bos', 'que'],
    answerIndex: 1,
    audio: '/audio/lecciones/q/bosque.mp3',
  },
]

export const qLetterExplanation =
  'La letra q siempre está acompañada de una u para que suene, y solo se combina con la e y la i: que, qui. La letra c, cuando se combina con o, a o u, tiene el mismo sonido que la q.'

export const qSyllableInstructionAudio =
  '/audio/lecciones/q/instruccion-silabas-q.mp3'

export const qSyllableAudios = {
  que: '/audio/lecciones/q/silaba-que.mp3',
  qui: '/audio/lecciones/q/silaba-qui.mp3',
}

// Página 67: quilete, quemada y Quique (esquina no se usa aquí porque
// el sonido qui está en medio de la palabra, no al inicio)
export const qSyllableImageExercises = [
  {
    id: 'quilete',
    word: 'quilete',
    syllable: 'qui',
    image: '/images/lecciones/q/quilete.png',
    audio: '/audio/lecciones/q/quilete.mp3',
  },
  {
    id: 'quemada',
    word: 'quemada',
    syllable: 'que',
    image: '/images/lecciones/q/quemada.png',
    audio: '/audio/lecciones/q/quemada.mp3',
  },
  {
    id: 'quique',
    word: 'Quique',
    syllable: 'qui',
    image: '/images/lecciones/q/quique.png',
    audio: '/audio/lecciones/q/quique.mp3',
    isProperNoun: true,
  },
]

export const qDiscriminationInstructionAudio =
  '/audio/lecciones/q/instruccion-discriminar-silabas-q.mp3'

export const qDiscriminationExercises = [
  {
    id: 'discriminar-que',
    target: 'que',
    items: [
      { id: 'que-fila-0', syllable: 'pa' },
      { id: 'que-fila-1', syllable: 'que' },
      { id: 'que-fila-2', syllable: 'pu' },
      { id: 'que-fila-3', syllable: 'pi' },
      { id: 'que-fila-4', syllable: 'que' },
      { id: 'que-fila-5', syllable: 'po' },
      { id: 'que-fila-6', syllable: 'que' },
      { id: 'que-fila-7', syllable: 'pe' },
      { id: 'que-fila-8', syllable: 'que' },
    ],
    answerIds: ['que-fila-1', 'que-fila-4', 'que-fila-6', 'que-fila-8'],
  },
  {
    id: 'discriminar-qui',
    target: 'qui',
    items: [
      { id: 'qui-fila-0', syllable: 'pu' },
      { id: 'qui-fila-1', syllable: 'qui' },
      { id: 'qui-fila-2', syllable: 'pa' },
      { id: 'qui-fila-3', syllable: 'pe' },
      { id: 'qui-fila-4', syllable: 'qui' },
      { id: 'qui-fila-5', syllable: 'pu' },
      { id: 'qui-fila-6', syllable: 'pe' },
      { id: 'qui-fila-7', syllable: 'qui' },
      { id: 'qui-fila-8', syllable: 'pi' },
      { id: 'qui-fila-9', syllable: 'qui' },
    ],
    answerIds: [
      'qui-fila-1',
      'qui-fila-4',
      'qui-fila-7',
      'qui-fila-9',
    ],
  },
]

// ============================================================
// ACTIVIDAD 3 — COMPLETAR (página 69)

// Fase 1 (página 69, primer bloque): elegir la sílaba correcta entre
// dos opciones para cada dibujo. Repasa ca, co, cu, que y qui juntas,
// tal como en el libro.
export const qCompletionInstructionAudio =
  '/audio/lecciones/q/instruccion-completar-palabras-q.mp3'

export const qCompletionExercises = [
  {
    id: 'conejo',
    image: '/images/lecciones/q/conejo.png',
    imageAlt: 'Un conejo',
    word: 'conejo',
    answer: 'co',
    options: ['que', 'co'],
    audio: '/audio/lecciones/q/conejo.mp3',
  },
  {
    id: 'quita',
    image: '/images/lecciones/q/quita-la-pelota.png',
    imageAlt: 'Un niño le quita el balón a otro en un partido de fútbol',
    word: 'quita',
    answer: 'qui',
    options: ['qui', 'cu'],
    audio: '/audio/lecciones/q/quita.mp3',
  },
  {
    id: 'cuna',
    image: '/images/lecciones/q/cuna.png',
    imageAlt: 'Una cuna',
    word: 'cuna',
    answer: 'cu',
    options: ['que', 'cu'],
    audio: '/audio/lecciones/q/cuna.mp3',
  },
  {
    id: 'raqueta',
    image: '/images/lecciones/q/raqueta.png',
    imageAlt: 'Una raqueta de tenis',
    word: 'raqueta',
    answer: 'que',
    options: ['ca', 'que'],
    audio: '/audio/lecciones/q/raqueta.mp3',
  },
  {
    id: 'caballo',
    image: '/images/lecciones/q/caballo.png',
    imageAlt: 'Un caballo',
    word: 'caballo',
    answer: 'ca',
    options: ['qui', 'ca'],
    audio: '/audio/lecciones/q/caballo.mp3',
  },
  {
    id: 'queso-completar',
    image: '/images/lecciones/q/queso.png',
    imageAlt: 'Un queso en un plato',
    word: 'queso',
    answer: 'que',
    options: ['co', 'que'],
    audio: '/audio/lecciones/q/queso.mp3',
  },
]

// Fase 2 (página 69, segundo bloque): unir sílabas para formar
// palabras. que+ma=quema, que+so=queso, qui+ta=quita, qui+se=quise.
export const qJoinInstructionAudio =
  '/audio/lecciones/q/instruccion-unir-silabas-q.mp3'

export const qJoinExercises = [
  {
    id: 'quema',
    image: '/images/lecciones/q/quema.png',
    imageAlt: 'Una llama de fuego',
    firstSyllable: 'que',
    answer: 'ma',
    options: ['ma', 'so', 'ta'],
    word: 'quema',
    audio: '/audio/lecciones/q/quema.mp3',
  },
  {
    id: 'queso-unir',
    image: '/images/lecciones/q/queso.png',
    imageAlt: 'Un queso en un plato',
    firstSyllable: 'que',
    answer: 'so',
    options: ['ta', 'se', 'so'],
    word: 'queso',
    audio: '/audio/lecciones/q/queso.mp3',
  },
  {
    id: 'quita-unir',
    image: '/images/lecciones/q/quita-la-pelota.png',
    imageAlt: 'Un niño le quita el balón a otro',
    firstSyllable: 'qui',
    answer: 'ta',
    options: ['ma', 'ta', 'se'],
    word: 'quita',
    audio: '/audio/lecciones/q/quita.mp3',
  },
  {
    id: 'quise',
    image: '/images/lecciones/q/quise.png',
    imageAlt: 'Una niña señalando algo que quería',
    firstSyllable: 'qui',
    answer: 'se',
    options: ['so', 'ta', 'se'],
    word: 'quise',
    audio: '/audio/lecciones/q/quise.mp3',
  },
]

// ============================================================
// ACTIVIDAD FINAL (página 70)

// Fase 1: repasar palabras con q (Paquita, paquete, mosquito)
export const qFinalWordsInstructionAudio =
  '/audio/lecciones/q/instruccion-palabras-finales-q.mp3'

export const qFinalWords = [
  {
    word: 'Paquita',
    image: '/images/lecciones/q/paquita.png',
    audio: '/audio/lecciones/q/paquita.mp3',
    isProperNoun: true,
  },
  {
    word: 'paquete',
    image: '/images/lecciones/q/paquete.png',
    audio: '/audio/lecciones/q/paquete.mp3',
  },
  {
    word: 'mosquito',
    image: '/images/lecciones/q/mosquito.png',
    audio: '/audio/lecciones/q/mosquito.mp3',
  },
]

// Fase 2 (adaptado de la página 70): en el libro se copian las
// oraciones a la línea según la imagen. Aquí se adapta a elegir la
// palabra con q que completa cada oración, entre dos imágenes.
export const qSentenceInstructionAudio =
  '/audio/lecciones/q/instruccion-oraciones-q.mp3'

export const qSentenceExercises = [
  {
    id: 'mosquitos-pican',
    sentence: 'Los ___ me pican.',
    answer: 'mosquitos',
    sentenceAudio: '/audio/lecciones/q/oracion-los-mosquitos.mp3',
    completedAudio: '/audio/lecciones/q/los-mosquitos-me-pican.mp3',
    options: [
      {
        name: 'mosquitos',
        image: '/images/lecciones/q/mosquito.png',
        audio: '/audio/lecciones/q/mosquito.mp3',
      },
      {
        name: 'perros',
        image: '/images/lecciones/q/perro.png',
        audio: '/audio/lecciones/q/perro.mp3',
      },
    ],
  },
  {
    id: 'quique-raqueta',
    sentence: 'Quique usa la ___.',
    answer: 'raqueta',
    sentenceAudio: '/audio/lecciones/q/oracion-quique-usa.mp3',
    completedAudio: '/audio/lecciones/q/quique-usa-la-raqueta.mp3',
    options: [
      {
        name: 'pelota',
        image: '/images/lecciones/q/pelota.png',
        audio: '/audio/lecciones/q/pelota.mp3',
      },
      {
        name: 'raqueta',
        image: '/images/lecciones/q/raqueta.png',
        audio: '/audio/lecciones/q/raqueta.mp3',
      },
    ],
  },
  {
    id: 'queli-queso',
    sentence: 'Queli come ___.',
    answer: 'queso',
    sentenceAudio: '/audio/lecciones/q/oracion-queli-come.mp3',
    completedAudio: '/audio/lecciones/q/queli-come-queso.mp3',
    options: [
      {
        name: 'queso',
        image: '/images/lecciones/q/queso.png',
        audio: '/audio/lecciones/q/queso.mp3',
      },
      {
        name: 'pan',
        image: '/images/lecciones/q/pan.png',
        audio: '/audio/lecciones/q/pan.mp3',
      },
    ],
  },
  {
    id: 'queta-quiletes',
    sentence: 'Queta corta los ___.',
    answer: 'quiletes',
    sentenceAudio: '/audio/lecciones/q/oracion-queta-corta.mp3',
    completedAudio: '/audio/lecciones/q/queta-corta-los-quiletes.mp3',
    options: [
      {
        name: 'tomates',
        image: '/images/lecciones/q/tomates.png',
        audio: '/audio/lecciones/q/tomates.mp3',
      },
      {
        name: 'quiletes',
        image: '/images/lecciones/q/quiletes.png',
        audio: '/audio/lecciones/q/quiletes.mp3',
      },
    ],
  },
]
