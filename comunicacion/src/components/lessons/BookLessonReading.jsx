import { useEffect, useState } from 'react'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '../common/Button'
import Card from '../common/Card'
import LessonAudioButton from '../common/LessonAudioButton'
import BackButton from '../navigation/BackButton'
import { getLessonThemeClass } from '../../data/lessonColors'
import { stopAudio } from '../../lib/audioPlayer'
import '../../styles/reading.css'
import '../../styles/selection.css'

function BookLessonReading({ lesson }) {
  const { reading } = lesson
  const [imageMissing, setImageMissing] = useState(false)
  useEffect(() => () => stopAudio(), [])
  return (
    <main className={`page reading-page lesson-page--contained ${getLessonThemeClass(lesson.id)}`} aria-labelledby="lesson-title">
      <BackButton label="Volver a la Unidad 4" to="/lecciones/unidad/4" />
      <header className="text-center">
        <span className="text-ui-label">Unidad 4 · Páginas {lesson.pages}</span>
        <h1 id="lesson-title">La letra {lesson.letter} {lesson.letter.toLowerCase()}</h1>
        <p className="text-instruction">{reading.instruction.text}</p>
        <LessonAudioButton audio={reading.instruction}>Escuchar instrucción</LessonAudioButton>
      </header>
      <Card className={`reading-card ${imageMissing ? 'reading-card--text-only' : ''}`}>
        <div className="reading-content">
          <h2 className="reading-title">{reading.title}</h2>
          <div className="reading-story">
            {reading.paragraphs.map((paragraph) => <p className="text-reading" key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="reading-audio">
            <LessonAudioButton audio={reading.audio} size="large">Escuchar la historia completa</LessonAudioButton>
          </div>
        </div>
        {!imageMissing && <div className="reading-image">
          {/* The story illustration is supplied by the book owner; no substitute. */}
          <img src={reading.image} alt={reading.imageAlt} onError={() => setImageMissing(true)} />
        </div>}
      </Card>
      <section className="comprehension-section" aria-labelledby="questions-title">
        <h2 id="questions-title">Conversemos sobre el cuento</h2>
        <p className="text-instruction">Escucha y conversa con tu maestra.</p>
        <div className="comprehension-grid">
          {reading.questions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question.text}>
              <span className="comprehension-list__number" aria-hidden="true">{index + 1}</span>
              <p className="text-reading">{question.text}</p>
              <LessonAudioButton audio={question.audio}>Escuchar pregunta {index + 1}</LessonAudioButton>
            </Card>
          ))}
        </div>
      </section>
      <section aria-labelledby="activities-title">
        <h2 id="activities-title">Practiquemos</h2>
        <div className="lesson-activity-menu">
          {lesson.activities.map((activity, index) => (
            <Card className="lesson-activity-menu__card" key={activity.id} icon={BookOpen}
              title={`${index + 1}. ${activity.title}`}
              footer={<Button to={`/actividad/${lesson.id}-${activity.id}`} icon={ArrowRight} iconPosition="right" fullWidth>Comenzar</Button>} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default BookLessonReading
