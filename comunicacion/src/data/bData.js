const bImage = (name) => `/images/lecciones/b/${name}.png`
const bAudio = (name) => `/audio/lecciones/b/${name}.mp3`

export const bReading = {
  title: 'Los bananos de Balú',
  paragraphs: [
    'Balú es el más pequeño de una familia de cinco monos.',
    'Un día, mientras Balú se balanceaba por las ramas de los árboles, encontró unos bananales. ¡Qué maravilla! ¡Qué montón de bananas! —pensó Balú.',
    '—No le diré a nadie, así los podré disfrutar yo solito —se dijo.',
    'Al día siguiente, su mamá llevó muchas moras para que comieran él y sus hermanos. Cuando la mamá quiso tomar una mora, ¡los monitos ya se las habían acabado! Balú le preguntó a su mamá:',
    '—¿Por qué no guardaste moras para ti?',
    '—Porque me gusta compartir con ustedes lo que encuentro. Luego buscaré más; por acá hay muchas —respondió.',
    'Balú se quedó pensando. Su mamá estaba feliz aunque no pudo comer moras. Entonces, Balú decidió hacer lo mismo con los bananos de su bananal.',
  ],
  image: bImage('lectura-bananos-balu'),
  imageAlt: 'Balú sentado en una rama con un banano en la mano, rodeado de bananales',
  instructionAudio: bAudio('instruccion-lectura'),
  readingAudio: bAudio('los-bananos-de-balu'),
}

export const bConversationInstructionAudio = bAudio('instruccion-conversemos')

export const bComprehensionQuestions = [
  '¿Cuál crees que es la comida favorita de los monos? ¿Por qué lo piensas?',
  '¿Qué encontró Balú? ¿Cómo es un bananal?',
  '¿Qué aprendió Balú del ejemplo de su mamá?',
  '¿Te gusta compartir tus cosas con las demás personas? ¿Por qué?',
]

export const bSoundIntro = {
  instructionAudio: bAudio('instruccion-sonido-b'),
  letterAudio: bAudio('letra-b'),
  mainWord: {
    name: 'banano',
    image: bImage('banano'),
    audio: bAudio('banano'),
  },
}

export const bInitialSelectionInstructionAudio = bAudio(
  'instruccion-seleccion-inicial-b',
)

export const bInitialSoundImages = [
  ['tomate', false],
  ['bicicleta', true],
  ['barco', true],
  ['bota', true],
].map(([name, startsWithB]) => ({
  id: name,
  name,
  image: bImage(name),
  audio: bAudio(name),
  startsWithB,
}))

export const bSoundSearchInstructionAudio = bAudio('instruccion-buscar-letra-b')

export const bSoundSearchImages = [
  ['globo', true],
  ['lobo', true],
  ['nube', true],
  ['escoba', true],
  ['abuelo', true],
  ['abeja', true],
  ['tomate', false],
  ['pastel', false],
].map(([name, hasB]) => ({
  id: name,
  name,
  image: bImage(name),
  audio: bAudio(name),
  hasB,
}))

export const bSyllableInstructionAudio = bAudio('instruccion-silabas-b')

export const bSyllables = ['bo', 'ba', 'be', 'bi', 'bu'].map((syllable) => ({
  syllable,
  audio: bAudio(`silaba-${syllable}`),
}))

export const bSyllableAssociationInstructionAudio = bAudio(
  'instruccion-asociar-silabas-b',
)

export const bSyllableAssociations = [
  ['banano', 'ba'],
  ['bota', 'bo'],
  ['bicicleta', 'bi'],
  ['bebe', 'be'],
  ['bus', 'bu'],
].map(([word, answer]) => ({
  id: word,
  word: word === 'bebe' ? 'bebé' : word,
  answer,
  image: bImage(word),
  audio: bAudio(word),
}))

export const bWordSyllableInstructionAudio = bAudio(
  'instruccion-silaba-en-palabra-b',
)

export const bWordSyllableExercises = [
  ['bate', 'ba'],
  ['boca', 'bo'],
  ['nube', 'be'],
  ['bisonte', 'bi'],
  ['buzo', 'bu'],
  ['buque', 'bu'],
  ['débil', 'bi'],
  ['beso', 'be'],
  ['bono', 'bo'],
  ['barba', 'ba'],
].map(([word, answer]) => ({ id: word, word, answer }))

export const bCompletionInstructionAudio = bAudio(
  'instruccion-completar-palabras-b',
)

export const bCompletionExercises = [
  ['burro', 'bu', 'rro'],
  ['barba', 'ba', 'rba'],
  ['bote', 'bo', 'te'],
  ['boca', 'bo', 'ca'],
  ['nabo', 'bo', 'na'],
  ['bebe', 'be', 'bé'],
].map(([fileName, answer, visiblePart]) => ({
  id: fileName,
  word: fileName === 'bebe' ? 'bebé' : fileName,
  answer,
  visiblePart,
  missingAtEnd: fileName === 'nabo',
  image: bImage(fileName),
  audio: bAudio(fileName),
}))

export const bJoinInstructionAudio = bAudio('instruccion-formar-palabras-b')

export const bJoinExercises = [
  ['boda', 'bo', 'da'],
  ['beso', 'be', 'so'],
  ['bota', 'bo', 'ta'],
].map(([word, firstSyllable, answer]) => ({
  id: word,
  word,
  firstSyllable,
  answer,
  options: ['da', 'so', 'ta'],
  image: bImage(word),
  audio: bAudio(word),
}))

export const bFinalWordsInstructionAudio = bAudio('instruccion-leer-palabras-b')

export const bFinalWords = [
  ['berta', 'Berta', true],
  ['boton', 'botón', false],
  ['lobo', 'lobo', false],
  ['tubos', 'tubos', false],
  ['banco', 'banco', false],
  ['bola', 'bola', false],
].map(([fileName, word, isProperNoun]) => ({
  word,
  isProperNoun,
  image: bImage(fileName),
  audio: bAudio(fileName),
}))

export const bSentenceInstructionAudio = bAudio('instruccion-oraciones-b')

export const bSentenceExercises = [
  {
    id: 'bota-rota',
    sentence: 'La ___ está rota.',
    answer: 'bota',
    sentenceAudio: bAudio('oracion-la-bota'),
    completedAudio: bAudio('la-bota-esta-rota'),
    options: ['bota', 'bola'],
  },
  {
    id: 'beti-banano',
    sentence: 'Beti se come el ___.',
    answer: 'banano',
    sentenceAudio: bAudio('oracion-beti-banano'),
    completedAudio: bAudio('beti-se-come-el-banano'),
    options: ['banano', 'boton'],
  },
  {
    id: 'barco-ola',
    sentence: 'El ___ sube la ola.',
    answer: 'barco',
    sentenceAudio: bAudio('oracion-el-barco'),
    completedAudio: bAudio('el-barco-sube-la-ola'),
    options: ['barco', 'banco'],
  },
].map((exercise) => ({
  ...exercise,
  options: exercise.options.map((name) => ({
    name: name === 'boton' ? 'botón' : name,
    value: name,
    image: bImage(name),
    audio: bAudio(name),
  })),
}))

export const bFinalCongratulationsAudio = bAudio('felicitacion-final')
