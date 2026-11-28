import assert from 'node:assert/strict'
import test from 'node:test'
import { WORD_PRACTICE_REQUIREMENTS } from '../data/wordPracticeRequirements.js'
import { wordPracticeGroups } from '../data/wordPracticeData.js'
import {
  allPracticeGroupsCompleted,
  canAdvanceWordPractice,
  checkWordPracticeAnswer,
  createWordPracticeProgress,
  getCompletedPracticeGroups,
  WORD_PRACTICE_CHALLENGES,
} from './wordPracticeProgress.js'

const practiceId = 'repaso-unidad-1'
const groupIds = WORD_PRACTICE_REQUIREMENTS[practiceId]
const completion = (parte) => ({
  actividad: 'leccion-completada', correcto: true, detalle: { leccionId: practiceId, parte },
})

test('one letter and old premature completion markers never finish the whole practice', () => {
  const records = [completion(), completion('m'), completion('m'), completion('unknown')]
  const completed = getCompletedPracticeGroups(records, practiceId, groupIds)
  assert.deepEqual(completed, ['m'])
  assert.equal(allPracticeGroupsCompleted(groupIds, completed), false)
  assert.equal(allPracticeGroupsCompleted([], []), false)
})

test('every group is required to award completion in every configured unit', () => {
  for (const [id, ids] of Object.entries(WORD_PRACTICE_REQUIREMENTS)) {
    const records = ids.map((parte) => ({
      actividad: 'leccion-completada', correcto: true, detalle: { leccionId: id, parte },
    }))
    assert.equal(allPracticeGroupsCompleted(ids, getCompletedPracticeGroups(records.slice(1), id, ids)), false)
    assert.equal(allPracticeGroupsCompleted(ids, getCompletedPracticeGroups(records, id, ids)), true)
  }
})

test('legacy successful challenges restore completed letters without mixing groups or units', () => {
  const challenge = (fase, grupo = 'r', correcto = true) => ({
    actividad: `${practiceId}-${fase}`, correcto, detalle: { leccionId: practiceId, grupo, fase },
  })
  const records = [challenge('buscar'), challenge('corta'), challenge('silabas', 'r', false), challenge('silabas', 't')]
  assert.deepEqual(getCompletedPracticeGroups(records, practiceId, groupIds), [])
  records.push(challenge('silabas'))
  assert.deepEqual(getCompletedPracticeGroups(records, practiceId, groupIds), ['r'])
  assert.deepEqual(getCompletedPracticeGroups(records, 'repaso-unidad-2', groupIds), [])
})

test('reading requires every different word and drafts have independent selections', () => {
  const group = wordPracticeGroups[0]
  const draft = createWordPracticeProgress()
  const other = createWordPracticeProgress()
  draft.readWordIds.push(group.words[0].id, group.words[0].id)
  assert.deepEqual(other.readWordIds, [])
  assert.equal(canAdvanceWordPractice(group, draft), false)
  draft.readWordIds = group.words.map((word) => word.id)
  assert.equal(canAdvanceWordPractice(group, draft), true)
})

test('correct selections, shortest words and syllable counts unlock only their own step', () => {
  for (const group of wordPracticeGroups) {
    const draft = createWordPracticeProgress()
    draft.stepIndex = 1
    draft.selectedFindIds = group.find.options.filter((option) => option.isTarget).map((option) => option.id)
    assert.equal(checkWordPracticeAnswer(group, draft), true)
    draft.selectedFindIds.pop()
    assert.equal(checkWordPracticeAnswer(group, draft), false)
    for (const [index, field] of WORD_PRACTICE_CHALLENGES.map((step, index) => [index + 1, { buscar: 'findFeedback', corta: 'shortFeedback', silabas: 'syllableFeedback' }[step]])) {
      draft.stepIndex = index
      draft[field] = 'retry'
      assert.equal(canAdvanceWordPractice(group, draft), false)
      draft[field] = 'correct'
      assert.equal(canAdvanceWordPractice(group, draft), true)
    }
    draft.stepIndex = 2
    draft.shortWordId = group.shortest.answer
    assert.equal(checkWordPracticeAnswer(group, draft), true)
    draft.shortWordId = group.shortest.options.find((word) => word !== group.shortest.answer)
    assert.equal(checkWordPracticeAnswer(group, draft), false)
    draft.stepIndex = 3
    draft.syllableCount = group.syllables.parts.length
    assert.equal(checkWordPracticeAnswer(group, draft), true)
    draft.syllableCount += 1
    assert.equal(checkWordPracticeAnswer(group, draft), false)
  }
})
