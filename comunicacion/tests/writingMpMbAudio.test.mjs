import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { writingMpMbLesson as lesson } from '../src/data/writingMpMbData.js'

test('mp-mb connects all 35 supplied MP3 files and leaves only the two missing combinations disabled', () => {
  const folder = new URL('../public/audio/lecciones/escritura-mp-mb/', import.meta.url)
  const filenames = readdirSync(folder)
  const tracks = new Map()
  function visit(value) {
    if (!value || typeof value !== 'object') return
    if (value.src) tracks.set(value.src, value)
    Object.values(value).forEach(visit)
  }
  visit(lesson)
  const enabled = [...tracks.values()].filter(track => track.available)
  assert.equal(enabled.length, 35)
  assert.equal(filenames.length, enabled.length)
  assert.deepEqual([...tracks.values()].filter(track => !track.available).map(track => track.src).sort(), [
    '/audio/lecciones/escritura-mp-mb/silaba-mb.mp3',
    '/audio/lecciones/escritura-mp-mb/silaba-mp.mp3',
  ])
  for (const track of enabled) {
    const filename = track.src.split('/').pop()
    assert.ok(filenames.includes(filename), track.src)
    const bytes = readFileSync(new URL(filename, folder))
    assert.ok(bytes.subarray(0, 3).toString() === 'ID3' || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0), track.src)
  }
})

test('the six dictation exercises share the supplied instruction and retain their distinct word audio', () => {
  const exercises = lesson.activities.find(activity => activity.id === 'escuchar').exercises
  assert.equal(exercises.length, 6)
  for (const exercise of exercises) {
    assert.equal(exercise.instruction.src, '/audio/lecciones/escritura-mp-mb/Instruccion-escuchar-003-a-008.mp3')
    assert.equal(exercise.instruction.available, true)
    assert.equal(exercise.prompt.audio.available, true)
  }
  assert.equal(new Set(exercises.map(exercise => exercise.prompt.audio.src)).size, 6)
})
