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
  lComprehensionQuestions,
  lReading,
} from '../data/lLectura'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function LeccionLPage() {
  const themeClass = getLessonThemeClass('l')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="l-lesson-title"
    >
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 1</span>

        <h1 id="l-lesson-title">La letra L</h1>

        <p className="text-instruction">
          Escucha la historia con atención y descubre el sonido de la letra
          L.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(lReading.instructionAudio)}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{lReading.title}</h2>

          <div className="reading-story">
            <p className="text-reading">{lReading.introduction}</p>

            {lReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(lReading.readingAudio)}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={lReading.image} alt={lReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="l-comprehension-title"
      >
        <h2 id="l-comprehension-title">Conversemos sobre el cuento</h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {lComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>

              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="l-activities-title">
        <h2 id="l-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconocer imágenes"
            description="Escucha el sonido /l/ y descubre qué imágenes empiezan igual."
            footer={
              <Button
                to="/actividad/l-imagenes"
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
            title="Sílabas con L"
            description="Cuenta sílabas y reconoce la, le, li, lo y lu."
            footer={
              <Button
                to="/actividad/l-silabas"
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
            description="Elige la sílaba que falta y une sílabas para formar palabras."
            footer={
              <Button
                to="/actividad/l-completar"
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
            description="Completa oraciones, cuenta palabras y relaciona imágenes."
            footer={
              <Button
                to="/actividad/l-final"
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

export default LeccionLPage
