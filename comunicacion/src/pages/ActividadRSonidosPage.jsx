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
import { rSoundExercises } from '../data/rLessonData'
import { playAudio } from '../lib/audioPlayer'

function ActividadRSonidosPage() {
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [stars, setStars] = useState(0)

  const themeClass = getLessonThemeClass('r')
  const exercise = rSoundExercises[exerciseIndex]

  const isLast =
    exerciseIndex === rSoundExercises.length - 1

  const selectAnswer = (answer) => {
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
        exercise.answer === 'fuerte'
          ? '/audio/lecciones/r/respuesta-r-fuerte.mp3'
          : '/audio/lecciones/r/respuesta-r-suave.mp3',
      )
    }
  }

  const resetAnswer = () => {
    setSelectedAnswer('')
    setFeedback('')
  }

  const nextExercise = () => {
    setExerciseIndex((current) => current + 1)
    resetAnswer()
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="r-sounds-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/r"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad 2
        </span>

        <h1 id="r-sounds-title">
          R fuerte y R suave
        </h1>
      </header>

      <ProgressBar
        value={exerciseIndex + 1}
        max={rSoundExercises.length}
        label={`Palabra ${exerciseIndex + 1} de ${rSoundExercises.length}`}
      />

      <StarsCounter
        current={stars}
        total={rSoundExercises.length}
        label="Estrellas"
      />

      <Card className="selection-card">
        <div className="selection-instructions">
          <p className="text-instruction">
            Escucha la palabra y decide si la letra R tiene
            un sonido fuerte o un sonido suave.
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(
                '/audio/lecciones/r/instruccion-sonido-fuerte-suave.mp3',
              )
            }
          >
            Escuchar instrucción
          </Button>
        </div>

        <img
          className="selection-image"
          src={exercise.image}
          alt={exercise.imageAlt}
        />

        <h2 className="selection-word">
          {exercise.word}
        </h2>

        <Button
          variant="audio"
          icon={Volume2}
          onClick={() => playAudio(exercise.audio)}
        >
          Escuchar palabra
        </Button>

        <div className="selection-options">
          {[
            {
              value: 'fuerte',
              label: 'R fuerte',
            },
            {
              value: 'suave',
              label: 'R suave',
            },
          ].map((option) => {
            const selected =
              selectedAnswer === option.value

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
                key={option.value}
                aria-pressed={selected}
                onClick={() =>
                  selectAnswer(option.value)
                }
              >
                <span className="selection-word">
                  {option.label}
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
            ¡Correcto! En {exercise.word}, la letra R tiene
            sonido {exercise.answer}.
          </p>
        )}

        {feedback === 'retry' && (
          <p
            className="selection-feedback selection-feedback--retry"
            role="status"
          >
            Escucha nuevamente la palabra e inténtalo otra
            vez.
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
          isLast ? (
            <Button
              to="/actividad/r-final"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Ir a la actividad final
            </Button>
          ) : (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextExercise}
            >
              Siguiente palabra
            </Button>
          )
        )}
      </Card>
    </main>
  )
}

export default ActividadRSonidosPage