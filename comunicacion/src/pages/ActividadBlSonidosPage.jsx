import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  blContainsInstructionAudio,
  blImagePool,
  blSelectionInstructionAudio,
  blSoundIntro,
  blSoundMatching,
  blTrabalenguas,
  blTrabalenguasInstructionAudio,
} from '../data/blData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'

import '../styles/selection.css'

const PHASES = ['sonido', 'seleccion', 'contiene', 'trabalenguas']

// Fase 2: imágenes que empiezan con /bl/
const targetIds = blImagePool
  .filter((item) => item.startsWithBl)
  .map((item) => item.id)

// Fase 3: imágenes que contienen el sonido /bl/ (no importa la posición)
const containsBlIds = blSoundMatching.items
  .filter((item) => item.containsBl)
  .map((item) => item.id)

function selectionClass(id, selectedIds, feedback) {
  const isSelected = selectedIds.includes(id)

  if (!isSelected || !feedback) {
    return isSelected ? 'selection-button--selected' : ''
  }

  return feedback === 'correct'
    ? 'selection-button--correct'
    : 'selection-button--incorrect'
}

function ActividadBlSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  // Fase 2: seleccionar las que empiezan con /bl/
  const [selectedIds, setSelectedIds] = useState([])
  const [selectionFeedback, setSelectionFeedback] = useState('')

  // Fase 3: seleccionar las que contienen /bl/
  const [containsSelectedIds, setContainsSelectedIds] = useState([])
  const [containsFeedback, setContainsFeedback] = useState('')

  const themeClass = getLessonThemeClass('bl')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 2: selección simple
  const toggleSelected = (item) => {
    if (selectionFeedback === 'correct') return

    playAudio(item.audio)
    setSelectionFeedback('')

    setSelectedIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkSelection = () => {
    const isCorrect =
      selectedIds.length === targetIds.length &&
      selectedIds.every((id) => targetIds.includes(id))

    setSelectionFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'bl-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'bl', fase: 'seleccion' },
    })
  }

  const retrySelection = () => {
    setSelectedIds([])
    setSelectionFeedback('')
  }

  // Fase 3: seleccionar las que contienen /bl/
  const toggleContainsSelected = (item) => {
    if (containsFeedback === 'correct') return

    playAudio(item.audio)
    setContainsFeedback('')

    setContainsSelectedIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkContainsSelection = () => {
    const isCorrect =
      containsSelectedIds.length === containsBlIds.length &&
      containsSelectedIds.every((id) => containsBlIds.includes(id))

    setContainsFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'bl-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'bl', fase: 'contiene' },
    })
  }

  const retryContainsSelection = () => {
    setContainsSelectedIds([])
    setContainsFeedback('')
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="bl-sonidos-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/bl" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="bl-sonidos-title">Reconozcamos el sonido bl</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'sonido' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha los sonidos de las letras b y l, y la palabra blusa.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(blSoundIntro.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(blSoundIntro.soundAudioP)}
          >
            Escuchar el sonido /b/
          </Button>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(blSoundIntro.soundAudioL)}
          >
            Escuchar el sonido /l/
          </Button>

          <img
            className="selection-image selection-image--featured"
            src={blSoundIntro.mainWord.image}
            alt={blSoundIntro.mainWord.name}
          />

          <span className="text-word">{blSoundIntro.mainWord.name}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(blSoundIntro.mainWord.audio)}
          >
            Escuchar el sonido de blusa
          </Button>

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

      {phase === 'seleccion' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca las imágenes cuyo nombre empieza con el sonido /bl/.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(blSelectionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {blImagePool.map((item) => (
              <button
                className={[
                  'selection-button',
                  selectionClass(item.id, selectedIds, selectionFeedback),
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={item.id}
                aria-pressed={selectedIds.includes(item.id)}
                onClick={() => toggleSelected(item)}
              >
                <img
                  className="selection-image"
                  src={item.image}
                  alt={item.name}
                />

                <span className="selection-word">{item.name}</span>
              </button>
            ))}
          </div>

          {selectionFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Todas empiezan con el sonido /bl/.
            </p>
          )}

          {selectionFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas imágenes no empiezan con /bl/.
            </p>
          )}

          {selectionFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={selectedIds.length === 0}
              onClick={checkSelection}
            >
              Comprobar selección
            </Button>
          )}

          {selectionFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retrySelection}
            >
              Intentar nuevamente
            </Button>
          )}

          {selectionFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={goToNextPhase}
            >
              Siguiente parte
            </Button>
          )}
        </Card>
      )}

      {phase === 'contiene' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca las imágenes que llevan el sonido <strong>bl</strong>, no
              importa en qué parte de la palabra esté.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(blContainsInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {blSoundMatching.items.map((item) => (
              <button
                className={[
                  'selection-button',
                  selectionClass(
                    item.id,
                    containsSelectedIds,
                    containsFeedback,
                  ),
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={item.id}
                aria-pressed={containsSelectedIds.includes(item.id)}
                onClick={() => toggleContainsSelected(item)}
              >
                <img
                  className="selection-image"
                  src={item.image}
                  alt={item.name}
                />

                <span className="selection-word">{item.name}</span>
              </button>
            ))}
          </div>

          {containsFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Todas esas imágenes tienen el sonido /bl/.
            </p>
          )}

          {containsFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas imágenes no tienen el sonido /bl/.
            </p>
          )}

          {containsFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={containsSelectedIds.length === 0}
              onClick={checkContainsSelection}
            >
              Comprobar selección
            </Button>
          )}

          {containsFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryContainsSelection}
            >
              Intentar nuevamente
            </Button>
          )}

          {containsFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={goToNextPhase}
            >
              Siguiente parte
            </Button>
          )}
        </Card>
      )}

      {phase === 'trabalenguas' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha este trabalenguas con el sonido /bl/.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(blTrabalenguasInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {blTrabalenguas.map((item) => (
              <div className="selection-button" key={item.id}>
                <img
                  className="selection-image"
                  src={item.image}
                  alt={item.text.join(' ')}
                />

                {item.text.map((line) => (
                  <span className="selection-word" key={line}>
                    {line}
                  </span>
                ))}

                <Button
                  variant="audio"
                  icon={Volume2}
                  onClick={() => playAudio(item.audio)}
                >
                  Escuchar
                </Button>
              </div>
            ))}
          </div>

          <Button
            to="/actividad/bl-silabas"
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
          >
            Ir a la siguiente actividad
          </Button>
        </Card>
      )}
    </main>
  )
}

export default ActividadBlSonidosPage