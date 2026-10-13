// Relación central entre los identificadores de ruta y su planeta (unidad
// del libro). Las vocales son el Planeta Burbuja (0). Los colores se definen
// exclusivamente en lesson-themes.css (.planet--N).
export const LESSON_UNIT_MAP = {
  vocales: 0,
  m: 1,
  l: 1,
  s: 1,
  'y-conjuncion': 1,
  r: 1,
  p: 1,
  t: 1,
  n: 1,
  'juguemos-palabras': 1,
  'repaso-unidad-1': 1,
  c: 2,
  q: 2,
  d: 2,
  'silabas-inversas': 2,
  pl: 2,
  pr: 2,
  'repaso-unidad-2': 2,
  'subidas-resbalones': 2,
  b: 3,
  j: 3,
  tr: 3,
  bl: 3,
  'domino-palabras': 3,
  'repaso-unidad-3': 3,
  br: 3,
  ch: 3,
  cl: 4,
  cr: 4,
  f: 4,
  v: 4,
  rr: 4,
  enie: 4,
  'repaso-unidad-4': 4,
  'juego-memoria': 4,
  dr: 5,
  g: 5,
  h: 5,
  z: 5,
  ll: 5,
  gr: 5,
  gl: 5,
  'repaso-unidad-5': 5,
  'gato-raton': 5,
  x: 6,
  'y-letra': 6,
  k: 6,
  w: 6,
  fr: 6,
  fl: 6,
  'ge-gi': 6,
  'ce-ci': 6,
  'gue-con-dieresis': 6,
}

export function getLessonUnit(lessonId) {
  if (typeof lessonId !== 'string') return null

  return LESSON_UNIT_MAP[lessonId] ?? null
}

export function getLessonThemeClass(lessonId) {
  const unit = getLessonUnit(lessonId)

  return unit === null ? 'planet--default' : `planet--${unit}`
}
