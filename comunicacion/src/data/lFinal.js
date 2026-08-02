// Página 18 (actividad 1): practicar la lectura de palabras con L.
// "lila" no usa imagen: se muestra como un círculo de color, igual que en el libro.
export const lPracticeWords = [
  {
    id: 'loma',
    word: 'loma',
    image: '/images/lecciones/l/loma.png',
    audio: '/audio/lecciones/l/loma.mp3',
  },
  {
    id: 'lila',
    word: 'lila',
    color: '#c9a7e0',
    audio: '/audio/lecciones/l/lila.mp3',
  },
  {
    id: 'ola',
    word: 'ola',
    image: '/images/lecciones/l/ola.png',
    audio: '/audio/lecciones/l/ola.mp3',
  },
  {
    id: 'ala',
    word: 'ala',
    image: '/images/lecciones/l/ala.png',
    audio: '/audio/lecciones/l/ala.mp3',
  },
  {
    id: 'mula',
    word: 'mula',
    image: '/images/lecciones/l/mula.png',
    audio: '/audio/lecciones/l/mula.mp3',
  },
  {
    id: 'lalo',
    word: 'Lalo',
    image: '/images/lecciones/l/lalo.png',
    audio: '/audio/lecciones/l/lalo.mp3',
    isProperNoun: true,
  },
]

// Página 18 (actividad 2): completar oraciones con imágenes.
export const lSentenceCompletion = [
  {
    id: 'lulu-hoja',
    sentence: 'Lulu lee la ___.',
    sentenceAudio: '/audio/lecciones/l/oracion-lulu-hoja.mp3',
    answer: 'hoja',
    options: [
      { name: 'hoja', image: '/images/lecciones/l/hoja.png' },
      { name: 'lápiz', image: '/images/lecciones/l/lapiz.png' },
      { name: 'zapato', image: '/images/lecciones/l/zapato.png' },
    ],
  },
  {
    id: 'lalo-ventana',
    sentence: 'Lalo limpia la ___.',
    sentenceAudio: '/audio/lecciones/l/oracion-lalo-ventana.mp3',
    answer: 'ventana',
    options: [
      { name: 'ventana', image: '/images/lecciones/l/ventana.png' },
      { name: 'zapato', image: '/images/lecciones/l/zapato.png' },
      { name: 'luna', image: '/images/lecciones/l/luna.png' },
    ],
  },
  {
    id: 'meme-lima',
    sentence: 'Meme corta la ___.',
    sentenceAudio: '/audio/lecciones/l/oracion-meme-lima.mp3',
    answer: 'lima',
    options: [
      { name: 'lima', image: '/images/lecciones/l/lima.png' },
      { name: 'luna', image: '/images/lecciones/l/luna.png' },
      { name: 'lana', image: '/images/lecciones/l/lana.png' },
    ],
  },
  {
    id: 'lili-paleta',
    sentence: 'Lili lame la ___.',
    sentenceAudio: '/audio/lecciones/l/oracion-lili-paleta.mp3',
    answer: 'paleta',
    options: [
      { name: 'paleta', image: '/images/lecciones/l/paleta.png' },
      { name: 'linterna', image: '/images/lecciones/l/linterna.png' },
      { name: 'lápiz', image: '/images/lecciones/l/lapiz.png' },
    ],
  },
]

// Página 18 (actividad 2, continuación): contar palabras en cada oración.
// Cada figura de la oración también se cuenta como una palabra.
export const lWordCounting = [
  {
    id: 'lulu-hoja',
    words: ['Lulu', 'lee', 'la', 'hoja'],
    audio: '/audio/lecciones/l/contar-lulu-hoja.mp3',
    answer: 4,
    options: [3, 4, 5],
  },
  {
    id: 'lalo-ventana',
    words: ['Lalo', 'limpia', 'la', 'ventana'],
    audio: '/audio/lecciones/l/contar-lalo-ventana.mp3',
    answer: 4,
    options: [3, 4, 5],
  },
  {
    id: 'meme-lima',
    words: ['Meme', 'corta', 'la', 'lima'],
    audio: '/audio/lecciones/l/contar-meme-lima.mp3',
    answer: 4,
    options: [3, 4, 5],
  },
  {
    id: 'lili-paleta',
    words: ['Lili', 'lame', 'la', 'paleta'],
    audio: '/audio/lecciones/l/contar-lili-paleta.mp3',
    answer: 4,
    options: [3, 4, 5],
  },
]

// Página 18 (actividad 3): relacionar palabra con imagen.
export const lWordImageMatch = [
  {
    id: 'match-luna',
    word: 'luna',
    audio: '/audio/lecciones/l/luna.mp3',
    answerImage: '/images/lecciones/l/luna.png',
    options: [
      { name: 'luna', image: '/images/lecciones/l/luna.png' },
      { name: 'lana', image: '/images/lecciones/l/lana.png' },
      { name: 'zapato', image: '/images/lecciones/l/zapato.png' },
    ],
  },
  {
    id: 'match-lana',
    word: 'lana',
    audio: '/audio/lecciones/l/lana.mp3',
    answerImage: '/images/lecciones/l/lana.png',
    options: [
      { name: 'lana', image: '/images/lecciones/l/lana.png' },
      { name: 'linterna', image: '/images/lecciones/l/linterna.png' },
      { name: 'luna', image: '/images/lecciones/l/luna.png' },
    ],
  },
  {
    id: 'match-linterna',
    word: 'linterna',
    audio: '/audio/lecciones/l/linterna.mp3',
    answerImage: '/images/lecciones/l/linterna.png',
    options: [
      { name: 'linterna', image: '/images/lecciones/l/linterna.png' },
      { name: 'lápiz', image: '/images/lecciones/l/lapiz.png' },
      { name: 'zapato', image: '/images/lecciones/l/zapato.png' },
    ],
  },
]
