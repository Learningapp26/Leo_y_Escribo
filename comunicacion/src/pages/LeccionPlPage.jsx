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
import { plComprehensionQuestions, plReading } from '../data/plData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function LeccionPlPage() {
  const themeClass = getLessonThemeClass('pl')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="pl-lesson-title"
    >
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 2</span>

        <h1 id="pl-lesson-title">Combinación de letras PL</h1>

        <p className="text-instruction">
          Ahora aprenderás la combinación de dos letras: la pe y la ele.
          Escucha la siguiente historia.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(plReading.instructionAudio)}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{plReading.title}</h2>

          <div className="reading-story">
            {plReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(plReading.readingAudio)}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={plReading.image} alt={plReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="pl-comprehension-title"
      >
        <h2 id="pl-comprehension-title">Conversemos sobre el cuento</h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {plComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>

              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="pl-activities-title">
        <h2 id="pl-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce los sonidos"
            description="Escucha y reconoce los sonidos de la combinación PL"
            footer={
              <Button
                to="/actividad/pl-sonidos"
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
            title="Sílabas con la combinación PL"
            description="Reconoce y forma sílabas con la combinación PL"
            footer={
              <Button
                to="/actividad/pl-silabas"
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
                to="/actividad/pl-completar"
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
            description="Practica todo lo aprendido con la combinación PL"
            footer={
              <Button
                to="/actividad/pl-final"
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

export default LeccionPlPage