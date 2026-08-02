import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  lSyllableJoin,
  lSyllableOptions,
  lWordCompletion,
} from '../data/lCompletar'
import { playAudio } from '../lib/audioPlayer'

const PHASES = ['completar', 'unir']

const leftOptions = lSyllableJoin.map((item) => item.first)

const rightOptions = [
  lSyllableJoin[1].second,
  lSyllableJoin[3].second,
  lSyllableJoin[0].second,
  lSyllableJoin[2].second,
]

function ActividadLCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('l')

  // Fase 1: completar la palabra con la sílaba que falta
  const [wordIndex, setWordIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [completionResult, setCompletionResult] = useState('')

  const currentWord = lWordCompletion[wordIndex]

  const checkCompletion = () => {
    if (!selectedSyllable) return

    const isCorrect = selectedSyllable === currentWord.answer

    setCompletionResult(isCorrect ? 'correct' : 'retry')
  }

  const nextWord = () => {
    const isLast = wordIndex === lWordCompletion.length - 1

    setSelectedSyllable('')
    setCompletionResult('')

    if (isLast) {
      setPhaseIndex((current) => current + 1)
      return
    }

    setWordIndex((current) => current + 1)
  }

  // Fase 2: unir sílabas para formar palabras
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState([])
  const [joinFeedback, setJoinFeedback] = useState('')

  const isJoinFinished = matchedPairs.length === lSyllableJoin.length

  const isMatched = (syllableId) =>
    matchedPairs.some((pairId) => {
      const pair = lSyllableJoin.find((item) => item.id === pairId)

      return (
        pair?.first.id === syllableId || pair?.second.id === syllableId
      )
    })

  const checkJoin = () => {
    if (!selectedLeft || !selectedRight) return

    const matchingPair = lSyllableJoin.find(
      (item) =>
        item.first.id === selectedLeft.id &&
        item.second.id === selectedRight.id,
    )

    if (!matchingPair) {
      setJoinFeedback('retry')
      return
    }

    setMatchedPairs((current) => [...current, matchingPair.id])
    setJoinFeedback('correct')
    playAudio(matchingPair.wordAudio)
  }

  const continueJoin = () => {
    setSelectedLeft(null)
    setSelectedRight(null)
    setJoinFeedback('')
  }

  return (
    <main
      className={`page ${themeClass}`}
      aria-labelledby="l-completar-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/l" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>

        <h1 id="l-completar-title">Completamos palabras</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'completar' && (
        <Card className="completion-card">
          <p className="text-instruction">
            Escucha la palabra y elige la sílaba que falta.
          </p>

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
            {lSyllableOptions.map((syllable) => (
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
              {wordIndex === lWordCompletion.length - 1
                ? 'Siguiente parte'
                : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'unir' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Une las sílabas para formar una palabra.
          </p>

          <div className="selection-columns">
            <section className="selection-options" aria-label="Primera sílaba">
              {leftOptions.map((item) => {
                const selected = selectedLeft?.id === item.id
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
                    onClick={() => {
                      setSelectedLeft(item)
                      setJoinFeedback('')
                    }}
                  >
                    <span className="text-syllable">{item.syllable}</span>
                  </button>
                )
              })}
            </section>

            <section className="selection-options" aria-label="Segunda sílaba">
              {rightOptions.map((item) => {
                const selected = selectedRight?.id === item.id
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
                    onClick={() => {
                      setSelectedRight(item)
                      setJoinFeedback('')
                    }}
                  >
                    <span className="text-syllable">{item.syllable}</span>
                  </button>
                )
              })}
            </section>
          </div>

          <p aria-live="polite" className="text-word">
            {selectedLeft?.syllable ?? '__'}
            {selectedRight?.syllable ?? '__'}
          </p>

          {joinFeedback === 'correct' && !isJoinFinished && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Formaste una palabra.
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

          {!joinFeedback && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedLeft || !selectedRight}
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
              onClick={() => {
                setSelectedLeft(null)
                setSelectedRight(null)
                setJoinFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {joinFeedback === 'correct' && !isJoinFinished && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={continueJoin}
            >
              Formar otra palabra
            </Button>
          )}

          {isJoinFinished && (
            <Button
              to="/actividad/l-final"
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

export default ActividadLCompletarPage
