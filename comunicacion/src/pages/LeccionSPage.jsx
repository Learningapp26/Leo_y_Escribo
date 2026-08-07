import { ArrowRight, Images, ListMusic, PenLine, Sparkles } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import { sComprehensionQuestions, sReading } from '../data/sData'

import '../styles/reading.css'

function LeccionSPage() {
  const themeClass = getLessonThemeClass('s')

  return (
    <main className={`page reading-page ${themeClass}`} aria-labelledby="s-lesson-title">
      <BackButton label="Volver a lecciones" to="/lecciones" />

      <header className="text-center">
        <span className="text-ui-label">Unidad 1</span>
        <h1 id="s-lesson-title">La letra S</h1>
        <p className="text-instruction">
          Conoce la letra S, lee una fábula y practica sus sonidos y sílabas.
        </p>
      </header>

      <Card className="reading-card">
        <div className="reading-content">
          <h2 className="reading-title">{sReading.title}</h2>
          <div className="reading-story">
            {sReading.paragraphs.map((paragraph) => (
              <p className="text-reading" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          <p className="text-instruction">
            Lee despacio y busca las palabras que tengan la letra S.
          </p>
        </div>

        <div className="reading-image">
          <img src={sReading.image} alt={sReading.imageAlt} />
        </div>
      </Card>

      <section className="comprehension-section" aria-labelledby="s-comprehension-title">
        <h2 id="s-comprehension-title">Conversemos sobre el cuento</h2>
        <p className="text-instruction">
          Responde oralmente con tu maestra, maestro o persona que te acompañe.
        </p>
        <div className="comprehension-grid">
          {sComprehensionQuestions.map((question, index) => (
            <Card className="comprehension-grid__item" key={question}>
              <span className="comprehension-list__number" aria-hidden="true">
                {index + 1}
              </span>
              <p className="text-reading">{question}</p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="s-activities-title">
        <h2 id="s-activities-title">Practiquemos</h2>
        <div className="lesson-activity-menu">
          <Card
            className="lesson-activity-menu__card"
            icon={Images}
            title="El sonido S"
            description="Reconoce el sonido /s/ al inicio y al final de las palabras."
            footer={
              <Button to="/actividad/s-sonidos" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />
          <Card
            className="lesson-activity-menu__card"
            icon={ListMusic}
            title="Sílabas con S"
            description="Practica sa, se, si, so y su para completar palabras."
            footer={
              <Button to="/actividad/s-silabas" variant="support" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />
          <Card
            className="lesson-activity-menu__card"
            icon={PenLine}
            title="Formamos palabras"
            description="Ordena las sílabas y forma palabras sencillas con S."
            footer={
              <Button to="/actividad/s-completar" variant="secondary" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />
          <Card
            className="lesson-activity-menu__card"
            icon={Sparkles}
            title="Actividad final"
            description="Demuestra lo que aprendiste sobre el sonido, las sílabas y las palabras con S."
            footer={
              <Button to="/actividad/s-final" variant="reward" icon={ArrowRight} iconPosition="right" fullWidth>
                Comenzar
              </Button>
            }
          />
        </div>
      </section>
    </main>
  )
}

export default LeccionSPage
