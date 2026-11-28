import ActivityFeedback from '../common/ActivityFeedback'
import { fillBlank } from '../../lib/fillBlank'
import { formatLetterGroup } from '../../data/lessonLabels'
import { useRef, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Undo2 } from 'lucide-react'
import Button from '../common/Button'
import Card from '../common/Card'
import LessonAudioButton from '../common/LessonAudioButton'
import StoryCard from './StoryCard'
import BookLessonImage from './BookLessonImage'
import BookLessonCrossword from './BookLessonCrossword'
import VoiceRecorder from './VoiceRecorder'
import { LetterSound, WordSound } from './SoundIntroduction'
import ListeningWords from './ListeningWords'
import SyllableCards from './SyllableCards'
import useSyllablePractice from '../../hooks/useSyllablePractice'
import { isSyllablePresentation } from '../../lib/syllablePractice'
import { playLessonAudio } from '../../lib/audioPlayer'
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
  const syllablePresentation = isSyllablePresentation(exercise)
  const syllablePractice = useSyllablePractice(exercise.items ?? [], exercise.id)
  const Group = type === 'match' ? Card : 'section'
  const answerText = selected.map((index) => options[index].label).join(exercise.separator ?? '')
  const completionChoice = exercise.sentenceCompletion && options[selected[0]]
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
    if (!exercise.hideOptionAudio) playLessonAudio(options[index].audio)
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
    playLessonAudio(feedbackAudio)
    if (correct) onCorrect()
  }

  return (
    <Card className={syllablePresentation ? 'syllables-card' : ordered ? 'completion-card' : 'selection-card'}>
      <div className={syllablePresentation ? 'syllables-instructions' : 'selection-instructions'}>
        <p className="text-instruction">{exercise.instruction.text}</p>
        <LessonAudioButton audio={exercise.instruction}>Escuchar instrucción</LessonAudioButton>
      </div>
      {exercise.letter && !exercise.sound && !syllablePresentation && <p className="text-letter">{exercise.letterForms ?? formatLetterGroup(exercise.letter.trim().split(/\s+/)[0])}</p>}
      {(exercise.sound || syllablePresentation) && <LetterSound letter={lesson.letter} audio={exercise.sound}>
        {exercise.letter ? exercise.letterForms ?? formatLetterGroup(exercise.letter.trim().split(/\s+/)[0]) : undefined}
      </LetterSound>}
      {exercise.extraAudios?.map((audio) => <LessonAudioButton key={audio.src} audio={audio}>Escuchar los sonidos despacio</LessonAudioButton>)}
      {prompt && <>
        {prompt.image && <BookLessonImage key={prompt.image} featured src={prompt.image} alt={prompt.label} />}
        {exercise.sound && !exercise.hideWord
          ? <WordSound word={prompt.label} audio={prompt.audio} />
          : <>
            {!exercise.hideWord && <p className="text-word">{fillBlank(prompt.label, answerText)}</p>}
            <LessonAudioButton audio={prompt.audio}>Escuchar {prompt.listenLabel ?? (exercise.hideWord ? 'la palabra' : prompt.label)}</LessonAudioButton>
          </>}
      </>}
      {exercise.reading && <StoryCard lessonId={lesson.id} title={exercise.reading.title}
        paragraphs={exercise.reading.paragraphs} image={exercise.reading.image} imageAlt={exercise.reading.imageAlt}
        audio={exercise.reading.audio.available === false ? undefined : exercise.reading.audio.src} />}
      {exercise.teacherPrompt && <details className="word-bank-reference">
        <summary>Para la maestra</summary>
        <p className="text-reading">{exercise.teacherPrompt}</p>
      </details>}
      {exercise.pattern && <p className="completion-word-pattern">{fillBlank(exercise.pattern, answerText)}</p>}
      {exercise.items && (syllablePresentation
        ? <SyllableCards items={exercise.items} {...syllablePractice} />
        : type === 'present' && !exercise.letter && !exercise.items.some((item) => item.definition)
        ? <ListeningWords key={exercise.id} items={exercise.items} letter={lesson.letter}
          showInstruction={Boolean(exercise.sound)} instructionAudio={exercise.instruction} />
        : <div className={`selection-options${(exercise.centeredItems ?? (lesson.centeredItems && exercise.items.length > 1)) ? ' selection-options--centered' : ''}`}>
        {exercise.items.map((item) => <Card key={item.id}>
          {item.image && <BookLessonImage key={item.image} src={item.image} alt={item.label} />}
          <p className="text-reading">{item.label}</p>
          {item.definition && <details className="word-bank-reference"><summary>¿Qué significa?</summary><p className="text-reading">{item.definition}</p>{item.definitionAudio && <LessonAudioButton audio={item.definitionAudio}>Escuchar significado</LessonAudioButton>}</details>}
          <LessonAudioButton audio={item.audio} aria-label={`Escuchar ${item.label}`}>Escuchar</LessonAudioButton>
        </Card>)}
      </div>)}
      {exercise.sentenceCompletion && <>
        <p className="text-sentence book-sentence-completion" aria-live="polite">
          {exercise.sentenceCompletion.before}
          <span className="book-sentence-completion__slot">
            {completionChoice
              ? <BookLessonImage key={completionChoice.completionImage} src={completionChoice.completionImage} alt={completionChoice.label} />
              : '_____'}
          </span>
          {exercise.sentenceCompletion.after}
        </p>
        <LessonAudioButton audio={exercise.sentenceCompletion.audio}>Escuchar oración</LessonAudioButton>
      </>}
      {ordered && <div className="completion-target" aria-live="polite" aria-label="Tu respuesta">
        <p className={exercise.separator === ' ' ? 'sentence-order-result' : 'text-word'}>{answerText || '…'}</p>
      </div>}
      {options.length > 0 && <div className={ordered ? `completion-bank${exercise.compactOptions ? ' completion-bank--letters' : ''}${exercise.answerIds ? ' completion-bank--images' : ''}${exercise.optionLayout === 'pairs' ? ' completion-bank--pairs' : ''}` : `selection-options selection-options--centered${exercise.showOptionLabels ? ' selection-options--labeled' : ''}${exercise.optionLayout === 'board' ? ' selection-options--board' : ''}`}>
        {options.map((option, index) => {
          const active = selected.includes(index)
          return <Card key={`${option.id}-${index}`} className={type === 'oral' ? 'word-choice-option' : ''} selected={active}>
            <Button variant={active && feedback === 'correct' ? 'correct' : 'secondary'} size="large" fullWidth
              aria-pressed={active} aria-disabled={feedback === 'correct' || (ordered && active)} disabled={ordered && active && !exercise.answerIds}
              onClick={() => pick(index)}>
              {option.image ? <><BookLessonImage key={option.image} src={option.image} alt={option.imageAlt ?? option.label} />{exercise.showOptionLabels && <span>{option.label}</span>}{option.caption && <span className="selection-option-caption">{option.caption}</span>}</>
                : option.label}
              {active && <Check aria-label="Seleccionado" size={20} />}
            </Button>
            {option.definition && <details className="word-bank-reference"><summary>¿Qué significa?</summary><p className="text-reading">{option.definition}</p>{option.definitionAudio && <LessonAudioButton audio={option.definitionAudio}>Escuchar significado</LessonAudioButton>}</details>}
            {option.audio && !exercise.hideOptionAudio && <LessonAudioButton audio={option.audio} fullWidth
              aria-label={`Escuchar ${option.caption ?? option.label}`}>
              {exercise.compactOptions || exercise.optionLayout === 'board' || type === 'oral' ? null : 'Escuchar'}
            </LessonAudioButton>}
          </Card>
        })}
      </div>}
      {exercise.crossword && <BookLessonCrossword crossword={exercise.crossword} choices={groupChoices} />}
      {exercise.groups && <div className={type === 'match' ? ['book-choice-groups', exercise.groups.length === 4 && 'book-choice-groups--pairs'].filter(Boolean).join(' ') : 'completion-content'}>
      {exercise.groups.map((group) => <Group className={`word-choice-group${exercise.uniformChoices || group.options.some((option) => option.image || option.label.length > 3) ? ' word-choice-group--wide-options' : ''}`} key={group.id} aria-labelledby={`group-${group.id}`}>
        <h2 id={`group-${group.id}`}>{group.label}</h2>
        {group.image && <BookLessonImage src={group.image} alt={group.imageAlt ?? group.label} />}
        {group.audio && <LessonAudioButton audio={group.audio} aria-label={`Escuchar ${group.label}`}>{group.listenLabel ?? 'Escuchar palabra'}</LessonAudioButton>}
        <div className="selection-options selection-options--centered">
          {group.options.map((option) => <Card className="word-choice-option" key={option.id} selected={groupChoices[group.id] === option.id}>
            <Button variant="secondary" fullWidth aria-pressed={groupChoices[group.id] === option.id}
              aria-disabled={feedback === 'correct'}
              onClick={() => { if (checked.current) return; setGroupChoices((current) => ({ ...current, [group.id]: option.id })); setPracticed(false); setFeedback('') }}>
              {option.image && <BookLessonImage src={option.image} alt={option.label} />}
              {option.label}{groupChoices[group.id] === option.id && <Check aria-label="Seleccionado" size={20} />}
            </Button>
            {!exercise.hideOptionAudio && <LessonAudioButton audio={option.audio} aria-label={`Escuchar ${option.caption ?? option.label}`}>{null}</LessonAudioButton>}
          </Card>)}
        </div>
        {type === 'match' && feedback === 'retry' && groupChoices[group.id] !== group.answer && <p role="status">Revisa esta respuesta.</p>}
      </Group>)}
      </div>}
      {type === 'oral' && exercise.groups && groupsReady && <p className="text-instruction" aria-live="polite">
        Forma tu oración con: {exercise.groups.map((group) => group.options.find((option) => option.id === groupChoices[group.id]).label).join(' · ')}.
      </p>}
      {ordered && !feedback && <Button variant="secondary" icon={Undo2} disabled={!selected.length}
        onClick={() => { setSelected((current) => current.slice(0, -1)); setFeedback('') }}>Quitar la última</Button>}
      {feedback && <ActivityFeedback correct={feedback === 'correct'} message={<>
        {feedback === 'correct' ? '¡Correcto! Puedes continuar.' : 'Escucha de nuevo e inténtalo otra vez.'}
      </>} />}
      {feedback === 'correct' && exercise.resultText && <p className="text-word" aria-live="polite">{exercise.resultText}</p>}
      {feedback === 'retry' && <Button variant="retry" icon={RotateCcw} onClick={() => { setSelected([]); setFeedback('') }}>Intentar nuevamente</Button>}
      {!passive && !feedback && <Button icon={Check} size="large" disabled={type === 'match' ? !groupsReady : !selected.length || (ordered && selected.length !== (exercise.answerLength ?? options.length))} onClick={check}>Comprobar respuesta</Button>}
      {exercise.selectionCount && <p role="status">Palabras elegidas: {selected.length} de {exercise.selectionCount}</p>}
      {type === 'oral' && exercise.record && <VoiceRecorder onRecorded={() => setPracticed(true)} />}
      {type === 'oral' && <Button variant="secondary" aria-pressed={practiced} disabled={!groupsReady} icon={Check} onClick={() => setPracticed(!practiced)}>{exercise.practiceLabel ?? 'Ya dije mi oración'}</Button>}
      {(feedback === 'correct' || (passive && (type !== 'oral' || practiced))) && <Button size="large" icon={ArrowRight} iconPosition="right"
        disabled={syllablePresentation && !syllablePractice.allTouched}
        onClick={() => {
          if (syllablePresentation && !syllablePractice.allTouched) return
          onNext()
        }}>
        {last || 'Continuar'}
      </Button>}
    </Card>
  )
}

export default BookLessonExercise
