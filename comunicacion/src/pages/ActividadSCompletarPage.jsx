import { useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import AudioPlaceholderButton from '../components/common/AudioPlaceholderButton'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import { sWordBuilding } from '../data/sData'
import { registrarProgreso } from '../lib/progreso'

import '../styles/completion.css'
import '../styles/selection.css'

function ActividadSCompletarPage() {
  const [wordIndex, setWordIndex] = useState(0)
  const [slots, setSlots] = useState([null, null])
  const [feedback, setFeedback] = useState('')
  const themeClass = getLessonThemeClass('s')
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
      detalle: { leccionId: 's', ejercicioId: item.id },
    })
  }

  const retry = () => {
    setSlots([null, null])
    setFeedback('')
  }

  const next = () => {
    setWordIndex((current) => current + 1)
    retry()
  }

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="s-completar-title">
      <BackButton label="Volver a la lección" to="/lecciones/s" />
      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>
        <h1 id="s-completar-title">Formamos palabras con S</h1>
      </header>
      <ProgressBar value={wordIndex + 1} max={sWordBuilding.length} label={`Palabra ${wordIndex + 1} de ${sWordBuilding.length}`} />

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
          <p className="selection-feedback selection-feedback--correct" role="status">
            ¡Muy bien! Formaste la palabra {item.word}.
          </p>
        )}
        {feedback === 'retry' && (
          <p className="selection-feedback selection-feedback--retry" role="status">
            Esas sílabas no forman la palabra. Prueba otro orden.
          </p>
        )}

        {feedback !== 'correct' && (
          <Button icon={Check} size="large" fullWidth disabled={!slots[0] || !slots[1]} onClick={check}>
            Comprobar palabra
          </Button>
        )}
        {feedback === 'retry' && (
          <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={retry}>
            Intentar nuevamente
          </Button>
        )}
        {feedback === 'correct' && !isLastWord && (
          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={next}>
            Formar otra palabra
          </Button>
        )}
        {feedback === 'correct' && isLastWord && (
          <Button to="/actividad/s-final" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
            Ir a la actividad final
          </Button>
        )}
      </Card>
    </main>
  )
}

export default ActividadSCompletarPage
