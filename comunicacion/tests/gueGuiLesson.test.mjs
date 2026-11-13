import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { gueGuiLesson as lesson, gueGuiVocabulary } from '../src/data/gueGuiData.js'
import { getLessonById } from '../src/data/units.js'
import { getLessonThemeClass } from '../src/data/lessonColors.js'

const exercises = lesson.activities.flatMap((activity) => activity.exercises)

test('güe/güi is available in Unit 6 with reading and all four activities routed', () => {
  assert.equal(getLessonById(lesson.id).bookPage, 243)
  assert.equal(getLessonById(lesson.id).route, `/lecciones/${lesson.id}`)
  assert.equal(lesson.unitId, 6)
  assert.equal(getLessonThemeClass(lesson.id), 'planet--6')
  assert.deepEqual(lesson.activities.map(({ id }) => id), ['sonidos', 'dibujos-relato', 'vocabulario', 'oraciones'])
  const router = readFileSync(new URL('../src/routes/AppRouter.jsx', import.meta.url), 'utf8')
  assert.match(router, /import \{ gueGuiLesson \} from ['"]\.\.\/data\/gueGuiData['"]/)
  assert.match(router, /\[[^\]]*\bgueGuiLesson\b[^\]]*\]\.flatMap\(\(lesson\)/)
})

test('all answers are reachable and accents never merge option IDs', () => {
  assert.equal(new Set(exercises.map(({ id }) => id)).size, exercises.length)
  for (const exercise of exercises) {
    assert.ok(['select', 'present', 'oral'].includes(exercise.type))
    for (const entries of [exercise.items, exercise.options].filter(Boolean)) {
      assert.equal(new Set(entries.map(({ id }) => id)).size, entries.length, exercise.id)
    }
    if (exercise.type !== 'select') continue
    assert.ok(exercise.answers.length)
    for (const answer of exercise.answers) assert.ok(exercise.options.some(({ id }) => id === answer), exercise.id)
  }
  const syllables = exercises.filter(({ id }) => ['silabas-conocidas', 'dieresis'].includes(id)).flatMap(({ items }) => items)
  assert.equal(new Set(syllables.map(({ id }) => id)).size, 7)
  assert.equal(new Set(syllables.map(({ audio }) => audio.src)).size, 7)
})

test('printed vocabulary, story targets, free oral creation and both sentence answers are preserved', () => {
  assert.equal(gueGuiVocabulary.length, 16)
  assert.ok(gueGuiVocabulary.every(({ definition }) => definition.length > 10))
  const three = exercises.find(({ id }) => id === 'tres-palabras')
  assert.equal(three.type, 'oral')
  assert.equal(three.selectionCount, 3)
  assert.equal(three.options.length, 16)
  assert.equal(exercises.filter(({ id }) => id.startsWith('reconocimiento-')).length, 4)
  const targets = exercises.find(({ id }) => id === 'palabras-relato')
  assert.deepEqual(targets.answers, ['guicho', 'unguento', 'desague', 'verguenza'])
  const sentences = exercises.filter(({ id }) => id.startsWith('completar-'))
  assert.deepEqual(sentences.map(({ resultText }) => resultText), [
    'El güipil es de mi hermana.', 'Güicho habla dos idiomas. Es bilingüe.',
  ])
  assert.deepEqual(sentences.map(({ answers }) => answers), [['guipil'], ['bilingue']])
  assert.equal(exercises.filter(({ type }) => type === 'oral').length, 6)
  assert.ok(exercises.filter(({ type }) => type === 'oral').every((exercise) => !exercise.answers))
  assert.ok(lesson.reading.paragraphs.join(' ').endsWith('Ella lo disculpó.'))
})

test('all six illustrations exist and unavailable recordings have consistent exact scripts', () => {
  const images = new Set()
  const tracks = new Map()
  const visit = (value) => {
    if (!value || typeof value !== 'object') return
    if (value.image) {
      images.add(value.image)
      assert.ok(existsSync(new URL(`../public${value.image}`, import.meta.url)), value.image)
    }
    if (value.src) {
      assert.match(value.src, /^\/audio\/lecciones\/gue-con-dieresis\/[a-z0-9-]+\.mp3$/)
      assert.equal(value.available, false)
      assert.equal(value.speechFallback, undefined)
      assert.ok(value.text)
      if (tracks.has(value.src)) assert.equal(tracks.get(value.src), value.text, value.src)
      tracks.set(value.src, value.text)
    }
    Object.values(value).forEach(visit)
  }
  visit(lesson)
  assert.equal(images.size, 6)
  assert.ok(tracks.size > 40)
  assert.ok(!JSON.stringify(lesson).includes('\uFFFD'))
})

test('teacher-only guidance remains only in oral composition and listening tasks retain audio buttons', () => {
  assert.ok(exercises.filter(({ teacherPrompt }) => teacherPrompt).every(({ type }) => type === 'oral'))
  assert.ok(exercises.filter(({ type }) => type !== 'oral').every(({ instruction }) => !/maestra/i.test(instruction.text)))
  assert.ok(exercises.filter(({ type }) => type === 'oral').every(({ instruction }) => /maestra/.test(instruction.text)))
  assert.ok(!/maestra/.test(lesson.reading.instruction.text))
  assert.equal(lesson.reading.discussionInstruction.available, false)
  assert.ok(lesson.reading.questions.every(({ audio }) => audio.available === false))
  assert.ok(gueGuiVocabulary.every(({ definitionAudio, definition }) => definitionAudio.text.includes(definition)))
  for (const exercise of exercises.filter(({ id }) => id.startsWith('reconocimiento-'))) {
    const answer = exercise.options.find(({ id }) => id === exercise.answers[0])
    assert.equal(exercise.prompt.audio.text, answer.label)
    assert.equal(exercise.prompt.audio.available, false)
    assert.ok(!exercise.teacherPrompt)
    assert.ok(!exercise.prompt.label.includes(answer.label))
  }
})
