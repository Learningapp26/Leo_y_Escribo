import { useState } from 'react'
import {
  ArrowRight,
  Check,
  Images,
  ListMusic,
  PenLine,
  RotateCcw,
  Sparkles,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  tComprehensionQuestions,
  tOrderInstructionAudio,
  tOrderOptions,
  tReading,
} from '../data/tData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/completion.css'
import '../styles/reading.css'

function LeccionTPage() {
  const themeClass = getLessonThemeClass('t')

  // Actividad de comprensión: asignar 1, 2 o 3 a cada escena
  const [selections, setSelections] = useState({})
  const [orderResult, setOrderResult] = useState('')

  const allSelected = tComprehensionQuestions.every(
    (item) => selections[item.id],
  )

  const pickNumber = (item, number) => {
    if (orderResult === 'correct') return

    setOrderResult('')

    setSelections((current) => {
      const updated = { ...current }

      // Ese número ya estaba en otra escena: se lo quitamos de ahí
      Object.keys(updated).forEach((key) => {
        if (updated[key] === number) delete updated[key]
      })

      // Tocar el mismo número que ya tenía esta escena lo deselecciona
      if (current[item.id] === number) {
        delete updated[item.id]
        return updated
      }

      updated[item.id] = number
      return updated
    })
  }

  const checkOrder = () => {
    if (!allSelected) return

    const isCorrect = tComprehensionQuestions.every(
      (item) => selections[item.id] === item.answer,
    )

    setOrderResult(isCorrect ? 'correct' : 'retry')
  }

  const retryOrder = () => {
    setSelections({})
    setOrderResult('')
  }

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="t-lesson-title"
    >
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 1</span>

        <h1 id="t-lesson-title">La letra T</h1>

        <p className="text-instruction">
          Hoy aprenderemos la letra t. Escucha la siguiente historia.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(tReading.instructionAudio)}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{tReading.title}</h2>

          <div className="reading-story">
            {tReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(tReading.readingAudio)}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={tReading.image} alt={tReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="t-comprehension-title"
      >
        <h2 id="t-comprehension-title">Conversemos sobre el cuento</h2>

        <Card className="selection-card">
        </Card>
      </section>

      <section aria-labelledby="t-activities-title">
        <h2 id="t-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce los sonidos"
            description="Escucha y reconoce los sonidos de la letra T"
            footer={
              <Button
                to="/actividad/t-sonidos"
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
            title="Sílabas con T"
            description="Reconoce las sílabas de T para formar palabras y aprender a leerlas"
            footer={
              <Button
                to="/actividad/t-silabas"
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
            description="Completa las palabras con las sílabas que faltan y forma palabras con la letra T"
            footer={
              <Button
                to="/actividad/t-completar"
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
            description="Practica todo lo aprendido con la letra T"
            footer={
              <Button
                to="/actividad/t-final"
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

export default LeccionTPage