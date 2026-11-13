import { useEffect, useState } from 'react'
import { ArrowRight, Ear, Type } from 'lucide-react'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import LessonAudioButton from '../components/common/LessonAudioButton'
import BackButton from '../components/navigation/BackButton'
import BookLessonActivity from '../components/lessons/BookLessonActivity'
import { alphabetGame, createAlphabetLesson } from '../data/abecedarioData'
import { getLessonThemeClass } from '../data/lessonColors'
import { stopAudio } from '../lib/audioPlayer'
import '../styles/reading.css'
import '../styles/selection.css'

export function AbecedarioActivityPage({ activityId }) {
  // Keep the three challenges stable while the child answers or retries.
  const [lesson] = useState(() => createAlphabetLesson())
  return <BookLessonActivity lesson={lesson} activityId={activityId} />
}

function AbecedarioPage() {
  useEffect(() => () => stopAudio(), [])
  return (
    <main className={`page reading-page lesson-page--contained ${getLessonThemeClass(alphabetGame.id)}`} aria-labelledby="game-title">
      <BackButton to="/lecciones/unidad/6" label="Volver a la Unidad 6" />
      <header className="text-center">
        <h1 id="game-title">{alphabetGame.title}</h1>
        <p className="text-instruction">{alphabetGame.instruction.text}</p>
        <LessonAudioButton audio={alphabetGame.instruction}>Escuchar instrucciones</LessonAudioButton>
      </header>
      <div className="lesson-activity-menu">
        {alphabetGame.activities.map((activity, index) => (
          <Card key={activity.id} className="lesson-activity-menu__card" icon={index === 0 ? Type : Ear}
            title={activity.title} description={activity.instruction.text}
            footer={<Button to={`/actividad/abecedario-${activity.id}`} icon={ArrowRight} iconPosition="right" fullWidth>Comenzar</Button>}>
            <LessonAudioButton audio={activity.instruction}>Escuchar cómo jugar</LessonAudioButton>
          </Card>
        ))}
      </div>
    </main>
  )
}

export default AbecedarioPage
