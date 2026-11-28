export const WORD_PRACTICE_STEPS = ['leer', 'buscar', 'corta', 'silabas']
export const WORD_PRACTICE_CHALLENGES = WORD_PRACTICE_STEPS.slice(1)

export function createWordPracticeProgress() {
  return {
    stepIndex: 0,
    readWordIds: [],
    selectedFindIds: [],
    findFeedback: '',
    shortWordId: '',
    shortFeedback: '',
    syllableCount: null,
    syllableFeedback: '',
    earnedSteps: [],
  }
}

export function getCompletedPracticeGroups(records, practiceId, groupIds) {
  const validGroups = new Set(groupIds)
  const completed = new Set()
  const challenges = new Map()

  for (const record of records) {
    if (!record.correcto || record.detalle?.leccionId !== practiceId) continue
    const { parte, grupo, fase } = record.detalle
    if (record.actividad === 'leccion-completada' && validGroups.has(parte)) completed.add(parte)

    // Recupera letras terminadas con la versión anterior, que guardaba los
    // tres retos por separado y marcaba toda la práctica demasiado pronto.
    if (validGroups.has(grupo) && WORD_PRACTICE_CHALLENGES.includes(fase) && record.actividad === `${practiceId}-${fase}`) {
      const passed = challenges.get(grupo) ?? new Set()
      passed.add(fase)
      challenges.set(grupo, passed)
    }
  }

  for (const [group, passed] of challenges) {
    if (WORD_PRACTICE_CHALLENGES.every((step) => passed.has(step))) completed.add(group)
  }

  return groupIds.filter((id) => completed.has(id))
}

export function allPracticeGroupsCompleted(groupIds, completedIds) {
  return groupIds.length > 0 && groupIds.every((id) => completedIds.includes(id))
}

export function canAdvanceWordPractice(group, progress) {
  switch (WORD_PRACTICE_STEPS[progress.stepIndex]) {
    case 'leer': return group.words.every((word) => progress.readWordIds.includes(word.id))
    case 'buscar': return progress.findFeedback === 'correct'
    case 'corta': return progress.shortFeedback === 'correct'
    case 'silabas': return progress.syllableFeedback === 'correct'
    default: return false
  }
}

export function checkWordPracticeAnswer(group, progress) {
  switch (WORD_PRACTICE_STEPS[progress.stepIndex]) {
    case 'buscar': {
      const targetIds = group.find.options.filter((option) => option.isTarget).map((option) => option.id)
      return progress.selectedFindIds.length === targetIds.length &&
        targetIds.every((id) => progress.selectedFindIds.includes(id))
    }
    case 'corta': return progress.shortWordId === group.shortest.answer
    case 'silabas': return progress.syllableCount === group.syllables.parts.length
    default: return false
  }
}
