import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  tImagePool,
  tOddOneOut,
  tPairsInstructionAudio,
  tSelectionInstructionAudio,
  tSoundIntro,
} from '../data/tData'
import { playAudio } from '../lib/audioPlayer'

import '../styles/selection.css'

const PHASES = ['sonido', 'seleccion', 'parejas', 'diferente']

// Fase 2 y 3: imágenes que empiezan con /t/
const targetIds = tImagePool
  .filter((item) => item.startsWithT)
  .map((item) => item.id)

// Fase 4: figuras que NO empiezan con /t/, agrupadas de 3 en 3
const ODD_GROUP_SIZE = 3

const oddGroups = []
for (let i = 0; i < tOddOneOut.items.length; i += ODD_GROUP_SIZE) {
  oddGroups.push(tOddOneOut.items.slice(i, i + ODD_GROUP_SIZE))
}

function selectionClass(id, selectedIds, feedback) {
  const isSelected = selectedIds.includes(id)

  if (!isSelected || !feedback) {
    return isSelected ? 'selection-button--selected' : ''
  }

  return feedback === 'correct'
    ? 'selection-button--correct'
    : 'selection-button--incorrect'
}

function ActividadTSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  // Fase 2: seleccionar las que empiezan con /t/
  const [selectedIds, setSelectedIds] = useState([])
  const [selectionFeedback, setSelectionFeedback] = useState('')

  // Fase 3: parejas que empiezan con /t/
  const [firstPick, setFirstPick] = useState(null)
  const [secondPick, setSecondPick] = useState(null)
  const [matchedIds, setMatchedIds] = useState([])
  const [pairFeedback, setPairFeedback] = useState('')

  // Fase 4: seleccionar las que NO empiezan con /t/, de 3 en 3
  const [oddGroupIndex, setOddGroupIndex] = useState(0)
  const [oddSelectedIds, setOddSelectedIds] = useState([])
  const [oddFeedback, setOddFeedback] = useState('')

  const themeClass = getLessonThemeClass('t')

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
  }

  const retrySelection = () => {
    setSelectedIds([])
    setSelectionFeedback('')
  }

  // Fase 3: parejas que empiezan con /t/
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

    const isCorrect = firstPick.startsWithT && secondPick.startsWithT

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

  // Fase 4: seleccionar las que NO empiezan con /t/ (grupo actual)
  const currentOddGroup = oddGroups[oddGroupIndex]
  const isLastOddGroup = oddGroupIndex === oddGroups.length - 1

  const currentOddTargetIds = currentOddGroup
    .filter((item) => !item.startsWithT)
    .map((item) => item.id)

  const toggleOddSelected = (item) => {
    if (oddFeedback === 'correct') return

    playAudio(item.audio)
    setOddFeedback('')

    setOddSelectedIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkOddSelection = () => {
    const isCorrect =
      oddSelectedIds.length === currentOddTargetIds.length &&
      oddSelectedIds.every((id) => currentOddTargetIds.includes(id))

    setOddFeedback(isCorrect ? 'correct' : 'retry')
  }

  const retryOddSelection = () => {
    setOddSelectedIds([])
    setOddFeedback('')
  }

  const nextOddGroup = () => {
    setOddSelectedIds([])
    setOddFeedback('')
    setOddGroupIndex((current) => current + 1)
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="t-sonidos-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/t" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="t-sonidos-title">Reconozcamos el sonido de la letra t</h1>
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
              Escucha el sonido de la letra t y la palabra tamal.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(tSoundIntro.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(tSoundIntro.soundAudio)}
          >
            Escuchar el sonido /t/
          </Button>

          <img
            className="selection-image selection-image--featured"
            src={tSoundIntro.mainWord.image}
            alt={tSoundIntro.mainWord.name}
          />

          <span className="text-word">{tSoundIntro.mainWord.name}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(tSoundIntro.mainWord.audio)}
          >
            Escuchar el sonido de tamal
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
              Toca las imágenes cuyo nombre empieza con el sonido de tamal.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(tSelectionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {tImagePool.map((item) => (
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
              ¡Muy bien! Todas empiezan con el sonido /t/.
            </p>
          )}

          {selectionFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas imágenes no empiezan con /t/.
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
              onClick={() => playAudio(tPairsInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {tImagePool.map((item) => {
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
              ¡Correcto! Las dos empiezan con /t/.
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

      {phase === 'diferente' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha las palabras y luego selecciona la que termina de forma diferente
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(tOddOneOut.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options selection-options--trio">
            {currentOddGroup.map((item) => (
              <button
                className={[
                  'selection-button',
                  selectionClass(item.id, oddSelectedIds, oddFeedback),
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={item.id}
                aria-pressed={oddSelectedIds.includes(item.id)}
                onClick={() => toggleOddSelected(item)}
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

          {oddFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Esa es la que termina de forma diferente.
            </p>
          )}

          {oddFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Alguna no termina de forma diferente.
            </p>
          )}

          {oddFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={oddSelectedIds.length === 0}
              onClick={checkOddSelection}
            >
              Comprobar selección
            </Button>
          )}

          {oddFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryOddSelection}
            >
              Intentar nuevamente
            </Button>
          )}

          {oddFeedback === 'correct' && !isLastOddGroup && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextOddGroup}
            >
              Siguiente conjunto
            </Button>
          )}

          {oddFeedback === 'correct' && isLastOddGroup && (
            <Button
              to="/actividad/t-silabas"
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

export default ActividadTSonidosPage