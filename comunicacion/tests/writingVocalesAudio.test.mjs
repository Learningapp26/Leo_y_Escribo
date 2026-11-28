import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { writingVocalesJuntasLesson } from '../src/data/writingVocalesJuntasData.js'
import { createWritingContent } from '../src/data/writingLessonHelpers.js'

function tracks(value, result = new Map()) {
  if (!value || typeof value !== 'object') return result
  if (value.src) result.set(value.src, value)
  Object.values(value).forEach(child => tracks(child, result))
  return result
}

test('all 57 supplied recordings are enabled with exact case-sensitive public paths', () => {
  const folder = new URL('../public/audio/lecciones/escritura-vocales-juntas/', import.meta.url)
  const filenames = readdirSync(folder)
  const audio = tracks(writingVocalesJuntasLesson)
  assert.equal(audio.size, 57)
  assert.equal(audio.size, filenames.length)
  for (const [src, track] of audio) {
    assert.equal(track.available, true, src)
    const filename = src.split('/').pop()
    assert.ok(filenames.includes(filename), src)
    const bytes = readFileSync(new URL(filename, folder))
    const id3 = bytes.subarray(0, 3).toString() === 'ID3'
    const frame = bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0
    assert.ok(id3 || frame, `Expected MP3 header: ${src}`)
  }
})

test('writing content without supplied recordings retains disabled audio', () => {
  const { base, finish } = createWritingContent('pending', 'Pending', 1, 'Pending recording.')
  for (const track of tracks(finish(base)).values()) assert.equal(track.available, false)
})
