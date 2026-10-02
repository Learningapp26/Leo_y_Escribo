import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  vChoiceExercises,
  vChoiceInstructionAudio,
  vCompletionExercises,
  vCompletionInstructionAudio,
} from '../data/vData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = ['completar', 'elegir']
const totalExercises = vCompletionExercises.length + vChoiceExercises.length

function ActividadVCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('v')

  const [completionIndex, setCompletionIndex] = useState(0)
  const [selectedCompletion, setSelectedCompletion] = useState('')
  const [completionFeedback, setCompletionFeedback] = useState('')

  const [choiceIndex, setChoiceIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState('')
  const [choiceFeedback, setChoiceFeedback] = useState('')

  const [stars, setStars] = useState(0)

  const completionExercise = vCompletionExercises[completionIndex]
  const choiceExercise = vChoiceExercises[choiceIndex]

  const isLastCompletion = completionIndex === vCompletionExercises.length - 1
  const isLastChoice = choiceIndex === vChoiceExercises.length - 1

  const completionPattern =
    `${completionExercise.before}${selectedCompletion || '___'}${completionExercise.after}`

  const checkCompletion = () => {
    if (!selectedCompletion) return

    const isCorrect = selectedCompletion === completionExercise.answer

    setCompletionFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'v-completar',
      correcto: isCorrect,
      detalle: { leccionId: 'v', fase: 'completar', ejercicioId: completionExercise.id },
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

  const checkChoice = () => {
    if (!selectedChoice) return

    const isCorrect = selectedChoice === choiceExercise.answer

    setChoiceFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'v-completar',
      correcto: isCorrect,
      detalle: { leccionId: 'v', fase: 'elegir', ejercicioId: choiceExercise.id },
    })

    if (isCorrect) {
      setStars((current) => current + 1)
      playAudio(choiceExercise.audio)
    }
  }

  const nextChoice = () => {
    setSelectedChoice('')
    setChoiceFeedback('')
    setChoiceIndex((current) => current + 1)
  }

  return (
    <main
      className={`page completion-page ${themeClass}`}
      aria-labelledby="v-completar-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/v" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>

        <h1 id="v-completar-title">Completemos palabras con V</h1>
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

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(vCompletionInstructionAudio)}>
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

      {phase === 'elegir' && (
        <Card className="completion-card">
          <div className="completion-instructions">
            <p className="text-instruction">
              Observa la imagen y elige la palabra correcta para nombrarla.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(vChoiceInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="completion-word-image"
            src={choiceExercise.image}
            alt={choiceExercise.imageAlt}
          />

          <div className="selection-options">
            {choiceExercise.options.map((word) => {
              const selected = selectedChoice === word

              const stateClass =
                selected && choiceFeedback === 'correct'
                  ? 'selection-button--correct'
                  : selected && choiceFeedback === 'retry'
                    ? 'selection-button--incorrect'
                    : selected
                      ? 'selection-button--selected'
                      : ''

              return (
                <Button
                  key={word}
                  variant="secondary"
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedChoice(word)
                    setChoiceFeedback('')
                  }}
                >
                  <span className="selection-word">{word}</span>
                </Button>
              )
            })}
          </div>

          {choiceFeedback === 'correct' && (
            <p className="selection-feedback selection-feedback--correct" role="status">
              ¡Correcto! Esa imagen es "{choiceExercise.answer}".
            </p>
          )}

          {choiceFeedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Esa no es la palabra que nombra el dibujo. Inténtalo otra vez.
            </p>
          )}

          {choiceFeedback !== 'correct' && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedChoice} onClick={checkChoice}>
              Comprobar
            </Button>
          )}

          {choiceFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedChoice('')
                setChoiceFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {choiceFeedback === 'correct' && !isLastChoice && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextChoice}>
              Siguiente palabra
            </Button>
          )}

          {choiceFeedback === 'correct' && isLastChoice && (
            <Button to="/actividad/v-final" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
              Ir a la actividad final
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadVCompletarPage
