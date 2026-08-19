import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  pFinalTraceInstructionAudio,
  pFinalTraceWords,
  pSentenceCompletion,
} from '../data/pData'
import { playAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'

const PHASES = ['palabras', 'oraciones']

const totalExercises = pSentenceCompletion.length

function ActividadPFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('p')

  // Fase 1: repasar palabras (los nombres propios van con mayúscula)
  const [traceIndex, setTraceIndex] = useState(0)
  const traceWord = pFinalTraceWords[traceIndex]
  const isLastTraceWord = traceIndex === pFinalTraceWords.length - 1

  // Fase 2: completar oraciones con imágenes. En el libro esta parte es de
  // respuesta libre, pero como todavía no escriben, aquí eligen la imagen
  // correcta en vez de escribir la palabra.
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [sentenceResult, setSentenceResult] = useState('')

  const sentence = pSentenceCompletion[sentenceIndex]
  const isLastSentence = sentenceIndex === pSentenceCompletion.length - 1

  const checkSentence = () => {
    if (!selectedOption) return

    const isCorrect = selectedOption === sentence.answer

    setSentenceResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) setStars((current) => current + 1)

    registrarProgreso({
      actividad: 'p-final',
      correcto: isCorrect,
      detalle: { leccionId: 'p', fase: 'oraciones', ejercicioId: sentence.id },
    })
  }

  const nextSentence = () => {
    setSelectedOption('')
    setSentenceResult('')

    if (isLastSentence) {
      setFinished(true)
      return
    }

    setSentenceIndex((current) => current + 1)
  }

  useEffect(() => {
    if (finished) registrarLeccionCompletada('p')
  }, [finished])

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <span className="finish-icon" aria-hidden="true">
            ⭐
          </span>

          <h1>¡Terminaste la lección de la letra P!</h1>

          <p className="text-instruction">
            Aprendiste el sonido /p/, sus sílabas pa, pe, pi, po, pu y
            palabras nuevas.
          </p>

          <StarsCounter
            current={stars}
            total={totalExercises}
            label="Estrellas"
          />

          <Button
            variant="audio"
            icon={Volume2}
            fullWidth
            onClick={() =>
              playAudio('/audio/lecciones/p/felicitacion-final.mp3')
            }
          >
            Escuchar felicitación
          </Button>

          <Button
            to="/lecciones"
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
    <main className={`page ${themeClass}`} aria-labelledby="p-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/p" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>

        <h1 id="p-final-title">Practica todo lo aprendido</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      {phase === 'palabras' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca cada palabra y repítela en voz alta.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(pFinalTraceInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          {traceWord.isProperNoun && (
            <p className="text-instruction">
              Recuerda: los nombres propios se escriben con mayúscula.
            </p>
          )}

          <img
            className="selection-image selection-image--featured"
            src={traceWord.image}
            alt={traceWord.word}
          />

          <span className="text-word">{traceWord.word}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(traceWord.audio)}
          >
            Escuchar palabra
          </Button>

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            onClick={() => {
              if (isLastTraceWord) {
                setPhaseIndex((current) => current + 1)
                return
              }

              setTraceIndex((current) => current + 1)
            }}
          >
            {isLastTraceWord ? 'Continuar' : 'Siguiente palabra'}
          </Button>
        </Card>
      )}

      {phase === 'oraciones' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Escucha la oración y elige la imagen que la completa.
          </p>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(sentence.sentenceAudio)}
          >
            Escuchar oración
          </Button>

          <p className="text-sentence">
            {sentence.sentence.replace('___', selectedOption || '________')}
          </p>

          <div className="selection-options">
            {sentence.options.map((option) => {
              const selected = selectedOption === option.name

              const stateClass =
                sentenceResult && selected
                  ? sentenceResult === 'correct'
                    ? 'selection-button--correct'
                    : 'selection-button--incorrect'
                  : selected
                    ? 'selection-button--selected'
                    : ''

              return (
                <button
                  className={['selection-button', stateClass]
                    .filter(Boolean)
                    .join(' ')}
                  type="button"
                  key={option.name}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedOption(option.name)
                    setSentenceResult('')
                  }}
                >
                  <img
                    className="selection-image"
                    src={option.image}
                    alt={option.name}
                  />

                  <span className="selection-word">{option.name}</span>
                </button>
              )
            })}
          </div>

          {sentenceResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! {sentence.sentence.replace('___', sentence.answer)}
            </p>
          )}

          {sentenceResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa imagen no completa la oración. Escucha otra vez.
            </p>
          )}

          {sentenceResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedOption}
              onClick={checkSentence}
            >
              Comprobar
            </Button>
          )}

          {sentenceResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedOption('')
                setSentenceResult('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {sentenceResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextSentence}
            >
              {isLastSentence ? 'Finalizar lección' : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadPFinalPage
