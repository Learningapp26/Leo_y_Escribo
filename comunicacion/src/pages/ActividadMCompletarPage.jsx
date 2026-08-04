import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  mCompletionInstructionAudio,
  mJoinInstructionAudio,
  mSoundSelectionInstructionAudio,
  mSyllableJoin,
  mSyllableOptions,
  mWordCompletion,
  mWordSyllableSelection,
} from '../data/mData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['completar', 'sonido', 'formar']

function ActividadMCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('m')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 1: completar la palabra con la sílaba que falta
  const [wordIndex, setWordIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [completionResult, setCompletionResult] = useState('')

  const currentWord = mWordCompletion[wordIndex]

  const checkCompletion = () => {
    if (!selectedSyllable) return

    const isCorrect = selectedSyllable === currentWord.answer

    setCompletionResult(isCorrect ? 'correct' : 'retry')
  }

  const nextWord = () => {
    const isLast = wordIndex === mWordCompletion.length - 1

    setSelectedSyllable('')
    setCompletionResult('')

    if (isLast) {
      goToNextPhase()
      return
    }

    setWordIndex((current) => current + 1)
  }

  // Fase 2: imagen + audio, elegir la sílaba con sonido M
  const [soundIndex, setSoundIndex] = useState(0)
  const [selectedSoundSyllable, setSelectedSoundSyllable] = useState('')
  const [soundResult, setSoundResult] = useState('')

  const currentSoundWord = mWordSyllableSelection[soundIndex]

  const checkSoundSelection = () => {
    if (!selectedSoundSyllable) return

    const isCorrect = selectedSoundSyllable === currentSoundWord.answer

    setSoundResult(isCorrect ? 'correct' : 'retry')
  }

  const nextSoundWord = () => {
    const isLast = soundIndex === mWordSyllableSelection.length - 1

    setSelectedSoundSyllable('')
    setSoundResult('')

    if (isLast) {
      goToNextPhase()
      return
    }

    setSoundIndex((current) => current + 1)
  }

  // Fase 3: formar palabras tocando sílabas (con repetidas)
  const [joinIndex, setJoinIndex] = useState(0)
  const [slots, setSlots] = useState([null, null])
  const [joinFeedback, setJoinFeedback] = useState('')

  const joinItem = mSyllableJoin[joinIndex]
  const isLastJoin = joinIndex === mSyllableJoin.length - 1

  const isOptionUsed = (optionIndex) =>
    slots.some((slot) => slot?.optionIndex === optionIndex)

  const pickOption = (syllable, optionIndex) => {
    if (joinFeedback === 'correct') return

    setJoinFeedback('')

    // Si ya está usado, lo quitamos del slot (toggle)
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
    const isCorrect = formedWord === joinItem.word

    if (isCorrect) {
      if (joinItem.wordAudio) playAudio(joinItem.wordAudio)
      setJoinFeedback('correct')
      return
    }

    setJoinFeedback('retry')
  }

  const retryJoin = () => {
    setSlots([null, null])
    setJoinFeedback('')
  }

  const nextJoinItem = () => {
    setSlots([null, null])
    setJoinFeedback('')
    setJoinIndex((current) => current + 1)
  }

  return (
    <main className={`page ${themeClass}`} aria-labelledby="m-completar-title">
      <BackButton label="Volver a la lección" to="/lecciones/m" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>

        <h1 id="m-completar-title">Completamos palabras</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'completar' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la palabra y elige la sílaba que falta.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(mCompletionInstructionAudio)}
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

          <p className="completion-word-pattern">{currentWord.pattern}</p>

          <div className="completion-bank">
            {mSyllableOptions.map((syllable) => (
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
              {wordIndex === mWordCompletion.length - 1
                ? 'Siguiente parte'
                : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'sonido' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la palabra y elige la sílaba con sonido M que
              escuchaste, sin importar en qué parte de la palabra está.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(mSoundSelectionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="completion-word-image"
            src={currentSoundWord.image}
            alt={currentSoundWord.word}
          />

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(currentSoundWord.audio)}
          >
            Escuchar palabra
          </Button>

          <div className="completion-bank">
            {mSyllableOptions.map((syllable) => (
              <button
                className={[
                  'completion-chip',
                  'text-syllable',
                  selectedSoundSyllable === syllable
                    ? 'completion-active'
                    : '',
                  soundResult === 'correct' &&
                  selectedSoundSyllable === syllable
                    ? 'completion-correct'
                    : '',
                  soundResult === 'retry' &&
                  selectedSoundSyllable === syllable
                    ? 'completion-incorrect'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={syllable}
                aria-pressed={selectedSoundSyllable === syllable}
                onClick={() => {
                  setSelectedSoundSyllable(syllable)
                  setSoundResult('')
                }}
              >
                {syllable}
              </button>
            ))}
          </div>

          {soundResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! La palabra es {currentSoundWord.word}.
            </p>
          )}

          {soundResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa no es la sílaba correcta. Escucha otra vez.
            </p>
          )}

          {soundResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedSoundSyllable}
              onClick={checkSoundSelection}
            >
              Comprobar
            </Button>
          )}

          {soundResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextSoundWord}
            >
              {soundIndex === mWordSyllableSelection.length - 1
                ? 'Siguiente parte'
                : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'formar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca las sílabas en orden para formar la palabra.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(mJoinInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <p aria-live="polite" className="text-word">
            {slots[0]?.syllable ?? '__'}
            {slots[1]?.syllable ?? '__'}
          </p>

          <div className="selection-options">
            {joinItem.options.map((syllable, optionIndex) => {
              const used = isOptionUsed(optionIndex)

              return (
                <button
                  className={[
                    'selection-button',
                    used ? 'selection-button--selected' : '',
                    joinFeedback === 'correct' && used
                      ? 'selection-button--correct'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={`${syllable}-${optionIndex}`}
                  disabled={joinFeedback === 'correct' && !used}
                  aria-pressed={used}
                  onClick={() => pickOption(syllable, optionIndex)}
                >
                  <span className="text-syllable">{syllable}</span>
                </button>
              )
            })}
          </div>

          {joinFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Formaste la palabra {joinItem.word}.
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

          {joinFeedback === 'retry' && (
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

          {joinFeedback === 'correct' && !isLastJoin && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextJoinItem}
            >
              Formar otra palabra
            </Button>
          )}

          {joinFeedback === 'correct' && isLastJoin && (
            <Button
              to="/actividad/m-final"
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

export default ActividadMCompletarPage