export const SUBIDAS_RESBALONES_ID = 'subidas-resbalones'

export const BOARD_ORDER = [
  20, 19, 18, 17, 16,
  11, 12, 13, 14, 15,
  10, 9, 8, 7, 6,
  1, 2, 3, 4, 5,
]

export const BOARD_EFFECTS = {
  2: { type: 'ladder-task', destination: 8, label: 'Sube a 8' },
  3: { type: 'advance', destination: 4, label: 'Avanza a 4' },
  6: { type: 'slide', destination: 4, label: 'Resbala a 4' },
  8: { type: 'ladder', destination: 14, label: 'Sube a 14' },
  12: { type: 'slide', destination: 10, label: 'Resbala a 10' },
  14: { type: 'ladder', destination: 17, label: 'Sube a 17' },
  18: { type: 'slide', destination: 13, label: 'Resbala a 13' },
}

export const SQUARE_TASKS = {
  2: {
    type: 'word',
    prompt: 'Escribe una palabra que comience con d.',
    hint: 'Por ejemplo, piensa en palabras que empiezan con el sonido /d/.',
    validate: (answers) => isWordStartingWith(answers[0], 'd'),
    success: '¡Muy bien! Tu palabra comienza con d. Ahora subes.',
    retry: 'Revisa que tu palabra comience con la letra d.',
  },
  4: {
    type: 'word',
    prompt: 'Escribe una palabra que contenga pl.',
    hint: 'Busca las dos letras juntas: p y l.',
    validate: (answers) => isWordContaining(answers[0], 'pl'),
    success: '¡Excelente! Encontraste pl dentro de una palabra.',
    retry: 'Busca una palabra donde p y l aparezcan juntas.',
  },
  5: {
    type: 'image-word',
    image: '/images/lecciones/y/sol.png',
    imageAlt: 'Un sol amarillo.',
    prompt: 'Mira el dibujo. Escribe su nombre o sus letras en orden.',
    hint: 'Puedes escribir “sol” o s-o-l.',
    validate: (answers) => normalizeLetters(answers[0]) === 'sol',
    success: '¡Correcto! Sol se escribe s-o-l.',
    retry: 'Di el nombre del dibujo lentamente y revisa sus letras.',
  },
  7: {
    type: 'two-words',
    prompt: 'Escribe dos palabras que comiencen con qu.',
    hint: 'Cada espacio necesita una palabra distinta.',
    validate: (answers) => answers.every((answer) => isWordStartingWith(answer, 'qu')),
    success: '¡Muy bien! Las dos palabras comienzan con qu.',
    retry: 'Revisa que las dos palabras empiecen con qu.',
  },
  9: {
    type: 'syllables',
    prompt: 'Divide escoba en sílabas.',
    hint: 'Da tres palmadas mientras dices la palabra.',
    validate: (answers) => hasSyllables(answers[0], ['es', 'co', 'ba']),
    success: '¡Correcto! es-co-ba tiene tres sílabas.',
    retry: 'Da palmadas: cada sílaba necesita su propio espacio o guion.',
  },
  10: {
    type: 'sentence',
    prompt: 'Escribe una oración que tenga una palabra con ay.',
    hint: 'Tu oración necesita al menos dos palabras.',
    validate: (answers) => hasWords(answers[0], 2) && getWords(answers[0]).some((word) => /ay/.test(normalizeLetters(word))),
    success: '¡Muy bien! Tu oración tiene una palabra con ay.',
    retry: 'Escribe una oración de dos o más palabras que incluya ay.',
  },
  11: {
    type: 'image-word',
    image: '/images/lecciones/r/loro.png',
    imageAlt: 'Un loro de colores.',
    prompt: 'Mira el dibujo. Escribe su nombre o sus letras en orden.',
    hint: 'Puedes escribir “loro” o l-o-r-o.',
    validate: (answers) => normalizeLetters(answers[0]) === 'loro',
    success: '¡Correcto! Loro se escribe l-o-r-o.',
    retry: 'Di el nombre del animal lentamente y revisa sus letras.',
  },
  13: {
    type: 'two-words',
    prompt: 'Escribe dos palabras que comiencen con c.',
    hint: 'Cada espacio necesita una palabra distinta.',
    validate: (answers) => answers.every((answer) => isWordStartingWith(answer, 'c')),
    success: '¡Excelente! Las dos palabras comienzan con c.',
    retry: 'Revisa que las dos palabras empiecen con c.',
  },
  15: {
    type: 'image-word',
    image: '/images/lecciones/n/camion.png',
    imageAlt: 'Un camión.',
    prompt: 'Mira el camión. ¿Cuál es la última letra de su nombre?',
    hint: 'Puedes escribir la letra o su nombre.',
    validate: (answers) => ['n', 'ene'].includes(normalizeLetters(answers[0])),
    success: '¡Correcto! Camión termina con n.',
    retry: 'Escucha el final de ca-mión y escribe su última letra.',
  },
  16: {
    type: 'two-words',
    prompt: 'Escribe dos palabras donde s aparezca después de una vocal.',
    hint: 'Busca una vocal seguida por s, como en “es”.',
    validate: (answers) => answers.every((answer) => /[aeiou]s/.test(normalizeLetters(answer))),
    success: '¡Muy bien! En las dos palabras la s va después de una vocal.',
    retry: 'Busca en cada palabra una vocal seguida inmediatamente por s.',
  },
  19: {
    type: 'word',
    prompt: 'Escribe una palabra que tenga i después de otra vocal.',
    hint: 'Busca una vocal seguida inmediatamente por i.',
    validate: (answers) => /[aeou]i/.test(normalizeLetters(answers[0])),
    success: '¡Excelente! La i aparece después de otra vocal.',
    retry: 'Revisa que una vocal esté justo antes de la i.',
  },
  20: {
    type: 'final-sentence',
    prompt: 'Escribe una oración que comience con mayúscula y termine con punto.',
    hint: 'Tu oración necesita al menos dos palabras.',
    validate: (answers) => isCapitalizedSentence(answers[0]),
    success: '¡Terminaste! Tu oración comienza con mayúscula y termina con punto.',
    retry: 'Revisa la mayúscula al inicio, el punto al final y que haya dos palabras.',
  },
}

function stripAccents(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function normalizeLetters(value = '') {
  return stripAccents(value)
    .toLowerCase()
    .replace(/[^a-zñ]/g, '')
}

function validWord(value) {
  return /^[a-zñáéíóúü]+$/i.test(value.trim()) && normalizeLetters(value).length >= 2
}

function isWordStartingWith(value, start) {
  return validWord(value) && normalizeLetters(value).startsWith(start)
}

function isWordContaining(value, letters) {
  return validWord(value) && normalizeLetters(value).includes(letters)
}

function hasWords(value, minimum) {
  return getWords(value).length >= minimum
}

function getWords(value) {
  return value.trim().match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g) ?? []
}

function hasSyllables(value, syllables) {
  const parts = value
    .trim()
    .split(/[\s-]+/)
    .filter(Boolean)
    .map(normalizeLetters)

  return parts.length === syllables.length && parts.every((part, index) => part === syllables[index])
}

function isCapitalizedSentence(value) {
  const trimmed = value.trim()
  return /^[A-ZÁÉÍÓÚÜÑ]/.test(trimmed) && trimmed.endsWith('.') && hasWords(trimmed, 2)
}
