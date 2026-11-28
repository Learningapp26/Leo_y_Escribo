import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { writingLlYLesson as lesson } from '../src/data/writingLlYData.js'

test('ll-y connects all 45 supplied MP3 recordings with no missing audio', () => {
  const folder = new URL('../public/audio/lecciones/escritura-ll-y/', import.meta.url)
  const files = readdirSync(folder)
  const tracks = new Map()
  function visit(value) {
    if (!value || typeof value !== 'object') return
    if (value.src) tracks.set(value.src, value)
    Object.values(value).forEach(visit)
  }
  visit(lesson)
  const enabled = [...tracks.values()].filter(track => track.available)
  assert.equal(enabled.length, 45)
  assert.equal(files.length, enabled.length)
  for (const track of enabled) {
    const filename = track.src.split('/').pop()
    assert.ok(files.includes(filename), track.src)
    const bytes = readFileSync(new URL(filename, folder))
    assert.ok(bytes.subarray(0, 3).toString() === 'ID3' || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0), filename)
  }
  assert.deepEqual([...tracks.values()].filter(track => !track.available), [])
})

test('the instruction confirmed as ll is only assigned to the ll lists', () => {
  const lists = lesson.activities[0].exercises
  assert.equal(lists.length, 4)
  for (const exercise of lists.slice(0, 2)) {
    assert.equal(exercise.instruction.src, '/audio/lecciones/escritura-ll-y/Instruccion-lista.mp3')
    assert.equal(exercise.instruction.available, true)
  }
  for (const exercise of lists.slice(2)) {
    assert.equal(exercise.instruction.src, '/audio/lecciones/escritura-ll-y/Instruccion-lista-y.mp3')
    assert.equal(exercise.instruction.available, true)
  }
})
