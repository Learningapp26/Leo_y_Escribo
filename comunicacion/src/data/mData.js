// Para la parte del cuento
export const mReading = {
  title: '¡Te amo, mamá!',
  paragraphs: [
    'Estaba una mamá bajo la sombra de una palmera, cuando su hijo se le acercó y le dijo:',
    '-Mamá, ¿sabes algo?',
    '-Dime. -Respondió ella.',
    '-Tengo algo escondido entre mis',
    'brazos.',
    '-¿Qué es lo que tienes? -Preguntó.',
    '-Es algo para ti. ¿Quieres que te lo dé?',
    '-¡Claro que sí! -Contestó la mamá emocionada.',
    '-Bueno, primero cierra los ojos.',
    'La mamá cerró sus ojos y de repente sintió el calor de un tierno',
    'abrazo.',
    '-¡Ya te lo di!... -¿Te gustó?... -Era un abrazo con todo mi amor.',
    '-Gracias, yo también te amo.',
  ],
  image: '/images/lecciones/m/te-amo-mama.png',
  imageAlt: 'Una madre abrazando a su hijo',
  instructionAudio: '/audio/lecciones/m/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/m/te-amo-mama.mp3',
}

// Preguntas
export const MComprehensionQuestions = [
  '¿De qué trata la historia?',
  '¿Qué tenía escondido el niño? ¿Cómo es un tierno abrazo?',
  '¿Qué te gustaría regalarle a tu mamá? ¿Por qué?',
  '¿Qué cosas te emocionan?',
]

// Para audio e imagen de la actividad de reconocer sonidos

// Fase 1: solo escuchar la palabra mamá y el sonido /m/
export const mSoundIntro = {
  mainWord: {
    name: 'mamá',
    image: '/images/lecciones/m/mama.png',
    audio: '/audio/lecciones/m/mama.mp3',
  },
  soundAudio: '/audio/lecciones/m/sonido-m.mp3',
}

// Fase 2 y 3: seleccionar / emparejar imágenes que empiecen con el sonido /m/
export const mImagePool = [
  {
    id: 'mama',
    name: 'mamá',
    image: '/images/lecciones/m/mama.png',
    audio: '/audio/lecciones/m/mama.mp3',
    startsWithM: true,
  },
  {
    id: 'mano',
    name: 'mano',
    image: '/images/lecciones/m/mano.png',
    audio: '/audio/lecciones/m/mano.mp3',
    startsWithM: true,
  },
  {
    id: 'mariposa',
    name: 'mariposa',
    image: '/images/lecciones/m/mariposa.png',
    audio: '/audio/lecciones/m/mariposa.mp3',
    startsWithM: true,
  },
  {
    id: 'miel',
    name: 'miel',
    image: '/images/lecciones/m/miel.png',
    audio: '/audio/lecciones/m/miel.mp3',
    startsWithM: true,
  },
  {
    id: 'gallina',
    name: 'gallina',
    image: '/images/lecciones/m/gallina.png',
    audio: '/audio/lecciones/m/gallina.mp3',
    startsWithM: false,
  },
]

// Fase 4: tocar las figuras que contengan el sonido /m/ en cualquier parte
// es selección múltiple contra "containsM")
export const mSoundMatching = {
  instructionAudio: '/audio/lecciones/m/instruccion-parejas.mp3',
  items: [
    {
      id: 'limon',
      name: 'limón',
      image: '/images/lecciones/m/limon.png',
      audio: '/audio/lecciones/m/limon.mp3',
      containsM: true,
    },
    {
      id: 'bolsa',
      name: 'bolsa',
      image: '/images/lecciones/m/bolsa.png',
      audio: '/audio/lecciones/m/bolsa.mp3',
      containsM: false,
    },
    {
      id: 'mosca',
      name: 'mosca',
      image: '/images/lecciones/m/mosca.png',
      audio: '/audio/lecciones/m/mosca.mp3',
      containsM: true,
    },
    {
      id: 'rama',
      name: 'rama',
      image: '/images/lecciones/m/rama.png',
      audio: '/audio/lecciones/m/rama.mp3',
      containsM: true,
    },
    {
      id: 'mango',
      name: 'mango',
      image: '/images/lecciones/m/mango.png',
      audio: '/audio/lecciones/m/mango.mp3',
      containsM: true,
    },
    {
      id: 'gato',
      name: 'gato',
      image: '/images/lecciones/m/gato.png',
      audio: '/audio/lecciones/m/gato.mp3',
      containsM: false,
    },
    {
      id: 'pera',
      name: 'pera',
      image: '/images/lecciones/m/pera.png',
      audio: '/audio/lecciones/m/pera.mp3',
      containsM: false,
    },
    {
      id: 'pluma',
      name: 'pluma',
      image: '/images/lecciones/m/pluma.png',
      audio: '/audio/lecciones/m/pluma.mp3',
      containsM: true,
    },
    {
      id: 'cama',
      name: 'cama',
      image: '/images/lecciones/m/cama.png',
      audio: '/audio/lecciones/m/cama.mp3',
      containsM: true,
    },
  ],
}