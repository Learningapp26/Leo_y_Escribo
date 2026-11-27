// Contenido de la lección S 

const sImage = (name) => `/images/lecciones/s/${name}.png`

export const sReading = {
  title: 'El sapo que sopló más',
  paragraphs: [
    'Hubo una vez un sapo pequeño que era muy presumido. Cerca de él vivía un sapo más grande. El sapo pequeño siempre lo molestaba. ¡A cada rato le decía que él era mejor en todo! Un día, el sapo grande, cansado de escucharlo, le propuso una competencia.',
    '—Veamos quién sopla más. —Le dijo.',
    '—Te ganaré. —Respondió el sapo pequeño. Aunque sopló y sopló, el sapo grande infló más rápido su globo y ganó.',
    'El sapo pequeño aprendió que no es bueno ser presumido. Desde ese día dejó de molestar al sapo grande.',
  ],
  image: '/images/lecciones/s/sapos-globos.png',
  imageAlt: 'Dos sapos inflan globos durante una competencia junto a un lago.',
}

export const sComprehensionQuestions = [
  '¿Cuál es el título de la fábula?',
  '¿Qué competencia hicieron los sapos?',
  '¿Quién ganó la competencia?',
  '¿Qué aprendió el sapo pequeño?',
]

// ============================================================
// ACTIVIDAD 1 — SONIDOS

export const sSoundStartChoices = [
  {
    id: 'sapo',
    word: 'sapo',
    image: '/images/lecciones/s/sapo.png',
    startsWithS: true,
  },
  {
    id: 'sombrero',
    word: 'sombrero',
    image: '/images/lecciones/s/sombrero.png',
    startsWithS: true,
  },
  {
    id: 'silla',
    word: 'silla',
    image: '/images/lecciones/s/silla.png',
    startsWithS: true,
  },
  {
    id: 'luna',
    word: 'luna',
    image: '/images/lecciones/l/luna.png',
    startsWithS: false,
  },
    {
    id: 'sandia',
    word: 'sandía',
    image: '/images/lecciones/s/sandia.png',
    startsWithS: true,
  },
]

export const sSoundEndChoices = [
  {
    id: 'sapos',
    word: 'sapos',
    image: '/images/lecciones/s/sapos.png',
    endsWithS: true,
  },
  {
    id: 'olas',
    word: 'olas',
    image: '/images/lecciones/l/ola.png',
    endsWithS: true,
  },
  {
    id: 'perro',
    word: 'perro',
    image: '/images/lecciones/s/perro.png',
    endsWithS: false,
  },
  {
    id: 'mano',
    word: 'mano',
    image: '/images/lecciones/m/mano.png',
    endsWithS: false,
  },

    {
    id: 'pollos',
    word: 'pollos',
    image: '/images/lecciones/s/pollos.png',
    endsWithS: true,
  },
]

// ============================================================
// ACTIVIDAD 2 — SÍLABAS 

export const sSyllables = ['sa', 'se', 'si', 'so', 'su']

// Fase 1: conocer la letra S y tocar cada combinación
export const sLetterPresentation = {
  combinations: sSyllables.map((syllable) => ({ syllable })),
}

// Fase 2 (página 22): leer las palabras que acompañan a cada imagen
export const sReadWords = [
  { id: 'sol', word: 'sol', image: sImage('sol') },
  { id: 'seda', word: 'seda', image: sImage('seda') },
  { id: 'sillon', word: 'sillón', image: sImage('sillon') },
  { id: 'suma', word: 'suma', image: sImage('suma') },
]

// Fase 3 (página 22): en el libro se encierra en un círculo la sílaba
// en cada fila. Aquí se tocan las palabras de la fila que la contienen.
export const sSyllableSearch = [
  {
    target: 'sa',
    words: ['sisa', 'sola', 'masa', 'losa'],
    answers: ['sisa', 'masa', 'losa'],
  },
  {
    target: 'so',
    words: ['oso', 'seso', 'osa', 'liso'],
    answers: ['oso', 'seso', 'liso'],
  },
  {
    target: 'su',
    words: ['maso', 'suma', 'suelo', 'musa'],
    answers: ['suma', 'suelo'],
  },
  {
    target: 'se',
    words: ['meses', 'museo', 'sola', 'aseo'],
    answers: ['meses', 'museo', 'aseo'],
  },
  {
    target: 'si',
    words: ['silo', 'simio', 'misa', 'sala'],
    answers: ['silo', 'simio'],
  },
]

// Fase 4: nombrar el dibujo y elegir la sílaba con S
export const sSyllableImages = [
  { id: 'sapo', word: 'sapo', image: sImage('sapo'), answer: 'sa' },
  { id: 'sello', word: 'sello', image: sImage('sello'), answer: 'se' },
  { id: 'casa', word: 'casa', image: sImage('casa'), answer: 'sa' },
  { id: 'silla', word: 'silla', image: sImage('silla'), answer: 'si' },
  { id: 'camisa', word: 'camisa', image: sImage('camisa'), answer: 'sa' },
]

// ============================================================
// ACTIVIDAD 3 — FORMAMOS PALABRAS (página 23)

// Fase 1: formar palabras uniendo dos sílabas
export const sWordBuilding = [
  {
    id: 'sala',
    word: 'sala',
    options: ['sa', 'la', 'a'],
  },
  {
    id: 'masa',
    word: 'masa',
    options: ['ma', 'sa', 'la'],
  },
  {
    id: 'suma',
    word: 'suma',
    options: ['su', 'lu', 'ma'],
  },
]

// Fase 2 (página 23): en el libro se quita la letra del cuadro rojo
// y se escribe la nueva palabra. Aquí se elige la palabra que queda.
export const sLetterRemoval = [
  {
    id: 'sala-sal',
    letters: ['s', 'a', 'l', 'a'],
    removeIndex: 3,
    answer: 'sal',
    options: ['sal', 'ala', 'sol'],
  },
  {
    id: 'sola-ola',
    letters: ['s', 'o', 'l', 'a'],
    removeIndex: 0,
    answer: 'ola',
    options: ['ola', 'sal', 'sol'],
  },
  {
    id: 'masa-mas',
    letters: ['m', 'a', 's', 'a'],
    removeIndex: 3,
    answer: 'mas',
    options: ['mas', 'ama', 'sal'],
  },
  {
    id: 'solo-sol',
    letters: ['s', 'o', 'l', 'o'],
    removeIndex: 3,
    answer: 'sol',
    options: ['sol', 'oso', 'sal'],
  },
]

// ============================================================
// ACTIVIDAD FINAL (página 24)


// Fase 1: tocar el nombre propio de una oración
export const sProperNounExercise = {
  id: 'susi',
  sentence: 'Susi usa la mesa.',
  prompt: 'Lee la oración y toca el nombre propio.',
  options: ['Susi', 'usa', 'mesa'],
  answer: 'Susi',
}

// Fases 2 y 3: oraciones del libro. La más larga es la de 7 palabras.
export const sSentences = [
  {
    id: 'mi-sapo',
    sentence: 'Mi sapo sale solo.',
    words: ['Mi', 'sapo', 'sale', 'solo.'],
    options: [3, 4, 5],
  },
  {
    id: 'susi-mesa',
    sentence: 'Susi usa la mesa.',
    words: ['Susi', 'usa', 'la', 'mesa.'],
    options: [3, 4, 5],
  },
  {
    id: 'mula-loma',
    sentence: 'La mula se asoma a la loma.',
    words: ['La', 'mula', 'se', 'asoma', 'a', 'la', 'loma.'],
    options: [5, 6, 7],
  },
]

export const sLongestSentenceId = 'mula-loma'

// Imágenes que hay que agregar en public/images/lecciones/s/ :
// sapo, sello, casa, silla, oso, camisa, sol, seda, sillon, suma,
// sal, susi, sala, sale (.png), además de sapos-globos.png (ya existe).