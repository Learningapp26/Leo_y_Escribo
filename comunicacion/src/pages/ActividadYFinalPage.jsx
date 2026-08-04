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

function getOptionAudioPath(optionName) {
  const normalizedName = optionName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

  return `/audio/lecciones/y/${normalizedName}.mp3`
}

function ActividadYFinalPage() {
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [result, setResult] = useState('')
  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('y-conjuncion')
  const exercise = finalExercises[exerciseIndex]

  const selectAnswer = (optionName) => {
    if (result === 'correct') return

    setSelectedAnswer(optionName)
    setResult('')
    playAudio(getOptionAudioPath(optionName))
  }

  const checkAnswer = () => {
    if (!selectedAnswer) return

    const isCorrect =
      selectedAnswer === exercise.answer

    setResult(isCorrect ? 'correct' : 'retry')

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
        className={`page completion-page ${themeClass}`}
        aria-labelledby="finished-title"
      >
        <Card className="completion-card">
          <span
            className="text-letter"
            aria-hidden="true"
          >
            ⭐
          </span>

          <h1 id="finished-title">
            ¡Terminaste la lección!
          </h1>

          <p className="text-instruction">
            Aprendiste que la palabra y sirve para unir dos
            personas, animales u objetos.
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
      </main>
    )
  }

  return (
    <main
      className={`page completion-page ${themeClass}`}
      aria-labelledby="y-final-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/y-conjuncion"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad final
        </span>

        <h1 id="y-final-title">
          Completa la frase
        </h1>
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

      <Card className="completion-card">
        <div className="completion-instructions">
          <p className="text-instruction">
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
        </div>

        <div className="completion-content">
          <div className="completion-word">
            <img
              className="completion-word-image"
              src={exercise.first.image}
              alt={exercise.first.imageAlt}
            />

            <div className="completion-word-content">
              <p className="completion-words-sentence">
                {exercise.first.name}{' '}
                <strong>y</strong>{' '}
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
              </p>
            </div>
          </div>

          <p className="text-instruction">
            Selecciona la imagen que completa la frase.
          </p>

          <div
            className="selection-options"
            aria-label="Opciones de respuesta"
          >
            {exercise.options.map((option) => {
              const selected =
                selectedAnswer === option.name

              const isCorrectOption =
                result === 'correct' &&
                option.name === exercise.answer

              const isIncorrectOption =
                result === 'retry' && selected

              return (
                <button
                  className={[
                    'selection-button',
                    selected
                      ? 'selection-button--selected'
                      : '',
                    isCorrectOption
                      ? 'selection-button--correct'
                      : '',
                    isIncorrectOption
                      ? 'selection-button--incorrect'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={option.name}
                  aria-pressed={selected}
                  onClick={() =>
                    selectAnswer(option.name)
                  }
                >
                  <img
                    className="selection-image"
                    src={option.image}
                    alt={option.name}
                  />

                  <span className="selection-word">
                    {option.name}
                  </span>

                  <span className="text-ui-label">
                    Toca para escuchar
                  </span>
                </button>
              )
            })}
          </div>

          {result === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! Formaste la frase{' '}
              {exercise.first.name} y {exercise.answer}.
            </p>
          )}

          {result === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa imagen no completa la frase. Escucha otra
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
        </div>
      </Card>
    </main>
  )
}

export default ActividadYFinalPage