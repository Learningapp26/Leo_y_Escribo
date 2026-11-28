import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { writingQcLesson as lesson, writingQcParagraphs } from '../src/data/writingQcData.js'

test('q-c enables all 26 supplied MP3 files using their exact filenames', () => {
  const folder = new URL('../public/audio/lecciones/escritura-q-c/', import.meta.url)
  const files = readdirSync(folder)
  const tracks = new Map()
  function visit(value) {
    if (!value || typeof value !== 'object') return
    if (value.src) tracks.set(value.src, value)
    Object.values(value).forEach(visit)
  }
  visit(lesson)
  assert.equal(tracks.size, 26)
  assert.equal(files.length, tracks.size)
  for (const track of tracks.values()) {
    assert.equal(track.available, true, track.src)
    assert.ok(track.src.startsWith('/audio/lecciones/escritura-q-c/'))
    const filename = track.src.split('/').pop()
    assert.ok(files.includes(filename), track.src)
    const bytes = readFileSync(new URL(filename, folder))
    assert.ok(bytes.subarray(0, 3).toString() === 'ID3' || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0), filename)
  }
})

test('the first sentence preserves its accented recording and the full story remains connected', () => {
  const sentence = lesson.activities[1].exercises[0].groups[0]
  assert.equal(sentence.audio.src, '/audio/lecciones/escritura-q-c/Oración-0-0.mp3')
  const story = lesson.activities[2].exercises[0].reading
  assert.equal(story.audio.src, '/audio/lecciones/escritura-q-c/Historia-taqueria-quique.mp3')
  assert.equal(story.audio.text, writingQcParagraphs.join('\n\n'))
  assert.equal(story.audio.available, true)
})
