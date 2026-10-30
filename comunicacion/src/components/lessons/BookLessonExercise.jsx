import { formatLetterGroup } from '../../data/lessonLabels'
import { useRef, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Undo2 } from 'lucide-react'
import Button from '../common/Button'
import Card from '../common/Card'
import LessonAudioButton from '../common/LessonAudioButton'
import BookLessonImage from './BookLessonImage'
import VoiceRecorder from './VoiceRecorder'
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
  const Group = type === 'match' ? Card : 'section'
  const answerText = selected.map((index) => options[index].label).join(exercise.separator ?? '')
  const groupsReady = (!exercise.groups || exercise.groups.every((group) => groupChoices[group.id]))
    && (!exercise.selectionCount || selected.length === exercise.selectionCount)

  const pick = (index) => {
    if (checked.current) return
    setFeedback('')
    setPracticed(false)
    setSelected((current) => {
      if (ordered) return current.includes(index) ? current : [...current, index]
      if (!exercise.multiple) return [index]
      return current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    })
    if (options[index].audio && options[index].audio.available !== false) playAudio(options[index].audio.src)
  }

  const check = () => {
    if (checked.current || (type === 'match' ? !groupsReady : !selected.length)) return
    const expected = exercise.answersByIndex ?? options.flatMap((option, index) => exercise.answers?.includes(option.id) ? [index] : [])
    const correct = type === 'match' ? exercise.groups.every((group) => groupChoices[group.id] === group.answer)
      : ordered ? (exercise.answerIds
        ? selected.map((index) => options[index].id).join('|') === exercise.answerIds.join('|')
        : answerText === exercise.answer)
      : selected.length === expected.length && selected.every((index) => expected.includes(index))
    checked.current = correct
    setFeedback(correct ? 'correct' : 'retry')
    registrarProgreso({ actividad: `${lesson.id}-${activityId}`, correcto: correct,
      detalle: { leccionId: lesson.id, ejercicioId: exercise.id, pagina: exercise.page } })
    const feedbackAudio = correct ? exercise.resultAudio ?? lesson.feedback.correct : lesson.feedback.retry
    if (feedbackAudio.available !== false) playAudio(feedbackAudio.src)
    if (correct) onCorrect()
  }

  return (
    <Card className={ordered ? 'completion-card' : 'selection-card'}>
      <div className="selection-instructions">
        <p className="text-instruction">{exercise.instruction.text}</p>
        <LessonAudioButton audio={exercise.instruction}>Escuchar instrucción</LessonAudioButton>
      </div>
      {exercise.letter && <p className="text-letter">{formatLetterGroup(exercise.letter.trim().split(/\s+/)[0])}</p>}
      {exercise.sound && <LessonAudioButton audio={exercise.sound} size="large">Escuchar el sonido de {lesson.letter}</LessonAudioButton>}
      {exercise.extraAudios?.map((audio) => <LessonAudioButton key={audio.src} audio={audio}>Escuchar los sonidos despacio</LessonAudioButton>)}
      {prompt && <>
        {prompt.image && <BookLessonImage key={prompt.image} featured src={prompt.image} alt={prompt.label} />}
        {!exercise.hideWord && <p className="text-word">{prompt.label}</p>}
        <LessonAudioButton audio={prompt.audio}>Escuchar {prompt.listenLabel ?? (exercise.hideWord ? 'la palabra' : prompt.label)}</LessonAudioButton>
      </>}
      {exercise.pattern && <p className="completion-word-pattern">{exercise.pattern}</p>}
      {exercise.items && <div className={`selection-options${(exercise.centeredItems ?? (lesson.centeredItems && exercise.items.length > 1)) ? ' selection-options--centered' : ''}`}>
        {exercise.items.map((item) => <Card key={item.id}>
          {item.image && <BookLessonImage key={item.image} src={item.image} alt={item.label} />}
          <p className="text-reading">{item.label}</p>
          <LessonAudioButton audio={item.audio} aria-label={`Escuchar ${item.label}`}>Escuchar</LessonAudioButton>
        </Card>)}
      </div>}
      {ordered && <div className="completion-target" aria-live="polite" aria-label="Tu respuesta">
        <p className="text-word">{answerText || '…'}</p>
      </div>}
      {options.length > 0 && <div className={ordered ? `completion-bank${exercise.compactOptions ? ' completion-bank--letters' : ''}${exercise.answerIds ? ' completion-bank--images' : ''}` : `selection-options selection-options--centered${exercise.showOptionLabels ? ' selection-options--labeled' : ''}`}>
        {options.map((option, index) => {
          const active = selected.includes(index)
          return <Card key={`${option.id}-${index}`} className={type === 'oral' ? 'word-choice-option' : ''} selected={active}>
            <Button variant={active && feedback === 'correct' ? 'correct' : 'secondary'} size="large" fullWidth
              aria-pressed={active} aria-disabled={feedback === 'correct' || (ordered && active)} disabled={ordered && active && !exercise.answerIds}
              onClick={() => pick(index)}>
              {option.image ? <><BookLessonImage key={option.image} src={option.image} alt={option.label} />{exercise.showOptionLabels && <span>{option.label}</span>}</>
                : option.label}
              {active && <Check aria-label="Seleccionado" size={20} />}
            </Button>
            {option.audio && <LessonAudioButton audio={option.audio} fullWidth
              aria-label={`Escuchar ${option.label}`}>
              {exercise.compactOptions || type === 'oral' ? null : 'Escuchar'}
            </LessonAudioButton>}
          </Card>
        })}
      </div>}
      {exercise.groups && <div className={type === 'match' ? ['book-choice-groups', exercise.groups.length === 4 && 'book-choice-groups--pairs'].filter(Boolean).join(' ') : 'completion-content'}>
      {exercise.groups.map((group) => <Group className={`word-choice-group${group.options.some((option) => option.image || option.label.length > 3) ? ' word-choice-group--wide-options' : ''}`} key={group.id} aria-labelledby={`group-${group.id}`}>
        <h2 id={`group-${group.id}`}>{group.label}</h2>
        {group.image && <BookLessonImage src={group.image} alt={group.label} />}
        {group.audio && <LessonAudioButton audio={group.audio} aria-label={`Escuchar ${group.label}`}>Escuchar palabra</LessonAudioButton>}
        <div className="selection-options selection-options--centered">
          {group.options.map((option) => <Card className="word-choice-option" key={option.id} selected={groupChoices[group.id] === option.id}>
            <Button variant="secondary" fullWidth aria-pressed={groupChoices[group.id] === option.id}
              aria-disabled={feedback === 'correct'}
              onClick={() => { if (checked.current) return; setGroupChoices((current) => ({ ...current, [group.id]: option.id })); setPracticed(false); setFeedback('') }}>
              {option.image && <BookLessonImage src={option.image} alt={option.label} />}
              {option.label}{groupChoices[group.id] === option.id && <Check aria-label="Seleccionado" size={20} />}
            </Button>
            <LessonAudioButton audio={option.audio} aria-label={`Escuchar ${option.label}`}>{null}</LessonAudioButton>
          </Card>)}
        </div>
        {type === 'match' && feedback === 'retry' && groupChoices[group.id] !== group.answer && <p role="status">Revisa esta respuesta.</p>}
      </Group>)}
      </div>}
      {type === 'oral' && exercise.groups && groupsReady && <p className="text-instruction" aria-live="polite">
        Forma tu oración con: {exercise.groups.map((group) => group.options.find((option) => option.id === groupChoices[group.id]).label).join(' · ')}.
      </p>}
      {ordered && feedback !== 'correct' && <Button variant="secondary" icon={Undo2} disabled={!selected.length}
        onClick={() => { setSelected((current) => current.slice(0, -1)); setFeedback('') }}>Quitar la última</Button>}
      {feedback && <p className={`selection-feedback selection-feedback--${feedback}`} role="status">
        {feedback === 'correct' ? '¡Correcto! Puedes continuar.' : 'Escucha de nuevo e inténtalo otra vez.'}
      </p>}
      {feedback === 'retry' && <Button variant="retry" icon={RotateCcw} onClick={() => { setSelected([]); setFeedback('') }}>Intentar nuevamente</Button>}
      {!passive && feedback !== 'correct' && <Button icon={Check} size="large" disabled={type === 'match' ? !groupsReady : !selected.length || (ordered && selected.length !== (exercise.answerLength ?? options.length))} onClick={check}>Comprobar respuesta</Button>}
      {exercise.selectionCount && <p role="status">Palabras elegidas: {selected.length} de {exercise.selectionCount}</p>}
      {type === 'oral' && exercise.record && <VoiceRecorder onRecorded={() => setPracticed(true)} />}
      {type === 'oral' && <Button variant="secondary" aria-pressed={practiced} disabled={!groupsReady} icon={Check} onClick={() => setPracticed(!practiced)}>{exercise.practiceLabel ?? 'Ya dije mi oración'}</Button>}
      {(feedback === 'correct' || (passive && (type !== 'oral' || practiced))) && <Button size="large" icon={ArrowRight} iconPosition="right" onClick={onNext}>
        {last || 'Continuar'}
      </Button>}
    </Card>
  )
}

export default BookLessonExercise
