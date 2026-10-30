import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { yLetterLesson as lesson } from '../src/data/yLetterData.js'
import { units, getLessonById, isLessonUnlocked } from '../src/data/units.js'
import { getLessonThemeClass } from '../src/data/lessonColors.js'
import { getStampForLesson } from '../src/data/stamps.js'

test('letter Y coexists with conjunction Y and unlocks between X and K', () => {
  assert.deepEqual(units[5].lessons.slice(0, 4).map(({ id }) => id), ['x', 'y-letra', 'k', 'w'])
  assert.equal(getLessonById(lesson.id).bookPage, 217)
  assert.equal(getLessonThemeClass(lesson.id), 'planet--6')
  assert.equal(getStampForLesson(lesson.id, 6).name, 'Yoyo')
  assert.equal(getLessonById('y-conjuncion').route, '/lecciones/y-conjuncion')
  assert.equal(units[0].lessons.find(({ id }) => id === 'y-conjuncion').available, true)
  assert.equal(isLessonUnlocked(lesson.id), false)
  assert.equal(isLessonUnlocked(lesson.id, new Set(['x'])), true)
  assert.equal(isLessonUnlocked('k', new Set(['x'])), false)
  assert.equal(isLessonUnlocked('k', new Set([lesson.id])), true)
  const router = readFileSync(new URL('../src/routes/AppRouter.jsx', import.meta.url), 'utf8')
  assert.match(router, /xLesson, yLetterLesson, kLesson/)
  for (const route of ['y-conjuncion', 'y-formar-parejas', 'y-unir-imagenes', 'y-final']) assert.ok(router.includes(`/${route}`))
})

test('all Y answers are reachable and all reading pages except writing are covered', () => {
  const exercises = lesson.activities.flatMap(({ exercises }) => exercises)
  assert.equal(exercises.length, 16)
  assert.equal(new Set(exercises.map(({ id }) => id)).size, exercises.length)
  assert.deepEqual([...new Set(exercises.map(({ page }) => page))], [218, 219, 221, 222])
  assert.deepEqual(lesson.activities[1].exercises[0].items.map(({ label }) => label), ['ya', 'ye', 'yi', 'yo', 'yu'])
  assert.ok(exercises.every(({ type }) => ['present', 'select', 'match'].includes(type)))
  for (const ex of exercises) {
    const groups = ex.type === 'match' ? ex.groups.map(g => ({ ...g, answers: [g.answer] })) : ex.type === 'select' ? [ex] : []
    for (const group of groups) {
      assert.equal(new Set(group.options.map(({ id }) => id)).size, group.options.length)
      assert.ok(group.answers.length)
      assert.ok(group.answers.every(id => group.options.some(option => option.id === id)), ex.id)
      if (!ex.multiple) assert.equal(group.answers.length, 1)
    }
  }
})

test('Y resources exist and pending recordings have unique complete transcripts', () => {
  const tracks = new Map()
  const visit = value => {
    if (!value || typeof value !== 'object') return
    if (value.image) assert.ok(existsSync(new URL(`../public${value.image}`, import.meta.url)), value.image)
    if (value.src) {
      assert.match(value.src, /^\/audio\/lecciones\/y-letra\/[a-z0-9-]+\.mp3$/)
      assert.equal(value.available, false)
      assert.ok(value.text)
      if (tracks.has(value.src)) assert.equal(value.text, tracks.get(value.src))
      tracks.set(value.src, value.text)
    }
    Object.values(value).forEach(visit)
  }
  visit(lesson)
  assert.equal(lesson.reading.audio.text, `${lesson.reading.title}\n\n${lesson.reading.paragraphs.join('\n\n')}`)
})
