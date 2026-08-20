// Para la parte del cuento
export const prReading = {
  title: 'El premio',
  paragraphs: [
    'Priscila es una niña que estudia primer grado. A Priscila le gusta mucho correr. Ella está muy contenta porque en la escuela se realizará una carrera y premiarán a los ganadores.',
    'La maestra les contó que a la carrera llegarían niños de otra escuela. Les pidió que fueran amables con ellos.',
    'El día de la carrera, Priscila corrió con todas sus fuerzas, ella quería ganar. Casi llegaba a la meta, cuando un niño de la otra escuela se cayó. Priscila, sin pensarlo, se paró a ayudarlo. Otros niños también lo hicieron y, juntos, llegaron a la meta.',
    'Aunque no llegaron primero, les dieron un premio sorpresa a todos los que ayudaron al niño que se cayó.',
  ],
  image: '/images/lecciones/pr/el-premio.png',
  imageAlt: 'el-premio',
  instructionAudio: '/audio/lecciones/pr/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/pr/el-premio.mp3',
}

// Preguntas
export const prComprehensionQuestions = [
  '¿Quiénes son los personajes de esta historia?',
  '¿Dónde sucedió esta historia?',
  '¿Qué hubiera pasado si Priscila no ayuda al niño que se cayó?',
  '¿Qué harías tú al ver que un niño se cae en una carrera? ¿Por qué?',
]



// ACTIVIDAD DE RECONOCER SONIDOS

// Fase 1: solo escuchar la palabra "premios" y los sonidos /p/ y /r/ por separado
export const prSoundIntro = {
  instructionAudio: '/audio/lecciones/pr/instruccion-pr.mp3',
  mainWord: {
    name: 'premios',
    image: '/images/lecciones/pr/premios.png',
    audio: '/audio/lecciones/pr/premios.mp3',
  },
  soundAudioP: '/audio/lecciones/p/sonido-p.mp3',
  soundAudioR: '/audio/lecciones/r/sonido-r.mp3',
}
 
// Fase 2: seleccionar las imágenes cuyo nombre EMPIEZA con el sonido /pr/
export const prSelectionInstructionAudio =
  '/audio/lecciones/pr/instruccion-sonido-pr.mp3'
 
export const prImagePool = [
  {
    id: 'premios',
    name: 'premios',
    image: '/images/lecciones/pr/premios.png',
    audio: '/audio/lecciones/pr/premios.mp3',
    startsWithPr: true,
  },
  {
    id: 'princesa',
    name: 'princesa',
    image: '/images/lecciones/pr/princesa.png',
    audio: '/audio/lecciones/pr/princesa.mp3',
    startsWithPr: true,
  },
  {
    id: 'preso',
    name: 'preso',
    image: '/images/lecciones/pr/preso.png',
    audio: '/audio/lecciones/pr/preso.mp3',
    startsWithPr: true,
  },
  {
    id: 'peine',
    name: 'peine',
    image: '/images/lecciones/pr/peine.png',
    audio: '/audio/lecciones/pr/peine.mp3',
    startsWithPr: false,
  },
  {
    id: 'precio',
    name: 'precio',
    image: '/images/lecciones/pr/precio.png',
    audio: '/audio/lecciones/pr/precio.mp3',
    startsWithPr: true,
  },
]
 
// Fase 3: seleccionar las imágenes que CONTIENEN el sonido /pr/ en cualquier parte
export const prContainsInstructionAudio =
  '/audio/lecciones/pr/instruccion-contiene-pr.mp3'
 
export const prSoundMatching = {
  instructionAudio: prContainsInstructionAudio,
  items: [
    {
      id: 'impresora',
      name: 'impresora',
      image: '/images/lecciones/pr/impresora.png',
      audio: '/audio/lecciones/pr/impresora.mp3',
      containsPr: true,
    },
    {
      id: 'tijera',
      name: 'tijera',
      image: '/images/lecciones/pr/tijera.png',
      audio: '/audio/lecciones/pr/tijera.mp3',
      containsPr: false,
    },
    {
      id: 'exprimir',
      name: 'exprimir',
      image: '/images/lecciones/pr/exprimir.png',
      audio: '/audio/lecciones/pr/exprimir.mp3',
      containsPr: true,
    },
    {
      id: 'apretado',
      name: 'apretado',
      image: '/images/lecciones/pr/apretado.png',
      audio: '/audio/lecciones/pr/apretado.mp3',
      containsPr: true,
    },
  ],
}
 
// Fase 4: trabalenguas (actividad solo de escucha, sin comprobación)
export const prTrabalenguasInstructionAudio =
  '/audio/lecciones/pr/instruccion-trabalenguas.mp3'
 
export const prTrabalenguas = [
  {
    id: 'trabalenguas',
    text: [
    'Primero sale la prima Vera.',
    'La prima Vera con prisa va.',
    'Deprisa preparará una pizza',
    ],
    image: '/images/lecciones/pr/prima-vera.png',
    audio: '/audio/lecciones/pr/trabalenguas.mp3',
  },

]



// ============================================================
// ACTIVIDAD DE SÍLABAS

// Fase 1: conocer la combinación PR y sus sílabas
export const prLetterPresentation = {
  instructionAudio: '/audio/lecciones/pr/instruccion-letra-pr.mp3',
  soundAudio: '/audio/lecciones/pr/sonido-pr.mp3',
  combinations: [
    { syllable: 'pra', audio: '/audio/lecciones/pr/silaba-pra.mp3' },
    { syllable: 'pre', audio: '/audio/lecciones/pr/silaba-pre.mp3' },
    { syllable: 'pri', audio: '/audio/lecciones/pr/silaba-pri.mp3' },
    { syllable: 'pro', audio: '/audio/lecciones/pr/silaba-pro.mp3' },
    { syllable: 'pru', audio: '/audio/lecciones/pr/silaba-pru.mp3' },
  ],
}
 
// Fase 2: buscar sílabas que contengan la combinación PR
export const prSyllableSearch = {
  instructionAudio: '/audio/lecciones/pr/instruccion-buscar-silabas.mp3',
  targetSyllables: ['pra', 'pre', 'pri', 'pro', 'pru'],
  options: [
    { syllable: 'pa', audio: '/audio/lecciones/pr/silaba-pa.mp3' },
    { syllable: 'pra', audio: '/audio/lecciones/pr/silaba-pra.mp3' },
    { syllable: 'la', audio: '/audio/lecciones/pr/silaba-la.mp3' },
    { syllable: 'pre', audio: '/audio/lecciones/pr/silaba-pre.mp3' },
    { syllable: 'ta', audio: '/audio/lecciones/pr/silaba-ta.mp3' },
    { syllable: 'pri', audio: '/audio/lecciones/pr/silaba-pri.mp3' },
    { syllable: 'da', audio: '/audio/lecciones/pr/silaba-da.mp3' },
    { syllable: 'pro', audio: '/audio/lecciones/pr/silaba-pro.mp3' },
    { syllable: 'ca', audio: '/audio/lecciones/pr/silaba-ca.mp3' },
    { syllable: 'pru', audio: '/audio/lecciones/pr/silaba-pru.mp3' },
  ],
}
 
// Fase 3: completar la palabra con la sílaba que falta
export const prSyllableOptions = ['pra', 'pre', 'pri', 'pro', 'pru']
 
export const prCompletionInstructionAudio =
  '/audio/lecciones/pr/instruccion-completar-pr.mp3'
 
export const prWordCompletion = [
  {
    id: 'profesor',
    word: 'profesor',
    pattern: '___fesor',
    image: '/images/lecciones/pr/profesor.png',
    audio: '/audio/lecciones/pr/profesor.mp3',
    answer: 'pro',
  },
  {
    id: 'prado',
    word: 'prado',
    pattern: '___do',
    image: '/images/lecciones/pr/prado.png',
    audio: '/audio/lecciones/pr/prado.mp3',
    answer: 'pra',
  },
  {
    id: 'prision',
    word: 'prisión',
    pattern: '___sión',
    image: '/images/lecciones/pr/prision.png',
    audio: '/audio/lecciones/pr/prision.mp3',
    answer: 'pri',
  },
  {
    id: 'prueba',
    word: 'prueba',
    pattern: '___eba',
    image: '/images/lecciones/pr/prueba.png',
    audio: '/audio/lecciones/pr/prueba.mp3',
    answer: 'pru',
  },
]
 
 
// ============================================================
// ACTIVIDAD FINAL

// Fase 1: elegir la sílaba correcta (entre dos) para completar la palabra
export const prJoinInstructionAudio =
  '/audio/lecciones/pr/instruccion-formar-pr.mp3'
 
export const prSyllableJoin = [
  {
    id: 'presa',
    word: 'presa',
    pattern: '___sa',
    wordAudio: '/audio/lecciones/pr/presa.mp3',
    options: [
      {
        syllable: 'pre',
        audio: '/audio/lecciones/pr/silaba-pre.mp3',
        isCorrect: true,
      },
      {
        syllable: 'pru',
        audio: '/audio/lecciones/pr/silaba-pru.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'prado',
    word: 'prado',
    pattern: '___do',
    wordAudio: '/audio/lecciones/pr/prado.mp3',
    options: [
      {
        syllable: 'pri',
        audio: '/audio/lecciones/pr/silaba-pri.mp3',
        isCorrect: false,
      },
      {
        syllable: 'pra',
        audio: '/audio/lecciones/pr/silaba-pra.mp3',
        isCorrect: true,
      },
    ],
  },
  {
    id: 'primer',
    word: 'primer',
    pattern: '___mer',
    wordAudio: '/audio/lecciones/pr/primer.mp3',
    options: [
      {
        syllable: 'pri',
        audio: '/audio/lecciones/pr/silaba-pri.mp3',
        isCorrect: true,
      },
      {
        syllable: 'pre',
        audio: '/audio/lecciones/pr/silaba-pre.mp3',
        isCorrect: false,
      },
    ],
  },
]
 
// Audio de instrucción para la fase 2 (formar oraciones)
export const prSentenceFormation = {
  instructionAudio: '/audio/lecciones/pr/instruccion-formar-oraciones-pr.mp3',
}
 
// Fase 2: formar la oración correcta con un banco de palabras desordenado
export const prWordJoin = [
  {
    id: 'oracion1pr',
    sentence: 'Pamela está en primero primaria.',
    image: '/images/lecciones/pr/pamela.png',
    options: ['primaria.', 'primero', 'Pamela', 'en', 'está'],
  },
  {
    id: 'oracion2pr',
    sentence: 'Mi prima siempre lee la prensa.',
    image: '/images/lecciones/pr/prensa.png',
    options: ['prensa.', 'lee', 'Mi', 'la', 'siempre', 'prima'],
  },
  {
    id: 'oracion3pr',
    sentence: 'Paco es mi primo y Ana es mi tía.',
    image: '/images/lecciones/pr/primo.png',
    options: ['tía.', 'mi', 'es', 'Ana', 'y', 'primo', 'mi', 'es', 'Paco'],
  },
]
