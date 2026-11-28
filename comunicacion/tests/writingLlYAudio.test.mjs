import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { writingLlYLesson as lesson } from '../src/data/writingLlYData.js'

test('ll-y connects all 42 supplied MP3 recordings and keeps missing audio disabled', () => {
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
  assert.equal(enabled.length, 42)
  assert.equal(files.length, enabled.length)
  for (const track of enabled) {
    const filename = track.src.split('/').pop()
    assert.ok(files.includes(filename), track.src)
    const bytes = readFileSync(new URL(filename, folder))
    assert.ok(bytes.subarray(0, 3).toString() === 'ID3' || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0), filename)
  }
  assert.deepEqual([...tracks.values()].filter(track => !track.available).map(track => track.src.split('/').pop()).sort(), [
    'instruccion-lista-1-0.mp3', 'instruccion-lista-1-1.mp3', 'silaba-llas.mp3',
    'silaba-yas.mp3', 'yo.mp3',
  ])
})

test('the instruction confirmed as ll is only assigned to the ll lists', () => {
  const lists = lesson.activities[0].exercises
  assert.equal(lists.length, 4)
  for (const exercise of lists.slice(0, 2)) {
    assert.equal(exercise.instruction.src, '/audio/lecciones/escritura-ll-y/Instruccion-lista.mp3')
    assert.equal(exercise.instruction.available, true)
  }
  for (const exercise of lists.slice(2)) assert.equal(exercise.instruction.available, false)
})
