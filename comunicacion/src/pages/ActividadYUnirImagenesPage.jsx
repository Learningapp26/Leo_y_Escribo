import ActivityFeedback from '../components/common/ActivityFeedback'
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
    if (feedback || isItemMatched(item.id)) return

    setSelectedLeft(item)
    setFeedback('')
    playAudio(item.audio)
  }

  const selectRight = (item) => {
    if (feedback || isItemMatched(item.id)) return

    setSelectedRight(item)
    setFeedback('')
    playAudio(item.audio)
  }

  const checkPair = () => {
    if (feedback || !selectedLeft || !selectedRight) return

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

    setSelectedLeft(null)
    setSelectedRight(null)
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
      className={`page selection-page y-matching-page ${themeClass}`}
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

        <section className="y-image-group" aria-labelledby="y-primer-grupo">
          <h2 id="y-primer-grupo">Primer grupo</h2>
          <div
            className="selection-options"
          >
            {leftOptions.map((item) => {
              const selected =
                selectedLeft?.id === item.id

              const matched = isItemMatched(item.id)

              return (
                <button
                  className={[
                    'selection-button',
                    selected && !matched
                      ? 'selection-button--selected'
                      : '',
                    matched
                      ? 'y-pair--matched'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={item.id}
                  disabled={matched || Boolean(feedback)}
                  aria-pressed={selected && !matched}
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
                  {matched && <Check aria-label="Pareja encontrada" />}
                </button>
              )
            })}
          </div>
        </section>

        <section className="y-image-group" aria-labelledby="y-segundo-grupo">
          <h2 id="y-segundo-grupo">Segundo grupo</h2>
          <div
            className="selection-options"
          >
            {rightOptions.map((item) => {
              const selected =
                selectedRight?.id === item.id

              const matched = isItemMatched(item.id)

              return (
                <button
                  className={[
                    'selection-button',
                    selected && !matched
                      ? 'selection-button--selected'
                      : '',
                    matched
                      ? 'y-pair--matched'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={item.id}
                  disabled={matched || Boolean(feedback)}
                  aria-pressed={selected && !matched}
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
                  {matched && <Check aria-label="Pareja encontrada" />}
                </button>
              )
            })}
          </div>
        </section>

        <div aria-live="polite">
          {(selectedLeft || selectedRight) && (
            <p className="text-sentence">
              {selectedLeft?.name}
              {selectedLeft && selectedRight && <strong> y </strong>}
              {selectedRight?.name}
            </p>
          )}
        </div>

        {feedback === 'correct' && (
          <ActivityFeedback correct message={<>
            ¡Muy bien! Encontraste la pareja.
          </>} />
        )}

        {feedback === 'retry' && (
          <ActivityFeedback correct={false} message={<>
            Esas imágenes no forman una pareja. Escucha de
            nuevo e inténtalo otra vez.
          </>} />
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
            Volver a intentar
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
