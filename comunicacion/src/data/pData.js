
// Para la parte del cuento (página 37)
export const pReading = {
  title: 'Mi papá cuida a los pumas',
  paragraphs: [
    'Me llamo Pamela. Mi papá trabaja cuidando a los animales del bosque. Él protege a los animales que están en peligro, como los pumas.',
    '¿Sabían que en Guatemala hay pumas? Viven en los bosques de Petén, pero no hay muchos. Hay personas que los cazan para vender su piel y por eso mi papá los protege.',
    'Cada vez que puedo, acompaño a mi papá al bosque. Caminamos mucho en busca de trampas, él las quita para que los pumas no queden atrapados en ellas. A veces podemos ver algún puma desde lejos. ¡Eso me emociona!',
    '¡Me divierto mucho con mi papá!',
  ],
  image: '/images/lecciones/p/lectura-papa-puma.png',
  imageAlt: 'El papá de Pamela junto a ella observando un puma en el bosque',
  instructionAudio: '/audio/lecciones/p/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/p/mi-papa-cuida-a-los-pumas.mp3',
}

// Preguntas para conversar sobre el cuento (página 37, "Conversemos")
export const pComprehensionQuestions = [
  '¿Qué hace el papá de Pamela?',
  '¿Dónde viven los pumas?',
  '¿Qué animales parecidos al puma conoces? ¿Qué sabes de ellos?',
  '¿Cómo es un puma? Dibújalo en tu cuaderno.',
]

// ============================================================
// ACTIVIDAD DE SONIDOS (página 38)

// Fase 1: escuchar la palabra papá y el sonido /p/
export const pSoundIntro = {
  instructionAudio: '/audio/lecciones/p/instruccion-sonido-p.mp3',
  mainWord: {
    name: 'papá',
    image: '/images/lecciones/p/papa.png',
    audio: '/audio/lecciones/p/papa.mp3',
  },
  soundAudio: '/audio/lecciones/p/sonido-p.mp3',
}

// Audio de instrucción para la fase 2
export const pSelectionInstructionAudio =
  '/audio/lecciones/p/instruccion-seleccion-p.mp3'

// Fase 2: marcar las figuras que empiezan con el mismo sonido que "papá"
export const pImagePool = [
  {
    id: 'pozo',
    name: 'pozo',
    image: '/images/lecciones/p/pozo.png',
    audio: '/audio/lecciones/p/pozo.mp3',
    startsWithP: true,
  },
  {
    id: 'pez',
    name: 'pez',
    image: '/images/lecciones/p/pez.png',
    audio: '/audio/lecciones/p/pez.mp3',
    startsWithP: true,
  },
  {
    id: 'gafas',
    name: 'gafas',
    image: '/images/lecciones/p/gafas.png',
    audio: '/audio/lecciones/p/gafas.mp3',
    startsWithP: false,
  },
  {
    id: 'pie',
    name: 'pie',
    image: '/images/lecciones/p/pie.png',
    audio: '/audio/lecciones/p/pie.mp3',
    startsWithP: true,
  },
]

// Audio de instrucción para la fase 3
export const pPositionInstructionAudio =
  '/audio/lecciones/p/instruccion-posicion-p.mp3'

// Fase 4: el sonido /p/ no siempre está al inicio. Escuchar la palabra
// separada en sílabas y tocar la sílaba donde se escucha el sonido /p/.
// "puma" se muestra resuelta como ejemplo (pu-ma, el sonido está en la
// primera sílaba).
export const pSyllablePositionExample = {
  word: 'puma',
  image: '/images/lecciones/p/puma.png',
  syllables: ['pu', 'ma'],
  answerIndex: 0,
}

export const pSyllablePosition = [
  {
    id: 'lapiz',
    word: 'lápiz',
    image: '/images/lecciones/p/lapiz.png',
    wordAudio: '/audio/lecciones/p/lapiz.mp3',
    syllableAudio: '/audio/lecciones/p/lapiz-silabas.mp3',
    syllables: ['lá', 'piz'],
    answerIndex: 1,
  },
  {
    id: 'pino',
    word: 'pino',
    image: '/images/lecciones/p/pino.png',
    wordAudio: '/audio/lecciones/p/pino.mp3',
    syllableAudio: '/audio/lecciones/p/pino-silabas.mp3',
    syllables: ['pi', 'no'],
    answerIndex: 0,
  },
  {
    id: 'mapa',
    word: 'mapa',
    image: '/images/lecciones/p/mapa.png',
    wordAudio: '/audio/lecciones/p/mapa.mp3',
    syllableAudio: '/audio/lecciones/p/mapa-silabas.mp3',
    syllables: ['ma', 'pa'],
    answerIndex: 1,
  },
  {
    id: 'pelo',
    word: 'pelo',
    image: '/images/lecciones/p/pelo.png',
    wordAudio: '/audio/lecciones/p/pelo.mp3',
    syllableAudio: '/audio/lecciones/p/pelo-silabas.mp3',
    syllables: ['pe', 'lo'],
    answerIndex: 0,
  },
  {
    id: 'sopa',
    word: 'sopa',
    image: '/images/lecciones/p/sopa.png',
    wordAudio: '/audio/lecciones/p/sopa.mp3',
    syllableAudio: '/audio/lecciones/p/sopa-silabas.mp3',
    syllables: ['so', 'pa'],
    answerIndex: 1,
  },
  {
    id: 'topo',
    word: 'topo',
    image: '/images/lecciones/p/topo.png',
    wordAudio: '/audio/lecciones/p/topo.mp3',
    syllableAudio: '/audio/lecciones/p/topo-silabas.mp3',
    syllables: ['to', 'po'],
    answerIndex: 1,
  },
  {
    id: 'pato',
    word: 'pato',
    image: '/images/lecciones/p/pato.png',
    wordAudio: '/audio/lecciones/p/pato.mp3',
    syllableAudio: '/audio/lecciones/p/pato-silabas.mp3',
    syllables: ['pa', 'to'],
    answerIndex: 0,
  },
]

// ============================================================
// ACTIVIDAD DE SÍLABAS (página 39)

// Conocer la letra P y sus combinaciones
export const pLetterPresentation = {
  instructionAudio: '/audio/lecciones/p/instruccion-letra-p.mp3',
  soundAudio: '/audio/lecciones/p/sonido-p.mp3',
  combinations: [
    { syllable: 'pa', audio: '/audio/lecciones/p/silaba-pa.mp3' },
    { syllable: 'pe', audio: '/audio/lecciones/p/silaba-pe.mp3' },
    { syllable: 'pi', audio: '/audio/lecciones/p/silaba-pi.mp3' },
    { syllable: 'po', audio: '/audio/lecciones/p/silaba-po.mp3' },
    { syllable: 'pu', audio: '/audio/lecciones/p/silaba-pu.mp3' },
  ],
}

// Audio de instrucción para repasar las palabras con po, pa, pi, pu
export const pTraceInstructionAudio =
  '/audio/lecciones/p/instruccion-repasar-p.mp3'

// Palabras para repasar (leer y tocar), con la sílaba destacada
export const pTraceWords = [
  {
    id: 'polos',
    word: 'polos',
    highlighted: 'po',
    rest: 'los',
    image: '/images/lecciones/p/polos.png',
    audio: '/audio/lecciones/p/polos.mp3',
  },
  {
    id: 'pamela',
    word: 'Pamela',
    highlighted: 'Pa',
    rest: 'mela',
    image: '/images/lecciones/p/pamela.png',
    audio: '/audio/lecciones/p/pamela.mp3',
    isProperNoun: true,
  },
  {
    id: 'piso',
    word: 'piso',
    highlighted: 'pi',
    rest: 'so',
    image: '/images/lecciones/p/piso.png',
    audio: '/audio/lecciones/p/piso.mp3',
  },
  {
    id: 'puma',
    word: 'puma',
    highlighted: 'pu',
    rest: 'ma',
    image: '/images/lecciones/p/puma.png',
    audio: '/audio/lecciones/p/puma.mp3',
  },
]

// Audio de instrucción para encontrar la sílaba con P dentro de la palabra
export const pFindSyllableInstructionAudio =
  '/audio/lecciones/p/instruccion-encontrar-silaba-p.mp3'

// Palabras (algunas inventadas, como en el libro) donde hay que encontrar
// cuál de las sílabas po, pa, pe, pi, pu aparece.
export const pFindSyllableWords = [
  { id: 'mipa', word: 'mipa', audio: '/audio/lecciones/p/palabra-mipa.mp3', answer: 'pa' },
  { id: 'pesu', word: 'pesu', audio: '/audio/lecciones/p/palabra-pesu.mp3', answer: 'pe' },
  { id: 'pilu', word: 'pilu', audio: '/audio/lecciones/p/palabra-pilu.mp3', answer: 'pi' },
  { id: 'repa', word: 'repa', audio: '/audio/lecciones/p/palabra-repa.mp3', answer: 'pa' },
  { id: 'mopo', word: 'mopo', audio: '/audio/lecciones/p/palabra-mopo.mp3', answer: 'po' },
  { id: 'pesi', word: 'pesi', audio: '/audio/lecciones/p/palabra-pesi.mp3', answer: 'pe' },
  { id: 'supi', word: 'supi', audio: '/audio/lecciones/p/palabra-supi.mp3', answer: 'pi' },
  { id: 'pama', word: 'pama', audio: '/audio/lecciones/p/palabra-pama.mp3', answer: 'pa' },
  { id: 'puri', word: 'puri', audio: '/audio/lecciones/p/palabra-puri.mp3', answer: 'pu' },
  { id: 'lapo', word: 'lapo', audio: '/audio/lecciones/p/palabra-lapo.mp3', answer: 'po' },
]

export const pSyllableOptions = ['po', 'pa', 'pe', 'pi', 'pu']

// ============================================================
// ACTIVIDAD DE COMPLETAR PALABRAS (página 41)

// Audio de instrucción para la fase 1
export const pWordCompletionInstructionAudio =
  '/audio/lecciones/p/instruccion-completar-p.mp3'

// Fase 1: escuchar la palabra y elegir la sílaba con P que le falta
export const pWordCompletion = [
  {
    id: 'payaso',
    word: 'payaso',
    pattern: '___yaso',
    image: '/images/lecciones/p/payaso.png',
    audio: '/audio/lecciones/p/payaso.mp3',
    answer: 'pa',
  },
  {
    id: 'pelota',
    word: 'pelota',
    pattern: '___lota',
    image: '/images/lecciones/p/pelota.png',
    audio: '/audio/lecciones/p/pelota.mp3',
    answer: 'pe',
  },
  {
    id: 'camiseta',
    word: 'camiseta',
    // No tiene ninguna sílaba con p: es la figura "trampa" del ejercicio,
    // igual que en el libro.
    pattern: 'camiseta',
    image: '/images/lecciones/p/camiseta.png',
    audio: '/audio/lecciones/p/camiseta.mp3',
    answer: null,
  },
  {
    id: 'pollito',
    word: 'pollito',
    pattern: '___llito',
    image: '/images/lecciones/p/pollito.png',
    audio: '/audio/lecciones/p/pollito.mp3',
    answer: 'po',
  },
]

// Audio de instrucción para la fase 2
export const pWordBuildInstructionAudio =
  '/audio/lecciones/p/instruccion-formar-palabras-p.mp3'

// Fase 2: formar palabras con un banco de 20 sílabas (po,pa,pe,pi,pu /
// so,sa,se,si,su / ro,ra,re,ri,ru / mo,ma,me,mi,mu), tocando 2 a la vez.
export const pSyllableBank = [
  'po', 'pa', 'pe', 'pi', 'pu',
  'so', 'sa', 'se', 'si', 'su',
  'ro', 'ra', 're', 'ri', 'ru',
  'mo', 'ma', 'me', 'mi', 'mu',
]

export const pWordBuildTargets = [
  'peso', 'miro', 'mapa', 'puma', 'para',
  'piso', 'ropa', 'pera', 'paso', 'ramo',
]

// ============================================================
// ACTIVIDAD FINAL (página 42)

// Audio de instrucción para la fase 1
export const pFinalTraceInstructionAudio =
  '/audio/lecciones/p/instruccion-repasar-final-p.mp3'

// Fase 1: repasar y escuchar las palabras (los nombres propios van con mayúscula)
export const pFinalTraceWords = [
  {
    id: 'sapo',
    word: 'sapo',
    image: '/images/lecciones/p/sapo.png',
    audio: '/audio/lecciones/p/sapo.mp3',
  },
  {
    id: 'pepe',
    word: 'Pepe',
    image: '/images/lecciones/p/pepe.png',
    audio: '/audio/lecciones/p/pepe.mp3',
    isProperNoun: true,
  },
  {
    id: 'pala',
    word: 'pala',
    image: '/images/lecciones/p/pala.png',
    audio: '/audio/lecciones/p/pala.mp3',
  },
]

// Fase 2: en el libro esta parte es de respuesta libre ("Lee y escribe las
// palabras que desees para completar cada oración. Coloca punto al final."),
// pero como todavía no escriben, aquí eligen la imagen correcta en vez de
// escribir la palabra.
export const pSentenceCompletion = [
  {
    id: 'pamela-papa',
    sentence: 'Pamela pela la ___.',
    sentenceAudio: '/audio/lecciones/p/oracion-pamela-papa.mp3',
    answer: 'papa',
    options: [
      { name: 'papa', image: '/images/lecciones/p/papa-verdura.png' },
      { name: 'pala', image: '/images/lecciones/p/pala.png' },
      { name: 'pelota', image: '/images/lecciones/p/pelota.png' },
    ],
  },
  {
    id: 'pepe-pelota',
    sentence: 'Pepe sale a jugar con la ___.',
    sentenceAudio: '/audio/lecciones/p/oracion-pepe-pelota.mp3',
    answer: 'pelota',
    options: [
      { name: 'pelota', image: '/images/lecciones/p/pelota.png' },
      { name: 'sapo', image: '/images/lecciones/p/sapo.png' },
      { name: 'puma', image: '/images/lecciones/p/puma.png' },
    ],
  },
]
