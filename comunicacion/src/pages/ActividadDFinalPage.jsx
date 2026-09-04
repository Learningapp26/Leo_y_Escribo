import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import {dPracticeWords,dSentenceCompletion,dWordImageMatch, } from '../data/dActivities'
import { getLessonThemeClass } from '../data/lessonColors'
import { playAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = ['palabras', 'oraciones', 'relacionar']
const totalExercises = dSentenceCompletion.length + dWordImageMatch.length

function playIfAvailable(audio) {
  if (audio) playAudio(audio)
}

function ActividadDFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [sentenceResult, setSentenceResult] = useState('')
  const [matchIndex, setMatchIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState('')
  const [matchResult, setMatchResult] = useState('')

  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('d')
  const practiceWord = dPracticeWords[practiceIndex]
  const sentence = dSentenceCompletion[sentenceIndex]
  const matchItem = dWordImageMatch[matchIndex]

  const checkSentence = () => {
    if (!selectedOption || sentenceResult === 'correct') return
    const isCorrect = selectedOption === sentence.answer
    setSentenceResult(isCorrect ? 'correct' : 'retry')
    if (isCorrect) setStars((current) => Math.min(current + 1, totalExercises))

    registrarProgreso({
      actividad: 'd-final',
      correcto: isCorrect,
      detalle: { leccionId: 'd', fase: 'oraciones', ejercicioId: sentence.answer },
    })
  }

  const nextSentence = () => {
    setSelectedOption('')
    setSentenceResult('')
    if (sentenceIndex === dSentenceCompletion.length - 1) {
      setPhaseIndex(2)
      return
    }
    setSentenceIndex((current) => current + 1)
  }

  const checkMatch = () => {
    if (!selectedImage || matchResult === 'correct') return
    const isCorrect = selectedImage === matchItem.answerImage
    setMatchResult(isCorrect ? 'correct' : 'retry')
    if (isCorrect) setStars((current) => Math.min(current + 1, totalExercises))

    registrarProgreso({
      actividad: 'd-final',
      correcto: isCorrect,
      detalle: { leccionId: 'd', fase: 'relacionar', ejercicioId: matchItem.word },
    })
  }

  const nextMatch = () => {
    setSelectedImage('')
    setMatchResult('')
    if (matchIndex === dWordImageMatch.length - 1) {
      setFinished(true)
      return
    }
    setMatchIndex((current) => current + 1)
  }

  useEffect(() => {
    if (finished) registrarLeccionCompletada('d')
  }, [finished])

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <span className="finish-icon" aria-hidden="true">⭐</span>
          <h1>¡Terminaste la lección de la letra D!</h1>
          <p className="text-instruction">Aprendiste el sonido /d/, sus sílabas da, de, di, do, du y palabras nuevas.</p>
          <StarsCounter current={stars} total={totalExercises} label="Estrellas" />
          <Button
            variant="audio"
            icon={Volume2}
            fullWidth
            onClick={() => playAudio('/audio/lecciones/d/felicitacion-final.mp3')}
          >
            Escuchar felicitación
          </Button>
          <Button to="/lecciones/unidad/2" icon={ArrowRight} iconPosition="right" size="large" fullWidth>Volver a las lecciones</Button>
        </Card>
      </main>
    )
  }

  return (
    <main className={`page ${themeClass}`} aria-labelledby="d-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/d" />
      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>
        <h1 id="d-final-title">Practica todo lo aprendido</h1>
      </header>

      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />
      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      {phase === 'palabras' && (
        <Card className="selection-card">
          <p className="text-instruction">Lee cada palabra y repítela en voz alta.</p>
          {practiceWord.isProperNoun && <p className="text-instruction">Recuerda: los nombres propios se escriben con mayúscula.</p>}
          <img className="selection-image selection-image--featured" src={practiceWord.image} alt={practiceWord.word} />
          <span className="text-word">{practiceWord.word}</span>
          <Button variant="audio" size="large" icon={Volume2} onClick={() => playIfAvailable(practiceWord.audio)}>Escuchar {practiceWord.word}</Button>
          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={() => {
            if (practiceIndex === dPracticeWords.length - 1) {
              setPhaseIndex(1)
              return
            }
            setPracticeIndex((current) => current + 1)
          }}>
            {practiceIndex === dPracticeWords.length - 1 ? 'Continuar' : 'Siguiente palabra'}
          </Button>
        </Card>
      )}

      {phase === 'oraciones' && (
        <Card className="selection-card">
          <p className="text-instruction">Elige la opción que completa la oración con mayúscula cuando corresponde.</p>
          <p className="text-sentence">{sentence.sentence.replace('___', selectedOption || '________')}</p>
          <div className="selection-options">
            {sentence.options.map((option) => {
              const selected = selectedOption === option
              const stateClass = sentenceResult && selected ? (sentenceResult === 'correct' ? 'selection-button--correct' : 'selection-button--incorrect') : selected ? 'selection-button--selected' : ''
              return <button className={['selection-button', stateClass].filter(Boolean).join(' ')} type="button" key={option} aria-pressed={selected} onClick={() => { if (sentenceResult === 'correct') return; setSelectedOption(option); setSentenceResult('') }}><span className="selection-word">{option}</span></button>
            })}
          </div>
          {sentenceResult === 'correct' && <p className="selection-feedback selection-feedback--correct" role="status">¡Correcto! {sentence.sentence.replace('___', sentence.answer)}</p>}
          {sentenceResult === 'retry' && <p className="selection-feedback selection-feedback--retry" role="status">Intenta nuevamente.</p>}
          {sentenceResult !== 'correct' && <Button icon={Check} size="large" fullWidth disabled={!selectedOption} onClick={checkSentence}>Comprobar</Button>}
          {sentenceResult === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSelectedOption(''); setSentenceResult('') }}>Intentar nuevamente</Button>}
          {sentenceResult === 'correct' && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextSentence}>{sentenceIndex === dSentenceCompletion.length - 1 ? 'Siguiente parte' : 'Siguiente oración'}</Button>}
        </Card>
      )}

      {phase === 'relacionar' && (
        <Card className="selection-card">
          <p className="text-instruction">Escucha la palabra y selecciona la imagen que corresponde.</p>
          <span className="text-word">{matchItem.word}</span>
          <Button variant="audio" icon={Volume2} onClick={() => playIfAvailable(matchItem.audio)}>Escuchar {matchItem.word}</Button>
          <div className="selection-options">
            {matchItem.options.map((option) => {
              const selected = selectedImage === option.image
              const stateClass = matchResult && selected ? (matchResult === 'correct' ? 'selection-button--correct' : 'selection-button--incorrect') : selected ? 'selection-button--selected' : ''
              return (
                <button className={['selection-button', stateClass].filter(Boolean).join(' ')} type="button" key={option.name} aria-pressed={selected} onClick={() => { if (matchResult === 'correct') return; setSelectedImage(option.image); setMatchResult('') }}>
                  <img className="selection-image" src={option.image} alt={option.name} />
                  <span className="selection-word">{option.name}</span>
                </button>
              )
            })}
          </div>
          {matchResult === 'correct' && <p className="selection-feedback selection-feedback--correct" role="status">¡Correcto! Esa es la imagen de {matchItem.word}.</p>}
          {matchResult === 'retry' && <p className="selection-feedback selection-feedback--retry" role="status">Esa no es la imagen correcta. Intenta nuevamente.</p>}
          {matchResult !== 'correct' && <Button icon={Check} size="large" fullWidth disabled={!selectedImage} onClick={checkMatch}>Comprobar</Button>}
          {matchResult === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSelectedImage(''); setMatchResult('') }}>Intentar nuevamente</Button>}
          {matchResult === 'correct' && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextMatch}>{matchIndex === dWordImageMatch.length - 1 ? 'Finalizar lección' : 'Siguiente palabra'}</Button>}
        </Card>
      )}
    </main>
  )
}

export default ActividadDFinalPage
