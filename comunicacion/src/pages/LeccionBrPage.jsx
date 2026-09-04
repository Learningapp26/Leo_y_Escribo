import {ArrowRight, Images, ListMusic, Sparkles, Volume2, } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import { brComprehensionQuestions, brReading } from '../data/brData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function LeccionBrPage() {
  const themeClass = getLessonThemeClass('br')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="bl-lesson-title"
    >
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center">
        <span className="text-ui-label">
          Unidad 3
        </span>

        <h1 id="bl-lesson-title">Combinación de letras BR</h1>

        <p className="text-instruction">
          Ahora aprenderás la combinación de dos letras: la be y la erre.
          Escucha la siguiente historia.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(brReading.instructionAudio)}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{brReading.title}</h2>

          <div className="reading-story">
            {brReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(brReading.readingAudio)}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={brReading.image} alt={brReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="br-comprehension-title"
      >
        <h2 id="br-comprehension-title">Conversemos sobre el cuento</h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {brComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>

              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="br-activities-title">
        <h2 id="br-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce los sonidos"
            description="Escucha y reconoce los sonidos de la combinación BR"
            footer={
              <Button
                to="/actividad/br-sonidos"
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
            title="Sílabas con la combinación BR"
            description="Reconoce y forma sílabas con la combinación BR"
            footer={
              <Button
                to="/actividad/br-silabas"
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
            description="Practica todo lo aprendido con la combinación BR"
            footer={
              <Button
                to="/actividad/br-final"
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

export default LeccionBrPage