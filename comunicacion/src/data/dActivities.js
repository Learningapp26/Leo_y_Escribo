const dImage = (name) => `/images/lecciones/d/${name}.png`
const dAudio = (name) => `/audio/lecciones/d/${name}.mp3`

export const dSoundIntro = {
  instructionAudio: dAudio('instruccion-sonido-d'), // TODO: Agregar audio de instrucción
  letterAudio: dAudio('sonido-d'), // TODO: Agregar audio del sonido /d/
  mainWord: {
    id: 'dedo',
    name: 'dedo',
    image: dImage('dedo'),
    audio: dAudio('dedo'), // TODO: Agregar audio de "dedo"
  },
}

export const dSelectionInstructionAudio = dAudio('instruccion-seleccion-d') // TODO: Agregar audio de instrucción

export const dSyllableHearingInstructionAudio = dAudio('instruccion-silabas-sonido-d') // TODO: Agregar audio de instrucción

export const dPairInstructionAudio = dAudio('instruccion-parejas-d') // TODO: Agregar audio de instrucción

export const dSoundSelectionAnswerIds = ['dado', 'dientes', 'dos', 'dulce']

export const dImagePool = [
  {
    id: 'dado',
    name: 'dado',
    image: dImage('dado'),
    audio: dAudio('dado'), // TODO: Agregar audio de "dado"
    startsWithD: true,
  },
  {
    id: 'dientes',
    name: 'dientes',
    image: dImage('dientes'),
    audio: dAudio('dientes'), // TODO: Agregar audio de "dientes"
    startsWithD: true,
  },
  {
    id: 'dos',
    name: 'dos',
    image: dImage('dos'),
    audio: dAudio('dos'), // TODO: Agregar audio de "dos"
    startsWithD: true,
  },
  {
    id: 'dulce',
    name: 'dulce',
    image: dImage('dulce'),
    audio: dAudio('dulce'), // TODO: Agregar audio de "dulce"
    startsWithD: true,
  },
  {
    id: 'muñeca',
    name: 'muñeca',
    image: dImage('muneca'),
    audio: '/audio/lecciones/m/muñeca.mp3',
    startsWithD: false,
  },
  {
    id: 'gorra',
    name: 'gorra',
    image: dImage('gorra'),
    audio: dAudio('gorra'), // TODO: Agregar audio de "gorra"
    startsWithD: false,
  },
]

export const dSyllableHearing = [
  {
    id: 'nudo',
    word: 'nudo',
    image: dImage('nudo'),
    audio: dAudio('nudo'), // TODO: Agregar audio de "nudo"
    syllables: ['nu', 'do'],
    answers: ['do'],
  },
  {
    id: 'helado',
    word: 'helado',
    image: dImage('helado'),
    audio: dAudio('helado'), // TODO: Agregar audio de "helado"
    syllables: ['he', 'la', 'do'],
    answers: ['do'],
  },
  {
    id: 'dona',
    word: 'dona',
    image: dImage('dona'),
    audio: dAudio('dona'), // TODO: Agregar audio de "dona"
    syllables: ['do', 'na'],
    answers: ['do'],
  },
  {
    id: 'dado',
    word: 'dado',
    image: dImage('dado'),
    audio: dAudio('dado'), // TODO: Agregar audio de "dado"
    syllables: ['da', 'do'],
    answers: ['da', 'do'],
  },
  {
    id: 'dedo',
    word: 'dedo',
    image: dImage('dedo'),
    audio: dAudio('dedo'), // TODO: Agregar audio de "dedo"
    syllables: ['de', 'do'],
    answers: ['de', 'do'],
  },
]

export const dSoundPairMatching = [
  {
    id: 'dado',
    name: 'dado',
    pairId: 'da',
    fileName: 'dado',
  },
  {
    id: 'dedo',
    name: 'dedo',
    pairId: 'de',
    fileName: 'dedo',
  },
  {
    id: 'dinero',
    name: 'dinero',
    pairId: 'di',
    fileName: 'dinero',
  },
  {
    id: 'dona',
    name: 'dona',
    pairId: 'do',
    fileName: 'dona',
  },
  {
    id: 'dulce',
    name: 'dulce',
    pairId: 'du',
    fileName: 'dulce',
  },
  {
    id: 'ducha',
    name: 'ducha',
    pairId: 'du',
    fileName: 'ducha',
  },
  {
    id: 'dinosaurio',
    name: 'dinosaurio',
    pairId: 'di',
    fileName: 'dinosaurio',
  },
  {
    id: 'dama',
    name: 'dama',
    pairId: 'da',
    fileName: 'dama',
  },
  {
    id: 'delfin',
    name: 'delfín',
    pairId: 'de',
    fileName: 'delfin',
  },
  {
    id: 'dos',
    name: 'dos',
    pairId: 'do',
    fileName: 'dos',
  },
].map((item) => ({
  id: item.id,
  name: item.name,
  pairId: item.pairId,
  image: dImage(item.fileName),
  audio: dAudio(item.fileName),
}))

export const dSyllableCountWords = [
  {
    id: 'dado',
    name: 'dado',
    image: dImage('dado'),
    audio: dAudio('dado'), // TODO: Agregar audio de "dado"
    syllables: ['da', 'do'],
    options: [1, 2, 3],
  },
  {
    id: 'nudo',
    name: 'nudo',
    image: dImage('nudo'),
    audio: dAudio('nudo'), // TODO: Agregar audio de "nudo"
    syllables: ['nu', 'do'],
    options: [1, 2, 3],
  },
  {
    id: 'dona',
    name: 'dona',
    image: dImage('dona'),
    audio: dAudio('dona'), // TODO: Agregar audio de "dona"
    syllables: ['do', 'na'],
    options: [1, 2, 3],
  },
  {
    id: 'doctora',
    name: 'doctora',
    image: dImage('doctora'),
    audio: dAudio('doctora'), // TODO: Agregar audio de "doctora"
    syllables: ['doc', 'to', 'ra'],
    options: [2, 3, 4],
  },
  {
    id: 'helado',
    name: 'helado',
    image: dImage('helado'),
    audio: dAudio('helado'), // TODO: Agregar audio de "helado"
    syllables: ['he', 'la', 'do'],
    options: [2, 3, 4],
  },
]

export const dSyllableSearch = {
  options: ['da', 'de', 'di', 'do', 'du'].map((syllable, index) => ({
    id: `${syllable}-${index}`,
    syllable,
    isTarget: true,
    audio:
      syllable === 'da'
        ? '/audio/lecciones/m/silaba-da.mp3'
        : dAudio(`silaba-${syllable}`), // TODO: Agregar audios de silabas D faltantes
  })),
}

export const dLetterPresentation = {
  soundAudio: dAudio('sonido-d'), // TODO: Agregar audio del sonido /d/
  combinations: ['da', 'de', 'di', 'do', 'du'].map((syllable) => ({
    syllable,
    audio:
      syllable === 'da'
        ? '/audio/lecciones/m/silaba-da.mp3'
        : dAudio(`silaba-${syllable}`), // TODO: Agregar audios de silabas D faltantes
  })),
}

export const dSyllableAssociation = [
  {
    word: 'dado',
    highlighted: 'da',
    rest: 'do',
    image: dImage('dado'),
    syllableAudio: '/audio/lecciones/m/silaba-da.mp3',
    wordAudio: dAudio('dado'), // TODO: Agregar audio de "dado"
  },
  {
    word: 'dia',
    highlighted: 'di',
    rest: 'a',
    image: dImage('dia'),
    syllableAudio: dAudio('silaba-di'), // TODO: Agregar audio de "di"
    wordAudio: dAudio('dia'), // TODO: Agregar audio de "dia"
  },
  {
    word: 'dona',
    highlighted: 'do',
    rest: 'na',
    image: dImage('dona'),
    syllableAudio: dAudio('silaba-do'), // TODO: Agregar audio de "do"
    wordAudio: dAudio('dona'), // TODO: Agregar audio de "dona"
  },
  {
    word: 'dulce',
    highlighted: 'du',
    rest: 'lce',
    image: dImage('dulce'),
    syllableAudio: dAudio('silaba-du'), // TODO: Agregar audio de "du"
    wordAudio: dAudio('dulce'), // TODO: Agregar audio de "dulce"
  },
]

export const dSyllableOptions = ['da', 'de', 'di', 'do', 'du']

export const dWordCompletion = [
  ['__do', 'dado', 'da'],
  ['__na', 'dona', 'do'],
  ['__ma', 'dama', 'da'],
  ['__do', 'dedo', 'de'],
  ['__lce', 'dulce', 'du'],
].map(([pattern, word, answer]) => ({
  pattern,
  word,
  answer,
  image: dImage(word),
  audio: dAudio(word), // TODO: Agregar audio correspondiente
}))

export const dSyllableJoin = [
  ['di', 'me', 'dime'],
  ['do', 'na', 'dona'],
  ['da', 'ma', 'dama'],
  ['to', 'do', 'todo'],
].map(([first, second, word]) => ({
  id: word,
  first: { id: `${word}-first`, syllable: first },
  second: { id: `${word}-second`, syllable: second },
  word,
  wordAudio: dAudio(word), // TODO: Agregar audio correspondiente
}))

export const dPracticeWords = [
  {
    word: 'dos',
    image: dImage('dos'),
    audio: dAudio('dos'), // TODO: Agregar audio de "dos"
  },
  {
    word: 'día',
    image: dImage('dia'),
    audio: dAudio('dia'), // TODO: Agregar audio de "dia"
  },
  {
    word: 'dama',
    image: dImage('dama'),
    audio: dAudio('dama'), // TODO: Agregar audio de "dama"
  },
  {
    word: 'Dora',
    image: dImage('dora'),
    audio: dAudio('dora'), // TODO: Agregar audio de "Dora"
    isProperNoun: true,
  },
  {
    word: 'dado',
    image: dImage('dado'),
    audio: dAudio('dado'), // TODO: Agregar audio de "dado"
  },
  {
    word: 'dormir',
    image: dImage('dormir'),
    audio: dAudio('dormir'), // TODO: Agregar audio de "dormir"
  },
]

export const dSentenceCompletion = [
  {
    sentence: '___ pasea con la dama.',
    options: ['Dina', 'dina'],
    answer: 'Dina',
  },
  {
    sentence: '___ dona se ve deliciosa.',
    options: ['La', 'la'],
    answer: 'La',
  },
  {
    sentence: '___ los dados de Danilo.',
    options: ['Dame', 'dame'],
    answer: 'Dame',
  },
]

export const dWordImageMatch = ['dona', 'dado', 'dedo', 'dulce'].map(
  (word) => ({
    word,
    audio: dAudio(word), // TODO: Agregar audio correspondiente
    answerImage: dImage(word),
    options: ['dona', 'dado', 'dedo', 'dulce'].map((option) => ({
      name: option,
      image: dImage(option),
    })),
  }),
)
