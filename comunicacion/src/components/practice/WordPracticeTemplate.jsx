import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BookOpen, Check, RotateCcw, Volume2 } from 'lucide-react'

import { getLessonThemeClass, getLessonUnit } from '../../data/lessonColors'
import { playAudio } from '../../lib/audioPlayer'
import { obtenerProgreso, registrarLeccionCompletada, registrarProgreso } from '../../lib/progreso'
import {
  allPracticeGroupsCompleted,
  canAdvanceWordPractice,
  checkWordPracticeAnswer,
  createWordPracticeProgress,
  getCompletedPracticeGroups,
  WORD_PRACTICE_CHALLENGES,
  WORD_PRACTICE_STEPS,
} from '../../lib/wordPracticeProgress'
import ActivityFeedback from '../common/ActivityFeedback'
import Button from '../common/Button'
import Card from '../common/Card'
import LessonAudioButton from '../common/LessonAudioButton'
import { ReadOnlySyllables } from '../lessons/WordSyllableReading'
import BackButton from '../navigation/BackButton'
import ProgressBar from '../progress/ProgressBar'
import StarsCounter from '../progress/StarsCounter'
import { RewardBurst } from '../space/Reward'
import '../../styles/word-practice.css'

const FEEDBACK_FIELDS = { buscar: 'findFeedback', corta: 'shortFeedback', silabas: 'syllableFeedback' }
const recording = (audio) => typeof audio === 'string'
  ? { src: audio, available: Boolean(audio) }
  : audio ?? { available: false }

