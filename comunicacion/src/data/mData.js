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

// ACTIVIDAD DE RECONOCER SONIDOS
// Para audio e imagen de la actividad de reconocer sonidos

// Fase 1: solo escuchar la palabra mamá y el sonido /m/
export const mSoundIntro = {
  instructionAudio: '/audio/lecciones/m/instruccion-sonido-m.mp3',
  mainWord: {
    name: 'mamá',
    image: '/images/lecciones/m/mama.png',
    audio: '/audio/lecciones/m/mama.mp3',
  },
  soundAudio: '/audio/lecciones/m/sonido-m.mp3',
}

// Audio de instrucción para la fase 2 (seleccionar las que empiezan con /m/)
export const mSelectionInstructionAudio =
  '/audio/lecciones/m/instruccion-seleccion-m.mp3'

// Audio de instrucción para la fase 3 (parejas que empiezan con /m/)
export const mPairsInstructionAudio =
  '/audio/lecciones/m/instruccion-parejas-inicio-m.mp3'

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
// (es selección múltiple contra "containsM")
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

// ============================================================
// ACTIVIDAD DE SÍLABAS

// Conocer la letra M y sus combinaciones.
export const mLetterPresentation = {
  instructionAudio: '/audio/lecciones/m/instruccion-letra-m.mp3',
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
 
// Audio de instrucción para la fase "asociar" (imagen + palabra + sílaba)
export const mAssociationInstructionAudio =
  '/audio/lecciones/m/instruccion-asociar-m.mp3'
 
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
 
// Audio de instrucción para la fase "seleccionar"
export const mSelectSyllableInstructionAudio =
  '/audio/lecciones/m/instruccion-seleccionar-silaba.mp3'
 
// Actividad final: mostrar imagen por imagen y elegir la sílaba con la
// que empieza el nombre. Cada item tiene 2 opciones, una correcta.
export const mSyllableSelection = [
  {
    id: 'mono',
    name: 'moño',
    image: '/images/lecciones/m/moño.png',
    wordAudio: '/audio/lecciones/m/moño.mp3',
    options: [
      {
        syllable: 'mo',
        audio: '/audio/lecciones/m/silaba-mo.mp3',
        isCorrect: true,
      },
      {
        syllable: 'mi',
        audio: '/audio/lecciones/m/silaba-mi.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'melon',
    name: 'melón',
    image: '/images/lecciones/m/melon.png',
    wordAudio: '/audio/lecciones/m/melón.mp3',
    options: [
      {
        syllable: 'mu',
        audio: '/audio/lecciones/m/silaba-mu.mp3',
        isCorrect: false,
      },
      {
        syllable: 'me',
        audio: '/audio/lecciones/m/silaba-me.mp3',
        isCorrect: true,
      },
    ],
  },
  {
    id: 'mano',
    name: 'mano',
    image: '/images/lecciones/m/mano.png',
    wordAudio: '/audio/lecciones/m/mano.mp3',
    options: [
      {
        syllable: 'ma',
        audio: '/audio/lecciones/m/silaba-ma.mp3',
        isCorrect: true,
      },
      {
        syllable: 'mo',
        audio: '/audio/lecciones/m/silaba-mo.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'muneca',
    name: 'muñeca',
    image: '/images/lecciones/m/muñeca.png',
    wordAudio: '/audio/lecciones/m/muñeca.mp3',
    options: [
      {
        syllable: 'me',
        audio: '/audio/lecciones/m/silaba-me.mp3',
        isCorrect: false,
      },
      {
        syllable: 'mu',
        audio: '/audio/lecciones/m/silaba-mu.mp3',
        isCorrect: true,
      },
    ],
  },
]
 
// ============================================================
// ACTIVIDAD DE COMPLETAR PALABRAS

export const mSyllableOptions = ['ma', 'me', 'mi', 'mo', 'mu']
 
// Audio de instrucción para la fase 1 (completar con patrón)
export const mCompletionInstructionAudio =
  '/audio/lecciones/m/instruccion-completar-m.mp3'
 
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
 
// Audio de instrucción para la fase 2 (imagen + audio, sin patrón)
export const mSoundSelectionInstructionAudio =
  '/audio/lecciones/m/instruccion-sonido-completar-m.mp3'
 
// Fase 2: solo imagen + audio.
// Elegir la sílaba con sonido M que está en la palabra
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
    image: '/images/lecciones/m/moto.png',
    audio: '/audio/lecciones/m/moto.mp3',
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
 
// Audio de instrucción para la fase 3 (formar palabras)
export const mJoinInstructionAudio =
  '/audio/lecciones/m/instruccion-formar-m.mp3'
 
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
 
// ============================================================
// ACTIVIDAD FINAL

// Audio de instrucción para la fase 1 (sílaba mayúscula/minúscula)
export const mCaseSelectionInstructionAudio =
  '/audio/lecciones/m/instruccion-mayuscula-minuscula-m.mp3'
 
// Seleccionar sílaba de mayúscula o minúscula
export const mSyllableCaseSelection = [
  {
    id: 'mama',
    name: 'mamá',
    image: '/images/lecciones/m/mama.png',
    wordAudio: '/audio/lecciones/m/mama.mp3',
    pattern: '__má',
    options: [
      {
        syllable: 'Ma',
        audio: '/audio/lecciones/m/silaba-ma.mp3',
        isCorrect: false,
      },
      {
        syllable: 'ma',
        audio: '/audio/lecciones/m/silaba-ma.mp3',
        isCorrect: true,
      },
    ],
  },
  {
    id: 'memo',
    name: 'Memo',
    image: '/images/lecciones/m/memo.png',
    wordAudio: '/audio/lecciones/m/memo.mp3',
    pattern: '__mo',
    options: [
      {
        syllable: 'Me',
        audio: '/audio/lecciones/m/silaba-me.mp3',
        isCorrect: true,
      },
      {
        syllable: 'me',
        audio: '/audio/lecciones/m/silaba-me.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'meme',
    name: 'Meme',
    image: '/images/lecciones/m/meme.png',
    wordAudio: '/audio/lecciones/m/meme.mp3',
    pattern: '__me',
    options: [
      {
        syllable: 'Me',
        audio: '/audio/lecciones/m/silaba-me.mp3',
        isCorrect: true,
      },
      {
        syllable: 'me',
        audio: '/audio/lecciones/m/silaba-me.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'mimi',
    name: 'Mimi',
    image: '/images/lecciones/m/mimi.png',
    wordAudio: '/audio/lecciones/m/mimi.mp3',
    pattern: '__mi',
    options: [
      {
        syllable: 'Mi',
        audio: '/audio/lecciones/m/silaba-mi.mp3',
        isCorrect: true,
      },
      {
        syllable: 'mi',
        audio: '/audio/lecciones/m/silaba-mi.mp3',
        isCorrect: false,
      },
    ],
  },
]
 
// Audio de instrucción para la fase 2 (contar palabras)
export const mWordCountingInstructionAudio =
  '/audio/lecciones/m/instruccion-contar-palabras-m.mp3'
 
// Contar palabras en cada oración.
// Cada figura de la oración también se cuenta como una palabra.
export const mWordCounting = [
  {
    id: 'mama-mimi',
    words: ['Mi', 'mamá', 'ama', 'a', 'Mimi.'],
    audio: '/audio/lecciones/m/contar-mama-mimi.mp3',
    answer: 5,
    options: [3, 4, 5],
  },
  {
    id: 'mimo-meme',
    words: ['Mimo', 'a', 'Meme.'],
    audio: '/audio/lecciones/m/contar-mimo-meme.mp3',
    answer: 3,
    options: [3, 4, 5],
  },
  {
    id: 'meme-mima',
    words: ['Meme', 'me', 'mima'],
    audio: '/audio/lecciones/m/contar-meme-mima.mp3',
    answer: 3,
    options: [3, 4, 5],
  },
  {
    id: 'memo-mama',
    words: ['Memo', 'ama', 'a', 'mi', 'mamá'],
    audio: '/audio/lecciones/m/contar-memo-mama.mp3',
    answer: 5,
    options: [3, 4, 5],
  },
]
 