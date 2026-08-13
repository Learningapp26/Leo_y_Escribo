import {
  ArrowRight,
  Images,
  Link2,
  Sparkles,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import { yReading } from '../data/yConjunctionData'
import { playAudio } from '../lib/audioPlayer'

function LeccionYPage() {
  const themeClass = getLessonThemeClass('y-conjuncion')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="y-lesson-title"
    >
      <BackButton
        label="Volver a lecciones"
        to="/lecciones"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Unidad 1
        </span>

        <h1 id="y-lesson-title">
          La Y une palabras
        </h1>

        <p className="text-instruction">
          Escucha la historia y descubre cómo usamos la
          letra Y para unir dos elementos.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() =>
            playAudio(yReading.instructionAudio)
          }
          data-audio-src={yReading.instructionAudio}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">
            {yReading.title}
          </h2>

          <div className="reading-story">
            <p className="text-reading">
              {yReading.introduction}
            </p>

            {yReading.paragraphs.map((paragraph) => (
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
                playAudio(yReading.readingAudio)
              }
              data-audio-src={yReading.readingAudio}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img
            src={yReading.image}
            alt={yReading.imageAlt}
          />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="y-example-title"
      >
        <h2 id="y-example-title">
          Observa cómo usamos la Y
        </h2>

        <p className="text-instruction">
          La letra Y nos ayuda a unir dos personas,
          animales u objetos.
        </p>

        <div className="comprehension-grid">
          <Card className="comprehension-grid__item">
            <span
              className="comprehension-list__number"
              aria-hidden="true"
            >
              1
            </span>

            <p className="text-reading">
              paloma Y conejo
            </p>
          </Card>

          <Card className="comprehension-grid__item">
            <span
              className="comprehension-list__number"
              aria-hidden="true"
            >
              2
            </span>

            <p className="text-reading">
              pelota Y tambor
            </p>
          </Card>

          <Card className="comprehension-grid__item">
            <span
              className="comprehension-list__number"
              aria-hidden="true"
            >
              3
            </span>

            <p className="text-reading">
              cuaderno Y lápiz
            </p>
          </Card>
        </div>
      </section>

      <section aria-labelledby="y-activities-title">
        <h2 id="y-activities-title">
          Practiquemos
        </h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Link2}
            title="Formar parejas"
            description="Observa dos imágenes y escucha cómo se unen con la letra Y."
            footer={
              <Button
                to="/actividad/y-formar-parejas"
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
            icon={Images}
            title="Unir imágenes"
            description="Selecciona las imágenes que pertenecen a la misma pareja."
            footer={
              <Button
                to="/actividad/y-unir-imagenes"
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
            description="Completa frases utilizando imágenes y la letra Y."
            footer={
              <Button
                to="/actividad/y-final"
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

export default LeccionYPage