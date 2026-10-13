// Palabras para leer y practicar, páginas 209–210 del libro.

export const unit5WordPracticeId = 'repaso-unidad-5'

const unit5WordLists = [
  {
    lessonId: 'g',
    label: 'G g',
    title: 'Palabras con G g',
    words: [
      'gas', 'goma', 'ganar', 'gafas', 'gusto', 'gancho', 'gusano',
      'garganta', 'gorila', 'carga', 'barriga', 'abrigo',
      'gato', 'gala', 'gorra', 'gota', 'gordo', 'gastos', 'galera',
      'gobernar', 'guante', 'fango', 'delgado', 'bigote',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con g.',
      options: [
        ['gas', true], ['goma', true], ['gato', true],
        ['abrigo', false], ['fango', false], ['bigote', false],
      ],
    },
    shortest: { answer: 'gas', options: ['gas', 'gato', 'gorila'] },
    syllables: { word: 'gorila', parts: ['go', 'ri', 'la'], options: [2, 3, 4] },
  },
  {
    lessonId: 'gr',
    label: 'gr',
    title: 'Palabras con gr',
    words: [
      'gris', 'grado', 'grupo', 'gripe', 'gruñir', 'gradas', 'grosero',
      'gritos', 'gruta', 'grosor', 'grillo', 'grumo', 'milagro', 'alegre',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con gr.',
      options: [
        ['gris', true], ['grupo', true], ['grillo', true],
        ['milagro', false], ['alegre', false], ['gorila', false],
      ],
    },
    shortest: { answer: 'gris', options: ['gris', 'grupo', 'gradas'] },
    syllables: { word: 'grillo', parts: ['gri', 'llo'], options: [2, 3, 4] },
  },
  {
    lessonId: 'gl',
    label: 'gl',
    title: 'Palabras con gl',
    words: [
      'globo', 'glifo', 'global', 'siglo', 'inglés', 'manglar', 'arreglo',
      'Gloria', 'glotón', 'regla', 'iglesia', 'jungla', 'renglón', 'glándula',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con gl.',
      options: [
        ['globo', true], ['glifo', true], ['Gloria', true],
        ['siglo', false], ['regla', false], ['jungla', false],
      ],
    },
    shortest: { answer: 'globo', options: ['globo', 'global', 'glándula'] },
    syllables: { word: 'glándula', parts: ['glán', 'du', 'la'], options: [2, 3, 4] },
  },
  {
    lessonId: 'll',
    label: 'Ll ll',
    title: 'Palabras con Ll ll',
    words: [
      'llave', 'lleno', 'llano', 'llevar', 'llega', 'llanura', 'bello',
      'cabello', 'castillo', 'martillo', 'orilla', 'pellejo',
      'llaga', 'llama', 'llorar', 'lluvia', 'llanto', 'llamada', 'calle',
      'fallar', 'gallina', 'mejilla', 'pastilla', 'rodilla',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con ll.',
      options: [
        ['llave', true], ['llama', true], ['lluvia', true],
        ['cabello', false], ['calle', false], ['rodilla', false],
      ],
    },
    shortest: { answer: 'llave', options: ['llave', 'lluvia', 'llamada'] },
    syllables: { word: 'lluvia', parts: ['llu', 'via'], options: [2, 3, 4] },
  },
  {
    lessonId: 'h',
    label: 'H h',
    title: 'Palabras con H h',
    words: [
      'hacha', 'higo', 'hago', 'hora', 'hule', 'hada', 'harto', 'hecho',
      'horno', 'hombre', 'historia', 'húmedo',
      'hoja', 'hijo', 'hilo', 'hábil', 'hola', 'honor', 'hasta', 'hacha',
      'hombro', 'horca', 'helado', 'huraño',
    ],
    // El libro imprime "hacha" en ambas columnas; se mantienen las dos apariciones.
    find: {
      prompt: 'Marca las palabras que empiezan con h.',
      options: [
        ['hacha', true], ['hilo', true], ['horno', true],
        ['gato', false], ['globo', false], ['zorro', false],
      ],
    },
    shortest: { answer: 'hoja', options: ['hoja', 'horno', 'historia'] },
    syllables: { word: 'húmedo', parts: ['hú', 'me', 'do'], options: [2, 3, 4] },
  },
  {
    lessonId: 'z',
    label: 'Z z',
    title: 'Palabras con Z z',
    words: [
      'zona', 'zurdo', 'brazo', 'zapato', 'zapatero', 'plaza', 'coraza',
      'lechuza', 'cazador', 'pobreza',
      'zorro', 'zanco', 'bazar', 'marzo', 'danza', 'mozo', 'manzana',
      'cabeza', 'terraza', 'empezar',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con z.',
      options: [
        ['zona', true], ['zorro', true], ['zapato', true],
        ['brazo', false], ['plaza', false], ['cabeza', false],
      ],
    },
    shortest: { answer: 'zona', options: ['zona', 'zorro', 'zapatero'] },
    syllables: { word: 'zapatero', parts: ['za', 'pa', 'te', 'ro'], options: [2, 3, 4] },
  },
  {
    lessonId: 'dr',
    label: 'dr',
    title: 'Palabras con dr',
    words: [
      'drama', 'dragón', 'drenaje', 'madre', 'almendra', 'piedra',
      'comadre', 'padrino', 'comadrona', 'cocodrilo',
      'drenar', 'drástico', 'padre', 'ladrar', 'ladrillo', 'cuadro',
      'compadre', 'madrina', 'ladrón', 'catedral',
    ],
    find: {
      prompt: 'Marca las palabras que empiezan con dr.',
      options: [
        ['drama', true], ['drenaje', true], ['drástico', true],
        ['madre', false], ['piedra', false], ['cuadro', false],
      ],
    },
    shortest: { answer: 'drama', options: ['drama', 'dragón', 'drenaje'] },
    syllables: { word: 'dragón', parts: ['dra', 'gón'], options: [2, 3, 4] },
  },
]

export const unit5WordCount = unit5WordLists.reduce(
  (total, group) => total + group.words.length,
  0,
)

export const unit5UniqueWordCount = new Set(
  unit5WordLists.flatMap((group) => group.words),
).size

export const unit5PracticeGroups = unit5WordLists.map((group) => ({
  lessonId: group.lessonId,
  themeId: unit5WordPracticeId,
  label: group.label,
  title: group.title,
  words: group.words.map((word, index) => ({
    id: `${group.lessonId}-${index}`,
    word,
  })),
  find: {
    prompt: group.find.prompt,
    options: group.find.options.map(([word, isTarget], index) => ({
      id: `${group.lessonId}-find-${index}`,
      word,
      isTarget,
    })),
  },
  shortest: { prompt: '¿Cuál es la palabra más corta?', ...group.shortest },
  syllables: group.syllables,
}))

export const unit5WordPracticeConfig = {
  groups: unit5PracticeGroups,
  practiceId: unit5WordPracticeId,
  title: 'Palabras para leer y practicar',
  unitLabel: 'Unidad 5 · Práctica de lectura',
  intro: 'Elige un grupo. Lee las palabras y completa los retos.',
}
