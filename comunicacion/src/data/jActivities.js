const jImage = (name) =>
  `/images/lecciones/j/${name}.png`

const jAudio = (name) =>
  `/audio/lecciones/j/${name}.mp3`

// Actividad 1: reconocimiento del sonido

export const jSoundIntro = {
  instructionAudio:
    jAudio('instruccion-sonido-j'),

  letterAudio:
    jAudio('sonido-j'),

  mainWord: {
    id: 'jirafa',
    name: 'jirafa',
    image: jImage('jirafa'),
    audio: jAudio('jirafa'),
  },
}

export const jSelectionInstructionAudio =
  jAudio('instruccion-seleccion-j')

export const jSyllableHearingInstructionAudio =
  jAudio('instruccion-silabas-sonido-j')

export const jPairInstructionAudio =
  jAudio('instruccion-parejas-j')

export const jSoundSelectionAnswerIds = [
  'jarra',
  'jilguero',
]

export const jImagePool = [
  {
    id: 'jarra',
    name: 'jarra',
    image: jImage('jarra'),
    audio: jAudio('jarra'),
    startsWithJ: true,
  },
  {
    id: 'queso',
    name: 'queso',
    image: jImage('queso'),
    audio: jAudio('queso'),
    startsWithJ: false,
  },
  {
    id: 'jilguero',
    name: 'jilguero',
    image: jImage('jilguero'),
    audio: jAudio('jilguero'),
    startsWithJ: true,
  },
  {
    id: 'muñeca',
    name: 'muñeca',
    image: jImage('muneca'),
    audio: jAudio('muneca'),
    startsWithJ: false,
  },
]

export const jSyllableHearing = [
  {
    id: 'hoja',
    word: 'hoja',
    image: jImage('hoja'),
    audio: jAudio('hoja'),
    syllables: ['ho', 'ja'],
    answers: ['ja'],
  },
  {
    id: 'oveja',
    word: 'oveja',
    image: jImage('oveja'),
    audio: jAudio('oveja'),
    syllables: ['o', 've', 'ja'],
    answers: ['ja'],
  },
  {
    id: 'conejo',
    word: 'conejo',
    image: jImage('conejo'),
    audio: jAudio('conejo'),
    syllables: ['co', 'ne', 'jo'],
    answers: ['jo'],
  },
  {
    id: 'aguja',
    word: 'aguja',
    image: jImage('aguja'),
    audio: jAudio('aguja'),
    syllables: ['a', 'gu', 'ja'],
    answers: ['ja'],
  },
  {
    id: 'ejote',
    word: 'ejote',
    image: jImage('ejote'),
    audio: jAudio('ejote'),
    syllables: ['e', 'jo', 'te'],
    answers: ['jo'],
  },
  {
    id: 'pajilla',
    word: 'pajilla',
    image: jImage('pajilla'),
    audio: jAudio('pajilla'),
    syllables: ['pa', 'ji', 'lla'],
    answers: ['ji'],
  },
]

export const jSoundPairMatching = [
  {
    id: 'jarra',
    name: 'jarra',
    pairId: 'ja',
    fileName: 'jarra',
  },
  {
    id: 'jalea',
    name: 'jalea',
    pairId: 'ja',
    fileName: 'jalea',
  },
  {
    id: 'jeringa',
    name: 'jeringa',
    pairId: 'je',
    fileName: 'jeringa',
  },
  {
    id: 'jefe',
    name: 'jefe',
    pairId: 'je',
    fileName: 'jefe',
  },
  {
    id: 'jirafa',
    name: 'jirafa',
    pairId: 'ji',
    fileName: 'jirafa',
  },
  {
    id: 'jinete',
    name: 'jinete',
    pairId: 'ji',
    fileName: 'jinete',
  },
  {
    id: 'joven',
    name: 'joven',
    pairId: 'jo',
    fileName: 'joven',
  },
  {
    id: 'joya',
    name: 'joya',
    pairId: 'jo',
    fileName: 'joya',
  },
  {
    id: 'jugo',
    name: 'jugo',
    pairId: 'ju',
    fileName: 'jugo',
  },
  {
    id: 'juguete',
    name: 'juguete',
    pairId: 'ju',
    fileName: 'juguete',
  },
].map((item) => ({
  id: item.id,
  name: item.name,
  pairId: item.pairId,
  image: jImage(item.fileName),
  audio: jAudio(item.fileName),
}))

