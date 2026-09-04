import { ArrowRight, Ear, ListMusic, PenLine, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import { trComprehensionQuestions, trReading } from '../data/trData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/reading.css'
import '../styles/lesson-tr.css'

function LeccionTrPage() {
  const themeClass = getLessonThemeClass('tr')

  return (
    <main
      className={`page reading-page lesson-tr ${themeClass}`}
      aria-labelledby="tr-lesson-title"
    >
      <BackButton label="Volver a la Unidad 3" to="/lecciones/unidad/3" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 3</span>

        <h1 id="tr-lesson-title">Combinación TR</h1>

        <p className="text-instruction">
          Hoy aprenderás dos letras juntas: la te y la erre. Escucha la
          siguiente historia.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(trReading.instructionAudio)}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{trReading.title}</h2>

          <div className="reading-story">
            {trReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(trReading.readingAudio)}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={trReading.image} alt={trReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="tr-comprehension-title"
      >
        <h2 id="tr-comprehension-title">Conversemos sobre el cuento</h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {trComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>

              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="tr-activities-title">
        <h2 id="tr-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Ear}
            title="Reconoce el sonido de TR"
            description="Escucha la palabra tren y encuentra dibujos que tienen el sonido /tr/."
            footer={
              <Button
                to="/actividad/tr-sonidos"
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
            title="Sílabas tra, tre, tri, tro y tru"
            description="Aprende cómo se escribe tr y reconoce sus sílabas."
            footer={
              <Button
                to="/actividad/tr-silabas"
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
            title="Forma palabras con TR"
            description="Ordena las sílabas para formar palabras con tr."
            footer={
              <Button
                to="/actividad/tr-completar"
                variant="secondary"
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

export default LeccionTrPage
