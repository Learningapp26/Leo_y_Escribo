import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import * as lessonData from '../src/data/writingOtrasVocalesData.js'

test('all 44 other-vowels recordings are enabled with exact public filenames and MP3 headers', () => {
  const folder = new URL('../public/audio/lecciones/escritura-otras-vocales-juntas/', import.meta.url)
  const filenames = readdirSync(folder)
  const tracks = new Map()
  function visit(value) {
    if (!value || typeof value !== 'object') return
    if (value.src) tracks.set(value.src, value)
    Object.values(value).forEach(visit)
  }
  visit(lessonData)
  assert.equal(tracks.size, 44)
  assert.equal(filenames.length, tracks.size)
  for (const [src, track] of tracks) {
    assert.equal(track.available, true, src)
    assert.ok(src.startsWith('/audio/lecciones/escritura-otras-vocales-juntas/'))
    const filename = src.split('/').pop()
    assert.ok(filenames.includes(filename), src)
    const bytes = readFileSync(new URL(filename, folder))
    assert.ok(bytes.subarray(0, 3).toString() === 'ID3' || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0), src)
  }
})

test('the shared a syllable is preserved without changing its recording', () => {
  const original = readFileSync(new URL('../public/audio/lecciones/escritura-vocales-juntas/Silaba-a.mp3', import.meta.url))
  const reused = readFileSync(new URL('../public/audio/lecciones/escritura-otras-vocales-juntas/Silaba-a.mp3', import.meta.url))
  assert.deepEqual(reused, original)
})
