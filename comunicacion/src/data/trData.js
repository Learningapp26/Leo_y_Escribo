export const trReading = {
  title: 'El viaje en tren',
  paragraphs: [
    'En la casa de la familia Contreras todos están muy emocionados porque el papá les llevó cuatro boletos para viajar en tren.',
    'Desde hace tiempo, habían planeado viajar en tren. Querían visitar a la abuela Trinidad, quien vive lejos.',
    'El día del viaje, todos estaban muy entusiasmados. Era la primera vez que viajaban en tren.',
    'En el tren, la familia Contreras se sentó junto a la ventana, donde podían ver el paisaje. Cuando el tren avanzó, poco a poco empezaron a pasar los árboles cada vez más rápido. Vieron pasar unas vacas. Los campos con siembras parecían alejarse muy aprisa. Fue un viaje muy divertido, hasta pasaron por un túnel. Finalmente llegaron a su destino.',
    'Cuando bajaron del tren, la abuela Trinidad ya los estaba esperando muy contenta.',
  ],
  image: '/images/lecciones/tr/lectura.png',
  imageAlt: 'La familia Contreras despidiéndose junto al tren antes de subir',
  instructionAudio: '/audio/lecciones/tr/instruccion-lectura.mp3',
  readingAudio: '/audio/lecciones/tr/el-viaje-en-tren.mp3',
}

export const trComprehensionQuestions = [
  '¿Por qué viajó en tren la familia Contreras?',
  '¿Por qué la familia Contreras estaba entusiasmada?',
  '¿Qué vieron durante el viaje?',
  '¿Te gustaría viajar en tren? ¿Por qué?',
]

// ============================================================
// ACTIVIDAD 1 — SONIDOS (página 110)

// Fase 1: escuchar el sonido /tr/ (t + r juntas) y palabras de ejemplo
export const trSoundIntro = {
  instructionAudio: '/audio/lecciones/tr/instruccion-sonido-tr.mp3',
  mainWord: {
    name: 'tren',
    image: '/images/lecciones/tr/tren.png',
    audio: '/audio/lecciones/tr/tren.mp3',
  },
  soundAudio: '/audio/lecciones/tr/sonido-tr.mp3',
}

export const trSoundExamplesInstructionAudio =
  '/audio/lecciones/tr/instruccion-palabras-tr.mp3'

export const trSoundExamples = [
  {
    word: 'trabajo',
    image: '/images/lecciones/tr/trabajo.png',
    audio: '/audio/lecciones/tr/trabajo.mp3',
  },
  {
    word: 'trenza',
    image: '/images/lecciones/tr/trenza.png',
    audio: '/audio/lecciones/tr/trenza.mp3',
  },
  {
    word: 'tripa',
    image: '/images/lecciones/tr/tripa.png',
    audio: '/audio/lecciones/tr/tripa.mp3',
  },
]

// Trabalenguas de la página 110, solo para escuchar y repetir con la
// maestra (no se califican).
export const trTongueTwistersInstructionAudio =
  '/audio/lecciones/tr/instruccion-trabalenguas-tr.mp3'

export const trTongueTwisters = [
  {
    id: 'tigres',
    text: 'Tres tristes tigres tragaban trigo en un triste trigal.',
    image: '/images/lecciones/tr/trestristestigres.png',
    audio: '/audio/lecciones/tr/trabalenguas-tigres.mp3',
  },
  {
    id: 'triciclos',
    text: 'Triana limpia tres triciclos con un trapo tricolor.',
    image: '/images/lecciones/tr/trestriciclos.png',
    audio: '/audio/lecciones/tr/trabalenguas-triciclos.mp3',
  },
]

// Fase 2 (página 110, primer bloque): tocar los dibujos que empiezan con
// el mismo sonido que tren. Tractor y trece sí comienzan igual; tronco
// también. El biberón no.
export const trInitialSoundInstructionAudio =
  '/audio/lecciones/tr/instruccion-seleccion-inicial-tr.mp3'

export const trInitialSoundImages = [
  {
    id: 'tractor',
    name: 'tractor',
    image: '/images/lecciones/tr/tractor.png',
    audio: '/audio/lecciones/tr/tractor.mp3',
    startsWithTr: true,
  },
  {
    id: 'trece',
    name: 'trece',
    image: '/images/lecciones/tr/trece.png',
    audio: '/audio/lecciones/tr/trece.mp3',
    startsWithTr: true,
  },
  {
    id: 'tronco',
    name: 'tronco',
    image: '/images/lecciones/tr/tronco.png',
    audio: '/audio/lecciones/tr/tronco.mp3',
    startsWithTr: true,
  },
  {
    id: 'biberon',
    name: 'biberón',
    image: '/images/lecciones/tr/biberon.png',
    audio: '/audio/lecciones/tr/biberon.mp3',
    startsWithTr: false,
  },
]

// Fase 3 (página 110, segundo bloque): tocar los dibujos cuyo nombre
// tiene el sonido /tr/ en cualquier parte (no solo al inicio).
// Electricista (elec-tri-cis-ta), estrella (es-tre-lla) y astronauta
// (as-tro-nau-ta) sí lo tienen.
export const trAnywhereSoundInstructionAudio =
  '/audio/lecciones/tr/instruccion-sonido-en-palabra-tr.mp3'

export const trAnywhereSoundImages = [
  {
    id: 'electricista',
    name: 'electricista',
    image: '/images/lecciones/tr/electricista.png',
    audio: '/audio/lecciones/tr/electricista.mp3',
    hasSound: true,
  },
  {
    id: 'manzana',
    name: 'manzana',
    image: '/images/lecciones/tr/manzana.png',
    audio: '/audio/lecciones/tr/manzana.mp3',
    hasSound: false,
  },
  {
    id: 'estrella',
    name: 'estrella',
    image: '/images/lecciones/tr/estrella.png',
    audio: '/audio/lecciones/tr/estrella.mp3',
    hasSound: true,
  },
  {
    id: 'astronauta',
    name: 'astronauta',
    image: '/images/lecciones/tr/astronauta.png',
    audio: '/audio/lecciones/tr/astronauta.mp3',
    hasSound: true,
  },
]

// ============================================================
// ACTIVIDAD 2 — SÍLABAS tra, tre, tri, tro, tru (página 111)

export const trLetterPresentation = {
  instructionAudio: '/audio/lecciones/tr/instruccion-letra-tr.mp3',
  soundAudio: '/audio/lecciones/tr/sonido-tr.mp3',
  word: {
    name: 'tren',
    instructionAudio: '/audio/lecciones/tr/instruccion-palabra-tren.mp3',
    image: '/images/lecciones/tr/tren.png',
    audio: '/audio/lecciones/tr/tren.mp3',
  },
  combinations: [
    { syllable: 'tra', audio: '/audio/lecciones/tr/silaba-tra.mp3' },
    { syllable: 'tre', audio: '/audio/lecciones/tr/silaba-tre.mp3' },
    { syllable: 'tri', audio: '/audio/lecciones/tr/silaba-tri.mp3' },
    { syllable: 'tro', audio: '/audio/lecciones/tr/silaba-tro.mp3' },
    { syllable: 'tru', audio: '/audio/lecciones/tr/silaba-tru.mp3' },
  ],
}

export const trSyllableInstructionAudio =
  '/audio/lecciones/tr/instruccion-silabas-tr.mp3'

// Página 111: trozos, trigo, trapo y trueno, cada uno con dos opciones
// de sílaba para elegir (la correcta y una parecida, como en la letra Q).
export const trSyllableImageExercises = [
  {
    id: 'trozos',
    word: 'trozos',
    syllable: 'tro',
    image: '/images/lecciones/tr/trozos.png',
    audio: '/audio/lecciones/tr/trozos.mp3',
    options: ['tro', 'tra'],
  },
  {
    id: 'trigo',
    word: 'trigo',
    syllable: 'tri',
    image: '/images/lecciones/tr/trigo.png',
    audio: '/audio/lecciones/tr/trigo.mp3',
    options: ['tre', 'tri'],
  },
  {
    id: 'trapo',
    word: 'trapo',
    syllable: 'tra',
    image: '/images/lecciones/tr/trapo.png',
    audio: '/audio/lecciones/tr/trapo.mp3',
    options: ['tra', 'tru'],
  },
  {
    id: 'trueno',
    word: 'trueno',
    syllable: 'tru',
    image: '/images/lecciones/tr/trueno.png',
    audio: '/audio/lecciones/tr/trueno.mp3',
    options: ['tro', 'tru'],
  },
]

// Página 111, segundo bloque: leer cada palabra y decidir si la sílaba
// con tr va al inicio (rojo, como en el libro) o después (azul). Se usan
// las mismas 16 palabras del libro, tal como están en la página.
export const trPositionInstructionAudio =
  '/audio/lecciones/tr/instruccion-posicion-tr.mp3'

// Los dos ejemplos ya resueltos en el libro (círculo relleno), se
// muestran fijos y no se responden. explanationAudio explica en voz por
// qué ese color, para reforzar el texto (pedido en QA).
export const trPositionExamples = [
  {
    word: 'trapo',
    answer: 'inicio',
    explanationAudio: '/audio/lecciones/tr/explicacion-trapo-naranja.mp3',
  },
  {
    word: 'controla',
    answer: 'despues',
    explanationAudio: '/audio/lecciones/tr/explicacion-controla-celeste.mp3',
  },
]

export const trPositionWords = [
  { id: 'atraso', word: 'atraso', answer: 'despues' },
  { id: 'entre', word: 'entre', answer: 'despues' },
  { id: 'trabajo', word: 'trabajo', answer: 'inicio' },
  { id: 'lustre', word: 'lustre', answer: 'despues' },
  { id: 'truco', word: 'truco', answer: 'inicio' },
  { id: 'triple', word: 'triple', answer: 'inicio' },
  { id: 'tripa', word: 'tripa', answer: 'inicio' },
  { id: 'trato', word: 'trato', answer: 'inicio' },
  { id: 'trineo', word: 'trineo', answer: 'inicio' },
  { id: 'trucha', word: 'trucha', answer: 'inicio' },
  { id: 'estruja', word: 'estruja', answer: 'despues' },
  { id: 'trono', word: 'trono', answer: 'inicio' },
  { id: 'traba', word: 'traba', answer: 'inicio' },
  { id: 'patrones', word: 'patrones', answer: 'despues' },
]

// ============================================================
// ACTIVIDAD 3 — COMPLETAR: ordenar sílabas y formar la palabra
// (página 112). Se omite la escritura libre de oración del libro.

export const trWordBuildInstructionAudio =
  '/audio/lecciones/tr/instruccion-ordenar-silabas-tr.mp3'

export const trWordBuildExercises = [
  {
    id: 'potro',
    word: 'potro',
    image: '/images/lecciones/tr/potro.png',
    imageAlt: 'Un potro, un caballo joven',
    audio: '/audio/lecciones/tr/potro.mp3',
    syllables: ['po', 'tro'],
  },
  {
    id: 'tribu',
    word: 'tribu',
    image: '/images/lecciones/tr/tribu.png',
    imageAlt: 'Una tribu de personas con ropa tradicional',
    audio: '/audio/lecciones/tr/tribu.mp3',
    syllables: ['tri', 'bu'],
  },
  {
    id: 'litro',
    word: 'litro',
    image: '/images/lecciones/tr/litro.png',
    imageAlt: 'Una botella de un litro de agua',
    audio: '/audio/lecciones/tr/litro.mp3',
    syllables: ['li', 'tro'],
  },
]
