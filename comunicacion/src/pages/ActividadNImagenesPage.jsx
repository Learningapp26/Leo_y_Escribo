import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  nFinalPairMatching,
  nImagePool,
  nInitialPairMatching,
  nSoundIntro,
} from '../data/nImagenes'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'

const PHASES = ['sonido', 'seleccion', 'parejas-inicio', 'parejas-final']

function getAudioLabel(label, audio) {
  return audio ? label : `${label} pendiente`
}

function playIfAvailable(audio) {
  if (audio) playAudio(audio)
}

const targetIds = nImagePool
  .filter((item) => item.startsWithN)
  .map((item) => item.id)

const finalPairCounts = nFinalPairMatching.items.reduce((counts, item) => {
  counts[item.pairId] = (counts[item.pairId] ?? 0) + 1
  return counts
}, {})

const finalMatchableCount = nFinalPairMatching.items.filter(
  (item) => finalPairCounts[item.pairId] === 2,
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

function ActividadNImagenesPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const [selectedIds, setSelectedIds] = useState([])
  const [selectionFeedback, setSelectionFeedback] = useState('')

  const [firstPick, setFirstPick] = useState(null)
  const [secondPick, setSecondPick] = useState(null)
  const [matchedIds, setMatchedIds] = useState([])
  const [pairFeedback, setPairFeedback] = useState('')

  const [finalFirstPick, setFinalFirstPick] = useState(null)
  const [finalSecondPick, setFinalSecondPick] = useState(null)
  const [matchedFinalIds, setMatchedFinalIds] = useState([])
  const [finalFeedback, setFinalFeedback] = useState('')

  const themeClass = getLessonThemeClass('n')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  const toggleSelected = (item) => {
    if (selectionFeedback === 'correct') return

    playIfAvailable(item.audio)
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

    playIfAvailable(item.audio)

    if (firstPick?.id === item.id) {
      setFirstPick(null)
      return
    }

    if (!firstPick) {
      setFirstPick(item)
      return
    }

    if (!secondPick) setSecondPick(item)
  }

  const checkPair = () => {
    if (!firstPick || !secondPick) return

    const isCorrect = firstPick.startsWithN && secondPick.startsWithN

    if (isCorrect) {
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

  const isFinalMatched = (id) => matchedFinalIds.includes(id)

  const pickFinalCard = (item) => {
    if (finalFeedback === 'retry') return
    if (isFinalMatched(item.id)) return

    playIfAvailable(item.audio)

    if (finalFirstPick?.id === item.id) {
      setFinalFirstPick(null)
      return
    }

    if (!finalFirstPick) {
      setFinalFirstPick(item)
      return
    }

    if (!finalSecondPick) setFinalSecondPick(item)
  }

  const checkFinalPair = () => {
    if (!finalFirstPick || !finalSecondPick) return

    const isCorrect = finalFirstPick.pairId === finalSecondPick.pairId

    if (isCorrect) {
      setMatchedFinalIds((current) => [
        ...current,
        finalFirstPick.id,
        finalSecondPick.id,
      ])
      setFinalFeedback('correct')
      return
    }

    setFinalFeedback('retry')
  }

  const continueFinalPairs = () => {
    setFinalFirstPick(null)
    setFinalSecondPick(null)
    setFinalFeedback('')
  }

  const isFinalFinished = matchedFinalIds.length === finalMatchableCount

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="n-imagenes-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/n" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>

        <h1 id="n-imagenes-title">Reconocemos imágenes</h1>
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
              Escucha el sonido de la letra N y la palabra nariz.
            </p>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={nSoundIntro.mainWord.image}
            alt={nSoundIntro.mainWord.name}
          />

          <span className="text-word">{nSoundIntro.mainWord.name}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            disabled={!nSoundIntro.soundAudio}
            onClick={() => playAudio(nSoundIntro.soundAudio)}
          >
            {getAudioLabel('Escuchar el sonido /n/', nSoundIntro.soundAudio)}
          </Button>

          <div className="selection-instructions">
            <p className="text-instruction">
              Estas palabras también empiezan con el sonido /n/. Tócalas para
              practicarlas.
            </p>
          </div>

          <div className="selection-options">
            {nSoundIntro.exampleWords.map((word) => (
              <button
                className="selection-button"
                type="button"
                key={word.id}
                onClick={() => playIfAvailable(word.audio)}
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
          <p className="text-instruction">
            Toca las imágenes cuyo nombre empieza con el sonido de nariz.
          </p>

          <div className="selection-options">
            {nImagePool.map((item) => (
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
              ¡Muy bien! Todas empiezan con el sonido /n/.
            </p>
          )}

          {selectionFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas imágenes no empiezan con /n/.
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

      {phase === 'parejas-inicio' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Selecciona dos imágenes que empiecen con el mismo sonido.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              disabled={!nInitialPairMatching.instructionAudio}
              onClick={() => playAudio(nInitialPairMatching.instructionAudio)}
            >
              {getAudioLabel('Escuchar instrucción', nInitialPairMatching.instructionAudio)}
            </Button>
          </div>

          <div className="selection-options">
            {nInitialPairMatching.items.map((item) => {
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
              ¡Correcto! Las dos empiezan con /n/.
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
              Siguiente parte
            </Button>
          )}
        </Card>
      )}

      {phase === 'parejas-final' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Selecciona dos imágenes cuyos nombres terminan igual, como
              camión y portón.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              disabled={!nFinalPairMatching.instructionAudio}
              onClick={() => playAudio(nFinalPairMatching.instructionAudio)}
            >
              {getAudioLabel('Escuchar instrucción', nFinalPairMatching.instructionAudio)}
            </Button>
          </div>

          <div className="selection-options selection-options--pairs">
            {nFinalPairMatching.items.map((item) => {
              const selected =
                finalFirstPick?.id === item.id ||
                finalSecondPick?.id === item.id
              const matched = isFinalMatched(item.id)

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
                  onClick={() => pickFinalCard(item)}
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

          {finalFeedback === 'correct' && !isFinalFinished && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! Terminan igual.
            </p>
          )}

          {finalFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esas palabras no terminan igual. Inténtalo de nuevo.
            </p>
          )}

          {!finalFeedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!finalFirstPick || !finalSecondPick}
              onClick={checkFinalPair}
            >
              Comprobar pareja
            </Button>
          )}

          {finalFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setFinalFirstPick(null)
                setFinalSecondPick(null)
                setFinalFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {finalFeedback === 'correct' && !isFinalFinished && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={continueFinalPairs}
            >
              Buscar otra pareja
            </Button>
          )}

          {isFinalFinished && (
            <Button
              to="/actividad/n-silabas"
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

export default ActividadNImagenesPage
