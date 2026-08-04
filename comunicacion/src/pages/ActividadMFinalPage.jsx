import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import { mSyllableCaseSelection, mWordCounting } from '../data/mData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/syllables.css'
import '../styles/completion.css'

const PHASES = ['silaba', 'contar']

const totalExercises = mSyllableCaseSelection.length + mWordCounting.length

function ActividadMFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('m')

  // Fase 1: elegir la sílaba correcta (mayúscula o minúscula)
  const [caseIndex, setCaseIndex] = useState(0)
  const [selectedCaseSyllable, setSelectedCaseSyllable] = useState('')
  const [caseResult, setCaseResult] = useState('')

  const caseItem = mSyllableCaseSelection[caseIndex]

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
  }

  const retryCase = () => {
    setSelectedCaseSyllable('')
    setCaseResult('')
  }

  const nextCaseItem = () => {
    const isLast = caseIndex === mSyllableCaseSelection.length - 1

    setSelectedCaseSyllable('')
    setCaseResult('')

    if (isLast) {
      setPhaseIndex((current) => current + 1)
      return
    }

    setCaseIndex((current) => current + 1)
  }

  // Fase 2: contar palabras en una oración
  const [countIndex, setCountIndex] = useState(0)
  const [taggedWords, setTaggedWords] = useState([])
  const [countSelected, setCountSelected] = useState(null)
  const [countResult, setCountResult] = useState('')

  const countSentence = mWordCounting[countIndex]
  const isCountingComplete = taggedWords.length === countSentence.words.length

  const toggleWord = (position) => {
    if (countResult === 'correct') return

    setCountResult('')

    setTaggedWords((current) =>
      current.includes(position)
        ? current.filter((item) => item !== position)
        : [...current, position],
    )
  }

  const checkCount = () => {
    if (countSelected === null || !isCountingComplete) return

    const isCorrect = countSelected === countSentence.answer

    setCountResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) setStars((current) => current + 1)
  }

  const nextCountSentence = () => {
    const isLast = countIndex === mWordCounting.length - 1

    setTaggedWords([])
    setCountSelected(null)
    setCountResult('')

    if (isLast) {
      setFinished(true)
      return
    }

    setCountIndex((current) => current + 1)
  }

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <span className="finish-icon" aria-hidden="true">
            ⭐
          </span>

          <h1>¡Terminaste la lección de la letra M!</h1>

          <p className="text-instruction">
            Aprendiste el sonido /m/, sus sílabas ma, me, mi, mo, mu y
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
              playAudio('/audio/lecciones/m/felicitacion-final.mp3')
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
    <main className={`page ${themeClass}`} aria-labelledby="m-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/m" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>

        <h1 id="m-final-title">Practica todo lo aprendido</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      {phase === 'silaba' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Escucha el nombre y toca la sílaba correcta: con mayúscula si
            va al inicio de un nombre propio, o con minúscula si no.
          </p>

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
              {caseIndex === mSyllableCaseSelection.length - 1
                ? 'Siguiente parte'
                : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'contar' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Toca cada palabra de la oración para contarla. Luego elige
            cuántas palabras son.
          </p>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(countSentence.audio)}
          >
            Escuchar oración
          </Button>

          <div
            className="sentence-words"
            aria-label={countSentence.words.join(' ')}
          >
            {countSentence.words.map((word, position) => (
              <button
                className={[
                  'sentence-word-button',
                  'selection-button',
                  taggedWords.includes(position)
                    ? 'selection-button--selected'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={`${word}-${position}`}
                aria-pressed={taggedWords.includes(position)}
                onClick={() => toggleWord(position)}
              >
                <span className="selection-word">{word}</span>
              </button>
            ))}
          </div>

          {!isCountingComplete && (
            <p className="text-instruction">
              Toca todas las palabras antes de comprobar.
            </p>
          )}

          <div className="selection-options">
            {countSentence.options.map((option) => {
              const selected = countSelected === option

              const stateClass =
                countResult && selected
                  ? countResult === 'correct'
                    ? 'selection-button--correct'
                    : 'selection-button--incorrect'
                  : selected
                    ? 'selection-button--selected'
                    : ''

              return (
                <button
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={option}
                  aria-pressed={selected}
                  onClick={() => {
                    setCountSelected(option)
                    setCountResult('')
                  }}
                >
                  <span className="text-word">{option}</span>
                </button>
              )
            })}
          </div>

          {countResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! La oración tiene {countSentence.answer} palabras.
            </p>
          )}

          {countResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Cuenta otra vez cada palabra con cuidado.
            </p>
          )}

          {countResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={countSelected === null || !isCountingComplete}
              onClick={checkCount}
            >
              Comprobar
            </Button>
          )}

          {countResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setTaggedWords([])
                setCountSelected(null)
                setCountResult('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {countResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextCountSentence}
            >
              {countIndex === mWordCounting.length - 1
                ? 'Finalizar lección'
                : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadMFinalPage