export const chReading = {
  title: 'Chailú y el chocolate',
  paragraphs: [
    'A una aldea de San Marcos, llegó a vivir una familia de China. A uno de ellos, llamado Chailú, le sucedió algo chistoso.',
    'Cuando Chailú estaba jugando con sus hermanos, llegó su mamá y les ofreció un pedazo de chocolate. Todos corrieron a la casa. Chailú, a quien le gustaba mucho el chocolate, llegó primero. Tomó la bolsa que estaba sobre la mesa. Sin pensarlo, la escondió en su cuarto y ahí se quedó. Luego de un rato, extrañado de que sus hermanos no reclamaran sus chocolates, abrió la bolsa y ¡oh sorpresa!... estaba llena de basura.',
    'La mamá había puesto la bolsa de basura en la mesa, mientras sacaba unos platos para repartir el chocolate. Por equivocación, Chailú la había agarrado.',
    'Muy avergonzado, Chailú devolvió la bolsa de basura. Se sentó a la mesa, donde le esperaba una deliciosa porción de chocolate.',
  ],
  image: '/images/lecciones/ch/chailu-bolsa-basura.png',
  imageAlt: 'Chailú sentado en el piso de su cuarto, sorprendido al abrir la bolsa de basura',
  instructionAudio: '/audio/lecciones/ch/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/ch/chailu-y-el-chocolate.mp3',
}

export const chComprehensionQuestions = [
  '¿Dónde vivía la familia de Chailú?',
  '¿Qué aprendió Chailú?',
  '¿Por qué Chailú se sintió avergonzado? ¿Qué hubieras hecho en su lugar?',
  'Si pudiéramos conversar con Chailú, ¿qué te gustaría preguntarle?',
]

// ============================================================
// ACTIVIDAD 1 — SONIDOS (página 122)

export const chSoundIntro = {
  instructionAudio: '/audio/lecciones/ch/instruccion-sonido-ch.mp3',
  soundAudio: '/audio/lecciones/ch/sonido-ch.mp3',
  mainWord: {
    name: 'chocolate',
    image: '/images/lecciones/ch/chocolate.png',
    audio: '/audio/lecciones/ch/chocolate.mp3',
  },
}

// Escuchar y repetir: palabras que empiezan con ch (chorro, chiva, chula)
export const chSoundExamplesInstructionAudio =
  '/audio/lecciones/ch/instruccion-palabras-ch.mp3'

export const chSoundExamples = [
  { word: 'chorro', image: '/images/lecciones/ch/chorro.png', audio: '/audio/lecciones/ch/chorro.mp3' },
  { word: 'chiva', image: '/images/lecciones/ch/chiva.png', audio: '/audio/lecciones/ch/chiva.mp3' },
  { word: 'chula', image: '/images/lecciones/ch/chula.png', audio: '/audio/lecciones/ch/chula.mp3' },
]

// Fase 2: tocar los dibujos que empiezan con el mismo sonido que chocolate
export const chInitialSoundInstructionAudio =
  '/audio/lecciones/ch/instruccion-seleccion-inicial-ch.mp3'

export const chInitialSoundImages = [
  {
    id: 'chumpa',
    name: 'chumpa',
    image: '/images/lecciones/ch/chumpa.png',
    audio: '/audio/lecciones/ch/chumpa.mp3',
    startsWithCh: true,
  },
  {
    id: 'arbol',
    name: 'árbol',
    image: '/images/lecciones/ch/arbol.png',
    audio: '/audio/lecciones/ch/arbol.mp3',
    startsWithCh: false,
  },
  {
    id: 'chaleco',
    name: 'chaleco',
    image: '/images/lecciones/ch/chaleco.png',
    audio: '/audio/lecciones/ch/chaleco.mp3',
    startsWithCh: true,
  },
  {
    id: 'chorizos',
    name: 'chorizos',
    image: '/images/lecciones/ch/chorizos.png',
    audio: '/audio/lecciones/ch/chorizos.mp3',
    startsWithCh: true,
  },
]

// Fase 3 (página 122, segundo bloque): el sonido /ch/ también puede estar
// en medio o al final de la palabra. flecha, gabacha y cancha lo tienen
// al final; machete, lechuga y mochila lo tienen en medio.
export const chPositionInstructionAudio =
  '/audio/lecciones/ch/instruccion-posicion-ch.mp3'

export const chPositionWords = [
  {
    id: 'flecha',
    word: 'flecha',
    image: '/images/lecciones/ch/flecha.png',
    audio: '/audio/lecciones/ch/flecha.mp3',
    answer: 'final',
  },
  {
    id: 'gabacha',
    word: 'gabacha',
    image: '/images/lecciones/ch/gabacha.png',
    audio: '/audio/lecciones/ch/gabacha.mp3',
    answer: 'final',
  },
  {
    id: 'machete',
    word: 'machete',
    image: '/images/lecciones/ch/machete.png',
    audio: '/audio/lecciones/ch/machete.mp3',
    answer: 'medio',
  },
  {
    id: 'lechuga',
    word: 'lechuga',
    image: '/images/lecciones/ch/lechuga.png',
    audio: '/audio/lecciones/ch/lechuga.mp3',
    answer: 'medio',
  },
  {
    id: 'mochila',
    word: 'mochila',
    image: '/images/lecciones/ch/mochila.png',
    audio: '/audio/lecciones/ch/mochila.mp3',
    answer: 'medio',
  },
  {
    id: 'cancha',
    word: 'cancha',
    image: '/images/lecciones/ch/cancha.png',
    audio: '/audio/lecciones/ch/cancha.mp3',
    answer: 'final',
  },
]

// ============================================================
// ACTIVIDAD 2 — SÍLABAS cha, che, chi, cho, chu (página 123)

export const chLetterPresentation = {
  instructionAudio: '/audio/lecciones/ch/instruccion-letra-ch.mp3',
  soundAudio: '/audio/lecciones/ch/sonido-ch.mp3',
  combinations: [
    { syllable: 'cha', audio: '/audio/lecciones/ch/silaba-cha.mp3' },
    { syllable: 'che', audio: '/audio/lecciones/ch/silaba-che.mp3' },
    { syllable: 'chi', audio: '/audio/lecciones/ch/silaba-chi.mp3' },
    { syllable: 'cho', audio: '/audio/lecciones/ch/silaba-cho.mp3' },
    { syllable: 'chu', audio: '/audio/lecciones/ch/silaba-chu.mp3' },
  ],
}

export const chSyllableInstructionAudio =
  '/audio/lecciones/ch/instruccion-silabas-ch.mp3'

// Página 123: chompipe, cheque, chile y churro, cada uno con dos
// opciones de sílaba para elegir (la correcta y una parecida).
export const chSyllableImageExercises = [
  {
    id: 'chompipe',
    word: 'chompipe',
    syllable: 'cho',
    image: '/images/lecciones/ch/chompipe.png',
    audio: '/audio/lecciones/ch/chompipe.mp3',
    options: ['cho', 'cha'],
  },
  {
    id: 'cheque',
    word: 'cheque',
    syllable: 'che',
    image: '/images/lecciones/ch/cheque.png',
    audio: '/audio/lecciones/ch/cheque.mp3',
    options: ['che', 'chi'],
  },
  {
    id: 'chile',
    word: 'chile',
    syllable: 'chi',
    image: '/images/lecciones/ch/chile.png',
    audio: '/audio/lecciones/ch/chile.mp3',
    options: ['chu', 'chi'],
  },
  {
    id: 'churro',
    word: 'churro',
    syllable: 'chu',
    image: '/images/lecciones/ch/churro.png',
    audio: '/audio/lecciones/ch/churro.mp3',
    options: ['cho', 'chu'],
  },
]

// Página 123, segundo bloque: leer la palabra y tocar la sílaba con ch
// que tiene (mecha es el ejemplo del libro, ya resuelto).
export const chWordSyllableInstructionAudio =
  '/audio/lecciones/ch/instruccion-silaba-en-palabra-ch.mp3'

export const chWordSyllableExample = { word: 'mecha', answer: 'cha' }

export const chWordSyllableExercises = [
  { id: 'chepe', word: 'Chepe', answer: 'che', isProperNoun: true },
  { id: 'achote', word: 'achote', answer: 'cho' },
  { id: 'chalo', word: 'Chalo', answer: 'cha', isProperNoun: true },
  { id: 'chulo', word: 'chulo', answer: 'chu' },
  { id: 'chico', word: 'chico', answer: 'chi' },
]

// ============================================================
// ACTIVIDAD 3 — COMPLETAR (página 125)

// Fase 1: elegir la sílaba que falta para completar la palabra.
export const chCompletionInstructionAudio =
  '/audio/lecciones/ch/instruccion-completar-palabras-ch.mp3'

// `before`/`after` son el texto ya visible a cada lado del espacio en
// blanco; así se puede armar la palabra sin importar si la sílaba que
// falta va al inicio, en medio o al final (ej. cuchillo la tiene en medio).
export const chCompletionExercises = [
  {
    id: 'leche',
    image: '/images/lecciones/ch/leche.png',
    imageAlt: 'Un vaso sirviéndose leche',
    word: 'leche',
    answer: 'che',
    options: ['cha', 'che'],
    before: 'le',
    after: '',
    audio: '/audio/lecciones/ch/leche.mp3',
  },
  {
    id: 'cuchillo',
    image: '/images/lecciones/ch/cuchillo.png',
    imageAlt: 'Un cuchillo',
    word: 'cuchillo',
    answer: 'chi',
    options: ['chi', 'cho'],
    before: 'cu',
    after: 'llo',
    audio: '/audio/lecciones/ch/cuchillo.mp3',
  },
  {
    id: 'chaqueta',
    image: '/images/lecciones/ch/chaqueta.png',
    imageAlt: 'Una chaqueta',
    word: 'chaqueta',
    answer: 'cha',
    options: ['cha', 'che'],
    before: '',
    after: 'queta',
    audio: '/audio/lecciones/ch/chaqueta.mp3',
  },
  {
    id: 'ocho',
    image: '/images/lecciones/ch/ocho.png',
    imageAlt: 'El número 8',
    word: 'ocho',
    answer: 'cho',
    options: ['cho', 'chu'],
    before: 'o',
    after: '',
    audio: '/audio/lecciones/ch/ocho.mp3',
  },
  {
    id: 'cacho',
    image: '/images/lecciones/ch/cacho.png',
    imageAlt: 'Un cacho o cuerno',
    word: 'cacho',
    answer: 'cho',
    options: ['cho', 'chu'],
    before: 'ca',
    after: '',
    audio: '/audio/lecciones/ch/cacho.mp3',
  },
  {
    id: 'chile-completar',
    image: '/images/lecciones/ch/chile.png',
    imageAlt: 'Un chile',
    word: 'chile',
    answer: 'chi',
    options: ['chi', 'cha'],
    before: '',
    after: 'le',
    audio: '/audio/lecciones/ch/chile.mp3',
  },
]

// Fase 2: unir la primera sílaba con la sílaba que falta para formar
// la palabra.
export const chJoinInstructionAudio = '/audio/lecciones/ch/instruccion-formar-palabras-ch.mp3'

export const chJoinExercises = [
  {
    id: 'chorro',
    image: '/images/lecciones/ch/chorro.png',
    imageAlt: 'Un chorro de agua',
    firstSyllable: 'cho',
    answer: 'rro',
    options: ['rro', 'ta', 'le'],
    word: 'chorro',
    audio: '/audio/lecciones/ch/chorro.mp3',
  },
  {
    id: 'chapa',
    image: '/images/lecciones/ch/chapa.png',
    imageAlt: 'Una chapa de puerta',
    firstSyllable: 'cha',
    answer: 'pa',
    options: ['pa', 'rro', 'ta'],
    word: 'chapa',
    audio: '/audio/lecciones/ch/chapa.mp3',
  },
  {
    id: 'chile-formar',
    image: '/images/lecciones/ch/chile.png',
    imageAlt: 'Un chile',
    firstSyllable: 'chi',
    answer: 'le',
    options: ['le', 'pa', 'rro'],
    word: 'chile',
    audio: '/audio/lecciones/ch/chile.mp3',
  },
]

// ============================================================
// ACTIVIDAD FINAL (página 126)

// Fase 1: repasar palabras con ch (las que el libro no tacha)
export const chFinalWordsInstructionAudio =
  '/audio/lecciones/ch/instruccion-palabras-finales-ch.mp3'

export const chFinalWords = [
  {
    word: 'Chailú',
    image: '/images/lecciones/ch/chailu.png',
    audio: '/audio/lecciones/ch/chailu.mp3',
    isProperNoun: true,
  },
  {
    word: 'techo',
    image: '/images/lecciones/ch/techo.png',
    audio: '/audio/lecciones/ch/techo.mp3',
  },
  {
    word: 'chicle',
    image: '/images/lecciones/ch/chicle.png',
    audio: '/audio/lecciones/ch/chicle.mp3',
  },
  {
    word: 'mochila',
    image: '/images/lecciones/ch/mochila.png',
    audio: '/audio/lecciones/ch/mochila.mp3',
  },
  {
    word: 'chaleco',
    image: '/images/lecciones/ch/chaleco.png',
    audio: '/audio/lecciones/ch/chaleco.mp3',
  },
]

// Fase 2: completar las 3 oraciones de la página 126 eligiendo la imagen
export const chSentenceInstructionAudio = '/audio/lecciones/ch/instruccion-oraciones-ch.mp3'

// contextImage: la ilustración de la oración en el libro. Se muestra
// arriba de las opciones porque algunas oraciones (como la del sapo) no
// se pueden adivinar solo con el texto — la imagen es la pista real.
export const chSentenceExercises = [
  {
    id: 'mochila-julia',
    sentence: 'La ___ es de Julia.',
    answer: 'mochila',
    contextImage: '/images/lecciones/ch/nina-mochila.png',
    contextImageAlt: 'Una niña caminando con su mochila',
    sentenceAudio: '/audio/lecciones/ch/oracion-la-mochila.mp3',
    completedAudio: '/audio/lecciones/ch/la-mochila-es-de-julia.mp3',
    options: [
      { name: 'machete', audio: '/audio/lecciones/ch/machete.mp3' },
      { name: 'mochila', audio: '/audio/lecciones/ch/mochila.mp3' },
    ],
  },
  {
    id: 'chailu-chocolate',
    sentence: 'Chailú come mucho ___.',
    answer: 'chocolate',
    contextImage: '/images/lecciones/ch/chailu-comiendo-chocolate.png',
    contextImageAlt: 'Chailú comiendo una barra de chocolate',
    sentenceAudio: '/audio/lecciones/ch/oracion-chailu-come.mp3',
    completedAudio: '/audio/lecciones/ch/chailu-come-mucho-chocolate.mp3',
    options: [
      { name: 'chocolate', audio: '/audio/lecciones/ch/chocolate.mp3' },
      { name: 'leche', audio: '/audio/lecciones/ch/leche.mp3' },
    ],
  },
  {
    id: 'sapo-noche',
    sentence: 'Ese sapo sale de ___.',
    answer: 'noche',
    contextImage: '/images/lecciones/ch/luna.png',
    contextImageAlt: 'La luna llena en un cielo oscuro',
    sentenceAudio: '/audio/lecciones/ch/oracion-ese-sapo.mp3',
    completedAudio: '/audio/lecciones/ch/ese-sapo-sale-de-noche.mp3',
    options: [
      { name: 'día', audio: '/audio/lecciones/ch/dia.mp3' },
      { name: 'noche', audio: '/audio/lecciones/ch/noche.mp3' },
    ],
  },
]

export const chFinalCongratulationsAudio = '/audio/lecciones/ch/felicitacion-final.mp3'
