import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  qInitialSoundImages,
  qInitialSoundInstructionAudio,
  qMiddleSoundInstructionAudio,
  qMiddleSoundWords,
  qSoundExamples,
  qSoundIntro,
} from '../data/qData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = ['sonido', 'inicio', 'segunda-silaba']

const initialSoundAnswers = qInitialSoundImages
  .filter((item) => item.startsWithQ)
  .map((item) => item.id)

function getSelectionState(isSelected, feedback) {
  if (!isSelected) return ''
  if (feedback === 'correct') return 'selection-button--correct'
  if (feedback === 'retry') return 'selection-button--incorrect'
  return 'selection-button--selected'
}

function ActividadQSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('q')

  const [selectedInitialIds, setSelectedInitialIds] = useState([])
  const [initialFeedback, setInitialFeedback] = useState('')

  const [middleIndex, setMiddleIndex] = useState(0)
  const [selectedMiddleIndex, setSelectedMiddleIndex] = useState(null)
  const [middleFeedback, setMiddleFeedback] = useState('')

  const middleExercise = qMiddleSoundWords[middleIndex]
  const isLastMiddle = middleIndex === qMiddleSoundWords.length - 1

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  const toggleInitialImage = (item) => {
    if (initialFeedback === 'correct') return

    playAudio(item.audio)
    setInitialFeedback('')

    setSelectedInitialIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkInitialImages = () => {
    const isCorrect =
      selectedInitialIds.length === initialSoundAnswers.length &&
      selectedInitialIds.every((id) => initialSoundAnswers.includes(id))

    setInitialFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'q-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'q', fase: 'inicio' },
    })
  }

  const retryInitialImages = () => {
    setSelectedInitialIds([])
    setInitialFeedback('')
  }

  const checkMiddleSound = () => {
    if (selectedMiddleIndex === null) return

    const isCorrect = selectedMiddleIndex === middleExercise.answerIndex

    setMiddleFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'q-sonidos',
      correcto: isCorrect,
      detalle: {
        leccionId: 'q',
        fase: 'segunda-silaba',
        ejercicioId: middleExercise.id,
      },
    })
  }

  const nextMiddleWord = () => {
    setSelectedMiddleIndex(null)
    setMiddleFeedback('')
    setMiddleIndex((current) => current + 1)
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="q-sonidos-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/q" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="q-sonidos-title">Reconozcamos el sonido de la letra Q</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'sonido' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Nombra despacio la palabra queso y escucha su primer sonido.
              Repítelo varias veces.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(qSoundIntro.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(qSoundIntro.soundAudio)}
          >
            Escuchar el sonido /q/
          </Button>

          <img
            className="selection-image selection-image--featured"
            src={qSoundIntro.mainWord.image}
            alt={qSoundIntro.mainWord.name}
          />

          <span className="text-word">{qSoundIntro.mainWord.name}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(qSoundIntro.mainWord.audio)}
          >
            Escuchar la palabra queso
          </Button>

          <p className="text-instruction">
            Escucha y repite: quilete, quemada y esquina.
          </p>

          <div className="completion-bank">
            {qSoundExamples.map((example) => (
              <Button
                key={example.word}
                variant="audio"
                icon={Volume2}
                onClick={() => playAudio(example.audio)}
              >
                {example.word}
              </Button>
            ))}
          </div>

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            onClick={goToNextPhase}
          >
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'inicio' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca los dibujos cuyo nombre inicia con el mismo sonido que la
              palabra queso.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(qInitialSoundInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {qInitialSoundImages.map((item) => {
              const selected = selectedInitialIds.includes(item.id)
              const stateClass = getSelectionState(selected, initialFeedback)

              return (
                <Button
                  key={item.id}
                  variant="secondary"
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() => toggleInitialImage(item)}
                >
                  <span className="app-card__content">
                    <img
                      className="selection-image"
                      src={item.image}
                      alt={item.name}
                    />

                    <span className="selection-word">{item.name}</span>
                  </span>
                </Button>
              )
            })}
          </div>

          {initialFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Quince y quetzal comienzan con el sonido /q/.
            </p>
          )}

          {initialFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Escucha cada palabra y busca las que
              comienzan como queso.
            </p>
          )}

          {initialFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={selectedInitialIds.length === 0}
              onClick={checkInitialImages}
            >
              Comprobar selección
            </Button>
          )}

          {initialFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryInitialImages}
            >
              Intentar nuevamente
            </Button>
          )}

          {initialFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={goToNextPhase}
            >
              Siguiente parte
            </Button>
          )}
        </Card>
      )}

      {phase === 'segunda-silaba' && (
        <Card className="completion-card">
          <div className="completion-instructions">
            <p className="text-instruction">
              El sonido /q/ puede escucharse al inicio o después. Escucha
              cada palabra y toca la sílaba donde aparece.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(qMiddleSoundInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <span className="text-word">{middleExercise.word}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(middleExercise.audio)}
          >
            Escuchar palabra
          </Button>

          <div className="completion-bank">
            {middleExercise.syllables.map((syllable, index) => {
              const selected = selectedMiddleIndex === index

              const stateClass =
                selected && middleFeedback === 'correct'
                  ? 'completion-correct'
                  : selected && middleFeedback === 'retry'
                    ? 'completion-incorrect'
                    : selected
                      ? 'completion-active'
                      : ''

              return (
                <Button
                  key={`${middleExercise.id}-${syllable}`}
                  variant="secondary"
                  className={['completion-chip', 'text-syllable', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedMiddleIndex(index)
                    setMiddleFeedback('')
                  }}
                >
                  {syllable}
                </Button>
              )
            })}
          </div>

          {middleFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! En {middleExercise.word}, el sonido /q/ está en la
              sílaba {middleExercise.syllables[middleExercise.answerIndex]}.
            </p>
          )}

          {middleFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Escucha nuevamente y prueba con la otra sílaba.
            </p>
          )}

          {middleFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={selectedMiddleIndex === null}
              onClick={checkMiddleSound}
            >
              Comprobar
            </Button>
          )}

          {middleFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedMiddleIndex(null)
                setMiddleFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {middleFeedback === 'correct' && !isLastMiddle && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextMiddleWord}
            >
              Siguiente palabra
            </Button>
          )}

          {middleFeedback === 'correct' && isLastMiddle && (
            <Button
              to="/actividad/q-silabas"
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

export default ActividadQSonidosPage
