import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  lImagePool,
  lPairsInstructionAudio,
  lSelectionInstructionAudio,
  lSoundIntro,
  lSoundPairMatching,
} from '../data/lImagenes'
import { playAudio } from '../lib/audioPlayer'

const PHASES = ['sonido', 'seleccion', 'parejas', 'unir-sonidos']

const targetIds = lImagePool
  .filter((item) => item.startsWithL)
  .map((item) => item.id)

const pairCounts = lSoundPairMatching.items.reduce((counts, item) => {
  counts[item.pairId] = (counts[item.pairId] ?? 0) + 1
  return counts
}, {})

const matchableSoundCount = lSoundPairMatching.items.filter(
  (item) => pairCounts[item.pairId] === 2,
).length

function selectionClass(id, selectedIds, feedback) {
  const isSelected = selectedIds.includes(id)

  if (!isSelected || !feedback) {
    return isSelected ? 'selection-button--selected' : ''
  }

  return feedback === 'correct'
    ? 'selection-button--correct'
    : 'selection-button--incorrect'
}

function ActividadLImagenesPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const [selectedIds, setSelectedIds] = useState([])
  const [selectionFeedback, setSelectionFeedback] = useState('')

  const [firstPick, setFirstPick] = useState(null)
  const [secondPick, setSecondPick] = useState(null)
  const [matchedIds, setMatchedIds] = useState([])
  const [pairFeedback, setPairFeedback] = useState('')

  const [soundFirstPick, setSoundFirstPick] = useState(null)
  const [soundSecondPick, setSoundSecondPick] = useState(null)
  const [matchedSoundIds, setMatchedSoundIds] = useState([])
  const [soundFeedback, setSoundFeedback] = useState('')

  const themeClass = getLessonThemeClass('l')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

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

  const isMatched = (id) => matchedIds.includes(id)

  const pickCard = (item) => {
    if (pairFeedback === 'retry') return
    if (isMatched(item.id)) return

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

    const isCorrect = firstPick.startsWithL && secondPick.startsWithL

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

  const isSoundMatched = (id) => matchedSoundIds.includes(id)

  const pickSoundCard = (item) => {
    if (soundFeedback === 'retry') return
    if (isSoundMatched(item.id)) return

    playAudio(item.audio)

    if (soundFirstPick?.id === item.id) {
      setSoundFirstPick(null)
      return
    }

    if (!soundFirstPick) {
      setSoundFirstPick(item)
      return
    }

    if (!soundSecondPick) {
      setSoundSecondPick(item)
    }
  }

  const checkSoundPair = () => {
    if (!soundFirstPick || !soundSecondPick) return

    const isCorrect = soundFirstPick.pairId === soundSecondPick.pairId

    if (isCorrect) {
      setMatchedSoundIds((current) => [
        ...current,
        soundFirstPick.id,
        soundSecondPick.id,
      ])
      setSoundFeedback('correct')
      return
    }

    setSoundFeedback('retry')
  }

  const continueSoundPairs = () => {
    setSoundFirstPick(null)
    setSoundSecondPick(null)
    setSoundFeedback('')
  }

  const isSoundMatchingFinished = matchedSoundIds.length === matchableSoundCount

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="l-imagenes-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/l" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="l-imagenes-title">Reconocemos imágenes</h1>
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
              Escucha el sonido de la letra L y la palabra luna.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(lSoundIntro.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={lSoundIntro.mainWord.image}
            alt={lSoundIntro.mainWord.name}
          />

          <span className="text-word">{lSoundIntro.mainWord.name}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(lSoundIntro.soundAudio)}
          >
            Escuchar el sonido /l/
          </Button>

          <div className="selection-instructions">
            <p className="text-instruction">
              Estas palabras también empiezan con el sonido /l/. Tócalas
              para escucharlas.
            </p>
          </div>

          <div className="selection-options">
            {lSoundIntro.exampleWords.map((word) => (
              <button
                className="selection-button"
                type="button"
                key={word.id}
                onClick={() => playAudio(word.audio)}
              >
                <img
                  className="selection-image"
                  src={word.image}
                  alt={word.name}
                />

                <span className="selection-word">{word.name}</span>
              </button>
            ))}
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

      {phase === 'seleccion' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca las imágenes cuyo nombre empieza con el sonido de luna.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(lSelectionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {lImagePool.map((item) => (
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
              ¡Muy bien! Todas empiezan con el sonido /l/.
            </p>
          )}

          {selectionFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas imágenes no empiezan con /l/.
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
              onClick={() => playAudio(lPairsInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {lImagePool.map((item) => {
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
              ¡Correcto! Las dos empiezan con /l/.
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

      {phase === 'unir-sonidos' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca dos figuras que tengan los primeros dos sonidos iguales,
              como <strong>luna</strong> y <strong>lupa</strong>. Algunas
              figuras no tienen pareja: no te preocupes si te confundes,
              vuelve a intentarlo.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(lSoundPairMatching.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options selection-options--pairs">
            {lSoundPairMatching.items.map((item) => {
              const selected =
                soundFirstPick?.id === item.id ||
                soundSecondPick?.id === item.id

              const matched = isSoundMatched(item.id)

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
                  onClick={() => pickSoundCard(item)}
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

          {soundFeedback === 'correct' && !isSoundMatchingFinished && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! Tienen los mismos primeros sonidos.
            </p>
          )}

          {soundFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esas figuras no tienen los mismos primeros sonidos. Vuelve a
              intentarlo.
            </p>
          )}

          {!soundFeedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!soundFirstPick || !soundSecondPick}
              onClick={checkSoundPair}
            >
              Comprobar pareja
            </Button>
          )}

          {soundFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSoundFirstPick(null)
                setSoundSecondPick(null)
                setSoundFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {soundFeedback === 'correct' && !isSoundMatchingFinished && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={continueSoundPairs}
            >
              Buscar otra pareja
            </Button>
          )}

          {isSoundMatchingFinished && (
            <Button
              to="/actividad/l-silabas"
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

export default ActividadLImagenesPage
