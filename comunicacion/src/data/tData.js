
// Para la parte del cuento
export const tReading = {
  title: 'El tamal perdido',
  paragraphs: [
    'La familia de Tomás preparaba la fiesta de cumpleaños para la abuelita Tita.',
    'A ella le encantaban los tamales. Así que la mamá de Tomás los cocinó.',
    'Hizo uno especial para la abuela.',
    'Cuando lo iba a servir, no lo encontró.',
    '¿Dónde coloqué el tamal? -Se preguntaba la mamá de Tomás.',
    'Todos empezaron a buscarlo, pero nadie lo encontró.',
    'La abuela Tita no logró contener más la risa y les dijo',
    'que el tamal especial ya estaba en su estómago.',
    '¡No pudo aguantar las ganas y se lo comió antes de la fiesta!',
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