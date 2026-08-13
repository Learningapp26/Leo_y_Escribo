import { useState } from 'react'
import {
  ArrowRight,
  Check,
  RotateCcw,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  cFinalWords,
  cFinalWordsInstructionAudio,
  cSentenceExercises,
  cSentenceInstructionAudio,
} from '../data/cData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = [
  'palabras',
  'oraciones',
]

function ActividadCFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)

  const [
    sentenceIndex,
    setSentenceIndex,
  ] = useState(0)

  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState('')

  const [feedback, setFeedback] = useState('')
  const [stars, setStars] = useState(0)

  const [
    finished,
    setFinished,
  ] = useState(false)

  const phase = PHASES[phaseIndex]

  const themeClass =
    getLessonThemeClass('c')

  const sentence =
    cSentenceExercises[sentenceIndex]

  const isLastSentence =
    sentenceIndex ===
    cSentenceExercises.length - 1

  const checkAnswer = () => {
    if (!selectedAnswer) return

    const isCorrect =
      selectedAnswer === sentence.answer

    setFeedback(
      isCorrect ? 'correct' : 'retry',
    )

    if (isCorrect) {
      setStars(
        (current) => current + 1,
      )

      playAudio(sentence.completedAudio)
    }
  }

  const nextSentence = () => {
    setSelectedAnswer('')
    setFeedback('')

    if (isLastSentence) {
      setFinished(true)
      return
    }

    setSentenceIndex(
      (current) => current + 1,
    )
  }

  if (finished) {
    return (
      <main
        className={`page completion-page ${themeClass}`}
        aria-labelledby="c-finished-title"
      >
        <Card className="completion-card">
          <span
            className="text-letter"
            aria-hidden="true"
          >
            C
          </span>

          <h1 id="c-finished-title">
            ¡Terminaste la lección de la letra C!
          </h1>

          <p className="text-instruction">
            Practicaste el sonido de la letra C,
            las sílabas ca, co y cu, completaste
            palabras y leíste oraciones.
          </p>

          <StarsCounter
            current={stars}
            total={cSentenceExercises.length}
            label="Estrellas"
          />

          <Button
            variant="audio"
            icon={Volume2}
            fullWidth
            onClick={() =>
              playAudio(
                '/audio/lecciones/c/felicitacion-final.mp3',
              )
            }
          >
            Escuchar felicitación
          </Button>

          <Button
            to="/lecciones"
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
          >
            Volver a las lecciones
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main
      className={`page completion-page ${themeClass}`}
      aria-labelledby="c-final-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/c"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad final
        </span>

        <h1 id="c-final-title">
          Leamos y completemos oraciones
        </h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      <StarsCounter
        current={stars}
        total={cSentenceExercises.length}
        label="Estrellas"
      />

      {phase === 'palabras' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Observa cada imagen, lee su nombre
              y escucha la palabra.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(
                  cFinalWordsInstructionAudio,
                )
              }
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {cFinalWords.map((item) => (
              <Card
                key={item.word}
                imageSrc={item.image}
                imageAlt={item.word}
                title={item.word}
                footer={
                  <Button
                    variant="audio"
                    icon={Volume2}
                    fullWidth
                    onClick={() =>
                      playAudio(item.audio)
                    }
                  >
                    Escuchar
                  </Button>
                }
              />
            ))}
          </div>

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            onClick={() =>
              setPhaseIndex(1)
            }
          >
            Continuar con las oraciones
          </Button>
        </Card>
      )}

      {phase === 'oraciones' && (
        <Card className="completion-card">
          <div className="completion-instructions">
            <p className="text-instruction">
              Lee y escucha la oración. Después,
              elige el dibujo que completa
              correctamente la oración.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(
                  cSentenceInstructionAudio,
                )
              }
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(
                sentence.sentenceAudio,
              )
            }
          >
            Escuchar oración
          </Button>

          <p className="completion-words-sentence">
            {sentence.sentence.replace(
              '___',
              selectedAnswer || '________',
            )}
          </p>

          <div className="selection-options">
            {sentence.options.map((option) => {
              const selected =
                selectedAnswer === option.name

              const stateClass =
                selected &&
                feedback === 'correct'
                  ? 'selection-button--correct'
                  : selected &&
                      feedback === 'retry'
                    ? 'selection-button--incorrect'
                    : selected
                      ? 'selection-button--selected'
                      : ''

              return (
                <Button
                  key={option.name}
                  variant="secondary"
                  className={[
                    'selection-button',
                    stateClass,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedAnswer(
                      option.name,
                    )

                    setFeedback('')

                    playAudio(option.audio)
                  }}
                >
                  <span className="app-card__content">
                    <img
                      className="selection-image"
                      src={option.image}
                      alt={option.name}
                    />

                    <span className="selection-word">
                      {option.name}
                    </span>
                  </span>
                </Button>
              )
            })}
          </div>

          {feedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto!{' '}
              {sentence.sentence.replace(
                '___',
                sentence.answer,
              )}
            </p>
          )}

          {feedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa imagen no completa la oración.
              Escucha de nuevo e inténtalo otra
              vez.
            </p>
          )}

          {feedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedAnswer}
              onClick={checkAnswer}
            >
              Comprobar respuesta
            </Button>
          )}

          {feedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedAnswer('')
                setFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {feedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextSentence}
            >
              {isLastSentence
                ? 'Finalizar lección'
                : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadCFinalPage