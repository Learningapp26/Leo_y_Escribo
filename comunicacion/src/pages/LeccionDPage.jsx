import { useState } from 'react'
import {
  ArrowRight,
  Images,
  ListMusic,
  PenLine,
  Sparkles,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  dComprehensionQuestions,
  dOralQuestion,
  dReading,
} from '../data/dLectura'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function LeccionDPage() {
  const themeClass = getLessonThemeClass('d')

  const [answers, setAnswers] = useState({})
  const [checkedQuestions, setCheckedQuestions] = useState({})

  const handleSelectAnswer = (questionId, answer) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: answer,
    }))

    setCheckedQuestions((previous) => ({
      ...previous,
      [questionId]: false,
    }))
  }

  const handleCheckAnswer = (question) => {
    if (!answers[question.id]) return

    setCheckedQuestions((previous) => ({
      ...previous,
      [question.id]: true,
    }))
  }

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="d-lesson-title"
    >
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 2</span>

        <h1 id="d-lesson-title">La letra D</h1>

        <p className="text-instruction">
          Escucha la historia con atención y descubre el sonido de la letra D.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() => playAudio(dReading.instructionAudio)}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{dReading.title}</h2>

          <div className="reading-story">
            <p className="text-reading">{dReading.introduction}</p>

            {dReading.paragraphs.map((paragraph) => (
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
              onClick={() => playAudio(dReading.readingAudio)}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={dReading.image} alt={dReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="d-comprehension-title"
      >
        <h2 id="d-comprehension-title">
          Comprendamos el cuento
        </h2>

        <p className="text-instruction">
          Escoge la respuesta correcta para cada pregunta.
        </p>

        <div className="comprehension-grid">
          {dComprehensionQuestions.map((question, index) => {
            const selectedAnswer = answers[question.id]
            const wasChecked = checkedQuestions[question.id]
            const isCorrect =
              selectedAnswer === question.correctAnswer

            return (
              <Card
                className="comprehension-grid__item"
                key={question.id}
              >
                <span
                  className="comprehension-list__number"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                <p className="text-reading">
                  {question.question}
                </p>

                <div className="comprehension-options">
                  {question.options.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={
                        selectedAnswer === option
                          ? 'comprehension-option comprehension-option--selected'
                          : 'comprehension-option'
                      }
                      onClick={() =>
                        handleSelectAnswer(question.id, option)
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <Button
                  onClick={() => handleCheckAnswer(question)}
                  disabled={!selectedAnswer}
                >
                  Comprobar
                </Button>

                {wasChecked && (
                  <p
                    className={
                      isCorrect
                        ? 'comprehension-feedback comprehension-feedback--correct'
                        : 'comprehension-feedback comprehension-feedback--incorrect'
                    }
                  >
                    {isCorrect
                      ? '¡Muy bien!'
                      : 'Intenta nuevamente.'}
                  </p>
                )}
              </Card>
            )
          })}
        </div>

        <Card className="comprehension-grid__item">
          <h3>Ahora conversemos</h3>

          <p className="text-reading">
            {dOralQuestion}
          </p>

          <p className="text-instruction">
            Comenta tu respuesta con tu maestra y tus compañeros.
          </p>
        </Card>
      </section>

      <section aria-labelledby="d-activities-title">
        <h2 id="d-activities-title">Practiquemos</h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="Reconocer el sonido"
            description="Escucha el sonido /d/ y descubre en qué palabras y sílabas aparece."
            footer={
              <Button
                to="/actividad/d-imagenes"
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
            title="Sílabas con D"
            description="Cuenta sílabas y reconoce da, de, di, do y du."
            footer={
              <Button
                to="/actividad/d-silabas"
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
            description="Elige la sílaba que falta y forma palabras con la letra D."
            footer={
              <Button
                to="/actividad/d-completar"
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
            description="Lee palabras, completa oraciones y relaciona palabras con imágenes."
            footer={
              <Button
                to="/actividad/d-final"
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

export default LeccionDPage
