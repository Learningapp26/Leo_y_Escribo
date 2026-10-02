import { ArrowRight, Ear, ListMusic, PenLine, Sparkles, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import { vComprehensionQuestions, vReading } from '../data/vData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/reading.css'

function LeccionVPage() {
  const themeClass = getLessonThemeClass('v')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="v-lesson-title"
    >
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 4</span>

        <h1 id="v-lesson-title">La letra V v</h1>

        <p className="text-instruction">
          Ahora es tiempo de aprender la letra uve. Para empezar, escucha
          una historia.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(vReading.instructionAudio)}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{vReading.title}</h2>

          <div className="reading-story">
            {vReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(vReading.readingAudio)}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={vReading.image} alt={vReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="v-comprehension-title"
      >
        <h2 id="v-comprehension-title">Conversemos sobre el cuento</h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {vComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>

              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="v-activities-title">
        <h2 id="v-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Ear}
            title="Reconoce el sonido de V"
            description="Escucha la palabra vaca y encuentra dibujos que tienen el sonido /v/."
            footer={
              <Button to="/actividad/v-sonidos" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />

          <Card
            className="lesson-activity-menu__card"
            icon={ListMusic}
            title="Sílabas va, ve, vi, vo y vu"
            description="Aprende cómo se escribe la v y reconoce sus sílabas."
            footer={
              <Button to="/actividad/v-silabas" variant="support" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />

          <Card
            className="lesson-activity-menu__card"
            icon={PenLine}
            title="Completa palabras"
            description="Elige la sílaba o la palabra correcta para completar cada nombre."
            footer={
              <Button to="/actividad/v-completar" variant="secondary" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />

          <Card
            className="lesson-activity-menu__card"
            icon={Sparkles}
            title="Actividad final"
            description="Repasa palabras con v y relaciona oraciones con su dibujo."
            footer={
              <Button to="/actividad/v-final" variant="reward" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />
        </div>
      </section>
    </main>
  )
}

export default LeccionVPage
