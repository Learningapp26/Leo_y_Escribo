import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { writingLlYLesson } from '../src/data/writingLlYData.js'
import { writingQcLesson, writingQcParagraphs } from '../src/data/writingQcData.js'
import { writingHLesson, writingHCrossword } from '../src/data/writingHData.js'
import { getUnitById, getLessonById } from '../src/data/units.js'
import { getLessonThemeClass } from '../src/data/lessonColors.js'
import { getLessonLetters } from '../src/data/lessonLabels.js'
const lessons = [writingLlYLesson, writingQcLesson, writingHLesson]

test('writing lessons belong to the existing Writer planet and expose three activities', () => {
  assert.deepEqual(getUnitById(7).lessons.map((lesson) => lesson.id), lessons.map((lesson) => lesson.id))
  for (const lesson of lessons) {
    assert.equal(lesson.activities.length, 3)
    assert.equal(getLessonById(lesson.id).route, `/lecciones/${lesson.id}`)
    assert.equal(getLessonThemeClass(lesson.id), 'planet--7')
    assert.ok(getLessonLetters(lesson.id))
    assert.equal(new Set(lesson.activities.map((activity) => activity.id)).size, 3)
  }
})

test('every choice has exactly one reachable answer and word pieces form the source words', () => {
  for (const lesson of lessons) for (const activity of lesson.activities) for (const exercise of activity.exercises) {
    assert.ok(exercise.instruction.text)
    for (const group of exercise.groups ?? []) {
      assert.equal(group.options.filter((option) => option.id === group.answer).length, 1, group.id)
      assert.equal(new Set(group.options.map((option) => option.id)).size, group.options.length)
    }
    if (exercise.type === 'order') {
      assert.equal(exercise.options.map((option) => option.label).reverse().join(''), exercise.answer)
    }
  }
})

test('crossword preserves every crossing and fits the original grid', () => {
  const cells = new Map()
  let crossings = 0
  for (const entry of writingHCrossword.entries) {
    for (let i = 0; i < entry.answer.length; i++) {
      const row = entry.row + (entry.direction === 'down' ? i : 0)
      const col = entry.col + (entry.direction === 'across' ? i : 0)
      assert.ok(row < writingHCrossword.rows && col < writingHCrossword.columns)
      const key = `${row}-${col}`
      if (cells.has(key)) { assert.equal(cells.get(key), entry.answer[i]); crossings++ }
      cells.set(key, entry.answer[i])
    }
  }
  assert.equal(crossings, 6)
  assert.deepEqual(writingHCrossword.entries.map((entry) => entry.answer), ['huerto', 'huevo', 'horchata', 'helado', 'hielo', 'horno', 'hacha'])
})

test('the full untitled source story is retained including the confirmed pictogram', () => {
  assert.equal(writingQcParagraphs.length, 2)
  assert.equal(writingQcParagraphs[0], 'En el parque que está junto a la casa hay una venta de tacos. Se llama «Taquería Quique». Ahí venden los tacos más ricos. Siempre vamos con mi primo Maquito.')
  assert.equal(writingQcParagraphs[1], 'Un día, a Maquito le salió una mariquita en su taco. Él se quejó con el dueño. Don Quique, el dueño, se disculpó y le obsequió dos tacos más. ¡Estaban exquisitos!')
  const reading = writingQcLesson.activities[2].exercises[0].reading
  assert.equal(reading.image, undefined)
  assert.deepEqual(reading.paragraphs, writingQcParagraphs)
  assert.equal(reading.audio.text, writingQcParagraphs.join('\n\n'))
})

test('audio paths have unique scripts and every activity image exists', () => {
  const tracks = new Map()
  function visit(value) {
    if (!value || typeof value !== 'object') return
    if (value.src) {
      assert.match(value.src, /^\/audio\/lecciones\/escritura-(ll-y|q-c|h)\/[a-z0-9-]+\.mp3$/)
      assert.ok(value.text)
      assert.equal(value.available, false)
      if (tracks.has(value.src)) assert.equal(tracks.get(value.src), value.text)
      tracks.set(value.src, value.text)
    }
    if (value.image) {
      assert.ok(existsSync(new URL(`../public${value.image}`, import.meta.url)), value.image)
    }
    Object.values(value).forEach(visit)
  }
  visit(lessons)
})
