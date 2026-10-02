import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  crJoinInstructionAudio,
  crSentenceFormation,
  crSyllableJoin,
  crWordJoin,
} from '../data/crData'
import { playAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

// Mezcla las sílabas para que no aparezcan siempre en el orden correcto.
// (sort(() => Math.random() - 0.5) no mezcla bien, por eso Fisher-Yates.)
function shuffle(items) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

const PHASES = ['ordenar', 'oracion']

const totalExercises = crSyllableJoin.length + crWordJoin.length

function ActividadCrFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('cr')

  // Fase 1: ordenar las sílabas para formar la palabra
  const [joinIndex, setJoinIndex] = useState(0)
  const [pickedSyllables, setPickedSyllables] = useState([])
  const [shuffledOptions, setShuffledOptions] = useState(() =>
    shuffle(crSyllableJoin[0].syllables),
  )
  const [joinResult, setJoinResult] = useState('')

  const joinItem = crSyllableJoin[joinIndex]
  const isLastJoin = joinIndex === crSyllableJoin.length - 1
  const isJoinFull = pickedSyllables.length === joinItem.syllables.length

  const pickSyllable = (syllable) => {
    if (joinResult === 'correct') return
    if (pickedSyllables.length >= joinItem.syllables.length) return

    setJoinResult('')
    setPickedSyllables((current) => [...current, syllable])
  }

  const removeLastSyllable = () => {
    if (joinResult === 'correct') return

    setPickedSyllables((current) => current.slice(0, -1))
    setJoinResult('')
  }

  const checkJoin = () => {
    if (!isJoinFull) return

    const isCorrect = pickedSyllables.every(
      (syllable, index) => syllable === joinItem.syllables[index],
    )

    setJoinResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) {
      playAudio(joinItem.audio)
      setStars((current) => current + 1)
    }

    registrarProgreso({
      actividad: 'cr-final',
      correcto: isCorrect,
      detalle: { leccionId: 'cr', fase: 'ordenar', ejercicioId: joinItem.id },
    })
  }

  const retryJoin = () => {
    setPickedSyllables([])
    setJoinResult('')
  }

  const nextJoinItem = () => {
    setPickedSyllables([])
    setJoinResult('')

    if (isLastJoin) {
      setPhaseIndex((current) => current + 1)
      return
    }

    const nextIndex = joinIndex + 1

    setJoinIndex(nextIndex)
    setShuffledOptions(shuffle(crSyllableJoin[nextIndex].syllables))
  }

  // Fase 2: formar la oración correcta con el banco de palabras
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [placedIndices, setPlacedIndices] = useState([])
  const [sentenceResult, setSentenceResult] = useState('')

  const sentenceItem = crWordJoin[sentenceIndex]
  const isLastSentence = sentenceIndex === crWordJoin.length - 1
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
      actividad: 'cr-final',
      correcto: isCorrect,
      detalle: {
        leccionId: 'cr',
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
    if (finished) registrarLeccionCompletada('cr')
  }, [finished])

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <span className="finish-icon" aria-hidden="true">
            ⭐
          </span>

          <h1>¡Terminaste la lección de la combinación CR!</h1>

          <p className="text-instruction">
            Aprendiste el sonido /cr/, sus sílabas cra, cre, cri, cro, cru y
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
              playAudio('/audio/lecciones/cr/felicitacion-final.mp3')
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
    <main className={`page ${themeClass}`} aria-labelledby="cr-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/cr" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>

        <h1 id="cr-final-title">Practica todo lo aprendido</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      {phase === 'ordenar' && (
        <Card className="completion-card">
          <div className="completion-instructions">
            <p className="text-instruction">
              Escucha la palabra. Toca las sílabas en orden para formarla.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(crJoinInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(joinItem.audio)}
          >
            Escuchar palabra
          </Button>

          <p aria-live="polite" className="completion-words-sentence">
            {joinItem.syllables.map((_, position) => {
              const picked = pickedSyllables[position]

              return (
                <span
                  key={position}
                  className={[
                    'completion-word-slot',
                    picked ? 'filled' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {picked ?? '__'}
                </span>
              )
            })}
          </p>

          <div className="completion-bank">
            {shuffledOptions.map((syllable, position) => (
              <button
                className="completion-chip text-syllable"
                type="button"
                key={`${syllable}-${position}`}
                disabled={
                  pickedSyllables.length >= joinItem.syllables.length ||
                  joinResult === 'correct'
                }
                onClick={() => pickSyllable(syllable)}
              >
                {syllable}
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
              Esas sílabas no forman {joinItem.word}. Inténtalo de nuevo.
            </p>
          )}

          {joinResult !== 'correct' && (
            <div className="activity-navigation">
              <Button
                variant="secondary"
                icon={RotateCcw}
                fullWidth
                disabled={pickedSyllables.length === 0}
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
              onClick={() => playAudio(crSentenceFormation.instructionAudio)}
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

export default ActividadCrFinalPage
