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
import { registrarProgreso } from '../lib/progreso'

const leftOptions = page27Pairs.map(
  (pair) => pair.first,
)

const rightOptions = [
  page27Pairs[1].second,
  page27Pairs[2].second,
  page27Pairs[0].second,
]

function ActividadYUnirImagenesPage() {
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState([])
  const [feedback, setFeedback] = useState('')

  const themeClass = getLessonThemeClass('y-conjuncion')

  const isFinished =
    matchedPairs.length === page27Pairs.length

  const isItemMatched = (itemId) =>
    matchedPairs.some((pairId) => {
      const pair = page27Pairs.find(
        (currentPair) => currentPair.id === pairId,
      )

      return (
        pair?.first.id === itemId ||
        pair?.second.id === itemId
      )
    })

  const selectLeft = (item) => {
    if (isItemMatched(item.id)) return

    setSelectedLeft(item)
    setFeedback('')
    playAudio(item.audio)
  }

  const selectRight = (item) => {
    if (isItemMatched(item.id)) return

    setSelectedRight(item)
    setFeedback('')
    playAudio(item.audio)
  }

  const checkPair = () => {
    if (!selectedLeft || !selectedRight) return

    const matchingPair = page27Pairs.find(
      (pair) =>
        pair.first.id === selectedLeft.id &&
        pair.second.id === selectedRight.id,
    )

    if (!matchingPair) {
      setFeedback('retry')

      registrarProgreso({
        actividad: 'y-unir-imagenes',
        correcto: false,
        detalle: { leccionId: 'y-conjuncion' },
      })
      return
    }

    setMatchedPairs((current) => [
      ...current,
      matchingPair.id,
    ])

    setFeedback('correct')
    playAudio(matchingPair.phraseAudio)

    registrarProgreso({
      actividad: 'y-unir-imagenes',
      correcto: true,
      detalle: { leccionId: 'y-conjuncion', ejercicioId: matchingPair.id },
    })
  }

  const clearSelection = () => {
    setSelectedLeft(null)
    setSelectedRight(null)
    setFeedback('')
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="y-match-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/y-conjuncion"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad 2
        </span>

        <h1 id="y-match-title">
          Unimos imágenes
        </h1>
      </header>

      <ProgressBar
        value={matchedPairs.length}
        max={page27Pairs.length}
        label={`Parejas encontradas: ${matchedPairs.length} de ${page27Pairs.length}`}
      />

      <Card className="selection-card">
        <div className="selection-instructions">
          <p className="text-instruction">
            Selecciona una imagen de cada grupo para formar
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
        </div>

        <p className="text-instruction">
          Primero selecciona una imagen de este grupo.
        </p>

        <div
          className="selection-options"
          aria-label="Primer grupo de imágenes"
        >
          {leftOptions.map((item) => {
            const selected =
              selectedLeft?.id === item.id

            const matched = isItemMatched(item.id)

            return (
              <button
                className={[
                  'selection-button',
                  selected
                    ? 'selection-button--selected'
                    : '',
                  matched
                    ? 'selection-button--correct'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={item.id}
                disabled={matched}
                aria-pressed={selected}
                onClick={() => selectLeft(item)}
              >
                <img
                  className="selection-image"
                  src={item.image}
                  alt={item.name}
                />

                <span className="selection-word">
                  {item.name}
                </span>
              </button>
            )
          })}
        </div>

        <p className="text-instruction">
          Ahora selecciona la imagen que completa la pareja.
        </p>

        <div
          className="selection-options"
          aria-label="Segundo grupo de imágenes"
        >
          {rightOptions.map((item) => {
            const selected =
              selectedRight?.id === item.id

            const matched = isItemMatched(item.id)

            return (
              <button
                className={[
                  'selection-button',
                  selected
                    ? 'selection-button--selected'
                    : '',
                  matched
                    ? 'selection-button--correct'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={item.id}
                disabled={matched}
                aria-pressed={selected}
                onClick={() => selectRight(item)}
              >
                <img
                  className="selection-image"
                  src={item.image}
                  alt={item.name}
                />

                <span className="selection-word">
                  {item.name}
                </span>
              </button>
            )
          })}
        </div>

        <div
          className="completion-target"
          aria-live="polite"
        >
          {!selectedLeft && !selectedRight && (
            <p className="text-reading">
              Selecciona dos imágenes.
            </p>
          )}

          {selectedLeft && (
            <span className="completion-chip">
              {selectedLeft.name}
            </span>
          )}

          {selectedLeft && selectedRight && (
            <span className="completion-chip">
              y
            </span>
          )}

          {selectedRight && (
            <span className="completion-chip">
              {selectedRight.name}
            </span>
          )}
        </div>

        {feedback === 'correct' && (
          <p
            className="selection-feedback selection-feedback--correct"
            role="status"
          >
            ¡Muy bien! Encontraste la pareja.
          </p>
        )}

        {feedback === 'retry' && (
          <p
            className="selection-feedback selection-feedback--retry"
            role="status"
          >
            Esas imágenes no forman una pareja. Escucha de
            nuevo e inténtalo otra vez.
          </p>
        )}

        {!feedback && (
          <Button
            icon={Check}
            size="large"
            fullWidth
            disabled={!selectedLeft || !selectedRight}
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
            onClick={clearSelection}
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
            onClick={clearSelection}
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
    </main>
  )
}

export default ActividadYUnirImagenesPage