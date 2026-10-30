import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { xLesson } from '../src/data/xData.js'
import { getLessonById, isLessonUnlocked, isUnitUnlocked } from '../src/data/units.js'
import { getLessonThemeClass } from '../src/data/lessonColors.js'

test('Xx opens Unit 6 only after the final Unit 5 game', () => {
  assert.equal(getLessonById('x').title, 'Xx')
  assert.equal(getLessonById('x').bookPage, 213)
  assert.equal(getLessonThemeClass('x'), 'planet--6')
  assert.equal(isUnitUnlocked(6), false)
  assert.equal(isLessonUnlocked('x', new Set(['gl'])), false)
  assert.equal(isLessonUnlocked('x', new Set(['gato-raton'])), true)
  assert.equal(isUnitUnlocked(6, new Set(['gato-raton'])), true)
  assert.equal(isLessonUnlocked('x', new Set(['x'])), true)
  assert.equal(isLessonUnlocked('y-letra', new Set(['x'])), true)
})

test('Xx retains all eight story paragraphs and three compact activities', () => {
  assert.equal(xLesson.letter, 'Xx')
  assert.equal(xLesson.heading, 'La letra Xx')
  assert.equal(xLesson.reading.paragraphs.length, 8)
  assert.deepEqual(xLesson.reading.paragraphs.slice(2, 5), [
    '—¿Qué es eso, Xiomara?', '—¿Cómo se toca?', '—¿Me dejas intentarlo?',
  ])
  assert.ok(xLesson.reading.paragraphs[6].includes('Sus padrinos se lo habían regalado por su cumpleaños, pero no lo sabía tocar.'))
  assert.ok(xLesson.reading.paragraphs[7].endsWith('Ese día estuvo lleno de mucha alegría y música.'))
  assert.equal(xLesson.reading.audio.text, `${xLesson.reading.title}\n\n${xLesson.reading.paragraphs.join('\n\n')}`)
  assert.deepEqual(xLesson.activities.map((activity) => activity.id), ['sonidos', 'silabas', 'final'])
  assert.ok(xLesson.activities.flatMap((activity) => activity.exercises).length <= 13)
  assert.ok(xLesson.reading.questions.every((question) => !question.audio))
})

test('printed words, sound distinctions and sentence answers remain reachable', () => {
  const exercises = xLesson.activities.flatMap((activity) => activity.exercises)
  assert.equal(new Set(exercises.map((exercise) => exercise.id)).size, exercises.length)
  for (const exercise of exercises) {
    assert.ok(exercise.instruction.src)
    if (exercise.type === 'match') {
      assert.equal(new Set(exercise.groups.map((group) => group.id)).size, exercise.groups.length)
      for (const group of exercise.groups) {
        assert.equal(group.options.filter((option) => option.id === group.answer).length, 1)
        assert.equal(new Set(group.options.map((option) => option.id)).size, group.options.length)
      }
    }
    if (exercise.type === 'select') {
      assert.ok(exercise.answers.length > 0)
      assert.ok(exercise.answers.every((id) => exercise.options.some((option) => option.id === id)))
    }
  }
  assert.deepEqual(xLesson.activities[0].exercises.slice(0, 2).map((exercise) => exercise.sound.text), ['s', 'ks'])
  assert.deepEqual(exercises.filter((exercise) => exercise.id.startsWith('palabras-iguales-'))
    .flatMap((exercise) => exercise.groups.map((group) => group.label)), ['laxante', 'boxeo', 'toxina', 'axila', 'Mixco', 'asfixia', 'xilote'])
  assert.deepEqual(exercises.filter((exercise) => exercise.id.startsWith('oracion-')).map((exercise) => exercise.answers[0]), ['sexto', 'boxean', 'conexion'])
  assert.deepEqual(exercises.at(-1).items.map((item) => item.label), ['xilófono', 'taxi', 'examen'])
})

test('Xx audio scripts are unambiguous and activity illustrations exist', () => {
  const tracks = new Map()
  const visit = (value) => {
    if (!value || typeof value !== 'object') return
    if (value.src) {
      assert.match(value.src, /^\/audio\/lecciones\/x\/[a-z0-9-]+\.mp3$/)
      assert.ok(value.text)
      if (tracks.has(value.src)) assert.equal(tracks.get(value.src), value.text, value.src)
      tracks.set(value.src, value.text)
    }
    if (value.image && value.image !== xLesson.reading.image) {
      assert.ok(existsSync(new URL(`../public${value.image}`, import.meta.url)), value.image)
    }
    Object.values(value).forEach(visit)
  }
  visit(xLesson)
  assert.ok(tracks.size > 50)
  assert.equal(xLesson.reading.image, '/images/lecciones/x/lectura-x.png')
})
