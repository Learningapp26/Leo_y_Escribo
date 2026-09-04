// Para la parte del cuento
export const brReading = {
  title: 'La brocha de Braulio',
  paragraphs: [
    'Hace mucho tiempo, existió un pintor muy famoso, llamado Braulio. Era famoso porque creaba pinturas muy hermosas con su brocha de madera y pelos de cabra.',
    'Braulio cuidaba mucho su brocha porque su papá se la regaló cuando era niño. Él mismo cortó y lijó un pedazo de madera. También cortó el pelo de unas cabras que tenían en la casa. Con eso fabricó una brocha de gran calidad.',
    '¡Fue el mejor regalo que Braulio recibió!',
    'Desde entonces Braulio pintó mejor. Cuando no pintaba con la brocha especial, la pintura no le salía tan bonita. Él decía que esto pasaba porque cuando la usaba, sentía el cariño de su papá.',
  ],
  image: '/images/lecciones/br/brocha-pintor.png',
  imageAlt: 'pintor con su brocha',
  instructionAudio: '/audio/lecciones/br/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/br/brocha-pintor.mp3',
}
 
// Preguntas
export const brComprehensionQuestions = [
  '¿Por qué Braulio era un pintor famoso?',
  '¿Cómo es la brocha de Braulio? ¿Por qué la cuidaba mucho?',
  '¿Cómo crees que se sentiría Braulio si perdiera su brocha?',
  '¿Si tuvieras una brocha como la de Braulio, qué pintarías?',
]

// ACTIVIDAD DE RECONOCER SONIDOS

// Fase 1: solo escuchar la palabra "brocha" y los sonidos /b/ y /r/ por separado
export const brSoundIntro = {
  instructionAudio: '/audio/lecciones/br/instruccion-br.mp3',
  mainWord: {
    name: 'brocha',
    image: '/images/lecciones/br/brocha.png',
    audio: '/audio/lecciones/br/brocha.mp3',
  },
  soundAudioP: '/audio/lecciones/b/sonido-b.mp3',
  soundAudioR: '/audio/lecciones/r/sonido-r.mp3',
}
 
// Fase 2: seleccionar las imágenes cuyo nombre EMPIEZA con el sonido /br/
export const brSelectionInstructionAudio =
  '/audio/lecciones/br/instruccion-sonido-br.mp3'
 
export const brImagePool = [
  {
    id: 'brocha',
    name: 'brocha',
    image: '/images/lecciones/br/brocha.png',
    audio: '/audio/lecciones/br/brocha.mp3',
    startsWithBr: true,
  },
  {
    id: 'brocoli',
    name: 'brócoli',
    image: '/images/lecciones/br/brocoli.png',
    audio: '/audio/lecciones/br/brocoli.mp3',
    startsWithBr: true,
  },
  {
    id: 'nube',
    name: 'nube',
    image: '/images/lecciones/br/nube.png',
    audio: '/audio/lecciones/br/nube.mp3',
    startsWithBr: false,
  },
  {
    id: 'brazo',
    name: 'brazo',
    image: '/images/lecciones/br/brazo.png',
    audio: '/audio/lecciones/br/brazo.mp3',
    startsWithBr: true,
  },
  {
    id: 'bruja',
    name: 'bruja',
    image: '/images/lecciones/br/bruja.png',
    audio: '/audio/lecciones/br/bruja.mp3',
    startsWithBr: true,
  },
]
 
// Fase 3: seleccionar las imágenes que CONTIENEN el sonido /br/ en cualquier parte
export const brContainsInstructionAudio =
  '/audio/lecciones/br/instruccion-contiene-br.mp3'
 
export const brSoundMatching = {
  instructionAudio: brContainsInstructionAudio,
  items: [
    {
      id: 'libro',
      name: 'libro',
      image: '/images/lecciones/br/libro.png',
      audio: '/audio/lecciones/br/libro.mp3',
      containsBr: true,
    },
    {
      id: 'abrazo',
      name: 'abrazo',
      image: '/images/lecciones/br/abrazo.png',
      audio: '/audio/lecciones/br/abrazo.mp3',
      containsBr: true,
    },
    {
      id: 'olla',
      name: 'olla',
      image: '/images/lecciones/br/olla.png',
      audio: '/audio/lecciones/br/olla.mp3',
      containsBr: false,
    },
    {
      id: 'sombrero',
      name: 'sombrero',
      image: '/images/lecciones/br/sombrero.png',
      audio: '/audio/lecciones/br/sombrero.mp3',
      containsBr: true,
    },
  ],
}
 
// Fase 4: trabalenguas (actividad solo de escucha, sin comprobación)
export const brTrabalenguasInstructionAudio =
  '/audio/lecciones/br/instruccion-trabalenguas.mp3'
 
export const brTrabalenguas = [
  {
    id: 'trabalenguas',
    text: [
      'Brenda toma la hebra',
      'para enhebrar perlas en un alambre.',
      'Para desenhebrarlas,',
      'solo quita la hebra del alambre.',
    ],
    image: '/images/lecciones/br/brenda-hebra.png',
    audio: '/audio/lecciones/br/trabalenguas.mp3',
  },
]
 


// ============================================================
// ACTIVIDAD DE SÍLABAS

// Fase 1: conocer la combinación BR y sus sílabas
export const brLetterPresentation = {
  instructionAudio: '/audio/lecciones/br/instruccion-letra-br.mp3',
  soundAudio: '/audio/lecciones/br/sonido-br.mp3',
  combinations: [
    { syllable: 'bra', audio: '/audio/lecciones/br/silaba-bra.mp3' },
    { syllable: 'bre', audio: '/audio/lecciones/br/silaba-bre.mp3' },
    { syllable: 'bri', audio: '/audio/lecciones/br/silaba-bri.mp3' },
    { syllable: 'bro', audio: '/audio/lecciones/br/silaba-bro.mp3' },
    { syllable: 'bru', audio: '/audio/lecciones/br/silaba-bru.mp3' },
  ],
}
 
// Fase 2: buscar sílabas que contengan la combinación BR
export const brSyllableSearch = {
  instructionAudio: '/audio/lecciones/br/instruccion-buscar-silabas.mp3',
  targetSyllables: ['bra', 'bre', 'bri', 'bro', 'bru'],
  options: [
    { syllable: 'ba', audio: '/audio/lecciones/br/silaba-ba.mp3' },
    { syllable: 'bra', audio: '/audio/lecciones/br/silaba-bra.mp3' },
    { syllable: 'bre', audio: '/audio/lecciones/br/silaba-bre.mp3' },
    { syllable: 'ble', audio: '/audio/lecciones/br/silaba-ble.mp3' },
    { syllable: 'tru', audio: '/audio/lecciones/br/silaba-tru.mp3' },
    { syllable: 'bri', audio: '/audio/lecciones/br/silaba-bri.mp3' },
    { syllable: 'bla', audio: '/audio/lecciones/br/silaba-bla.mp3' },
    { syllable: 'bro', audio: '/audio/lecciones/br/silaba-bro.mp3' },
    { syllable: 'ple', audio: '/audio/lecciones/br/silaba-ple.mp3' },
    { syllable: 'bru', audio: '/audio/lecciones/br/silaba-bru.mp3' },
    { syllable: 'pro', audio: '/audio/lecciones/br/silaba-pro.mp3' },
    { syllable: 'plu', audio: '/audio/lecciones/br/silaba-plu.mp3' },
  ],
}
 
// Fase 3: completar la palabra con la sílaba que falta
export const brSyllableOptions = ['bra', 'bre', 'bri', 'bro', 'bru']
 
export const brCompletionInstructionAudio =
  '/audio/lecciones/br/instruccion-completar-br.mp3'
 
export const brWordCompletion = [
  {
    id: 'brea',
    word: 'brea',
    pattern: '___a',
    image: '/images/lecciones/br/brea.png',
    audio: '/audio/lecciones/br/brea.mp3',
    answer: 'bre',
  },
  {
    id: 'brinco',
    word: 'brinco',
    pattern: '___nco',
    image: '/images/lecciones/br/brinco.png',
    audio: '/audio/lecciones/br/brinco.mp3',
    answer: 'bri',
  },
  {
    id: 'brasa',
    word: 'brasa',
    pattern: '___sa',
    image: '/images/lecciones/br/brasa.png',
    audio: '/audio/lecciones/br/brasa.mp3',
    answer: 'bra',
  },
  {
    id: 'brujula',
    word: 'brújula',
    pattern: '___jula',
    image: '/images/lecciones/br/brujula.png',
    audio: '/audio/lecciones/br/brujula.mp3',
    answer: 'bru',
  },
]
 
// Fase 4: seleccionar la sílaba correcta de ls dos opciones que sea igual a la que está en la palabra
export const brWordSyllableSelectionInstructionAudio =
  '/audio/lecciones/br/instruccion-banco-br.mp3'
 
 
export const brWordSyllableSelection = [
  {
    id: 'obra',
    word: 'obra',
    syllableAudio: '/audio/lecciones/br/silaba-obra.mp3',
    options: ['bra', 'ba'],
    answer: 'bra',
  },
    {
    id: 'brisa',
    word: 'brisa',
    syllableAudio: '/audio/lecciones/br/silaba-brisa.mp3',
    options: ['di', 'bri'],
    answer: 'bri',
  },
    {
    id: 'sobre',
    word: 'sobre',
    syllableAudio: '/audio/lecciones/br/silaba-sobre.mp3',
    options: ['bre', 'be'],
    answer: 'bre',
  },
    {
    id: 'bruja',
    word: 'bruja',
    syllableAudio: '/audio/lecciones/br/silaba-bruja.mp3',
    options: ['du', 'bru'],
    answer: 'bru',
  },
    {
    id: 'broma',
    word: 'broma',
    syllableAudio: '/audio/lecciones/br/silaba-broma.mp3',
    options: ['bo', 'bro'],
    answer: 'bro',
  },
    {
    id: 'bruma',
    word: 'bruma',
    syllableAudio: '/audio/lecciones/br/silaba-bruma.mp3',
    options: ['bu', 'bru'],
    answer: 'bru',
  },
    {
    id: 'sobra',
    word: 'sobra',
    syllableAudio: '/audio/lecciones/br/silaba-sobra.mp3',
    options: ['bra', 'da'],
    answer: 'bra',
  },
    {
    id: 'cubre',
    word: 'cubre',
    syllableAudio: '/audio/lecciones/br/silaba-cubre.mp3',
    options: ['bre', 'de'],
    answer: 'bre',
  },
    {
    id: 'cabrita',
    word: 'cabrita',
    syllableAudio: '/audio/lecciones/br/silaba-cabrita.mp3',
    options: ['bri', 'bi'],
    answer: 'bri',
  },
    {
    id: 'libra',
    word: 'libra',
    syllableAudio: '/audio/lecciones/br/silaba-libra.mp3',
    options: ['bra', 'ba'],
    answer: 'bra',
  },

]
 
// ACTIVIDAD FINAL
 

// Fase 1: del banco de sílabas tendra que elegir las dos que formen la palabra mostrada
export const brJoinInstructionAudio =
  '/audio/lecciones/br/instruccion-formar-br.mp3'

export const brSyllableJoinBank = ['bra', 'li', 'pe' , 'bre', 'nco', 'bri', 'le', 'bro', 'bru', 'pu']
 
export const brSyllableJoin = [
  {
    id: 'libro',
    word: 'libro',
    wordAudio: '/audio/lecciones/br/libro.mp3',
    answers: [ 'li', 'bro'],
  },
  {
    id: 'pobre',
    word: 'pobre',
    wordAudio: '/audio/lecciones/br/pobre.mp3',
    answers: [ 'po', 'bre'],
  },
  {
    id: 'brinco',
    word: 'brinco',
    wordAudio: '/audio/lecciones/br/brinco.mp3',
    answers: [ 'bri', 'nco'],
  },

]
 
// Audio de instrucción para la fase 2 (formar oraciones)
export const brSentenceFormation = {
  instructionAudio: '/audio/lecciones/br/instruccion-formar-oraciones-br.mp3',
}
 
// Fase 2: formar la oración correcta con un banco de palabras desordenado
export const brWordJoin = [
  {
    id: 'oracion1br',
    sentence: 'La cabra brinca.',
    options: ['brinca.', 'La', 'cabra'],
  },
  {
    id: 'oracion2br',
    sentence: 'La cabra come brócoli.',
    options: ['brócoli.', 'La', 'come', 'cabra'],
  },
  {
    id: 'oracion3br',
    sentence: 'El brócoli es rico.',
    options: ['es', 'brócoli', 'rico.', 'El'],
  },
]
