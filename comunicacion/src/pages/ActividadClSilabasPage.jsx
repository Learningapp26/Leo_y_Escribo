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
  clExampleWords,
  clSyllables,
  clWordRecognition,
} from '../data/clData'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = [
  'silabas',
  'ejemplos',
  'palabras',
]

const targetWordIds =
  clWordRecognition
    .filter((item) => item.containsCl)
    .map((item) => item.id)

function ActividadClSilabasPage() {
  const [phaseIndex, setPhaseIndex] =
    useState(0)

  const [selectedIds, setSelectedIds] =
    useState([])

  const [feedback, setFeedback] =
    useState('')

  const phase = PHASES[phaseIndex]

  const themeClass =
    getLessonThemeClass('cl')

  function goToNextPhase() {
    setPhaseIndex(
      (current) => current + 1,
    )
  }

  function toggleWord(item) {
    if (feedback === 'correct') return

    setFeedback('')

    setSelectedIds((current) =>
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

  function checkWords() {
    const hasAllCorrectWords =
      targetWordIds.every(
        (id) => selectedIds.includes(id),
      )

    const hasOnlyCorrectWords =
      selectedIds.every(
        (id) => targetWordIds.includes(id),
      )

    const isCorrect =
      selectedIds.length ===
        targetWordIds.length &&
      hasAllCorrectWords &&
      hasOnlyCorrectWords

    setFeedback(
      isCorrect ? 'correct' : 'retry',
    )

    registrarProgreso({
      actividad: 'cl-silabas',
      correcto: isCorrect,
      detalle: {
        leccionId: 'cl',
        fase: 'reconocer-palabras',
        respuestas: selectedIds,
      },
    })
  }

  function retryWords() {
    setSelectedIds([])
    setFeedback('')
  }

  return (
    <main
      className={
        `page selection-page ${themeClass}`
      }
      aria-labelledby="cl-silabas-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/cl"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad 2
        </span>

        <h1 id="cl-silabas-title">
          Sílabas con la combinación CL
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

      {phase === 'silabas' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Observa cómo se combina cl con
              cada una de las vocales.
            </p>

            <AudioPlaceholderButton>
              Escuchar las sílabas
            </AudioPlaceholderButton>
          </div>

          <div
            className="completion-bank"
            aria-label="Sílabas con cl"
          >
            {clSyllables.map(
              (syllable) => (
                <span
                  className="completion-chip"
                  key={syllable}
                >
                  <span className="text-syllable">
                    {syllable}
                  </span>
                </span>
              ),
            )}
          </div>

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

      {phase === 'ejemplos' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Observa las imágenes y lee
              las palabras.
            </p>

            <AudioPlaceholderButton>
              Escuchar las palabras
            </AudioPlaceholderButton>
          </div>

          <div className="selection-options">
            {clExampleWords.map(
              (item) => (
                <article
                  className="selection-button"
                  key={item.id}
                >
                  <img
                    className="selection-image"
                    src={item.image}
                    alt={item.name}
                  />

                  <span className="selection-word">
                    {item.name}
                  </span>
                </article>
              ),
            )}
          </div>

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

      {phase === 'palabras' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Selecciona únicamente las
              palabras que contienen la
              combinación cl.
            </p>

            <AudioPlaceholderButton>
              Escuchar instrucción
            </AudioPlaceholderButton>
          </div>

          <div className="selection-options">
            {clWordRecognition.map(
              (item) => {
                const isSelected =
                  selectedIds.includes(
                    item.id,
                  )

                const answerClass =
                  isSelected && feedback
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
                      toggleWord(item)
                    }
                  >
                    <span className="selection-word">
                      {item.word}
                    </span>
                  </button>
                )
              },
            )}
          </div>

          {!feedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={
                selectedIds.length === 0
              }
              onClick={checkWords}
            >
              Comprobar
            </Button>
          )}

          {feedback === 'correct' && (
            <>
              <p
                className={
                  'selection-feedback ' +
                  'selection-feedback--correct'
                }
                role="status"
              >
                ¡Excelente! Encontraste todas
                las palabras con cl.
              </p>

              <Button
                to="/actividad/cl-final"
                icon={ArrowRight}
                iconPosition="right"
                size="large"
                fullWidth
              >
                Continuar con la actividad final
              </Button>
            </>
          )}

          {feedback === 'retry' && (
            <>
              <p
                className={
                  'selection-feedback ' +
                  'selection-feedback--retry'
                }
                role="status"
              >
                Revisa las palabras seleccionadas
                y vuelve a intentarlo.
              </p>

              <Button
                variant="retry"
                icon={RotateCcw}
                size="large"
                fullWidth
                onClick={retryWords}
              >
                Intentar de nuevo
              </Button>
            </>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadClSilabasPage