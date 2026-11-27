export function syllableKey(item, index) {
  return `${item.id ?? item.syllable ?? item.label}:${index}`
}

export function markSyllableTouched(touched, key) {
  return touched.includes(key) ? touched : [...touched, key]
}

export function allSyllablesTouched(items, touched) {
  return items.length > 0 && items.every((item, index) => touched.includes(syllableKey(item, index)))
}

export function isSyllablePresentation(exercise) {
  return exercise.type === 'present' && exercise.items?.length > 0 && exercise.items.every((item) =>
    /^[a-záéíóúüñ]{1,4}$/i.test(item.label) && (
      item.audio?.category === 'Sílabas' || /\/silaba-/.test(item.audio?.src ?? '')
    ),
  )
}
