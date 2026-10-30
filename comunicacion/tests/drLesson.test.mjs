import test from 'node:test'
import assert from 'node:assert/strict'
import { drLesson } from '../src/data/drData.js'
import { getLessonById, isLessonUnlocked, isUnitUnlocked } from '../src/data/units.js'
import { getLessonThemeClass } from '../src/data/lessonColors.js'

test('Dr follows Unit 4 memory and uses the existing Unit 5 unlock rules', () => {
  assert.equal(getLessonById('dr').title, 'Dr')
  assert.equal(getLessonById('dr').route, '/lecciones/dr')
  assert.equal(getLessonThemeClass('dr'), 'planet--5')
  assert.equal(isUnitUnlocked(5, new Set()), false)
  assert.equal(isLessonUnlocked('dr', new Set(['repaso-unidad-4'])), false)
  assert.equal(isUnitUnlocked(5, new Set(['juego-memoria'])), true)
  assert.equal(isLessonUnlocked('dr', new Set(['juego-memoria'])), true)
  assert.equal(isLessonUnlocked('dr', new Set(['dr'])), true)
  assert.equal(isLessonUnlocked('g', new Set(['dr'])), true)
})

test('Dr keeps the full open-ended story and three compact activities', () => {
  assert.equal(drLesson.reading.paragraphs.length, 3)
  assert.ok(drLesson.reading.paragraphs.at(-1).endsWith('Entonces los niños...'))
  assert.equal(drLesson.reading.audio.text, `${drLesson.reading.title}\n\n${drLesson.reading.paragraphs.join('\n\n')}`)
  assert.deepEqual(drLesson.activities.map((item) => item.id), ['sonidos', 'silabas', 'final'])
  assert.equal(drLesson.activities.flatMap((item) => item.exercises).length, 14)
  assert.equal(drLesson.reading.image, '/images/lecciones/dr/lectura-dr.png')
})

test('Dr answers are reachable and classify the actual printed syllables', () => {
  for (const activity of drLesson.activities) {
    const ids = activity.exercises.map((item) => item.id)
    assert.equal(new Set(ids).size, ids.length)
    for (const exercise of activity.exercises) {
      if (exercise.type === 'select') {
        assert.ok(exercise.answers.length)
        assert.ok(exercise.answers.every((id) => exercise.options.some((item) => item.id === id)))
        if (exercise.id.startsWith('asociar-')) {
          const target = exercise.prompt.label
          const matches = exercise.options.filter((item) => item.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(target)).map((item) => item.id)
          assert.deepEqual(exercise.answers, matches)
        }
      }
      if (exercise.type === 'order') {
        assert.equal(exercise.options.map((item) => item.label).join(''), exercise.answer)
      }
    }
  }
  const composition = drLesson.activities.at(-1).exercises.at(-1)
  assert.equal(composition.type, 'oral')
  assert.deepEqual(composition.groups.map((group) => group.options.map((item) => item.label)), [
    ['dragón', 'perro', 'cocodrilo'], ['alto', 'rápido', 'fuerte'], ['ladra', 'nada', 'vuela'],
  ])
})

test('every Dr audio has an unambiguous recording transcript', () => {
  const tracks = new Map()
  function walk(value) {
    if (!value || typeof value !== 'object') return
    if (value.src) {
      assert.match(value.src, /^\/audio\/lecciones\/dr\/[a-z0-9-]+\.mp3$/)
      assert.ok(value.text)
      if (tracks.has(value.src)) assert.equal(tracks.get(value.src), value.text)
      tracks.set(value.src, value.text)
    }
    Object.values(value).forEach(walk)
  }
  walk(drLesson)
  assert.ok(tracks.has('/audio/lecciones/dr/sonidos-dragon.mp3'))
})
