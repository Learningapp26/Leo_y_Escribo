import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  plContainsInstructionAudio,
  plImagePool,
  plSelectionInstructionAudio,
  plSoundIntro,
  plSoundMatching,
  plTrabalenguas,
  plTrabalenguasInstructionAudio,
} from '../data/plData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'

import '../styles/selection.css'

const PHASES = ['sonido', 'seleccion', 'contiene', 'trabalenguas']

// Fase 2: imágenes que empiezan con /pl/
const targetIds = plImagePool
  .filter((item) => item.startsWithPl)
  .map((item) => item.id)

// Fase 3: imágenes que contienen el sonido /pl/ (no importa la posición)
const containsPlIds = plSoundMatching.items
  .filter((item) => item.containsPl)
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

function ActividadPlSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  // Fase 2: seleccionar las que empiezan con /pl/
  const [selectedIds, setSelectedIds] = useState([])
  const [selectionFeedback, setSelectionFeedback] = useState('')

  // Fase 3: seleccionar las que contienen /pl/
  const [containsSelectedIds, setContainsSelectedIds] = useState([])
  const [containsFeedback, setContainsFeedback] = useState('')

  const themeClass = getLessonThemeClass('pl')

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
      actividad: 'pl-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'pl', fase: 'seleccion' },
    })
  }

  const retrySelection = () => {
    setSelectedIds([])
    setSelectionFeedback('')
  }

  // Fase 3: seleccionar las que contienen /pl/
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
      containsSelectedIds.length === containsPlIds.length &&
      containsSelectedIds.every((id) => containsPlIds.includes(id))

    setContainsFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'pl-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'pl', fase: 'contiene' },
    })
  }

  const retryContainsSelection = () => {
    setContainsSelectedIds([])
    setContainsFeedback('')
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="pl-sonidos-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/pl" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="pl-sonidos-title">Reconozcamos el sonido pl</h1>
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
              Escucha los sonidos de las letras p y l, y la palabra pluma.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(plSoundIntro.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(plSoundIntro.soundAudioP)}
          >
            Escuchar el sonido /p/
          </Button>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(plSoundIntro.soundAudioL)}
          >
            Escuchar el sonido /l/
          </Button>

          <img
            className="selection-image selection-image--featured"
            src={plSoundIntro.mainWord.image}
            alt={plSoundIntro.mainWord.name}
          />

          <span className="text-word">{plSoundIntro.mainWord.name}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(plSoundIntro.mainWord.audio)}
          >
            Escuchar el sonido de pluma
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
              Toca las imágenes cuyo nombre empieza con el sonido /pl/.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(plSelectionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {plImagePool.map((item) => (
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
              ¡Muy bien! Todas empiezan con el sonido /pl/.
            </p>
          )}

          {selectionFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas imágenes no empiezan con /pl/.
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
              Toca las imágenes que llevan el sonido <strong>pl</strong>, no
              importa en qué parte de la palabra esté.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(plContainsInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {plSoundMatching.items.map((item) => (
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
              ¡Muy bien! Todas esas imágenes tienen el sonido /pl/.
            </p>
          )}

          {containsFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas imágenes no tienen el sonido /pl/.
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
              Escucha estos trabalenguas con el sonido /pl/.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(plTrabalenguasInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {plTrabalenguas.map((item) => (
              <div className="selection-button" key={item.id}>
                <img
                  className="selection-image"
                  src={item.image}
                  alt={item.text}
                />

                <span className="selection-word">{item.text}</span>

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
            to="/actividad/pl-silabas"
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

export default ActividadPlSonidosPage