// Actividad 2: reconocimiento de sílabas

export const jSyllableCountWords = [
  {
    id: 'ojo',
    name: 'ojo',
    image: jImage('ojo'),
    audio: jAudio('ojo'),
    syllables: ['o', 'jo'],
    options: [1, 2, 3],
  },
  {
    id: 'hoja',
    name: 'hoja',
    image: jImage('hoja'),
    audio: jAudio('hoja'),
    syllables: ['ho', 'ja'],
    options: [1, 2, 3],
  },
  {
    id: 'conejo',
    name: 'conejo',
    image: jImage('conejo'),
    audio: jAudio('conejo'),
    syllables: ['co', 'ne', 'jo'],
    options: [2, 3, 4],
  },
  {
    id: 'jirafa',
    name: 'jirafa',
    image: jImage('jirafa'),
    audio: jAudio('jirafa'),
    syllables: ['ji', 'ra', 'fa'],
    options: [2, 3, 4],
  },
  {
    id: 'pajilla',
    name: 'pajilla',
    image: jImage('pajilla'),
    audio: jAudio('pajilla'),
    syllables: ['pa', 'ji', 'lla'],
    options: [2, 3, 4],
  },
]

export const jSyllableSearch = {
  options: [
    {
      id: 'ja',
      syllable: 'ja',
      isTarget: true,
      audio: jAudio('silaba-ja'),
    },
    {
      id: 'me',
      syllable: 'me',
      isTarget: false,
      audio: null,
    },
    {
      id: 'ji',
      syllable: 'ji',
      isTarget: true,
      audio: jAudio('silaba-ji'),
    },
    {
      id: 'lo',
      syllable: 'lo',
      isTarget: false,
      audio: null,
    },
    {
      id: 'ju',
      syllable: 'ju',
      isTarget: true,
      audio: jAudio('silaba-ju'),
    },
    {
      id: 'se',
      syllable: 'se',
      isTarget: false,
      audio: null,
    },
    {
      id: 'jo',
      syllable: 'jo',
      isTarget: true,
      audio: jAudio('silaba-jo'),
    },
    {
      id: 'pa',
      syllable: 'pa',
      isTarget: false,
      audio: null,
    },
    {
      id: 'je',
      syllable: 'je',
      isTarget: true,
      audio: jAudio('silaba-je'),
    },
    {
      id: 'nu',
      syllable: 'nu',
      isTarget: false,
      audio: null,
    },
  ],
}

export const jLetterPresentation = {
  soundAudio: jAudio('sonido-j'),

  combinations: [
    'ja',
    'je',
    'ji',
    'jo',
    'ju',
  ].map((syllable) => ({
    syllable,
    audio: jAudio(`silaba-${syllable}`),
  })),
}

export const jSyllableAssociation = [
  {
    word: 'jalea',
    highlighted: 'ja',
    rest: 'lea',
    image: jImage('jalea'),
    syllableAudio: jAudio('silaba-ja'),
    wordAudio: jAudio('jalea'),
  },
  {
    word: 'jeringa',
    highlighted: 'je',
    rest: 'ringa',
    image: jImage('jeringa'),
    syllableAudio: jAudio('silaba-je'),
    wordAudio: jAudio('jeringa'),
  },
  {
    word: 'jirafa',
    highlighted: 'ji',
    rest: 'rafa',
    image: jImage('jirafa'),
    syllableAudio: jAudio('silaba-ji'),
    wordAudio: jAudio('jirafa'),
  },
  {
    word: 'joven',
    highlighted: 'jo',
    rest: 'ven',
    image: jImage('joven'),
    syllableAudio: jAudio('silaba-jo'),
    wordAudio: jAudio('joven'),
  },
  {
    word: 'jugo',
    highlighted: 'ju',
    rest: 'go',
    image: jImage('jugo'),
    syllableAudio: jAudio('silaba-ju'),
    wordAudio: jAudio('jugo'),
  },
]

