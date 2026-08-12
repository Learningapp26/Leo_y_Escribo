
// Para la parte del cuento
export const tReading = {
  title: 'El tamal perdido',
  paragraphs: [
    'La familia de Tomás preparaba la fiesta de cumpleaños para la abuelita Tita.',
    'A ella le encantaban los tamales. Así que la mamá de Tomás los cocinó. Hizo uno especial para la abuela. Cuando lo iba a servir, no lo encontró.',
    '¿Dónde coloqué el tamal? -Se preguntaba la mamá de Tomás.',
    'Todos empezaron a buscarlo, pero nadie lo encontró. La abuela Tita no logró contener más la risa y les dijo que el tamal especial ya estaba en su estómago. ¡No pudo aguantar las ganas y se lo comió antes de la fiesta!',
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
      audio: '/audio/lecciones/m/gato.mp3',
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



// ============================================================
// ACTIVIDAD DE SÍLABAS

// Conocer la letra T y sus combinaciones.
export const tLetterPresentation = {
  instructionAudio: '/audio/lecciones/t/instruccion-letra-t.mp3',
  soundAudio: '/audio/lecciones/t/sonido-t.mp3',
  combinations: [
    { syllable: 'ta', audio: '/audio/lecciones/l/silaba-ta.mp3' },
    { syllable: 'te', audio: '/audio/lecciones/t/silaba-te.mp3' },
    { syllable: 'ti', audio: '/audio/lecciones/t/silaba-ti.mp3' },
    { syllable: 'to', audio: '/audio/lecciones/t/silaba-to.mp3' },
    { syllable: 'tu', audio: '/audio/lecciones/t/silaba-tu.mp3' },
  ],
}
 
// Buscar sílabas que contengan la letra T
export const tSyllableSearch = {
  instructionAudio: '/audio/lecciones/t/instruccion-buscar-silabas.mp3',
  targetSyllables: ['ta', 'te', 'ti', 'to', 'tu'],
  options: [
    { syllable: 'ta', audio: '/audio/lecciones/l/silaba-ta.mp3' },
    { syllable: 'la', audio: '/audio/lecciones/m/silaba-la.mp3' },
    { syllable: 'te', audio: '/audio/lecciones/t/silaba-te.mp3' },
    { syllable: 'sa', audio: '/audio/lecciones/m/silaba-sa.mp3' },
    { syllable: 'ti', audio: '/audio/lecciones/t/silaba-ti.mp3' },
    { syllable: 'to', audio: '/audio/lecciones/t/silaba-to.mp3' },
    { syllable: 'tu', audio: '/audio/lecciones/t/silaba-tu.mp3' },
    { syllable: 'da', audio: '/audio/lecciones/m/silaba-da.mp3' },
    { syllable: 'mu', audio: '/audio/lecciones/m/silaba-mu.mp3' },
  ],
}
 
// Audio de instrucción para la fase "asociar" (imagen + palabra + sílaba)
export const tAssociationInstructionAudio =
  '/audio/lecciones/t/instruccion-asociar-t.mp3'
 
// Asociar imagen, palabra y sílaba con T.
export const tSyllableAssociation = [
  {
    id: 'tamal',
    word: 'tamal',
    highlighted: 'ta',
    rest: 'mal',
    image: '/images/lecciones/t/tamal.png',
    syllableAudio: '/audio/lecciones/l/silaba-ta.mp3',
    wordAudio: '/audio/lecciones/t/tamal.mp3',
  },
  {
    id: 'tijera',
    word: 'tijera',
    highlighted: 'ti',
    rest: 'jera',
    image: '/images/lecciones/t/tijera.png',
    syllableAudio: '/audio/lecciones/t/silaba-ti.mp3',
    wordAudio: '/audio/lecciones/t/tijera.mp3',
  },
  {
    id: 'tomate',
    word: 'tomate',
    highlighted: 'to',
    rest: 'mate',
    image: '/images/lecciones/t/tomate.png',
    syllableAudio: '/audio/lecciones/t/silaba-to.mp3',
    wordAudio: '/audio/lecciones/t/tomate.mp3',
  },
]
 
// Banco de sílabas para la fase "completar"
export const tSyllableOptions = ['ta', 'te', 'ti', 'to', 'tu']
 
// Audio de instrucción para la fase 4 (completar con patrón)
export const tCompletionSyllableInstructionAudio =
  '/audio/lecciones/t/instruccion-completar-t.mp3'
 
// Completar la palabra con la sílaba que falta (se muestra el patrón)
export const tWordCompletion = [
  {
    id: 'topo',
    word: 'topo',
    pattern: '__po',
    image: '/images/lecciones/t/topo.png',
    audio: '/audio/lecciones/t/topo.mp3',
    answer: 'to',
  },
  {
    id: 'tela',
    word: 'tela',
    pattern: '__la',
    image: '/images/lecciones/t/tela.png',
    audio: '/audio/lecciones/t/tela.mp3',
    answer: 'te',
  },
  {
    id: 'timon',
    word: 'timón',
    pattern: '__món',
    image: '/images/lecciones/t/timon.png',
    audio: '/audio/lecciones/t/timon.mp3',
    answer: 'ti',
  },
  {
    id: 'tusa',
    word: 'tusa',
    pattern: '__sa',
    image: '/images/lecciones/t/tusa.png',
    audio: '/audio/lecciones/t/tusa.mp3',
    answer: 'tu',
  },
]


// ============================================================
// ACTIVIDAD DE COMPLETAR PALABRAS

// Audio de instrucción para la fase 1
export const tSyllableSelectionInstructionAudio =
  '/audio/lecciones/t/instruccion-elegir-silaba-t.mp3'
 
// Fase 1: imagen + audio, elegir la sílaba que está en la palabra
// (sin importar la posición) contra el banco completo de 5 sílabas
export const tSyllableSelection = [
  {
    id: 'pito',
    name: 'pito',
    image: '/images/lecciones/t/pito.png',
    wordAudio: '/audio/lecciones/t/pito.mp3',
    answer: 'to',
  },
  {
    id: 'tinaja',
    name: 'tinaja',
    image: '/images/lecciones/t/tinaja.png',
    wordAudio: '/audio/lecciones/t/tinaja.mp3',
    answer: 'ti',
  },
  {
    id: 'gato',
    name: 'gato',
    image: '/images/lecciones/t/gato.png',
    wordAudio: '/audio/lecciones/m/gato.mp3',
    answer: 'to',
  },
  {
    id: 'pastel',
    name: 'pastel',
    image: '/images/lecciones/t/pastel.png',
    wordAudio: '/audio/lecciones/t/pastel.mp3',
    answer: 'te',
  },
  {
    id: 'maleta',
    name: 'maleta',
    image: '/images/lecciones/t/maleta.png',
    wordAudio: '/audio/lecciones/t/maleta.mp3',
    answer: 'ta',
  },

  {
    id: 'estufa',
    name: 'estufa',
    image: '/images/lecciones/t/estufa.png',
    wordAudio: '/audio/lecciones/t/estufa.mp3',
    answer: 'tu',
  },

]
 
// Audio de instrucción para la fase 2 (formar 3 palabras con 3 sílabas)
export const tJoinInstructionAudio =
  '/audio/lecciones/t/instruccion-formar-tres-t.mp3'
 
// Fase 2: formar palabras tocando sílabas (se reutilizan las mismas 3
// sílabas para armar 3 palabras distintas; no se puede repetir una palabra ya encontrada).

export const tSyllableJoin = [
  {
    id: 'palabra1t',
    words: ['toma', 'pato', 'mapa'],
    options: ['to', 'ma', 'pa'],
  },
  {
    id: 'palabra2t',
    words: ['taso', 'piso', 'pita'],
    options: ['ta', 'so', 'pi'],
  },
]
 
 


 
// ============================================================

// ACTIVIDAD FINAL

// Audio de instrucción para la fase 1 (sílaba mayúscula/minúscula)
export const tCaseSelectionInstructionAudio =
  '/audio/lecciones/t/instruccion-mayuscula-minuscula-t.mp3'
 
// Seleccionar sílaba de mayúscula o minúscula
export const tSyllableCaseSelection = [
  {
    id: 'pata',
    name: 'pata',
    image: '/images/lecciones/t/pata.png',
    wordAudio: '/audio/lecciones/t/pata.mp3',
    pattern: 'pa__',
    options: [
      {
        syllable: 'ta',
        audio: '/audio/lecciones/l/silaba-ta.mp3',
        isCorrect: true,
      },
      {
        syllable: 'tu',
        audio: '/audio/lecciones/t/silaba-tu.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'tomas',
    name: 'Tomás',
    image: '/images/lecciones/t/tomas.png',
    wordAudio: '/audio/lecciones/t/tomas.mp3',
    pattern: '__más',
    options: [
      {
        syllable: 'To',
        audio: '/audio/lecciones/t/silaba-to.mp3',
        isCorrect: true,
      },
      {
        syllable: 'to',
        audio: '/audio/lecciones/t/silaba-to.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'toro',
    name: 'toro',
    image: '/images/lecciones/t/toro.png',
    wordAudio: '/audio/lecciones/r/toro.mp3',
    pattern: '__ro',
    options: [
      {
        syllable: 'To',
        audio: '/audio/lecciones/t/silaba-to.mp3',
        isCorrect: false,
      },
      {
        syllable: 'to',
        audio: '/audio/lecciones/t/silaba-to.mp3',
        isCorrect: true,
      },
    ],
  },
  {
    id: 'mata',
    name: 'mata',
    image: '/images/lecciones/t/mata.png',
    wordAudio: '/audio/lecciones/t/mata.mp3',
    pattern: 'ma__',
    options: [
      {
        syllable: 'ta',
        audio: '/audio/lecciones/l/silaba-ta.mp3',
        isCorrect: true,
      },
      {
        syllable: 'ti',
        audio: '/audio/lecciones/t/silaba-ti.mp3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 'tele',
    name: 'tele',
    image: '/images/lecciones/t/tele.png',
    wordAudio: '/audio/lecciones/t/tele.mp3',
    pattern: '__le',
    options: [
      {
        syllable: 'Te',
        audio: '/audio/lecciones/t/silaba-te.mp3',
        isCorrect: false,
      },
      {
        syllable: 'te',
        audio: '/audio/lecciones/t/silaba-te.mp3',
        isCorrect: true,
      },
    ],
  },
  {
    id: 'tita',
    name: 'Tita',
    image: '/images/lecciones/t/tita.png',
    wordAudio: '/audio/lecciones/t/tita.mp3',
    pattern: '__ta',
    options: [
      {
        syllable: 'ti',
        audio: '/audio/lecciones/t/silaba-ti.mp3',
        isCorrect: false,
      },
      {
        syllable: 'Ti',
        audio: '/audio/lecciones/t/silaba-ti.mp3',
        isCorrect: true,
      },
    ],
  },
]
 
// Audio de instrucción para la fase 2 (formar oraciones)
export const tSentenceFormation = {
  instructionAudio: '/audio/lecciones/t/instruccion-formar-oraciones-t.mp3',
}
 
// Fase 2: formar la oración correcta con un banco de palabras desordenado
export const tWordJoin = [
  {
    id: 'oracion1t',
    sentence: 'Tati toma té.',
    options: ['té.', 'toma', 'Tati'],
  },
  {
    id: 'oracion2t',
    sentence: 'Tere toma la sopa.',
    options: ['toma', 'la', 'Tere', 'sopa.'],
  },
]
 
