// Página 17 (actividad 1): completar la palabra con la sílaba que falta.
export const lSyllableOptions = ['la', 'le', 'li', 'lo', 'lu']

export const lWordCompletion = [
  {
    id: 'luna',
    word: 'luna',
    pattern: '___na',
    image: '/images/lecciones/l/luna.png',
    audio: '/audio/lecciones/l/luna.mp3',
    answer: 'lu',
  },
  {
    id: 'leon',
    word: 'león',
    pattern: '___ón',
    image: '/images/lecciones/l/leon.png',
    audio: '/audio/lecciones/l/leon.mp3',
    answer: 'le',
  },
  {
    id: 'libro',
    word: 'libro',
    pattern: '___bro',
    image: '/images/lecciones/l/libro.png',
    audio: '/audio/lecciones/l/libro.mp3',
    answer: 'li',
  },
  {
    id: 'loro',
    word: 'loro',
    pattern: '___ro',
    image: '/images/lecciones/l/loro.png',
    audio: '/audio/lecciones/l/loro.mp3',
    answer: 'lo',
  },
]

// Página 17 (actividad 2): unir sílabas para formar palabras.
export const lSyllableJoin = [
  {
    id: 'lu-na',
    first: { id: 'lu', syllable: 'lu' },
    second: { id: 'na', syllable: 'na' },
    word: 'luna',
    wordAudio: '/audio/lecciones/l/luna.mp3',
  },
  {
    id: 'le-on',
    first: { id: 'le', syllable: 'le' },
    second: { id: 'ón', syllable: 'ón' },
    word: 'león',
    wordAudio: '/audio/lecciones/l/leon.mp3',
  },
  {
    id: 'li-bro',
    first: { id: 'li', syllable: 'li' },
    second: { id: 'bro', syllable: 'bro' },
    word: 'libro',
    wordAudio: '/audio/lecciones/l/libro.mp3',
  },
  {
    id: 'lo-ro',
    first: { id: 'lo', syllable: 'lo' },
    second: { id: 'ro', syllable: 'ro' },
    word: 'loro',
    wordAudio: '/audio/lecciones/l/loro.mp3',
  },
]
