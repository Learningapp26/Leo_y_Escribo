import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  gFinalInstructionAudio,
  gFinalSoundMatching,
  gImagePool,
  gPairPool,
  gPairsInstructionAudio,
  gSelectionInstructionAudio,
  gSoundIntro,
} from '../data/gData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'

import '../styles/selection.css'

const PHASES = ['sonido', 'seleccion', 'parejas', 'ultima']

// Fase 2: imágenes que empiezan con /g/
const targetIds = gImagePool
  .filter((item) => item.startsWithG)
  .map((item) => item.id)

// Fase 4: imágenes con el sonido /g/ en la última sílaba
const lastSyllableIds = gFinalSoundMatching.items
  .filter((item) => item.containsG)
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

// Opción con imagen + nombre (mismo patrón de Button que ActividadTrSonidosPage)
function ImageChoice({ item, pressed, stateClass, onClick }) {
  return (
    <Button
      variant="secondary"
      className={['selection-button', stateClass].filter(Boolean).join(' ')}
      aria-pressed={pressed}
      onClick={onClick}
    >
      <span className="app-card__content">
        <img className="selection-image" src={item.image} alt={item.name} />

        <span className="selection-word">{item.name}</span>
      </span>
    </Button>
  )
}

function ActividadGSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('g')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 2: seleccionar las que empiezan con /g/
  const [selectedIds, setSelectedIds] = useState([])
  const [selectionFeedback, setSelectionFeedback] = useState('')

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
      actividad: 'g-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'g', fase: 'seleccion' },
    })
  }

  const retrySelection = () => {
    setSelectedIds([])
    setSelectionFeedback('')
  }

  // Fase 3: parejas — dos imágenes forman pareja si comparten pairId
  const [pickedIds, setPickedIds] = useState([])
  const [matchedIds, setMatchedIds] = useState([])
  const [pairFeedback, setPairFeedback] = useState('')

  // Las parejas ya resueltas desaparecen, pero se siguen viendo mientras se
  // muestra el mensaje de "correcto" (por eso se revisa pickedIds).
  const visiblePairs = gPairPool.filter(
    (item) => !matchedIds.includes(item.id) || pickedIds.includes(item.id),
  )

  const isPairsFinished = matchedIds.length === gPairPool.length

  const pickedPairId = gPairPool.find(
    (item) => item.id === pickedIds[0],
  )?.pairId

  const pickPairCard = (item) => {
    if (pairFeedback) return

    const isPicked = pickedIds.includes(item.id)

    if (!isPicked && pickedIds.length >= 2) return

    playAudio(item.audio)

    setPickedIds(
      isPicked
        ? pickedIds.filter((id) => id !== item.id)
        : [...pickedIds, item.id],
    )
  }

  const checkPair = () => {
    if (pickedIds.length !== 2) return

    const [first, second] = pickedIds.map((id) =>
      gPairPool.find((item) => item.id === id),
    )

    const isCorrect = first.pairId === second.pairId

    if (isCorrect) {
      setMatchedIds((current) => [...current, first.id, second.id])
    }

    setPairFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'g-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'g', fase: 'parejas' },
    })
  }

  const resetPair = () => {
    setPickedIds([])
    setPairFeedback('')
  }

  // Fase 4: seleccionar las que tienen /g/ en la última sílaba
  const [lastSelectedIds, setLastSelectedIds] = useState([])
  const [lastFeedback, setLastFeedback] = useState('')

  const toggleLastSelected = (item) => {
    if (lastFeedback === 'correct') return

    playAudio(item.audio)
    setLastFeedback('')

    setLastSelectedIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkLastSelection = () => {
    const isCorrect =
      lastSelectedIds.length === lastSyllableIds.length &&
      lastSelectedIds.every((id) => lastSyllableIds.includes(id))

    setLastFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'g-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'g', fase: 'ultima' },
    })
  }

  const retryLastSelection = () => {
    setLastSelectedIds([])
    setLastFeedback('')
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="g-sonidos-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/g" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="g-sonidos-title">Reconozcamos el sonido g</h1>
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
              Mira la letra g, escucha su sonido y luego escucha la palabra
              gato.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(gSoundIntro.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            <span className="text-letter">G</span>
            <span className="text-letter">g</span>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(gSoundIntro.soundAudioG)}
          >
            Escuchar el sonido /g/
          </Button>

          <img
            className="selection-image selection-image--featured"
            src={gSoundIntro.mainWord.image}
            alt={gSoundIntro.mainWord.name}
          />

          <span className="text-word">{gSoundIntro.mainWord.name}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(gSoundIntro.mainWord.audio)}
          >
            Escuchar la palabra gato
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
              Toca las imágenes cuyo nombre empieza con el sonido /g/.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(gSelectionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {gImagePool.map((item) => (
              <ImageChoice
                key={item.id}
                item={item}
                pressed={selectedIds.includes(item.id)}
                stateClass={selectionClass(
                  item.id,
                  selectedIds,
                  selectionFeedback,
                )}
                onClick={() => toggleSelected(item)}
              />
            ))}
          </div>

          {selectionFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Todas empiezan con el sonido /g/.
            </p>
          )}

          {selectionFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas imágenes no empiezan con /g/.
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

      {phase === 'parejas' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca dos imágenes cuyo nombre empiece con la misma sílaba. Por
              ejemplo, garra y gaviota empiezan con ga.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(gPairsInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {visiblePairs.map((item) => (
              <ImageChoice
                key={item.id}
                item={item}
                pressed={pickedIds.includes(item.id)}
                stateClass={selectionClass(item.id, pickedIds, pairFeedback)}
                onClick={() => pickPairCard(item)}
              />
            ))}
          </div>

          {pairFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! Las dos empiezan con {pickedPairId}.
            </p>
          )}

          {pairFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esas imágenes no empiezan con la misma sílaba. Prueba con
              otras.
            </p>
          )}

          {!pairFeedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={pickedIds.length !== 2}
              onClick={checkPair}
            >
              Comprobar pareja
            </Button>
          )}

          {pairFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={resetPair}
            >
              Intentar nuevamente
            </Button>
          )}

          {pairFeedback === 'correct' && !isPairsFinished && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={resetPair}
            >
              Buscar otra pareja
            </Button>
          )}

          {pairFeedback === 'correct' && isPairsFinished && (
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

      {phase === 'ultima' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca las imágenes cuyo nombre tiene el sonido /g/ en la última
              sílaba.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(gFinalInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {gFinalSoundMatching.items.map((item) => (
              <ImageChoice
                key={item.id}
                item={item}
                pressed={lastSelectedIds.includes(item.id)}
                stateClass={selectionClass(
                  item.id,
                  lastSelectedIds,
                  lastFeedback,
                )}
                onClick={() => toggleLastSelected(item)}
              />
            ))}
          </div>

          {lastFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Todas tienen el sonido /g/ en la última sílaba.
            </p>
          )}

          {lastFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Escucha en qué sílaba está el sonido /g/.
            </p>
          )}

          {lastFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={lastSelectedIds.length === 0}
              onClick={checkLastSelection}
            >
              Comprobar selección
            </Button>
          )}

          {lastFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryLastSelection}
            >
              Intentar nuevamente
            </Button>
          )}

          {lastFeedback === 'correct' && (
            <Button
              to="/actividad/g-silabas"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Ir a la siguiente actividad
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadGSonidosPage