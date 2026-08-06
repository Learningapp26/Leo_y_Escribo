export const nSoundIntro = {
  mainWord: {
    name: 'nariz',
    image: '/images/lecciones/n/nariz.png', 
    audio: null, // TODO: agregar audio_nariz.mp3
  },
  soundAudio: null, // TODO: agregar audio del sonido /n/
  exampleWords: [
    {
      id: 'nido',
      name: 'nido',
      image: '/images/lecciones/n/nido.png', 
      audio: null, // TODO: agregar audio_nido.mp3
    },
    {
      id: 'nave',
      name: 'nave',
      image: '/images/lecciones/n/nave.png', 
      audio: null, // TODO: agregar audio_nave.mp3
    },
    {
      id: 'nudo',
      name: 'nudo',
      image: '/images/lecciones/n/nudo.png', 
      audio: null, // TODO: agregar audio_nudo.mp3
    },
  ],
}

export const nImagePool = [
  {
    id: 'nido',
    name: 'nido',
    image: '/images/lecciones/n/nido.png', 
    audio: null, // TODO: agregar audio_nido.mp3
    startsWithN: true,
  },
  {
    id: 'nave',
    name: 'nave',
    image: '/images/lecciones/n/nave.png', 
    audio: null, // TODO: agregar audio_nave.mp3
    startsWithN: true,
  },
  {
    id: 'nudo',
    name: 'nudo',
    image: '/images/lecciones/n/nudo.png', 
    audio: null, // TODO: agregar audio_nudo.mp3
    startsWithN: true,
  },
  {
    id: 'nariz',
    name: 'nariz',
    image: '/images/lecciones/n/nariz.png', 
    audio: null, // TODO: agregar audio_nariz.mp3
    startsWithN: true,
  },
  {
    id: 'carro',
    name: 'carro',
    image: '/images/lecciones/n/carro.png', 
    audio: null, // TODO: agregar audio_carro.mp3
    startsWithN: false,
  },
  {
    id: 'cuerda',
    name: 'cuerda',
    image: '/images/lecciones/n/cuerda.png', 
    audio: null, // TODO: agregar audio_cuerda.mp3
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
