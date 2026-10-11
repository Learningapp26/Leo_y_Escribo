import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  gCompletionInstructionAudio,
  gSentenceCompletion,
  gSentenceCompletionInstructionAudio,
  gSyllableCompletion,
} from '../data/gData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['silaba', 'oraciones']
const totalExercises = gSyllableCompletion.length + gSentenceCompletion.length

function ActividadGCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [stars, setStars] = useState(0)
  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('g')

  const [syllableIndex, setSyllableIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [syllableResult, setSyllableResult] = useState('')
  const syllableItem = gSyllableCompletion[syllableIndex]
  const isLastSyllable = syllableIndex === gSyllableCompletion.length - 1
  const visiblePattern = syllableItem.pattern.replace(
    '___',
    selectedSyllable || '___',
  )

  const pickSyllable = (option) => {
    if (syllableResult === 'correct') return

    playAudio(option.audio)
    setSelectedSyllable(option.syllable)
    setSyllableResult('')
  }

  const checkSyllable = () => {
    if (!selectedSyllable) return

    const option = syllableItem.options.find(
      (item) => item.syllable === selectedSyllable,
    )
    const isCorrect = Boolean(option?.isCorrect)

    setSyllableResult(isCorrect ? 'correct' : 'retry')
    registrarProgreso({
      actividad: 'g-completar',
      correcto: isCorrect,
      detalle: {
        leccionId: 'g',
        fase: 'silaba',
        ejercicioId: syllableItem.id,
      },
    })

    if (isCorrect) {
      setStars((current) => current + 1)
      playAudio(syllableItem.audio)
    }
  }

  const retrySyllable = () => {
    setSelectedSyllable('')
    setSyllableResult('')
  }

  const nextSyllable = () => {
    setSelectedSyllable('')
    setSyllableResult('')

    if (isLastSyllable) {
      setPhaseIndex(1)
      return
    }

    setSyllableIndex((current) => current + 1)
  }

  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [sentenceResult, setSentenceResult] = useState('')
  const sentenceItem = gSentenceCompletion[sentenceIndex]
  const isLastSentence = sentenceIndex === gSentenceCompletion.length - 1

  const checkSentence = () => {
    if (!selectedAnswer) return

    const answerOption = sentenceItem.options.find(
      (option) => option.name === selectedAnswer,
    )
    const isCorrect = Boolean(answerOption?.isCorrect)

    setSentenceResult(isCorrect ? 'correct' : 'retry')
    registrarProgreso({
      actividad: 'g-completar',
      correcto: isCorrect,
      detalle: {
        leccionId: 'g',
        fase: 'oraciones',
        ejercicioId: sentenceItem.id,
      },
    })

    if (isCorrect) setStars((current) => current + 1)
  }

  const nextSentence = () => {
    setSelectedAnswer('')
    setSentenceResult('')

    setSentenceIndex((current) => current + 1)
  }

  return (
    <main
      className={`page completion-page ${themeClass}`}
      aria-labelledby="g-completar-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/g" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>
        <h1 id="g-completar-title">Completemos palabras y oraciones</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      {phase === 'silaba' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la palabra y toca la sílaba correcta para completarla.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(gCompletionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="completion-word-image"
            src={syllableItem.image}
            alt={syllableItem.word}
          />

          <p className="completion-word-pattern">{visiblePattern}</p>

          <div className="syllables-options">
            {syllableItem.options.map((option) => {
              const isSelected = selectedSyllable === option.syllable
              const stateClass =
                syllableResult && isSelected
                  ? syllableResult === 'correct'
                    ? 'syllable-button--correct'
                    : 'syllable-button--incorrect'
                  : isSelected
                    ? 'syllable-button--selected'
                    : ''

              return (
                <button
                  className={['syllable-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={option.syllable}
                  aria-pressed={isSelected}
                  onClick={() => pickSyllable(option)}
                >
                  {option.syllable}
                </button>
              )
            })}
          </div>

          {syllableResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! La palabra es {syllableItem.word}.
            </p>
          )}

          {syllableResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa no es la sílaba correcta. Inténtalo nuevamente.
            </p>
          )}

          {syllableResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedSyllable}
              onClick={checkSyllable}
            >
              Comprobar
            </Button>
          )}

          {syllableResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retrySyllable}
            >
              Intentar nuevamente
            </Button>
          )}

          {syllableResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextSyllable}
            >
              {isLastSyllable ? 'Siguiente parte' : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'oraciones' && (
        <Card className="completion-card">
          <div className="completion-instructions">
            <p className="text-instruction">
              Observa la imagen y elige la palabra que completa la oración.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(gSentenceCompletionInstructionAudio)
              }
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="completion-word-image"
            src={sentenceItem.image}
            alt={sentenceItem.imageAlt}
          />

          <p className="completion-words-sentence">
            {sentenceItem.sentence.replace(
              '___',
              selectedAnswer || '________',
            )}
          </p>

          <div className="selection-options">
            {sentenceItem.options.map((option) => {
              const selected = selectedAnswer === option.name
              const stateClass =
                selected && sentenceResult === 'correct'
                  ? 'selection-button--correct'
                  : selected && sentenceResult === 'retry'
                    ? 'selection-button--incorrect'
                    : selected
                      ? 'selection-button--selected'
                      : ''

              return (
                <button
                  type="button"
                  key={option.name}
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() => {
                    if (sentenceResult === 'correct') return
                    setSelectedAnswer(option.name)
                    setSentenceResult('')
                  }}
                >
                  <span className="selection-word">{option.name}</span>
                </button>
              )
            })}
          </div>

          {sentenceResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! {sentenceItem.sentence.replace(
                '___',
                selectedAnswer,
              )}
            </p>
          )}

          {sentenceResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa palabra no completa la oración. Inténtalo nuevamente.
            </p>
          )}

          {sentenceResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedAnswer}
              onClick={checkSentence}
            >
              Comprobar respuesta
            </Button>
          )}

          {sentenceResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedAnswer('')
                setSentenceResult('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {sentenceResult === 'correct' && !isLastSentence && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextSentence}
            >
              Siguiente oración
            </Button>
          )}

          {sentenceResult === 'correct' && isLastSentence && (
            <Button
              to="/actividad/g-final"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Ir a la siguiente actividad
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadGCompletarPage
