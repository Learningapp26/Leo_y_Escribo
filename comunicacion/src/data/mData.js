// Para la parte del cuento
export const mReading = {
  title: '¡Te amo, mamá!',
  paragraphs: [
    'Estaba una mamá bajo la sombra de una palmera, cuando su hijo se le acercó y le dijo:',
    '-Mamá, ¿sabes algo?',
    '-Dime. -Respondió ella.',
    '-Tengo algo escondido entre mis',
    'brazos.',
    '-¿Qué es lo que tienes? -Preguntó.',
    '-Es algo para ti. ¿Quieres que te lo dé?',
    '-¡Claro que sí! -Contestó la mamá emocionada.',
    '-Bueno, primero cierra los ojos.',
    'La mamá cerró sus ojos y de repente sintió el calor de un tierno',
    'abrazo.',
    '-¡Ya te lo di!... -¿Te gustó?... -Era un abrazo con todo mi amor.',
    '-Gracias, yo también te amo.',
  ],
  image: '/images/lecciones/m/te-amo-mama.png',
  imageAlt: 'Una madre abrazando a su hijo',
  instructionAudio: '/audio/lecciones/m/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/m/te-amo-mama.mp3',
}

// Preguntas
export const MComprehensionQuestions = [
  '¿De qué trata la historia?',
  '¿Qué tenía escondido el niño? ¿Cómo es un tierno abrazo?',
  '¿Qué te gustaría regalarle a tu mamá? ¿Por qué?',
  '¿Qué cosas te emocionan?',
]


//ACTIVIDAD DE RECONOCER SONIDOS
// Para audio e imagen de la actividad de reconocer sonidos

// Fase 1: solo escuchar la palabra mamá y el sonido /m/
export const mSoundIntro = {
  mainWord: {
    name: 'mamá',
    image: '/images/lecciones/m/mama.png',
    audio: '/audio/lecciones/m/mama.mp3',
  },
  soundAudio: '/audio/lecciones/m/sonido-m.mp3',
}

// Fase 2 y 3: seleccionar / emparejar imágenes que empiecen con el sonido /m/
export const mImagePool = [
  {
    id: 'mama',
    name: 'mamá',
    image: '/images/lecciones/m/mama.png',
    audio: '/audio/lecciones/m/mama.mp3',
    startsWithM: true,
  },
  {
    id: 'mano',
    name: 'mano',
    image: '/images/lecciones/m/mano.png',
    audio: '/audio/lecciones/m/mano.mp3',
    startsWithM: true,
  },
  {
    id: 'mariposa',
    name: 'mariposa',
    image: '/images/lecciones/m/mariposa.png',
    audio: '/audio/lecciones/m/mariposa.mp3',
    startsWithM: true,
  },
  {
    id: 'miel',
    name: 'miel',
    image: '/images/lecciones/m/miel.png',
    audio: '/audio/lecciones/m/miel.mp3',
    startsWithM: true,
  },
  {
    id: 'gallina',
    name: 'gallina',
    image: '/images/lecciones/m/gallina.png',
    audio: '/audio/lecciones/m/gallina.mp3',
    startsWithM: false,
  },
]

// Fase 4: tocar las figuras que contengan el sonido /m/ en cualquier parte
// es selección múltiple contra "containsM")
export const mSoundMatching = {
  instructionAudio: '/audio/lecciones/m/instruccion-parejas.mp3',
  items: [
    {
      id: 'limon',
      name: 'limón',
      image: '/images/lecciones/m/limon.png',
      audio: '/audio/lecciones/m/limon.mp3',
      containsM: true,
    },
    {
      id: 'bolsa',
      name: 'bolsa',
      image: '/images/lecciones/m/bolsa.png',
      audio: '/audio/lecciones/m/bolsa.mp3',
      containsM: false,
    },
    {
      id: 'mosca',
      name: 'mosca',
      image: '/images/lecciones/m/mosca.png',
      audio: '/audio/lecciones/m/mosca.mp3',
      containsM: true,
    },
    {
      id: 'rama',
      name: 'rama',
      image: '/images/lecciones/m/rama.png',
      audio: '/audio/lecciones/m/rama.mp3',
      containsM: true,
    },
    {
      id: 'mango',
      name: 'mango',
      image: '/images/lecciones/m/mango.png',
      audio: '/audio/lecciones/m/mango.mp3',
      containsM: true,
    },
    {
      id: 'gato',
      name: 'gato',
      image: '/images/lecciones/m/gato.png',
      audio: '/audio/lecciones/m/gato.mp3',
      containsM: false,
    },
    {
      id: 'pera',
      name: 'pera',
      image: '/images/lecciones/m/pera.png',
      audio: '/audio/lecciones/m/pera.mp3',
      containsM: false,
    },
    {
      id: 'pluma',
      name: 'pluma',
      image: '/images/lecciones/m/pluma.png',
      audio: '/audio/lecciones/m/pluma.mp3',
      containsM: true,
    },
    {
      id: 'cama',
      name: 'cama',
      image: '/images/lecciones/m/cama.png',
      audio: '/audio/lecciones/m/cama.mp3',
      containsM: true,
    },
  ],
}



