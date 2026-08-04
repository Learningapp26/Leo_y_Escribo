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
  rCompletionExercises,
  rSentenceExercises,
} from '../data/rLessonData'
import { playAudio } from '../lib/audioPlayer'

const exercises = [
  ...rCompletionExercises.map((exercise) => ({
    ...exercise,
    type: 'word',
  })),
  ...rSentenceExercises.map((exercise) => ({
    ...exercise,
    type: 'sentence',
  })),
]

function ActividadRFinalPage() {
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('r')
  const exercise = exercises[exerciseIndex]

  const isLast = exerciseIndex === exercises.length - 1

  const selectAnswer = (answer) => {
    if (feedback === 'correct') return

    setSelectedAnswer(answer)
    setFeedback('')
  }

  const checkAnswer = () => {
    if (!selectedAnswer) return

    const correct =
      selectedAnswer === exercise.answer

    setFeedback(correct ? 'correct' : 'retry')

    if (correct) {
      setStars((current) => current + 1)

      playAudio(
        exercise.type === 'word'
          ? exercise.completedAudio
          : exercise.completedAudio,
      )
    }
  }

  const resetAnswer = () => {
    setSelectedAnswer('')
    setFeedback('')
  }

  const nextExercise = () => {
    if (isLast) {
      setFinished(true)
      return
    }

    setExerciseIndex((current) => current + 1)
    resetAnswer()
  }

  if (finished) {
    return (
      <main
        className={`page completion-page ${themeClass}`}
        aria-labelledby="r-finished-title"
      >
        <Card className="completion-card">
          <span
            className="text-letter"
            aria-hidden="true"
          >
            R
          </span>

          <h1 id="r-finished-title">
            ¡Terminaste la lección de la R!
          </h1>

          <p className="text-instruction">
            Reconociste las sílabas con R, diferenciaste el
            sonido fuerte y suave y completaste palabras.
          </p>

          <StarsCounter
            current={stars}
            total={exercises.length}
            label="Estrellas"
          />

          <Button
            variant="audio"
            icon={Volume2}
            fullWidth
            onClick={() =>
              playAudio(
                '/audio/lecciones/r/felicitacion-final.mp3',
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
      aria-labelledby="r-final-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/r"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad final
        </span>

        <h1 id="r-final-title">
          Completa con la letra R
        </h1>
      </header>

      <ProgressBar
        value={exerciseIndex + 1}
        max={exercises.length}
        label={`Ejercicio ${exerciseIndex + 1} de ${exercises.length}`}
      />

      <StarsCounter
        current={stars}
        total={exercises.length}
        label="Estrellas"
      />

      <Card className="completion-card">
        <div className="completion-instructions">
          <p className="text-instruction">
            {exercise.type === 'word'
              ? 'Selecciona la sílaba que completa la palabra.'
              : 'Selecciona la palabra que completa la oración.'}
          </p>

          <Button
            variant="audio"
            icon={Volume2}
            size="large"
            onClick={() =>
              playAudio(exercise.audio)
            }
          >
            Escuchar ejercicio
          </Button>
        </div>

        <div className="completion-content">
          {exercise.type === 'word' && (
            <>
              <div className="completion-word">
                <img
                  className="completion-word-image"
                  src={exercise.image}
                  alt={exercise.imageAlt}
                />

                <div className="completion-word-content">
                  <p className="completion-words-sentence">
                    {exercise.prefix}

                    <span
                      className={[
                        'completion-word-slot',
                        selectedAnswer ? 'filled' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {selectedAnswer || '___'}
                    </span>

                    {exercise.suffix}
                  </p>
                </div>
              </div>
            </>
          )}

          {exercise.type === 'sentence' && (
            <p className="completion-words-sentence">
              {exercise.beginning}{' '}

              <span
                className={[
                  'completion-word-slot',
                  selectedAnswer ? 'filled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {selectedAnswer || '________'}
              </span>

              {exercise.ending
                ? ` ${exercise.ending}`
                : '.'}
            </p>
          )}

          <div
            className="selection-options"
            aria-label="Opciones de respuesta"
          >
            {exercise.options.map((option) => {
              const selected =
                selectedAnswer === option

              const correct =
                feedback === 'correct' && selected

              const incorrect =
                feedback === 'retry' && selected

              return (
                <button
                  className={[
                    'selection-button',
                    selected
                      ? 'selection-button--selected'
                      : '',
                    correct
                      ? 'selection-button--correct'
                      : '',
                    incorrect
                      ? 'selection-button--incorrect'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={option}
                  aria-pressed={selected}
                  onClick={() => selectAnswer(option)}
                >
                  <span className="selection-word">
                    {option}
                  </span>
                </button>
              )
            })}
          </div>

          {feedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Completaste correctamente el
              ejercicio.
            </p>
          )}

          {feedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa opción no completa correctamente el
              ejercicio. Escucha de nuevo.
            </p>
          )}

          {!feedback && (
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
              onClick={resetAnswer}
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
              onClick={nextExercise}
            >
              {isLast
                ? 'Finalizar lección'
                : 'Siguiente ejercicio'}
            </Button>
          )}
        </div>
      </Card>
    </main>
  )
}

export default ActividadRFinalPage