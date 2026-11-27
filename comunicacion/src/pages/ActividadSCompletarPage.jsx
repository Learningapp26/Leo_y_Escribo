import ActivityFeedback from '../components/common/ActivityFeedback'
import { useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import AudioPlaceholderButton from '../components/common/AudioPlaceholderButton'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import { sLetterRemoval, sWordBuilding } from '../data/sData'
import { registrarProgreso } from '../lib/progreso'

import '../styles/completion.css'
import '../styles/selection.css'

const PHASES = ['formar', 'quitar']

function ActividadSCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('s')

  // Fase 1: formar palabras con dos sílabas
  const [wordIndex, setWordIndex] = useState(0)
  const [slots, setSlots] = useState([null, null])
  const [feedback, setFeedback] = useState('')
  const item = sWordBuilding[wordIndex]
  const isLastWord = wordIndex === sWordBuilding.length - 1

  const isUsed = (optionIndex) => slots.some((slot) => slot?.optionIndex === optionIndex)

  const choose = (syllable, optionIndex) => {
    if (feedback === 'correct') return
    setFeedback('')

    if (isUsed(optionIndex)) {
      setSlots((current) => current.map((slot) => (slot?.optionIndex === optionIndex ? null : slot)))
      return
    }

    setSlots((current) => {
      const emptyIndex = current.findIndex((slot) => slot === null)
      if (emptyIndex === -1) return current
      const nextSlots = [...current]
      nextSlots[emptyIndex] = { syllable, optionIndex }
      return nextSlots
    })
  }

  const check = () => {
    if (!slots[0] || !slots[1]) return

    const isCorrect = slots.map((slot) => slot.syllable).join('') === item.word

    setFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 's-completar',
      correcto: isCorrect,
      detalle: { leccionId: 's', fase: 'formar', ejercicioId: item.id },
    })
  }

  const retry = () => {
    setSlots([null, null])
    setFeedback('')
  }

  const next = () => {
    retry()
    if (isLastWord) {
      setPhaseIndex(1)
      return
    }
    setWordIndex((current) => current + 1)
  }

  // Fase 2: quitar la letra resaltada y elegir la palabra que queda
  const [removeIndex, setRemoveIndex] = useState(0)
  const [selectedWord, setSelectedWord] = useState('')
  const [removeFeedback, setRemoveFeedback] = useState('')
  const removal = sLetterRemoval[removeIndex]
  const isLastRemoval = removeIndex === sLetterRemoval.length - 1

  const checkRemoval = () => {
    if (!selectedWord) return
    const isCorrect = selectedWord === removal.answer

    setRemoveFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 's-completar',
      correcto: isCorrect,
      detalle: { leccionId: 's', fase: 'quitar', ejercicioId: removal.id },
    })
  }

  const resetRemoval = () => {
    setSelectedWord('')
    setRemoveFeedback('')
  }

  const nextRemoval = () => {
    resetRemoval()
    setRemoveIndex((current) => current + 1)
  }

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="s-completar-title">
      <BackButton label="Volver a la lección" to="/lecciones/s" />
      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>
        <h1 id="s-completar-title">Formamos palabras con S</h1>
      </header>
      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />

      {phase === 'formar' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">Toca dos sílabas en orden para formar una palabra.</p>
            <p>Si cambias de idea, toca nuevamente una sílaba para quitarla.</p>
            <AudioPlaceholderButton>Escuchar instrucción</AudioPlaceholderButton>
          </div>

          <p className="completion-word-pattern" aria-live="polite" aria-label="Palabra formada">
            {slots[0]?.syllable ?? '__'} {slots[1]?.syllable ?? '__'}
          </p>

          <div className="selection-options">
            {item.options.map((syllable, optionIndex) => {
              const selected = isUsed(optionIndex)
              const stateClass =
                feedback === 'correct' && selected
                  ? 'selection-button--correct'
                  : selected
                    ? 'selection-button--selected'
                    : ''
              return (
                <button
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={`${syllable}-${optionIndex}`}
                  aria-pressed={selected}
                  onClick={() => choose(syllable, optionIndex)}
                >
                  <span className="text-syllable">{syllable}</span>
                </button>
              )
            })}
          </div>

          {feedback === 'correct' && (
            <ActivityFeedback correct message={<>
              ¡Muy bien! Formaste la palabra {item.word}.
            </>} />
          )}
          {feedback === 'retry' && (
            <ActivityFeedback correct={false} message={<>
              Esas sílabas no forman la palabra. Prueba otro orden.
            </>} />
          )}

          {!feedback && (
            <Button icon={Check} size="large" fullWidth disabled={!slots[0] || !slots[1]} onClick={check}>
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
              {isLastWord ? 'Siguiente parte' : 'Formar otra palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'quitar' && (
        <Card className="completion-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Lee la palabra. Quita la letra resaltada y elige la palabra nueva
              que se forma.
            </p>
            <AudioPlaceholderButton>Escuchar instrucción</AudioPlaceholderButton>
          </div>

          <div className="completion-bank" role="img" aria-label={`Letras: ${removal.letters.join(' ')}. Se quita la letra ${removal.letters[removal.removeIndex]}.`}>
            {removal.letters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={[
                  'completion-chip',
                  'text-word',
                  index === removal.removeIndex ? 'completion-active' : '',
                ].filter(Boolean).join(' ')}
              >
                {letter}
              </span>
            ))}
          </div>

          <p className="text-instruction">
            Quita la letra <strong>{removal.letters[removal.removeIndex]}</strong>.
          </p>

          <div className="selection-options">
            {removal.options.map((word) => {
              const selected = selectedWord === word
              const stateClass = selected && removeFeedback === 'correct'
                ? 'selection-button--correct'
                : selected && removeFeedback === 'retry'
                  ? 'selection-button--incorrect'
                  : selected
                    ? 'selection-button--selected'
                    : ''
              return (
                <button
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  type="button"
                  key={word}
                  aria-pressed={selected}
                  onClick={() => {
                    if (removeFeedback === 'correct') return
                    setSelectedWord(word)
                    setRemoveFeedback('')
                  }}
                >
                  <span className="text-word">{word}</span>
                </button>
              )
            })}
          </div>

          {removeFeedback === 'correct' && (
            <ActivityFeedback correct message={<>
              ¡Muy bien! Sin esa letra queda la palabra {removal.answer}.
            </>} />
          )}
          {removeFeedback === 'retry' && (
            <ActivityFeedback correct={false} message={<>
              Esa no es la palabra. Lee las letras que quedan.
            </>} />
          )}

          {!removeFeedback && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedWord} onClick={checkRemoval}>
              Comprobar palabra
            </Button>
          )}
          {removeFeedback === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={resetRemoval}>
              Intentar nuevamente
            </Button>
          )}
          {removeFeedback === 'correct' && !isLastRemoval && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextRemoval}>
              Siguiente palabra
            </Button>
          )}
          {removeFeedback === 'correct' && isLastRemoval && (
            <Button to="/actividad/s-final" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
              Ir a la actividad final
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadSCompletarPage