import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import {
  bInitialSelectionInstructionAudio,
  bInitialSoundImages,
  bSoundIntro,
  bSoundSearchImages,
  bSoundSearchInstructionAudio,
} from '../data/bData'
import { getLessonThemeClass } from '../data/lessonColors'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'

const PHASES = ['presentacion', 'inicio', 'buscar']

function sameSelection(selectedIds, items, answerKey) {
  const answers = items.filter((item) => item[answerKey]).map((item) => item.id)
  return selectedIds.length === answers.length && answers.every((id) => selectedIds.includes(id))
}

function ActividadBSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [selectedIds, setSelectedIds] = useState([])
  const [feedback, setFeedback] = useState('')
  const [stars, setStars] = useState(0)
  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('b')

  const toggle = (item) => {
    if (feedback === 'correct') return
    setFeedback('')
    setSelectedIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
    playAudio(item.audio)
  }

  const check = (items, answerKey, exerciseId) => {
    const isCorrect = sameSelection(selectedIds, items, answerKey)
    setFeedback(isCorrect ? 'correct' : 'retry')
    registrarProgreso({
      actividad: 'b-sonidos',
      correcto: isCorrect,
      detalle: { leccionId: 'b', fase: phase, ejercicioId: exerciseId },
    })
    if (isCorrect) setStars((current) => current + 1)
  }

  const nextPhase = () => {
    setSelectedIds([])
    setFeedback('')
    setPhaseIndex((current) => current + 1)
  }

  const renderSelection = (items, answerKey, instruction, audio, exerciseId) => (
    <Card className="selection-card">
      <div className="selection-instructions">
        <p className="text-instruction">{instruction}</p>
        <Button variant="audio" icon={Volume2} onClick={() => playAudio(audio)} data-audio-src={audio}>
          Escuchar instrucción
        </Button>
      </div>

      <div className="selection-options">
        {items.map((item) => {
          const selected = selectedIds.includes(item.id)
          const stateClass = selected && feedback === 'correct'
            ? 'selection-button--correct'
            : selected && feedback === 'retry'
              ? 'selection-button--incorrect'
              : selected
                ? 'selection-button--selected'
                : ''

          return (
            <button
              className={['selection-button', stateClass].filter(Boolean).join(' ')}
              type="button"
              key={item.id}
              aria-pressed={selected}
              onClick={() => toggle(item)}
            >
              <img className="selection-image" src={item.image} alt={item.name} />
              <span className="selection-word">{item.name}</span>
            </button>
          )
        })}
      </div>

      {feedback === 'correct' && <p className="selection-feedback selection-feedback--correct" role="status">¡Muy bien! Elegiste todas las imágenes correctas.</p>}
      {feedback === 'retry' && <p className="selection-feedback selection-feedback--retry" role="status">Revisa las palabras y vuelve a intentarlo.</p>}

      {feedback !== 'correct' && <Button icon={Check} size="large" fullWidth disabled={!selectedIds.length} onClick={() => check(items, answerKey, exerciseId)}>Comprobar</Button>}
      {feedback === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSelectedIds([]); setFeedback('') }}>Intentar nuevamente</Button>}
      {feedback === 'correct' && phase !== 'buscar' && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextPhase}>Siguiente parte</Button>}
      {feedback === 'correct' && phase === 'buscar' && <Button to="/actividad/b-silabas" icon={ArrowRight} iconPosition="right" size="large" fullWidth>Practicar las sílabas</Button>}
    </Card>
  )

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="b-sounds-title">
      <BackButton label="Volver a la lección" to="/lecciones/b" />
      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>
        <h1 id="b-sounds-title">Escuchemos la letra B</h1>
      </header>
      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />
      <StarsCounter current={stars} total={2} label="Estrellas" />

      {phase === 'presentacion' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">Mira el dibujo y di su nombre despacio. Escucha la palabra banano y presta atención a la letra con la que empieza.</p>
            <Button variant="audio" icon={Volume2} onClick={() => playAudio(bSoundIntro.instructionAudio)} data-audio-src={bSoundIntro.instructionAudio}>Escuchar instrucción</Button>
          </div>
          <p className="text-letter" aria-label="B mayúscula y b minúscula">B b</p>
          <img className="selection-image selection-image--featured" src={bSoundIntro.mainWord.image} alt="Un banano pelado" />
          <p className="text-word">banano</p>
          <Button variant="audio" icon={Volume2} size="large" onClick={() => playAudio(bSoundIntro.mainWord.audio)}>Escuchar banano</Button>
          <Button variant="audio" icon={Volume2} onClick={() => playAudio(bSoundIntro.letterAudio)}>Escuchar la letra B</Button>
          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextPhase}>Continuar</Button>
        </Card>
      )}

      {phase === 'inicio' && renderSelection(
        bInitialSoundImages,
        'startsWithB',
        'Menciona en voz alta lo que muestran las imágenes. Toca las que empiezan con la misma letra que banano.',
        bInitialSelectionInstructionAudio,
        'inicio-b',
      )}

      {phase === 'buscar' && renderSelection(
        bSoundSearchImages,
        'hasB',
        'Nombra cada dibujo. Toca todas las figuras cuyo nombre lleva la letra B.',
        bSoundSearchInstructionAudio,
        'buscar-b',
      )}
    </main>
  )
}

export default ActividadBSonidosPage
