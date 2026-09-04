import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {tCaseSelectionInstructionAudio, tSentenceFormation, tSyllableCaseSelection, tWordJoin, } from '../data/tData'
import { playAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['silaba', 'formar']

const totalExercises = tSyllableCaseSelection.length + tWordJoin.length

function ActividadTFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('t')

  // Fase 1: elegir la sílaba correcta (mayúscula o minúscula)
  const [caseIndex, setCaseIndex] = useState(0)
  const [selectedCaseSyllable, setSelectedCaseSyllable] = useState('')
  const [caseResult, setCaseResult] = useState('')

  const caseItem = tSyllableCaseSelection[caseIndex]
  const isLastCase = caseIndex === tSyllableCaseSelection.length - 1

  const pickCaseSyllable = (option) => {
    if (caseResult === 'correct') return

    playAudio(option.audio)
    setCaseResult('')
    setSelectedCaseSyllable(option.syllable)
  }

  const checkCase = () => {
    if (!selectedCaseSyllable) return

    const option = caseItem.options.find(
      (item) => item.syllable === selectedCaseSyllable,
    )

    const isCorrect = Boolean(option?.isCorrect)

    setCaseResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) setStars((current) => current + 1)

    registrarProgreso({
      actividad: 't-final',
      correcto: isCorrect,
      detalle: { leccionId: 't', fase: 'silaba', ejercicioId: caseItem.id },
    })
  }

  const retryCase = () => {
    setSelectedCaseSyllable('')
    setCaseResult('')
  }

  const nextCaseItem = () => {
    setSelectedCaseSyllable('')
    setCaseResult('')

    if (isLastCase) {
      setPhaseIndex((current) => current + 1)
      return
    }

    setCaseIndex((current) => current + 1)
  }

  // Fase 2: formar la oración correcta con el banco de palabras
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [placedIndices, setPlacedIndices] = useState([])
  const [sentenceResult, setSentenceResult] = useState('')

  const sentenceItem = tWordJoin[sentenceIndex]
  const isLastSentence = sentenceIndex === tWordJoin.length - 1
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
      actividad: 't-final',
      correcto: isCorrect,
      detalle: { leccionId: 't', fase: 'formar', ejercicioId: sentenceItem.id },
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
    if (finished) registrarLeccionCompletada('t')
  }, [finished])

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <span className="finish-icon" aria-hidden="true">
            ⭐
          </span>

          <h1>¡Terminaste la lección de la letra T!</h1>

          <p className="text-instruction">
            Aprendiste el sonido /t/, sus sílabas ta, te, ti, to, tu y
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
              playAudio('/audio/lecciones/t/felicitacion-final.mp3')
            }
          >
            Escuchar felicitación
          </Button>

          <Button
            to="/lecciones/unidad/1"
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
    <main className={`page ${themeClass}`} aria-labelledby="t-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/t" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>

        <h1 id="t-final-title">Practica todo lo aprendido</h1>
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
              Escucha el nombre y toca la sílaba correcta. Recuerda que es
              con mayúscula si va al inicio de un nombre propio, o con
              minúscula si no.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(tCaseSelectionInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={caseItem.image}
            alt={caseItem.name}
          />

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(caseItem.wordAudio)}
          >
            Escuchar palabra
          </Button>

          <p className="completion-word-pattern">{caseItem.pattern}</p>

          <div className="syllables-options">
            {caseItem.options.map((option) => {
              const isSelected = selectedCaseSyllable === option.syllable

              const stateClass =
                caseResult && isSelected
                  ? caseResult === 'correct'
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
                  onClick={() => pickCaseSyllable(option)}
                >
                  {option.syllable}
                </button>
              )
            })}
          </div>

          {caseResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! Se escribe {caseItem.name}.
            </p>
          )}

          {caseResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa no es la sílaba correcta. Escucha otra vez.
            </p>
          )}

          {caseResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedCaseSyllable}
              onClick={checkCase}
            >
              Comprobar
            </Button>
          )}

          {caseResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryCase}
            >
              Intentar nuevamente
            </Button>
          )}

          {caseResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextCaseItem}
            >
              {isLastCase ? 'Siguiente parte' : 'Siguiente palabra'}
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
              onClick={() => playAudio(tSentenceFormation.instructionAudio)}
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

export default ActividadTFinalPage