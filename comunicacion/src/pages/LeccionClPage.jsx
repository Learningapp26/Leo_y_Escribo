import {
  ArrowRight,
  Images,
  ListMusic,
  Sparkles,
} from 'lucide-react'

import AudioPlaceholderButton from '../components/common/AudioPlaceholderButton'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  clComprehensionQuestions,
  clReading,
} from '../data/clData'
import '../styles/reading.css'

function LeccionClPage() {
  const themeClass =
    getLessonThemeClass('cl')

  return (
    <main
      className={
        `page reading-page ${themeClass}`
      }
      aria-labelledby="cl-lesson-title"
    >
      <BackButton
        label="Volver a la Unidad 4"
        to="/lecciones/unidad/4"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Unidad 4
        </span>

        <h1 id="cl-lesson-title">
          Combinación de letras CL
        </h1>

        <p className="text-instruction">
          Ahora aprenderás la combinación
          de dos letras: la ce y la ele.
          Conocerás las sílabas cla, cle,
          cli, clo y clu.
        </p>

        <AudioPlaceholderButton
          size="large"
        >
          Escuchar instrucción
        </AudioPlaceholderButton>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">
            {clReading.title}
          </h2>

          <div className="reading-story">
            {clReading.paragraphs.map(
              (paragraph) => (
                <p
                  className="text-reading"
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ),
            )}
          </div>

          <div className="reading-audio">
            <AudioPlaceholderButton
              size="large"
            >
              Escuchar la historia
            </AudioPlaceholderButton>
          </div>
        </div>

        <div className="reading-image">
          <img
            src={clReading.image}
            alt={clReading.imageAlt}
          />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="cl-comprehension-title"
      >
        <h2 id="cl-comprehension-title">
          Conversemos sobre el cuento
        </h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de
          forma oral, guiadas por la maestra.
          No es necesario responderlas
          por escrito.
        </p>

        <div className="comprehension-grid">
          {clComprehensionQuestions.map(
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

      <section
        aria-labelledby="cl-activities-title"
      >
        <h2 id="cl-activities-title">
          Practiquemos
        </h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce el sonido CL"
            description={
              'Identifica palabras e imágenes ' +
              'que contienen el sonido CL.'
            }
            footer={
              <Button
                to="/actividad/cl-sonidos"
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
            title="Sílabas con CL"
            description={
              'Practica las sílabas cla, cle, ' +
              'cli, clo y clu.'
            }
            footer={
              <Button
                to="/actividad/cl-silabas"
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
            description={
              'Ordena sílabas y relaciona ' +
              'oraciones con imágenes.'
            }
            footer={
              <Button
                to="/actividad/cl-final"
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

export default LeccionClPage