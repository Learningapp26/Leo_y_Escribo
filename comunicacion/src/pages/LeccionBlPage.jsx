import {ArrowRight, Images, ListMusic, Sparkles, Volume2, } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import { blComprehensionQuestions, blReading } from '../data/blData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function LeccionBlPage() {
  const themeClass = getLessonThemeClass('bl')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="bl-lesson-title"
    >
      <BackButton label="Volver a la Unidad 3" to="/lecciones/unidad/3" />

      <header className="text-center">
        <span className="text-ui-label">
          Unidad 3
        </span>

        <h1 id="bl-lesson-title">Combinación de letras BL</h1>

        <p className="text-instruction">
          Ahora aprenderás la combinación de dos letras: la be y la ele.
          Escucha la siguiente historia.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(blReading.instructionAudio)}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{blReading.title}</h2>

          <div className="reading-story">
            {blReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(blReading.readingAudio)}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={blReading.image} alt={blReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="bl-comprehension-title"
      >
        <h2 id="bl-comprehension-title">Conversemos sobre el cuento</h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {blComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>

              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="bl-activities-title">
        <h2 id="bl-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce los sonidos"
            description="Escucha y reconoce los sonidos de la combinación BL"
            footer={
              <Button
                to="/actividad/bl-sonidos"
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
            title="Sílabas con la combinación BL"
            description="Reconoce y forma sílabas con la combinación BL"
            footer={
              <Button
                to="/actividad/bl-silabas"
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
            description="Practica todo lo aprendido con la combinación BL"
            footer={
              <Button
                to="/actividad/bl-final"
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

export default LeccionBlPage