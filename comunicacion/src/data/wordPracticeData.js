// Palabras para leer y practicar. Los grupos corresponden a lecciones
// que ya tienen pantalla y actividades disponibles en la aplicación.
export const wordPracticeGroups = [
  {
    lessonId: 'm',
    label: 'M',
    title: 'Palabras con M',
    coverImage: '/images/lecciones/m/te-amo-mama.png',
    coverAlt: 'Una mamá y su hijo se abrazan.',
    words: [
      { id: 'mama', word: 'mamá', image: '/images/lecciones/m/mama.png', imageAlt: 'Una mamá', audio: '/audio/lecciones/m/mama.mp3' },
      { id: 'mano', word: 'mano', image: '/images/lecciones/m/mano.png', imageAlt: 'Una mano', audio: '/audio/lecciones/m/mano.mp3' },
      { id: 'miel', word: 'miel', image: '/images/lecciones/m/miel.png', imageAlt: 'Un frasco de miel', audio: '/audio/lecciones/m/miel.mp3' },
      { id: 'mariposa', word: 'mariposa', image: '/images/lecciones/m/mariposa.png', imageAlt: 'Una mariposa', audio: '/audio/lecciones/m/mariposa.mp3' },
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con M.',
      options: [
        { id: 'mama', word: 'mamá', isTarget: true },
        { id: 'mano', word: 'mano', isTarget: true },
        { id: 'luna', word: 'luna', isTarget: false },
        { id: 'pato', word: 'pato', isTarget: false },
        { id: 'mesa', word: 'mesa', isTarget: true },
        { id: 'rosa', word: 'rosa', isTarget: false },
      ],
    },
    shortest: {
      prompt: '¿Cuál es la palabra más corta?',
      answer: 'miel',
      options: ['miel', 'mañana', 'mariposa'],
    },
    syllables: {
      word: 'mariposa',
      parts: ['ma', 'ri', 'po', 'sa'],
      options: [2, 3, 4],
    },
  },
  {
    lessonId: 'l',
    label: 'L',
    title: 'Palabras con L',
    coverImage: '/images/lecciones/l/lectura-perro.png',
    coverAlt: 'Un perro acompaña una lectura.',
    words: [
      { id: 'ala', word: 'ala', image: '/images/lecciones/l/ala.png', imageAlt: 'Un ala', audio: '/audio/lecciones/l/ala.mp3' },
      { id: 'luna', word: 'luna', image: '/images/lecciones/l/luna.png', imageAlt: 'La luna', audio: '/audio/lecciones/l/luna.mp3' },
      { id: 'limon', word: 'limón', image: '/images/lecciones/l/limon.png', imageAlt: 'Un limón', audio: '/audio/lecciones/m/limon.mp3' },
      { id: 'loma', word: 'loma', image: '/images/lecciones/l/loma.png', imageAlt: 'Una loma', audio: '/audio/lecciones/l/loma.mp3' },
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con L.',
      options: [
        { id: 'luna', word: 'luna', isTarget: true },
        { id: 'limon', word: 'limón', isTarget: true },
        { id: 'mesa', word: 'mesa', isTarget: false },
        { id: 'loma', word: 'loma', isTarget: true },
        { id: 'nube', word: 'nube', isTarget: false },
        { id: 'puma', word: 'puma', isTarget: false },
      ],
    },
    shortest: {
      prompt: '¿Cuál es la palabra más corta?',
      answer: 'ala',
      options: ['ala', 'luna', 'loma'],
    },
    syllables: {
      word: 'loma',
      parts: ['lo', 'ma'],
      options: [2, 3, 4],
    },
  },
  {
    lessonId: 's',
    label: 'S',
    title: 'Palabras con S',
    coverImage: '/images/lecciones/s/sapos-globos.png',
    coverAlt: 'Dos sapos inflan globos junto a un lago.',
    words: [
      { id: 'sol', word: 'sol', image: '/images/lecciones/y/sol.png', imageAlt: 'El sol' },
      { id: 'sala', word: 'sala' },
      { id: 'sapo', word: 'sapo' },
      { id: 'suma', word: 'suma' },
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con S.',
      options: [
        { id: 'sol', word: 'sol', isTarget: true },
        { id: 'sala', word: 'sala', isTarget: true },
        { id: 'mama', word: 'mamá', isTarget: false },
        { id: 'sapo', word: 'sapo', isTarget: true },
        { id: 'luna', word: 'luna', isTarget: false },
        { id: 'suma', word: 'suma', isTarget: true },
      ],
    },
    shortest: {
      prompt: '¿Cuál es la palabra más corta?',
      answer: 'sol',
      options: ['sol', 'sala', 'sapo'],
    },
    syllables: {
      word: 'sapo',
      parts: ['sa', 'po'],
      options: [2, 3, 4],
    },
  },
  {
    lessonId: 'n',
    showAudio: true,
    label: 'N',
    title: 'Palabras con N',
    coverImage: '/images/lecciones/n/lectura-nariz-sorprendente.png',
    coverAlt: 'Una ilustración infantil de la lectura de la letra N.',
    words: [
      { id: 'nube', word: 'nube', image: '/images/lecciones/n/nube.png', imageAlt: 'Una nube' },
      { id: 'nido', word: 'nido', image: '/images/lecciones/n/nido.png', imageAlt: 'Un nido' },
      { id: 'nariz', word: 'nariz', image: '/images/lecciones/n/nariz.png', imageAlt: 'Una nariz' },
      { id: 'naranja', word: 'naranja', image: '/images/lecciones/n/naranja.png', imageAlt: 'Una naranja' },
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con N.',
      options: [
        { id: 'nube', word: 'nube', isTarget: true },
        { id: 'nariz', word: 'nariz', isTarget: true },
        { id: 'pino', word: 'pino', isTarget: false },
        { id: 'nido', word: 'nido', isTarget: true },
        { id: 'loro', word: 'loro', isTarget: false },
        { id: 'tamal', word: 'tamal', isTarget: false },
      ],
    },
    shortest: {
      prompt: '¿Cuál es la palabra más corta?',
      answer: 'nido',
      options: ['nido', 'nariz', 'naranja'],
    },
    syllables: {
      word: 'naranja',
      parts: ['na', 'ran', 'ja'],
      options: [2, 3, 4],
    },
  },
  {
    lessonId: 'p',
    showAudio: true,
    label: 'P',
    title: 'Palabras con P',
    coverImage: '/images/lecciones/p/lectura-papa-puma.png',
    coverAlt: 'Una ilustración infantil de la lectura de la letra P.',
    words: [
      { id: 'pie', word: 'pie', image: '/images/lecciones/p/pie.png', imageAlt: 'Un pie' },
      { id: 'puma', word: 'puma', image: '/images/lecciones/p/puma.png', imageAlt: 'Un puma' },
      { id: 'pelota', word: 'pelota', image: '/images/lecciones/p/pelota.png', imageAlt: 'Una pelota' },
      { id: 'pala', word: 'pala', image: '/images/lecciones/p/pala.png', imageAlt: 'Una pala' },
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con P.',
      options: [
        { id: 'puma', word: 'puma', isTarget: true },
        { id: 'pelota', word: 'pelota', isTarget: true },
        { id: 'mesa', word: 'mesa', isTarget: false },
        { id: 'pato', word: 'pato', isTarget: true },
        { id: 'nube', word: 'nube', isTarget: false },
        { id: 'rosa', word: 'rosa', isTarget: false },
      ],
    },
    shortest: {
      prompt: '¿Cuál es la palabra más corta?',
      answer: 'pie',
      options: ['pie', 'puma', 'pala'],
    },
    syllables: {
      word: 'pelota',
      parts: ['pe', 'lo', 'ta'],
      options: [2, 3, 4],
    },
  },
  {
    lessonId: 'r',
    label: 'R',
    title: 'Palabras con R',
    coverImage: '/images/lecciones/r/misterio-rosas.png',
    coverAlt: 'Una ilustración infantil con rosas para la letra R.',
    words: [
      { id: 'rosa', word: 'rosa', image: '/images/lecciones/r/rosa.png', imageAlt: 'Una rosa', audio: '/audio/lecciones/r/rosa.mp3' },
      { id: 'rama', word: 'rama', image: '/images/lecciones/r/rama.png', imageAlt: 'Una rama', audio: '/audio/lecciones/r/rama.mp3' },
      { id: 'risa', word: 'risa', image: '/images/lecciones/r/risa.png', imageAlt: 'Un niño sonriendo', audio: '/audio/lecciones/r/risa.mp3' },
      { id: 'mariposa', word: 'mariposa', image: '/images/lecciones/r/mariposa.png', imageAlt: 'Una mariposa', audio: '/audio/lecciones/r/mariposa.mp3' },
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con R.',
      options: [
        { id: 'rosa', word: 'rosa', isTarget: true },
        { id: 'risa', word: 'risa', isTarget: true },
        { id: 'pato', word: 'pato', isTarget: false },
        { id: 'rama', word: 'rama', isTarget: true },
        { id: 'nube', word: 'nube', isTarget: false },
        { id: 'luna', word: 'luna', isTarget: false },
      ],
    },
    shortest: {
      prompt: '¿Cuál es la palabra más corta?',
      answer: 'sol',
      options: ['sol', 'rosa', 'risa'],
    },
    syllables: {
      word: 'mariposa',
      parts: ['ma', 'ri', 'po', 'sa'],
      options: [2, 3, 4],
    },
  },
  {
    lessonId: 't',
    showAudio: true,
    label: 'T',
    title: 'Palabras con T',
    coverImage: '/images/lecciones/t/El-tamal-perdido.png',
    coverAlt: 'Una ilustración infantil del cuento El tamal perdido.',
    words: [
      { id: 'tamal', word: 'tamal', image: '/images/lecciones/t/tamal.png', imageAlt: 'Un tamal' },
      { id: 'tela', word: 'tela', image: '/images/lecciones/t/tela.png', imageAlt: 'Un trozo de tela' },
      { id: 'toro', word: 'toro', image: '/images/lecciones/t/toro.png', imageAlt: 'Un toro', audio: '/audio/lecciones/r/toro.mp3' },
      { id: 'tomate', word: 'tomate', image: '/images/lecciones/t/tomate.png', imageAlt: 'Un tomate' },
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con T.',
      options: [
        { id: 'tamal', word: 'tamal', isTarget: true },
        { id: 'toro', word: 'toro', isTarget: true },
        { id: 'mano', word: 'mano', isTarget: false },
        { id: 'tela', word: 'tela', isTarget: true },
        { id: 'nube', word: 'nube', isTarget: false },
        { id: 'puma', word: 'puma', isTarget: false },
      ],
    },
    shortest: {
      prompt: '¿Cuál es la palabra más corta?',
      answer: 'pan',
      options: ['pan', 'tela', 'tomate'],
    },
    syllables: {
      word: 'tomate',
      parts: ['to', 'ma', 'te'],
      options: [2, 3, 4],
    },
  },
]

