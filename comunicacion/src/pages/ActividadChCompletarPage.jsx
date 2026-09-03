import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  chCompletionExercises,
  chCompletionInstructionAudio,
  chJoinExercises,
  chJoinInstructionAudio,
} from '../data/chData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = ['completar', 'formar']
const totalExercises = chCompletionExercises.length + chJoinExercises.length

function ActividadChCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('ch')

  const [completionIndex, setCompletionIndex] = useState(0)
  const [selectedCompletion, setSelectedCompletion] = useState('')
  const [completionFeedback, setCompletionFeedback] = useState('')

  const [joinIndex, setJoinIndex] = useState(0)
  const [selectedJoin, setSelectedJoin] = useState('')
  const [joinFeedback, setJoinFeedback] = useState('')

  const [stars, setStars] = useState(0)

  const completionExercise = chCompletionExercises[completionIndex]
  const joinExercise = chJoinExercises[joinIndex]

  const isLastCompletion = completionIndex === chCompletionExercises.length - 1
  const isLastJoin = joinIndex === chJoinExercises.length - 1

  const completionPattern =
    `${completionExercise.before}${selectedCompletion || '___'}${completionExercise.after}`

  const checkCompletion = () => {
    if (!selectedCompletion) return

    const isCorrect = selectedCompletion === completionExercise.answer

    setCompletionFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'ch-completar',
      correcto: isCorrect,
      detalle: { leccionId: 'ch', fase: 'completar', ejercicioId: completionExercise.id },
    })

    if (isCorrect) {
      setStars((current) => current + 1)
      playAudio(completionExercise.audio)
    }
  }

  const nextCompletion = () => {
    setSelectedCompletion('')
    setCompletionFeedback('')

    if (isLastCompletion) {
      setPhaseIndex(1)
      return
    }

    setCompletionIndex((current) => current + 1)
  }

  const checkJoin = () => {
    if (!selectedJoin) return

    const isCorrect = selectedJoin === joinExercise.answer

    setJoinFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'ch-completar',
      correcto: isCorrect,
      detalle: { leccionId: 'ch', fase: 'formar', ejercicioId: joinExercise.id },
    })

    if (isCorrect) {
      setStars((current) => current + 1)
      playAudio(joinExercise.audio)
    }
  }

  const nextJoin = () => {
    setSelectedJoin('')
    setJoinFeedback('')
    setJoinIndex((current) => current + 1)
  }

  return (
    <main
      className={`page completion-page ${themeClass}`}
      aria-labelledby="ch-completar-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/ch" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>

        <h1 id="ch-completar-title">Completemos palabras con CH</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      {phase === 'completar' && (
        <Card className="completion-card">
          <div className="completion-instructions">
            <p className="text-instruction">
              Nombra el dibujo lentamente y elige la sílaba que falta para
              completar la palabra.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(chCompletionInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <div className="completion-content">
            <img
              className="completion-word-image"
              src={completionExercise.image}
              alt={completionExercise.imageAlt}
            />

            <p className="completion-word-pattern">{completionPattern}</p>

            <div className="completion-bank">
              {completionExercise.options.map((syllable) => {
                const selected = selectedCompletion === syllable

                const stateClass =
                  selected && completionFeedback === 'correct'
                    ? 'completion-correct'
                    : selected && completionFeedback === 'retry'
                      ? 'completion-incorrect'
                      : selected
                        ? 'completion-active'
                        : ''

                return (
                  <Button
                    key={syllable}
                    variant="secondary"
                    className={['completion-chip', 'text-syllable', stateClass].filter(Boolean).join(' ')}
                    aria-pressed={selected}
                    onClick={() => {
                      setSelectedCompletion(syllable)
                      setCompletionFeedback('')
                    }}
                  >
                    {syllable}
                  </Button>
                )
              })}
            </div>
          </div>

          {completionFeedback === 'correct' && (
            <p className="selection-feedback selection-feedback--correct" role="status">
              ¡Correcto! {completionExercise.word} se escribe con {completionExercise.answer}.
            </p>
          )}

          {completionFeedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Esa sílaba no corresponde al dibujo. Escucha de nuevo e inténtalo otra vez.
            </p>
          )}

          {completionFeedback !== 'correct' && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedCompletion} onClick={checkCompletion}>
              Comprobar palabra
            </Button>
          )}

          {completionFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedCompletion('')
                setCompletionFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {completionFeedback === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextCompletion}>
              {isLastCompletion ? 'Continuar' : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'formar' && (
        <Card className="completion-card">
          <div className="completion-instructions">
            <p className="text-instruction">
              Observa el dibujo y la primera sílaba. Elige la sílaba que
              falta para formar la palabra.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(chJoinInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <div className="completion-content">
            <img
              className="completion-word-image"
              src={joinExercise.image}
              alt={joinExercise.imageAlt}
            />

            <p className="completion-words-sentence">
              <span className="completion-chip text-syllable">{joinExercise.firstSyllable}</span>

              <span aria-hidden="true"> + </span>

              <span className={['completion-word-slot', selectedJoin ? 'filled' : ''].filter(Boolean).join(' ')}>
                {selectedJoin || '___'}
              </span>
            </p>

            <div className="completion-bank">
              {joinExercise.options.map((syllable) => {
                const selected = selectedJoin === syllable

                const stateClass =
                  selected && joinFeedback === 'correct'
                    ? 'completion-correct'
                    : selected && joinFeedback === 'retry'
                      ? 'completion-incorrect'
                      : selected
                        ? 'completion-active'
                        : ''

                return (
                  <Button
                    key={syllable}
                    variant="secondary"
                    className={['completion-chip', 'text-syllable', stateClass].filter(Boolean).join(' ')}
                    aria-pressed={selected}
                    onClick={() => {
                      setSelectedJoin(syllable)
                      setJoinFeedback('')
                    }}
                  >
                    {syllable}
                  </Button>
                )
              })}
            </div>
          </div>

          {joinFeedback === 'correct' && (
            <p className="selection-feedback selection-feedback--correct" role="status">
              ¡Muy bien! {joinExercise.firstSyllable} + {joinExercise.answer} forma {joinExercise.word}.
            </p>
          )}

          {joinFeedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Esa sílaba no forma la palabra. Inténtalo nuevamente.
            </p>
          )}

          {joinFeedback !== 'correct' && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedJoin} onClick={checkJoin}>
              Comprobar palabra
            </Button>
          )}

          {joinFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedJoin('')
                setJoinFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {joinFeedback === 'correct' && !isLastJoin && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextJoin}>
              Siguiente palabra
            </Button>
          )}

          {joinFeedback === 'correct' && isLastJoin && (
            <Button to="/actividad/ch-final" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
              Ir a la actividad final
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadChCompletarPage
