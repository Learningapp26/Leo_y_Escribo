import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { flLesson as lesson } from '../src/data/flData.js'
import { availableLessons, getLessonById, isLessonUnlocked } from '../src/data/units.js'
import { getLessonThemeClass } from '../src/data/lessonColors.js'
import { getStampForLesson } from '../src/data/stamps.js'

test('fl occupies its existing Unit 6 slot between fr and ge-gi', () => {
  const index = availableLessons.findIndex(({ id }) => id === 'fl')
  assert.deepEqual(availableLessons.slice(index - 1, index + 2).map(({ id }) => id), ['fr', 'fl', 'ge-gi'])
  assert.equal(getLessonById('fl').bookPage, 235)
  assert.equal(getLessonById('fl').route, '/lecciones/fl')
  assert.equal(getLessonThemeClass('fl'), 'planet--6')
  assert.equal(getStampForLesson('fl', 6).name, 'Flecha')
  assert.equal(isLessonUnlocked('fl'), false)
  assert.equal(isLessonUnlocked('fl', new Set(['fr'])), true)
  assert.equal(isLessonUnlocked('ge-gi', new Set(['fr'])), false)
  assert.equal(isLessonUnlocked('ge-gi', new Set(['fl'])), true)
  const router = readFileSync(new URL('../src/routes/AppRouter.jsx', import.meta.url), 'utf8')
  assert.match(router, /frLesson, flLesson, geGiLesson/)
})

test('fl preserves the verified book stories, all ten words and nine sentence blanks', () => {
  assert.equal(lesson.reading.title, 'La flauta flotante')
  assert.equal(lesson.reading.paragraphs.length, 7)
  assert.equal(lesson.reading.questions.length, 5)
  assert.ok(lesson.reading.source.includes('Mineduc'))
  const exercises = lesson.activities.flatMap(({ exercises }) => exercises)
  assert.deepEqual([...new Set(exercises.map(({ page }) => page))], [236, 237, 238])
  assert.deepEqual(exercises.find(({ id }) => id === 'reconocer-fl').answers, ['flor', 'flecha', 'inflador'])
  assert.deepEqual(exercises.filter(({ id }) => /^palabras-/.test(id)).flatMap(({ groups }) => groups.map(({ label }) => label)),
    ['inflar', 'flan', 'coliflor', 'chiflido', 'floreado', 'flotador', 'inflamado', 'influenza', 'conflicto', 'reflector'])
  const blanks = exercises.filter(({ id }) => id.startsWith('completar-oracion')).flatMap(({ groups }) => groups)
  assert.equal(blanks.length, 9)
  assert.deepEqual(blanks.map(({ answer }) => answer), ['flory', 'flaca', 'regalaron', 'floreado', 'flojo', 'arreglo', 'floreado', 'flojo', 'linda'])
  assert.ok(exercises.filter(({ id }) => id.startsWith('completar-oracion')).every(({ items }) => items[0].label.includes('Ahora no le queda flojo.')))
})

test('every fl answer is reachable and all illustrated resources exist', () => {
  const tracks = new Map()
  function visit(value) {
    if (!value || typeof value !== 'object') return
    if (value.image) assert.ok(existsSync(new URL(`../public${value.image}`, import.meta.url)), value.image)
    if (value.src) {
      assert.match(value.src, /^\/audio\/lecciones\/fl\/[a-z0-9-]+\.mp3$/)
      assert.equal(value.available, false)
      assert.ok(value.text)
      if (tracks.has(value.src)) assert.equal(tracks.get(value.src), value.text, value.src)
      tracks.set(value.src, value.text)
    }
    Object.values(value).forEach(visit)
  }
  visit(lesson)
  for (const activity of lesson.activities) {
    assert.equal(new Set(activity.exercises.map(({ id }) => id)).size, activity.exercises.length)
    for (const exercise of activity.exercises) {
      assert.ok(['present', 'select', 'match'].includes(exercise.type))
      const groups = exercise.type === 'match' ? exercise.groups : exercise.type === 'select' ? [exercise] : []
      for (const group of groups) {
        assert.equal(new Set(group.options.map(({ id }) => id)).size, group.options.length)
        const answers = group.answers ?? [group.answer]
        assert.ok(answers.length)
        assert.ok(answers.every(id => group.options.some(option => option.id === id)))
        if (!exercise.multiple) assert.equal(answers.length, 1)
      }
    }
  }
  assert.equal(lesson.reading.audio.text, `${lesson.reading.title}\n\n${lesson.reading.paragraphs.join('\n\n')}`)
})
