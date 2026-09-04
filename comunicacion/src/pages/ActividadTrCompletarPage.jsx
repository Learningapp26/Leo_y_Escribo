import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  trWordBuildExercises,
  trWordBuildInstructionAudio,
} from '../data/trData'
import { playAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'
import '../styles/lesson-tr.css'

// Mezcla las sílabas para que no aparezcan siempre en el orden correcto.
// (sort(() => Math.random() - 0.5) no mezcla bien, por eso Fisher-Yates.)
function shuffle(items) {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

function ActividadTrCompletarPage() {
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [pickedSyllables, setPickedSyllables] = useState([])
  const [shuffledOptions, setShuffledOptions] = useState(() =>
    shuffle(trWordBuildExercises[0].syllables),
  )
  const [feedback, setFeedback] = useState('')
  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('tr')

  const exercise = trWordBuildExercises[exerciseIndex]
  const isLastExercise = exerciseIndex === trWordBuildExercises.length - 1
  const isComplete = pickedSyllables.length === exercise.syllables.length

  const pickSyllable = (syllable, position) => {
    if (feedback === 'correct') return
    if (pickedSyllables.length >= exercise.syllables.length) return

    playAudio(exercise.audio)
    setFeedback('')
    setPickedSyllables((current) => [...current, { syllable, position }])
  }

  const removeLastSyllable = () => {
    if (feedback === 'correct') return

    setPickedSyllables((current) => current.slice(0, -1))
    setFeedback('')
  }

  const checkWord = () => {
    if (!isComplete) return

    const isCorrect = pickedSyllables.every(
      (item, index) => item.syllable === exercise.syllables[index],
    )

    setFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'tr-completar',
      correcto: isCorrect,
      detalle: { leccionId: 'tr', fase: 'ordenar', ejercicioId: exercise.id },
    })

    if (isCorrect) {
      setStars((current) => current + 1)
      playAudio(exercise.audio)
    }
  }

  const retryWord = () => {
    setPickedSyllables([])
    setFeedback('')
  }

  const nextExercise = () => {
    if (isLastExercise) {
      setFinished(true)
      return
    }

    const nextIndex = exerciseIndex + 1

    setExerciseIndex(nextIndex)
    setPickedSyllables([])
    setFeedback('')
    setShuffledOptions(shuffle(trWordBuildExercises[nextIndex].syllables))
  }

  useEffect(() => {
    if (finished) registrarLeccionCompletada('tr')
  }, [finished])

  if (finished) {
    return (
      <main className={`page lesson-tr ${themeClass}`}>
        <Card className="completion-card">
          <span className="finish-icon" aria-hidden="true">
            ⭐
          </span>

          <h1>¡Terminaste la lección de TR!</h1>

          <p className="text-instruction">
            Aprendiste el sonido /tr/, sus sílabas tra, tre, tri, tro y tru,
            y formaste palabras nuevas.
          </p>

          <StarsCounter
            current={stars}
            total={trWordBuildExercises.length}
            label="Estrellas"
          />

          <Button
            variant="audio"
            icon={Volume2}
            fullWidth
            onClick={() =>
              playAudio('/audio/lecciones/tr/felicitacion-final.mp3')
            }
          >
            Escuchar felicitación
          </Button>

          <Button
            to="/lecciones/unidad/3"
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
          >
            Volver a las lecciones
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main
      className={`page completion-page lesson-tr ${themeClass}`}
      aria-labelledby="tr-completar-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/tr" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 3</span>

        <h1 id="tr-completar-title">Forma palabras con TR</h1>
      </header>

      <ProgressBar
        value={exerciseIndex + 1}
        max={trWordBuildExercises.length}
        label={`Palabra ${exerciseIndex + 1} de ${trWordBuildExercises.length}`}
      />

      <StarsCounter
        current={stars}
        total={trWordBuildExercises.length}
        label="Estrellas"
      />

      <Card className="completion-card">
        <div className="completion-instructions">
          <p className="text-instruction">
            Mira el dibujo. Toca las sílabas en orden para formar la
            palabra.
          </p>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(trWordBuildInstructionAudio)}
          >
            Escuchar instrucción
          </Button>
        </div>

        <div className="completion-content">
          <img
            className="completion-word-image"
            src={exercise.image}
            alt={exercise.imageAlt}
          />

          <p className="completion-words-sentence">
            {exercise.syllables.map((_, position) => {
              const picked = pickedSyllables[position]

              return (
                <span
                  key={position}
                  className={[
                    'completion-word-slot',
                    picked ? 'filled' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {picked ? picked.syllable : '__'}
                </span>
              )
            })}
          </p>

          <div className="completion-bank">
            {shuffledOptions.map((syllable, position) => (
              <Button
                key={`${syllable}-${position}`}
                variant="secondary"
                className="completion-chip text-syllable"
                disabled={
                  pickedSyllables.length >= exercise.syllables.length ||
                  feedback === 'correct'
                }
                onClick={() => pickSyllable(syllable, position)}
              >
                {syllable}
              </Button>
            ))}
          </div>
        </div>

        {feedback === 'correct' && (
          <p
            className="selection-feedback selection-feedback--correct"
            role="status"
          >
            ¡Muy bien! Formaste la palabra {exercise.word}.
          </p>
        )}

        {feedback === 'retry' && (
          <p
            className="selection-feedback selection-feedback--retry"
            role="status"
          >
            Ese orden no forma la palabra correcta. Inténtalo de nuevo.
          </p>
        )}

        {feedback !== 'correct' && (
          <div className="activity-navigation">
            <Button
              variant="secondary"
              icon={RotateCcw}
              fullWidth
              disabled={pickedSyllables.length === 0}
              onClick={removeLastSyllable}
            >
              Borrar
            </Button>

            <Button
              icon={Check}
              fullWidth
              disabled={!isComplete}
              onClick={checkWord}
            >
              Comprobar
            </Button>
          </div>
        )}

        {feedback === 'retry' && (
          <Button
            variant="retry"
            icon={RotateCcw}
            size="large"
            fullWidth
            onClick={retryWord}
          >
            Intentar nuevamente
          </Button>
        )}

        {feedback === 'correct' && (
          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            onClick={nextExercise}
          >
            {isLastExercise ? 'Finalizar lección' : 'Siguiente palabra'}
          </Button>
        )}
      </Card>
    </main>
  )
}

export default ActividadTrCompletarPage
