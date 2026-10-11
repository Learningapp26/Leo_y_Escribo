import { useRef, useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'
import Button from '../common/Button'
import Card from '../common/Card'
import LessonAudioButton from '../common/LessonAudioButton'
import BookLessonImage from './BookLessonImage'
import { playAudio } from '../../lib/audioPlayer'
import { registrarProgreso } from '../../lib/progreso'
import '../../styles/sound-boxes.css'

// Printed "one box per sound" exercise: the child taps the box where the
// lesson sound is heard and a dot appears, as in the book. Example items
// arrive already marked and cannot be changed.
function BookLessonSoundBoxes({ exercise, lesson, activityId, onNext, onCorrect, last }) {
  const [marks, setMarks] = useState({})
  const [wrong, setWrong] = useState([])
  const [feedback, setFeedback] = useState('')
  const checked = useRef(false)
  const pending = exercise.items.filter((item) => !item.example)
  const ready = pending.every((item) => marks[item.id] !== undefined)

  const mark = (item, box) => {
    if (checked.current || item.example) return
    setFeedback('')
    setWrong((current) => current.filter((id) => id !== item.id))
    setMarks((current) => ({ ...current, [item.id]: box }))
  }

  const check = () => {
    if (checked.current || !ready) return
    const misses = pending.filter((item) => marks[item.id] !== item.answer).map((item) => item.id)
    const correct = misses.length === 0
    checked.current = correct
    setWrong(misses)
    setFeedback(correct ? 'correct' : 'retry')
    registrarProgreso({ actividad: `${lesson.id}-${activityId}`, correcto: correct,
      detalle: { leccionId: lesson.id, ejercicioId: exercise.id, pagina: exercise.page, fallos: misses } })
    playAudio((correct ? lesson.feedback.correct : lesson.feedback.retry).src)
    if (correct) onCorrect()
  }

  const retry = () => {
    setMarks((current) => Object.fromEntries(Object.entries(current).filter(([id]) => !wrong.includes(id))))
    setWrong([])
    setFeedback('')
  }

  return (
    <Card className="selection-card">
      <div className="selection-instructions">
        <p className="text-instruction">{exercise.instruction.text}</p>
        <LessonAudioButton audio={exercise.instruction}>Escuchar instrucción</LessonAudioButton>
      </div>
      <ul className="sound-boxes">
        {exercise.items.map((item, itemIndex) => {
          const value = item.example ? item.answer : marks[item.id]
          const state = item.example ? 'example' : wrong.includes(item.id) ? 'wrong' : feedback === 'correct' ? 'correct' : ''
          return <li key={item.id} className={`sound-boxes__item${state ? ` sound-boxes__item--${state}` : ''}`}
            style={{ '--sound-boxes-color': `var(--sound-boxes-color-${itemIndex % 6})` }}>
            {item.example && <span className="sound-boxes__tag">Ejemplo</span>}
            <div className="sound-boxes__circle">
              <BookLessonImage src={item.image} alt={item.label} />
            </div>
            <div className="sound-boxes__row" role="group" aria-label={`Sonidos de ${item.example ? item.label : 'este dibujo'}`}>
              {Array.from({ length: item.boxes }, (_, box) => (
                <button key={box} type="button" className="sound-boxes__box" aria-pressed={value === box}
                  aria-label={`Sonido ${box + 1} de ${item.boxes}`} disabled={item.example || feedback === 'correct'}
                  onClick={() => mark(item, box)}>
                  {value === box && <span className="sound-boxes__dot" aria-hidden="true" />}
                </button>
              ))}
            </div>
            <LessonAudioButton audio={item.audio} aria-label={item.example ? `Escuchar ${item.label}` : 'Escuchar el nombre del dibujo'}>Escuchar</LessonAudioButton>
          </li>
        })}
      </ul>
      {feedback && <p className={`selection-feedback selection-feedback--${feedback}`} role="status">
        {feedback === 'correct' ? '¡Correcto! Puedes continuar.' : 'Revisa los dibujos marcados en rojo e inténtalo otra vez.'}
      </p>}
      {feedback === 'retry' && <Button variant="retry" icon={RotateCcw} onClick={retry}>Intentar nuevamente</Button>}
      {feedback !== 'correct' && <Button icon={Check} size="large" disabled={!ready} onClick={check}>Comprobar respuesta</Button>}
      {feedback === 'correct' && <Button size="large" icon={ArrowRight} iconPosition="right" onClick={onNext}>
        {last || 'Continuar'}
      </Button>}
    </Card>
  )
}

export default BookLessonSoundBoxes