// ACTIVIDAD DE SÍLABAS
// Conocer la letra M y sus combinaciones.
export const mLetterPresentation = {
  soundAudio: '/audio/lecciones/m/sonido-m.mp3',
  combinations: [
    { syllable: 'ma', audio: '/audio/lecciones/m/silaba-ma.mp3' },
    { syllable: 'me', audio: '/audio/lecciones/m/silaba-me.mp3' },
    { syllable: 'mi', audio: '/audio/lecciones/m/silaba-mi.mp3' },
    { syllable: 'mo', audio: '/audio/lecciones/m/silaba-mo.mp3' },
    { syllable: 'mu', audio: '/audio/lecciones/m/silaba-mu.mp3' },
  ],
}

// Buscar sílabas que contengan la letra M
export const mSyllableSearch = {
  instructionAudio: '/audio/lecciones/m/instruccion-buscar-silabas.mp3',
  targetSyllables: ['ma', 'me', 'mi', 'mo', 'mu'],
  options: [
    { syllable: 'la', audio: '/audio/lecciones/m/silaba-la.mp3' },
    { syllable: 'ma', audio: '/audio/lecciones/m/silaba-ma.mp3' },
    { syllable: 'me', audio: '/audio/lecciones/m/silaba-me.mp3' },
    { syllable: 'sa', audio: '/audio/lecciones/m/silaba-sa.mp3' },
    { syllable: 'mi', audio: '/audio/lecciones/m/silaba-mi.mp3' },
    { syllable: 'ta', audio: '/audio/lecciones/m/silaba-ta.mp3' },
    { syllable: 'mo', audio: '/audio/lecciones/m/silaba-mo.mp3' },
    { syllable: 'da', audio: '/audio/lecciones/m/silaba-da.mp3' },
    { syllable: 'lu', audio: '/audio/lecciones/m/silaba-lu.mp3' },
    { syllable: 'mu', audio: '/audio/lecciones/m/silaba-mu.mp3' },
  ],
}

// Asociar imagen, palabra y sílaba con M.
export const mSyllableAssociation = [
  {
    id: 'mama',
    word: 'mamá',
    highlighted: 'ma',
    rest: 'má',
    image: '/images/lecciones/m/mama.png',
    syllableAudio: '/audio/lecciones/m/silaba-ma.mp3',
    wordAudio: '/audio/lecciones/m/mama.mp3',
  },
  {
    id: 'miel',
    word: 'miel',
    highlighted: 'mi',
    rest: 'el',
    image: '/images/lecciones/m/miel.png',
    syllableAudio: '/audio/lecciones/m/silaba-mi.mp3',
    wordAudio: '/audio/lecciones/m/miel.mp3',
  },
  {
    id: 'mono',
    word: 'mono',
    highlighted: 'mo',
    rest: 'no',
    image: '/images/lecciones/m/mono.png',
    syllableAudio: '/audio/lecciones/m/silaba-mo.mp3',
    wordAudio: '/audio/lecciones/m/mono.mp3',
  },
]

// Actividad final: mostrar imagen por imagen y elegir la sílaba con la
// que empieza el nombre. Cada item tiene 2 opciones, una correcta.
export const mSyllableSelection = [
  {
    id: 'mono',
    name: 'moño',
    image: '/images/lecciones/m/moño.png',
    wordAudio: '/audio/lecciones/m/moño.mp3',
    options: [
      { syllable: 'mo', audio: '/audio/lecciones/m/silaba-mo.mp3', isCorrect: true },
      { syllable: 'mi', audio: '/audio/lecciones/m/silaba-mi.mp3', isCorrect: false },
    ],
  },
  {
    id: 'melon',
    name: 'melón',
    image: '/images/lecciones/m/melon.png',
    wordAudio: '/audio/lecciones/m/melón.mp3',
    options: [
      { syllable: 'mu', audio: '/audio/lecciones/m/silaba-mu.mp3', isCorrect: false },
      { syllable: 'me', audio: '/audio/lecciones/m/silaba-me.mp3', isCorrect: true },
    ],
  },
  {
    id: 'mano',
    name: 'mano',
    image: '/images/lecciones/m/mano.png',
    wordAudio: '/audio/lecciones/m/mano.mp3',
    options: [
      { syllable: 'ma', audio: '/audio/lecciones/m/silaba-ma.mp3', isCorrect: true },
      { syllable: 'mo', audio: '/audio/lecciones/m/silaba-mo.mp3', isCorrect: false },
    ],
  },
  {
    id: 'muneca',
    name: 'muñeca',
    image: '/images/lecciones/m/muñeca.png',
    wordAudio: '/audio/lecciones/m/muñeca.mp3',
    options: [
      { syllable: 'me', audio: '/audio/lecciones/m/silaba-me.mp3', isCorrect: false },
      { syllable: 'mu', audio: '/audio/lecciones/m/silaba-mu.mp3', isCorrect: true },
    ],
  },
]


// ACTIVIDAD DE COMPLETAR PALABRAS

export const mSyllableOptions = ['ma', 'me', 'mi', 'mo', 'mu']

// Fase 1: completar la palabra con la sílaba que falta (se muestra el patrón)
export const mWordCompletion = [
  {
    id: 'mesa',
    word: 'mesa',
    pattern: '__sa',
    image: '/images/lecciones/m/mesa.png',
    audio: '/audio/lecciones/m/mesa.mp3',
    answer: 'me',
  },
  {
    id: 'milpa',
    word: 'milpa',
    pattern: '__lpa',
    image: '/images/lecciones/m/milpa.png',
    audio: '/audio/lecciones/m/milpa.mp3',
    answer: 'mi',
  },
  {
    id: 'mono',
    word: 'mono',
    pattern: '__no',
    image: '/images/lecciones/m/mono.png',
    audio: '/audio/lecciones/m/mono.mp3',
    answer: 'mo',
  },
  {
    id: 'mula',
    word: 'mula',
    pattern: '__la',
    image: '/images/lecciones/m/mula.png',
    audio: '/audio/lecciones/m/mula.mp3',
    answer: 'mu',
  },
]

// Fase 2: solo imagen + audio. 
// Elegir la sílaba con sonido Mque está en la palabra
export const mWordSyllableSelection = [
  {
    id: 'mani',
    word: 'maní',
    image: '/images/lecciones/m/mani.png',
    audio: '/audio/lecciones/m/mani.mp3',
    answer: 'ma',
  },
  {
    id: 'mesa',
    word: 'mesa',
    image: '/images/lecciones/m/mesa.png',
    audio: '/audio/lecciones/m/mesa.mp3',
    answer: 'me',
  },
  {
    id: 'camisa',
    word: 'camisa',
    image: '/images/lecciones/m/camisa.png',
    audio: '/audio/lecciones/m/camisa.mp3',
    answer: 'mi',
  },
  {
    id: 'mama',
    word: 'mamá',
    image: '/images/lecciones/m/mama.png',
    audio: '/audio/lecciones/m/mama.mp3',
    answer: 'ma',
  },
  {
    id: 'motocicleta',
    word: 'motocicleta',
    image: '/images/lecciones/m/motocicleta.png',
    audio: '/audio/lecciones/m/motocicleta.mp3',
    answer: 'mo',
  },
  {
    id: 'mochila',
    word: 'mochila',
    image: '/images/lecciones/m/mochila.png',
    audio: '/audio/lecciones/m/mochila.mp3',
    answer: 'mo',
  },
]

// Fase 3: formar palabras tocando sílabas (pueden repetirse entre las 4
// opciones). 
// Se valida el texto formado contra "word", no un id fijo
export const mSyllableJoin = [
  {
    id: 'mimo',
    word: 'mimo',
    wordAudio: '/audio/lecciones/m/mimo.mp3',
    options: ['mi', 'mo', 'mo', 'mi'],
  },
  {
    id: 'mama',
    word: 'mama',
    wordAudio: '/audio/lecciones/m/mama.mp3',
    options: ['ma', 'ma', 'mu', 'a'],
  },
]