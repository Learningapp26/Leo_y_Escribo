import { useState } from 'react'
import {ArrowRight,BookOpen,MessageCircleQuestion,Puzzle,Volume2, } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import {rReading,rReadingQuestions,} from '../data/rLessonData'
import { playAudio } from '../lib/audioPlayer'

function LeccionRPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({})

  const themeClass = getLessonThemeClass('r')

  const selectAnswer = (questionId, answer) => {
    setSelectedAnswers((current) => ({
      ...current,
      [questionId]: answer,
    }))
  }

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="r-lesson-title"
    >
      <BackButton
        label="Volver a la Unidad 1"
        to="/lecciones/unidad/1"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Letra R
        </span>

        <h1 id="r-lesson-title">
          Aprendemos la letra R
        </h1>

        <p className="text-instruction">
          Escucha la historia y presta atención a las
          palabras que tienen la letra R.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={() =>
            playAudio(rReading.instructionAudio)
          }
          data-audio-src={rReading.instructionAudio}
        >
          Escuchar instrucción
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">
            {rReading.title}
          </h2>

          <div className="reading-story">
            <p className="text-reading">
              {rReading.introduction}
            </p>

            {rReading.paragraphs.map((paragraph) => (
              <p
                className="text-reading"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="reading-audio">
            <Button
              variant="audio"
              size="large"
              icon={Volume2}
              onClick={() =>
                playAudio(rReading.readingAudio)
              }
              data-audio-src={rReading.readingAudio}
            >
              Escuchar la historia
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img
            src={rReading.image}
            alt={rReading.imageAlt}
          />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="r-questions-title"
      >
        <h2 id="r-questions-title">
          Comprendamos la historia
        </h2>

        <div className="comprehension-list">
          {rReadingQuestions.map((question, index) => {
            const selectedAnswer =
              selectedAnswers[question.id]

            return (
              <Card
                className="comprehension-list__item"
                key={question.id}
              >
                <span
                  className="comprehension-list__number"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                <p className="text-instruction">
                  {question.question}
                </p>

                <Button
                  variant="audio"
                  size="small"
                  icon={Volume2}
                  onClick={() =>
                    playAudio(question.audio)
                  }
                  data-audio-src={question.audio}
                >
                  Escuchar pregunta
                </Button>

                <div className="selection-options">
                  {question.options.map((option) => {
                    const selected =
                      selectedAnswer === option

                    const correct =
                      selected &&
                      option === question.answer

                    const incorrect =
                      selected &&
                      option !== question.answer

                    return (
                      <Button
                        key={option}
                        variant={
                          incorrect
                            ? 'retry'
                            : selected
                              ? 'primary'
                              : 'secondary'
                        }
                        className="selection-button"
                        aria-pressed={selected}
                        onClick={() =>
                          selectAnswer(question.id, option)
                        }
                      >
                        <span className="selection-word">
                          {option}
                        </span>
                      </Button>
                    )
                  })}
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="r-activities-title">
        <h2 id="r-activities-title">
          Practiquemos la letra R
        </h2>

        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={BookOpen}
            title="Sílabas con R"
            description="Escucha y reconoce las sílabas ra, re, ri, ro y ru."
            footer={
              <Button
                to="/actividad/r-silabas"
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
            icon={MessageCircleQuestion}
            title="R fuerte y R suave"
            description="Escucha palabras y clasifica el sonido de la letra R."
            footer={
              <Button
                to="/actividad/r-sonidos"
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
            icon={Puzzle}
            title="Completar palabras"
            description="Selecciona la sílaba correcta y completa palabras y oraciones."
            footer={
              <Button
                to="/actividad/r-final"
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

export default LeccionRPage