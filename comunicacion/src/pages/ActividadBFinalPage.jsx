import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import {
  bFinalCongratulationsAudio,
  bFinalWords,
  bFinalWordsInstructionAudio,
  bSentenceExercises,
  bSentenceInstructionAudio,
} from '../data/bData'
import { getLessonThemeClass } from '../data/lessonColors'
import { playAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = ['palabras', 'oraciones']

function ActividadBFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [feedback, setFeedback] = useState('')
  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)
  const phase = PHASES[phaseIndex]
  const sentence = bSentenceExercises[sentenceIndex]
  const themeClass = getLessonThemeClass('b')

  useEffect(() => {
    if (finished) registrarLeccionCompletada('b')
  }, [finished])

  const check = () => {
    const isCorrect = selected === sentence.answer
    setFeedback(isCorrect ? 'correct' : 'retry')
    registrarProgreso({
      actividad: 'b-final',
      correcto: isCorrect,
      detalle: { leccionId: 'b', fase: 'oraciones', ejercicioId: sentence.id },
    })
    if (isCorrect) {
      setStars((current) => current + 1)
      playAudio(sentence.completedAudio)
    }
  }

  const next = () => {
    setSelected('')
    setFeedback('')
    if (sentenceIndex === bSentenceExercises.length - 1) {
      setFinished(true)
      return
    }
    setSentenceIndex((current) => current + 1)
  }

  if (finished) {
    return (
      <main className={`page completion-page ${themeClass}`} aria-labelledby="b-finished-title">
        <Card className="completion-card">
          <span className="text-letter" aria-hidden="true">B b</span>
          <h1 id="b-finished-title">¡Terminaste la lección de la letra B!</h1>
          <p className="text-instruction">Reconociste la B y la b, practicaste bo, ba, be, bi y bu, formaste palabras y leíste oraciones.</p>
          <StarsCounter current={stars} total={bSentenceExercises.length} label="Estrellas" />
          <Button variant="audio" icon={Volume2} fullWidth onClick={() => playAudio(bFinalCongratulationsAudio)}>Escuchar felicitación</Button>
          <Button to="/lecciones" icon={ArrowRight} iconPosition="right" size="large" fullWidth>Volver a las lecciones</Button>
        </Card>
      </main>
    )
  }

  return (
    <main className={`page completion-page ${themeClass}`} aria-labelledby="b-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/b" />
      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>
        <h1 id="b-final-title">Leamos palabras y oraciones</h1>
      </header>
      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />
      <StarsCounter current={stars} total={bSentenceExercises.length} label="Estrellas" />

      {phase === 'palabras' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">Observa cada imagen, lee su nombre y escúchalo. Recuerda que Berta comienza con mayúscula porque es un nombre propio.</p>
            <Button variant="audio" icon={Volume2} onClick={() => playAudio(bFinalWordsInstructionAudio)} data-audio-src={bFinalWordsInstructionAudio}>Escuchar instrucción</Button>
          </div>
          <div className="selection-options">
            {bFinalWords.map((item) => (
              <Card
                key={item.word}
                imageSrc={item.image}
                imageAlt={item.word}
                title={item.word}
                footer={<Button variant="audio" icon={Volume2} fullWidth onClick={() => playAudio(item.audio)}>Escuchar</Button>}
              />
            ))}
          </div>
          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={() => setPhaseIndex(1)}>Continuar con las oraciones</Button>
        </Card>
      )}

      {phase === 'oraciones' && (
        <Card className="completion-card">
          <div className="completion-instructions">
            <p className="text-instruction">Lee y escucha la oración. Después, toca la imagen de la palabra que la completa.</p>
            <Button variant="audio" icon={Volume2} onClick={() => playAudio(bSentenceInstructionAudio)} data-audio-src={bSentenceInstructionAudio}>Escuchar instrucción</Button>
          </div>
          <Button variant="audio" icon={Volume2} size="large" onClick={() => playAudio(sentence.sentenceAudio)}>Escuchar oración</Button>
          <p className="completion-words-sentence">{sentence.sentence.replace('___', selected || '________')}</p>
          <div className="selection-options">
            {sentence.options.map((option) => {
              const isSelected = selected === option.value
              const stateClass = isSelected && feedback === 'correct'
                ? 'selection-button--correct'
                : isSelected && feedback === 'retry'
                  ? 'selection-button--incorrect'
                  : isSelected
                    ? 'selection-button--selected'
                    : ''
              return (
                <button
                  type="button"
                  key={option.value}
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  aria-pressed={isSelected}
                  onClick={() => { if (feedback === 'correct') return; setSelected(option.value); setFeedback(''); playAudio(option.audio) }}
                >
                  <img className="selection-image" src={option.image} alt={option.name} />
                  <span className="selection-word">{option.name}</span>
                </button>
              )
            })}
          </div>
          {feedback === 'correct' && <p className="selection-feedback selection-feedback--correct" role="status">¡Correcto! {sentence.sentence.replace('___', sentence.answer)}</p>}
          {feedback === 'retry' && <p className="selection-feedback selection-feedback--retry" role="status">Esa imagen no completa la oración. Escucha de nuevo.</p>}
          {feedback !== 'correct' && <Button icon={Check} size="large" fullWidth disabled={!selected} onClick={check}>Comprobar respuesta</Button>}
          {feedback === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSelected(''); setFeedback('') }}>Intentar nuevamente</Button>}
          {feedback === 'correct' && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={next}>{sentenceIndex === bSentenceExercises.length - 1 ? 'Finalizar lección' : 'Siguiente oración'}</Button>}
        </Card>
      )}
    </main>
  )
}

export default ActividadBFinalPage
