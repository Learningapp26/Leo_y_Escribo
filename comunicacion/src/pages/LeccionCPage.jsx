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
  cComprehensionQuestions,
  cReading,
} from '../data/cData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function LeccionCPage() {
  const themeClass = getLessonThemeClass('c')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="c-lesson-title"
    >
      <BackButton
        label="Volver a lecciones"
        to="/lecciones/unidad/2"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Unidad 2
        </span>

        <h1 id="c-lesson-title">
          La letra C
        </h1>

        <p className="text-instruction">
          Hoy aprenderás la letra ce. Escucha la siguiente
          historia y repite la canción.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() =>
            playAudio(cReading.instructionAudio)
          }
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">
            {cReading.title}
          </h2>

          <div className="reading-story">
            {cReading.paragraphs.map((paragraph) => (
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
                playAudio(cReading.readingAudio)
              }
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img
            src={cReading.image}
            alt={cReading.imageAlt}
          />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="c-comprehension-title"
      >
        <h2 id="c-comprehension-title">
          Conversemos sobre el cuento
        </h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral,
          guiadas por la maestra. No es necesario
          responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {cComprehensionQuestions.map(
            (question, index) => (
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
            ),
          )}
        </div>
      </section>

      <section aria-labelledby="c-activities-title">
        <h2 id="c-activities-title">
          Practiquemos
        </h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce el sonido de C"
            description="Escucha palabras, encuentra las que comienzan con C y reconoce palabras que riman."
            footer={
              <Button
                to="/actividad/c-sonidos"
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
            title="Sílabas ca, co y cu"
            description="Reconoce las sílabas ca, co y cu en imágenes y palabras."
            footer={
              <Button
                to="/actividad/c-silabas"
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
            description="Completa palabras y une sílabas para formar los nombres de las imágenes."
            footer={
              <Button
                to="/actividad/c-completar"
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
            description="Lee palabras con C y completa las oraciones con la imagen correcta."
            footer={
              <Button
                to="/actividad/c-final"
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

export default LeccionCPage