import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, RotateCcw } from 'lucide-react'
import Button from '../common/Button'
import Card from '../common/Card'
import LessonAudioButton from '../common/LessonAudioButton'
import BackButton from '../navigation/BackButton'
import ProgressBar from '../progress/ProgressBar'
import StarsCounter from '../progress/StarsCounter'
import { RewardScreen } from '../space/Reward'
import '../../styles/solar.css'
import BookLessonExercise from './BookLessonExercise'
import BookLessonSoundBoxes from './BookLessonSoundBoxes'
import { getLessonThemeClass } from '../../data/lessonColors'
import { playAudio, stopAudio } from '../../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../../lib/progreso'
import '../../styles/selection.css'
import '../../styles/completion.css'
import '../../styles/syllables.css'

function BookLessonActivity({ lesson, activityId }) {
  const activityIndex = lesson.activities.findIndex((activity) => activity.id === activityId)
  const activity = lesson.activities[activityIndex]
  const [index, setIndex] = useState(0)
  const [stars, setStars] = useState(0)
  const [saveState, setSaveState] = useState('')
  const saving = useRef(false)
  const navigate = useNavigate()
  const exercise = activity.exercises[index]
  const done = index === activity.exercises.length
  const Exercise = exercise?.type === 'boxes' ? BookLessonSoundBoxes : BookLessonExercise
  const final = activityIndex === lesson.activities.length - 1
  const totalStars = activity.exercises.filter((item) => ['select', 'order', 'boxes', 'match'].includes(item.type)).length
  useEffect(() => () => stopAudio(), [])

  const finish = async () => {
    if (saving.current) return
    saving.current = true
    setSaveState('saving')
    try {
      const result = await registrarLeccionCompletada(lesson.id)
      setSaveState(result.error || result.skipped ? 'error' : 'saved')
      if (!result.error && !result.skipped) playAudio(lesson.feedback.completed.src)
    } catch {
      setSaveState('error')
    } finally {
      saving.current = false
    }
  }

  const next = () => {
    stopAudio()
    if (['present', 'oral'].includes(exercise.type)) {
      registrarProgreso({ actividad: `${lesson.id}-${activityId}`, correcto: false,
        detalle: { leccionId: lesson.id, ejercicioId: exercise.id, practica: true } })
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // Only the whole lesson gets a congratulations screen; activities chain directly.
    if (!final && index === activity.exercises.length - 1) {
      navigate(`/actividad/${lesson.id}-${lesson.activities[activityIndex + 1].id}`)
      return
    }
    setIndex((current) => current + 1)
    if (final && index === activity.exercises.length - 1) finish()
  }

  return (
    <main className={`page completion-page lesson-page--contained ${getLessonThemeClass(lesson.id)}`} aria-labelledby="activity-title">
      <header className="space-header activity-header">
        <BackButton label="Volver a la lección" to={`/lecciones/${lesson.id}`} />
        <div>
          <span className="space-header__label">Actividad {activityIndex + 1} de {lesson.activities.length}</span>
          <h1 id="activity-title" className="space-header__title">{activity.title}</h1>
        </div>
        {totalStars > 0 && <span className="space-header__end"><StarsCounter current={stars} total={totalStars} /></span>}
      </header>
      {!done && <ProgressBar value={index} max={activity.exercises.length} label={`Ejercicios completados: ${index} de ${activity.exercises.length}`} />}
      {!done ? <Exercise key={exercise.id} exercise={exercise} lesson={lesson}
        activityId={activityId} onNext={next} onCorrect={() => setStars((current) => current + 1)} last={index === activity.exercises.length - 1 && (final ? 'Terminar lección' : 'Siguiente actividad')} />
        : final ? <RewardScreen lessonId={lesson.id} continueTo={`/lecciones/unidad/${lesson.unitId}`} continueDisabled={saveState === 'saving'}>
          <p className="reward-screen__lesson">{lesson.completionTitle ?? `¡Terminaste la lección de la letra ${lesson.letter}!`}</p>
          <LessonAudioButton audio={lesson.feedback.completed}>Escuchar felicitación</LessonAudioButton>
          {saveState === 'saving' && <p role="status">Guardando tu progreso…</p>}
          {saveState === 'error' && <>
            <p role="alert">No pudimos guardar tu progreso. Comprueba tu conexión y que hayas iniciado sesión.</p>
            <Button variant="retry" icon={RotateCcw} onClick={finish}>Volver a guardar</Button>
          </>}
          {saveState === 'saved' && <p role="status">Tu progreso está guardado.</p>}
        </RewardScreen>
        : <Card className="completion-card">
          <h2>¡Terminaste esta actividad!</h2>
          <Button to={`/actividad/${lesson.id}-${lesson.activities[activityIndex + 1].id}`} size="large" icon={ArrowRight}>Siguiente actividad</Button>
        </Card>}
    </main>
  )
}

export default BookLessonActivity
