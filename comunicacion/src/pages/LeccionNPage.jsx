import {ArrowRight,Images,ListMusic,PenLine,Sparkles, Volume2, } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import { nComprehensionQuestions, nReading } from '../data/nLectura'
import { playAudio } from '../lib/audioPlayer'
import '../styles/reading.css'

function getAudioLabel(label, audio) {
  return audio ? label : `${label} pendiente`
}

function LeccionNPage() {
  const themeClass = getLessonThemeClass('n')

  return (
    <main
      className={`page reading-page ${themeClass}`}
      aria-labelledby="n-lesson-title"
    >
      <BackButton label="Volver a la Unidad 1" to="/lecciones/unidad/1" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 1</span>

        <h1 id="n-lesson-title">La letra N</h1>

        <p className="text-instruction">
          Escucha la historia con atención y descubre el sonido de la letra N.
        </p>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          disabled={!nReading.instructionAudio}
          onClick={() => playAudio(nReading.instructionAudio)}
          data-audio-src={nReading.instructionAudio}
        >
          {getAudioLabel('Escuchar instrucción', nReading.instructionAudio)}
        </Button>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{nReading.title}</h2>

          <div className="reading-story">
            <p className="text-reading">{nReading.introduction}</p>

            {nReading.paragraphs.map((paragraph) => (
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
              disabled={!nReading.readingAudio}
              onClick={() => playAudio(nReading.readingAudio)}
              data-audio-src={nReading.readingAudio}
            >
              {getAudioLabel('Escuchar la historia', nReading.readingAudio)}
            </Button>
          </div>
        </div>

        <div className="reading-image">
          <img src={nReading.image} alt={nReading.imageAlt} />
        </div>
      </Card>

      <section
        className="comprehension-section"
        aria-labelledby="n-comprehension-title"
      >
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
            title="Reconocer imágenes"
            description="Escucha el sonido /n/ y descubre qué imágenes empiezan igual."
            footer={
              <Button
                to="/actividad/n-imagenes"
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
            title="Sílabas con N"
            description="Reconoce na, ne, ni, no y nu en palabras nuevas."
            footer={
              <Button
                to="/actividad/n-silabas"
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
            description="Elige la sílaba que falta y une sílabas con no."
            footer={
              <Button
                to="/actividad/n-completar"
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
            description="Lee palabras, elige oraciones y relaciona oraciones con imágenes."
            footer={
              <Button
                to="/actividad/n-final"
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

export default LeccionNPage
