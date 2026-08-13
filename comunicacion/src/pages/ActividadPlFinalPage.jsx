import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  plJoinInstructionAudio,
  plSentenceCompletion,
  plSentenceCompletionInstructionAudio,
  plSyllableJoin,
  plSyllableJoinOptions,
  plWordBank,
} from '../data/plData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['formar', 'oracion']

const totalExercises = plSyllableJoin.length + plSentenceCompletion.length

function ActividadPlFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('pl')

  // Fase 1: formar palabras — "pla" + terminación del banco
  const [joinIndex, setJoinIndex] = useState(0)
  const [selectedEnding, setSelectedEnding] = useState('')
  const [joinFeedback, setJoinFeedback] = useState('')

  const joinItem = plSyllableJoin[joinIndex]
  const isLastJoin = joinIndex === plSyllableJoin.length - 1

  const pickEnding = (ending) => {
    if (joinFeedback === 'correct') return

    setJoinFeedback('')
    setSelectedEnding(ending)
  }

  const checkJoin = () => {
    if (!selectedEnding) return

    const isCorrect = selectedEnding === joinItem.answer

    if (isCorrect) {
      playAudio(joinItem.wordAudio)
      setStars((current) => current + 1)
    }

    setJoinFeedback(isCorrect ? 'correct' : 'retry')
  }

  const retryJoin = () => {
    setSelectedEnding('')
    setJoinFeedback('')
  }

  const nextJoinItem = () => {
    setSelectedEnding('')
    setJoinFeedback('')

    if (isLastJoin) {
      setPhaseIndex((current) => current + 1)
      return
    }

    setJoinIndex((current) => current + 1)
  }

  // Fase 2: completar la oración con una palabra del banco
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [selectedWord, setSelectedWord] = useState('')
  const [sentenceFeedback, setSentenceFeedback] = useState('')

  const sentenceItem = plSentenceCompletion[sentenceIndex]
  const isLastSentence = sentenceIndex === plSentenceCompletion.length - 1

  const pickWord = (word) => {
    if (sentenceFeedback === 'correct') return

    playAudio(sentenceItem.audio)
    setSentenceFeedback('')
    setSelectedWord(word)
  }

  const checkSentence = () => {
    if (!selectedWord) return

    const isCorrect = selectedWord === sentenceItem.answer

    setSentenceFeedback(isCorrect ? 'correct' : 'retry')

    if (isCorrect) setStars((current) => current + 1)
  }

  const retrySentence = () => {
    setSelectedWord('')
    setSentenceFeedback('')
  }

  const nextSentence = () => {
    setSelectedWord('')
    setSentenceFeedback('')

    if (isLastSentence) {
      setFinished(true)
      return
    }

    setSentenceIndex((current) => current + 1)
  }

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <span className="finish-icon" aria-hidden="true">
            ⭐
          </span>

          <h1>¡Terminaste la lección de la combinación PL!</h1>

          <p className="text-instruction">
            Aprendiste el sonido /pl/, sus sílabas pla, ple, pli, plo, plu y
            palabras nuevas.
          </p>

          <StarsCounter
            current={stars}
            total={totalExercises}
            label="Estrellas"
          />

          <Button
            variant="audio"
            icon={Volume2}
            fullWidth
            onClick={() =>
              playAudio('/audio/lecciones/pl/felicitacion-final.mp3')
            }
          >
            Escuchar felicitación
          </Button>

          <Button
            to="/lecciones"
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
          >
            Volver a las lecciones
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main className={`page ${themeClass}`} aria-labelledby="pl-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/pl" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>

        <h1 id="pl-final-title">Practica todo lo aprendido</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      {phase === 'formar' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca la terminación correcta para formar la palabra junto a
              "pla".
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(plJoinInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <p className="completion-word-pattern">{joinItem.pattern}</p>

          <div className="completion-bank">
            {plSyllableJoinOptions.map((ending) => (
              <button
                className={[
                  'completion-chip',
                  'text-syllable',
                  selectedEnding === ending ? 'completion-active' : '',
                  joinFeedback === 'correct' && selectedEnding === ending
                    ? 'completion-correct'
                    : '',
                  joinFeedback === 'retry' && selectedEnding === ending
                    ? 'completion-incorrect'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={ending}
                aria-pressed={selectedEnding === ending}
                onClick={() => pickEnding(ending)}
              >
                {ending}
              </button>
            ))}
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
              Esa terminación no forma {joinItem.word}. Inténtalo de nuevo.
            </p>
          )}

          {joinFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedEnding}
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

          {joinFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextJoinItem}
            >
              {isLastJoin ? 'Siguiente parte' : 'Formar otra palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'oracion' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la oración y toca la palabra del banco que la
              completa.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(plSentenceCompletionInstructionAudio)
              }
            >
              Escuchar instrucción
            </Button>
          </div>

          <p aria-live="polite" className="text-sentence">
            {sentenceItem.sentence}
          </p>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(sentenceItem.audio)}
          >
            Escuchar oración
          </Button>

          <div className="selection-options">
            {plWordBank.map((word) => {
              const isSelected = selectedWord === word

              const stateClass =
                sentenceFeedback && isSelected
                  ? sentenceFeedback === 'correct'
                    ? 'selection-button--correct'
                    : 'selection-button--incorrect'
                  : isSelected
                    ? 'selection-button--selected'
                    : ''

              return (
                <button
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={word}
                  disabled={sentenceFeedback === 'correct' && !isSelected}
                  aria-pressed={isSelected}
                  onClick={() => pickWord(word)}
                >
                  <span className="selection-word">{word}</span>
                </button>
              )
            })}
          </div>

          {sentenceFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! La palabra es {sentenceItem.answer}.
            </p>
          )}

          {sentenceFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa palabra no completa la oración. Escucha otra vez.
            </p>
          )}

          {sentenceFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedWord}
              onClick={checkSentence}
            >
              Comprobar
            </Button>
          )}

          {sentenceFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retrySentence}
            >
              Intentar nuevamente
            </Button>
          )}

          {sentenceFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextSentence}
            >
              {isLastSentence ? 'Finalizar lección' : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadPlFinalPage