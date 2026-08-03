import {
  ArrowRight,
  Images,
  ListMusic,
  PenLine,
  Sparkles,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import {mReading, MComprehensionQuestions} from '../data/mData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function LeccionMPage() {
  const themeClass = getLessonThemeClass('m')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="m-lesson-title"
    >
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 1</span>

        <h1 id="m-lesson-title">La letra M</h1>

        <p className="text-instruction">
          Durante estos días conocerás la letra m. Para empezar, escucha con atención 
          una historia que te gustará
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(mReading.instructionAudio)}
        >
          Escuchar instrucción
        </Button>
      </header>

   
      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{mReading.title}</h2>

          <div className="reading-story">
            <p className="text-reading">{mReading.introduction}</p>

            {mReading.paragraphs.map((paragraph) => (
              <p className="text-reading" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="reading-audio">
            <Button
              variant="audio"
              size="large"
              icon={Volume2}
              onClick={() => playAudio(mReading.readingAudio)}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={mReading.image} alt={mReading.imageAlt} />
        </div>
      </Card>

        
      <section
        className="comprehension-section"
        aria-labelledby="m-comprehension-title"
      >
        <h2 id="m-comprehension-title">Conversemos sobre el cuento</h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {MComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>

              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      
      <section aria-labelledby="m-activities-title">
        <h2 id="m-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce los sonidos"
            description=""
            footer={
              <Button
                to="/actividad/m-sonidos"
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
              >
                Comenzar
              </Button>
            }
          />

          <Card
            className="lesson-activity-menu__card"
            icon={ListMusic}
            title="Silabas con M"
            description="Reconoce y forma sílabas con la letra M"
            footer={
              <Button
                to="/actividad/m-silabas"
                variant="support"
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
              >
                Comenzar
              </Button>
            }
          />

          <Card
            className="lesson-activity-menu__card"
            icon={PenLine}
            title="Completar palabras"
            description="Completa las palabras con las sílabas que faltan"
            footer={
              <Button
                to="/actividad/m-completar"
                variant="secondary"
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
              >
                Comenzar
              </Button>
            }
          />

          <Card
            className="lesson-activity-menu__card"
            icon={Sparkles}
            title=""
            description=""
            footer={
              <Button
                to="/actividad/m-final"
                variant="reward"
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
              >
                Comenzar
              </Button>
            }
          />
        </div>
      </section>

    </main>
  )
}

export default LeccionMPage
