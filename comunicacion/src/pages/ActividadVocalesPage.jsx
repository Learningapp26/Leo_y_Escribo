import { useState } from 'react'
import {
  ArrowRight,
  Check,
  RotateCcw,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { playAudio } from '../lib/audioPlayer'
import '../styles/vowels.css'

const ejercicios = [
  {
    palabra: 'avion',
    // imagen: '/images/lecciones/vocales/avion.png',
    respuesta: 'a',
    audio: '/audio/lecciones/vocales/avion.mp3',
  },
  {
    palabra: 'elefante',
    // imagen: '/images/lecciones/vocales/elefante.png',
    respuesta: 'e',
    audio: '/audio/lecciones/vocales/elefante.mp3',
  },
  {
    palabra: 'oso',
    // imagen: '/images/lecciones/vocales/oso.png',
    respuesta: 'o',
    audio: '/audio/lecciones/vocales/oso.mp3',
  },
]

const vocales = ['a', 'e', 'i', 'o', 'u']

function ActividadVocalesPage() {
  const [ejercicioActual, setEjercicioActual] = useState(0)
  const [vocalSeleccionada, setVocalSeleccionada] = useState('')
  const [resultado, setResultado] = useState('')
  const [actividadTerminada, setActividadTerminada] = useState(false)

  const ejercicio = ejercicios[ejercicioActual]

  const comprobarRespuesta = () => {
    if (!vocalSeleccionada) return

    const esCorrecta =
      vocalSeleccionada === ejercicio.respuesta

    setResultado(esCorrecta ? 'correcto' : 'reintento')
  }

  const reintentarEjercicio = () => {
    setVocalSeleccionada('')
    setResultado('')
  }

  const siguienteEjercicio = () => {
    const esUltimo =
      ejercicioActual === ejercicios.length - 1

    if (esUltimo) {
      setActividadTerminada(true)
      return
    }

    setEjercicioActual((actual) => actual + 1)
    setVocalSeleccionada('')
    setResultado('')
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
              *
            </span>

            <h1>Terminaste la actividad</h1>

            <p className="text-instruction">
              Identificaste la vocal inicial de cada palabra.
            </p>

            <Button
              to="/lecciones/vocales"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Volver a la leccion
            </Button>
          </Card>
        </section>
      </main>
    )
  }

  return (
    <main
      className="page vowels-page lesson-theme--unit-1"
      aria-labelledby="titulo-actividad"
    >
      <section className="vowels-page__content">
        <BackButton
          label="Volver a la leccion"
          to="/lecciones/vocales"
        />

        <header className="vowels-page__header">
          <span className="vowels-page__unit">
            Actividad 1
          </span>

          <h1 id="titulo-actividad">
            Encuentra la vocal inicial
          </h1>

          <p className="text-instruction vowels-page__instruction">
            Escucha la palabra y selecciona la vocal con la que
            comienza su nombre.
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(
                '/audio/lecciones/vocales/instruccion-vocal-inicial.mp3',
              )
            }
          >
            Escuchar instruccion
          </Button>
        </header>

        <ProgressBar
          value={ejercicioActual + 1}
          max={ejercicios.length}
          label={`Ejercicio ${ejercicioActual + 1} de ${ejercicios.length}`}
        />

        <Card className="vowels-exercise-card">
          {/*
          <img
            className="vowels-exercise-card__image"
            src={ejercicio.imagen}
            alt={ejercicio.palabra}
          />
          */}

          <h2 className="vowels-exercise-card__word">
            {ejercicio.palabra}
          </h2>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            fullWidth
            onClick={() => playAudio(ejercicio.audio)}
          >
            Escuchar palabra
          </Button>

          <p className="text-reading">
            Con que vocal comienza?
          </p>

          <div
            className="vowels-options"
            aria-label="Opciones de vocales"
          >
            {vocales.map((vocal) => {
              const selected = vocalSeleccionada === vocal

              return (
                <Button
                  key={vocal}
                  variant={
                    selected
                      ? 'selected'
                      : 'secondary'
                  }
                  size="large"
                  className="vowels-options__button text-letter"
                  aria-pressed={selected}
                  onClick={() => {
                    setVocalSeleccionada(vocal)
                    setResultado('')
                  }}
                >
                  {vocal}
                </Button>
              )
            })}
          </div>

          {resultado === 'correcto' && (
            <p
              className="feedback feedback--success"
              role="status"
            >
              Muy bien! Elegiste la vocal correcta.
            </p>
          )}

          {resultado === 'reintento' && (
            <p
              className="feedback feedback--retry"
              role="status"
            >
              Casi lo logras. Escucha la palabra e intentalo otra vez.
            </p>
          )}

          <div className="vowels-exercise-card__actions">
            {!resultado && (
              <Button
                icon={Check}
                size="large"
                fullWidth
                disabled={!vocalSeleccionada}
                onClick={comprobarRespuesta}
              >
                Comprobar respuesta
              </Button>
            )}

            {resultado === 'reintento' && (
              <Button
                variant="retry"
                icon={RotateCcw}
                size="large"
                fullWidth
                onClick={reintentarEjercicio}
              >
                Intentar nuevamente
              </Button>
            )}

            {resultado === 'correcto' && (
              <Button
                icon={ArrowRight}
                iconPosition="right"
                size="large"
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
