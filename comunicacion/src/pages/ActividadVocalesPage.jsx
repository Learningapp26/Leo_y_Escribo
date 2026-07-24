import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import '../styles/vowels.css'

const ejercicios = [
  {
    palabra: 'avión',
    imagen: '✈️',
    respuesta: 'a',
  },
  {
    palabra: 'elefante',
    imagen: '🐘',
    respuesta: 'e',
  },
  {
    palabra: 'oso',
    imagen: '🐻',
    respuesta: 'o',
  },
]

const vocales = ['a', 'e', 'i', 'o', 'u']

function ActividadVocalesPage() {
  const [ejercicioActual, setEjercicioActual] = useState(0)
  const [vocalSeleccionada, setVocalSeleccionada] = useState('')
  const [resultado, setResultado] = useState(null)
  const [actividadTerminada, setActividadTerminada] = useState(false)

  const ejercicio = ejercicios[ejercicioActual]

  const comprobarRespuesta = () => {
    if (!vocalSeleccionada) return

    const esCorrecta =
      vocalSeleccionada === ejercicio.respuesta

    setResultado(esCorrecta ? 'correcto' : 'reintento')
  }

  const siguienteEjercicio = () => {
    const esUltimo =
      ejercicioActual === ejercicios.length - 1

    if (esUltimo) {
      setActividadTerminada(true)
      return
    }

    setEjercicioActual(ejercicioActual + 1)
    setVocalSeleccionada('')
    setResultado(null)
  }

  if (actividadTerminada) {
    return (
      <main className="page vowels-page lesson-theme--unit-1">
        <section className="vowels-page__content">
          <Card className="vowels-result-card">
            <span
              className="vowels-result-card__icon"
              aria-hidden="true"
            >
              ⭐
            </span>

            <h1>¡Actividad completada!</h1>

            <p className="text-instruction">
              Identificaste la vocal inicial de cada palabra.
            </p>

            <Button
              to="/lecciones/vocales"
              variant="primary"
              size="large"
              fullWidth
            >
              Volver a la lección
            </Button>
          </Card>
        </section>
      </main>
    )
  }

  return (
    <main className="page vowels-page lesson-theme--unit-1">
      <section
        className="vowels-page__content"
        aria-labelledby="titulo-actividad"
      >
        <BackButton
          label="Volver a la lección"
          to="/lecciones/vocales"
        />

        <header className="vowels-page__header">
          <span className="vowels-page__unit">
            Repaso de las vocales
          </span>

          <h1 id="titulo-actividad">
            Encuentra la vocal inicial
          </h1>

          <p className="text-instruction">
            Observa la imagen y selecciona la vocal con la que
            comienza su nombre.
          </p>
        </header>

        <ProgressBar
          value={ejercicioActual + 1}
          max={ejercicios.length}
          label={`Ejercicio ${ejercicioActual + 1} de ${ejercicios.length}`}
        />

        <Card className="vowels-exercise-card">
          <div
            className="vowels-exercise-card__image"
            role="img"
            aria-label={ejercicio.palabra}
          >
            {ejercicio.imagen}
          </div>

          <h2 className="vowels-exercise-card__word">
            {ejercicio.palabra}
          </h2>

          <p className="text-reading">
            ¿Con qué vocal comienza?
          </p>

          <div
            className="vowels-options"
            aria-label="Opciones de vocales"
          >
            {vocales.map((vocal) => (
              <Button
                key={vocal}
                variant={
                  vocalSeleccionada === vocal
                    ? 'selected'
                    : 'secondary'
                }
                size="large"
                className="vowels-options__button text-letter"
                aria-pressed={vocalSeleccionada === vocal}
                onClick={() => {
                  setVocalSeleccionada(vocal)
                  setResultado(null)
                }}
              >
                {vocal}
              </Button>
            ))}
          </div>

          {resultado === 'correcto' && (
            <p
              className="feedback feedback--success"
              role="status"
            >
              ¡Muy bien! Elegiste la vocal correcta.
            </p>
          )}

          {resultado === 'reintento' && (
            <p
              className="feedback feedback--retry"
              role="status"
            >
              Casi lo logras. Escucha la palabra e inténtalo otra vez.
            </p>
          )}

          <div className="vowels-exercise-card__actions">
            {resultado !== 'correcto' ? (
              <Button
                variant="primary"
                size="large"
                icon={Check}
                fullWidth
                disabled={!vocalSeleccionada}
                onClick={comprobarRespuesta}
              >
                Comprobar respuesta
              </Button>
            ) : (
              <Button
                variant="primary"
                size="large"
                icon={ArrowRight}
                iconPosition="right"
                fullWidth
                onClick={siguienteEjercicio}
              >
                {ejercicioActual === ejercicios.length - 1
                  ? 'Finalizar actividad'
                  : 'Siguiente ejercicio'}
              </Button>
            )}
          </div>
        </Card>
      </section>
    </main>
  )
}

export default ActividadVocalesPage