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
import { getLessonThemeClass } from '../data/lessonColors'
import { page27Pairs } from '../data/yConjunctionData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/y-conjunction.css'

const leftOptions = page27Pairs.map(
  (pair) => pair.first,
)

const rightOptions = [
  page27Pairs[1].second,
  page27Pairs[2].second,
  page27Pairs[0].second,
]

function ActividadYUnirImagenesPage() {
  const [selectedLeft, setSelectedLeft] =
    useState(null)

  const [selectedRight, setSelectedRight] =
    useState(null)

  const [matchedPairs, setMatchedPairs] =
    useState([])

  const [feedback, setFeedback] =
    useState('')

  const themeClass =
    getLessonThemeClass('y-conjuncion')

  const isFinished =
    matchedPairs.length === page27Pairs.length

  const isMatched = (itemId) =>
    matchedPairs.some(
      (pairId) =>
        page27Pairs
          .find((pair) => pair.id === pairId)
          ?.first.id === itemId ||
        page27Pairs
          .find((pair) => pair.id === pairId)
          ?.second.id === itemId,
    )

  const checkPair = () => {
    if (!selectedLeft || !selectedRight) return

    const matchingPair = page27Pairs.find(
      (pair) =>
        pair.first.id === selectedLeft.id &&
        pair.second.id === selectedRight.id,
    )

    if (!matchingPair) {
      setFeedback('retry')
      return
    }

    setMatchedPairs((current) => [
      ...current,
      matchingPair.id,
    ])

    setFeedback('correct')
    playAudio(matchingPair.phraseAudio)
  }

  const continueActivity = () => {
    setSelectedLeft(null)
    setSelectedRight(null)
    setFeedback('')
  }

  const retryPair = () => {
    setSelectedLeft(null)
    setSelectedRight(null)
    setFeedback('')
  }

  return (
    <main
      className={`page y-page ${themeClass}`}
      aria-labelledby="y-match-title"
    >
      <section className="y-page__content">
        <BackButton
          label="Volver a la lección"
          to="/lecciones/y-conjuncion"
        />

        <header className="y-page__header">
          <span className="y-page__unit">
            Actividad 2
          </span>

          <h1
            className="y-page__title"
            id="y-match-title"
          >
            Unimos imágenes
          </h1>

          <p className="text-instruction y-page__instruction">
            Selecciona una imagen de cada columna para formar
            una pareja.
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(
                '/audio/lecciones/y/instruccion-unir-imagenes.mp3',
              )
            }
          >
            Escuchar instrucción
          </Button>
        </header>

        <ProgressBar
          value={matchedPairs.length}
          max={page27Pairs.length}
          label={`Parejas encontradas: ${matchedPairs.length} de ${page27Pairs.length}`}
        />

        <Card>
          <div className="y-match-board">
            <section className="y-match-column">
              <h2 className="y-match-column__title">
                Primera imagen
              </h2>

              {leftOptions.map((item) => {
                const selected =
                  selectedLeft?.id === item.id

                const matched = isMatched(item.id)

                return (
                  <button
                    className={[
                      'y-image-option',
                      selected
                        ? 'y-image-option--selected'
                        : '',
                      matched
                        ? 'y-image-option--matched'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    type="button"
                    key={item.id}
                    disabled={matched}
                    aria-pressed={selected}
                    onClick={() => {
                      setSelectedLeft(item)
                      setFeedback('')
                    }}
                  >
                    <img
                      className="y-image-option__image"
                      src={item.image}
                      alt={item.name}
                    />

                    <span>{item.name}</span>
                  </button>
                )
              })}
            </section>

            <section className="y-match-column">
              <h2 className="y-match-column__title">
                Segunda imagen
              </h2>

              {rightOptions.map((item) => {
                const selected =
                  selectedRight?.id === item.id

                const matched = isMatched(item.id)

                return (
                  <button
                    className={[
                      'y-image-option',
                      selected
                        ? 'y-image-option--selected'
                        : '',
                      matched
                        ? 'y-image-option--matched'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    type="button"
                    key={item.id}
                    disabled={matched}
                    aria-pressed={selected}
                    onClick={() => {
                      setSelectedRight(item)
                      setFeedback('')
                    }}
                  >
                    <img
                      className="y-image-option__image"
                      src={item.image}
                      alt={item.name}
                    />

                    <span>{item.name}</span>
                  </button>
                )
              })}
            </section>
          </div>

          <div
            className="y-selected-pair"
            aria-live="polite"
          >
            {!selectedLeft && !selectedRight && (
              <span>
                Selecciona dos imágenes
              </span>
            )}

            {selectedLeft && (
              <span>{selectedLeft.name}</span>
            )}

            {selectedLeft && selectedRight && (
              <span className="y-connector">
                y
              </span>
            )}

            {selectedRight && (
              <span>{selectedRight.name}</span>
            )}
          </div>

          {feedback === 'correct' && (
            <p
              className="y-feedback y-feedback--correct"
              role="status"
            >
              ¡Muy bien! Encontraste la pareja.
            </p>
          )}

          {feedback === 'retry' && (
            <p
              className="y-feedback y-feedback--retry"
              role="status"
            >
              Esas imágenes no forman la pareja del libro.
              Inténtalo nuevamente.
            </p>
          )}

          {!feedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={
                !selectedLeft || !selectedRight
              }
              onClick={checkPair}
            >
              Comprobar pareja
            </Button>
          )}

          {feedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryPair}
            >
              Intentar nuevamente
            </Button>
          )}

          {feedback === 'correct' && !isFinished && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={continueActivity}
            >
              Buscar otra pareja
            </Button>
          )}

          {isFinished && (
            <Button
              to="/actividad/y-final"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Ir a la actividad final
            </Button>
          )}
        </Card>
      </section>
    </main>
  )
}

export default ActividadYUnirImagenesPage