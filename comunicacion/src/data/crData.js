// Para la parte del cuento
export const crReading = {
  title: 'Un nuevo cráter',
  paragraphs: [
    'Hace muchos años, en un pueblo pequeño, empezaron a sentirse muchos temblores. Las personas estaban asustadas. No sabían qué pasaba. Tembló durante muchos días.',
    'Un día se oyó una gran explosión: ¡buuum, buuum! Un gran temblor sacudió todo el pueblo. Las familias corrieron de un lado a otro, no sabían qué hacer. Mucha gente tomó sus cosas y se fue del pueblo.',
    'Al día siguiente de esa explosión, quienes se quedaron fueron a ver qué había ocurrido. No muy lejos del pueblo, la tierra se había abierto. La gente encontró un gran hoyo, era un cráter. Por eso se oyó la explosión. Del cráter salía humo y ceniza. ¡Había nacido un volcán!',
  ],
  image: '/images/lecciones/cr/nuevo-crater.png',
  imageAlt: 'cráter',
  instructionAudio: '/audio/lecciones/cr/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/cr/nuevo-crater.mp3',
}

// Preguntas
export const crComprehensionQuestions = [
  '¿Hay volcanes cerca de dónde vives? ¿Qué sabes de ellos?',
  '¿De qué trata la historia?',
  '¿Qué es un cráter?',
  '¿Por qué muchas personas tomaron sus cosas y se fueron del pueblo? ¿Qué hubieras hecho tú?',
  '¿Alguna vez has sentido un temblor? Comparte tu experiencia.',
]

// ============================================================
// ACTIVIDAD DE RECONOCER SONIDOS
// ============================================================

// Fase 1: solo escuchar la palabra "cráter" y los sonidos /c/ y /r/ por separado
export const crSoundIntro = {
  instructionAudio: '/audio/lecciones/cr/instruccion-cr.mp3',
  mainWord: {
    name: 'cráter',
    image: '/images/lecciones/cr/crater.png',
    audio: '/audio/lecciones/cr/crater.mp3',
  },
  soundAudioC: '/audio/lecciones/c/sonido-c.mp3',
  soundAudioR: '/audio/lecciones/r/sonido-r.mp3',
}

// Fase 2: seleccionar las imágenes cuyo nombre EMPIEZA con el sonido /cr/
export const crSelectionInstructionAudio =
  '/audio/lecciones/cr/instruccion-sonido-cr.mp3'

export const crImagePool = [
  {
    id: 'crater',
    name: 'cráter',
    image: '/images/lecciones/cr/crater.png',
    audio: '/audio/lecciones/cr/crater.mp3',
    startsWithCr: true,
  },
  {
    id: 'collar',
    name: 'collar',
    image: '/images/lecciones/cr/collar.png',
    audio: '/audio/lecciones/cr/collar.mp3',
    startsWithCr: false,
  },
  {
    id: 'cruz',
    name: 'cruz',
    image: '/images/lecciones/cr/cruz.png',
    audio: '/audio/lecciones/cr/cruz.mp3',
    startsWithCr: true,
  },
  {
    id: 'craneo',
    name: 'cráneo',
    image: '/images/lecciones/cr/craneo.png',
    audio: '/audio/lecciones/cr/craneo.mp3',
    startsWithCr: true,
  },
  {
    id: 'crema',
    name: 'crema',
    image: '/images/lecciones/cr/crema.png',
    audio: '/audio/lecciones/cr/crema.mp3',
    startsWithCr: true,
  },
]

// Fase 3: seleccionar las imágenes que CONTIENEN el sonido /cr/ en cualquier parte
export const crContainsInstructionAudio =
  '/audio/lecciones/cr/instruccion-contiene-cr.mp3'

export const crSoundMatching = {
  instructionAudio: crContainsInstructionAudio,
  items: [
    {
      id: 'microfono',
      name: 'micrófono',
      image: '/images/lecciones/cr/microfono.png',
      audio: '/audio/lecciones/cr/microfono.mp3',
      containsCr: true,
    },
    {
      id: 'escritorio',
      name: 'escritorio',
      image: '/images/lecciones/cr/escritorio.png',
      audio: '/audio/lecciones/cr/escritorio.mp3',
      containsCr: true,
    },
    {
      id: 'escribir',
      name: 'escribir',
      image: '/images/lecciones/cr/escribir.png',
      audio: '/audio/lecciones/cr/escribir.mp3',
      containsCr: true,
    },
    {
      id: 'cepillo',
      name: 'cepillo',
      image: '/images/lecciones/cr/cepillo.png',
      audio: '/audio/lecciones/cr/cepillo.mp3',
      containsCr: false,
    },
  ],
}

// Fase 4: trabalenguas (actividad solo de escucha, sin comprobación)
export const crTrabalenguasInstructionAudio =
  '/audio/lecciones/cr/instruccion-trabalenguas.mp3'

export const crTrabalenguas = [
  {
    id: 'trabalenguas',
    text: [
      'Cristina lleva el cristal a la cristalería.',
      'En la cristalería Cristina dejará el cristal.',
      'Cuando el cristal esté limpio,',
      'Cristina se llevará el cristal de la cristalería.',
    ],
    image: '/images/lecciones/cr/cristi-cristal.png',
    imageAlt: 'Cristina con el cristal',
    audio: '/audio/lecciones/cr/trabalenguas.mp3',
  },
]

// ============================================================
// ACTIVIDAD DE SÍLABAS
// ============================================================

// Fase 1: conocer la combinación CR y sus sílabas
export const crLetterPresentation = {
  instructionAudio: '/audio/lecciones/cr/instruccion-letra-cr.mp3',
  soundAudio: '/audio/lecciones/cr/sonido-cr.mp3',
  combinations: [
    { syllable: 'cra', audio: '/audio/lecciones/cr/silaba-cra.mp3' },
    { syllable: 'cre', audio: '/audio/lecciones/cr/silaba-cre.mp3' },
    { syllable: 'cri', audio: '/audio/lecciones/cr/silaba-cri.mp3' },
    { syllable: 'cro', audio: '/audio/lecciones/cr/silaba-cro.mp3' },
    { syllable: 'cru', audio: '/audio/lecciones/cr/silaba-cru.mp3' },
  ],
}

// Fase 2: buscar sílabas que contengan la combinación CR
export const crSyllableSearch = {
  instructionAudio: '/audio/lecciones/cr/instruccion-buscar-silabas.mp3',
  targetSyllables: ['cra', 'cre', 'cri', 'cro', 'cru'],
  options: [
    { syllable: 'cra', audio: '/audio/lecciones/cr/silaba-cra.mp3' },
    { syllable: 'bla', audio: '/audio/lecciones/cr/silaba-bla.mp3' },
    { syllable: 'pla', audio: '/audio/lecciones/cr/silaba-pla.mp3' },
    { syllable: 'cre', audio: '/audio/lecciones/cr/silaba-cre.mp3' },
    { syllable: 'cri', audio: '/audio/lecciones/cr/silaba-cri.mp3' },
    { syllable: 'bli', audio: '/audio/lecciones/cr/silaba-bli.mp3' },
    { syllable: 'cro', audio: '/audio/lecciones/cr/silaba-cro.mp3' },
    { syllable: 'blo', audio: '/audio/lecciones/cr/silaba-blo.mp3' },
    { syllable: 'ci', audio: '/audio/lecciones/cr/silaba-ci.mp3' },
    { syllable: 'cru', audio: '/audio/lecciones/cr/silaba-cru.mp3' },
    { syllable: 'che', audio: '/audio/lecciones/cr/silaba-che.mp3' },
    { syllable: 'plu', audio: '/audio/lecciones/cr/silaba-plu.mp3' },
  ],
}

// Fase 3: completar la palabra con la sílaba que falta
export const crSyllableOptions = ['cra', 'cre', 'cri', 'cro', 'cru']

export const crCompletionInstructionAudio =
  '/audio/lecciones/cr/instruccion-completar-cr.mp3'

export const crWordCompletion = [
  {
    id: 'croquetas',
    word: 'croquetas',
    pattern: '___quetas',
    image: '/images/lecciones/cr/croquetas.png',
    audio: '/audio/lecciones/cr/croquetas.mp3',
    answer: 'cro',
  },
  {
    id: 'cristal',
    word: 'cristal',
    pattern: '___stal',
    image: '/images/lecciones/cr/cristal.png',
    audio: '/audio/lecciones/cr/cristal.mp3',
    answer: 'cri',
  },
  {
    id: 'cresta',
    word: 'cresta',
    pattern: '___sta',
    image: '/images/lecciones/cr/cresta.png',
    audio: '/audio/lecciones/cr/cresta.mp3',
    answer: 'cre',
  },
  {
    id: 'crayon',
    word: 'crayón',
    pattern: '___yón',
    image: '/images/lecciones/cr/crayon.png',
    audio: '/audio/lecciones/cr/crayon.mp3',
    answer: 'cra',
  },
]

// Fase 4: seleccionar las palabras que contengan el sonido /cr/
export const crWordBankInstructionAudio =
  '/audio/lecciones/cr/instruccion-banco-cr.mp3'

export const crWordBank = {
  instructionAudio: crWordBankInstructionAudio,
  items: [
    {
      id: 'morral',
      name: 'morral',
      audio: '/audio/lecciones/cr/morral.mp3',
      containsCr: false,
    },
    {
      id: 'crema',
      name: 'crema',
      audio: '/audio/lecciones/cr/crema.mp3',
      containsCr: true,
    },
    {
      id: 'crisis',
      name: 'crisis',
      audio: '/audio/lecciones/cr/crisis.mp3',
      containsCr: true,
    },
    {
      id: 'perico',
      name: 'perico',
      audio: '/audio/lecciones/cr/perico.mp3',
      containsCr: false,
    },
    {
      id: 'conejo',
      name: 'conejo',
      audio: '/audio/lecciones/cr/conejo.mp3',
      containsCr: false,
    },
    {
      id: 'cromo',
      name: 'cromo',
      audio: '/audio/lecciones/cr/cromo.mp3',
      containsCr: true,
    },
    {
      id: 'creativo',
      name: 'creativo',
      audio: '/audio/lecciones/cr/creativo.mp3',
      containsCr: true,
    },
    {
      id: 'micro',
      name: 'micro',
      audio: '/audio/lecciones/cr/micro.mp3',
      containsCr: true,
    },
    {
      id: 'cria',
      name: 'cría',
      audio: '/audio/lecciones/cr/cria.mp3',
      containsCr: true,
    },
    {
      id: 'crudo',
      name: 'crudo',
      audio: '/audio/lecciones/cr/crudo.mp3',
      containsCr: true,
    },
    {
      id: 'cama',
      name: 'cama',
      audio: '/audio/lecciones/cr/cama.mp3',
      containsCr: false,
    },
    {
      id: 'crucero',
      name: 'crucero',
      audio: '/audio/lecciones/cr/crucero.mp3',
      containsCr: true,
    },
  ],
}

// ============================================================
// ACTIVIDAD FINAL
// ============================================================

// Fase 1: ordenar sílabas para formar la palabra (cada palabra trae
// exactamente sus dos sílabas, desordenadas, sin distractores)
export const crJoinInstructionAudio =
  '/audio/lecciones/cr/instruccion-formar-cr.mp3'

export const crSyllableJoin = [
  {
    id: 'crudo',
    word: 'crudo',
    audio: '/audio/lecciones/cr/crudo.mp3',
    syllables: ['cru', 'do'],
  },
  {
    id: 'crema',
    word: 'crema',
    audio: '/audio/lecciones/cr/crema.mp3',
    syllables: ['cre', 'ma'],
  },
  {
    id: 'cristal',
    word: 'cristal',
    audio: '/audio/lecciones/cr/cristal.mp3',
    syllables: ['cri', 'stal'],
  },
]

// Audio de instrucción para la fase 2 (formar oraciones)
export const crSentenceFormation = {
  instructionAudio: '/audio/lecciones/cr/instruccion-formar-oraciones-cr.mp3',
}

// Fase 2: formar la oración correcta con un banco de palabras desordenado
export const crWordJoin = [
  {
    id: 'oracion1cr',
    sentence: 'Cristi tiró la crema.',
    options: ['crema.', 'la', 'Cristi', 'tiró'],
  },
  {
    id: 'oracion2cr',
    sentence: 'La carne está cruda.',
    options: ['cruda.', 'está', 'La', 'carne'],
  },
  {
    id: 'oracion3cr',
    sentence: 'Crispín puso la cruz.',
    options: ['cruz.', 'la', 'Crispín', 'puso'],
  },
]