// Data unificada de la lección N. Basada en las páginas 50, 51 y 52 del libro.
//
// Audios: todavía no existen, así que van en null. Cuando se agregue una
// grabación basta con poner su ruta; los botones dejan de estar deshabilitados.
// Imágenes: deben ser PNG con fondo transparente (ver lista al final).

const nImage = (name) => `/images/lecciones/n/${name}.png`

// Convierte una ruta (o null) en el objeto que espera LessonAudioButton.
export const asAudio = (src) => ({ src, available: Boolean(src) })

// ============================================================
// PÁGINA DE LA LECCIÓN

export const nReading = {
  title: 'Una nariz sorprendente',
  paragraphs: [
    'Hace muchos años, existió un joven con una nariz muy especial. Se llamaba Nando. ¿Por qué era especial? Verás, su nariz podía hacer algo muy sorprendente: oler las mentiras. Cada vez que Nando oía mentir a alguien, él comenzaba a estornudar y no paraba hasta que dejaban de mentir.',
    'Una vez, Nando escuchó que un niño le pedía permiso a su mamá para salir a jugar. La mamá le preguntó si había terminado sus tareas y el niño respondió que sí. ¿Qué crees que le pasó a Nando? Empezó a estornudar.',
    'La mamá escuchó los estornudos y le preguntó a su hijo: ¿Es cierto que ya terminaste? El niño, coloradito, le dijo: No, todavía me falta. En ese momento, Nando dejó de estornudar. Así funcionaba la nariz de Nando.',
  ],
  image: nImage('lectura-nariz-sorprendente'),
  imageAlt: 'Nando estornuda en un patio mientras una mamá conversa con su hijo',
  instructionAudio: null, // TODO: audio de la instrucción de la lección
  readingAudio: null, // TODO: audio del cuento
}

// G3 pendiente: decidir si las preguntas llevan audio.
export const nComprehensionQuestions = [
  '¿Quién tenía una nariz sorprendente?',
  '¿Por qué era especial la nariz de Nando?',
  '¿Cómo supo la mamá que el niño no había hecho la tarea?',
  '¿Conoces a alguien que haya dicho alguna mentira? ¿Qué fue lo que dijo?',
]

export const nActivitiesInstructionAudio = null // TODO: "Elige una actividad"

// ============================================================
// ACTIVIDAD 1 — SONIDOS

// Parte 1: escuchar el sonido /n/ y la palabra nariz
export const nSoundIntro = {
  instructionAudio: null, // TODO
  soundAudio: null, // TODO: sonido /n/
  mainWord: {
    name: 'nariz',
    image: nImage('nariz'),
    audio: null, // TODO
  },
  exampleWords: [
    { id: 'nena', name: 'nena', image: nImage('nena'), audio: null },
    { id: 'nene', name: 'nene', image: nImage('nene'), audio: null },
    { id: 'nube', name: 'nube', image: nImage('nube'), audio: null },
  ],
}

// Parte 2: tocar las imágenes que empiezan como nariz.
// Solo aquí las palabras no llevan otra «n» (nido, nudo, nube).
export const nInitialSelection = {
  instructionAudio: null, // TODO
  items: [
    { id: 'nido', name: 'nido', image: nImage('nido'), audio: null, startsWithN: true },
    { id: 'carro', name: 'carro', image: nImage('carro'), audio: null, startsWithN: false },
    { id: 'nudo', name: 'nudo', image: nImage('nudo'), audio: null, startsWithN: true },
    { id: 'mesa', name: 'mesa', image: nImage('mesa'), audio: null, startsWithN: false },
    { id: 'nube-sel', name: 'nube', image: nImage('nube'), audio: null, startsWithN: true },
  ],
}

// Parte 3: elegir dos imágenes que empiecen con el mismo sonido
export const nInitialPairMatching = {
  instructionAudio: null, // TODO
  items: [
    { id: 'nena', name: 'nena', image: nImage('nena'), audio: null, startsWithN: true },
    { id: 'pino', name: 'pino', image: nImage('pino'), audio: null, startsWithN: false },
    { id: 'nene', name: 'nene', image: nImage('nene'), audio: null, startsWithN: true },
    { id: 'mono', name: 'mono', image: nImage('mono'), audio: null, startsWithN: false },
    { id: 'naranja', name: 'naranja', image: nImage('naranja'), audio: null, startsWithN: true },
    { id: 'nariz', name: 'nariz', image: nImage('nariz'), audio: null, startsWithN: true },
  ],
}

// Parte 4 (página 50): palabras que riman porque terminan igual.
// En el libro cada pareja comparte un color:
//   camión–limón, ratón–corazón, sartén–tren, calcetín–cojín.
// camión, limón, ratón y corazón terminan todos en -ón, así que cualquier
// pareja entre ellos es válida (mismo pairId).
export const nFinalPairMatching = {
  instructionAudio: null, // TODO
  items: [
    { id: 'camion', name: 'camión', image: nImage('camion'), audio: null, pairId: 'on' },
    { id: 'sarten', name: 'sartén', image: nImage('sarten'), audio: null, pairId: 'en' },
    { id: 'raton', name: 'ratón', image: nImage('raton'), audio: null, pairId: 'on' },
    { id: 'corazon', name: 'corazón', image: nImage('corazon'), audio: null, pairId: 'on' },
    { id: 'limon', name: 'limón', image: nImage('limon'), audio: null, pairId: 'on' },
    { id: 'tren', name: 'tren', image: nImage('tren'), audio: null, pairId: 'en' },
  ],
}

// ============================================================
// ACTIVIDAD 2 — SÍLABAS (página 51)

// Parte 1: conocer la N y tocar cada combinación
export const nLetterPresentation = {
  instructionAudio: null, // TODO
  soundAudio: null, // TODO
  combinations: [
    { syllable: 'na', audio: null },
    { syllable: 'ne', audio: null },
    { syllable: 'ni', audio: null },
    { syllable: 'no', audio: null },
    { syllable: 'nu', audio: null },
  ],
}

// Parte 3: leer palabras con la sílaba resaltada (sin nombres propios)
export const nSyllableWordsInstructionAudio = null // TODO

export const nSyllableWords = [
  { id: 'nena', word: 'nena', highlighted: 'ne', rest: 'na', image: nImage('nena'), syllableAudio: null, wordAudio: null },
  { id: 'nene', word: 'nene', highlighted: 'ne', rest: 'ne', image: nImage('nene'), syllableAudio: null, wordAudio: null },
  { id: 'naranja', word: 'naranja', highlighted: 'na', rest: 'ranja', image: nImage('naranja'), syllableAudio: null, wordAudio: null },
  { id: 'nube', word: 'nube', highlighted: 'nu', rest: 'be', image: nImage('nube'), syllableAudio: null, wordAudio: null },
]

// Parte 4: elegir la sílaba con la que inicia el nombre del dibujo
export const nStartSyllableInstructionAudio = null // TODO

export const nStartSyllable = [
  { id: 'nido', word: 'nido', image: nImage('nido'), audio: null, options: ['na', 'ni', 'no', 'nu', 'mi', 'ne'], answer: 'ni' },
  { id: 'nave', word: 'nave', image: nImage('nave'), audio: null, options: ['me', 'nu', 'na', 'ni', 'ne', 'no'], answer: 'na' },
  { id: 'nudo', word: 'nudo', image: nImage('nudo'), audio: null, options: ['ne', 'nu', 'na', 'ni', 'mu', 'no'], answer: 'nu' },
]

// Parte 2: leer todas las sílabas que llevan n
export const nSyllableSearch = {
  instructionAudio: null, // TODO
  targetSyllables: ['na', 'ne', 'ni', 'no', 'nu'],
  options: [
    { syllable: 'na', audio: null },
    { syllable: 'mi', audio: null },
    { syllable: 'no', audio: null },
    { syllable: 'nu', audio: null },
    { syllable: 'me', audio: null },
    { syllable: 'ne', audio: null },
    { syllable: 'ni', audio: null },
    { syllable: 'ma', audio: null },
    { syllable: 'mu', audio: null },
    { syllable: 'lo', audio: null },
  ],
}

// ============================================================
// ACTIVIDAD 3 — COMPLETAR (página 52)

export const nSyllableOptions = ['na', 'ne', 'ni', 'no', 'nu']

// Parte 1: elegir la sílaba que falta. Los cuatro primeros son los dibujos
// del libro; pino y mono se mantienen.
export const nCompletionInstructionAudio = null // TODO

export const nWordCompletion = [
  { id: 'panes', word: 'panes', pattern: 'pa__s', image: nImage('panes'), audio: null, answer: 'ne' },
  { id: 'nube', word: 'nube', pattern: '__be', image: nImage('nube'), audio: null, answer: 'nu' },
  { id: 'nido', word: 'nido', pattern: '__do', image: nImage('nido'), audio: null, answer: 'ni' },
  { id: 'pino', word: 'pino', pattern: 'pi__', image: nImage('pino'), audio: null, answer: 'no' },
  { id: 'mono', word: 'mono', pattern: 'mo__', image: nImage('mono'), audio: null, answer: 'no' },
]

// Parte 2: combinar cada sílaba con «no». En el libro «To» lleva mayúscula
// porque Tono es un nombre propio.
export const nJoinInstructionAudio = null // TODO

export const nJoinSyllable = 'no'

export const nSyllableJoin = [
  { id: 'pi-no', first: 'pi', word: 'pino', wordAudio: null },
  { id: 'to-no', first: 'To', word: 'Tono', wordAudio: null, isProperNoun: true },
  { id: 'ma-no', first: 'ma', word: 'mano', wordAudio: null },
  { id: 'sa-no', first: 'sa', word: 'sano', wordAudio: null },
  { id: 'mo-no', first: 'mo', word: 'mono', wordAudio: null },
]

// ============================================================
// ACTIVIDAD FINAL

// Parte 1: leer palabras (sin Nati; se agregan nube y naranja)
export const nPracticeInstructionAudio = null // TODO

export const nPracticeWords = [
  { id: 'nena', word: 'nena', image: nImage('nena'), audio: null },
  { id: 'nene', word: 'nene', image: nImage('nene'), audio: null },
  { id: 'mono', word: 'mono', image: nImage('mono'), audio: null },
  { id: 'mano', word: 'mano', image: nImage('mano'), audio: null },
  { id: 'pino', word: 'pino', image: nImage('pino'), audio: null },
  { id: 'nube', word: 'nube', image: nImage('nube'), audio: null },
  { id: 'naranja', word: 'naranja', image: nImage('naranja'), audio: null },
]

// Parte 2: mirar la imagen y elegir la oración que le corresponde
export const nSentenceChoiceInstructionAudio = null // TODO

export const nSentenceChoice = [
  {
    id: 'nati-nube',
    image: nImage('nati-nube'),
    imageAlt: 'Una niña mira una nube',
    answer: 'Nati mira una nube.',
    options: ['Nati mira una nube.', 'Nati toma una naranja.', 'Nati tiene una nave.'],
  },
  {
    id: 'mono-mano',
    image: nImage('mono-mano'),
    imageAlt: 'Un mono está en una mano',
    answer: 'El mono está en la mano.',
    options: ['El mono está en la mano.', 'La nube está en el pino.', 'El nene mira una nave.'],
  },
  {
    id: 'pino-sano',
    image: nImage('pino-sano'),
    imageAlt: 'Un pino sano',
    answer: 'El pino está sano.',
    options: ['El pino está sano.', 'Nati mira la naranja.', 'El nene toma pan.'],
  },
]

// Parte 3: leer la oración y elegir la imagen. Las imágenes van sin texto.
export const nSentenceImageMatchInstructionAudio = null // TODO

export const nSentenceImageMatch = [
  {
    id: 'match-nati',
    sentence: 'Nati toma una naranja.',
    audio: null,
    answerImage: nImage('nati-naranja'),
    options: [
      { name: 'Una niña con una naranja', image: nImage('nati-naranja') },
      { name: 'Una niña con una nave', image: nImage('nati-nave') },
      { name: 'Una niña con una nube', image: nImage('nati-nube') },
    ],
  },
  {
    id: 'match-nene',
    sentence: 'El nene mira la nave.',
    audio: null,
    answerImage: nImage('nene-nave'),
    options: [
      { name: 'Un niño mirando una nave', image: nImage('nene-nave') },
      { name: 'Un niño mirando un nido', image: nImage('nene-nido') },
      { name: 'Un niño mirando una nube', image: nImage('nene-nube') },
    ],
  },
  {
    id: 'match-mano',
    sentence: 'La mano toca el piano.',
    audio: null,
    answerImage: nImage('mano-piano'),
    options: [
      { name: 'Una mano tocando piano', image: nImage('mano-piano') },
      { name: 'Una mano con pan', image: nImage('mano-pan') },
      { name: 'Una mano con un pino', image: nImage('mano-pino') },
    ],
  },
]

export const nFinalCongratulationsAudio = null // TODO

// Imágenes nuevas (PNG sin fondo) en public/images/lecciones/n/ :
// nariz, nido, nudo, nube, carro, mesa, naranja, nino, nadar, noche,
// camion, sarten, raton, calcetin, corazon, limon, cojin, tren.
// Ya existían: nena, nene, pino, mono, mano, nati-*, nene-*, mano-*, pino-sano,
// lectura-nariz-sorprendente. Ojo: antes había un archivo con espacio,
// «nati-nave .png»; ahora se espera «nati-nave.png».
