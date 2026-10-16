// Shared display rules for lesson letters. Keep exercise answers unchanged.
const LESSON_GROUPS = {
  vocales: ['a', 'e', 'i', 'o', 'u'],
  'y-conjuncion': ['y'],
  'y-letra': ['y'],
  enie: ['ñ'],
  'silabas-inversas': ['l', 's', 'n'],
  'ge-gi': ['ge', 'gi'],
  'ce-ci': ['ce', 'ci'],
  'gue-con-dieresis': ['gü'],
}

export function formatLetterGroup(value, compact = false) {
  const group = value.toLocaleLowerCase('es')
  if (!/^[a-zñü]{1,2}$/.test(group)) return value
  const capitalized = group[0].toLocaleUpperCase('es') + group.slice(1)
  return group.length === 1
    ? `${capitalized}${compact ? '' : ', '}${group}`
    : capitalized
}

export function getLessonTargets(id) {
  return LESSON_GROUPS[id] ?? (/^[a-zñü]{1,2}$/.test(id ?? '') ? [id] : null)
}

export function getLessonLetters(id, compact = false) {
  const groups = getLessonTargets(id)
  return groups?.map((group) => formatLetterGroup(group, compact)).join(compact ? ' ' : ' · ') ?? null
}

export function getLessonCardLabel(id, fallback) {
  return getLessonLetters(id, true) ?? fallback
}

export function getLessonHeading(id, fallback) {
  const letters = getLessonLetters(id)
  if (!letters) return fallback
  if (id === 'vocales') return `Las vocales ${letters}`
  if (id === 'silabas-inversas') return `Sílabas inversas: ${letters}`
  if (id === 'y-conjuncion') return `La ${letters} como conjunción`
  const groups = LESSON_GROUPS[id] ?? [id]
  return `${groups.every((group) => group.length === 1) ? 'La letra' : 'Combinación'} ${letters}`
}
