import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { llLesson } from '../src/data/llData.js'
import { grLesson } from '../src/data/grData.js'
import { getLessonById, isLessonUnlocked } from '../src/data/units.js'
import { getLessonThemeClass } from '../src/data/lessonColors.js'

const lessons = [llLesson, grLesson]

test('Ll and Gr participate in the sequential Unit 5 progression', () => {
  for (const [id, previous] of [['ll', 'z'], ['gr', 'll'], ['gl', 'gr']]) {
    assert.ok(getLessonById(id))
    assert.equal(isLessonUnlocked(id, new Set()), false)
    assert.equal(isLessonUnlocked(id, new Set([previous])), true)
    assert.equal(isLessonUnlocked(id, new Set([id])), true)
    assert.equal(getLessonThemeClass(id), 'planet--5')
  }
  assert.equal(getLessonById('ll').title, 'Doble Ll')
  assert.equal(getLessonById('gr').title, 'Combinación Gr')
  assert.equal(isLessonUnlocked('gr', new Set(['z'])), false)
})

test('stories remain complete and each lesson has three activities', () => {
  assert.equal(llLesson.reading.paragraphs.length, 7)
  assert.equal(grLesson.reading.paragraphs.length, 4)
  assert.ok(llLesson.reading.paragraphs[1].includes('La pequeña nube se empecinaba en no dejar pasar a ninguna.'))
  assert.ok(grLesson.reading.paragraphs[2].includes('Ingrid cambió de emisora'))
  for (const lesson of lessons) {
    assert.equal(lesson.reading.audio.text, `${lesson.reading.title}\n\n${lesson.reading.paragraphs.join('\n\n')}`)
    assert.deepEqual(lesson.activities.map((activity) => activity.id), ['sonidos', 'silabas', 'final'])
    assert.ok(lesson.activities.flatMap((activity) => activity.exercises).length <= 15)
    assert.ok(lesson.reading.questions.every((question) => !question.audio))
  }
})

function canForm(answer, options, remaining) {
  if (!answer) return remaining === 0
  if (!remaining) return false
  return options.some((option, index) => answer.startsWith(option.label)
    && canForm(answer.slice(option.label.length), options.filter((_, i) => i !== index), remaining - 1))
}

test('all answers are reachable, including repeated letters and unused distractors', () => {
  for (const lesson of lessons) for (const activity of lesson.activities) {
    assert.equal(new Set(activity.exercises.map((exercise) => exercise.id)).size, activity.exercises.length)
    for (const exercise of activity.exercises) {
      if (exercise.type === 'select') {
        assert.ok(exercise.answers.length)
        assert.ok(exercise.answers.every((id) => exercise.options.some((option) => option.id === id)))
      }
      if (exercise.type === 'match') {
        assert.ok(exercise.groups.every((group) => group.options.some((option) => option.id === group.answer)))
      }
      if (exercise.type === 'order') {
        if (exercise.answerIds) assert.deepEqual([...exercise.answerIds].sort(), exercise.options.map((option) => option.id).sort())
        else assert.ok(canForm(exercise.answer, exercise.options, exercise.answerLength ?? exercise.options.length), exercise.id)
      }
      if (exercise.type === 'boxes') {
        assert.ok(exercise.items.every((item) => item.answer >= 0 && item.answer < item.boxes))
        assert.equal(exercise.items.find((item) => item.id === 'galleta').answer, 1)
      }
    }
  }
  assert.equal(llLesson.activities.at(-1).exercises.at(-1).selectionCount, 3)
})

test('audio scripts are unambiguous and all activity illustrations exist', () => {
  for (const lesson of lessons) {
    const tracks = new Map()
    const visit = (value) => {
      if (!value || typeof value !== 'object') return
      if (value.src) {
        assert.match(value.src, new RegExp(`^/audio/lecciones/${lesson.id}/[a-z0-9-]+\\.mp3$`))
        assert.ok(value.text)
        if (tracks.has(value.src)) assert.equal(tracks.get(value.src), value.text, value.src)
        tracks.set(value.src, value.text)
      }
      if (value.image && value.image !== lesson.reading.image) {
        assert.ok(existsSync(new URL(`../public${value.image}`, import.meta.url)), value.image)
      }
      Object.values(value).forEach(visit)
    }
    visit(lesson)
    assert.ok(tracks.size > 40)
  }
})
