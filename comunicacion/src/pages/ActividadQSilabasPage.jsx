import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  qDiscriminationExercises,
  qDiscriminationInstructionAudio,
  qLetterExplanation,
  qSyllableAudios,
  qSyllableImageExercises,
  qSyllableInstructionAudio,
} from '../data/qData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'

const PHASES = ['reconocer', 'discriminar']
const syllableOptions = ['que', 'qui']

function ActividadQSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('q')

  const [imageIndex, setImageIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [imageFeedback, setImageFeedback] = useState('')

  const [discriminationIndex, setDiscriminationIndex] = useState(0)
  const [selectedItemIds, setSelectedItemIds] = useState([])
  const [discriminationFeedback, setDiscriminationFeedback] = useState('')

  const imageExercise = qSyllableImageExercises[imageIndex]
  const discriminationExercise = qDiscriminationExercises[discriminationIndex]

  const isLastImage = imageIndex === qSyllableImageExercises.length - 1
  const isLastDiscrimination =
    discriminationIndex === qDiscriminationExercises.length - 1

  const checkImageSyllable = () => {
    if (!selectedSyllable) return

    const isCorrect = selectedSyllable === imageExercise.syllable

    setImageFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'q-silabas',
      correcto: isCorrect,
      detalle: {
        leccionId: 'q',
        fase: 'reconocer',
        ejercicioId: imageExercise.id,
      },
    })
  }

  const nextImageExercise = () => {
    setSelectedSyllable('')
    setImageFeedback('')

    if (isLastImage) {
      setPhaseIndex(1)
      return
    }

    setImageIndex((current) => current + 1)
  }

  const toggleDiscriminationItem = (item) => {
    if (discriminationFeedback === 'correct') return

    playAudio(qSyllableAudios[item.syllable])
    setDiscriminationFeedback('')

    setSelectedItemIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkDiscrimination = () => {
    const answers = discriminationExercise.answerIds

    const isCorrect =
      selectedItemIds.length === answers.length &&
      selectedItemIds.every((id) => answers.includes(id))

    setDiscriminationFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'q-silabas',
      correcto: isCorrect,
      detalle: {
        leccionId: 'q',
        fase: 'discriminar',
        ejercicioId: discriminationExercise.id,
      },
    })
  }

  const resetDiscrimination = () => {
    setSelectedItemIds([])
    setDiscriminationFeedback('')
  }

  const nextDiscriminationExercise = () => {
    resetDiscrimination()
    setDiscriminationIndex((current) => current + 1)
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="q-silabas-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/q" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>

        <h1 id="q-silabas-title">Sílabas que y qui</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'reconocer' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">{qLetterExplanation}</p>

            <p className="text-instruction">
              Observa la imagen, escucha la palabra y selecciona la sílaba
              con la que comienza.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(qSyllableInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={imageExercise.image}
            alt={imageExercise.word}
          />

          <span className="text-word">{imageExercise.word}</span>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(imageExercise.audio)}
          >
            Escuchar palabra
          </Button>

          <div className="selection-options">
            {syllableOptions.map((syllable) => {
              const selected = selectedSyllable === syllable

              const stateClass =
                selected && imageFeedback === 'correct'
                  ? 'selection-button--correct'
                  : selected && imageFeedback === 'retry'
                    ? 'selection-button--incorrect'
                    : selected
                      ? 'selection-button--selected'
                      : ''

              return (
                <Button
                  key={syllable}
                  variant="secondary"
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedSyllable(syllable)
                    setImageFeedback('')
                    playAudio(qSyllableAudios[syllable])
                  }}
                >
                  <span className="selection-word">{syllable}</span>
                </Button>
              )
            })}
          </div>

          {imageFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! {imageExercise.word} comienza con{' '}
              {imageExercise.syllable}.
            </p>
          )}

          {imageFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Escucha la palabra otra vez y prueba con otra sílaba.
            </p>
          )}

          {imageFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedSyllable}
              onClick={checkImageSyllable}
            >
              Comprobar
            </Button>
          )}

          {imageFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedSyllable('')
                setImageFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {imageFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextImageExercise}
            >
              {isLastImage ? 'Continuar' : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'discriminar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Busca en la fila todas las sílabas iguales a{' '}
              <strong>{discriminationExercise.target}</strong> y tócalas.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(qDiscriminationInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(qSyllableAudios[discriminationExercise.target])
            }
          >
            Escuchar {discriminationExercise.target}
          </Button>

          <div className="selection-options">
            {discriminationExercise.items.map((item) => {
              const selected = selectedItemIds.includes(item.id)

              const correctSelected =
                discriminationFeedback === 'correct' && selected

              const incorrectSelected =
                discriminationFeedback === 'retry' &&
                selected &&
                !discriminationExercise.answerIds.includes(item.id)

              const stateClass = correctSelected
                ? 'selection-button--correct'
                : incorrectSelected
                  ? 'selection-button--incorrect'
                  : selected
                    ? 'selection-button--selected'
                    : ''

              return (
                <Button
                  key={item.id}
                  variant="secondary"
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() => toggleDiscriminationItem(item)}
                >
                  <span className="selection-word">{item.syllable}</span>
                </Button>
              )
            })}
          </div>

          {discriminationFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Encontraste todas las sílabas{' '}
              {discriminationExercise.target}.
            </p>
          )}

          {discriminationFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa la fila otra vez. Puede faltar alguna o puede haber una
              selección que no corresponde.
            </p>
          )}

          {discriminationFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={selectedItemIds.length === 0}
              onClick={checkDiscrimination}
            >
              Comprobar selección
            </Button>
          )}

          {discriminationFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={resetDiscrimination}
            >
              Intentar nuevamente
            </Button>
          )}

          {discriminationFeedback === 'correct' && !isLastDiscrimination && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextDiscriminationExercise}
            >
              Siguiente fila
            </Button>
          )}

          {discriminationFeedback === 'correct' && isLastDiscrimination && (
            <Button
              to="/actividad/q-completar"
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
            >
              Ir a la siguiente actividad
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadQSilabasPage
