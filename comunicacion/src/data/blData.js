// Para la parte del cuento
export const blReading = {
  title: 'El regalo misterioso',
  paragraphs: [
    'Se acercaba el cumpleaños de Blanqui, una niña muy linda, de seis años. Su mamá quería regalarle algo muy especial.',
    'Por las noches, cuando todos se acostaban, la mamá de Blanqui se quedaba bordando. Nadie sabía qué bordaba con tanta dedicación. Y cuando alguien le preguntaba qué hacía, su respuesta era: «algo muy especial». Lo guardaba tan bien que nadie sabía de qué se trataba. ¡Era un misterio!',
    'Así fueron pasando los días, hasta que llegó el cumpleaños de Blanqui. Ese día, temprano, la mamá de Blanqui tomó lo que había estado bordado con tanta dedicación y lo colocó en una caja. Le puso un hermoso moño y se lo dio a Blanqui.',
    'Blanqui, muy emocionada, lo destapó. ¡Era una hermosa blusa con flores bordadas! ¡A Blanqui le encantó su blusa nueva!',
  ],
  image: '/images/lecciones/bl/regalo-misterioso.png',
  imageAlt: 'regalo misterioso',
  instructionAudio: '/audio/lecciones/bl/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/bl/regalo-misterioso.mp3',
}
 
// Preguntas
export const blComprehensionQuestions = [
  '¿Por qué la mamá de Blanqui bordaba en secreto?',
  '¿Por qué el regalo que preparaba la mamá de Blanqui era algo especial?',
  '¿Por qué el cuento se llama El regalo misterioso?',
  '¿Si te dieran un regalo, te gustaría saber antes qué es? ¿Por qué?',
]

// ACTIVIDAD DE RECONOCER SONIDOS

// Fase 1: solo escuchar la palabra "pluma" y los sonidos /p/ y /l/ por separado
export const plSoundIntro = {
  instructionAudio: '/audio/lecciones/pl/instruccion-pl.mp3',
  mainWord: {
    name: 'pluma',
    image: '/images/lecciones/pl/pluma.png',
    audio: '/audio/lecciones/pl/pluma.mp3',
  },
  soundAudioP: '/audio/lecciones/p/sonido-p.mp3',
  soundAudioL: '/audio/lecciones/l/sonido-l.mp3',
}
 
// Fase 2: seleccionar las imágenes cuyo nombre EMPIEZA con el sonido /pl/
export const plSelectionInstructionAudio =
  '/audio/lecciones/pl/instruccion-sonido-pl.mp3'
 
export const plImagePool = [
  {
    id: 'pluma',
    name: 'pluma',
    image: '/images/lecciones/pl/pluma.png',
    audio: '/audio/lecciones/pl/pluma.mp3',
    startsWithPl: true,
  },
  {
    id: 'plancha',
    name: 'plancha',
    image: '/images/lecciones/pl/plancha.png',
    audio: '/audio/lecciones/pl/plancha.mp3',
    startsWithPl: true,
  },
  {
    id: 'platano',
    name: 'plátano',
    image: '/images/lecciones/pl/platano.png',
    audio: '/audio/lecciones/pl/platano.mp3',
    startsWithPl: true,
  },
  {
    id: 'pelota',
    name: 'pelota',
    image: '/images/lecciones/pl/pelota.png',
    audio: '/audio/lecciones/pl/pelota.mp3',
    startsWithPl: false,
  },
  {
    id: 'plumero',
    name: 'plumero',
    image: '/images/lecciones/pl/plumero.png',
    audio: '/audio/lecciones/pl/plumero.mp3',
    startsWithPl: true,
  },
]
 
// Fase 3: seleccionar las imágenes que CONTIENEN el sonido /pl/ en cualquier parte
export const plContainsInstructionAudio =
  '/audio/lecciones/pl/instruccion-contiene-pl.mp3'
 
export const plSoundMatching = {
  instructionAudio: plContainsInstructionAudio,
  items: [
    {
      id: 'aplauso',
      name: 'aplauso',
      image: '/images/lecciones/pl/aplauso.png',
      audio: '/audio/lecciones/pl/aplauso.mp3',
      containsPl: true,
    },
    {
      id: 'planeta',
      name: 'planeta',
      image: '/images/lecciones/pl/planeta.png',
      audio: '/audio/lecciones/pl/planeta.mp3',
      containsPl: true,
    },
    {
      id: 'pajaro',
      name: 'pájaro',
      image: '/images/lecciones/pl/pajaro.png',
      audio: '/audio/lecciones/pl/pajaro.mp3',
      containsPl: false,
    },
    {
      id: 'plato',
      name: 'plato',
      image: '/images/lecciones/pl/plato.png',
      audio: '/audio/lecciones/pl/plato.mp3',
      containsPl: true,
    },
  ],
}
 
// Fase 4: trabalenguas (actividad solo de escucha, sin comprobación)
export const plTrabalenguasInstructionAudio =
  '/audio/lecciones/pl/instruccion-trabalenguas.mp3'
 
export const plTrabalenguas = [
  {
    id: 'trabalenguas1',
    text: 'Plato, platillo, platón, un plato quieres, un plato te doy.',
    image: '/images/lecciones/pl/platon.png',
    audio: '/audio/lecciones/pl/trabalenguas1.mp3',
  },
  {
    id: 'trabalenguas2',
    text: 'Sopla que sopla la vela, de un soplido la sopló y la vela soplada quedó.',
    image: '/images/lecciones/pl/vela.png',
    audio: '/audio/lecciones/pl/trabalenguas2.mp3',
  },
]


// ============================================================
// ACTIVIDAD DE SÍLABAS

// Fase 1: conocer la combinación PL y sus sílabas
export const plLetterPresentation = {
  instructionAudio: '/audio/lecciones/pl/instruccion-letra-pl.mp3',
  soundAudio: '/audio/lecciones/pl/sonido-pl.mp3',
  combinations: [
    { syllable: 'pla', audio: '/audio/lecciones/pl/silaba-pla.mp3' },
    { syllable: 'ple', audio: '/audio/lecciones/pl/silaba-ple.mp3' },
    { syllable: 'pli', audio: '/audio/lecciones/pl/silaba-pli.mp3' },
    { syllable: 'plo', audio: '/audio/lecciones/pl/silaba-plo.mp3' },
    { syllable: 'plu', audio: '/audio/lecciones/pl/silaba-plu.mp3' },
  ],
}
 
// Fase 2: buscar sílabas que contengan la combinación PL
export const plSyllableSearch = {
  instructionAudio: '/audio/lecciones/pl/instruccion-buscar-silabas.mp3',
  targetSyllables: ['pla', 'ple', 'pli', 'plo', 'plu'],
  options: [
    { syllable: 'pa', audio: '/audio/lecciones/pl/silaba-pa.mp3' },
    { syllable: 'pla', audio: '/audio/lecciones/pl/silaba-pla.mp3' },
    { syllable: 'la', audio: '/audio/lecciones/pl/silaba-la.mp3' },
    { syllable: 'ple', audio: '/audio/lecciones/pl/silaba-ple.mp3' },
    { syllable: 'ta', audio: '/audio/lecciones/pl/silaba-ta.mp3' },
    { syllable: 'pli', audio: '/audio/lecciones/pl/silaba-pli.mp3' },
    { syllable: 'da', audio: '/audio/lecciones/pl/silaba-da.mp3' },
    { syllable: 'plo', audio: '/audio/lecciones/pl/silaba-plo.mp3' },
    { syllable: 'ca', audio: '/audio/lecciones/pl/silaba-ca.mp3' },
    { syllable: 'plu', audio: '/audio/lecciones/pl/silaba-plu.mp3' },
  ],
}
 
// Fase 3: completar la palabra con la sílaba que falta
export const plSyllableOptions = ['pla', 'ple', 'pli', 'plo', 'plu']
 
export const plCompletionInstructionAudio =
  '/audio/lecciones/pl/instruccion-completar-pl.mp3'
 
export const plWordCompletion = [
  {
    id: 'plomero',
    word: 'plomero',
    pattern: '__mero',
    image: '/images/lecciones/pl/plomero.png',
    audio: '/audio/lecciones/pl/plomero.mp3',
    answer: 'plo',
  },
  {
    id: 'platano',
    word: 'plátano',
    pattern: '__tano',
    image: '/images/lecciones/pl/platano.png',
    audio: '/audio/lecciones/pl/platano.mp3',
    answer: 'pla',
  },
  {
    id: 'soplete',
    word: 'soplete',
    pattern: 'so__te',
    image: '/images/lecciones/pl/soplete.png',
    audio: '/audio/lecciones/pl/soplete.mp3',
    answer: 'ple',
  },
  {
    id: 'plumero',
    word: 'plumero',
    pattern: '__mero',
    image: '/images/lecciones/pl/plumero.png',
    audio: '/audio/lecciones/pl/plumero.mp3',
    answer: 'plu',
  },
]
 
// Fase 4: se muestra una sílaba y un banco de palabras, seleccionar las palabras que contienen esa sílaba
export const plWordBankInstructionAudio =
  '/audio/lecciones/pl/instruccion-banco-pl.mp3'
 
export const plWordSyllableSelection = [
  {
    id: 'pla',
    syllable: 'pla',
    syllableAudio: '/audio/lecciones/pl/silaba-pla.mp3',
    options: ['palo', 'playa', 'plana', 'paso', 'plano'],
    answer: ['playa', 'plana', 'plano'],
  },
  {
    id: 'ple',
    syllable: 'ple',
    syllableAudio: '/audio/lecciones/pl/silaba-ple.mp3',
    options: ['pleno', 'pelo', 'cumple', 'pena', 'sople'],
    answer: ['pleno', 'cumple', 'sople'],
  },
  {
    id: 'pli',
    syllable: 'pli',
    syllableAudio: '/audio/lecciones/pl/silaba-pli.mp3',
    options: ['pino', 'cumplí', 'suplica', 'pila', 'aplica'],
    answer: ['cumplí', 'suplica', 'aplica'],
  },
  {
    id: 'plo',
    syllable: 'plo',
    syllableAudio: '/audio/lecciones/pl/silaba-plo.mp3',
    options: ['polen', 'plomo', 'polo', 'templo', 'pone'],
    answer: ['plomo', 'templo'],
  },
  {
    id: 'plu',
    syllable: 'plu',
    syllableAudio: '/audio/lecciones/pl/silaba-plu.mp3',
    options: ['puro', 'pluma', 'puma', 'plumero', 'plumaje'],
    answer: ['pluma', 'plumero', 'plumaje'],
  },
]

// ACTIVIDAD FINAL

// Fase 1: formar palabras tocando sílabas
// El banco es el mismo en las tres rondas.
export const plJoinInstructionAudio =
  '/audio/lecciones/pl/instruccion-formar-pl.mp3'
 
export const plSyllableJoinOptions = ['na', 'ta', 'no']
 
export const plSyllableJoin = [
  {
    id: 'plana',
    prefix: 'pla',
    pattern: 'pla__',
    word: 'plana',
    wordAudio: '/audio/lecciones/pl/plana.mp3',
    answer: 'na',
  },
  {
    id: 'plata',
    prefix: 'pla',
    pattern: 'pla__',
    word: 'plata',
    wordAudio: '/audio/lecciones/pl/plata.mp3',
    answer: 'ta',
  },
  {
    id: 'plano',
    prefix: 'pla',
    pattern: 'pla__',
    word: 'plano',
    wordAudio: '/audio/lecciones/pl/plano.mp3',
    answer: 'no',
  },
]
 
// Fase 2: completar la oración 
// Se da un banco de palabras y hay que seleccionar la que completa la oración correctamente.
export const plSentenceCompletionInstructionAudio =
  '/audio/lecciones/pl/instruccion-completar-oracion-pl.mp3'
 
export const plWordBank = ['plátano', 'pluma', 'planta']
 
export const plSentenceCompletion = [
  {
    id: 'oracion1pl',
    sentence: 'Pati come ____.',
    audio: '/audio/lecciones/pl/oracion-platano.mp3',
    answer: 'plátano',
  },
  {
    id: 'oracion2pl',
    sentence: 'Esa ____ es un peral.',
    audio: '/audio/lecciones/pl/oracion-planta.mp3',
    answer: 'planta',
  },
  {
    id: 'oracion3pl',
    sentence: 'La ____ que me dio es rosada.',
    audio: '/audio/lecciones/pl/oracion-pluma.mp3',
    answer: 'pluma',
  },
]
 