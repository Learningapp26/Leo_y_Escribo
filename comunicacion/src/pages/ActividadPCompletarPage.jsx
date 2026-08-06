import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  pSyllableBank,
  pSyllableOptions,
  pWordBuildInstructionAudio,
  pWordBuildTargets,
  pWordCompletion,
  pWordCompletionInstructionAudio,
} from '../data/pData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['completar', 'formar']

// Valor especial para las palabras "trampa" que no tienen ninguna sílaba
// con p (ej. "camiseta"), igual que en el libro.
const NO_SYLLABLE = 'ninguna'

function ActividadPCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('p')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  // Fase 1: escuchar la palabra y elegir la sílaba que falta
  const [wordIndex, setWordIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [completionResult, setCompletionResult] = useState('')

  const currentWord = pWordCompletion[wordIndex]
  const isLastWord = wordIndex === pWordCompletion.length - 1

  const checkCompletion = () => {
    if (!selectedSyllable) return

    const expected = currentWord.answer ?? NO_SYLLABLE
    const isCorrect = selectedSyllable === expected

    setCompletionResult(isCorrect ? 'correct' : 'retry')
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

  // Fase 2: formar palabras con el banco de 20 sílabas
  const [slots, setSlots] = useState([null, null])
  const [foundWords, setFoundWords] = useState([])
  const [joinFeedback, setJoinFeedback] = useState('')

  const allWordsFound = foundWords.length === pWordBuildTargets.length

  const isOptionUsed = (optionIndex) =>
    slots.some((slot) => slot?.optionIndex === optionIndex)

  const pickSyllable = (syllable, optionIndex) => {
    if (joinFeedback === 'correct') return

    setJoinFeedback('')

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

    if (pWordBuildTargets.includes(formedWord)) {
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

  return (
    <main className={`page ${themeClass}`} aria-labelledby="p-completar-title">
      <BackButton label="Volver a la lección" to="/lecciones/p" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>

        <h1 id="p-completar-title">Completamos palabras</h1>
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
              onClick={() => playAudio(pWordCompletionInstructionAudio)}
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

          {currentWord.answer === null && (
            <p className="text-instruction">
              Ojo: no todas las palabras tienen una sílaba con p.
            </p>
          )}

          <div className="completion-bank">
            {[...pSyllableOptions, NO_SYLLABLE].map((syllable) => (
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
                {syllable === NO_SYLLABLE ? 'Ninguna' : syllable}
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

      {phase === 'formar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Estas son las {pWordBuildTargets.length} palabras que puedes
              formar. Toca dos sílabas para armar cada una y compruébala.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(pWordBuildInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <p className="word-bank-reference">
            {pWordBuildTargets.map((word, index) => (
              <span key={word}>
                <span
                  className={
                    foundWords.includes(word)
                      ? 'word-bank-reference__word--found'
                      : ''
                  }
                >
                  {word}
                </span>
                {index < pWordBuildTargets.length - 1 ? ' - ' : ''}
              </span>
            ))}
          </p>

          <p aria-live="polite" className="text-word">
            {slots[0]?.syllable ?? '__'}
            {slots[1]?.syllable ?? '__'}
          </p>

          <div className="syllables-options syllables-options--pairs">
            {pSyllableBank.map((syllable, optionIndex) => {
              const used = isOptionUsed(optionIndex)

              return (
                <button
                  className={[
                    'syllable-button',
                    used ? 'syllable-button--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={`${syllable}-${optionIndex}`}
                  aria-pressed={used}
                  onClick={() => pickSyllable(syllable, optionIndex)}
                >
                  {syllable}
                </button>
              )
            })}
          </div>

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
              ¡Excelente! Encontraste las {pWordBuildTargets.length} palabras.
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

          {joinFeedback === 'correct' && allWordsFound && (
            <Button
              to="/actividad/p-final"
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

export default ActividadPCompletarPage
