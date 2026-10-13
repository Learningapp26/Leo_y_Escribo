import { useRef, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Undo2 } from 'lucide-react'
import Button from '../common/Button'
import Card from '../common/Card'
import LessonAudioButton from '../common/LessonAudioButton'
import BookLessonImage from './BookLessonImage'
import { playAudio } from '../../lib/audioPlayer'
import { registrarProgreso } from '../../lib/progreso'

function BookLessonExercise({ exercise, lesson, activityId, onNext, onCorrect, last }) {
  const [selected, setSelected] = useState([])
  const [feedback, setFeedback] = useState('')
  const [practiced, setPracticed] = useState(false)
  const [groupChoices, setGroupChoices] = useState({})
  const checked = useRef(false)
  const { type, prompt, options = [] } = exercise
  const ordered = type === 'order'
  const passive = type === 'present' || type === 'oral'
  const answerText = selected.map((index) => options[index].label).join(exercise.separator ?? '')
  const groupsReady = !exercise.groups || exercise.groups.every((group) => groupChoices[group.id])

  const pick = (index) => {
    if (checked.current) return
    setFeedback('')
    setSelected((current) => {
      if (ordered) return current.includes(index) ? current : [...current, index]
      if (!exercise.multiple) return [index]
      return current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    })
    if (options[index].audio) playAudio(options[index].audio.src)
  }

  const check = () => {
    if (checked.current || !selected.length) return
    const expected = exercise.answersByIndex ?? options.flatMap((option, index) => exercise.answers?.includes(option.id) ? [index] : [])
    const correct = ordered ? answerText === exercise.answer
      : selected.length === expected.length && selected.every((index) => expected.includes(index))
    checked.current = correct
    setFeedback(correct ? 'correct' : 'retry')
    registrarProgreso({ actividad: `${lesson.id}-${activityId}`, correcto: correct,
      detalle: { leccionId: lesson.id, ejercicioId: exercise.id, pagina: exercise.page } })
    playAudio((correct ? exercise.resultAudio ?? lesson.feedback.correct : lesson.feedback.retry).src)
    if (correct) onCorrect()
  }

  return (
    <Card className={ordered ? 'completion-card' : 'selection-card'}>
      <div className="selection-instructions">
        <p className="text-instruction">{exercise.instruction.text}</p>
        <LessonAudioButton audio={exercise.instruction}>Escuchar instrucción</LessonAudioButton>
      </div>
      {exercise.letter && <p className="text-letter">{exercise.letter}</p>}
      {exercise.sound && <LessonAudioButton audio={exercise.sound} size="large">Escuchar el sonido de {lesson.letter}</LessonAudioButton>}
      {exercise.extraAudios?.map((audio) => <LessonAudioButton key={audio.src} audio={audio}>Escuchar los sonidos despacio</LessonAudioButton>)}
      {prompt && <>
        {prompt.image && <BookLessonImage key={prompt.image} featured src={prompt.image} alt={prompt.label} />}
        {!exercise.hideWord && <p className="text-word">{prompt.label}</p>}
        <LessonAudioButton audio={prompt.audio}>Escuchar {prompt.listenLabel ?? (exercise.hideWord ? 'la palabra' : prompt.label)}</LessonAudioButton>
      </>}
      {exercise.pattern && <p className="completion-word-pattern">{exercise.pattern}</p>}
      {type === 'present' && <div className="selection-options">
        {exercise.items.map((item) => <Card key={item.id}>
          {item.image && <BookLessonImage key={item.image} src={item.image} alt={item.label} />}
          <p className="text-reading">{item.label}</p>
          <LessonAudioButton audio={item.audio} aria-label={`Escuchar ${item.label}`}>Escuchar</LessonAudioButton>
        </Card>)}
      </div>}
      {ordered && <div className="completion-target" aria-live="polite" aria-label="Tu respuesta">
        <p className="text-word">{answerText || '…'}</p>
      </div>}
      {!passive && <div className={ordered ? `completion-bank${exercise.compactOptions ? ' completion-bank--letters' : ''}` : `selection-options selection-options--centered${exercise.showOptionLabels ? ' selection-options--labeled' : ''}`}>
        {options.map((option, index) => {
          const active = selected.includes(index)
          return <Card key={`${option.id}-${index}`} selected={active}>
            <Button variant={active && feedback === 'correct' ? 'correct' : 'secondary'} size="large" fullWidth
              aria-pressed={active} aria-disabled={feedback === 'correct'} disabled={ordered && active}
              onClick={() => pick(index)}>
              {option.image ? <><BookLessonImage key={option.image} src={option.image} alt={option.label} />{exercise.showOptionLabels && <span>{option.label}</span>}</>
                : option.label}
              {active && <Check aria-label="Seleccionado" size={20} />}
            </Button>
            {option.audio && <LessonAudioButton audio={option.audio} fullWidth
              aria-label={`Escuchar ${option.label}`}>
              {exercise.compactOptions ? null : 'Escuchar'}
            </LessonAudioButton>}
          </Card>
        })}
      </div>}
      {type === 'oral' && exercise.groups?.map((group) => <section className="word-choice-group" key={group.id} aria-labelledby={`group-${group.id}`}>
        <h2 id={`group-${group.id}`}>{group.label}</h2>
        <div className="selection-options selection-options--centered">
          {group.options.map((option) => <Card className="word-choice-option" key={option.id} selected={groupChoices[group.id] === option.id}>
            <Button variant="secondary" fullWidth aria-pressed={groupChoices[group.id] === option.id}
              onClick={() => { setGroupChoices((current) => ({ ...current, [group.id]: option.id })); setPracticed(false) }}>
              {option.label}{groupChoices[group.id] === option.id && <Check aria-label="Seleccionado" size={20} />}
            </Button>
            <LessonAudioButton audio={option.audio} aria-label={`Escuchar ${option.label}`}>{null}</LessonAudioButton>
          </Card>)}
        </div>
      </section>)}
      {exercise.groups && groupsReady && <p className="text-instruction" aria-live="polite">
        Forma tu oración con: {exercise.groups.map((group) => group.options.find((option) => option.id === groupChoices[group.id]).label).join(' · ')}.
      </p>}
      {ordered && feedback !== 'correct' && <Button variant="secondary" icon={Undo2} disabled={!selected.length}
        onClick={() => { setSelected((current) => current.slice(0, -1)); setFeedback('') }}>Quitar la última</Button>}
      {feedback && <p className={`selection-feedback selection-feedback--${feedback}`} role="status">
        {feedback === 'correct' ? '¡Correcto! Puedes continuar.' : 'Escucha de nuevo e inténtalo otra vez.'}
      </p>}
      {feedback === 'retry' && <Button variant="retry" icon={RotateCcw} onClick={() => { setSelected([]); setFeedback('') }}>Intentar nuevamente</Button>}
      {!passive && feedback !== 'correct' && <Button icon={Check} size="large" disabled={!selected.length || (ordered && selected.length !== options.length)} onClick={check}>Comprobar respuesta</Button>}
      {type === 'oral' && <Button variant="secondary" aria-pressed={practiced} disabled={!groupsReady} icon={Check} onClick={() => setPracticed(!practiced)}>Ya dije mi oración</Button>}
      {(feedback === 'correct' || (passive && (type !== 'oral' || practiced))) && <Button size="large" icon={ArrowRight} iconPosition="right" onClick={onNext}>
        {last || 'Continuar'}
      </Button>}
    </Card>
  )
}

export default BookLessonExercise