function WordPracticeTemplate({ groups, title, unitLabel, intro, practiceId, introAudio, completionAudio, instructionAudios = {} }) {
  const [groupId, setGroupId] = useState(groups[0].lessonId)
  const [progressByGroup, setProgressByGroup] = useState(() => Object.fromEntries(
    groups.map((group) => [group.lessonId, createWordPracticeProgress()]),
  ))
  const [completedIds, setCompletedIds] = useState([])
  const [ready, setReady] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const answerLock = useRef(false)
  const saveLock = useRef(false)

  const group = groups.find((item) => item.lessonId === groupId)
  const progress = progressByGroup[groupId]
  const step = WORD_PRACTICE_STEPS[progress.stepIndex]
  const finished = progress.stepIndex === WORD_PRACTICE_STEPS.length
  const allCompleted = allPracticeGroupsCompleted(groups.map((item) => item.lessonId), completedIds)
  const unitId = getLessonUnit(practiceId)
  const unitRoute = `/lecciones/unidad/${unitId}`
  const themeClass = getLessonThemeClass(practiceId)
  const nextGroup = [...groups.slice(groups.indexOf(group) + 1), ...groups.slice(0, groups.indexOf(group) + 1)]
    .find((item) => !completedIds.includes(item.lessonId))
  const totalStars = groups.reduce((sum, item) => sum + (completedIds.includes(item.lessonId)
    ? WORD_PRACTICE_CHALLENGES.length : progressByGroup[item.lessonId].earnedSteps.length), 0)

  useEffect(() => {
    let active = true
    obtenerProgreso().then((records) => {
      if (!active) return
      const ids = groups.map((item) => item.lessonId)
      const completed = getCompletedPracticeGroups(records, practiceId, ids)
      setCompletedIds(completed)
      setProgressByGroup(Object.fromEntries(groups.map((item) => [item.lessonId, {
        ...createWordPracticeProgress(),
        ...(completed.includes(item.lessonId) ? {
          stepIndex: WORD_PRACTICE_STEPS.length,
          earnedSteps: [...WORD_PRACTICE_CHALLENGES],
        } : {}),
      }])))
      setGroupId(ids.find((id) => !completed.includes(id)) ?? ids[0])
      setReady(true)
    }).catch(() => {
      if (active) setReady(true)
    })
    return () => { active = false }
  }, [groups, practiceId])

  const updateProgress = (update) => setProgressByGroup((current) => ({
    ...current,
    [groupId]: update(current[groupId]),
  }))

  const chooseGroup = (id, review = false) => {
    if (saveLock.current) return
    answerLock.current = false
    setSaveError('')
    setGroupId(id)
    if (review) setProgressByGroup((current) => ({ ...current, [id]: createWordPracticeProgress() }))
  }

  const readWord = (word) => {
    updateProgress((current) => ({
      ...current,
      readWordIds: current.readWordIds.includes(word.id) ? current.readWordIds : [...current.readWordIds, word.id],
    }))
    if (word.audio) playAudio(word.audio)
  }

  const checkAnswer = () => {
    const field = FEEDBACK_FIELDS[step]
    if (!field || answerLock.current || progress[field]) return
    if ((step === 'buscar' && !progress.selectedFindIds.length) ||
      (step === 'corta' && !progress.shortWordId) ||
      (step === 'silabas' && progress.syllableCount === null)) return
    answerLock.current = true
    const correct = checkWordPracticeAnswer(group, progress)
    updateProgress((current) => ({
      ...current,
      [field]: correct ? 'correct' : 'retry',
      earnedSteps: correct && !current.earnedSteps.includes(step) ? [...current.earnedSteps, step] : current.earnedSteps,
    }))
    if (!correct || !completedIds.includes(groupId)) registrarProgreso({
      actividad: `${practiceId}-${step}`,
      correcto: correct,
      detalle: { leccionId: practiceId, fase: step, grupo: groupId },
    })
  }

  const retry = () => {
    answerLock.current = false
    updateProgress((current) => ({
      ...current,
      [FEEDBACK_FIELDS[step]]: '',
      ...(step === 'buscar' ? { selectedFindIds: [] } : step === 'corta' ? { shortWordId: '' } : { syllableCount: null }),
    }))
  }

  const finishGroup = async () => {
    if (saveLock.current) return
    if (completedIds.includes(groupId)) {
      updateProgress((current) => ({ ...current, stepIndex: WORD_PRACTICE_STEPS.length }))
      return
    }
    saveLock.current = true
    setSaving(true)
    setSaveError('')
    try {
      const { error, skipped } = await registrarLeccionCompletada(practiceId, groupId)
      if (error || skipped) {
        setSaveError(skipped ? 'Inicia sesión para guardar la práctica.' : 'No se pudo guardar. Intenta nuevamente.')
        return
      }
      setCompletedIds((current) => current.includes(groupId) ? current : [...current, groupId])
      updateProgress((current) => ({ ...current, stepIndex: WORD_PRACTICE_STEPS.length }))
    } catch {
      setSaveError('No se pudo guardar. Intenta nuevamente.')
    } finally {
      saveLock.current = false
      setSaving(false)
    }
  }

  const advance = () => {
    if (!canAdvanceWordPractice(group, progress)) return
    if (step === 'silabas') {
      finishGroup()
      return
    }
    answerLock.current = false
    updateProgress((current) => ({ ...current, stepIndex: current.stepIndex + 1 }))
  }

  const instructions = {
    leer: 'Toca cada palabra, escúchala y léela en voz alta.',
    buscar: 'Marca las palabras que empiezan con la letra.',
    corta: group.shortest.prompt,
    silabas: 'Da palmas y elige cuántas sílabas tiene esta palabra.',
  }
  const headings = {
    leer: `Leemos palabras con ${group.label}`,
    buscar: 'Busca la letra',
    corta: 'Elige la palabra más corta',
    silabas: 'Separa en sílabas',
  }
  const feedback = progress[FEEDBACK_FIELDS[step]]
  const choices = step === 'buscar' ? group.find.options : step === 'corta' ? group.shortest.options : group.syllables.options
  const hasSelection = step === 'buscar' ? progress.selectedFindIds.length > 0
    : step === 'corta' ? Boolean(progress.shortWordId) : progress.syllableCount !== null
  const syllableAudio = group.syllables.audio ?? group.words.find((word) => word.word === group.syllables.word)?.audio

  return (
    <main id={practiceId} className={`page word-practice-page ${themeClass}`} aria-labelledby={`${practiceId}-title`} aria-busy={!ready}>
      <BackButton label={`Volver a la Unidad ${unitId}`} to={unitRoute} />

      <header className="word-practice-header">
        <span className="text-ui-label">{unitLabel}</span>
        <h1 id={`${practiceId}-title`}>{title}</h1>
        <div className="selection-instructions">
          <p className="text-instruction">{intro}</p>
          <LessonAudioButton audio={recording(introAudio)}>Escuchar instrucción</LessonAudioButton>
        </div>
      </header>

      {!ready ? <Card className="word-practice-card"><p role="status">Cargando práctica…</p></Card> : <>
        <nav className="word-practice-groups" aria-label="Grupos de palabras">
          {groups.map((item) => {
            const completed = completedIds.includes(item.lessonId)
            return (
              <Button
                key={item.lessonId}
                variant="secondary"
                className={`word-practice-group${groupId === item.lessonId ? ' word-practice-group--active' : ''}${completed ? ' word-practice-group--complete' : ''}`}
                icon={completed ? Check : undefined}
                aria-label={`${item.label}${completed ? ', práctica completada' : ''}`}
                aria-pressed={groupId === item.lessonId}
                disabled={saving}
                onClick={() => chooseGroup(item.lessonId)}
              >
                {item.label}
              </Button>
            )
          })}
        </nav>

        <ProgressBar value={completedIds.length} max={groups.length} dots={false} label={`Grupos completados: ${completedIds.length} de ${groups.length}`} />

        {finished ? (
          <Card className="word-practice-card word-practice-card--finished">
            <RewardBurst
              key={allCompleted ? 'all' : groupId}
              lessonId={allCompleted ? practiceId : undefined}
              awardShiny={false}
              title={allCompleted ? '¡Completaste todas las prácticas!' : `¡Completaste la práctica de ${group.label}!`}
            />
            {allCompleted && <LessonAudioButton
              audio={recording(completionAudio)}
              className="btn--audio-round word-practice-audio-only"
              aria-label="Escuchar felicitación"
            >
              Escuchar felicitación
            </LessonAudioButton>}
            <p className="text-instruction">
              {allCompleted ? 'Leíste palabras y completaste los retos de todos los grupos de esta unidad.' : 'Puedes continuar con otra letra o volver a repasar.'}
            </p>
            <StarsCounter current={allCompleted ? totalStars : progress.earnedSteps.length}
              total={allCompleted ? groups.length * WORD_PRACTICE_CHALLENGES.length : WORD_PRACTICE_CHALLENGES.length} label="Estrellas" />
            {nextGroup && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={() => chooseGroup(nextGroup.lessonId)}>
              Practicar {nextGroup.label}
            </Button>}
            <Button icon={BookOpen} variant="secondary" size="large" fullWidth onClick={() => chooseGroup(groupId, true)}>
              Volver a repasar {group.label}
            </Button>
            <Button to={unitRoute} variant="secondary" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
              Volver a la Unidad {unitId}
            </Button>
          </Card>
        ) : <>
          <ProgressBar value={progress.stepIndex + 1} max={WORD_PRACTICE_STEPS.length} label={`Paso ${progress.stepIndex + 1} de ${WORD_PRACTICE_STEPS.length}`} />
          <StarsCounter current={progress.earnedSteps.length} total={WORD_PRACTICE_CHALLENGES.length} label="Estrellas" />

          <Card className="word-practice-card">
            <h2>{headings[step]}</h2>
            <div className="selection-instructions">
              <p className="text-instruction">{instructions[step]}</p>
              <LessonAudioButton audio={recording(group.instructionAudios?.[step] ?? instructionAudios[step])}>Escuchar instrucción</LessonAudioButton>
            </div>

            {step === 'leer' ? <>
              <div className="word-practice-word-list" aria-label={group.title}>
                {group.words.map((word) => (
                  <Button
                    key={word.id}
                    variant="secondary"
                    icon={Volume2}
                    className={`word-practice-word${progress.readWordIds.includes(word.id) ? ' word-practice-word--read' : ''}`}
                    aria-label={word.audio ? `Escuchar ${word.word}` : `Leer ${word.word}. Audio pendiente`}
                    title={!word.audio ? 'Audio pendiente. Puedes leer la palabra en voz alta.' : undefined}
                    aria-pressed={progress.readWordIds.includes(word.id)}
                    data-audio-src={word.audio ?? undefined}
                    onClick={() => readWord(word)}
                  >
                    {word.word}
                  </Button>
                ))}
              </div>
              <p className="word-practice-status" aria-live="polite">
                {progress.readWordIds.length} de {group.words.length} palabras leídas
              </p>
            </> : <>
              {step === 'silabas' && <div className="word-practice-syllable-word">
                <LessonAudioButton audio={recording(syllableAudio)} className="btn--audio-round word-practice-audio-only" aria-label={`Escuchar ${group.syllables.word}`}>
                  Escuchar palabra
                </LessonAudioButton>
                <span>{group.syllables.word}</span>
              </div>}

              <div className={`word-practice-options${step !== 'buscar' ? ' word-practice-options--three' : ''}`}>
                {choices.map((option) => {
                  const id = step === 'buscar' ? option.id : option
                  const selected = step === 'buscar' ? progress.selectedFindIds.includes(id)
                    : step === 'corta' ? progress.shortWordId === id : progress.syllableCount === id
                  const correct = step === 'buscar' ? option.isTarget
                    : step === 'corta' ? option === group.shortest.answer : option === group.syllables.parts.length
                  const stateClass = feedback === 'correct' && correct ? 'word-practice-option--correct'
                    : feedback === 'retry' && selected ? 'word-practice-option--retry'
                      : selected ? 'word-practice-option--selected' : ''
                  return (
                    <Button
                      key={id}
                      variant="secondary"
                      className={`word-practice-option ${stateClass}`.trim()}
                      aria-pressed={selected}
                      disabled={Boolean(feedback)}
                      onClick={() => {
                        if (feedback) return
                        updateProgress((current) => step === 'buscar' ? {
                          ...current,
                          selectedFindIds: current.selectedFindIds.includes(id)
                            ? current.selectedFindIds.filter((value) => value !== id) : [...current.selectedFindIds, id],
                        } : { ...current, [step === 'corta' ? 'shortWordId' : 'syllableCount']: id })
                      }}
                    >
                      {step === 'buscar' ? option.word : step === 'silabas' ? `${option} sílabas` : option}
                    </Button>
                  )
                })}
              </div>

              {feedback && <ActivityFeedback correct={feedback === 'correct'} />}
              {step === 'silabas' && feedback === 'correct' && <ReadOnlySyllables syllables={group.syllables.parts} />}
              {!feedback && <Button icon={Check} size="large" fullWidth disabled={!hasSelection} onClick={checkAnswer}>Comprobar</Button>}
              {feedback === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={retry}>Intentar nuevamente</Button>}
            </>}

            {saveError && <p className="feedback feedback--retry" role="alert">{saveError}</p>}
            {(step === 'leer' || feedback === 'correct') && <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              disabled={!canAdvanceWordPractice(group, progress) || saving}
              onClick={advance}
            >
              {saving ? 'Guardando…' : saveError ? 'Guardar y continuar' : step === 'silabas' ? 'Terminar esta práctica' : 'Siguiente reto'}
            </Button>}
          </Card>
        </>}
      </>}
    </main>
  )
}

export default WordPracticeTemplate
