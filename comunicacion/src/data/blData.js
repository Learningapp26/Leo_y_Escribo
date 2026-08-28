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


// Fase 1: solo escuchar la palabra "blusa" y los sonidos /b/ y /l/ por separado
export const blSoundIntro = {
  instructionAudio: '/audio/lecciones/bl/instruccion-bl.mp3',
  mainWord: {
    name: 'blusa',
    image: '/images/lecciones/bl/blusa.png',
    audio: '/audio/lecciones/bl/blusa.mp3',
  },
  soundAudioP: '/audio/lecciones/b/sonido-b.mp3',
  soundAudioL: '/audio/lecciones/l/sonido-l.mp3',
}
 
// Fase 2: seleccionar las imágenes cuyo nombre EMPIEZA con el sonido /bl/
export const blSelectionInstructionAudio =
  '/audio/lecciones/bl/instruccion-sonido-bl.mp3'
 
export const blImagePool = [
  {
    id: 'blusa',
    name: 'blusa',
    image: '/images/lecciones/bl/blusa.png',
    audio: '/audio/lecciones/bl/blusa.mp3',
    startsWithBl: true,
  },
  {
    id: 'blanco',
    name: 'blanco',
    image: '/images/lecciones/bl/blanco.png',
    audio: '/audio/lecciones/bl/blanco.mp3',
    startsWithBl: true,
  },
  {
    id: 'bledo',
    name: 'bledo',
    image: '/images/lecciones/bl/bledo.png',
    audio: '/audio/lecciones/bl/bledo.mp3',
    startsWithBl: true,
  },
  {
    id: 'carreta',
    name: 'carreta',
    image: '/images/lecciones/bl/carreta.png',
    audio: '/audio/lecciones/bl/carreta.mp3',
    startsWithBl: false,
  },
  {
    id: 'bloque',
    name: 'bloque',
    image: '/images/lecciones/bl/bloque.png',
    audio: '/audio/lecciones/bl/bloque.mp3',
    startsWithBl: true,
  },
]
 
// Fase 3: seleccionar las imágenes que CONTIENEN el sonido /bl/ en cualquier parte
export const blContainsInstructionAudio =
  '/audio/lecciones/bl/instruccion-contiene-bl.mp3'
 
export const blSoundMatching = {
  instructionAudio: blContainsInstructionAudio,
  items: [
    {
      id: 'biblia',
      name: 'biblia',
      image: '/images/lecciones/bl/biblia.png',
      audio: '/audio/lecciones/bl/biblia.mp3',
      containsBl: true,
    },
    {
      id: 'cable',
      name: 'cable',
      image: '/images/lecciones/bl/cable.png',
      audio: '/audio/lecciones/bl/cable.mp3',
      containsBl: true,
    },
    {
      id: 'martillo',
      name: 'martillo',
      image: '/images/lecciones/bl/martillo.png',
      audio: '/audio/lecciones/bl/martillo.mp3',
      containsBl: false,
    },
    {
      id: 'tabla',
      name: 'tabla',
      image: '/images/lecciones/bl/tabla.png',
      audio: '/audio/lecciones/bl/tabla.mp3',
      containsBl: true,
    },
  ],
}
 
// Fase 4: trabalenguas (actividad solo de escucha, sin comprobación)
export const blTrabalenguasInstructionAudio =
  '/audio/lecciones/bl/instruccion-trabalenguas.mp3'
 
export const blTrabalenguas = [
  {
    id: 'trabalenguas',
    text: [
      'Pablo habla al pueblo',
      'parado en una tabla.',
      'Mientras habla Pablo al pueblo,',
      'la tabla se ablanda.',
    ],
    image: '/images/lecciones/bl/pablo-tabla.png',
    audio: '/audio/lecciones/bl/trabalenguas.mp3',
  },
]
 


// ============================================================
// ACTIVIDAD DE SÍLABAS

// Fase 1: conocer la combinación BL y sus sílabas
export const blLetterPresentation = {
  instructionAudio: '/audio/lecciones/bl/instruccion-letra-bl.mp3',
  soundAudio: '/audio/lecciones/bl/sonido-bl.mp3',
  combinations: [
    { syllable: 'bla', audio: '/audio/lecciones/bl/silaba-bla.mp3' },
    { syllable: 'ble', audio: '/audio/lecciones/bl/silaba-ble.mp3' },
    { syllable: 'bli', audio: '/audio/lecciones/bl/silaba-bli.mp3' },
    { syllable: 'blo', audio: '/audio/lecciones/bl/silaba-blo.mp3' },
    { syllable: 'blu', audio: '/audio/lecciones/bl/silaba-blu.mp3' },
  ],
}
 
// Fase 2: buscar sílabas que contengan la combinación BL
export const blSyllableSearch = {
  instructionAudio: '/audio/lecciones/bl/instruccion-buscar-silabas.mp3',
  targetSyllables: ['bla', 'ble', 'bli', 'blo', 'blu'],
  options: [
    { syllable: 'pa', audio: '/audio/lecciones/bl/silaba-pa.mp3' },
    { syllable: 'bla', audio: '/audio/lecciones/bl/silaba-bla.mp3' },
    { syllable: 'la', audio: '/audio/lecciones/bl/silaba-la.mp3' },
    { syllable: 'ble', audio: '/audio/lecciones/bl/silaba-ble.mp3' },
    { syllable: 'ta', audio: '/audio/lecciones/bl/silaba-ta.mp3' },
    { syllable: 'bli', audio: '/audio/lecciones/bl/silaba-bli.mp3' },
    { syllable: 'da', audio: '/audio/lecciones/bl/silaba-da.mp3' },
    { syllable: 'blo', audio: '/audio/lecciones/bl/silaba-blo.mp3' },
    { syllable: 'ca', audio: '/audio/lecciones/bl/silaba-ca.mp3' },
    { syllable: 'blu', audio: '/audio/lecciones/bl/silaba-blu.mp3' },
    { syllable: 'pla', audio: '/audio/lecciones/bl/silaba-pla.mp3' },
    { syllable: 'plu', audio: '/audio/lecciones/bl/silaba-plu.mp3' },
  ],
}
 
// Fase 3: completar la palabra con la sílaba que falta
export const blSyllableOptions = ['bla', 'ble', 'bli', 'blo', 'blu']
 
export const blCompletionInstructionAudio =
  '/audio/lecciones/bl/instruccion-completar-bl.mp3'
 
export const blWordCompletion = [
  {
    id: 'bledo',
    word: 'bledo',
    pattern: '___do',
    image: '/images/lecciones/bl/bledo.png',
    audio: '/audio/lecciones/bl/bledo.mp3',
    answer: 'ble',
  },
  {
    id: 'blando',
    word: 'blando',
    pattern: '___ndo',
    image: '/images/lecciones/bl/blando.png',
    audio: '/audio/lecciones/bl/blando.mp3',
    answer: 'bla',
  },
  {
    id: 'bloque',
    word: 'bloque',
    pattern: '___que',
    image: '/images/lecciones/bl/bloque.png',
    audio: '/audio/lecciones/bl/bloque.mp3',
    answer: 'blo',
  },
  {
    id: 'bluson',
    word: 'blusón',
    pattern: '___són',
    image: '/images/lecciones/bl/bluson.png',
    audio: '/audio/lecciones/bl/bluson.mp3',
    answer: 'blu',
  },
]
 
// Fase 4: el banco de palabras es SIEMPRE el mismo; lo que cambia en cada
// ronda es la sílaba objetivo y, por lo tanto, qué palabras son correctas
export const blWordBankInstructionAudio =
  '/audio/lecciones/bl/instruccion-banco-bl.mp3'
 
export const blWordOptions = [
  { word: 'pueblo', audio: '/audio/lecciones/bl/pueblo.mp3' },
  { word: 'roble', audio: '/audio/lecciones/bl/roble.mp3' },
  { word: 'temblor', audio: '/audio/lecciones/bl/temblor.mp3' },
  { word: 'doblado', audio: '/audio/lecciones/bl/doblado.mp3' },
  { word: 'neblina', audio: '/audio/lecciones/bl/neblina.mp3' },
  { word: 'noble', audio: '/audio/lecciones/bl/noble.mp3' },
  { word: 'establo', audio: '/audio/lecciones/bl/establo.mp3' },
]
 
export const blWordSyllableSelection = [
  {
    id: 'bla',
    syllable: 'bla',
    syllableAudio: '/audio/lecciones/bl/silaba-bla.mp3',
    answer: ['doblado'],
  },
  {
    id: 'ble',
    syllable: 'ble',
    syllableAudio: '/audio/lecciones/bl/silaba-ble.mp3',
    answer: ['roble', 'noble'],
  },
  {
    id: 'bli',
    syllable: 'bli',
    syllableAudio: '/audio/lecciones/bl/silaba-bli.mp3',
    answer: ['neblina'],
  },
  {
    id: 'blo',
    syllable: 'blo',
    syllableAudio: '/audio/lecciones/bl/silaba-blo.mp3',
    answer: ['pueblo', 'temblor', 'establo'],
  },
]
 

// ACTIVIDAD FINAL
 

// Fase 1: elegir la sílaba correcta (entre dos) para completar la palabra
export const blJoinInstructionAudio =
  '/audio/lecciones/bl/instruccion-formar-bl.mp3'
 
export const blSyllableJoin = [
  {
    id: 'amable',
    word: 'amable',
    pattern: 'ama___',
    wordAudio: '/audio/lecciones/bl/amable.mp3',
    options: [
      {
        syllable: 'ble',
        audio: '/audio/lecciones/bl/silaba-ble.mp3',
        isCorrect: true,
      },
      {
        syllable: 'blu',
        audio: '/audio/lecciones/bl/silaba-blu.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'doblada',
    word: 'doblada',
    pattern: 'do___da',
    wordAudio: '/audio/lecciones/pr/prado.mp3',
    options: [
      {
        syllable: 'bli',
        audio: '/audio/lecciones/pr/silaba-pri.mp3',
        isCorrect: false,
      },
      {
        syllable: 'bla',
        audio: '/audio/lecciones/pr/silaba-pra.mp3',
        isCorrect: true,
      },
    ],
  },
  {
    id: 'estable',
    word: 'estable',
    pattern: 'esta___',
    wordAudio: '/audio/lecciones/bl/estable.mp3',
    options: [
      {
        syllable: 'bli',
        audio: '/audio/lecciones/bl/silaba-bli.mp3',
        isCorrect: false,
      },
      {
        syllable: 'ble',
        audio: '/audio/lecciones/bl/silaba-ble.mp3',
        isCorrect: true,
      },
    ],
  },
  {
    id: 'mueble',
    word: 'mueble',
    pattern: 'mue___',
    wordAudio: '/audio/lecciones/pr/mueble.mp3',
    options: [
      {
        syllable: 'bli',
        audio: '/audio/lecciones/bl/silaba-bli.mp3',
        isCorrect: false,
      },
      {
        syllable: 'ble',
        audio: '/audio/lecciones/bl/silaba-ble.mp3',
        isCorrect: true,
      },
    ],
  },
]
 
// Audio de instrucción para la fase 2 (formar oraciones)
export const blSentenceFormation = {
  instructionAudio: '/audio/lecciones/bl/instruccion-formar-oraciones-bl.mp3',
}
 
// Fase 2: formar la oración correcta con un banco de palabras desordenado
export const blWordJoin = [
  {
    id: 'oracion1bl',
    sentence: 'Pablo está en el pueblo.',
    options: ['el', 'pueblo.', 'en', 'Pablo', 'está'],
  },
  {
    id: 'oracion2bl',
    sentence: 'La blusa blanca se secó.',
    options: ['secó.', 'blusa', 'La', 'se', 'blanca'],
  },
  {
    id: 'oracion3bl',
    sentence: 'Beto dobla el cable.',
    options: ['el', 'Beto', 'dobla', 'cable.'],
  },
]
