import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  nSyllableJoin,
  nSyllableOptions,
  nWordCompletion,
} from '../data/nCompletar'
import { playAudio } from '../lib/audioPlayer'

const PHASES = ['completar', 'unir']

const leftOptions = nSyllableJoin.map((item) => item.first)
const rightOptions = [{ id: 'no', syllable: 'no' }]

function getAudioLabel(label, audio) {
  return audio ? label : `${label} pendiente`
}

function playIfAvailable(audio) {
  if (audio) playAudio(audio)
}

function ActividadNCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('n')

  const [wordIndex, setWordIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [completionResult, setCompletionResult] = useState('')

  const currentWord = nWordCompletion[wordIndex]

  const checkCompletion = () => {
    if (!selectedSyllable) return

    const isCorrect = selectedSyllable === currentWord.answer

    setCompletionResult(isCorrect ? 'correct' : 'retry')
  }

  const nextWord = () => {
    const isLast = wordIndex === nWordCompletion.length - 1

    setSelectedSyllable('')
    setCompletionResult('')

    if (isLast) {
      setPhaseIndex((current) => current + 1)
      return
    }

    setWordIndex((current) => current + 1)
  }

  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(rightOptions[0])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [joinFeedback, setJoinFeedback] = useState('')

  const isJoinFinished = matchedPairs.length === nSyllableJoin.length

  const isMatched = (syllableId) =>
    matchedPairs.some((pairId) => {
      const pair = nSyllableJoin.find((item) => item.id === pairId)

      return pair?.first.id === syllableId
    })

  const checkJoin = () => {
    if (!selectedLeft) return

    const matchingPair = nSyllableJoin.find(
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
    playIfAvailable(matchingPair.wordAudio)
  }

  const continueJoin = () => {
    setSelectedLeft(null)
    setJoinFeedback('')
  }

  return (
    <main
      className={`page ${themeClass}`}
      aria-labelledby="n-completar-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/n" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>

        <h1 id="n-completar-title">Completamos palabras</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'completar' && (
        <Card className="completion-card">
          <p className="text-instruction">
            Observa la imagen y elige la sílaba que falta.
          </p>

          <img
            className="completion-word-image"
            src={currentWord.image}
            alt={currentWord.word}
          />

          <Button
            variant="audio"
            icon={Volume2}
            disabled={!currentWord.audio}
            onClick={() => playAudio(currentWord.audio)}
          >
            {getAudioLabel(currentWord.word, currentWord.audio)}
          </Button>

          <p className="completion-word-pattern">{currentWord.pattern}</p>

          <div className="completion-bank">
            {nSyllableOptions.map((syllable) => (
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
              Esa sílaba no completa la palabra. Revisa otra vez.
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
              {wordIndex === nWordCompletion.length - 1
                ? 'Siguiente parte'
                : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'unir' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Une una sílaba con <strong>no</strong> para formar una palabra.
            Las sílabas que ya usaste se irán quitando.
          </p>

          <div className="selection-columns">
            <section className="selection-options" aria-label="Primera sílaba">
              {leftOptions.filter((item) => !isMatched(item.id)).map((item) => {
                const selected = selectedLeft?.id === item.id

                return (
                  <button
                    className={[
                      'selection-button',
                      selected ? 'selection-button--selected' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    type="button"
                    key={item.id}
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

            <section className="selection-options" aria-label="Sílaba fija">
              {rightOptions.map((item) => {
                const selected =
                  selectedRight?.id === item.id

                return (
                  <button
                    className={[
                      'selection-button',
                      selected ? 'selection-button--selected' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    type="button"
                    key={item.id}
                    disabled
                    aria-pressed={selected}
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
              disabled={!selectedLeft}
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
              to="/actividad/n-final"
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

export default ActividadNCompletarPage
