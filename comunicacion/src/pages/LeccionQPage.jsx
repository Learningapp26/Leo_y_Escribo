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
  qComprehensionQuestions,
  qOrderInstructionAudio,
  qOrderScenes,
  qReading,
} from '../data/qData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/completion.css'
import '../styles/reading.css'

function LeccionQPage() {
  const themeClass = getLessonThemeClass('q')

  // Actividad de comprensión: tocar las escenas en el orden correcto
  const [orderedIds, setOrderedIds] = useState([])
  const [orderResult, setOrderResult] = useState('')

  const allSelected = orderedIds.length === qOrderScenes.length

  const pickScene = (item) => {
    if (orderResult === 'correct') return

    setOrderResult('')

    setOrderedIds((current) => {
      // Tocar una escena ya elegida la quita del orden
      if (current.includes(item.id)) {
        return current.filter((id) => id !== item.id)
      }

      if (current.length >= qOrderScenes.length) return current

      return [...current, item.id]
    })
  }

  const checkOrder = () => {
    if (!allSelected) return

    const isCorrect = orderedIds.every((id, index) => {
      const item = qOrderScenes.find((scene) => scene.id === id)
      return item?.answer === String(index + 1)
    })

    setOrderResult(isCorrect ? 'correct' : 'retry')
  }

  const retryOrder = () => {
    setOrderedIds([])
    setOrderResult('')
  }

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="q-lesson-title"
    >
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 2</span>

        <h1 id="q-lesson-title">La letra Q</h1>

        <p className="text-instruction">
          Hoy aprenderás una letra con la que escribirás muchas palabras: la
          cu. Escucha la siguiente historia.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(qReading.instructionAudio)}
          data-audio-src={qReading.instructionAudio}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{qReading.title}</h2>

          <div className="reading-story">
            {qReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(qReading.readingAudio)}
              data-audio-src={qReading.readingAudio}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={qReading.image} alt={qReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="q-orden-title"
      >
        <h2 id="q-orden-title">¿Qué pasó primero?</h2>

        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Mira las imágenes. ¿Qué pasó primero?, ¿qué pasó después?
              Selecciónalas según el orden en que sucedieron en la historia.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(qOrderInstructionAudio)}
              data-audio-src={qOrderInstructionAudio}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {qOrderScenes.map((item) => {
              const position = orderedIds.indexOf(item.id) + 1
              const isSelected = position > 0

              const stateClass =
                orderResult && isSelected
                  ? orderResult === 'correct'
                    ? 'selection-button--correct'
                    : 'selection-button--incorrect'
                  : isSelected
                    ? 'selection-button--selected'
                    : ''

              return (
                <button
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={item.id}
                  aria-pressed={isSelected}
                  onClick={() => pickScene(item)}
                >
                  <img
                    className="selection-image"
                    src={item.image}
                    alt={`Escena de la historia`}
                    draggable={false}
                  />

                  <span className="selection-word">
                    {isSelected ? ` ${position}` : 'Toca para ordenar'}
                  </span>
                </button>
              )
            })}
          </div>

          {orderResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Ese es el orden correcto de la historia.
            </p>
          )}

          {orderResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Ese no es el orden correcto. Revisa otra vez.
            </p>
          )}

          {orderResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!allSelected}
              onClick={checkOrder}
            >
              Comprobar
            </Button>
          )}

          {orderResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryOrder}
            >
              Intentar nuevamente
            </Button>
          )}
        </Card>
      </section>

      <section
        className="comprehension-section"
        aria-labelledby="q-comprehension-title"
      >
        <h2 id="q-comprehension-title">Conversemos sobre el cuento</h2>

        <p className="text-instruction">
          Estas preguntas se trabajan de forma oral, guiadas por la maestra.
          No es necesario responderlas por escrito.
        </p>

        <div className="comprehension-grid">
          {qComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>

              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="q-activities-title">
        <h2 id="q-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconoce el sonido de Q"
            description="Escucha la palabra queso, encuentra las que empiezan igual y ubica dónde suena /q/."
            footer={
              <Button
                to="/actividad/q-sonidos"
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
            title="Sílabas que y qui"
            description="Aprende cómo se escribe la q y reconoce las sílabas que y qui."
            footer={
              <Button
                to="/actividad/q-silabas"
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
            description="Elige la sílaba correcta y une sílabas para formar palabras con q."
            footer={
              <Button
                to="/actividad/q-completar"
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
            description="Repasa palabras con q y completa oraciones."
            footer={
              <Button
                to="/actividad/q-final"
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

export default LeccionQPage
