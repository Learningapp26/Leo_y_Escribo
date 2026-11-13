import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { frLesson } from '../src/data/frData.js'
import { alphabetEntries, alphabetGame, createAlphabetLesson } from '../src/data/abecedarioData.js'
import { availableLessons, isLessonUnlocked } from '../src/data/units.js'
import { getLessonThemeClass } from '../src/data/lessonColors.js'

test('Fr and the alphabet game respect the existing Unit 6 unlock chain', () => {
  for (const id of ['fr', 'abecedario']) {
    const index = availableLessons.findIndex((lesson) => lesson.id === id)
    assert.ok(index > 0)
    assert.equal(isLessonUnlocked(id), false)
    assert.equal(isLessonUnlocked(id, new Set([availableLessons[index - 1].id])), true)
    assert.equal(isLessonUnlocked(id, new Set([id])), true)
    assert.equal(getLessonThemeClass(id), 'planet--6')
  }
  assert.equal(availableLessons.at(-1).id, 'abecedario')
})

test('every randomized board challenge and spelling answer remains playable', () => {
  let seed = 17
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32 }
  const heard = new Set()
  for (let run = 0; run < 150; run += 1) {
    const lesson = createAlphabetLesson(random)
    for (const activity of lesson.activities) {
      const selections = activity.exercises.filter((exercise) => exercise.type === 'select')
      assert.equal(selections.length, 3)
      assert.equal(new Set(selections.flatMap((exercise) => exercise.answers)).size, 3)
      for (const exercise of activity.exercises) {
        assert.equal(new Set(exercise.options.map((option) => option.id)).size, exercise.options.length)
        if (exercise.type === 'select') {
          assert.equal(exercise.options.length, 27)
          assert.ok(exercise.options.some((option) => option.id === exercise.answers[0]))
          assert.ok(exercise.teacherPrompt)
          heard.add(exercise.prompt.audio.src)
        } else {
          assert.deepEqual(exercise.options.map((option) => option.label).sort(), [...exercise.answer].sort())
          assert.ok(exercise.options.every((option) => option.audio?.text))
        }
      }
    }
  }
  assert.deepEqual(heard, new Set(alphabetEntries.flatMap((entry) => [entry.letterAudio.src, entry.soundAudio.src])))
  assert.match(alphabetEntries.find((entry) => entry.id === 'h').soundAudio.text, /no tiene sonido/)
  assert.equal(alphabetEntries.find((entry) => entry.id === 'w').caption, 'Walter')
})

test('Fr selections, syllable matches and sequence use reachable answers', () => {
  for (const activity of frLesson.activities) for (const exercise of activity.exercises) {
    if (exercise.type === 'select') {
      assert.ok(exercise.answers.every((id) => exercise.options.some((option) => option.id === id)))
    }
    if (exercise.type === 'match') {
      for (const group of exercise.groups) {
        assert.equal(group.options.filter((option) => option.id === group.answer).length, 1)
      }
    }
    if (exercise.answerIds) {
      assert.deepEqual([...exercise.answerIds].sort(), exercise.options.map((option) => option.id).sort())
    }
  }
  assert.equal(frLesson.reading.audio.text, `${frLesson.reading.title}\n\n${frLesson.reading.paragraphs.join('\n\n')}`)
})

test('recording paths are unambiguous and every activity drawing exists', () => {
  const tracks = new Map()
  function visit(value) {
    if (!value || typeof value !== 'object') return
    if (value.src) {
      assert.match(value.src, /^\/audio\/lecciones\/(fr|abecedario)\/[a-z0-9-]+\.mp3$/)
      assert.ok(value.text)
      if (tracks.has(value.src)) assert.equal(tracks.get(value.src), value.text)
      tracks.set(value.src, value.text)
    }
    if (value.image && value.image !== frLesson.reading.image) {
      assert.ok(existsSync(new URL(`../public${value.image}`, import.meta.url)), value.image)
    }
    Object.values(value).forEach(visit)
  }
  visit([frLesson, alphabetEntries, alphabetGame, createAlphabetLesson(() => 0.3)])
})
