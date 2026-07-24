import { ArrowRight, BookOpen } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import '../styles/vowels.css'

const vocales = ['a', 'e', 'i', 'o', 'u']

function LeccionVocalesPage() {
  return (
    <main className="page vowels-page lesson-theme--unit-1">
      <section
        className="vowels-page__content"
        aria-labelledby="titulo-vocales"
      >
        <BackButton
          label="Volver a lecciones"
          to="/lecciones"
        />

        <header className="vowels-page__header">
          <span className="vowels-page__unit">
            Unidad 1
          </span>

          <h1 id="titulo-vocales">
            Repaso de las vocales
          </h1>

          <p className="text-instruction">
            Recordemos las cinco vocales antes de comenzar la actividad.
          </p>
        </header>

        <Card className="vowels-review-card">
          <BookOpen
            className="vowels-review-card__icon"
            aria-hidden="true"
          />

          <h2>Estas son las vocales</h2>

          <div
            className="vowels-list"
            aria-label="a, e, i, o, u"
          >
            {vocales.map((vocal) => (
              <span
                className="vowels-list__item text-letter"
                key={vocal}
              >
                {vocal}
              </span>
            ))}
          </div>

          <p className="text-reading">
            Observa cada letra y pronuncia su sonido.
          </p>
        </Card>

        <Card
          className="vowels-activity-summary"
          title="Actividad: encuentra la vocal"
          description="Lee la instrucción y selecciona la vocal correcta. Completa tres ejercicios."
          footer={
            <Button
              to="/actividad/vocales-inicial"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Comenzar actividad
            </Button>
          }
        />
      </section>
    </main>
  )
}

export default LeccionVocalesPage