export const jSyllableOptions = [
  'ja',
  'je',
  'ji',
  'jo',
  'ju',
]

// Actividad 3: completar y formar palabras

export const jWordCompletion = [
  ['__bón', 'jabón', 'ja', 'jabon'],
  ['o__', 'ojo', 'jo', 'ojo'],
  ['__gar', 'jugar', 'ju', 'jugar'],
  ['a__', 'ajo', 'jo', 'ajo'],
  ['ce__', 'ceja', 'ja', 'ceja'],
  ['te__do', 'tejido', 'ji', 'tejido'],
].map(([pattern, word, answer, fileName]) => ({
  pattern,
  word,
  answer,
  image: jImage(fileName),
  audio: jAudio(fileName),
}))

export const jSyllableJoin = [
  {
    id: 'jirafa',
    syllables: ['ji', 'ra', 'fa'],
    word: 'jirafa',
    image: jImage('jirafa'),
    wordAudio: jAudio('jirafa'),
  },
  {
    id: 'jalea',
    syllables: ['ja', 'le', 'a'],
    word: 'jalea',
    image: jImage('jalea'),
    wordAudio: jAudio('jalea'),
  },
  {
    id: 'conejo',
    syllables: ['co', 'ne', 'jo'],
    word: 'conejo',
    image: jImage('conejo'),
    wordAudio: jAudio('conejo'),
  },
  {
    id: 'jugo',
    syllables: ['ju', 'go'],
    word: 'jugo',
    image: jImage('jugo'),
    wordAudio: jAudio('jugo'),
  },
  {
    id: 'reja',
    syllables: ['re', 'ja'],
    word: 'reja',
    image: jImage('reja'),
    wordAudio: jAudio('reja'),
  },
]

// Actividad final

export const jPracticeWords = [
  {
    word: 'ojo',
    image: jImage('ojo'),
    audio: jAudio('ojo'),
  },
  {
    word: 'reja',
    image: jImage('reja'),
    audio: jAudio('reja'),
  },
  {
    word: 'Jonás',
    image: jImage('jonas'),
    audio: jAudio('jonas'),
    isProperNoun: true,
  },
  {
    word: 'reloj',
    image: jImage('reloj'),
    audio: jAudio('reloj'),
  },
  {
    word: 'jinete',
    image: jImage('jinete'),
    audio: jAudio('jinete'),
  },
  {
    word: 'quijada',
    image: jImage('quijada'),
    audio: jAudio('quijada'),
  },
]

export const jSentenceCompletion = [
  {
    sentence: 'El ___ salta la reja.',
    completeSentence:
      'El conejo salta la reja.',
    options: [
      'conejo',
      'jilguero',
      'jinete',
    ],
    answer: 'conejo',
    wordCount: 5,
    audio: jAudio('oracion-conejo-reja'),
  },
  {
    sentence:
      'Esa ___ de naranja es dulce y rica.',
    completeSentence:
      'Esa jalea de naranja es dulce y rica.',
    options: [
      'jalea',
      'jarra',
      'joya',
    ],
    answer: 'jalea',
    wordCount: 8,
    audio: jAudio('oracion-jalea-naranja'),
  },
]

export const jWordImageMatch = [
  'ojo',
  'reja',
  'reloj',
  'jinete',
].map((word) => ({
  word,
  audio: jAudio(word),
  answerImage: jImage(word),

  options: [
    'ojo',
    'reja',
    'reloj',
    'jinete',
  ].map((option) => ({
    name: option,
    image: jImage(option),
  })),
}))