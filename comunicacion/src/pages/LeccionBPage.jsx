import { ArrowRight, Images, ListMusic, PenLine, Sparkles, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import {
  bComprehensionQuestions,
  bConversationInstructionAudio,
  bReading,
} from '../data/bData'
import { getLessonThemeClass } from '../data/lessonColors'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function LeccionBPage() {
  const themeClass = getLessonThemeClass('b')

  return (
    <main className={`page reading-page ${themeClass}`} aria-labelledby="b-lesson-title">
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 3</span>
        <h1 id="b-lesson-title">La letra B b</h1>
        <p className="text-instruction">
          Ha llegado el momento de aprender la letra B. Mira bien cómo se ven la B
          mayúscula y la b minúscula. Escucha la siguiente historia.
        </p>
        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(bReading.instructionAudio)}
          data-audio-src={bReading.instructionAudio}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{bReading.title}</h2>
          <div className="reading-story">
            {bReading.paragraphs.map((paragraph) => (
              <p className="text-reading" key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="reading-audio">
            <Button
              variant="audio"
              size="large"
              icon={Volume2}
              onClick={() => playAudio(bReading.readingAudio)}
              data-audio-src={bReading.readingAudio}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={bReading.image} alt={bReading.imageAlt} />
        </div>
      </Card>

      <section className="comprehension-section" aria-labelledby="b-conversation-title">
        <h2 id="b-conversation-title">Conversemos</h2>
        <div className="selection-instructions">
          <p className="text-instruction">
            Comenta estas preguntas con tu maestra y tus compañeros. No necesitas
            escribir las respuestas.
          </p>
          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(bConversationInstructionAudio)}
            data-audio-src={bConversationInstructionAudio}
          >
            Escuchar instrucción
          </Button>
        </div>
        <div className="comprehension-grid">
          {bComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>
              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="b-activities-title">
        <h2 id="b-activities-title">Practiquemos</h2>
        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce la letra B"
            description="Escucha palabras y encuentra las imágenes cuyos nombres llevan la letra B."
            footer={<Button to="/actividad/b-sonidos" icon={ArrowRight} iconPosition="right" fullWidth>Comenzar</Button>}
          />
          <Card
            className="lesson-activity-menu__card"
            icon={ListMusic}
            title="Sílabas con B"
            description="Mira bien la B y la b, escucha bo, ba, be, bi y bu, y relaciónalas con palabras."
            footer={<Button to="/actividad/b-silabas" variant="support" icon={ArrowRight} iconPosition="right" fullWidth>Comenzar</Button>}
          />
          <Card
            className="lesson-activity-menu__card"
            icon={PenLine}
            title="Completa palabras"
            description="Elige sílabas para completar y formar palabras del libro sin escribir."
            footer={<Button to="/actividad/b-completar" variant="secondary" icon={ArrowRight} iconPosition="right" fullWidth>Comenzar</Button>}
          />
          <Card
            className="lesson-activity-menu__card"
            icon={Sparkles}
            title="Actividad final"
            description="Lee palabras con B y completa las oraciones del libro eligiendo imágenes."
            footer={<Button to="/actividad/b-final" variant="reward" icon={ArrowRight} iconPosition="right" fullWidth>Comenzar</Button>}
          />
        </div>
      </section>
    </main>
  )
}

export default LeccionBPage
