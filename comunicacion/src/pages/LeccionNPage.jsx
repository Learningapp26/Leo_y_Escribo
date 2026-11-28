import { getLessonHeading } from '../data/lessonLabels'
import { ArrowRight, Images, ListMusic, PenLine, Sparkles } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import LessonAudioButton from '../components/common/LessonAudioButton'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  asAudio,
  nActivitiesInstructionAudio,
  nComprehensionQuestions,
  nReading,
} from '../data/nData'
import '../styles/reading.css'
import '../styles/selection.css'
import StoryCard from '../components/lessons/StoryCard'

function LeccionNPage() {
  const themeClass = getLessonThemeClass('n')

  return (
    <main className={`page reading-page ${themeClass}`} aria-labelledby="n-lesson-title">
      <BackButton label="Volver a la Unidad 1" to="/lecciones/unidad/1" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 1</span>
        <h1 id="n-lesson-title">{getLessonHeading('n')}</h1>

        <div className="selection-instructions">
          <p className="text-instruction">
            Escucha la historia con atención y descubre el sonido de la letra N.
          </p>
          <LessonAudioButton audio={asAudio(nReading.instructionAudio)} size="large">
            Escuchar instrucción
          </LessonAudioButton>
        </div>
      </header>

      <StoryCard
        lessonId="n"
        title={nReading.title}
        paragraphs={nReading.paragraphs}
        image={nReading.image}
        imageAlt={nReading.imageAlt}
        audio={nReading.readingAudio ?? undefined}
      />

      <section className="comprehension-section" aria-labelledby="n-comprehension-title">
        <h2 id="n-comprehension-title">Conversemos sobre el cuento</h2>
        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>
        <div className="comprehension-grid">
          {nComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>
              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="n-activities-title">
        <h2 id="n-activities-title">Practiquemos</h2>


        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce el sonido N"
            description="Escucha el sonido /n/, encuentra imágenes que empiezan igual y une palabras que riman."
            footer={
              <Button to="/actividad/n-imagenes" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />
          <Card
            className="lesson-activity-menu__card"
            icon={ListMusic}
            title="Sílabas con N"
            description="Conoce na, ne, ni, no y nu, y encuéntralas en palabras."
            footer={
              <Button to="/actividad/n-silabas" variant="support" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />
          <Card
            className="lesson-activity-menu__card"
            icon={PenLine}
            title="Completar palabras"
            description="Elige la sílaba que falta y forma palabras con no."
            footer={
              <Button to="/actividad/n-completar" variant="secondary" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />
          <Card
            className="lesson-activity-menu__card"
            icon={Sparkles}
            title="Actividad final"
            description="Lee palabras y oraciones, y relaciónalas con imágenes."
            footer={
              <Button to="/actividad/n-final" variant="reward" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />
        </div>
      </section>
    </main>
  )
}

export default LeccionNPage
