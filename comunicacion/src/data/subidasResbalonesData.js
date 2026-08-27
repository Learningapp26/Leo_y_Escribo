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

// El libro propone escribir en varias casillas. En el juego digital cada reto
// se resuelve tocando palabras u oraciones completas, para que la validación
// sea clara y apropiada para el nivel de los estudiantes.
export const SQUARE_TASKS = {
  2: createChoiceTask({
    prompt: 'Toca una palabra que comience con d.',
    hint: 'Escucha el primer sonido de cada palabra.',
    options: choiceOptions(['dado', 'mesa', 'sol']),
    correctIds: ['dado'],
    success: '¡Muy bien! Dado comienza con d. Ahora subes.',
    retry: 'Revisa el primer sonido de cada palabra.',
  }),
  4: createChoiceTask({
    prompt: 'Toca la palabra que contiene pl.',
    hint: 'Busca las dos letras juntas: p y l.',
    options: choiceOptions(['plato', 'gato', 'rana']),
    correctIds: ['plato'],
    success: '¡Excelente! Plato tiene pl.',
    retry: 'Busca una palabra donde p y l aparezcan juntas.',
  }),
  5: createChoiceTask({
    image: '/images/lecciones/y/sol.png',
    imageAlt: 'Un sol amarillo.',
    prompt: 'Mira el dibujo. Toca su nombre.',
    hint: 'Di el nombre del dibujo lentamente.',
    options: choiceOptions(['sol', 'sal', 'los']),
    correctIds: ['sol'],
    success: '¡Correcto! Sol se escribe s-o-l.',
    retry: 'Di el nombre del dibujo y revisa sus letras.',
  }),
  7: createChoiceTask({
    prompt: 'Toca las dos palabras que comienzan con qu.',
    hint: 'Cada palabra correcta empieza con las letras q y u.',
    options: choiceOptions(['queso', 'quince', 'casa', 'gato']),
    correctIds: ['queso', 'quince'],
    success: '¡Muy bien! Queso y quince comienzan con qu.',
    retry: 'Revisa que las dos palabras empiecen con qu.',
  }),
  9: createChoiceTask({
    prompt: 'Toca cómo se divide escoba en sílabas.',
    hint: 'Da tres palmadas mientras dices la palabra.',
    options: choiceOptions(['es-co-ba', 'e-sco-ba', 'es-cob-a']),
    correctIds: ['es-co-ba'],
    success: '¡Correcto! Es-co-ba tiene tres sílabas.',
    retry: 'Da palmadas: cada sílaba va separada por un guion.',
  }),
  10: createChoiceTask({
    prompt: 'Toca la oración que tiene una palabra con ay.',
    hint: 'Lee cada oración y busca las letras a y juntas.',
    options: choiceOptions(['Hay un payaso.', 'El sol brilla.', 'Mi casa es azul.']),
    correctIds: ['Hay un payaso.'],
    success: '¡Muy bien! Payaso tiene ay.',
    retry: 'Busca una oración que tenga las letras a y juntas.',
  }),
  11: createChoiceTask({
    image: '/images/lecciones/r/loro.png',
    imageAlt: 'Un loro de colores.',
    prompt: 'Mira el dibujo. Toca su nombre.',
    hint: 'Di el nombre del animal lentamente.',
    options: choiceOptions(['loro', 'loma', 'rosa']),
    correctIds: ['loro'],
    success: '¡Correcto! Loro se escribe l-o-r-o.',
    retry: 'Di el nombre del animal y revisa sus letras.',
  }),
  13: createChoiceTask({
    prompt: 'Toca las dos palabras que comienzan con c.',
    hint: 'Escucha el primer sonido de cada palabra.',
    options: choiceOptions(['casa', 'cama', 'mesa', 'gato']),
    correctIds: ['casa', 'cama'],
    success: '¡Excelente! Casa y cama comienzan con c.',
    retry: 'Revisa que las dos palabras empiecen con c.',
  }),
  15: createChoiceTask({
    image: '/images/lecciones/n/camion.png',
    imageAlt: 'Un camión.',
    prompt: 'Mira el camión. ¿Cuál es la última letra de su nombre?',
    hint: 'Escucha el final de ca-mión.',
    options: choiceOptions(['n', 'm', 's']),
    correctIds: ['n'],
    success: '¡Correcto! Camión termina con n.',
    retry: 'Escucha el final de ca-mión.',
  }),
  16: createChoiceTask({
    prompt: 'Toca las dos palabras donde s aparece después de una vocal.',
    hint: 'Busca una vocal seguida inmediatamente por s, como en es.',
    options: choiceOptions(['espada', 'isla', 'mano', 'luna']),
    correctIds: ['espada', 'isla'],
    success: '¡Muy bien! En espada e isla, la s va después de una vocal.',
    retry: 'Busca en cada palabra una vocal seguida inmediatamente por s.',
  }),
  19: createChoiceTask({
    prompt: 'Toca una palabra que tenga i después de otra vocal.',
    hint: 'Busca una vocal seguida inmediatamente por i.',
    options: choiceOptions(['aire', 'mesa', 'sol']),
    correctIds: ['aire'],
    success: '¡Excelente! En aire, la i aparece después de otra vocal.',
    retry: 'Revisa qué letra está justo antes de la i.',
  }),
  20: createChoiceTask({
    prompt: 'Toca la oración que comienza con mayúscula y termina con punto.',
    hint: 'Mira la primera letra y el final de cada oración.',
    options: choiceOptions(['La casa es azul.', 'la casa es azul.', 'La casa es azul']),
    correctIds: ['La casa es azul.'],
    success: '¡Terminaste! La oración comienza con mayúscula y termina con punto.',
    retry: 'Revisa la mayúscula al inicio y el punto al final.',
  }),
}

function choiceOptions(labels) {
  return labels.map((label) => ({ id: label, label }))
}

function createChoiceTask({ correctIds, options, ...task }) {
  return {
    ...task,
    type: 'choice',
    options,
    selectionCount: correctIds.length,
    validate: (answers) => hasExactChoices(answers, correctIds),
  }
}

function hasExactChoices(answers, correctIds) {
  return (
    answers.length === correctIds.length &&
    new Set(answers).size === answers.length &&
    answers.every((answer) => correctIds.includes(answer))
  )
}
