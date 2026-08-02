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
import { finalExercises } from '../data/yConjunctionData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/y-conjunction.css'

function ActividadYFinalPage() {
  const [exerciseIndex, setExerciseIndex] =
    useState(0)

  const [selectedAnswer, setSelectedAnswer] =
    useState('')

  const [result, setResult] =
    useState('')

  const [stars, setStars] =
    useState(0)

  const [finished, setFinished] =
    useState(false)

  const themeClass =
    getLessonThemeClass('y-conjuncion')

  const exercise =
    finalExercises[exerciseIndex]

  const checkAnswer = () => {
    if (!selectedAnswer) return

    const isCorrect =
      selectedAnswer === exercise.answer

    setResult(
      isCorrect ? 'correct' : 'retry',
    )

    if (isCorrect) {
      setStars((current) => current + 1)
      playAudio(exercise.phraseAudio)
    }
  }

  const retryExercise = () => {
    setSelectedAnswer('')
    setResult('')
  }

  const nextExercise = () => {
    const isLast =
      exerciseIndex === finalExercises.length - 1

    if (isLast) {
      setFinished(true)
      return
    }

    setExerciseIndex((current) => current + 1)
    setSelectedAnswer('')
    setResult('')
  }

  if (finished) {
    return (
      <main
        className={`page y-page ${themeClass}`}
      >
        <section className="y-page__content">
          <Card className="y-finish-card">
            <span
              className="y-finish-card__star"
              aria-hidden="true"
            >
              ⭐
            </span>

            <h1>¡Terminaste la lección!</h1>

            <p className="text-instruction">
              Aprendiste que la palabra y sirve para unir
              dos personas, animales u objetos.
            </p>

            <StarsCounter
              current={stars}
              total={finalExercises.length}
              label="Estrellas"
            />

            <Button
              variant="audio"
              icon={Volume2}
              fullWidth
              onClick={() =>
                playAudio(
                  '/audio/lecciones/y/felicitacion-final.mp3',
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
        </section>
      </main>
    )
  }

  return (
    <main
      className={`page y-page ${themeClass}`}
      aria-labelledby="y-final-title"
    >
      <section className="y-page__content">
        <BackButton
          label="Volver a la lección"
          to="/lecciones/y-conjuncion"
        />

        <header className="y-page__header">
          <span className="y-page__unit">
            Actividad final
          </span>

          <h1
            className="y-page__title"
            id="y-final-title"
          >
            Completa la frase
          </h1>

          <p className="text-instruction y-page__instruction">
            {exercise.instruction}
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(exercise.exerciseAudio)
            }
          >
            Escuchar ejercicio
          </Button>
        </header>

        <ProgressBar
          value={exerciseIndex + 1}
          max={finalExercises.length}
          label={`Ejercicio ${exerciseIndex + 1} de ${finalExercises.length}`}
        />

        <StarsCounter
          current={stars}
          total={finalExercises.length}
          label="Estrellas"
        />

        <Card>
          <div className="y-final-prompt">
            <img
              className="y-final-prompt__image"
              src={exercise.first.image}
              alt={exercise.first.imageAlt}
            />

            <p className="y-pair__phrase">
              <span>{exercise.first.name}</span>

              <span className="y-connector">
                y
              </span>

              <span>
                {selectedAnswer || '________'}
              </span>
            </p>
          </div>

          <div
            className="y-final-options"
            aria-label="Opciones de respuesta"
          >
            {exercise.options.map((option) => {
              const selected =
                selectedAnswer === option.name

              return (
                <button
                  className={[
                    'y-final-option',
                    selected
                      ? 'y-final-option--selected'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={option.name}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedAnswer(option.name)
                    setResult('')
                  }}
                >
                  <img
                    className="y-final-option__image"
                    src={option.image}
                    alt={option.name}
                  />

                  <span>{option.name}</span>

                  <Button
                    variant="audio"
                    size="small"
                    icon={Volume2}
                    onClick={(event) => {
                      event.stopPropagation()

                      playAudio(
                        `/audio/lecciones/y/${option.name
                          .normalize('NFD')
                          .replace(/[\u0300-\u036f]/g, '')
                          .toLowerCase()}.mp3`,
                      )
                    }}
                    aria-label={`Escuchar la palabra ${option.name}`}
                  >
                    Escuchar
                  </Button>
                </button>
              )
            })}
          </div>

          {result === 'correct' && (
            <p
              className="y-feedback y-feedback--correct"
              role="status"
            >
              ¡Correcto! Formaste la frase{' '}
              {exercise.first.name} y {exercise.answer}.
            </p>
          )}

          {result === 'retry' && (
            <p
              className="y-feedback y-feedback--retry"
              role="status"
            >
              Esa imagen no completa la pareja. Escucha otra
              vez e inténtalo nuevamente.
            </p>
          )}

          {!result && (
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

          {result === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryExercise}
            >
              Intentar nuevamente
            </Button>
          )}

          {result === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextExercise}
            >
              {exerciseIndex ===
              finalExercises.length - 1
                ? 'Finalizar lección'
                : 'Siguiente ejercicio'}
            </Button>
          )}
        </Card>
      </section>
    </main>
  )
}

export default ActividadYFinalPage