export const nSoundIntro = {
  mainWord: {
    name: 'nena',
    image: '/images/lecciones/n/nena.png',
    audio: null, // TODO: agregar audio_nena.mp3
  },
  soundAudio: null, // TODO: agregar audio del sonido /n/
  exampleWords: [
    {
      id: 'nena',
      name: 'nena',
      image: '/images/lecciones/n/nena.png',
      audio: null, // TODO: agregar audio_nena.mp3
    },
    {
      id: 'nene',
      name: 'nene',
      image: '/images/lecciones/n/nene.png',
      audio: null, // TODO: agregar audio_nene.mp3
    },
    {
      id: 'nati',
      name: 'Nati',
      image: '/images/lecciones/n/nati.png',
      audio: null, // TODO: agregar audio_nati.mp3
    },
  ],
}

export const nImagePool = [
  {
    id: 'nena',
    name: 'nena',
    image: '/images/lecciones/n/nena.png',
    audio: null, // TODO: agregar audio_nena.mp3
    startsWithN: true,
  },
  {
    id: 'nene',
    name: 'nene',
    image: '/images/lecciones/n/nene.png',
    audio: null, // TODO: agregar audio_nene.mp3
    startsWithN: true,
  },
  {
    id: 'nati',
    name: 'Nati',
    image: '/images/lecciones/n/nati.png',
    audio: null, // TODO: agregar audio_nati.mp3
    startsWithN: true,
  },
  {
    id: 'pino',
    name: 'pino',
    image: '/images/lecciones/n/pino.png',
    audio: null, // TODO: agregar audio_pino.mp3
    startsWithN: false,
  },
  {
    id: 'mono',
    name: 'mono',
    image: '/images/lecciones/n/mono.png',
    audio: null, // TODO: agregar audio_mono.mp3
    startsWithN: false,
  },
  {
    id: 'mano',
    name: 'mano',
    image: '/images/lecciones/n/mano.png',
    audio: null, // TODO: agregar audio_mano.mp3
    startsWithN: false,
  },
]

export const nInitialPairMatching = {
  instructionAudio: null, // TODO: agregar audio de instruccion
  items: nImagePool,
}

export const nFinalPairMatching = {
  instructionAudio: null, // TODO: agregar audio de instruccion
  items: [
    {
      id: 'camion',
      name: 'camión',
      image: '/images/lecciones/n/camion.png', 
      audio: null, // TODO: agregar audio_camion.mp3
      pairId: 'on',
    },
    {
      id: 'porton',
      name: 'portón',
      image: '/images/lecciones/n/porton.png',
      audio: null, // TODO: agregar audio_porton.mp3
      pairId: 'on',
    },
    {
      id: 'sarten',
      name: 'sartén',
      image: '/images/lecciones/n/sarten.png', 
      audio: null, // TODO: agregar audio_sarten.mp3
      pairId: 'en',
    },
    {
      id: 'tren',
      name: 'tren',
      image: '/images/lecciones/n/tren.png', 
      audio: null, // TODO: agregar audio_tren.mp3
      pairId: 'en',
    },
    {
      id: 'pan',
      name: 'pan',
      image: '/images/lecciones/n/pan.png', 
      audio: null, // TODO: agregar audio_pan.mp3
      pairId: 'an',
    },
    {
      id: 'iman',
      name: 'imán',
      image: '/images/lecciones/n/iman.png', 
      audio: null, // TODO: agregar audio_iman.mp3
      pairId: 'an',
    },
    {
      id: 'raton',
      name: 'ratón',
      image: '/images/lecciones/n/raton.png', 
      audio: null, // TODO: agregar audio_raton.mp3
      pairId: 'on-2',
    },
    {
      id: 'corazon',
      name: 'corazón',
      image: '/images/lecciones/n/corazon.png', 
      audio: null, // TODO: agregar audio_corazon.mp3
      pairId: 'on-2',
    },
  ],
}
