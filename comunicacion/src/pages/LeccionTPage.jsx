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
  tReading,
} from '../data/tData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/completion.css'
import '../styles/reading.css'

function LeccionTPage() {
  const themeClass = getLessonThemeClass('t')

  // Actividad de comprensión: tocar las escenas en el orden correcto
  const [orderedIds, setOrderedIds] = useState([])
  const [orderResult, setOrderResult] = useState('')

  const allSelected = orderedIds.length === tComprehensionQuestions.length

  const pickScene = (item) => {
    if (orderResult === 'correct') return

    setOrderResult('')

    setOrderedIds((current) => {
      // Tocar una escena ya elegida la quita del orden
      if (current.includes(item.id)) {
        return current.filter((id) => id !== item.id)
      }

      if (current.length >= tComprehensionQuestions.length) return current

      return [...current, item.id]
    })
  }

  const checkOrder = () => {
    if (!allSelected) return

    const isCorrect = orderedIds.every((id, index) => {
      const item = tComprehensionQuestions.find((question) => question.id === id)
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
          <div className="selection-instructions">
            <p className="text-instruction">
              Observa las imágenes de las escenas. Luego seleccionalas
              según el orden en que sucedieron en la historia.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(tOrderInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {tComprehensionQuestions.map((item) => {
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
                    alt={`Escena ${item.scene}`}
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