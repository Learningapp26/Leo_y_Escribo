import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  brJoinInstructionAudio,
  brSentenceFormation,
  brSyllableJoin,
  brSyllableJoinBank,
  brWordJoin,
} from '../data/brData'
import { playAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['formar', 'oracion']

const totalExercises = brSyllableJoin.length + brWordJoin.length

function ActividadBrFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('br')

  // Fase 1: elegir del banco de sílabas las dos que forman la palabra
  const [joinIndex, setJoinIndex] = useState(0)
  const [placedSyllables, setPlacedSyllables] = useState([])
  const [joinResult, setJoinResult] = useState('')

  const joinItem = brSyllableJoin[joinIndex]
  const isLastJoin = joinIndex === brSyllableJoin.length - 1
  const isJoinFull = placedSyllables.length === joinItem.answers.length

  const pickBankSyllable = (item) => {
    if (joinResult === 'correct') return
    if (placedSyllables.length >= joinItem.answers.length) return

    playAudio(item.audio)
    setJoinResult('')
    setPlacedSyllables((current) => [...current, item.syllable])
  }

  const removeLastSyllable = () => {
    if (joinResult === 'correct') return

    setPlacedSyllables((current) => current.slice(0, -1))
    setJoinResult('')
  }

  const checkJoin = () => {
    if (!isJoinFull) return

    const isCorrect = placedSyllables.every(
      (syllable, index) => syllable === joinItem.answers[index],
    )

    setJoinResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) {
      playAudio(joinItem.wordAudio)
      setStars((current) => current + 1)
    }

    registrarProgreso({
      actividad: 'br-final',
      correcto: isCorrect,
      detalle: { leccionId: 'br', fase: 'formar', ejercicioId: joinItem.id },
    })
  }

  const retryJoin = () => {
    setPlacedSyllables([])
    setJoinResult('')
  }

  const nextJoinItem = () => {
    setPlacedSyllables([])
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

  const sentenceItem = brWordJoin[sentenceIndex]
  const isLastSentence = sentenceIndex === brWordJoin.length - 1
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
      actividad: 'br-final',
      correcto: isCorrect,
      detalle: {
        leccionId: 'br',
        fase: 'oracion',
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
    if (finished) registrarLeccionCompletada('br')
  }, [finished])

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <span className="finish-icon" aria-hidden="true">
            ⭐
          </span>

          <h1>¡Terminaste la lección de la combinación BR!</h1>

          <p className="text-instruction">
            Aprendiste el sonido /br/, sus sílabas bra, bre, bri, bro, bru y
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
              playAudio('/audio/lecciones/br/felicitacion-final.mp3')
            }
          >
            Escuchar felicitación
          </Button>

          <Button
            to="/lecciones/unidad/3"
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
    <main className={`page ${themeClass}`} aria-labelledby="br-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/br" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>

        <h1 id="br-final-title">Practica todo lo aprendido</h1>
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
              Mira la palabra. Toca en el banco las dos sílabas que la
              forman.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(brJoinInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <span className="text-word">{joinItem.word}</span>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(joinItem.wordAudio)}
          >
            Escuchar palabra
          </Button>

          <p aria-live="polite" className="text-word">
            {joinItem.answers.map((_, position) => (
              <span key={position}>
                {placedSyllables[position] ?? '__'}
              </span>
            ))}
          </p>

          <div className="completion-bank">
            {brSyllableJoinBank.map((item) => (
              <button
                className="completion-chip text-syllable"
                type="button"
                key={item.syllable}
                disabled={
                  placedSyllables.length >= joinItem.answers.length ||
                  joinResult === 'correct'
                }
                onClick={() => pickBankSyllable(item)}
              >
                {item.syllable}
              </button>
            ))}
          </div>

          {joinResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Formaste la palabra {joinItem.word}.
            </p>
          )}

          {joinResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esas sílabas no forman la palabra correcta. Inténtalo de nuevo.
            </p>
          )}

          {joinResult !== 'correct' && (
            <div className="activity-navigation">
              <Button
                variant="secondary"
                icon={RotateCcw}
                fullWidth
                disabled={placedSyllables.length === 0}
                onClick={removeLastSyllable}
              >
                Borrar
              </Button>

              <Button
                icon={Check}
                fullWidth
                disabled={!isJoinFull}
                onClick={checkJoin}
              >
                Comprobar
              </Button>
            </div>
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
              {isLastJoin ? 'Siguiente parte' : 'Formar otra palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'oracion' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca las palabras en orden para formar la oración correcta.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(brSentenceFormation.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

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

export default ActividadBrFinalPage