// Unidad 2: Sílabas inversas (l, s, n). Páginas 79-84 del libro.
// Páginas 79/81/83: identificar la sílaba inversa (vocal + consonante).
// Páginas 80/82/84: actividad de cierre distinta para cada letra.

// ============================================================
// L — al, el, il, ol, ul (páginas 79-80)

export const siLCombinations = [
  { syllable: 'al', audio: '/audio/silabas-inversas/l/silaba-al.mp3' },
  { syllable: 'el', audio: '/audio/silabas-inversas/l/silaba-el.mp3' },
  { syllable: 'il', audio: '/audio/silabas-inversas/l/silaba-il.mp3' },
  { syllable: 'ol', audio: '/audio/silabas-inversas/l/silaba-ol.mp3' },
  { syllable: 'ul', audio: '/audio/silabas-inversas/l/silaba-ul.mp3' },
]

export const siLExampleWords = ['alma', 'Elsa', 'altar', 'almuerzo', 'olvido']

export const siLInstructionAudio = '/audio/silabas-inversas/l/instruccion-letra.mp3'

// Marcar las figuras que tienen sonido al/el/il/ol/ul.
export const siLSoundImages = [
  {
    id: 'alcohol',
    word: 'alcohol',
    image: '/images/lecciones/silabasInversas/l/alcohol.png',
    audio: '/audio/silabas-inversas/l/alcohol.mp3',
    hasSound: true,
  },
  {
    id: 'fila',
    word: 'fila',
    image: '/images/lecciones/silabasInversas/l/fila.png',
    audio: '/audio/silabas-inversas/l/fila.mp3',
    hasSound: false,
  },
  {
    id: 'overol',
    word: 'overol',
    image: '/images/lecciones/silabasInversas/l/overol.png',
    audio: '/audio/silabas-inversas/l/overol.mp3',
    hasSound: true,
  },
  {
    id: 'almohada',
    word: 'almohada',
    image: '/images/lecciones/silabasInversas/l/almohada.png',
    audio: '/audio/silabas-inversas/l/almohada.mp3',
    hasSound: true,
  },
]

export const siLSoundInstructionAudio =
  '/audio/silabas-inversas/l/instruccion-sonido.mp3'

export const siLReading = {
  paragraphs: [
    'Al final de la semana vino el cartero con la carta que esperaba Elmo, el sobrino de mi tía Ilse.',
    'Elmo abrió rápido la carta. La leyó y, de último, brincó por la emoción. Nos dijo:',
    '—¡Al fin ganamos! ¡Olga y yo ganamos el premio! ¡El premio al mejor dibujo en pareja!',
    'Mi tía Ilse lo felicitó.',
  ],
  image: '/images/lecciones/silabasInversas/l/elmo-carta.png',
  imageAlt: 'Una tía y su sobrino Elmo sostienen una carta muy contentos',
  audio: '/audio/silabas-inversas/l/lectura.mp3',
}

// Palabras del texto para marcar cuáles tienen sonido al/el/il/ol/ul.
export const siLReadingWords = [
  { word: 'Al', hasSound: true },
  { word: 'semana', hasSound: false },
  { word: 'cartero', hasSound: false },
  { word: 'Elmo', hasSound: true },
  { word: 'tía', hasSound: false },
  { word: 'Ilse', hasSound: true },
  { word: 'carta', hasSound: false },
  { word: 'emoción', hasSound: false },
  { word: 'Olga', hasSound: true },
  { word: 'premio', hasSound: false },
]

export const siLTraceWords = [
  {
    id: 'elmo',
    word: 'Elmo',
    image: '/images/lecciones/silabasInversas/l/elmo.png',
    audio: '/audio/silabas-inversas/l/elmo.mp3',
    isProperNoun: true,
  },
  {
    id: 'aldea',
    word: 'aldea',
    image: '/images/lecciones/silabasInversas/l/aldea.png',
    audio: '/audio/silabas-inversas/l/aldea.mp3',
  },
  {
    id: 'alto',
    word: 'alto',
    image: '/images/lecciones/silabasInversas/l/alto.png',
    audio: '/audio/silabas-inversas/l/alto.mp3',
  },
]

export const siLTraceInstructionAudio =
  '/audio/silabas-inversas/l/instruccion-trazar.mp3'

// Página 80: completar oraciones eligiendo entre Al, El, al, el.
export const siLWordOptions = ['Al', 'El', 'al', 'el']

export const siLSentences = [
  {
    id: 'toro-pasto',
    template: '___ toro come ___ pasto.',
    blanks: ['El', 'el'],
    audio: '/audio/silabas-inversas/l/oracion-toro-pasto.mp3',
    image: '/images/lecciones/silabasInversas/l/toro.png',
  },
  {
    id: 'comal-piso',
    template: '___ comal está en ___ piso.',
    blanks: ['El', 'el'],
    audio: '/audio/silabas-inversas/l/oracion-comal-piso.mp3',
    image: '/images/lecciones/silabasInversas/l/comal.png',
  },
  {
    id: 'loro-mar',
    template: 'Tere y su loro salen ___ mar.',
    blanks: ['al'],
    audio: '/audio/silabas-inversas/l/oracion-loro-mar.mp3',
    image: '/images/lecciones/silabasInversas/l/tere-loro.png',
  },
]

export const siLSentenceInstructionAudio =
  '/audio/silabas-inversas/l/instruccion-oraciones.mp3'

// ============================================================
// S — as, es, is, os, us (páginas 81-82)

export const siSCombinations = [
  { syllable: 'as', audio: '/audio/silabas-inversas/s/silaba-as.mp3' },
  { syllable: 'es', audio: '/audio/silabas-inversas/s/silaba-es.mp3' },
  { syllable: 'is', audio: '/audio/silabas-inversas/s/silaba-is.mp3' },
  { syllable: 'os', audio: '/audio/silabas-inversas/s/silaba-os.mp3' },
  { syllable: 'us', audio: '/audio/silabas-inversas/s/silaba-us.mp3' },
]

export const siSExampleWords = ['este', 'usted', 'oscuro', 'esquina', 'asma', 'espalda']

export const siSInstructionAudio = '/audio/silabas-inversas/s/instruccion-letra.mp3'

export const siSSoundImages = [
  {
    id: 'espejo',
    word: 'espejo',
    image: '/images/lecciones/silabasInversas/s/espejo.png',
    audio: '/audio/silabas-inversas/s/espejo.mp3',
    hasSound: true,
  },
  {
    id: 'asiento',
    word: 'asiento',
    image: '/images/lecciones/silabasInversas/s/asiento.png',
    audio: '/audio/silabas-inversas/s/asiento.mp3',
    hasSound: true,
  },
  {
    id: 'escuela',
    word: 'escuela',
    image: '/images/lecciones/silabasInversas/s/escuela.png',
    audio: '/audio/silabas-inversas/s/escuela.mp3',
    hasSound: true,
  },
  {
    id: 'isla',
    word: 'isla',
    image: '/images/lecciones/silabasInversas/s/isla.png',
    audio: '/audio/silabas-inversas/s/isla.mp3',
    hasSound: true,
  },
]

export const siSSoundInstructionAudio =
  '/audio/silabas-inversas/s/instruccion-sonido.mp3'

export const siSReading = {
  paragraphs: [
    'Estela es una niña que vive en una isla. Ella tiene seis años. Es muy especial.',
    'Estela espera un barco todos los días. Le gusta viajar por el mar hasta que oscurece.',
    '¿Ustedes han viajado en barco hasta que oscurece? Estela sí.',
  ],
  image: '/images/lecciones/silabasInversas/s/estela-isla.png',
  imageAlt: 'Estela sentada junto al mar con palmeras en una isla',
  audio: '/audio/silabas-inversas/s/lectura.mp3',
}

export const siSReadingWords = [
  { word: 'Estela', hasSound: true },
  { word: 'niña', hasSound: false },
  { word: 'isla', hasSound: true },
  { word: 'seis', hasSound: true },
  { word: 'años', hasSound: false },
  { word: 'especial', hasSound: true },
  { word: 'barco', hasSound: false },
  { word: 'días', hasSound: false },
  { word: 'ustedes', hasSound: true },
  { word: 'mar', hasSound: false },
]

export const siSTraceWords = [
  {
    id: 'estela',
    word: 'Estela',
    image: '/images/lecciones/silabasInversas/s/estela.png',
    audio: '/audio/silabas-inversas/s/estela.mp3',
    isProperNoun: true,
  },
  {
    id: 'espina',
    word: 'espina',
    image: '/images/lecciones/silabasInversas/s/espina.png',
    audio: '/audio/silabas-inversas/s/espina.mp3',
  },
  {
    id: 'asno',
    word: 'asno',
    image: '/images/lecciones/silabasInversas/s/asno.png',
    audio: '/audio/silabas-inversas/s/asno.mp3',
  },
]

export const siSTraceInstructionAudio =
  '/audio/silabas-inversas/s/instruccion-trazar.mp3'

// Página 82: leer la oración y elegir cuál de las 2 imágenes corresponde.
export const siSSentenceMatch = [
  {
    id: 'rosa',
    sentence: 'La rosa es rosada.',
    audio: '/audio/silabas-inversas/s/oracion-rosa.mp3',
    options: [
      { id: 'rosa-roja', image: '/images/lecciones/silabasInversas/s/rosa-roja.png', isCorrect: false },
      { id: 'rosa-rosada', image: '/images/lecciones/silabasInversas/s/rosa-rosada.png', isCorrect: true },
    ],
  },
  {
    id: 'cama-ester',
    sentence: 'La cama es de Ester.',
    audio: '/audio/silabas-inversas/s/oracion-cama-ester.mp3',
    options: [
      { id: 'nina-cama', image: '/images/lecciones/silabasInversas/s/nina-cama.png', isCorrect: true },
      { id: 'nino-banco', image: '/images/lecciones/silabasInversas/s/nino-banco.png', isCorrect: false },
    ],
  },
  {
    id: 'comal-roto',
    sentence: 'El comal está roto.',
    audio: '/audio/silabas-inversas/s/oracion-comal-roto.mp3',
    options: [
      { id: 'comal-entero', image: '/images/lecciones/silabasInversas/s/comal-entero.png', isCorrect: false },
      { id: 'comal-roto', image: '/images/lecciones/silabasInversas/s/comal-roto.png', isCorrect: true },
    ],
  },
  {
    id: 'isla-desierta',
    sentence: 'La isla está desierta.',
    audio: '/audio/silabas-inversas/s/oracion-isla-desierta.mp3',
    options: [
      { id: 'isla', image: '/images/lecciones/silabasInversas/s/isla.png', isCorrect: true },
      { id: 'asno', image: '/images/lecciones/silabasInversas/s/asno.png', isCorrect: false },
    ],
  },
]

export const siSSentenceInstructionAudio =
  '/audio/silabas-inversas/s/instruccion-oraciones.mp3'

// ============================================================
// N — an, en, in, on, un (páginas 83-84)

export const siNCombinations = [
  { syllable: 'an', audio: '/audio/silabas-inversas/n/silaba-an.mp3' },
  { syllable: 'en', audio: '/audio/silabas-inversas/n/silaba-en.mp3' },
  { syllable: 'in', audio: '/audio/silabas-inversas/n/silaba-in.mp3' },
  { syllable: 'on', audio: '/audio/silabas-inversas/n/silaba-on.mp3' },
  { syllable: 'un', audio: '/audio/silabas-inversas/n/silaba-un.mp3' },
]

export const siNExampleWords = ['encontrar', 'inventar', 'andar', 'antes', 'ancho', 'onzas', 'onda']

export const siNInstructionAudio = '/audio/silabas-inversas/n/instruccion-letra.mp3'

export const siNSoundImages = [
  {
    id: 'ancla',
    word: 'ancla',
    image: '/images/lecciones/silabasInversas/n/ancla.png',
    audio: '/audio/silabas-inversas/n/ancla.mp3',
    hasSound: true,
  },
  {
    id: 'enfermera',
    word: 'enfermera',
    image: '/images/lecciones/silabasInversas/n/enfermera.png',
    audio: '/audio/silabas-inversas/n/enfermera.mp3',
    hasSound: true,
  },
  {
    id: 'once',
    word: 'once',
    image: '/images/lecciones/silabasInversas/n/once.png',
    audio: '/audio/silabas-inversas/n/once.mp3',
    hasSound: true,
  },
  {
    id: 'nido',
    word: 'nido',
    image: '/images/lecciones/silabasInversas/n/nido.png',
    audio: '/audio/silabas-inversas/n/nido.mp3',
    hasSound: false,
  },
]

export const siNSoundInstructionAudio =
  '/audio/silabas-inversas/n/instruccion-sonido.mp3'

export const siNReading = {
  paragraphs: [
    'Antonio es un niño indígena que vive en La Antigua.',
    'Al salir de la escuela, antes de ir a su casa, entra a la casa de su tío Enrique.',
    'Un día, al entrar, encontró un insecto cerca de la entrada. Al acercarse, Antonio vio once insectos más.',
  ],
  image: '/images/lecciones/silabasInversas/n/antonio-insecto.png',
  imageAlt: 'Antonio sostiene un insecto que encontró cerca de la entrada',
  audio: '/audio/silabas-inversas/n/lectura.mp3',
}

export const siNReadingWords = [
  { word: 'Antonio', hasSound: true },
  { word: 'niño', hasSound: false },
  { word: 'Antigua', hasSound: true },
  { word: 'escuela', hasSound: false },
  { word: 'entra', hasSound: true },
  { word: 'tío', hasSound: false },
  { word: 'Enrique', hasSound: true },
  { word: 'encontró', hasSound: true },
  { word: 'insecto', hasSound: true },
  { word: 'once', hasSound: true },
]

export const siNTraceWords = [
  {
    id: 'antonio',
    word: 'Antonio',
    image: '/images/lecciones/silabasInversas/n/antonio.png',
    audio: '/audio/silabas-inversas/n/antonio.mp3',
    isProperNoun: true,
  },
  {
    id: 'insecto',
    word: 'insecto',
    image: '/images/lecciones/silabasInversas/n/insecto.png',
    audio: '/audio/silabas-inversas/n/insecto.mp3',
  },
  {
    id: 'antena',
    word: 'antena',
    image: '/images/lecciones/silabasInversas/n/antena.png',
    audio: '/audio/silabas-inversas/n/antena.mp3',
  },
]

export const siNTraceInstructionAudio =
  '/audio/silabas-inversas/n/instruccion-trazar.mp3'

// Página 84: elegir la palabra que indica el dibujo para completar la oración.
export const siNSentenceCompletion = [
  {
    id: 'palo-mesa',
    template: 'El palo está en la ___.',
    audio: '/audio/silabas-inversas/n/oracion-palo-mesa.mp3',
    answer: 'mesa',
    options: [
      { name: 'mesa', image: '/images/lecciones/silabasInversas/n/mesa.png' },
      { name: 'antena', image: '/images/lecciones/silabasInversas/n/antena.png' },
      { name: 'nido', image: '/images/lecciones/silabasInversas/n/nido.png' },
    ],
  },
  {
    id: 'radio-antena',
    template: 'El radio tiene una ___.',
    audio: '/audio/silabas-inversas/n/oracion-radio-antena.mp3',
    answer: 'antena',
    options: [
      { name: 'antena', image: '/images/lecciones/silabasInversas/n/antena.png' },
      { name: 'mesa', image: '/images/lecciones/silabasInversas/n/mesa.png' },
      { name: 'insecto', image: '/images/lecciones/silabasInversas/n/insecto.png' },
    ],
  },
]

// En el libro estos dos son de respuesta libre ("Escribe una oración
// relacionada con cada dibujo"); aquí se nombra el dibujo eligiendo
// la palabra correcta, ya que todavía no escriben.
export const siNNamePicture = [
  {
    id: 'ensalada',
    image: '/images/lecciones/silabasInversas/n/ensalada.png',
    audio: '/audio/silabas-inversas/n/ensalada.mp3',
    answer: 'ensalada',
    options: ['ensalada', 'antena', 'once'],
  },
  {
    id: 'almuerzo',
    image: '/images/lecciones/silabasInversas/n/nina-comiendo.png',
    audio: '/audio/silabas-inversas/n/almuerzo.mp3',
    answer: 'almuerzo',
    options: ['almuerzo', 'insecto', 'ancla'],
  },
]

export const siNSentenceInstructionAudio =
  '/audio/silabas-inversas/n/instruccion-oraciones.mp3'
