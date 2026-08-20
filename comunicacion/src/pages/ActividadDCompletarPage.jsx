import { useState } from 'react'
import {
  ArrowRight,
  Check,
  RotateCcw,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import {
  dSyllableJoin,
  dSyllableOptions,
  dWordCompletion,
} from '../data/dActivities'
import { getLessonThemeClass } from '../data/lessonColors'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = ['completar', 'unir']

const rightOptions = [
  dSyllableJoin[2].second,
  dSyllableJoin[4].second,
  dSyllableJoin[0].second,
  dSyllableJoin[3].second,
  dSyllableJoin[1].second,
]

function playIfAvailable(audio) {
  if (audio) playAudio(audio)
}

function ActividadDCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)

  // Parte 1: completar palabras
  const [wordIndex, setWordIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [completionResult, setCompletionResult] = useState('')

  // Parte 2: relacionar sílabas
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState([])
  const [joinFeedback, setJoinFeedback] = useState('')
  const [completedPair, setCompletedPair] = useState(null)

  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('d')
  const currentWord = dWordCompletion[wordIndex]

  const visiblePattern = currentWord.pattern.replace(
    '__',
    selectedSyllable || '__',
  )

  const isJoinFinished =
    matchedPairs.length === dSyllableJoin.length

  const checkCompletion = () => {
    if (!selectedSyllable) return
    const isCorrect =
      selectedSyllable === currentWord.answer

    setCompletionResult(
      isCorrect ? 'correct' : 'retry',
    )

    registrarProgreso({
      actividad: 'd-completar',
      correcto: isCorrect,
      detalle: {
        leccionId: 'd',
        fase: 'completar',
        ejercicioId: currentWord.word,
      },
    })
  }

  const retryCompletion = () => {
    setSelectedSyllable('')
    setCompletionResult('')
  }

  const nextWord = () => {
    setSelectedSyllable('')
    setCompletionResult('')

    if (wordIndex === dWordCompletion.length - 1) {
      setPhaseIndex(1)
      return
    }

    setWordIndex((current) => current + 1)
  }

  const isMatched = (syllableId) =>
    matchedPairs.some((pairId) => {
      const pair = dSyllableJoin.find(
        (item) => item.id === pairId,
      )

      return (
        pair?.first.id === syllableId ||
        pair?.second.id === syllableId
      )
    })

  const checkJoin = () => {
    if (!selectedLeft || !selectedRight) return

    const matchingPair = dSyllableJoin.find(
      (item) =>
        item.first.id === selectedLeft.id &&
        item.second.id === selectedRight.id,
    )

    registrarProgreso({
      actividad: 'd-completar',
      correcto: Boolean(matchingPair),
      detalle: {
        leccionId: 'd',
        fase: 'unir',
        ejercicioId:
          matchingPair?.id ??
          `${selectedLeft.syllable}${selectedRight.syllable}`,
      },
    })

    if (!matchingPair) {
      setCompletedPair(null)
      setJoinFeedback('retry')
      return
    }

    setMatchedPairs((current) => [
      ...current,
      matchingPair.id,
    ])

    setCompletedPair(matchingPair)
    setJoinFeedback('correct')
    playIfAvailable(matchingPair.wordAudio)
  }
  const resetJoin = () => {
    setSelectedLeft(null)
    setSelectedRight(null)
    setCompletedPair(null)
    setJoinFeedback('')
  }

  return (
    <main
      className={`page ${themeClass}`}
      aria-labelledby="d-completar-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/d"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad 3
        </span>

        <h1 id="d-completar-title">
          Completamos palabras
        </h1>
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
            onClick={() =>
              playIfAvailable(currentWord.audio)
            }
          >
            Escuchar {currentWord.word}
          </Button>

          <p className="completion-word-pattern">
            {visiblePattern}
          </p>

          <div className="completion-bank">
            {dSyllableOptions.map((syllable) => {
              const isSelected =
                selectedSyllable === syllable

              const isCorrect =
                completionResult === 'correct' &&
                isSelected

              const isIncorrect =
                completionResult === 'retry' &&
                isSelected

              return (
                <button
                  className={[
                    'completion-chip',
                    'text-syllable',
                    isSelected
                      ? 'completion-active'
                      : '',
                    isCorrect
                      ? 'completion-correct'
                      : '',
                    isIncorrect
                      ? 'completion-incorrect'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={syllable}
                  aria-pressed={isSelected}
                  disabled={
                    completionResult === 'correct'
                  }
                  onClick={() => {
                    setSelectedSyllable(syllable)
                    setCompletionResult('')
                  }}
                >
                  {syllable}
                </button>
              )
            })}
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
              Esa sílaba no completa la palabra.
              Intenta nuevamente.
            </p>
          )}

          {completionResult === '' && (
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

          {completionResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryCompletion}
            >
              Intentar nuevamente
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
              {wordIndex ===
                dWordCompletion.length - 1
                ? 'Siguiente parte'
                : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'unir' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Relaciona las sílabas para formar palabras.
          </p>

          <p className="text-ui-label">
            Has formado {matchedPairs.length} de{' '}
            {dSyllableJoin.length} palabras
          </p>

          <div className="selection-columns">
            <section
              className="selection-options"
              aria-label="Primera sílaba"
            >
              {dSyllableJoin
                .filter(
                  (item) =>
                    !isMatched(item.first.id),
                )
                .map((item) => {
                  const selected =
                    selectedLeft?.id === item.first.id

                  return (
                    <button
                      className={[
                        'selection-button',
                        selected
                          ? 'selection-button--selected'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      type="button"
                      key={item.first.id}
                      aria-pressed={selected}
                      disabled={
                        joinFeedback === 'correct'
                      }
                      onClick={() => {
                        setSelectedLeft(item.first)
                        setJoinFeedback('')
                      }}
                    >
                      <span className="text-syllable">
                        {item.first.syllable}
                      </span>
                    </button>
                  )
                })}
            </section>

            <section
              className="selection-options"
              aria-label="Segunda sílaba"
            >
              {rightOptions
                .filter(
                  (item) => !isMatched(item.id),
                )
                .map((item) => {
                  const selected =
                    selectedRight?.id === item.id

                  return (
                    <button
                      className={[
                        'selection-button',
                        selected
                          ? 'selection-button--selected'
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      type="button"
                      key={item.id}
                      aria-pressed={selected}
                      disabled={
                        joinFeedback === 'correct'
                      }
                      onClick={() => {
                        setSelectedRight(item)
                        setJoinFeedback('')
                      }}
                    >
                      <span className="text-syllable">
                        {item.syllable}
                      </span>
                    </button>
                  )
                })}
            </section>
          </div>

          <p
            aria-live="polite"
            className="text-word"
          >
            {selectedLeft?.syllable ?? '__'}
            {selectedRight?.syllable ?? '__'}
          </p>

          {joinFeedback === 'correct' &&
            completedPair && (
              <div className="join-result" role="status">
                <p className="selection-feedback selection-feedback--correct">
                  ¡Muy bien! Formaste la palabra{' '}
                  {completedPair.word}.
                </p>

                <img
                  className="join-result__image"
                  src={completedPair.image}
                  alt={`Ilustración de ${completedPair.word}`}
                />

                <p className="join-result__word">
                  {completedPair.word}
                </p>
              </div>
            )}

          {joinFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esas sílabas no forman una de las palabras.
              Intenta nuevamente.
            </p>
          )}

          {joinFeedback === '' &&
            !isJoinFinished && (
              <Button
                icon={Check}
                size="large"
                fullWidth
                disabled={
                  !selectedLeft || !selectedRight
                }
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
              onClick={resetJoin}
            >
              Intentar nuevamente
            </Button>
          )}

          {joinFeedback === 'correct' &&
            !isJoinFinished && (
              <Button
                icon={ArrowRight}
                iconPosition="right"
                size="large"
                fullWidth
                onClick={resetJoin}
              >
                Formar otra palabra
              </Button>
            )}

          {isJoinFinished && (
            <>
              <p
                className="selection-feedback selection-feedback--correct"
                role="status"
              >
                ¡Excelente! Formaste todas las palabras.
              </p>

              <Button
                to="/actividad/d-final"
                icon={ArrowRight}
                iconPosition="right"
                size="large"
                fullWidth
              >
                Ir a la actividad final
              </Button>
            </>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadDCompletarPage