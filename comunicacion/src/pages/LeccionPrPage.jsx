import {ArrowRight, Images, ListMusic, Sparkles, Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import { prComprehensionQuestions, prReading } from '../data/prData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function LeccionPrPage() {
  const themeClass = getLessonThemeClass('pr')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="pr-lesson-title"
    >
      <BackButton label="Volver a lecciones" to="/lecciones/unidad/2" />

      <header className="text-center">
        <span className="text-ui-label">
          Unidad 2
        </span>

        <h1 id="pr-lesson-title">Combinación de letras Pr</h1>

        <p className="text-instruction">
          Aprende otra combinación de letras: la pe y la erre.
          Escucha la siguiente historia.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(prReading.instructionAudio)}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{prReading.title}</h2>

          <div className="reading-story">
            {prReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(prReading.readingAudio)}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={prReading.image} alt={prReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="pr-comprehension-title"
      >
        <h2 id="pr-comprehension-title">Conversemos sobre el cuento</h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {prComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>

              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="pr-activities-title">
        <h2 id="pr-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce los sonidos"
            description="Escucha y reconoce los sonidos de la combinación Pr"
            footer={
              <Button
                to="/actividad/pr-sonidos"
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
            title="Sílabas con la combinación Pr"
            description="Reconoce y forma sílabas con la combinación Pr"
            footer={
              <Button
                to="/actividad/pr-silabas"
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
            icon={Sparkles}
            title="Actividad final"
            description="Practica todo lo aprendido con la combinación Pr"
            footer={
              <Button
                to="/actividad/pr-final"
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

export default LeccionPrPage