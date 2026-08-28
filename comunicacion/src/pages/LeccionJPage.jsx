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
import {
  jOralQuestions,
  jReading,
} from '../data/jLectura'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function LeccionJPage() {
  const themeClass = getLessonThemeClass('j')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="j-lesson-title"
    >
      <BackButton
        label="Volver a lecciones"
        to="/lecciones"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Unidad 3
        </span>

        <h1 id="j-lesson-title">La letra J</h1>

        <p className="text-instruction">
          Escucha la fábula con atención y descubre el
          sonido de la letra J.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() =>
            playAudio(jReading.instructionAudio)
          }
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">
            {jReading.title}
          </h2>

          <div className="reading-story">
            <p className="text-reading">
              {jReading.introduction}
            </p>

            {jReading.paragraphs.map((paragraph) => (
              <p
                className="text-reading"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="reading-audio">
            <Button
              variant="audio"
              size="large"
              icon={Volume2}
              onClick={() =>
                playAudio(jReading.readingAudio)
              }
            >
              Escuchar la fábula
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img
            src={jReading.image}
            alt={jReading.imageAlt}
          />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="j-conversation-title"
      >
        <h2 id="j-conversation-title">
          Ahora conversemos
        </h2>

        <p className="text-instruction">
          Comenta las respuestas con tu maestra y tus
          compañeros.
        </p>

        <div className="comprehension-grid">
          {jOralQuestions.map((question, index) => (
            <Card
              className="comprehension-grid__item"
              key={question}
            >
              <span
                className="comprehension-list__number"
                aria-hidden="true"
              >
                {index + 1}
              </span>

              <p className="text-reading">
                {question}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="j-activities-title">
        <h2 id="j-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconocer el sonido"
            description="Escucha el sonido /j/ y descubre en qué palabras y sílabas aparece."
            footer={
              <Button
                to="/actividad/j-imagenes"
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
            title="Sílabas con J"
            description="Reconoce y escucha las sílabas ja, je, ji, jo y ju."
            footer={
              <Button
                to="/actividad/j-silabas"
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
            description="Elige la sílaba que falta y forma palabras con la letra J."
            footer={
              <Button
                to="/actividad/j-completar"
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
            description="Completa oraciones y cuenta las palabras que contiene cada una."
            footer={
              <Button
                to="/actividad/j-final"
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

export default LeccionJPage