export const unit1WordPracticeConfig = {
  groups: wordPracticeGroups,
  practiceId: 'repaso-unidad-1',
  title: 'Repaso de la Unidad 1',
  unitLabel: 'Unidad 1 · Práctica de lectura',
  intro: 'Elige una letra. Lee las palabras y completa los retos.',
}

export const unit3WordPracticeId = 'repaso-unidad-3'

const unit3WordLists = [
  {
    lessonId: 'b',
    label: 'B b',
    title: 'Palabras con B b',
    coverImage: '/images/lecciones/b/lectura-bananos-balu.png',
    coverAlt: 'Balú junto a unos bananos.',
    words: [
      'beso', 'bate', 'barco', 'bajo', 'banca', 'bebida', 'bomba', 'burla',
      'búsqueda', 'burbuja', 'Benito', 'boca', 'balón', 'bonito', 'balsa',
      'banda', 'bombero', 'borde', 'bulto', 'barato', 'bicho', 'banano',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con B.',
      options: [
        ['beso', true], ['barco', true], ['burbuja', true],
        ['noble', false], ['tren', false], ['jalea', false],
      ],
    },
    shortest: { answer: 'bajo', options: ['bajo', 'bonito', 'búsqueda'] },
    syllables: { word: 'burbuja', parts: ['bur', 'bu', 'ja'], options: [2, 3, 4] },
  },
  {
    lessonId: 'bl',
    label: 'bl',
    title: 'Palabras con bl',
    coverImage: '/images/lecciones/bl/regalo-misterioso.png',
    coverAlt: 'Una blusa como regalo misterioso.',
    words: [
      'noble', 'blusa', 'tabla', 'potable', 'temblor', 'posible', 'público',
      'bloque', 'bledo', 'blando', 'doblar', 'blanco', 'neblina', 'blancura',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con bl.',
      options: [
        ['blusa', true], ['bloque', true], ['blanco', true],
        ['tabla', false], ['noble', false], ['doblar', false],
      ],
    },
    shortest: { answer: 'blusa', options: ['blusa', 'posible', 'temblor'] },
    syllables: { word: 'neblina', parts: ['ne', 'bli', 'na'], options: [2, 3, 4] },
  },
  {
    lessonId: 'br',
    label: 'br',
    title: 'Palabras con br',
    words: [
      'brisa', 'brasa', 'brócoli', 'bruja', 'abril', 'sabroso', 'sombra',
      'brecha', 'broma', 'sobra', 'libre', 'alumbrar', 'palabra', 'nombre',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con br.',
      options: [
        ['brisa', true], ['brócoli', true], ['broma', true],
        ['abril', false], ['sombra', false], ['alumbrar', false],
      ],
    },
    shortest: { answer: 'brisa', options: ['brisa', 'brócoli', 'alumbrar'] },
    syllables: { word: 'brócoli', parts: ['bró', 'co', 'li'], options: [2, 3, 4] },
  },
  {
    lessonId: 'j',
    label: 'J j',
    title: 'Palabras con J j',
    coverImage: '/images/lecciones/j/jirafa.png',
    coverAlt: 'Una jirafa.',
    words: [
      'jamás', 'jalón', 'juntar', 'jinete', 'joroba', 'mojar', 'encajar',
      'plumaje', 'tarjeta', 'rajado', 'jabón', 'justo', 'Julia', 'jerarca',
      'caja', 'dejar', 'mejorar', 'sujetar', 'tejado', 'cajero',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con J.',
      options: [
        ['jamás', true], ['juntar', true], ['jinete', true],
        ['mojar', false], ['encajar', false], ['tejado', false],
      ],
    },
    shortest: { answer: 'justo', options: ['justo', 'tarjeta', 'sujetar'] },
    syllables: { word: 'tarjeta', parts: ['tar', 'je', 'ta'], options: [2, 3, 4] },
  },
  {
    lessonId: 'ch',
    label: 'Ch ch',
    title: 'Palabras con Ch ch',
    words: [
      'chico', 'chapa', 'chivo', 'chucho', 'chulo', 'mucho', 'champú',
      'charla', 'chancla', 'rancho', 'Chepe', 'chicle', 'choque', 'chupar',
      'chile', 'chiste', 'charco', 'chispa', 'chinche', 'pecho',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con Ch.',
      options: [
        ['chico', true], ['chapa', true], ['chivo', true],
        ['mucho', false], ['rancho', false], ['pecho', false],
      ],
    },
    shortest: { answer: 'chico', options: ['chico', 'chancla', 'choque'] },
    syllables: { word: 'chinche', parts: ['chin', 'che'], options: [2, 3, 4] },
  },
  {
    lessonId: 'tr',
    label: 'tr',
    title: 'Palabras con tr',
    coverImage: '/images/lecciones/tr/lectura.png',
    coverAlt: 'Una familia junto a un tren.',
    words: [
      'trapo', 'tren', 'tratar', 'trepar', 'trono', 'tropa', 'triste',
      'trasto', 'trompeta', 'sastre', 'tripa', 'trotar', 'trabar', 'traje',
      'truco', 'tronco', 'tres', 'tranquilo', 'trabajo', 'maestra',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con tr.',
      options: [
        ['trapo', true], ['tren', true], ['trompeta', true],
        ['sastre', false], ['maestra', false], ['bruja', false],
      ],
    },
    shortest: { answer: 'tren', options: ['tren', 'trapo', 'trompeta'] },
    syllables: { word: 'trompeta', parts: ['trom', 'pe', 'ta'], options: [2, 3, 4] },
  },
  {
    lessonId: 'otras',
    label: 'Otras palabras',
    title: 'Otras palabras',
    coverImage: '/images/lecciones/j/conejo.png',
    coverAlt: 'Un conejo.',
    words: [
      'macho', 'buche', 'rabo', 'mecha', 'entre', 'cajones', 'espejo',
      'conejo', 'subida', 'entrada', 'reja', 'techo', 'ducha', 'tajada',
      'paja', 'queja', 'tachado', 'sábado', 'estrecho', 'machucar',
    ],
    find: {
      prompt: 'Marca las palabras que tienen ch.',
      options: [
        ['macho', true], ['buche', true], ['mecha', true],
        ['rabo', false], ['entre', false], ['cajones', false],
      ],
    },
    shortest: { answer: 'rabo', options: ['rabo', 'subida', 'cajones'] },
    syllables: { word: 'entrada', parts: ['en', 'tra', 'da'], options: [2, 3, 4] },
  },
]

const unit3WordsFor = (group) => group.words.map((word, index) => ({
  id: `${group.lessonId}-${index}`,
  word,
}))

export const unit3PracticeGroups = unit3WordLists.map((group) => ({
  lessonId: group.lessonId,
  themeId: unit3WordPracticeId,
  label: group.label,
  title: group.title,
  coverImage: group.coverImage,
  coverAlt: group.coverAlt,
  words: unit3WordsFor(group),
  find: {
    ...group.find,
    options: group.find.options.map(([word, isTarget], index) => ({
      id: `${group.lessonId}-find-${index}`,
      word,
      isTarget,
    })),
  },
  shortest: group.shortest,
  syllables: group.syllables,
}))

export const unit3WordCount = unit3WordLists.reduce(
  (total, group) => total + group.words.length,
  0,
)

export const unit3UniqueWordCount = new Set(
  unit3WordLists.flatMap((group) => group.words),
).size

export const unit3WordPracticeConfig = {
  groups: unit3PracticeGroups,
  practiceId: unit3WordPracticeId,
  title: 'Palabras para leer y practicar',
  unitLabel: 'Unidad 3 · Práctica de lectura',
  intro: 'Elige un grupo. Lee las palabras y completa los retos.',
}
