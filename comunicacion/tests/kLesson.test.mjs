import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { kLesson } from '../src/data/kData.js'
import { units, getLessonById, isLessonUnlocked } from '../src/data/units.js'
import { getLessonThemeClass } from '../src/data/lessonColors.js'

test('K has one available entry in Unit 6 and uses the shared route generator', () => {
  const entries = units.flatMap((unit) => unit.lessons.filter((lesson) => lesson.id === 'k')
    .map((lesson) => ({ unit, lesson })))
  assert.equal(entries.length, 1)
  assert.equal(entries[0].unit.id, 6)
  assert.equal(getLessonById('k').bookPage, 223)
  assert.equal(getLessonById('k').route, '/lecciones/k')
  assert.equal(kLesson.unitId, 6)
  assert.equal(getLessonThemeClass('k'), 'planet--6')
  assert.equal(isLessonUnlocked('k'), false)
  assert.equal(isLessonUnlocked('k', new Set(['x'])), true)
  assert.equal(isLessonUnlocked('w', new Set(['x'])), false)
  assert.equal(isLessonUnlocked('w', new Set(['k'])), true)
  const router = readFileSync(new URL('../src/routes/AppRouter.jsx', import.meta.url), 'utf8')
  assert.match(router, /import \{ kLesson \} from ['"]\.\.\/data\/kData['"]/)
  assert.match(router, /\[[^\]]*\bkLesson\b[^\]]*\]\.flatMap\(\(lesson\)/)
})

test('all four K activities have reachable answers and unique exercise IDs', () => {
  assert.deepEqual(kLesson.activities.map((activity) => activity.id), ['sonido', 'silabas', 'palabras', 'final'])
  const exercises = kLesson.activities.flatMap((activity) => activity.exercises)
  assert.equal(exercises.length, 16)
  assert.equal(new Set(exercises.map((exercise) => exercise.id)).size, exercises.length)
  for (const exercise of exercises) {
    assert.ok(exercise.instruction.text)
    if (exercise.type !== 'select') continue
    assert.equal(new Set(exercise.options.map((option) => option.id)).size, exercise.options.length)
    assert.ok(exercise.answers.length > 0)
    assert.ok(exercise.answers.every((id) => exercise.options.some((option) => option.id === id)), exercise.id)
    if (!exercise.multiple) assert.equal(exercise.answers.length, 1)
  }
  const letter = exercises.at(-1)
  assert.equal(letter.id, 'ordenar-carta')
  assert.equal(letter.type, 'order')
  assert.equal(letter.options.length, 4)
  assert.equal([2, 3, 0, 1].map((index) => letter.options[index].label).join(letter.separator), letter.answer)
  assert.equal(letter.resultAudio.text, letter.answer)
})

test('all nine K illustrations exist and audio references have unambiguous recording scripts', () => {
  const images = new Set()
  const tracks = new Map()
  const visit = (value) => {
    if (!value || typeof value !== 'object') return
    if (value.image) {
      images.add(value.image)
      assert.ok(existsSync(new URL(`../public${value.image}`, import.meta.url)), value.image)
    }
    if (value.src) {
      assert.match(value.src, /^\/audio\/lecciones\/k\/[a-z0-9-]+\.mp3$/)
      assert.ok(value.text)
      if (tracks.has(value.src)) assert.equal(tracks.get(value.src), value.text, value.src)
      tracks.set(value.src, value.text)
    }
    Object.values(value).forEach(visit)
  }
  visit(kLesson)
  assert.equal(images.size, 9)
  assert.ok(tracks.size > 30)
  assert.equal(kLesson.reading.audio.text, `${kLesson.reading.title}\n\n${kLesson.reading.paragraphs.join('\n\n')}`)
  assert.ok(!JSON.stringify(kLesson).includes('\uFFFD'))
})
