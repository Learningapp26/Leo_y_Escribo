import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import {
  bCompletionExercises,
  bCompletionInstructionAudio,
  bJoinExercises,
  bJoinInstructionAudio,
  bSyllables,
} from '../data/bData'
import { getLessonThemeClass } from '../data/lessonColors'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = ['completar', 'formar']
const totalExercises = bCompletionExercises.length + bJoinExercises.length

function ActividadBCompletarPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [feedback, setFeedback] = useState('')
  const [stars, setStars] = useState(0)
  const phase = PHASES[phaseIndex]
  const list = phase === 'completar' ? bCompletionExercises : bJoinExercises
  const exercise = list[exerciseIndex]
  const themeClass = getLessonThemeClass('b')
  const options = phase === 'completar'
    ? bSyllables.map((item) => item.syllable)
    : exercise.options

  const check = () => {
    const isCorrect = selected === exercise.answer
    setFeedback(isCorrect ? 'correct' : 'retry')
    registrarProgreso({
      actividad: 'b-completar',
      correcto: isCorrect,
      detalle: { leccionId: 'b', fase: phase, ejercicioId: exercise.id },
    })
    if (isCorrect) {
      setStars((current) => current + 1)
      playAudio(exercise.audio)
    }
  }

  const next = () => {
    setSelected('')
    setFeedback('')
    if (exerciseIndex === list.length - 1) {
      setExerciseIndex(0)
      setPhaseIndex(1)
      return
    }
    setExerciseIndex((current) => current + 1)
  }

  const pattern = exercise.missingAtEnd
    ? `${exercise.visiblePart}___`
    : `___${exercise.visiblePart}`

  return (
    <main className={`page completion-page ${themeClass}`} aria-labelledby="b-completion-title">
      <BackButton label="Volver a la lección" to="/lecciones/b" />
      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>
        <h1 id="b-completion-title">Completemos palabras</h1>
      </header>
      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />
      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      <Card className="completion-card">
        <div className="completion-instructions">
          <p className="text-instruction">
            {phase === 'completar'
              ? 'Nombra el dibujo lentamente y elige la sílaba que falta para completar la palabra.'
              : 'Observa el dibujo y une la primera sílaba con la terminación correcta para formar su nombre.'}
          </p>
          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(phase === 'completar' ? bCompletionInstructionAudio : bJoinInstructionAudio)}
            data-audio-src={phase === 'completar' ? bCompletionInstructionAudio : bJoinInstructionAudio}
          >
            Escuchar instrucción
          </Button>
        </div>

        <img className="completion-word-image" src={exercise.image} alt={exercise.word} />
        <Button variant="audio" icon={Volume2} onClick={() => playAudio(exercise.audio)}>Escuchar {exercise.word}</Button>
        <p className="completion-word-pattern">
          {phase === 'completar'
            ? pattern.replace('___', selected || '___')
            : `${exercise.firstSyllable} + ${selected || '___'}`}
        </p>

        <div className="completion-bank">
          {options.map((option) => {
            const isSelected = selected === option
            const stateClass = isSelected && feedback === 'correct'
              ? 'completion-correct'
              : isSelected && feedback === 'retry'
                ? 'completion-incorrect'
                : isSelected
                  ? 'completion-active'
                  : ''
            return (
              <Button
                key={option}
                variant="secondary"
                className={['completion-chip', 'text-syllable', stateClass].filter(Boolean).join(' ')}
                aria-pressed={isSelected}
                onClick={() => { if (feedback === 'correct') return; setSelected(option); setFeedback('') }}
              >
                {option}
              </Button>
            )
          })}
        </div>

        {feedback === 'correct' && <p className="selection-feedback selection-feedback--correct" role="status">¡Muy bien! Formaste la palabra {exercise.word}.</p>}
        {feedback === 'retry' && <p className="selection-feedback selection-feedback--retry" role="status">Esa sílaba no forma el nombre del dibujo. Intenta nuevamente.</p>}
        {feedback !== 'correct' && <Button icon={Check} size="large" fullWidth disabled={!selected} onClick={check}>Comprobar palabra</Button>}
        {feedback === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSelected(''); setFeedback('') }}>Intentar nuevamente</Button>}
        {feedback === 'correct' && phase === 'formar' && exerciseIndex === bJoinExercises.length - 1
          ? <Button to="/actividad/b-final" icon={ArrowRight} iconPosition="right" size="large" fullWidth>Ir a la actividad final</Button>
          : feedback === 'correct' && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={next}>{phase === 'completar' && exerciseIndex === bCompletionExercises.length - 1 ? 'Siguiente parte' : 'Siguiente palabra'}</Button>}
      </Card>
    </main>
  )
}

export default ActividadBCompletarPage
