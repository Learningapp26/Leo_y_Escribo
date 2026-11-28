import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { writingJeJiGeGiLesson as lesson } from '../src/data/writingJeJiGeGiData.js'

test('all je-ji/ge-gi audio references are enabled and point to exact MP3 filenames', () => {
  const folder = new URL('../public/audio/lecciones/escritura-je-ji-ge-gi/', import.meta.url)
  const files = readdirSync(folder)
  const paths = new Set()
  let references = 0
  function visit(value) {
    if (!value || typeof value !== 'object') return
    if (value.src) {
      references++
      assert.equal(value.available, true, value.src)
      assert.ok(value.src.startsWith('/audio/lecciones/escritura-je-ji-ge-gi/'))
      const filename = value.src.split('/').pop()
      assert.ok(files.includes(filename), value.src)
      const bytes = readFileSync(new URL(filename, folder))
      assert.ok(bytes.subarray(0, 3).toString() === 'ID3' || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0), value.src)
      paths.add(filename)
    }
    Object.values(value).forEach(visit)
  }
  visit(lesson)
  assert.ok(references > 55)
  assert.equal(paths.size, 44)
  assert.deepEqual(files.filter(file => !paths.has(file)), ['Silaba-gi.mp3', 'Silaba-la.mp3'])
})

test('spelling choices reuse matching recordings and keep distinct written answers', () => {
  const exercises = lesson.activities.find(activity => activity.id === 'reconocer').exercises
  for (const exercise of exercises) {
    assert.equal(exercise.instruction.src, '/audio/lecciones/escritura-je-ji-ge-gi/Instruccion-corregir-001-a-006.mp3')
    // Both Jeringa.mp3 and Geringa.mp3 were supplied; other pairs share a file.
    assert.equal(new Set(exercise.options.map(option => option.audio.src)).size, exercise.id === 'corregir-jeringa' ? 2 : 1)
    assert.equal(new Set(exercise.options.map(option => option.id)).size, 2)
    assert.equal(exercise.options.filter(option => exercise.answers.includes(option.id)).length, 1)
  }
})
