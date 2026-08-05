
// Para la parte del cuento
export const tReading = {
  title: 'El tamal perdido',
  paragraphs: [
    'La familia de Tomás preparaba la fiesta',
    'de cumpleaños para la abuelita Tita.',
    'A ella le encantaban los tamales. Así',
    'que la mamá de Tomás los cocinó.',
    'Hizo uno especial para la abuela.',
    'Cuando lo iba a servir, no lo encontró.',
    '¿Dónde coloqué el tamal? -Se',
    'preguntaba la mamá de Tomás.',
    'Todos empezaron a buscarlo, pero',
    'nadie lo encontró. La abuela Tita no',
    'logró contener más la risa y les dijo',
    'que el tamal especial ya estaba en',
    'su estómago. ¡No pudo aguantar las',
    'ganas y se lo comió antes de la fiesta!',
    'Al oírla, todos empezaron a reír.',
  ],
  image: '/images/lecciones/t/El-tamal-perdido.png',
  imageAlt: 'El tamal perdido',
  instructionAudio: '/audio/lecciones/t/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/t/El-tamal-perdido.mp3',
}

// Audio de instrucción para la actividad de ordenar las escenas
export const tOrderInstructionAudio =
  '/audio/lecciones/t/instruccion-ordenar-escenas.mp3'

// Opciones de número que puede recibir cada escena
export const tOrderOptions = ['1', '2', '3']

// Actividad de comprensión: ordenar las 3 escenas del cuento.
// Se muestran en un orden mezclado (2, 3, 1); el niño debe tocar el
// número correcto (1, 2 o 3) según el orden real de la historia.
export const tComprehensionQuestions = [
  {
    id: 'escena2',
    scene: '2',
    image: '/images/lecciones/t/escena2.png',
    answer: '2',
  },
  {
    id: 'escena3',
    scene: '3',
    image: '/images/lecciones/t/escena3.png',
    answer: '3',
  },
  {
    id: 'escena1',
    scene: '1',
    image: '/images/lecciones/t/escena1.png',
    answer: '1',
  },
]

// ============================================================
// ACTIVIDAD DE SONIDOS

// Fase 1: solo escuchar la palabra tamal y el sonido t
export const tSoundIntro = {
  instructionAudio: '/audio/lecciones/t/instruccion-sonido-t.mp3',
  mainWord: {
    name: 'tamal',
    image: '/images/lecciones/t/tamal.png',
    audio: '/audio/lecciones/t/tamal.mp3',
  },
  soundAudio: '/audio/lecciones/t/sonido-t.mp3',
}

// Audio de instrucción para la fase 2 
export const tSelectionInstructionAudio =
  '/audio/lecciones/t/instruccion-seleccion-t.mp3'

// Audio de instrucción para la fase 3
export const tPairsInstructionAudio =
  '/audio/lecciones/t/instruccion-parejas-inicio-t.mp3'

// Fase 2 y 3: seleccionar / emparejar imágenes que empiecen con el sonido /t/
export const tImagePool = [
  {
    id: 'tamal',
    name: 'tamal',
    image: '/images/lecciones/t/tamal.png',
    audio: '/audio/lecciones/t/tamal.mp3',
    startsWithT: true,
  },
  {
    id: 'tapadera',
    name: 'tapadera',
    image: '/images/lecciones/t/tapadera.png',
    audio: '/audio/lecciones/t/tapadera.mp3',
    startsWithT: true,
  },
  {
    id: 'pan',
    name: 'pan',
    image: '/images/lecciones/t/panFrances.png',
    audio: '/audio/lecciones/t/pan.mp3',
    startsWithT: false,
  },
  {
    id: 'tela',
    name: 'tela',
    image: '/images/lecciones/t/tela.png',
    audio: '/audio/lecciones/t/tela.mp3',
    startsWithT: true,
  },
  {
    id: 'tijera',
    name: 'tijera',
    image: '/images/lecciones/t/tijera.png',
    audio: '/audio/lecciones/t/tijera.mp3',
    startsWithT: true,
  },
]

// Fase 4: marcar las figuras que NO empiezan con el sonido /t/
export const tOddOneOut = {
  instructionAudio: '/audio/lecciones/t/instruccion-figura-diferente-t.mp3',
  items: [
    {
      id: 'tapete',
      name: 'tapete',
      image: '/images/lecciones/t/tapete.png',
      audio: '/audio/lecciones/t/tapete.mp3',
      startsWithT: true,
    },
    {
      id: 'tomate',
      name: 'tomate',
      image: '/images/lecciones/t/tomate.png',
      audio: '/audio/lecciones/t/tomate.mp3',
      startsWithT: true,
    },
    {
      id: 'arbol',
      name: 'árbol',
      image: '/images/lecciones/t/arbol.png',
      audio: '/audio/lecciones/t/arbol.mp3',
      startsWithT: false,
    },
    {
      id: 'gato',
      name: 'gato',
      image: '/images/lecciones/t/gaton.png',
      audio: '/audio/lecciones/t/gato.mp3',
      startsWithT: true,
    },
    {
      id: 'zanahoria',
      name: 'zanahoria',
      image: '/images/lecciones/t/zanahoria.png',
      audio: '/audio/lecciones/t/zanahoria.mp3',
      startsWithT: false,
    },
    {
      id: 'pato',
      name: 'pato',
      image: '/images/lecciones/t/pato.png',
      audio: '/audio/lecciones/t/pato.mp3',
      startsWithT: true,
    },
    {
      id: 'lata',
      name: 'lata',
      image: '/images/lecciones/t/lata.png',
      audio: '/audio/lecciones/t/lata.mp3',
      startsWithT: true,
    },
    {
      id: 'rata',
      name: 'rata',
      image: '/images/lecciones/t/rata.png',
      audio: '/audio/lecciones/t/rata.mp3',
      startsWithT: true,
    },
    {
      id: 'silla',
      name: 'silla',
      image: '/images/lecciones/t/silla.png',
      audio: '/audio/lecciones/t/silla.mp3',
      startsWithT: false,
    },
    {
      id: 'bigote',
      name: 'bigote',
      image: '/images/lecciones/t/bigote.png',
      audio: '/audio/lecciones/t/bigote.mp3',
      startsWithT: true,
    },
    // Pendiente de verificar imagen y palabra de esta
    {
      id: 'canasta',
      name: 'canasta',
      image: '/images/lecciones/t/canasto.png',
      audio: '/audio/lecciones/t/canasta.mp3',
      startsWithT: false,
    },
    {
      id: 'ejote',
      name: 'ejote',
      image: '/images/lecciones/t/ejote.png',
      audio: '/audio/lecciones/t/ejote.mp3',
      startsWithT: true,
    },
  ],
}