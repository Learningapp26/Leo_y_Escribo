export const unit2WordPracticeId = 'repaso-unidad-2'

export const unit2WordPracticeGroups = [
  {
    id: 'c',
    title: 'C c',
    columns: [
      ['caso', 'cuna', 'cada', 'cura', 'calor', 'cono', 'caldo', 'curso', 'canto', 'costal'],
      ['capa', 'coma', 'cama', 'codo', 'caro', 'culto', 'cana', 'costo', 'carne', 'culpa'],
    ],
  },
  {
    id: 'pl',
    title: 'pl',
    columns: [
      ['plano', 'plomo', 'plata', 'plasta', 'plana', 'suplir', 'planta'],
      ['plato', 'pluma', 'plan', 'Plutón', 'plural', 'pleno', 'cumplí'],
    ],
  },
  {
    id: 'pr',
    title: 'pr',
    columns: [
      ['prisa', 'prado', 'presa', 'pronto', 'premio', 'lepra', 'prensar'],
      ['propio', 'prima', 'preso', 'primero', 'compra', 'prenda', 'primo'],
    ],
  },
  {
    id: 'qu',
    title: 'Qu qu',
    columns: [
      ['que', 'querer', 'quita', 'quiso', 'quitar', 'Quique', 'quiste', 'marque', 'duque'],
      ['quema', 'quinto', 'quedo', 'toque', 'queso', 'porque', 'Queta', 'quemar', 'parque'],
    ],
  },
  {
    id: 'd',
    title: 'D d',
    columns: [
      ['de', 'duda', 'dar', 'dona', 'dado', 'duro', 'dato', 'dardo', 'disco'],
      ['dame', 'Dina', 'dedal', 'del', 'dime', 'demás', 'deseo', 'dictar', 'doctor'],
    ],
  },
  {
    id: 'otras-1',
    title: 'Otras palabras',
    columns: [
      ['en', 'es', 'este', 'isla', 'alma', 'antes', 'esto', 'Elmo', 'desde', 'andar'],
      ['al', 'el', 'entro', 'asma', 'está', 'alto', 'sus', 'usted', 'aspa', 'altar'],
    ],
  },
  {
    id: 'otras-2',
    title: 'Otras palabras',
    columns: [
      ['rico', 'mudo', 'soplar', 'paca', 'nadar', 'moco', 'nudo', 'Maco', 'templo', 'compro'],
      ['seda', 'pudo', 'poco', 'taco', 'saque', 'suda', 'roca', 'mico', 'rudo', 'todos'],
    ],
  },
]

export const unit2WordCount = unit2WordPracticeGroups.reduce(
  (total, group) => total + group.columns.flat().length,
  0,
)

const groupById = Object.fromEntries(
  unit2WordPracticeGroups.map((group) => [group.id, group]),
)

const wordsFor = (groupId) =>
  groupById[groupId].columns.flat().map((word, index) => ({
    id: `${groupId}-${index}`,
    word,
  }))

const groupDetails = {
  c: {
    find: {
      prompt: 'Marca las palabras que empiezan con C.',
      options: [
        { word: 'cuna', isTarget: true },
        { word: 'cama', isTarget: true },
        { word: 'costo', isTarget: true },
        { word: 'plano', isTarget: false },
        { word: 'dado', isTarget: false },
        { word: 'prisa', isTarget: false },
      ],
    },
    shortest: { answer: 'cuna', options: ['cuna', 'curso', 'calor'] },
    syllables: { word: 'costal', parts: ['cos', 'tal'], options: [2, 3, 4] },
  },
  pl: {
    coverImage: '/images/lecciones/pl/plumas-bailarinas.png',
    coverAlt: 'Plumas que bailan.',
    find: {
      prompt: 'Marca las palabras que empiezan con pl.',
      options: [
        { word: 'plano', isTarget: true },
        { word: 'pluma', isTarget: true },
        { word: 'pleno', isTarget: true },
        { word: 'suplir', isTarget: false },
        { word: 'prado', isTarget: false },
        { word: 'dado', isTarget: false },
      ],
    },
    shortest: { answer: 'plan', options: ['plan', 'pluma', 'plural'] },
    syllables: { word: 'Plutón', parts: ['Plu', 'tón'], options: [2, 3, 4] },
  },
  pr: {
    find: {
      prompt: 'Marca las palabras que empiezan con pr.',
      options: [
        { word: 'prisa', isTarget: true },
        { word: 'prenda', isTarget: true },
        { word: 'primero', isTarget: true },
        { word: 'compra', isTarget: false },
        { word: 'plano', isTarget: false },
        { word: 'dardo', isTarget: false },
      ],
    },
    shortest: { answer: 'prisa', options: ['prisa', 'premio', 'primero'] },
    syllables: { word: 'prenda', parts: ['pren', 'da'], options: [2, 3, 4] },
  },
  qu: {
    find: {
      prompt: 'Marca las palabras que empiezan con qu.',
      options: [
        { word: 'que', isTarget: true },
        { word: 'quema', isTarget: true },
        { word: 'Quique', isTarget: true },
        { word: 'toque', isTarget: false },
        { word: 'marque', isTarget: false },
        { word: 'prisa', isTarget: false },
      ],
    },
    shortest: { answer: 'que', options: ['que', 'quema', 'quitar'] },
    syllables: { word: 'quitar', parts: ['qui', 'tar'], options: [2, 3, 4] },
  },
  d: {
    find: {
      prompt: 'Marca las palabras que empiezan con D.',
      options: [
        { word: 'duda', isTarget: true },
        { word: 'Dina', isTarget: true },
        { word: 'doctor', isTarget: true },
        { word: 'cama', isTarget: false },
        { word: 'pluma', isTarget: false },
        { word: 'quema', isTarget: false },
      ],
    },
    shortest: { answer: 'de', options: ['de', 'dado', 'dardo'] },
    syllables: { word: 'doctor', parts: ['doc', 'tor'], options: [2, 3, 4] },
  },
  'otras-1': {
    find: {
      prompt: 'Marca las palabras que empiezan con E.',
      options: [
        { word: 'en', isTarget: true },
        { word: 'este', isTarget: true },
        { word: 'Elmo', isTarget: true },
        { word: 'alma', isTarget: false },
        { word: 'sus', isTarget: false },
        { word: 'andar', isTarget: false },
      ],
    },
    shortest: { answer: 'en', options: ['en', 'isla', 'antes'] },
    syllables: { word: 'usted', parts: ['us', 'ted'], options: [2, 3, 4] },
  },
  'otras-2': {
    find: {
      prompt: 'Marca las palabras que empiezan con M.',
      options: [
        { word: 'mudo', isTarget: true },
        { word: 'moco', isTarget: true },
        { word: 'Maco', isTarget: true },
        { word: 'rico', isTarget: false },
        { word: 'seda', isTarget: false },
        { word: 'taco', isTarget: false },
      ],
    },
    shortest: { answer: 'mico', options: ['mico', 'nadar', 'templo'] },
    syllables: { word: 'templo', parts: ['tem', 'plo'], options: [2, 3, 4] },
  },
}

export const unit2PracticeGroups = unit2WordPracticeGroups.map((group) => {
  const details = groupDetails[group.id]

  return {
    lessonId: group.id,
    themeId: unit2WordPracticeId,
    label: group.title,
    title: `Palabras con ${group.title}`,
    coverImage: details.coverImage,
    coverAlt: details.coverAlt,
    words: wordsFor(group.id),
    find: {
      ...details.find,
      options: details.find.options.map((option, index) => ({
        ...option,
        id: `${group.id}-find-${index}`,
      })),
    },
    shortest: details.shortest,
    syllables: details.syllables,
  }
})

export const unit2WordPracticeConfig = {
  groups: unit2PracticeGroups,
  practiceId: unit2WordPracticeId,
  title: 'Repaso de la Unidad 2',
  unitLabel: 'Unidad 2 · Práctica de lectura',
  intro: 'Elige un grupo. Lee las palabras y completa los retos.',
}
