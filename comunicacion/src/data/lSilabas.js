// Página 14 (actividad 3): separar palabras en sílabas y contarlas.
export const lSyllableCountWords = [
  {
    id: 'luna',
    name: 'luna',
    image: '/images/lecciones/l/luna.png',
    wordAudio: '/audio/lecciones/l/luna.mp3',
    syllableAudio: '/audio/lecciones/l/luna-silabas.mp3',
    syllables: ['lu', 'na'],
    options: [2, 3],
  },
  {
    id: 'lapiz',
    name: 'lápiz',
    image: '/images/lecciones/l/lapiz.png',
    wordAudio: '/audio/lecciones/l/lapiz.mp3',
    syllableAudio: '/audio/lecciones/l/lapiz-silabas.mp3',
    syllables: ['lá', 'piz'],
    options: [2, 3],
  },
  {
    id: 'lana',
    name: 'lana',
    image: '/images/lecciones/l/lana.png',
    wordAudio: '/audio/lecciones/l/lana.mp3',
    syllableAudio: '/audio/lecciones/l/lana-silabas.mp3',
    syllables: ['la', 'na'],
    options: [2, 3],
  },
  {
    id: 'linterna',
    name: 'linterna',
    image: '/images/lecciones/l/linterna.png',
    wordAudio: '/audio/lecciones/l/linterna.mp3',
    syllableAudio: '/audio/lecciones/l/linterna-silabas.mp3',
    syllables: ['lin', 'ter', 'na'],
    options: [2, 3],
  },
]

// Página 15 (actividad 1): buscar las sílabas la, le, li, lo, lu.
export const lSyllableSearch = {
  instructionAudio: '/audio/lecciones/l/instruccion-buscar-silabas.mp3',
  targetSyllables: ['la', 'le', 'li', 'lo', 'lu'],
  options: [
    { syllable: 'la', audio: '/audio/lecciones/m/silaba-la.mp3' },
    { syllable: 'ma', audio: '/audio/lecciones/m/silaba-ma.mp3' },
    { syllable: 'le', audio: '/audio/lecciones/l/silaba-le.mp3' },
    { syllable: 'sa', audio: '/audio/lecciones/m/silaba-sa.mp3' },
    { syllable: 'li', audio: '/audio/lecciones/l/silaba-li.mp3' },
    { syllable: 'ta', audio: '/audio/lecciones/l/silaba-ta.mp3' },
    { syllable: 'lo', audio: '/audio/lecciones/l/silaba-lo.mp3' },
    { syllable: 'da', audio: '/audio/lecciones/m/silaba-da.mp3' },
    { syllable: 'lu', audio: '/audio/lecciones/m/silaba-lu.mp3' },
    { syllable: 'pa', audio: '/audio/lecciones/l/silaba-pa.mp3' },
  ],
}

// Página 15 (actividad 2): conocer la letra L y sus combinaciones.
export const lLetterPresentation = {
  soundAudio: '/audio/lecciones/l/sonido-l.mp3',
  combinations: [
    { syllable: 'la', audio: '/audio/lecciones/m/silaba-la.mp3' },
    { syllable: 'le', audio: '/audio/lecciones/l/silaba-le.mp3' },
    { syllable: 'li', audio: '/audio/lecciones/l/silaba-li.mp3' },
    { syllable: 'lo', audio: '/audio/lecciones/l/silaba-lo.mp3' },
    { syllable: 'lu', audio: '/audio/lecciones/m/silaba-lu.mp3' },
  ],
}

export const lSyllableAssociationInstructionAudio =
  '/audio/lecciones/l/instruccion-asociar-silabas-l.mp3'

// Página 15 (actividad 3): asociar imagen, palabra y sílaba con L.
export const lSyllableAssociation = [
  {
    id: 'luna',
    word: 'luna',
    highlighted: 'lu',
    rest: 'na',
    image: '/images/lecciones/l/luna.png',
    syllableAudio: '/audio/lecciones/m/silaba-lu.mp3',
    wordAudio: '/audio/lecciones/l/luna.mp3',
  },
  {
    id: 'lana',
    word: 'lana',
    highlighted: 'la',
    rest: 'na',
    image: '/images/lecciones/l/lana.png',
    syllableAudio: '/audio/lecciones/m/silaba-la.mp3',
    wordAudio: '/audio/lecciones/l/lana.mp3',
  },
  {
    id: 'linterna',
    word: 'linterna',
    highlighted: 'lin',
    rest: 'terna',
    image: '/images/lecciones/l/linterna.png',
    syllableAudio: '/audio/lecciones/l/silaba-lin.mp3',
    wordAudio: '/audio/lecciones/l/linterna.mp3',
  },
]
