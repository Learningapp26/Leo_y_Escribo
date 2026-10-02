import { useState } from 'react'
import {
  ArrowRight,
  Check,
  RotateCcw,
} from 'lucide-react'

import AudioPlaceholderButton from '../components/common/AudioPlaceholderButton'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  clContainsSoundItems,
  clInitialSoundItems,
  clSoundIntro,
  clTongueTwister,
} from '../data/clData'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'

const PHASES = [
  'introduccion',
  'diferente',
  'contiene',
  'trabalenguas',
]

const containsClIds =
  clContainsSoundItems
    .filter((item) => item.containsCl)
    .map((item) => item.id)

function ActividadClSonidosPage() {
  const [phaseIndex, setPhaseIndex] =
    useState(0)

  const [differentSelectedId, setDifferentSelectedId] =
    useState(null)

  const [differentFeedback, setDifferentFeedback] =
    useState('')

  const [containsSelectedIds, setContainsSelectedIds] =
    useState([])

  const [containsFeedback, setContainsFeedback] =
    useState('')

  const phase = PHASES[phaseIndex]

  const themeClass =
    getLessonThemeClass('cl')

  function goToNextPhase() {
    setPhaseIndex(
      (current) => current + 1,
    )
  }

  function selectDifferent(item) {
    if (differentFeedback === 'correct') {
      return
    }

    setDifferentSelectedId(item.id)
    setDifferentFeedback('')
  }

  function checkDifferent() {
    const selectedItem =
      clInitialSoundItems.find(
        (item) =>
          item.id === differentSelectedId,
      )

    const isCorrect =
      selectedItem?.startsWithCl === false

    setDifferentFeedback(
      isCorrect ? 'correct' : 'retry',
    )

    registrarProgreso({
      actividad: 'cl-sonidos',
      correcto: isCorrect,
      detalle: {
        leccionId: 'cl',
        fase: 'sonido-diferente',
        respuesta: differentSelectedId,
      },
    })
  }

  function retryDifferent() {
    setDifferentSelectedId(null)
    setDifferentFeedback('')
  }

  function toggleContains(item) {
    if (containsFeedback === 'correct') {
      return
    }

    setContainsFeedback('')

    setContainsSelectedIds((current) =>
      current.includes(item.id)
        ? current.filter(
          (id) => id !== item.id,
        )
        : [
          ...current,
          item.id,
        ],
    )
  }

  function checkContains() {
    const isCorrect =
      containsSelectedIds.length ===
        containsClIds.length &&
      containsSelectedIds.every(
        (id) => containsClIds.includes(id),
      )

    setContainsFeedback(
      isCorrect ? 'correct' : 'retry',
    )

    registrarProgreso({
      actividad: 'cl-sonidos',
      correcto: isCorrect,
      detalle: {
        leccionId: 'cl',
        fase: 'contiene-cl',
        respuestas: containsSelectedIds,
      },
    })
  }

  function retryContains() {
    setContainsSelectedIds([])
    setContainsFeedback('')
  }

  return (
    <main
      className={
        `page selection-page ${themeClass}`
      }
      aria-labelledby="cl-sonidos-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/cl"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad 1
        </span>

        <h1 id="cl-sonidos-title">
          Reconozcamos el sonido CL
        </h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={
          `Parte ${phaseIndex + 1} ` +
          `de ${PHASES.length}`
        }
      />

      {phase === 'introduccion' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Las letras c y l juntas forman
              el sonido /cl/.
            </p>

            <AudioPlaceholderButton>
              Escuchar instrucción
            </AudioPlaceholderButton>
          </div>

          <span className="text-syllable">
            c + l = cl
          </span>

          <img
            className={
              'selection-image ' +
              'selection-image--featured'
            }
            src={clSoundIntro.mainWord.image}
            alt={
              clSoundIntro.mainWord.imageAlt
            }
          />

          <span className="text-word">
            {clSoundIntro.mainWord.name}
          </span>

          <AudioPlaceholderButton
            size="large"
          >
            Escuchar la palabra clavo
          </AudioPlaceholderButton>

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

      {phase === 'diferente' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Selecciona el dibujo cuyo nombre
              comienza con un sonido diferente
              a /cl/.
            </p>

            <AudioPlaceholderButton>
              Escuchar instrucción
            </AudioPlaceholderButton>
          </div>

          <div className="selection-options">
            {clInitialSoundItems.map(
              (item) => {
                const isSelected =
                  differentSelectedId ===
                  item.id

                const answerClass =
                  isSelected &&
                  differentFeedback
                    ? differentFeedback ===
                      'correct'
                      ? 'selection-button--correct'
                      : 'selection-button--incorrect'
                    : isSelected
                      ? 'selection-button--selected'
                      : ''

                return (
                  <button
                    className={[
                      'selection-button',
                      answerClass,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    type="button"
                    key={item.id}
                    aria-pressed={isSelected}
                    onClick={() =>
                      selectDifferent(item)
                    }
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
              },
            )}
          </div>

          {!differentFeedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!differentSelectedId}
              onClick={checkDifferent}
            >
              Comprobar
            </Button>
          )}

          {differentFeedback ===
            'correct' && (
            <>
              <p
                className={
                  'selection-feedback ' +
                  'selection-feedback--correct'
                }
                role="status"
              >
                ¡Muy bien! Camión comienza
                con un sonido diferente.
              </p>

              <Button
                icon={ArrowRight}
                iconPosition="right"
                size="large"
                fullWidth
                onClick={goToNextPhase}
              >
                Continuar
              </Button>
            </>
          )}

          {differentFeedback === 'retry' && (
            <>
              <p
                className={
                  'selection-feedback ' +
                  'selection-feedback--retry'
                }
                role="status"
              >
                Esa palabra comienza con /cl/.
                Inténtalo nuevamente.
              </p>

              <Button
                variant="retry"
                icon={RotateCcw}
                size="large"
                fullWidth
                onClick={retryDifferent}
              >
                Intentar de nuevo
              </Button>
            </>
          )}
        </Card>
      )}

      {phase === 'contiene' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Selecciona los dibujos cuyos
              nombres contienen el sonido /cl/.
            </p>

            <AudioPlaceholderButton>
              Escuchar instrucción
            </AudioPlaceholderButton>
          </div>

          <div className="selection-options">
            {clContainsSoundItems.map(
              (item) => {
                const isSelected =
                  containsSelectedIds.includes(
                    item.id,
                  )

                const answerClass =
                  isSelected &&
                  containsFeedback
                    ? item.containsCl
                      ? 'selection-button--correct'
                      : 'selection-button--incorrect'
                    : isSelected
                      ? 'selection-button--selected'
                      : ''

                return (
                  <button
                    className={[
                      'selection-button',
                      answerClass,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    type="button"
                    key={item.id}
                    aria-pressed={isSelected}
                    onClick={() =>
                      toggleContains(item)
                    }
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
              },
            )}
          </div>

          {!containsFeedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={
                containsSelectedIds.length === 0
              }
              onClick={checkContains}
            >
              Comprobar
            </Button>
          )}

          {containsFeedback ===
            'correct' && (
            <>
              <p
                className={
                  'selection-feedback ' +
                  'selection-feedback--correct'
                }
                role="status"
              >
                ¡Excelente! Chicle y ancla
                contienen el sonido /cl/.
              </p>

              <Button
                icon={ArrowRight}
                iconPosition="right"
                size="large"
                fullWidth
                onClick={goToNextPhase}
              >
                Continuar
              </Button>
            </>
          )}

          {containsFeedback === 'retry' && (
            <>
              <p
                className={
                  'selection-feedback ' +
                  'selection-feedback--retry'
                }
                role="status"
              >
                Revisa las palabras y vuelve
                a intentarlo.
              </p>

              <Button
                variant="retry"
                icon={RotateCcw}
                size="large"
                fullWidth
                onClick={retryContains}
              >
                Intentar de nuevo
              </Button>
            </>
          )}
        </Card>
      )}

      {phase === 'trabalenguas' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Lee el trabalenguas lentamente.
              Luego intenta decirlo un poco
              más rápido.
            </p>

            <AudioPlaceholderButton>
              Escuchar trabalenguas
            </AudioPlaceholderButton>
          </div>

          <img
            className={
              'selection-image ' +
              'selection-image--featured'
            }
            src={clTongueTwister.image}
            alt={clTongueTwister.imageAlt}
          />

          <div className="text-reading">
            {clTongueTwister.lines.map(
              (line) => (
                <p key={line}>{line}</p>
              ),
            )}
          </div>

          <Button
            to="/actividad/cl-silabas"
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
          >
            Continuar con las sílabas
          </Button>
        </Card>
      )}
    </main>
  )
}

export default ActividadClSonidosPage