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
import { gComprehensionQuestions, gReading } from '../data/gData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function LeccionGPage() {
  const themeClass = getLessonThemeClass('g')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="g-lesson-title"
    >
      <BackButton label="Volver a la Unidad 5" to="/lecciones/unidad/5" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 5</span>

        <h1 id="g-lesson-title">La letra G</h1>

        <p className="text-instruction">
          Durante estos días conocerás la letra g. Para empezar, escucha con
          atención una historia que te gustará.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(gReading.instructionAudio)}
          data-audio-src={gReading.instructionAudio}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{gReading.title}</h2>

          <div className="reading-story">
            {gReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(gReading.readingAudio)}
              data-audio-src={gReading.readingAudio}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={gReading.image} alt={gReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="g-comprehension-title"
      >
        <h2 id="g-comprehension-title">Conversemos sobre el cuento</h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {gComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>

              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="g-activities-title">
        <h2 id="g-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce los sonidos"
            description="Escucha y reconoce los sonidos de la letra G"
            footer={
              <Button
                to="/actividad/g-sonidos"
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
            title="Sílabas con G"
            description="Reconoce y forma sílabas con la letra G"
            footer={
              <Button
                to="/actividad/g-silabas"
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
            description="Completa palabras y oraciones"
            footer={
              <Button
                to="/actividad/g-completar"
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
            title="Actividad final"
            description="Completa las oraciones con las palabras que faltan"
            footer={
              <Button
                to="/actividad/g-final"
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

export default LeccionGPage