import test from 'node:test'
import assert from 'node:assert/strict'
import { ceCiLesson } from '../src/data/ceCIData.js'
import { getLessonById } from '../src/data/units.js'

test('ce-ci is available in Unit 6 and follows the shared book lesson structure', () => {
  assert.equal(getLessonById('ce-ci').route, '/lecciones/ce-ci')
  assert.deepEqual(ceCiLesson.activities.map(({ id }) => id), ['sonidos', 'palabras', 'oraciones'])
  assert.equal(ceCiLesson.reading.questions.length, 2)
})

test('ce-ci sound selection accepts cinturón but not queso', () => {
  const exercise = ceCiLesson.activities[0].exercises.find(({ id }) => id === 'dibujos-ce-ci')
  const correctIds = exercise.answers

  assert.ok(correctIds.includes(exercise.options.find(({ label }) => label === 'cinturón').id))
  assert.ok(!correctIds.includes(exercise.options.find(({ label }) => label === 'queso').id))
})

test('sentence completion uses a four-word bank and matching illustrations', () => {
  const exercises = ceCiLesson.activities.at(-1).exercises.filter(({ sentenceCompletion }) => sentenceCompletion)
  assert.deepEqual(exercises.map(({ answers }) => answers), [['ciruela'], ['pecera'], ['cerdo']])

  for (const exercise of exercises) {
    assert.equal(exercise.options.length, 4)
    assert.deepEqual(exercise.options.map(({ label }) => label), ['ciruela', 'cerdo', 'pecera', 'cebolla'])
    assert.ok(exercise.options.every(({ completionImage }) => completionImage.startsWith('/images/lecciones/ce-ci/')))
    assert.ok(exercise.instruction.text)
    assert.ok(exercise.sentenceCompletion.audio.text)
  }
})
