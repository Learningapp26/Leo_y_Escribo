// Palabras para leer y practicar. Los grupos corresponden a lecciones
// que ya tienen pantalla y actividades disponibles en la aplicación.
export const wordPracticeGroups = [
  {
    lessonId: 'm',
    label: 'M',
    title: 'Palabras con M',
    words: [
      { id: 'mama', word: 'mamá', audio: '/audio/lecciones/m/mama.mp3' },
      { id: 'mano', word: 'mano', audio: '/audio/lecciones/m/mano.mp3' },
      { id: 'miel', word: 'miel', audio: '/audio/lecciones/m/miel.mp3' },
      { id: 'mariposa', word: 'mariposa', audio: '/audio/lecciones/m/mariposa.mp3' },
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
    words: [
      { id: 'ala', word: 'ala', audio: '/audio/lecciones/l/ala.mp3' },
      { id: 'luna', word: 'luna', audio: '/audio/lecciones/l/luna.mp3' },
      { id: 'limon', word: 'limón', audio: '/audio/lecciones/m/limon.mp3' },
      { id: 'lechuga', word: 'lechuga', audio: '/audio/lecciones/l/lechuga.mp3' },
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con L.',
      options: [
        { id: 'luna', word: 'luna', isTarget: true },
        { id: 'limon', word: 'limón', isTarget: true },
        { id: 'mesa', word: 'mesa', isTarget: false },
        { id: 'lechuga', word: 'lechuga', isTarget: true },
        { id: 'nube', word: 'nube', isTarget: false },
        { id: 'puma', word: 'puma', isTarget: false },
      ],
    },
    shortest: {
      prompt: '¿Cuál es la palabra más corta?',
      answer: 'ala',
      options: ['ala', 'luna', 'lechuga'],
    },
    syllables: {
      word: 'lechuga',
      parts: ['le', 'chu', 'ga'],
      options: [2, 3, 4],
    },
  },
  {
    lessonId: 's',
    label: 'S',
    title: 'Palabras con S',
    words: [
      { id: 'sol', word: 'sol' },
      { id: 'seda', word: 'seda' },
      { id: 'sillon', word: 'sillón' },
      { id: 'suma', word: 'suma' },
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con S.',
      options: [
        { id: 'sol', word: 'sol', isTarget: true },
        { id: 'seda', word: 'seda', isTarget: true },
        { id: 'mama', word: 'mamá', isTarget: false },
        { id: 'sillon', word: 'sillón', isTarget: true },
        { id: 'luna', word: 'luna', isTarget: false },
        { id: 'suma', word: 'suma', isTarget: true },
      ],
    },
    shortest: {
      prompt: '¿Cuál es la palabra más corta?',
      answer: 'sol',
      options: ['sol', 'seda', 'sillón'],
    },
    syllables: {
      word: 'sillón',
      parts: ['si', 'llón'],
      options: [2, 3, 4],
    },
  },
  {
    lessonId: 'n',
    label: 'N',
    title: 'Palabras con N',
    words: [
      { id: 'nube', word: 'nube', audio: '/audio/lecciones/n/nube.mp3' },
      { id: 'nido', word: 'nido', audio: '/audio/lecciones/n/nido.mp3' },
      { id: 'nariz', word: 'nariz', audio: '/audio/lecciones/n/nariz.mp3' },
      { id: 'naranja', word: 'naranja', audio: '/audio/lecciones/n/naranja.mp3' },
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
    label: 'P',
    title: 'Palabras con P',
    words: [
      { id: 'pie', word: 'pie', audio: '/audio/lecciones/p/pie.mp3' },
      { id: 'puma', word: 'puma', audio: '/audio/lecciones/p/puma.mp3' },
      { id: 'pelota', word: 'pelota', audio: '/audio/lecciones/p/pelota.mp3' },
      { id: 'pollito', word: 'pollito', audio: '/audio/lecciones/p/pollito.mp3' },
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
      options: ['pie', 'puma', 'pollito'],
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
    words: [
      { id: 'rosa', word: 'rosa', audio: '/audio/lecciones/r/rosa.mp3' },
      { id: 'rama', word: 'rama', audio: '/audio/lecciones/r/rama.mp3' },
      { id: 'reloj', word: 'reloj', audio: '/audio/lecciones/r/reloj.mp3' },
      { id: 'mariposa', word: 'mariposa', audio: '/audio/lecciones/r/mariposa.mp3' },
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con R.',
      options: [
        { id: 'rosa', word: 'rosa', isTarget: true },
        { id: 'reloj', word: 'reloj', isTarget: true },
        { id: 'pato', word: 'pato', isTarget: false },
        { id: 'rama', word: 'rama', isTarget: true },
        { id: 'nube', word: 'nube', isTarget: false },
        { id: 'luna', word: 'luna', isTarget: false },
      ],
    },
    shortest: {
      prompt: '¿Cuál es la palabra más corta?',
      answer: 'sol',
      options: ['sol', 'rosa', 'reloj'],
    },
    syllables: {
      word: 'mariposa',
      parts: ['ma', 'ri', 'po', 'sa'],
      options: [2, 3, 4],
    },
  },
  {
    lessonId: 't',
    label: 'T',
    title: 'Palabras con T',
    words: [
      { id: 'tamal', word: 'tamal', audio: '/audio/lecciones/t/tamal.mp3' },
      { id: 'tela', word: 'tela', audio: '/audio/lecciones/t/tela.mp3' },
      { id: 'tijera', word: 'tijera', audio: '/audio/lecciones/t/tijera.mp3' },
      { id: 'tomate', word: 'tomate', audio: '/audio/lecciones/t/tomate.mp3' },
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con T.',
      options: [
        { id: 'tamal', word: 'tamal', isTarget: true },
        { id: 'tijera', word: 'tijera', isTarget: true },
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
