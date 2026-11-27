import assert from 'node:assert/strict'
import test from 'node:test'
import { allSyllablesTouched, isSyllablePresentation, markSyllableTouched, syllableKey } from './syllablePractice.js'

const items = ['ma', 'me', 'mi', 'mo', 'mu'].map((syllable) => ({ syllable }))

test('continue requires every combination and repeated taps do not count twice', () => {
  let touched = []
  assert.equal(allSyllablesTouched(items, touched), false)
  for (let repeat = 0; repeat < 5; repeat++) touched = markSyllableTouched(touched, syllableKey(items[0], 0))
  assert.equal(touched.length, 1)
  assert.equal(allSyllablesTouched(items, touched), false)
  for (let index = 1; index < items.length; index++) {
    touched = markSyllableTouched(touched, syllableKey(items[index], index))
    assert.equal(allSyllablesTouched(items, touched), index === items.length - 1)
  }
})

test('every displayed card must be touched even when labels repeat', () => {
  const repeated = [{ syllable: 'la' }, { syllable: 'la' }]
  assert.equal(allSyllablesTouched(repeated, [syllableKey(repeated[0], 0)]), false)
  assert.equal(allSyllablesTouched(repeated, repeated.map(syllableKey)), true)
})

test('presentation detection covers combinations and excludes words and graded choices', () => {
  const combinations = ['güe', 'güi'].map((label) => ({ label, audio: { category: 'Sílabas' } }))
  assert.equal(isSyllablePresentation({ type: 'present', items: combinations }), true)
  assert.equal(isSyllablePresentation({ type: 'select', items: combinations }), false)
  assert.equal(isSyllablePresentation({ type: 'present', items: [{ label: 'luna', audio: { category: 'Palabras' } }] }), false)
  assert.equal(isSyllablePresentation({ type: 'present', items: [{ label: 'vergüenza', audio: { category: 'Sílabas' } }] }), false)
  assert.equal(isSyllablePresentation({ type: 'present', items: [] }), false)
})
