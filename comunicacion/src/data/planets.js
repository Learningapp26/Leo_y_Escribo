// Cada unidad del libro es un planeta del "Viaje al espacio". El color de
// cada planeta vive en lesson-themes.css (.planet--N) y coincide con el
// color de esa unidad en el índice del libro.
export const PLANETS = [
  { id: 0, name: 'Burbuja', alien: 'Bubi', deco: 'burbujas', pages: '5', letters: ['a', 'e', 'i', 'o', 'u'], finalGame: null },
  { id: 1, name: 'Nube', alien: 'Nubo', deco: 'nubes', pages: '7–57', letters: ['m', 'l', 's', 'y', 'r', 'p', 't', 'n'], finalGame: '¡Juguemos con las palabras!' },
  { id: 2, name: 'Volcán', alien: 'Chispa', deco: 'volcan', pages: '59–95', letters: ['c', 'q', 'd', 'l · s · n', 'pl', 'pr'], finalGame: '¡Subidas y resbalones de palabras!' },
  { id: 3, name: 'Selva', alien: 'Coco', deco: 'hojas', pages: '97–129', letters: ['b', 'j', 'tr', 'bl', 'br', 'ch'], finalGame: '¡Dominó de palabras!' },
  { id: 4, name: 'Miel', alien: 'Mielo', deco: 'panal', pages: '131–169', letters: ['cl', 'cr', 'f', 'v', 'rr', 'ñ'], finalGame: '¡Ejercita la memoria!' },
  { id: 5, name: 'Cristal', alien: 'Lumi', deco: 'cristales', pages: '171–211', letters: ['dr', 'g', 'h', 'z', 'll', 'gr', 'gl'], finalGame: '¡El gato y el ratón!' },
  { id: 6, name: 'Dulce', alien: 'Dulci', deco: 'anillo', pages: '213–245', letters: ['x', 'y', 'k', 'w', 'fr', 'fl', 'ge', 'gi', 'ce', 'ci', 'gü'], finalGame: '¡El juego del abecedario!' },
  { id: 7, name: 'Escritor', alien: 'Lapi', deco: 'lapiz', pages: '247–255', letters: ['vocales juntas', 'mp', 'mb', 'ge-gi', 'je-ji', 'll', 'y', 'q', 'c', 'h'], finalGame: 'Escribir palabras con el dedo' },
]

export function getPlanet(unit) {
  return PLANETS[unit] ?? null
}

export function getPlanetClass(unit) {
  return getPlanet(unit) ? `planet--${unit}` : 'planet--default'
}

// Juegos finales de cada unidad: se muestran como la caja "Premio".
export const FINAL_GAME_IDS = new Set(['juguemos-palabras', 'subidas-resbalones', 'domino-palabras', 'juego-memoria'])

const GLYPHS = {
  vocales: 'a e i o u',
  'silabas-inversas': 'l · s · n',
  'y-conjuncion': 'y',
  'y-letra': 'y',
  enie: 'ñ',
  'ge-gi': 'ge gi',
  'ce-ci': 'ce ci',
  'gue-con-dieresis': 'gü',
}

// Letra o grupo de letras que se escribe dentro del planeta de una lección.
export function getLessonGlyph(lesson) {
  if (GLYPHS[lesson.id]) return GLYPHS[lesson.id]
  if (lesson.id.startsWith('repaso-')) return null
  if (FINAL_GAME_IDS.has(lesson.id)) return null
  return lesson.id.length <= 2 ? lesson.id : null
}

// Planeta (0–7) de una unidad de la app; las vocales son el Planeta Burbuja.
export function getLessonPlanet(lesson, unitId) {
  return lesson.id === 'vocales' ? 0 : unitId
}
