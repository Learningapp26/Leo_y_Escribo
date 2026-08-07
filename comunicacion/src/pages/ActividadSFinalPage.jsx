import { useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import { sFinalActivities } from '../data/sData'

import '../styles/completion.css'
import '../styles/selection.css'

const PHASES = ['sonido', 'silaba', 'palabra', 'lectura']

function ActividadSFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [wordSlots, setWordSlots] = useState([null, null])
  const [feedback, setFeedback] = useState('')
  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)
  const themeClass = getLessonThemeClass('s')
  const phase = PHASES[phaseIndex]

  const resetAnswer = () => {
    setSelected('')
    setWordSlots([null, null])
    setFeedback('')
  }

  const retry = () => resetAnswer()

  const checkChoice = (answer) => {
    const isCorrect = selected === answer
    setFeedback(isCorrect ? 'correct' : 'retry')
    if (isCorrect) setStars((current) => current + 1)
  }

  const next = () => {
    if (phaseIndex === PHASES.length - 1) {
      setFinished(true)
      return
    }
    resetAnswer()
    setPhaseIndex((current) => current + 1)
  }

  const chooseWordSyllable = (syllable, optionIndex) => {
    if (feedback === 'correct') return
    setFeedback('')
    const alreadyUsed = wordSlots.some((slot) => slot?.optionIndex === optionIndex)

    if (alreadyUsed) {
      setWordSlots((current) => current.map((slot) => (slot?.optionIndex === optionIndex ? null : slot)))
      return
    }

    setWordSlots((current) => {
      const emptyIndex = current.findIndex((slot) => slot === null)
      if (emptyIndex === -1) return current
      const nextSlots = [...current]
      nextSlots[emptyIndex] = { syllable, optionIndex }
      return nextSlots
    })
  }

  const checkWord = () => {
    const formed = wordSlots.map((slot) => slot?.syllable ?? '').join('')
    const isCorrect = formed === sFinalActivities.word.word
    setFeedback(isCorrect ? 'correct' : 'retry')
    if (isCorrect) setStars((current) => current + 1)
  }

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <span className="finish-icon" aria-hidden="true">⭐</span>
          <h1>¡Terminaste la lección de la letra S!</h1>
          <p className="text-instruction">
            Practicaste el sonido /s/, las sílabas sa, se, si, so y su, y palabras sencillas.
          </p>
          <StarsCounter current={stars} total={PHASES.length} label="Estrellas" />
          <Button to="/lecciones" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
            Volver a las lecciones
          </Button>
        </Card>
      </main>
    )
  }

  const showChoiceStage = (activity) => (
    <Card className="selection-card">
      <div className="selection-instructions">
        <p className="text-instruction">{activity.prompt}</p>
        {'pattern' in activity && <p className="completion-word-pattern">{activity.pattern}</p>}
        {'sentence' in activity && <p className="text-reading">{activity.sentence}</p>}
      </div>
      <div className="selection-options">
        {activity.options.map((option) => {
          const stateClass =
            feedback && selected === option
              ? feedback === 'correct'
                ? 'selection-button--correct'
                : 'selection-button--incorrect'
              : selected === option
                ? 'selection-button--selected'
                : ''
          return (
            <button
              className={['selection-button', stateClass].filter(Boolean).join(' ')}
              type="button"
              key={option}
              aria-pressed={selected === option}
              onClick={() => {
                if (feedback === 'correct') return
                setSelected(option)
                setFeedback('')
              }}
            >
              <span className="text-word">{option}</span>
            </button>
          )
        })}
      </div>
      {feedback === 'correct' && (
        <p className="selection-feedback selection-feedback--correct" role="status">
          ¡Correcto! {activity.word ? `La palabra es ${activity.word}.` : '¡Sigue así!'}
        </p>
      )}
      {feedback === 'retry' && (
        <p className="selection-feedback selection-feedback--retry" role="status">
          Revisa tu respuesta e inténtalo otra vez.
        </p>
      )}
      {feedback !== 'correct' && (
        <Button icon={Check} size="large" fullWidth disabled={!selected} onClick={() => checkChoice(activity.answer)}>
          Comprobar
        </Button>
      )}
      {feedback === 'retry' && (
        <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={retry}>
          Intentar nuevamente
        </Button>
      )}
      {feedback === 'correct' && (
        <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={next}>
          {phaseIndex === PHASES.length - 1 ? 'Finalizar lección' : 'Siguiente parte'}
        </Button>
      )}
    </Card>
  )

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="s-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/s" />
      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>
        <h1 id="s-final-title">Practica todo lo aprendido</h1>
      </header>
      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />
      <StarsCounter current={stars} total={PHASES.length} label="Estrellas" />

      {phase === 'sonido' && showChoiceStage(sFinalActivities.sound)}
      {phase === 'silaba' && showChoiceStage(sFinalActivities.syllable)}
      {phase === 'lectura' && showChoiceStage(sFinalActivities.reading)}

      {phase === 'palabra' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">{sFinalActivities.word.prompt}</p>
          </div>
          <p className="completion-word-pattern" aria-live="polite">
            {wordSlots[0]?.syllable ?? '__'} {wordSlots[1]?.syllable ?? '__'}
          </p>
          <div className="selection-options">
            {sFinalActivities.word.options.map((syllable, optionIndex) => {
              const selectedSyllable = wordSlots.some((slot) => slot?.optionIndex === optionIndex)
              const stateClass =
                feedback === 'correct' && selectedSyllable
                  ? 'selection-button--correct'
                  : selectedSyllable
                    ? 'selection-button--selected'
                    : ''
              return (
                <button
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={`${syllable}-${optionIndex}`}
                  aria-pressed={selectedSyllable}
                  onClick={() => chooseWordSyllable(syllable, optionIndex)}
                >
                  <span className="text-syllable">{syllable}</span>
                </button>
              )
            })}
          </div>
          {feedback === 'correct' && (
            <p className="selection-feedback selection-feedback--correct" role="status">
              ¡Correcto! Formaste la palabra {sFinalActivities.word.word}.
            </p>
          )}
          {feedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Prueba otro orden de sílabas.
            </p>
          )}
          {feedback !== 'correct' && (
            <Button icon={Check} size="large" fullWidth disabled={!wordSlots[0] || !wordSlots[1]} onClick={checkWord}>
              Comprobar palabra
            </Button>
          )}
          {feedback === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={retry}>
              Intentar nuevamente
            </Button>
          )}
          {feedback === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={next}>
              Siguiente parte
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadSFinalPage
