import { useState } from 'react'
import {ArrowRight, Check, RotateCcw, Volume2, } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import {
  vowelAudioPaths,
  vowelInitialActivity,
  vowelInitialExercises,
  vowelOptions,
} from '../data/vocalesData'
import { playAudio } from '../lib/audioPlayer'
import {
  registrarLeccionCompletada,
  registrarProgreso,
} from '../lib/progreso'
import '../styles/vowels.css'

function ActividadVocalesPage() {
  const [ejercicioActual, setEjercicioActual] = useState(0)
  const [vocalSeleccionada, setVocalSeleccionada] = useState('')
  const [resultado, setResultado] = useState('')
  const [actividadTerminada, setActividadTerminada] = useState(false)
  const [guardandoProgreso, setGuardandoProgreso] = useState(false)
  const [errorGuardado, setErrorGuardado] = useState('')

  const ejercicio = vowelInitialExercises[ejercicioActual]

  const comprobarRespuesta = () => {
    if (!vocalSeleccionada) return

    const esCorrecta =
      vocalSeleccionada === ejercicio.respuesta

    setResultado(esCorrecta ? 'correcto' : 'reintento')

    registrarProgreso({
      actividad: vowelInitialActivity.activityId,
      correcto: esCorrecta,
      detalle: {
        leccionId: vowelInitialActivity.lessonId,
        ejercicioId: ejercicio.palabra,
      },
    })
  }

  const reintentarEjercicio = () => {
    setVocalSeleccionada('')
    setResultado('')
  }

  const siguienteEjercicio = async () => {
    const esUltimo =
      ejercicioActual === vowelInitialExercises.length - 1

    if (esUltimo) {
      if (guardandoProgreso) return

      setGuardandoProgreso(true)
      setErrorGuardado('')
      const { error, skipped } = await registrarLeccionCompletada(
        vowelInitialActivity.lessonId,
      )

      if (error || skipped) {
        setGuardandoProgreso(false)
        setErrorGuardado(
          skipped
            ? vowelInitialActivity.saveSessionError
            : vowelInitialActivity.saveGenericError,
        )
        return
      }

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

            <h1>{vowelInitialActivity.completionTitle}</h1>

            <p className="text-instruction">
              {vowelInitialActivity.completionMessage}
            </p>

            <Button
              to="/lecciones/unidad/1"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Volver a la lecciones
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
          to={vowelInitialActivity.lessonRoute}
        />

        <header className="vowels-page__header">
          <span className="vowels-page__unit">
            {vowelInitialActivity.unitLabel}
          </span>

          <h1 id="titulo-actividad">
            {vowelInitialActivity.title}
          </h1>

          <p className="text-instruction vowels-page__instruction">
            {vowelInitialActivity.instruction}
          </p>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(vowelInitialActivity.instructionAudio)
            }
          >
            Escuchar instruccion
          </Button>
        </header>

        <ProgressBar
          value={ejercicioActual + 1}
          max={vowelInitialExercises.length}
          label={`Ejercicio ${ejercicioActual + 1} de ${vowelInitialExercises.length}`}
        />

        <Card className="vowels-exercise-card">
          <img
            className="vowels-exercise-card__image"
            src={ejercicio.imagen}
            alt={ejercicio.palabra}
          />

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
            {vowelInitialActivity.prompt}
          </p>

          <div
            className="vowels-options"
            aria-label="Opciones de vocales"
          >
            {vowelOptions.map((vocal) => {
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
                    playAudio(vowelAudioPaths[vocal])
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
              {vowelInitialActivity.successFeedback}
            </p>
          )}

          {resultado === 'reintento' && (
            <p
              className="feedback feedback--retry"
              role="status"
            >
              {vowelInitialActivity.retryFeedback}
            </p>
          )}

          <div className="vowels-exercise-card__actions">
            {errorGuardado && (
              <p className="feedback feedback--retry" role="alert">
                {errorGuardado}
              </p>
            )}

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
                disabled={guardandoProgreso}
                onClick={siguienteEjercicio}
              >
                {guardandoProgreso
                  ? 'Guardando progreso...'
                  : ejercicioActual === vowelInitialExercises.length - 1
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
