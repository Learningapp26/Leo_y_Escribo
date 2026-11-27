import { useState } from 'react'
import {ArrowRight, Check, RotateCcw, Volume2, } from 'lucide-react'

import Button from '../components/common/Button'
import ActivityFeedback from '../components/common/ActivityFeedback'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { RewardBurst } from '../components/space/Reward'
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
      <main className="page selection-page vowels-page planet--0">
        <section className="vowels-page__content">
          <Card className="selection-card vowels-result-card">
            <RewardBurst />

            <h1>{vowelInitialActivity.completionTitle}</h1>

            <p className="text-instruction">
              {vowelInitialActivity.completionMessage}
            </p>

            {vowelInitialActivity.completionAudio && (
              <Button
                variant="audio"
                icon={Volume2}
                fullWidth
                onClick={() => playAudio(vowelInitialActivity.completionAudio)}
                data-audio-src={vowelInitialActivity.completionAudio}
              >
                Escuchar felicitación
              </Button>
            )}

            <Button
              to="/lecciones/unidad/1"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Volver a las lecciones
            </Button>
          </Card>
        </section>
      </main>
    )
  }

  return (
    <main
      className="page selection-page vowels-page planet--0"
      aria-labelledby="titulo-actividad"
    >
      <section className="vowels-page__content">
        <BackButton
          label="Volver a la leccion"
          to={vowelInitialActivity.lessonRoute}
        />

        <header className="text-center vowels-page__header">
          <span className="text-ui-label">
            {vowelInitialActivity.unitLabel}
          </span>

          <h1 id="titulo-actividad">
            {vowelInitialActivity.title}
          </h1>

          <div className="selection-instructions">
            <p className="text-instruction">
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
          </div>
        </header>

        <ProgressBar
          value={ejercicioActual + 1}
          max={vowelInitialExercises.length}
          label={`Ejercicio ${ejercicioActual + 1} de ${vowelInitialExercises.length}`}
        />

        <Card className="selection-card vowels-exercise-card">
          <img
            className="vowels-exercise-card__image"
            src={ejercicio.imagen}
            alt={ejercicio.palabra}
          />

          <div className="vowels-exercise-card__heading">
            <Button
              variant="audio"
              className="btn--audio-round"
              icon={Volume2}
              aria-label={`Escuchar ${ejercicio.palabra}`}
              onClick={() => playAudio(ejercicio.audio)}
            />
            <h2 className="vowels-exercise-card__word">
              {ejercicio.palabra}
            </h2>
          </div>

          <p className="text-reading">
            {vowelInitialActivity.prompt}
          </p>

          <div
            className="selection-options vowels-options"
            aria-label="Opciones de vocales"
          >
            {vowelOptions.map((vocal) => {
              const selected = vocalSeleccionada === vocal

              return (
                <Button
                  key={vocal}
                  variant="secondary"
                  size="large"
                  className={[
                    'selection-button',
                    'vowels-options__button',
                    'text-letter',
                    selected ? 'selection-button--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  disabled={Boolean(resultado)}
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
              <ActivityFeedback correct={false}>
                <Button
                  variant="retry"
                  icon={RotateCcw}
                  size="large"
                  fullWidth
                  onClick={reintentarEjercicio}
                >
                  Intentar nuevamente
                </Button>
              </ActivityFeedback>
            )}

            {resultado === 'correcto' && (
              <ActivityFeedback correct>
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
              </ActivityFeedback>
            )}
          </div>
        </Card>
      </section>
    </main>
  )
}

export default ActividadVocalesPage
