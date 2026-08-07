export const lSoundIntro = {
  mainWord: {
    name: 'luna',
    image: '/images/lecciones/l/luna.png',
    audio: '/audio/lecciones/l/luna.mp3',
  },
  soundAudio: '/audio/lecciones/l/sonido-l.mp3',
  exampleWords: [
    {
      id: 'lana',
      name: 'lana',
      image: '/images/lecciones/l/lana.png',
      audio: '/audio/lecciones/l/lana.mp3',
    },
    {
      id: 'linterna',
      name: 'linterna',
      image: '/images/lecciones/l/linterna.png',
      audio: '/audio/lecciones/l/linterna.mp3',
    },
    {
      id: 'lapiz',
      name: 'lápiz',
      image: '/images/lecciones/l/lapiz.png',
      audio: '/audio/lecciones/l/lapiz.mp3',
    },
  ],
}

// Se reutiliza en la selección de imágenes que inician con /l/
// y en la actividad de unir imágenes por sonido inicial parecido.
// Basado en la página 14: marcar qué figuras empiezan con el sonido de "luna".
export const lImagePool = [
  {
    id: 'luna',
    name: 'luna',
    image: '/images/lecciones/l/luna.png',
    audio: '/audio/lecciones/l/luna.mp3',
    startsWithL: true,
  },
  {
    id: 'lana',
    name: 'lana',
    image: '/images/lecciones/l/lana.png',
    audio: '/audio/lecciones/l/lana.mp3',
    startsWithL: true,
  },
  {
    id: 'linterna',
    name: 'linterna',
    image: '/images/lecciones/l/linterna.png',
    audio: '/audio/lecciones/l/linterna.mp3',
    startsWithL: true,
  },
  {
    id: 'lapiz',
    name: 'lápiz',
    image: '/images/lecciones/l/lapiz.png',
    audio: '/audio/lecciones/l/lapiz.mp3',
    startsWithL: true,
  },
  {
    id: 'zapato',
    name: 'zapato',
    image: '/images/lecciones/l/zapato.png',
    audio: '/audio/lecciones/l/zapato.mp3',
    startsWithL: false,
  },
]

// Página 14 (última actividad): unir las figuras que tengan los primeros
// dos sonidos iguales. Cada par comparte "pairId"; las que no tienen pareja
// en esta actividad usan su propio id como pairId para que nunca encajen.
export const lSoundPairMatching = {
  instructionAudio: '/audio/lecciones/l/instruccion-unir-sonidos.mp3',
  example: { firstId: 'luna', secondId: 'lupa' },
  items: [
    {
      id: 'luna',
      name: 'luna',
      image: '/images/lecciones/l/luna.png',
      audio: '/audio/lecciones/l/luna.mp3',
      pairId: 'lu',
    },
    {
      id: 'limon',
      name: 'limón',
      image: '/images/lecciones/l/limon.png',
      audio: '/audio/lecciones/m/limon.mp3',
      pairId: 'li',
    },
    {
      id: 'cuerda',
      name: 'cuerda',
      image: '/images/lecciones/l/cuerda.png',
      audio: '/audio/lecciones/l/cuerda.mp3',
      pairId: 'cuerda',
    },
    {
      id: 'lobo',
      name: 'lobo',
      image: '/images/lecciones/l/lobo.png',
      audio: '/audio/lecciones/l/lobo.mp3',
      pairId: 'lo',
    },
    {
      id: 'lechuga',
      name: 'lechuga',
      image: '/images/lecciones/l/lechuga.png',
      audio: '/audio/lecciones/l/lechuga.mp3',
      pairId: 'le',
    },
    {
      id: 'loro',
      name: 'loro',
      image: '/images/lecciones/l/loro.png',
      audio: '/audio/lecciones/l/loro.mp3',
      pairId: 'lo',
    },
    {
      id: 'ladrillo',
      name: 'ladrillo',
      image: '/images/lecciones/l/ladrillo.png',
      audio: '/audio/lecciones/l/ladrillo.mp3',
      pairId: 'ladrillo',
    },
    {
      id: 'lengua',
      name: 'lengua',
      image: '/images/lecciones/l/lengua.png',
      audio: '/audio/lecciones/l/lengua.mp3',
      pairId: 'le',
    },
    {
      id: 'lima',
      name: 'lima',
      image: '/images/lecciones/l/lima.png',
      audio: '/audio/lecciones/l/lima.mp3',
      pairId: 'li',
    },
    {
      id: 'lupa',
      name: 'lupa',
      image: '/images/lecciones/l/lupa.png',
      audio: '/audio/lecciones/l/lupa.mp3',
      pairId: 'lu',
    },
  ],
}
