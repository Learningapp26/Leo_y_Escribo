import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  vFinalCongratulationsAudio,
  vFinalWords,
  vFinalWordsInstructionAudio,
  vSentenceExercises,
  vSentenceInstructionAudio,
} from '../data/vData'
import { playAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = ['palabras', 'oraciones']

function ActividadVFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('v')

  const sentence = vSentenceExercises[sentenceIndex]
  const isLastSentence = sentenceIndex === vSentenceExercises.length - 1

  const checkAnswer = () => {
    if (!selectedAnswer) return

    const isCorrect = selectedAnswer === sentence.answer

    setFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'v-final',
      correcto: isCorrect,
      detalle: { leccionId: 'v', fase: 'oraciones', ejercicioId: sentence.id },
    })

    if (isCorrect) {
      setStars((current) => current + 1)
      playAudio(sentence.sentenceAudio)
    }
  }

  const nextSentence = () => {
    setSelectedAnswer('')
    setFeedback('')

    if (isLastSentence) {
      setFinished(true)
      return
    }

    setSentenceIndex((current) => current + 1)
  }

  useEffect(() => {
    if (finished) registrarLeccionCompletada('v')
  }, [finished])

  if (finished) {
    return (
      <main className={`page completion-page ${themeClass}`} aria-labelledby="v-finished-title">
        <Card className="completion-card">
          <span className="text-letter" aria-hidden="true">V v</span>

          <h1 id="v-finished-title">¡Terminaste la lección de la letra V!</h1>

          <p className="text-instruction">
            Practicaste el sonido de v, las sílabas va, ve, vi, vo y vu,
            completaste palabras y relacionaste oraciones con su dibujo.
          </p>

          <StarsCounter current={stars} total={vSentenceExercises.length} label="Estrellas" />

          <Button variant="audio" icon={Volume2} fullWidth onClick={() => playAudio(vFinalCongratulationsAudio)}>
            Escuchar felicitación
          </Button>

          <Button to="/lecciones" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
            Volver a las lecciones
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main className={`page completion-page ${themeClass}`} aria-labelledby="v-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/v" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>

        <h1 id="v-final-title">Leamos palabras y oraciones</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      <StarsCounter current={stars} total={vSentenceExercises.length} label="Estrellas" />

      {phase === 'palabras' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Observa cada imagen, lee su nombre y escucha la palabra.
              Recuerda que Valerio y Eva comienzan con mayúscula porque son
              nombres propios.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(vFinalWordsInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {vFinalWords.map((item) => (
              <Card
                key={item.word}
                imageSrc={item.image}
                imageAlt={item.word}
                title={item.word}
                footer={
                  <Button variant="audio" icon={Volume2} fullWidth onClick={() => playAudio(item.audio)}>
                    Escuchar
                  </Button>
                }
              />
            ))}
          </div>

          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={() => setPhaseIndex(1)}>
            Continuar con las oraciones
          </Button>
        </Card>
      )}

      {phase === 'oraciones' && (
        <Card className="completion-card">
          <div className="completion-instructions">
            <p className="text-instruction">
              Lee y escucha la oración. Después, elige el dibujo que la
              representa.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(vSentenceInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <Button variant="audio" size="large" icon={Volume2} onClick={() => playAudio(sentence.sentenceAudio)}>
            Escuchar oración
          </Button>

          <p className="completion-words-sentence">{sentence.sentence}</p>

          <div className="selection-options">
            {sentence.options.map((option) => {
              const selected = selectedAnswer === option.name

              const stateClass =
                selected && feedback === 'correct'
                  ? 'selection-button--correct'
                  : selected && feedback === 'retry'
                    ? 'selection-button--incorrect'
                    : selected
                      ? 'selection-button--selected'
                      : ''

              return (
                <button
                  type="button"
                  key={option.name}
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  aria-pressed={selected}
                  aria-label={option.label}
                  onClick={() => {
                    if (feedback === 'correct') return
                    setSelectedAnswer(option.name)
                    setFeedback('')
                    playAudio(option.audio)
                  }}
                >
                  <img className="selection-image" src={option.image} alt="" />
                </button>
              )
            })}
          </div>

          {feedback === 'correct' && (
            <p className="selection-feedback selection-feedback--correct" role="status">
              ¡Correcto! Esa imagen representa la oración.
            </p>
          )}

          {feedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Esa imagen no representa la oración. Escucha de nuevo e inténtalo otra vez.
            </p>
          )}

          {feedback !== 'correct' && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedAnswer} onClick={checkAnswer}>
              Comprobar respuesta
            </Button>
          )}

          {feedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedAnswer('')
                setFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {feedback === 'correct' && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextSentence}>
              {isLastSentence ? 'Finalizar lección' : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadVFinalPage
