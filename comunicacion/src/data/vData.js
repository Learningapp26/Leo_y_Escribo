export const vReading = {
  title: 'La vaca de cola corta',
  paragraphs: [
    'Hubo una vez una vaca muy bonita, con manchas cafés. Desde pequeña, su colita fue muy corta. Al crecer, se hizo más notorio.',
    'Las amigas de la vaca hacían chistes acerca de su cola, pero a ella no le molestaba. Sabía que eso la hacía diferente. ¡Y eso le encantaba!',
    'Un día, llegó una plaga de mosquitos a la granja. Entonces, se dio cuenta que tener una cola corta no era una ventaja.',
    '—¿Cómo arreglar esta situación? —pensó. La vaca era muy creativa y pronto se le ocurrió una brillante idea. Invitó a su amiga, la rana, a que se subiera a su lomo. Así, desde arriba, se comía todos los insectos que se le acercaban.',
    'La rana tenía comida y a la vaca ya no le molestaban los mosquitos. Además, como buenas amigas, disfrutaban hablando y riendo.',
  ],
  image: '/images/lecciones/v/vaca-rana-lomo.png',
  imageAlt: 'Una vaca con manchas cafés y una rana sobre su lomo en una granja',
  instructionAudio: '/audio/lecciones/v/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/v/la-vaca-de-cola-corta.mp3',
}

export const vComprehensionQuestions = [
  '¿De quién habla la historia?',
  '¿Qué te parece la forma de pensar de la vaca acerca de su colita?',
  '¿Por qué tener la cola corta no era una ventaja para la vaca?',
  '¿Cómo resolvió la vaca su situación? ¿Qué te pareció la solución?',
]

// ============================================================
// ACTIVIDAD 1 — SONIDOS (página 148)

export const vSoundIntro = {
  instructionAudio: '/audio/lecciones/v/instruccion-sonido-v.mp3',
  soundAudio: '/audio/lecciones/v/sonido-v.mp3',
  mainWord: {
    name: 'vaca',
    image: '/images/lecciones/v/vaca.png',
    audio: '/audio/lecciones/v/vaca.mp3',
  },
}

export const vSoundExamplesInstructionAudio =
  '/audio/lecciones/v/instruccion-palabras-v.mp3'

// Escuchar y repetir: vino, vamos, viaje
export const vSoundExamples = [
  { word: 'vino', image: '/images/lecciones/v/vino.png', audio: '/audio/lecciones/v/vino.mp3' },
  { word: 'vamos', image: '/images/lecciones/v/vamos.png', audio: '/audio/lecciones/v/vamos.mp3' },
  { word: 'viaje', image: '/images/lecciones/v/viaje.png', audio: '/audio/lecciones/v/viaje.mp3' },
]

// Fase 2 (página 148, primer bloque): tocar los dibujos que empiezan con
// el mismo sonido que vaca. Vela, vaso y volcán sí; sandalia no.
export const vInitialSoundInstructionAudio =
  '/audio/lecciones/v/instruccion-seleccion-inicial-v.mp3'

export const vInitialSoundImages = [
  {
    id: 'vela',
    name: 'vela',
    image: '/images/lecciones/v/vela.png',
    audio: '/audio/lecciones/v/vela.mp3',
    startsWithV: true,
  },
  {
    id: 'vaso',
    name: 'vaso',
    image: '/images/lecciones/v/vaso.png',
    audio: '/audio/lecciones/v/vaso.mp3',
    startsWithV: true,
  },
  {
    id: 'volcan',
    name: 'volcán',
    image: '/images/lecciones/v/volcan.png',
    audio: '/audio/lecciones/v/volcan.mp3',
    startsWithV: true,
  },
  {
    id: 'sandalia',
    name: 'sandalia',
    image: '/images/lecciones/v/sandalia.png',
    audio: '/audio/lecciones/v/sandalia.mp3',
    startsWithV: false,
  },
]

// Fase 3 (página 148, último bloque): igual que el libro, se pronuncia
// la palabra sonido por sonido y se marca el cuadrito (no la sílaba)
// donde está el sonido /v/. totalSounds = cantidad de cuadritos;
// targetIndex = cuál de esos cuadritos (empezando en 0) es el correcto.
export const vPositionInstructionAudio =
  '/audio/lecciones/v/instruccion-posicion-v.mp3'

// "ave" es el ejemplo ya resuelto del libro (el puntito en el cuadro 2).
export const vPositionExample = {
  word: 'ave',
  image: '/images/lecciones/v/ave.png',
  totalSounds: 3,
  targetIndex: 1,
}

export const vPositionWords = [
  {
    id: 'uva-pos',
    word: 'uva',
    image: '/images/lecciones/v/uva.png',
    audio: '/audio/lecciones/v/uva.mp3',
    totalSounds: 3,
    targetIndex: 1,
  },
  {
    id: 'pavo-pos',
    word: 'pavo',
    image: '/images/lecciones/v/pavo.png',
    audio: '/audio/lecciones/v/pavo.mp3',
    totalSounds: 4,
    targetIndex: 2,
  },
  {
    id: 'nueve-pos',
    word: 'nueve',
    image: '/images/lecciones/v/nueve.png',
    audio: '/audio/lecciones/v/nueve.mp3',
    totalSounds: 5,
    targetIndex: 3,
  },
  {
    id: 'avion-pos',
    word: 'avión',
    image: '/images/lecciones/v/avion.png',
    audio: '/audio/lecciones/v/avion.mp3',
    totalSounds: 5,
    targetIndex: 1,
  },
  {
    id: 'verde-pos',
    word: 'verde',
    color: '#2E7D32',
    audio: '/audio/lecciones/v/verde.mp3',
    totalSounds: 5,
    targetIndex: 0,
  },
  {
    id: 'oveja-pos',
    word: 'oveja',
    image: '/images/lecciones/v/oveja.png',
    audio: '/audio/lecciones/v/oveja.mp3',
    totalSounds: 5,
    targetIndex: 1,
  },
  {
    id: 'clavo-pos',
    word: 'clavo',
    image: '/images/lecciones/v/clavo.png',
    audio: '/audio/lecciones/v/clavo.mp3',
    totalSounds: 5,
    targetIndex: 3,
  },
]

// ============================================================
// ACTIVIDAD 2 — SÍLABAS va, ve, vi, vo, vu (página 149)

export const vLetterPresentation = {
  instructionAudio: '/audio/lecciones/v/instruccion-letra-v.mp3',
  soundAudio: '/audio/lecciones/v/sonido-v.mp3',
  word: {
    name: 'vaca',
    instructionAudio: '/audio/lecciones/v/instruccion-palabra-vaca.mp3',
    image: '/images/lecciones/v/vaca.png',
    audio: '/audio/lecciones/v/vaca.mp3',
  },
  combinations: [
    { syllable: 'va', audio: '/audio/lecciones/v/silaba-va.mp3' },
    { syllable: 've', audio: '/audio/lecciones/v/silaba-ve.mp3' },
    { syllable: 'vi', audio: '/audio/lecciones/v/silaba-vi.mp3' },
    { syllable: 'vo', audio: '/audio/lecciones/v/silaba-vo.mp3' },
    { syllable: 'vu', audio: '/audio/lecciones/v/silaba-vu.mp3' },
  ],
}

export const vSyllableInstructionAudio =
  '/audio/lecciones/v/instruccion-silabas-v.mp3'

// Página 149: voz, venado, violín y vuela, cada uno con dos opciones de
// sílaba para elegir (la correcta y una parecida).
export const vSyllableImageExercises = [
  {
    id: 'voz',
    word: 'voz',
    syllable: 'vo',
    image: '/images/lecciones/v/voz.png',
    audio: '/audio/lecciones/v/voz.mp3',
    options: ['vo', 'va'],
  },
  {
    id: 'venado',
    word: 'venado',
    syllable: 've',
    image: '/images/lecciones/v/venado.png',
    audio: '/audio/lecciones/v/venado.mp3',
    options: ['vi', 've'],
  },
  {
    id: 'violin',
    word: 'violín',
    syllable: 'vi',
    image: '/images/lecciones/v/violin.png',
    audio: '/audio/lecciones/v/violin.mp3',
    options: ['vi', 'vu'],
  },
  {
    id: 'vuela',
    word: 'vuela',
    syllable: 'vu',
    image: '/images/lecciones/v/vuela.png',
    audio: '/audio/lecciones/v/vuela.mp3',
    options: ['vo', 'vu'],
  },
]

// Página 149, segundo bloque: leer la palabra y tocar la sílaba con la
// que empieza (vela es el ejemplo del libro, ya resuelto).
export const vWordSyllableInstructionAudio =
  '/audio/lecciones/v/instruccion-silaba-en-palabra-v.mp3'

export const vWordSyllableExample = { word: 'vela', answer: 've' }

export const vWordSyllableExercises = [
  { id: 'vocal', word: 'vocal', answer: 'vo' },
  { id: 'vacuna', word: 'vacuna', answer: 'va' },
  { id: 'vida', word: 'vida', answer: 'vi' },
  { id: 'vuelto', word: 'vuelto', answer: 'vu' },
  { id: 'vena', word: 'vena', answer: 've' },
]

// ============================================================
// ACTIVIDAD 3 — COMPLETAR (página 151)

// Fase 1: elegir la sílaba que falta para completar la palabra.
export const vCompletionInstructionAudio =
  '/audio/lecciones/v/instruccion-completar-palabras-v.mp3'

export const vCompletionExercises = [
  {
    id: 'vena',
    image: '/images/lecciones/v/vena.png',
    imageAlt: 'Una mano mostrando sus venas',
    word: 'vena',
    answer: 've',
    options: ['va', 've'],
    before: '',
    after: 'na',
    audio: '/audio/lecciones/v/vena.mp3',
  },
  {
    id: 'uva',
    image: '/images/lecciones/v/uva.png',
    imageAlt: 'Un racimo de uvas',
    word: 'uva',
    answer: 'va',
    options: ['va', 'vo'],
    before: 'u',
    after: '',
    audio: '/audio/lecciones/v/uva.mp3',
  },
  {
    id: 'vino',
    image: '/images/lecciones/v/vino.png',
    imageAlt: 'Una botella y copas de vino',
    word: 'vino',
    answer: 'vi',
    options: ['vi', 'vu'],
    before: '',
    after: 'no',
    audio: '/audio/lecciones/v/vino.mp3',
  },
  {
    id: 'vaca-completar',
    image: '/images/lecciones/v/vaca.png',
    imageAlt: 'Una vaca',
    word: 'vaca',
    answer: 'va',
    options: ['va', 've'],
    before: '',
    after: 'ca',
    audio: '/audio/lecciones/v/vaca.mp3',
  },
  {
    id: 'pavo',
    image: '/images/lecciones/v/pavo.png',
    imageAlt: 'Un pavo real',
    word: 'pavo',
    answer: 'vo',
    options: ['vo', 'vi'],
    before: 'pa',
    after: '',
    audio: '/audio/lecciones/v/pavo.mp3',
  },
  {
    id: 'vaso-completar',
    image: '/images/lecciones/v/vaso.png',
    imageAlt: 'Un vaso de vidrio',
    word: 'vaso',
    answer: 'va',
    options: ['va', 'vu'],
    before: '',
    after: 'so',
    audio: '/audio/lecciones/v/vaso.mp3',
  },
]

// Fase 2 (página 151, segundo bloque): elegir la palabra correcta para
// nombrar cada dibujo, entre dos opciones parecidas.
export const vChoiceInstructionAudio =
  '/audio/lecciones/v/instruccion-elegir-palabra-v.mp3'

export const vChoiceExercises = [
  {
    id: 'veinte',
    image: '/images/lecciones/v/veinte.png',
    imageAlt: 'El número 20',
    answer: 'veinte',
    options: ['veinte', 'vientre'],
    audio: '/audio/lecciones/v/veinte.mp3',
  },
  {
    id: 'veneno',
    image: '/images/lecciones/v/veneno.png',
    imageAlt: 'Un frasco de veneno',
    answer: 'veneno',
    options: ['veneno', 'velero'],
    audio: '/audio/lecciones/v/veneno.mp3',
  },
  {
    id: 'vara',
    image: '/images/lecciones/v/vara.png',
    imageAlt: 'Una vara de madera',
    answer: 'vara',
    options: ['cara', 'vara'],
    audio: '/audio/lecciones/v/vara.mp3',
  },
  {
    id: 'venda',
    image: '/images/lecciones/v/venda.png',
    imageAlt: 'Un pie vendado',
    answer: 'venda',
    options: ['venda', 'prenda'],
    audio: '/audio/lecciones/v/venda.mp3',
  },
  {
    id: 'vuelo',
    image: '/images/lecciones/v/vuelo.png',
    imageAlt: 'Un colibrí volando',
    answer: 'vuelo',
    options: ['vuelo', 'suelo'],
    audio: '/audio/lecciones/v/vuelo.mp3',
  },
  {
    id: 'vela-choice',
    image: '/images/lecciones/v/vela.png',
    imageAlt: 'Una vela encendida',
    answer: 'vela',
    options: ['tela', 'vela'],
    audio: '/audio/lecciones/v/vela.mp3',
  },
]

// ============================================================
// ACTIVIDAD FINAL (página 152)

// Fase 1: repasar palabras con v
export const vFinalWordsInstructionAudio =
  '/audio/lecciones/v/instruccion-palabras-finales-v.mp3'

export const vFinalWords = [
  {
    word: 'Valerio',
    image: '/images/lecciones/v/valerio.png',
    audio: '/audio/lecciones/v/valerio.mp3',
    isProperNoun: true,
  },
  {
    word: 'viento',
    image: '/images/lecciones/v/viento.png',
    audio: '/audio/lecciones/v/viento.mp3',
  },
  {
    word: 'avión',
    image: '/images/lecciones/v/avion.png',
    audio: '/audio/lecciones/v/avion.mp3',
  },
  {
    word: 'vaso',
    image: '/images/lecciones/v/vaso.png',
    audio: '/audio/lecciones/v/vaso.mp3',
  },
  {
    word: 'Eva',
    image: '/images/lecciones/v/eva.png',
    audio: '/audio/lecciones/v/eva.mp3',
    isProperNoun: true,
  },
  {
    word: 'venado',
    image: '/images/lecciones/v/venado.png',
    audio: '/audio/lecciones/v/venado.mp3',
  },
]

// Fase 2 (página 152): leer la oración y elegir el dibujo que corresponde,
// entre las dos ilustraciones del libro.
export const vSentenceInstructionAudio =
  '/audio/lecciones/v/instruccion-oraciones-v.mp3'

const vSentenceImages = [
  {
    name: 'vanesa-verduras',
    label: 'Vanesa vendiendo verduras',
    image: '/images/lecciones/v/vanesa-vende-verduras.png',
    audio: '/audio/lecciones/v/vanesa-vende-verduras.mp3',
  },
  {
    name: 'nave-luna',
    label: 'Una nave volando hacia la Luna',
    image: '/images/lecciones/v/nave-vuela-luna.png',
    audio: '/audio/lecciones/v/nave-vuela-luna.mp3',
  },
]

export const vSentenceExercises = [
  {
    id: 'vanesa-verduras',
    sentence: 'Vanesa vende verduras.',
    answer: 'vanesa-verduras',
    sentenceAudio: '/audio/lecciones/v/oracion-vanesa-vende.mp3',
    options: vSentenceImages,
  },
  {
    id: 'nave-luna',
    sentence: 'La nave vuela a la Luna.',
    answer: 'nave-luna',
    sentenceAudio: '/audio/lecciones/v/oracion-la-nave.mp3',
    options: vSentenceImages,
  },
]

export const vFinalCongratulationsAudio = '/audio/lecciones/v/felicitacion-final.mp3'
