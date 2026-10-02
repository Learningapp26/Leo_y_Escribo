import test from 'node:test'
import assert from 'node:assert/strict'
import { fLesson } from '../src/data/fData.js'
import { enieLesson } from '../src/data/enieData.js'
import { getLessonById, isLessonUnlocked, isUnitUnlocked } from '../src/data/units.js'
import { getLessonThemeClass } from '../src/data/lessonColors.js'

const lessons = [fLesson, enieLesson]

test('F and Ñ use the existing Unit 4 order, theme and unlock rules', () => {
  for (const lesson of lessons) {
    assert.equal(getLessonById(lesson.id).route, `/lecciones/${lesson.id}`)
    assert.equal(getLessonThemeClass(lesson.id), 'lesson-theme--unit-4')
    assert.equal(isLessonUnlocked(lesson.id, new Set()), false)
  }
  const progress = new Set(['repaso-unidad-3'])
  assert.equal(isUnitUnlocked(4, progress), true)
  assert.equal(isLessonUnlocked('f', progress), true)
  assert.equal(isLessonUnlocked('v', progress), false)
  progress.add('f')
  assert.equal(isLessonUnlocked('v', progress), true)
  assert.equal(isLessonUnlocked('enie', progress), false)
  progress.add('v')
  assert.equal(isLessonUnlocked('enie', progress), true)
  assert.equal(isLessonUnlocked('v', new Set(['v'])), true)
})

test('every selection has reachable, nonempty answers and every ordering uses exactly its bank', () => {
  for (const lesson of lessons) {
    assert.equal(lesson.reading.paragraphs.length, 4)
    assert.deepEqual(lesson.activities.map((activity) => activity.id), ['sonidos', 'silabas', 'completar', 'final'])
    for (const activity of lesson.activities) {
      const ids = activity.exercises.map((exercise) => exercise.id)
      assert.equal(new Set(ids).size, ids.length)
      for (const exercise of activity.exercises) {
        assert.ok(exercise.instruction.text)
        if (exercise.type === 'select') {
          const expected = exercise.answersByIndex ?? exercise.options.flatMap((option, index) => exercise.answers.includes(option.id) ? [index] : [])
          assert.ok(expected.length, exercise.id)
          assert.ok(expected.every((index) => exercise.options[index]), exercise.id)
          if (!exercise.multiple) assert.equal(expected.length, 1, exercise.id)
        }
        if (exercise.type === 'order') {
          const allPieces = exercise.options.map((option) => option.label).join('')
          assert.deepEqual([...allPieces].sort(), [...exercise.answer.replaceAll(' ', '')].sort(), exercise.id)
        }
      }
    }
  }
})

test('audio paths have exactly one transcript, preserve full stories and use the internal enie ID', () => {
  const audios = new Map()
  function walk(value) {
    if (!value || typeof value !== 'object') return
    if (value.src) {
      assert.match(value.src, /^\/audio\/lecciones\/(f|enie)\/[a-z0-9-]+\.mp3$/)
      assert.ok(value.text)
      if (audios.has(value.src)) assert.equal(audios.get(value.src), value.text, value.src)
      audios.set(value.src, value.text)
    }
    Object.values(value).forEach(walk)
  }
  walk(lessons)
  for (const { reading } of lessons) {
    assert.equal(reading.audio.text, `${reading.title}\n\n${reading.paragraphs.join('\n\n')}`)
  }
})

test('final activities preserve open composition and all printed sentence tokens', () => {
  const fFinal = fLesson.activities.at(-1).exercises
  assert.deepEqual(fFinal.filter((item) => item.type === 'oral').map((item) => item.prompt.label), ['familia', 'jirafa', 'feria'])
  const enieFinal = enieLesson.activities.at(-1).exercises
  assert.equal(enieFinal[0].items.length, 2)
  assert.equal(enieFinal[1].answer, 'La niña come caña y piña.')
  assert.equal(enieFinal[2].answer, 'El niño quiebra la piñata.')
  assert.equal(enieFinal[3].answer, 'Ñiara se lastimó su uña.')
})
