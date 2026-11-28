import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { writingHLesson as lesson } from '../src/data/writingHData.js'

test('h enables all 32 supplied MP3 recordings with exact public filenames', () => {
  const folder = new URL('../public/audio/lecciones/escritura-h/', import.meta.url)
  const files = readdirSync(folder)
  const tracks = new Map()
  function visit(value) {
    if (!value || typeof value !== 'object') return
    if (value.src) tracks.set(value.src, value)
    Object.values(value).forEach(visit)
  }
  visit(lesson)
  assert.equal(tracks.size, 32)
  assert.equal(files.length, tracks.size)
  for (const track of tracks.values()) {
    assert.equal(track.available, true, track.src)
    assert.ok(track.src.startsWith('/audio/lecciones/escritura-h/'))
    const filename = track.src.split('/').pop()
    assert.ok(files.includes(filename), track.src)
    const bytes = readFileSync(new URL(filename, folder))
    assert.ok(bytes.subarray(0, 3).toString() === 'ID3' || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0), filename)
  }
  for (const exercise of lesson.activities[0].exercises) {
    assert.equal(exercise.instruction.src, '/audio/lecciones/escritura-h/Instruccion-palabras.mp3')
  }
})
