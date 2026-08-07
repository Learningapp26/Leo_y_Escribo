import { useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import { sSoundEndChoices, sSoundStartChoices } from '../data/sData'

import '../styles/selection.css'

const PHASES = ['conocer', 'inicio', 'final']

function getSelectionClass(id, selectedIds, feedback) {
  const isSelected = selectedIds.includes(id)

  if (!isSelected || !feedback) {
    return isSelected ? 'selection-button--selected' : ''
  }

  return feedback === 'correct'
    ? 'selection-button--correct'
    : 'selection-button--incorrect'
}

function SoundSelection({ choices, targetKey, instruction, onContinue, continueLabel }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [feedback, setFeedback] = useState('')
  const targetIds = choices.filter((item) => item[targetKey]).map((item) => item.id)

  const toggleChoice = (id) => {
    if (feedback === 'correct') return
    setFeedback('')
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const check = () => {
    const isCorrect =
      selectedIds.length === targetIds.length &&
      selectedIds.every((id) => targetIds.includes(id))
    setFeedback(isCorrect ? 'correct' : 'retry')
  }

  const retry = () => {
    setSelectedIds([])
    setFeedback('')
  }

  return (
    <Card className="selection-card">
      <div className="selection-instructions">
        <p className="text-instruction">{instruction}</p>
        <p>Escoge todas las respuestas correctas y luego comprueba.</p>
      </div>
      <div className="selection-options">
        {choices.map((item) => (
          <button
            className={['selection-button', getSelectionClass(item.id, selectedIds, feedback)]
              .filter(Boolean)
              .join(' ')}
            type="button"
            key={item.id}
            aria-pressed={selectedIds.includes(item.id)}
            onClick={() => toggleChoice(item.id)}
          >
            <img className="selection-image" src={item.image} alt="" />
            <span className="selection-word">{item.word}</span>
          </button>
        ))}
      </div>
      {feedback === 'correct' && (
        <p className="selection-feedback selection-feedback--correct" role="status">
          ¡Muy bien! Encontraste el sonido /s/.
        </p>
      )}
      {feedback === 'retry' && (
        <p className="selection-feedback selection-feedback--retry" role="status">
          Revisa cada palabra y prueba otra vez.
        </p>
      )}
      {feedback !== 'correct' && (
        <Button icon={Check} size="large" fullWidth disabled={!selectedIds.length} onClick={check}>
          Comprobar
        </Button>
      )}
      {feedback === 'retry' && (
        <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={retry}>
          Intentar nuevamente
        </Button>
      )}
      {feedback === 'correct' && (
        <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={onContinue}>
          {continueLabel}
        </Button>
      )}
    </Card>
  )
}

function ActividadSSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('s')
  const navigate = useNavigate()

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="s-sonidos-title">
      <BackButton label="Volver a la lección" to="/lecciones/s" />
      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>
        <h1 id="s-sonidos-title">Reconozcamos el sonido S</h1>
      </header>
      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />

      {phase === 'conocer' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">La letra S representa el sonido /s/.</p>
            <p>Haz el sonido suavemente: sss. Mira la S mayúscula y la s minúscula.</p>
          </div>
          <div className="selection-options">
            <div className="selection-button" aria-label="S mayúscula">
              <span className="text-word">S</span>
            </div>
            <div className="selection-button" aria-label="s minúscula">
              <span className="text-word">s</span>
            </div>
          </div>
          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={() => setPhaseIndex(1)}>
            Practicar palabras
          </Button>
        </Card>
      )}

      {phase === 'inicio' && (
        <SoundSelection
          choices={sSoundStartChoices}
          targetKey="startsWithS"
          instruction="Toca las palabras que empiezan con el sonido /s/."
          continueLabel="Buscar el sonido final"
          onContinue={() => setPhaseIndex(2)}
        />
      )}

      {phase === 'final' && (
        <SoundSelection
          choices={sSoundEndChoices}
          targetKey="endsWithS"
          instruction="Ahora toca las palabras que terminan con el sonido /s/."
          continueLabel="Siguiente actividad"
          onContinue={() => navigate('/actividad/s-silabas')}
        />
      )}
    </main>
  )
}

export default ActividadSSonidosPage
