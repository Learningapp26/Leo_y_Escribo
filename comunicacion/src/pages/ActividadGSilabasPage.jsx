import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  gCompletionInstructionAudio,
  gLetterPresentation,
  gSyllableOptions,
  gSyllablePairPool,
  gSyllablePairsInstructionAudio,
  gSyllableSearch,
  gWordCompletion,
} from '../data/gData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['letra', 'buscar', 'completar', 'parejas']
const targetSyllables = gSyllableSearch.targetSyllables

function selectionClass(id, selectedIds, feedback) {
  const isSelected = selectedIds.includes(id)

  if (!isSelected || !feedback) {
    return isSelected ? 'selection-button--selected' : ''
  }

  return feedback === 'correct'
    ? 'selection-button--correct'
    : 'selection-button--incorrect'
}

function PairImageChoice({ item, pressed, stateClass, onClick }) {
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

function ActividadGSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('g')
  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  const [showSpecialSyllables, setShowSpecialSyllables] = useState(false)

  const [searchSelected, setSearchSelected] = useState([])
  const [searchResult, setSearchResult] = useState('')

  const toggleSearchSyllable = (syllable, audio) => {
    if (searchResult === 'correct') return

    playAudio(audio)
    setSearchResult('')
    setSearchSelected((current) =>
      current.includes(syllable)
        ? current.filter((item) => item !== syllable)
        : [...current, syllable],
    )
  }

  const checkSearch = () => {
    const isCorrect =
      searchSelected.length === targetSyllables.length &&
      searchSelected.every((syllable) => targetSyllables.includes(syllable))

    setSearchResult(isCorrect ? 'correct' : 'retry')
    registrarProgreso({
      actividad: 'g-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'g', fase: 'buscar' },
    })
  }

  const retrySearch = () => {
    setSearchSelected([])
    setSearchResult('')
  }

  const [wordIndex, setWordIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [completionResult, setCompletionResult] = useState('')
  const currentWord = gWordCompletion[wordIndex]
  const isLastWord = wordIndex === gWordCompletion.length - 1
  const visiblePattern = currentWord.pattern.replace(
    '___',
    selectedSyllable || '___',
  )

  const checkCompletion = () => {
    if (!selectedSyllable) return

    const isCorrect = selectedSyllable === currentWord.answer
    setCompletionResult(isCorrect ? 'correct' : 'retry')
    registrarProgreso({
      actividad: 'g-silabas',
      correcto: isCorrect,
      detalle: {
        leccionId: 'g',
        fase: 'completar',
        ejercicioId: currentWord.id,
      },
    })
  }

  const nextWord = () => {
    setSelectedSyllable('')
    setCompletionResult('')

    if (isLastWord) {
      goToNextPhase()
      return
    }

    setWordIndex((current) => current + 1)
  }

  const [pickedIds, setPickedIds] = useState([])
  const [matchedIds, setMatchedIds] = useState([])
  const [pairFeedback, setPairFeedback] = useState('')
  const visiblePairs = gSyllablePairPool.filter(
    (item) => !matchedIds.includes(item.id) || pickedIds.includes(item.id),
  )
  const isPairsFinished = matchedIds.length === gSyllablePairPool.length
  const pickedPairId = gSyllablePairPool.find(
    (item) => item.id === pickedIds[0],
  )?.pairId

  const pickPairCard = (item) => {
    if (pairFeedback) return

    const isPicked = pickedIds.includes(item.id)
    if (!isPicked && pickedIds.length >= 2) return

    playAudio(item.audio)
    setPickedIds((current) =>
      isPicked
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkPair = () => {
    if (pickedIds.length !== 2) return

    const [first, second] = pickedIds.map((id) =>
      gSyllablePairPool.find((item) => item.id === id),
    )
    const isCorrect = first.pairId === second.pairId

    if (isCorrect) {
      setMatchedIds((current) => [...current, first.id, second.id])
    }

    setPairFeedback(isCorrect ? 'correct' : 'retry')
    registrarProgreso({
      actividad: 'g-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'g', fase: 'parejas' },
    })
  }

  const resetPair = () => {
    setPickedIds([])
    setPairFeedback('')
  }

  return (
    <main className={`page ${themeClass}`} aria-labelledby="g-silabas-title">
      <BackButton label="Volver a la lección" to="/lecciones/g" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>
        <h1 id="g-silabas-title">Sílabas con G</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'letra' && (
        <Card className="syllables-card">
          <div className="syllables-instructions">
            <p className="text-instruction">
              {showSpecialSyllables
                ? 'Ahora conoce gue y gui. En estas sílabas, la u se escribe pero no suena.'
                : 'Conoce la letra G y sus sílabas ga, go y gu. Toca cada una para escucharla.'}
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(gLetterPresentation.instructionAudio)}
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
            onClick={() => playAudio(gLetterPresentation.soundAudio)}
          >
            Escuchar el sonido de la G
          </Button>

          <div className="syllables-options">
            {(showSpecialSyllables
              ? gLetterPresentation.specialCombinations
              : gLetterPresentation.combinations
            ).map((item) => (
              <button
                className="syllable-button"
                type="button"
                key={item.syllable}
                onClick={() => playAudio(item.audio)}
              >
                {item.syllable}
              </button>
            ))}
          </div>

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            onClick={() => {
              if (showSpecialSyllables) {
                goToNextPhase()
              } else {
                setShowSpecialSyllables(true)
              }
            }}
          >
            {showSpecialSyllables ? 'Continuar' : 'Ver gue y gui'}
          </Button>
        </Card>
      )}

      {phase === 'buscar' && (
        <Card className="syllables-card">
          <div className="syllables-instructions">
            <p className="text-instruction">
              Toca las sílabas con G y escucha cómo suenan.
            </p>
            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(gSyllableSearch.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="syllables-options">
            {gSyllableSearch.options.map((option) => {
              const selected = searchSelected.includes(option.syllable)
              const stateClass =
                searchResult && selected
                  ? searchResult === 'correct'
                    ? 'syllable-button--correct'
                    : 'syllable-button--incorrect'
                  : selected
                    ? 'syllable-button--selected'
                    : ''

              return (
                <button
                  className={['syllable-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={option.syllable}
                  aria-pressed={selected}
                  onClick={() =>
                    toggleSearchSyllable(option.syllable, option.audio)
                  }
                >
                  {option.syllable}
                </button>
              )
            })}
          </div>

          {searchResult === 'correct' && (
            <p
              className="syllables-feedback syllables-feedback--correct"
              role="status"
            >
              ¡Muy bien! Encontraste ga, go, gu, gue y gui.
            </p>
          )}

          {searchResult === 'retry' && (
            <p
              className="syllables-feedback syllables-feedback--retry"
              role="status"
            >
              Revisa otra vez. Algunas sílabas seleccionadas no son con G.
            </p>
          )}

          {searchResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={searchSelected.length === 0}
              onClick={checkSearch}
            >
              Comprobar selección
            </Button>
          )}

          {searchResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retrySearch}
            >
              Intentar nuevamente
            </Button>
          )}

          {searchResult === 'correct' && (
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

      {phase === 'completar' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la palabra y elige la sílaba que falta.
            </p>
            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(gCompletionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="completion-word-image"
            src={currentWord.image}
            alt={currentWord.word}
          />

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(currentWord.audio)}
          >
            Escuchar palabra
          </Button>

          <p className="completion-word-pattern">{visiblePattern}</p>

          <div className="completion-bank">
            {gSyllableOptions.map((syllable) => (
              <button
                className={[
                  'completion-chip',
                  'text-syllable',
                  selectedSyllable === syllable ? 'completion-active' : '',
                  completionResult === 'correct' &&
                  selectedSyllable === syllable
                    ? 'completion-correct'
                    : '',
                  completionResult === 'retry' &&
                  selectedSyllable === syllable
                    ? 'completion-incorrect'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={syllable}
                aria-pressed={selectedSyllable === syllable}
                onClick={() => {
                  setSelectedSyllable(syllable)
                  setCompletionResult('')
                }}
              >
                {syllable}
              </button>
            ))}
          </div>

          {completionResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! La palabra es {currentWord.word}.
            </p>
          )}

          {completionResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa sílaba no completa la palabra. Escucha otra vez.
            </p>
          )}

          {completionResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedSyllable}
              onClick={checkCompletion}
            >
              Comprobar
            </Button>
          )}

          {completionResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextWord}
            >
              {isLastWord ? 'Siguiente parte' : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'parejas' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca dos imágenes cuyos nombres tengan la misma sílaba con G.
              Por ejemplo, guitarra y guinda llevan gui.
            </p>
            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(gSyllablePairsInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {visiblePairs.map((item) => (
              <PairImageChoice
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
              ¡Correcto! Ambas palabras tienen la sílaba {pickedPairId}.
            </p>
          )}

          {pairFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esas palabras no tienen la misma sílaba con G. Prueba con otras.
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
              to="/lecciones/g-completar"
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

export default ActividadGSilabasPage
