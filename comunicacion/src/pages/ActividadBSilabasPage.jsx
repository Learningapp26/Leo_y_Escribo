import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import {
  bSoundIntro,
  bSyllableAssociationInstructionAudio,
  bSyllableAssociations,
  bSyllableInstructionAudio,
  bSyllables,
  bWordSyllableExercises,
  bWordSyllableInstructionAudio,
} from '../data/bData'
import { getLessonThemeClass } from '../data/lessonColors'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'

const PHASES = ['letra', 'imagenes', 'palabras']
const totalExercises = bSyllableAssociations.length + bWordSyllableExercises.length

function ActividadBSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [feedback, setFeedback] = useState('')
  const [stars, setStars] = useState(0)
  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('b')
  const exercise = phase === 'imagenes'
    ? bSyllableAssociations[exerciseIndex]
    : bWordSyllableExercises[exerciseIndex]

  const choose = (syllable) => {
    if (feedback === 'correct') return
    setSelected(syllable)
    setFeedback('')
    playAudio(bSyllables.find((item) => item.syllable === syllable)?.audio)
  }

  const check = () => {
    const isCorrect = selected === exercise.answer
    setFeedback(isCorrect ? 'correct' : 'retry')
    registrarProgreso({
      actividad: 'b-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'b', fase: phase, ejercicioId: exercise.id },
    })
    if (isCorrect) setStars((current) => current + 1)
  }

  const next = () => {
    const list = phase === 'imagenes' ? bSyllableAssociations : bWordSyllableExercises
    setSelected('')
    setFeedback('')
    if (exerciseIndex === list.length - 1) {
      setExerciseIndex(0)
      setPhaseIndex((current) => current + 1)
      return
    }
    setExerciseIndex((current) => current + 1)
  }

  const renderExercise = (instruction, instructionAudio) => (
    <Card className="selection-card">
      <div className="selection-instructions">
        <p className="text-instruction">{instruction}</p>
        <Button variant="audio" icon={Volume2} onClick={() => playAudio(instructionAudio)} data-audio-src={instructionAudio}>Escuchar instrucción</Button>
      </div>

      {phase === 'imagenes' && (
        <>
          <img className="selection-image selection-image--featured" src={exercise.image} alt={exercise.word} />
          <Button variant="audio" icon={Volume2} onClick={() => playAudio(exercise.audio)}>Escuchar {exercise.word}</Button>
        </>
      )}
      {phase === 'palabras' && <p className="text-word">{exercise.word}</p>}

      <div className="completion-bank">
        {bSyllables.map((item) => {
          const isSelected = selected === item.syllable
          const stateClass = isSelected && feedback === 'correct'
            ? 'completion-correct'
            : isSelected && feedback === 'retry'
              ? 'completion-incorrect'
              : isSelected
                ? 'completion-active'
                : ''
          return <Button key={item.syllable} variant="secondary" className={['completion-chip', 'text-syllable', stateClass].filter(Boolean).join(' ')} aria-pressed={isSelected} onClick={() => choose(item.syllable)}>{item.syllable}</Button>
        })}
      </div>

      {feedback === 'correct' && <p className="selection-feedback selection-feedback--correct" role="status">¡Correcto! La sílaba es {exercise.answer}.</p>}
      {feedback === 'retry' && <p className="selection-feedback selection-feedback--retry" role="status">Esa no es la sílaba correcta. Mira y escucha otra vez.</p>}
      {feedback !== 'correct' && <Button icon={Check} size="large" fullWidth disabled={!selected} onClick={check}>Comprobar</Button>}
      {feedback === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSelected(''); setFeedback('') }}>Intentar nuevamente</Button>}
      {feedback === 'correct' && phase === 'palabras' && exerciseIndex === bWordSyllableExercises.length - 1
        ? <Button to="/actividad/b-completar" icon={ArrowRight} iconPosition="right" size="large" fullWidth>Ir a completar palabras</Button>
        : feedback === 'correct' && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={next}>Siguiente</Button>}
    </Card>
  )

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="b-syllables-title">
      <BackButton label="Volver a la lección" to="/lecciones/b" />
      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>
        <h1 id="b-syllables-title">La B y sus sílabas</h1>
      </header>
      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />
      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      {phase === 'letra' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">Fíjate bien en la B mayúscula y la b minúscula. Después, escucha cómo se combina la b con cada vocal.</p>
            <Button variant="audio" icon={Volume2} onClick={() => playAudio(bSyllableInstructionAudio)} data-audio-src={bSyllableInstructionAudio}>Escuchar instrucción</Button>
          </div>
          <p className="text-letter" aria-label="B mayúscula y b minúscula">B b</p>
          <Button variant="audio" icon={Volume2} onClick={() => playAudio(bSoundIntro.letterAudio)}>Escuchar la letra B</Button>
          <div className="completion-bank">
            {bSyllables.map((item) => <Button key={item.syllable} variant="secondary" className="completion-chip text-syllable" onClick={() => playAudio(item.audio)}>{item.syllable}</Button>)}
          </div>
          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={() => setPhaseIndex(1)}>Continuar con las imágenes</Button>
        </Card>
      )}

      {phase === 'imagenes' && renderExercise('Observa el dibujo, escucha su nombre y elige la sílaba con la que empieza.', bSyllableAssociationInstructionAudio)}
      {phase === 'palabras' && renderExercise('Lee la palabra y toca la sílaba con B que aparece en ella.', bWordSyllableInstructionAudio)}
    </main>
  )
}

export default ActividadBSilabasPage
