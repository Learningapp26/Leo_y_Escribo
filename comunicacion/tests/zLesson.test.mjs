import test from 'node:test'
import assert from 'node:assert/strict'
import { zLesson } from '../src/data/zData.js'
import { getLessonById, isLessonUnlocked } from '../src/data/units.js'
import { getLessonThemeClass } from '../src/data/lessonColors.js'

test('Z follows H and uses the existing Unit 5 unlock rules', () => {
  assert.equal(getLessonById('z').title, 'Letra Z')
  assert.equal(getLessonById('z').route, '/lecciones/z')
  assert.equal(getLessonThemeClass('z'), 'lesson-theme--unit-5')
  assert.equal(isLessonUnlocked('z', new Set(['dr'])), false)
  assert.equal(isLessonUnlocked('z', new Set(['h'])), true)
  assert.equal(isLessonUnlocked('z', new Set(['z'])), true)
})

test('Z keeps the full story and four activities', () => {
  assert.equal(zLesson.reading.paragraphs.length, 3)
  assert.equal(zLesson.reading.questions.length, 4)
  assert.equal(zLesson.reading.audio.text, `${zLesson.reading.title}\n\n${zLesson.reading.paragraphs.join('\n\n')}`)
  assert.deepEqual(zLesson.activities.map((item) => item.id), ['sonidos', 'silabas', 'completar', 'final'])
})

test('Z answers are reachable and orderings use exactly their bank', () => {
  for (const activity of zLesson.activities) {
    const ids = activity.exercises.map((item) => item.id)
    assert.equal(new Set(ids).size, ids.length)
    for (const exercise of activity.exercises) {
      assert.ok(exercise.instruction.text)
      if (exercise.type === 'select') {
        assert.ok(exercise.answers.length, exercise.id)
        assert.ok(exercise.answers.every((id) => exercise.options.some((item) => item.id === id)), exercise.id)
        if (!exercise.multiple) assert.equal(exercise.answers.length, 1, exercise.id)
      }
      if (exercise.type === 'order') {
        assert.deepEqual(exercise.options.map((item) => item.label).sort(), [...exercise.answer].sort(), exercise.id)
      }
    }
  }
})

test('every Z image lives in the Z folder and every audio has one transcript', () => {
  const tracks = new Map()
  function walk(value) {
    if (!value || typeof value !== 'object') return
    if (value.src) {
      assert.match(value.src, /^\/audio\/lecciones\/z\/[a-z0-9-]+\.mp3$/)
      assert.ok(value.text)
      if (tracks.has(value.src)) assert.equal(tracks.get(value.src), value.text, value.src)
      tracks.set(value.src, value.text)
    }
    if (typeof value.image === 'string') assert.match(value.image, /^\/images\/lecciones\/z\/[a-z0-9-]+\.(png|svg)$/)
    Object.values(value).forEach(walk)
  }
  walk(zLesson)
})
