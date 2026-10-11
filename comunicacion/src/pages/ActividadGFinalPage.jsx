import { useEffect, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import { gFinalActivity } from '../data/gData'
import { playAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/completion.css'

function ActividadGFinalPage() {
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [availableWords, setAvailableWords] = useState(gFinalActivity.wordBank)
  const [selectedWordIds, setSelectedWordIds] = useState([])
  const [sentenceResult, setSentenceResult] = useState('')
  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)
  const themeClass = getLessonThemeClass('g')
  const sentenceItem = gFinalActivity.sentences[sentenceIndex]
  const isLastSentence = sentenceIndex === gFinalActivity.sentences.length - 1
  const isSentenceFull =
    selectedWordIds.length === sentenceItem.acceptedAnswers[0].length
  const selectedWords = selectedWordIds.map((id) =>
    availableWords.find((item) => item.id === id),
  )

  const toggleWord = (item) => {
    if (sentenceResult === 'correct') return

    setSentenceResult('')
    setSelectedWordIds((current) => {
      if (current.includes(item.id)) {
        return current.filter((id) => id !== item.id)
      }

      if (current.length >= sentenceItem.acceptedAnswers[0].length) {
        return current
      }

      return [...current, item.id]
    })
  }

  const checkSentence = () => {
    if (!isSentenceFull || sentenceResult === 'correct') return

    const selectedNames = selectedWords.map((item) => item.word)
    const isCorrect = sentenceItem.acceptedAnswers.some(
      (answer) =>
        answer.length === selectedNames.length &&
        answer.every((word, index) => word === selectedNames[index]),
    )

    setSentenceResult(isCorrect ? 'correct' : 'retry')
    registrarProgreso({
      actividad: 'g-final',
      correcto: isCorrect,
      detalle: {
        leccionId: 'g',
        fase: 'oraciones',
        ejercicioId: sentenceItem.id,
      },
    })

    if (isCorrect) setStars((current) => current + 1)
  }

  const retrySentence = () => {
    setSelectedWordIds([])
    setSentenceResult('')
  }

  const nextSentence = () => {
    setAvailableWords((current) =>
      current.filter((item) => !selectedWordIds.includes(item.id)),
    )
    setSelectedWordIds([])
    setSentenceResult('')

    if (isLastSentence) {
      setFinished(true)
      return
    }

    setSentenceIndex((current) => current + 1)
  }

  useEffect(() => {
    if (finished) registrarLeccionCompletada('g')
  }, [finished])

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="completion-card">
          <span className="finish-icon" aria-hidden="true">
            ⭐
          </span>

          <h1>¡Terminaste la lección de la letra G!</h1>

          <p className="text-instruction">
            Completaste todas las oraciones usando las palabras del banco.
          </p>

          <StarsCounter current={stars} total={gFinalActivity.sentences.length} label="Estrellas" />

          <Button
            to="/lecciones/unidad/5"
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
      className={`page completion-page ${themeClass}`}
      aria-labelledby="g-final-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/g" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>
        <h1 id="g-final-title">Completa las oraciones</h1>
      </header>

      <ProgressBar
        value={sentenceIndex + 1}
        max={gFinalActivity.sentences.length}
        label={`Oración ${sentenceIndex + 1} de ${gFinalActivity.sentences.length}`}
      />

      <StarsCounter
        current={stars}
        total={gFinalActivity.sentences.length}
        label="Estrellas"
      />

      <Card className="completion-card">
        <div className="completion-instructions">
          <p className="text-instruction">
            Lee la oración y toca las palabras del banco en el orden correcto
            para completarla.
          </p>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(gFinalActivity.instructionAudio)}
          >
            Escuchar instrucción
          </Button>
        </div>

        <p aria-live="polite" className="text-sentence">
          {sentenceItem.sentence.split('___').map((part, index, parts) => (
            <span key={`${sentenceItem.id}-${index}`}>
              {part}
              {index < parts.length - 1
                ? selectedWords[index]?.word ?? '___'
                : ''}
            </span>
          ))}
        </p>

        <div className="completion-bank">
          {availableWords.map((item) => {
            const selected = selectedWordIds.includes(item.id)

            return (
              <button
                className={[
                  'completion-chip',
                  'text-syllable',
                  selected ? 'completion-active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={item.id}
                aria-pressed={selected}
                disabled={
                  sentenceResult === 'correct' ||
                  (!selected && isSentenceFull)
                }
                onClick={() => toggleWord(item)}
              >
                {item.word}
              </button>
            )
          })}
        </div>

        {sentenceResult === 'correct' && (
          <p
            className="selection-feedback selection-feedback--correct"
            role="status"
          >
            ¡Muy bien! Completaste correctamente la oración.
          </p>
        )}

        {sentenceResult === 'retry' && (
          <p
            className="selection-feedback selection-feedback--retry"
            role="status"
          >
            Esas palabras no completan la oración. Inténtalo otra vez.
          </p>
        )}

        {sentenceResult !== 'correct' && (
          <Button
            icon={Check}
            size="large"
            fullWidth
            disabled={!isSentenceFull}
            onClick={checkSentence}
          >
            Comprobar oración
          </Button>
        )}

        {sentenceResult === 'retry' && (
          <Button
            variant="retry"
            icon={RotateCcw}
            size="large"
            fullWidth
            onClick={retrySentence}
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
    </main>
  )
}

export default ActividadGFinalPage
