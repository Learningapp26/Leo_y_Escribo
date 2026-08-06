import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  tJoinInstructionAudio,
  tSyllableJoin,
  tSyllableOptions,
  tSyllableSelection,
  tSyllableSelectionInstructionAudio,
} from '../data/tData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['seleccionar', 'formar']

function ActividadTCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('t')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 1: imagen + audio, elegir la sílaba (banco completo de 5)
  const [wordIndex, setWordIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [selectResult, setSelectResult] = useState('')

  const currentWord = tSyllableSelection[wordIndex]
  const isLastWord = wordIndex === tSyllableSelection.length - 1

  const checkSelection = () => {
    if (!selectedSyllable) return

    const isCorrect = selectedSyllable === currentWord.answer

    setSelectResult(isCorrect ? 'correct' : 'retry')
  }

  const nextWord = () => {
    setSelectedSyllable('')
    setSelectResult('')

    if (isLastWord) {
      goToNextPhase()
      return
    }

    setWordIndex((current) => current + 1)
  }

  // Fase 2: formar 3 palabras distintas con las mismas 3 sílabas
  const [groupIndex, setGroupIndex] = useState(0)
  const [slots, setSlots] = useState([null, null])
  const [foundWords, setFoundWords] = useState([])
  const [joinFeedback, setJoinFeedback] = useState('')

  const joinGroup = tSyllableJoin[groupIndex]
  const isLastGroup = groupIndex === tSyllableJoin.length - 1
  const allWordsFound = foundWords.length === joinGroup.words.length

  const isOptionUsed = (optionIndex) =>
    slots.some((slot) => slot?.optionIndex === optionIndex)

  const pickOption = (syllable, optionIndex) => {
    if (joinFeedback === 'correct') return

    setJoinFeedback('')

    // Si ya está usado en un slot, lo quitamos (toggle)
    if (isOptionUsed(optionIndex)) {
      setSlots((current) =>
        current.map((slot) =>
          slot?.optionIndex === optionIndex ? null : slot,
        ),
      )
      return
    }

    setSlots((current) => {
      const emptyIndex = current.findIndex((slot) => slot === null)

      if (emptyIndex === -1) return current

      const updated = [...current]
      updated[emptyIndex] = { optionIndex, syllable }
      return updated
    })
  }

  const checkJoin = () => {
    if (!slots[0] || !slots[1]) return

    const formedWord = slots[0].syllable + slots[1].syllable

    if (foundWords.includes(formedWord)) {
      setJoinFeedback('repeated')
      return
    }

    if (joinGroup.words.includes(formedWord)) {
      setFoundWords((current) => [...current, formedWord])
      setJoinFeedback('correct')
      return
    }

    setJoinFeedback('retry')
  }

  const retryJoin = () => {
    setSlots([null, null])
    setJoinFeedback('')
  }

  const continueJoin = () => {
    setSlots([null, null])
    setJoinFeedback('')
  }

  const nextGroup = () => {
    setSlots([null, null])
    setFoundWords([])
    setJoinFeedback('')
    setGroupIndex((current) => current + 1)
  }

  return (
    <main className={`page ${themeClass}`} aria-labelledby="t-completar-title">
      <BackButton label="Volver a la lección" to="/lecciones/t" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>

        <h1 id="t-completar-title">Completamos palabras</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'seleccionar' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la palabra y elige la sílaba que escuchaste, sin
              importar en qué parte de la palabra está.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(tSyllableSelectionInstructionAudio)
              }
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="completion-word-image"
            src={currentWord.image}
            alt={currentWord.name}
          />

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(currentWord.wordAudio)}
          >
            Escuchar palabra
          </Button>

          <div className="completion-bank">
            {tSyllableOptions.map((syllable) => (
              <button
                className={[
                  'completion-chip',
                  'text-syllable',
                  selectedSyllable === syllable ? 'completion-active' : '',
                  selectResult === 'correct' && selectedSyllable === syllable
                    ? 'completion-correct'
                    : '',
                  selectResult === 'retry' && selectedSyllable === syllable
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
                  setSelectResult('')
                }}
              >
                {syllable}
              </button>
            ))}
          </div>

          {selectResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! La palabra es {currentWord.name}.
            </p>
          )}

          {selectResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa no es la sílaba correcta. Escucha otra vez.
            </p>
          )}

          {selectResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedSyllable}
              onClick={checkSelection}
            >
              Comprobar
            </Button>
          )}

          {selectResult === 'correct' && (
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

      {phase === 'formar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Con estas 3 sílabas puedes formar 3 palabras distintas.
              Toca dos sílabas para armar una palabra y compruébala.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(tJoinInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <p aria-live="polite" className="text-word">
            {slots[0]?.syllable ?? '__'}
            {slots[1]?.syllable ?? '__'}
          </p>

          <div className="selection-options">
            {joinGroup.options.map((syllable, optionIndex) => {
              const used = isOptionUsed(optionIndex)

              return (
                <button
                  className={[
                    'selection-button',
                    used ? 'selection-button--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={`${syllable}-${optionIndex}`}
                  aria-pressed={used}
                  onClick={() => pickOption(syllable, optionIndex)}
                >
                  <span className="text-syllable">{syllable}</span>
                </button>
              )
            })}
          </div>

          {foundWords.length > 0 && (
            <div className="completion-bank">
              {foundWords.map((word) => (
                <span
                  className="completion-chip text-syllable completion-correct"
                  key={word}
                >
                  {word}
                </span>
              ))}
            </div>
          )}

          {joinFeedback === 'correct' && !allWordsFound && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Encontraste una palabra. Busca otra.
            </p>
          )}

          {joinFeedback === 'correct' && allWordsFound && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Excelente! Encontraste las 3 palabras.
            </p>
          )}

          {joinFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esas sílabas no forman una palabra. Inténtalo de nuevo.
            </p>
          )}

          {joinFeedback === 'repeated' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa palabra ya la encontraste. Busca una diferente.
            </p>
          )}

          {joinFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!slots[0] || !slots[1]}
              onClick={checkJoin}
            >
              Comprobar palabra
            </Button>
          )}

          {(joinFeedback === 'retry' || joinFeedback === 'repeated') && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryJoin}
            >
              Intentar nuevamente
            </Button>
          )}

          {joinFeedback === 'correct' && !allWordsFound && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={continueJoin}
            >
              Buscar otra palabra
            </Button>
          )}

          {joinFeedback === 'correct' && allWordsFound && !isLastGroup && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextGroup}
            >
              Siguiente conjunto de sílabas
            </Button>
          )}

          {joinFeedback === 'correct' && allWordsFound && isLastGroup && (
            <Button
              to="/actividad/t-final"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Ir a la actividad final
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadTCompletarPage