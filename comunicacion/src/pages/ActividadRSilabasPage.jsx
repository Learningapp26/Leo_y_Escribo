import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import { rSyllables } from '../data/rLessonData'
import { playAudio } from '../lib/audioPlayer'

function ActividadRSilabasPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [feedback, setFeedback] = useState('')

  const themeClass = getLessonThemeClass('r')
  const currentExercise = rSyllables[currentIndex]

  const isFirst = currentIndex === 0
  const isLast = currentIndex === rSyllables.length - 1

  const selectSyllable = (syllable) => {
    setSelectedSyllable(syllable)
    setFeedback('')
    playAudio(
      rSyllables.find(
        (item) => item.syllable === syllable,
      )?.syllableAudio,
    )
  }

  const checkAnswer = () => {
    if (!selectedSyllable) return

    setFeedback(
      selectedSyllable === currentExercise.syllable
        ? 'correct'
        : 'retry',
    )

    if (selectedSyllable === currentExercise.syllable) {
      playAudio(currentExercise.wordAudio)
    }
  }

  const resetAnswer = () => {
    setSelectedSyllable('')
    setFeedback('')
  }

  const previousExercise = () => {
    if (isFirst) return

    setCurrentIndex((current) => current - 1)
    resetAnswer()
  }

  const nextExercise = () => {
    if (isLast) return

    setCurrentIndex((current) => current + 1)
    resetAnswer()
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="r-syllables-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/r"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad 1
        </span>

        <h1 id="r-syllables-title">
          Sílabas con la letra R
        </h1>
      </header>

      <ProgressBar
        value={currentIndex + 1}
        max={rSyllables.length}
        label={`Palabra ${currentIndex + 1} de ${rSyllables.length}`}
      />

      <Card className="selection-card">
        <div className="selection-instructions">
          <p className="text-instruction">
            Escucha la palabra y selecciona la sílaba con
            la que comienza.
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(
                '/audio/lecciones/r/instruccion-silabas.mp3',
              )
            }
          >
            Escuchar instrucción
          </Button>
        </div>

        <img
          className="selection-image"
          src={currentExercise.image}
          alt={currentExercise.imageAlt}
        />

        <h2 className="selection-word">
          {currentExercise.word}
        </h2>

        <Button
          variant="audio"
          icon={Volume2}
          onClick={() =>
            playAudio(currentExercise.wordAudio)
          }
        >
          Escuchar palabra
        </Button>

        <div
          className="selection-options"
          aria-label="Sílabas disponibles"
        >
          {rSyllables.map((item) => {
            const selected =
              selectedSyllable === item.syllable

            const correct =
              feedback === 'correct' &&
              item.syllable === currentExercise.syllable

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
                key={item.syllable}
                aria-pressed={selected}
                onClick={() =>
                  selectSyllable(item.syllable)
                }
              >
                <span className="selection-word">
                  {item.syllable}
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
            ¡Muy bien! {currentExercise.word} comienza con{' '}
            {currentExercise.syllable}.
          </p>
        )}

        {feedback === 'retry' && (
          <p
            className="selection-feedback selection-feedback--retry"
            role="status"
          >
            Escucha la palabra nuevamente y selecciona otra
            sílaba.
          </p>
        )}

        {!feedback && (
          <Button
            fullWidth
            disabled={!selectedSyllable}
            onClick={checkAnswer}
          >
            Comprobar respuesta
          </Button>
        )}

        {feedback === 'retry' && (
          <Button
            variant="retry"
            fullWidth
            onClick={resetAnswer}
          >
            Intentar nuevamente
          </Button>
        )}

        <footer className="reading-footer">
          <div className="reading-navigation">
            <Button
              variant="secondary"
              icon={ArrowLeft}
              disabled={isFirst}
              onClick={previousExercise}
            >
              Anterior
            </Button>
          </div>

          <div className="reading-pagination">
            {rSyllables.map((item, index) => (
              <span
                className={[
                  'reading-pagination__dot',
                  index === currentIndex
                    ? 'reading-pagination__dot--active'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={item.id}
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="reading-navigation">
            {isLast ? (
              <Button
                to="/actividad/r-sonidos"
                icon={ArrowRight}
                iconPosition="right"
              >
                Siguiente actividad
              </Button>
            ) : (
              <Button
                icon={ArrowRight}
                iconPosition="right"
                disabled={feedback !== 'correct'}
                onClick={nextExercise}
              >
                Siguiente
              </Button>
            )}
          </div>
        </footer>
      </Card>
    </main>
  )
}

export default ActividadRSilabasPage