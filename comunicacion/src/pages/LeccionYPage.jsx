import {
  ArrowRight,
  BookOpen,
  Images,
  Link2,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import { yReading } from '../data/yConjunctionData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/y-conjunction.css'

function LeccionYPage() {
  const themeClass =
    getLessonThemeClass('y-conjuncion')

  return (
    <main
      className={`page y-page ${themeClass}`}
      aria-labelledby="y-lesson-title"
    >
      <section className="y-page__content">
        <BackButton
          label="Volver a lecciones"
          to="/lecciones"
        />

        <header className="y-page__header">
          <span className="y-page__unit">
            Unidad 1
          </span>

          <h1
            className="y-page__title"
            id="y-lesson-title"
          >
            La y une palabras
          </h1>

          <p className="text-instruction y-page__instruction">
            Escucha la historia y descubre cómo usamos la
            palabra y para unir dos elementos.
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(yReading.instructionAudio)
            }
          >
            Escuchar instrucción
          </Button>
        </header>

        <ProgressBar
          value={1}
          max={4}
          label="Parte 1 de 4"
        />

        <Card className="y-reading-card">
          <img
            className="y-reading-card__illustration"
            src={yReading.image}
            alt={yReading.imageAlt}
          />

          <div className="y-reading-card__story">
            <h2>
              {yReading.title}
            </h2>

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

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            fullWidth
            onClick={() =>
              playAudio(yReading.readingAudio)
            }
          >
            Escuchar la historia
          </Button>
        </Card>

        <section
          className="y-explanation"
          aria-label="Ejemplo del uso de la palabra y"
        >
          <span className="y-explanation__word">
            paloma
          </span>

          <span
            className="y-connector"
            aria-label="y"
          >
            y
          </span>

          <span className="y-explanation__word">
            conejo
          </span>
        </section>

        <section aria-labelledby="y-activities-title">
          <h2 id="y-activities-title">
            Practiquemos
          </h2>

          <div className="y-lesson-menu">
            <Card
              className="y-lesson-menu__card"
              icon={Link2}
              title="Formar parejas"
              description="Observa las parejas del libro y escucha cómo se unen con la palabra y."
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
              className="y-lesson-menu__card"
              icon={Images}
              title="Unir imágenes"
              description="Selecciona las dos imágenes que pertenecen a la misma pareja."
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
              className="y-lesson-menu__card"
              icon={BookOpen}
              title="Actividad final"
              description="Completa frases utilizando imágenes y la palabra y."
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
      </section>
    </main>
  )
}

export default LeccionYPage