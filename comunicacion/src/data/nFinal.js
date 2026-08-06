export const nPracticeWords = [
  {
    id: 'nati',
    word: 'Nati',
    image: '/images/lecciones/n/nena.png', // TODO: Agregar imagen definitiva de Nati
    audio: null, // TODO: agregar audio_nati.mp3
    isProperNoun: true,
  },
  {
    id: 'nene',
    word: 'nene',
    image: '/images/lecciones/n/nene.png', // TODO: Agregar imagen de un nene
    audio: null, // TODO: agregar audio_nene.mp3
  },
  {
    id: 'nina',
    word: 'niña',
    image: '/images/lecciones/n/nina.png', // TODO: Agregar imagen de una niña
    audio: null, // TODO: agregar audio_nina.mp3
  },
  {
    id: 'mono',
    word: 'mono',
    image: '/images/lecciones/n/mono.png', // TODO: Agregar imagen de un mono
    audio: null, // TODO: agregar audio_mono.mp3
  },
  {
    id: 'mano',
    word: 'mano',
    image: '/images/lecciones/n/mano.png', // TODO: Agregar imagen de una mano
    audio: null, // TODO: agregar audio_mano.mp3
  },
  {
    id: 'pino',
    word: 'pino',
    image: '/images/lecciones/n/pino.png', // TODO: Agregar imagen de un pino
    audio: null, // TODO: agregar audio_pino.mp3
  },
]

export const nSentenceChoice = [
  {
    id: 'nati-nube',
    image: '/images/lecciones/n/nati-nube.png', // TODO: Agregar imagen de Nati mirando una nube
    imageAlt: 'Nati mira una nube',
    answer: 'Nati mira una nube.',
    options: [
      'Nati mira una nube.',
      'Nati toma una naranja.',
      'Nati tiene una nave.',
    ],
    sentenceAudio: null, // TODO: agregar audio_oracion_nati_nube.mp3
  },
  {
    id: 'mono-mano',
    image: '/images/lecciones/n/mono-mano.png', // TODO: Agregar imagen de un mono en una mano
    imageAlt: 'Un mono está en una mano',
    answer: 'El mono está en la mano.',
    options: [
      'El mono está en la mano.',
      'La nube está en el pino.',
      'El nene mira una nave.',
    ],
    sentenceAudio: null, // TODO: agregar audio_oracion_mono_mano.mp3
  },
  {
    id: 'pino-sano',
    image: '/images/lecciones/n/pino-sano.png', // TODO: Agregar imagen de un pino sano
    imageAlt: 'Un pino sano',
    answer: 'El pino está sano.',
    options: [
      'El pino está sano.',
      'Nati mira la naranja.',
      'El nene toma pan.',
    ],
    sentenceAudio: null, // TODO: agregar audio_oracion_pino_sano.mp3
  },
]

export const nSentenceImageMatch = [
  {
    id: 'match-nati',
    sentence: 'Nati toma una naranja.',
    audio: null, // TODO: agregar audio_oracion_nati_naranja.mp3
    answerImage: '/images/lecciones/n/nati-naranja.png', // TODO: Agregar imagen correcta de Nati con una naranja
    options: [
      {
        name: 'Nati con una naranja',
        image: '/images/lecciones/n/nati-naranja.png', // TODO: Agregar imagen de Nati con una naranja
      },
      {
        name: 'Nati con una nave',
        image: '/images/lecciones/n/nati-nave.png', // TODO: Agregar imagen de Nati con una nave
      },
      {
        name: 'Nati con una nube',
        image: '/images/lecciones/n/nati-nube.png', // TODO: Agregar imagen de Nati con una nube
      },
    ],
  },
  {
    id: 'match-nene',
    sentence: 'El nene mira la nave.',
    audio: null, // TODO: agregar audio_oracion_nene_nave.mp3
    answerImage: '/images/lecciones/n/nene-nave.png', // TODO: Agregar imagen correcta de un nene mirando una nave
    options: [
      {
        name: 'Nene mirando una nave',
        image: '/images/lecciones/n/nene-nave.png', // TODO: Agregar imagen de un nene mirando una nave
      },
      {
        name: 'Nene mirando un nido',
        image: '/images/lecciones/n/nene-nido.png', // TODO: Agregar imagen de un nene mirando un nido
      },
      {
        name: 'Nene mirando una nube',
        image: '/images/lecciones/n/nene-nube.png', // TODO: Agregar imagen de un nene mirando una nube
      },
    ],
  },
  {
    id: 'match-mano',
    sentence: 'La mano toca el piano.',
    audio: null, // TODO: agregar audio_oracion_mano_piano.mp3
    answerImage: '/images/lecciones/n/mano-piano.png', // TODO: Agregar imagen correcta de una mano tocando piano
    options: [
      {
        name: 'Mano tocando piano',
        image: '/images/lecciones/n/mano-piano.png', // TODO: Agregar imagen de una mano tocando piano
      },
      {
        name: 'Mano con pan',
        image: '/images/lecciones/n/mano-pan.png', // TODO: Agregar imagen de una mano con pan
      },
      {
        name: 'Mano con pino',
        image: '/images/lecciones/n/mano-pino.png', // TODO: Agregar imagen de una mano con pino
      },
    ],
  },
]
