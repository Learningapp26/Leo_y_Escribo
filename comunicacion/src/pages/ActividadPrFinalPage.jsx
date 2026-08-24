import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  prJoinInstructionAudio,
  prSentenceFormation,
  prSyllableJoin,
  prWordJoin,
} from '../data/prData'
import { playAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['silaba', 'formar']

const totalExercises = prSyllableJoin.length + prWordJoin.length

function ActividadPrFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('pr')

  // Fase 1: elegir la sílaba correcta (entre dos) para completar la palabra
  const [joinIndex, setJoinIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [joinResult, setJoinResult] = useState('')

  const joinItem = prSyllableJoin[joinIndex]
  const isLastJoin = joinIndex === prSyllableJoin.length - 1
  const visiblePattern = joinItem.pattern.replace(
    '___',
    selectedSyllable || '___',
  )

  const pickJoinSyllable = (option) => {
    if (joinResult === 'correct') return

    playAudio(option.audio)
    setJoinResult('')
    setSelectedSyllable(option.syllable)
  }

  const checkJoin = () => {
    if (!selectedSyllable) return

    const option = joinItem.options.find(
      (item) => item.syllable === selectedSyllable,
    )

    const isCorrect = Boolean(option?.isCorrect)

    setJoinResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) {
      playAudio(joinItem.wordAudio)
      setStars((current) => current + 1)
    }

    registrarProgreso({
      actividad: 'pr-final',
      correcto: isCorrect,
      detalle: { leccionId: 'pr', fase: 'silaba', ejercicioId: joinItem.id },
    })
  }

  const retryJoin = () => {
    setSelectedSyllable('')
    setJoinResult('')
  }

  const nextJoinItem = () => {
    setSelectedSyllable('')
    setJoinResult('')

    if (isLastJoin) {
      setPhaseIndex((current) => current + 1)
      return
    }

    setJoinIndex((current) => current + 1)
  }

  // Fase 2: formar la oración correcta con el banco de palabras
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [placedIndices, setPlacedIndices] = useState([])
  const [sentenceResult, setSentenceResult] = useState('')

  const sentenceItem = prWordJoin[sentenceIndex]
  const isLastSentence = sentenceIndex === prWordJoin.length - 1
  const targetTokens = sentenceItem.sentence.split(' ')
  const isSentenceFull = placedIndices.length === targetTokens.length

  const pickWord = (optionIndex) => {
    if (sentenceResult === 'correct') return

    setSentenceResult('')

    if (placedIndices.includes(optionIndex)) {
      setPlacedIndices((current) =>
        current.filter((index) => index !== optionIndex),
      )
      return
    }

    if (placedIndices.length >= targetTokens.length) return

    setPlacedIndices((current) => [...current, optionIndex])
  }

  const checkSentence = () => {
    if (!isSentenceFull) return

    const formedSentence = placedIndices
      .map((index) => sentenceItem.options[index])
      .join(' ')

    const isCorrect = formedSentence === sentenceItem.sentence

    setSentenceResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) setStars((current) => current + 1)

    registrarProgreso({
      actividad: 'pr-final',
      correcto: isCorrect,
      detalle: {
        leccionId: 'pr',
        fase: 'formar',
        ejercicioId: sentenceItem.id,
      },
    })
  }

  const retrySentence = () => {
    setPlacedIndices([])
    setSentenceResult('')
  }

  const nextSentence = () => {
    setPlacedIndices([])
    setSentenceResult('')

    if (isLastSentence) {
      setFinished(true)
      return
    }

    setSentenceIndex((current) => current + 1)
  }

  useEffect(() => {
    if (finished) registrarLeccionCompletada('pr')
  }, [finished])

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <span className="finish-icon" aria-hidden="true">
            ⭐
          </span>

          <h1>¡Terminaste la lección de la combinación PR!</h1>

          <p className="text-instruction">
            Aprendiste el sonido /pr/, sus sílabas pra, pre, pri, pro, pru y
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
              playAudio('/audio/lecciones/pr/felicitacion-final.mp3')
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
    <main className={`page ${themeClass}`} aria-labelledby="pr-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/pr" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>

        <h1 id="pr-final-title">Practica todo lo aprendido</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      {phase === 'silaba' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la palabra y toca la sílaba correcta para
              completarla.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(prJoinInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={joinItem.image}
            alt={joinItem.word}
          />

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(joinItem.wordAudio)}
          >
            Escuchar palabra
          </Button>

          <p className="completion-word-pattern">{visiblePattern}</p>

          <div className="syllables-options">
            {joinItem.options.map((option) => {
              const isSelected = selectedSyllable === option.syllable

              const stateClass =
                joinResult && isSelected
                  ? joinResult === 'correct'
                    ? 'syllable-button--correct'
                    : 'syllable-button--incorrect'
                  : isSelected
                    ? 'syllable-button--selected'
                    : ''

              return (
                <button
                  className={['syllable-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={option.syllable}
                  aria-pressed={isSelected}
                  onClick={() => pickJoinSyllable(option)}
                >
                  {option.syllable}
                </button>
              )
            })}
          </div>

          {joinResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! La palabra es {joinItem.word}.
            </p>
          )}

          {joinResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa no es la sílaba correcta. Escucha otra vez.
            </p>
          )}

          {joinResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedSyllable}
              onClick={checkJoin}
            >
              Comprobar
            </Button>
          )}

          {joinResult === 'retry' && (
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

          {joinResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextJoinItem}
            >
              {isLastJoin ? 'Siguiente parte' : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'formar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca las palabras en orden para formar la oración correcta.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(prSentenceFormation.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={sentenceItem.image}
            alt={sentenceItem.sentence}
          />

          <p aria-live="polite" className="text-sentence">
            {placedIndices.length > 0
              ? placedIndices
                  .map((index) => sentenceItem.options[index])
                  .join(' ')
              : '___'}
          </p>

          <div className="selection-options">
            {sentenceItem.options.map((word, optionIndex) => {
              const used = placedIndices.includes(optionIndex)

              return (
                <button
                  className={[
                    'selection-button',
                    used ? 'selection-button--selected' : '',
                    sentenceResult === 'correct' && used
                      ? 'selection-button--correct'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={`${word}-${optionIndex}`}
                  disabled={sentenceResult === 'correct' && !used}
                  aria-pressed={used}
                  onClick={() => pickWord(optionIndex)}
                >
                  <span className="selection-word">{word}</span>
                </button>
              )
            })}
          </div>

          {sentenceResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Esa es la oración correcta.
            </p>
          )}

          {sentenceResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Ese no es el orden correcto. Revisa otra vez.
            </p>
          )}

          {sentenceResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!isSentenceFull}
              onClick={checkSentence}
            >
              Comprobar oración
            </Button>
          )}

          {sentenceResult === 'retry' && (
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

          {sentenceResult === 'correct' && (
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

export default ActividadPrFinalPage