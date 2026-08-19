import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  mImagePool,
  mPairsInstructionAudio,
  mSelectionInstructionAudio,
  mSoundIntro,
  mSoundMatching,
} from '../data/mData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'

import '../styles/selection.css'

const PHASES = ['sonido', 'seleccion', 'parejas', 'contiene']

// Fase 2 y 3: imágenes que empiezan con /m/
const targetIds = mImagePool
  .filter((item) => item.startsWithM)
  .map((item) => item.id)

// Fase 4: figuras que contienen el sonido /m/ (no importa la posición)
const containsMIds = mSoundMatching.items
  .filter((item) => item.containsM)
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

function ActividadMSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  // Fase 2: seleccionar las que empiezan con /m/
  const [selectedIds, setSelectedIds] = useState([])
  const [selectionFeedback, setSelectionFeedback] = useState('')

  // Fase 3: parejas que empiezan con /m/
  const [firstPick, setFirstPick] = useState(null)
  const [secondPick, setSecondPick] = useState(null)
  const [matchedIds, setMatchedIds] = useState([])
  const [pairFeedback, setPairFeedback] = useState('')

  // Fase 4: seleccionar las que contienen /m/
  const [containsSelectedIds, setContainsSelectedIds] = useState([])
  const [containsFeedback, setContainsFeedback] = useState('')

  const themeClass = getLessonThemeClass('m')

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
      actividad: 'm-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'm', fase: 'seleccion' },
    })
  }

  const retrySelection = () => {
    setSelectedIds([])
    setSelectionFeedback('')
  }

  // Fase 3: parejas que empiezan con /m/
  const isMatched = (id) => matchedIds.includes(id)

  const pickCard = (item) => {
    if (pairFeedback === 'retry') return
    if (isMatched(item.id)) return

    playAudio(item.audio)

    if (firstPick?.id === item.id) {
      setFirstPick(null)
      return
    }

    if (!firstPick) {
      setFirstPick(item)
      return
    }

    if (!secondPick) {
      setSecondPick(item)
    }
  }

  const checkPair = () => {
    if (!firstPick || !secondPick) return

    const isCorrect = firstPick.startsWithM && secondPick.startsWithM

    registrarProgreso({
      actividad: 'm-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'm', fase: 'parejas' },
    })

    if (isCorrect) {
      playAudio(secondPick.audio)
      setMatchedIds((current) => [...current, firstPick.id, secondPick.id])
      setPairFeedback('correct')
      return
    }

    setPairFeedback('retry')
  }

  const continuePairs = () => {
    setFirstPick(null)
    setSecondPick(null)
    setPairFeedback('')
  }

  const isPairsFinished = matchedIds.length === targetIds.length

  // Fase 4: seleccionar las que contienen /m/
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
      containsSelectedIds.length === containsMIds.length &&
      containsSelectedIds.every((id) => containsMIds.includes(id))

    setContainsFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'm-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'm', fase: 'contiene' },
    })
  }

  const retryContainsSelection = () => {
    setContainsSelectedIds([])
    setContainsFeedback('')
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="m-sonidos-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/m" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="m-sonidos-title">Reconozcamos el sonido m</h1>
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
              Escucha el sonido de la letra m y la palabra mamá.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(mSoundIntro.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(mSoundIntro.soundAudio)}
          >
            Escuchar el sonido /m/
          </Button>

          <img
            className="selection-image selection-image--featured"
            src={mSoundIntro.mainWord.image}
            alt={mSoundIntro.mainWord.name}
          />

          <span className="text-word">{mSoundIntro.mainWord.name}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(mSoundIntro.mainWord.audio)}
          >
            Escuchar el sonido de mamá
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
              Toca las imágenes cuyo nombre empieza con el sonido de mamá.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(mSelectionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {mImagePool.map((item) => (
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
              ¡Muy bien! Todas empiezan con el sonido /m/.
            </p>
          )}

          {selectionFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas imágenes no empiezan con /m/.
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
              Selecciona dos imágenes que empiecen con el mismo sonido.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(mPairsInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {mImagePool.map((item) => {
              const selected =
                firstPick?.id === item.id || secondPick?.id === item.id

              const matched = isMatched(item.id)

              return (
                <button
                  className={[
                    'selection-button',
                    selected ? 'selection-button--selected' : '',
                    matched ? 'selection-button--correct' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={item.id}
                  disabled={matched}
                  aria-pressed={selected}
                  onClick={() => pickCard(item)}
                >
                  <img
                    className="selection-image"
                    src={item.image}
                    alt={item.name}
                  />

                  <span className="selection-word">{item.name}</span>
                </button>
              )
            })}
          </div>

          {pairFeedback === 'correct' && !isPairsFinished && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! Las dos empiezan con /m/.
            </p>
          )}

          {pairFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esas imágenes no empiezan con el mismo sonido.
            </p>
          )}

          {!pairFeedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!firstPick || !secondPick}
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
              onClick={() => {
                setFirstPick(null)
                setSecondPick(null)
                setPairFeedback('')
              }}
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
              onClick={continuePairs}
            >
              Buscar otra pareja
            </Button>
          )}

          {isPairsFinished && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={goToNextPhase}
            >
              Ir a la siguiente actividad
            </Button>
          )}
        </Card>
      )}

      {phase === 'contiene' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca las figuras que lleven el sonido de la <strong>m</strong>,
              no importa en qué parte del nombre esté el sonido.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(mSoundMatching.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options selection-options--pairs">
            {mSoundMatching.items.map((item) => (
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
              ¡Muy bien! Todas esas figuras tienen el sonido /m/.
            </p>
          )}

          {containsFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas figuras no tienen el sonido /m/.
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
              to="/actividad/m-silabas"
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

export default ActividadMSonidosPage