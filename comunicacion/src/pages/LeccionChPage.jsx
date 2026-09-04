import { ArrowRight, Ear, ListMusic, PenLine, Sparkles, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import { chComprehensionQuestions, chReading } from '../data/chData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/reading.css'

function LeccionChPage() {
  const themeClass = getLessonThemeClass('ch')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="ch-lesson-title"
    >
      <BackButton label="Volver a la Unidad 3" to="/lecciones/unidad/3" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 3</span>

        <h1 id="ch-lesson-title">Combinación CH</h1>

        <p className="text-instruction">
          Aprenderás una nueva letra, la che. Pero antes, escucha la
          historia de Chailú.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(chReading.instructionAudio)}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{chReading.title}</h2>

          <div className="reading-story">
            {chReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(chReading.readingAudio)}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={chReading.image} alt={chReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="ch-comprehension-title"
      >
        <h2 id="ch-comprehension-title">Conversemos sobre el cuento</h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {chComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>

              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="ch-activities-title">
        <h2 id="ch-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Ear}
            title="Reconoce el sonido de CH"
            description="Escucha la palabra chocolate y encuentra dibujos que tienen el sonido /ch/."
            footer={
              <Button to="/actividad/ch-sonidos" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />

          <Card
            className="lesson-activity-menu__card"
            icon={ListMusic}
            title="Sílabas cha, che, chi, cho y chu"
            description="Aprende cómo se escribe ch y reconoce sus sílabas."
            footer={
              <Button to="/actividad/ch-silabas" variant="support" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />

          <Card
            className="lesson-activity-menu__card"
            icon={PenLine}
            title="Completa palabras"
            description="Elige y une sílabas para formar palabras con ch."
            footer={
              <Button to="/actividad/ch-completar" variant="secondary" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />

          <Card
            className="lesson-activity-menu__card"
            icon={Sparkles}
            title="Actividad final"
            description="Repasa palabras con ch y completa oraciones."
            footer={
              <Button to="/actividad/ch-final" variant="reward" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />
        </div>
      </section>
    </main>
  )
}

export default LeccionChPage
