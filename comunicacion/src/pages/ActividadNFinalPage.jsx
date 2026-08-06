import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  nPracticeWords,
  nSentenceChoice,
  nSentenceImageMatch,
} from '../data/nFinal'
import { playAudio } from '../lib/audioPlayer'

const PHASES = ['palabras', 'oraciones', 'relacionar']

const totalExercises = nSentenceChoice.length + nSentenceImageMatch.length

function getAudioLabel(label, audio) {
  return audio ? label : `${label} pendiente`
}

function ActividadNFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('n')

  const [practiceIndex, setPracticeIndex] = useState(0)
  const practiceWord = nPracticeWords[practiceIndex]
  const isLastPracticeWord = practiceIndex === nPracticeWords.length - 1

  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [selectedSentence, setSelectedSentence] = useState('')
  const [sentenceResult, setSentenceResult] = useState('')

  const sentenceChoice = nSentenceChoice[sentenceIndex]

  const checkSentence = () => {
    if (!selectedSentence || sentenceResult === 'correct') return

    const isCorrect = selectedSentence === sentenceChoice.answer

    setSentenceResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) setStars((current) => current + 1)
  }

  const nextSentence = () => {
    const isLast = sentenceIndex === nSentenceChoice.length - 1

    setSelectedSentence('')
    setSentenceResult('')

    if (isLast) {
      setPhaseIndex((current) => current + 1)
      return
    }

    setSentenceIndex((current) => current + 1)
  }

  const [matchIndex, setMatchIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState('')
  const [matchResult, setMatchResult] = useState('')

  const matchItem = nSentenceImageMatch[matchIndex]

  const checkMatch = () => {
    if (!selectedImage || matchResult === 'correct') return

    const isCorrect = selectedImage === matchItem.answerImage

    setMatchResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) setStars((current) => current + 1)
  }

  const nextMatch = () => {
    const isLast = matchIndex === nSentenceImageMatch.length - 1

    setSelectedImage('')
    setMatchResult('')

    if (isLast) {
      setFinished(true)
      return
    }

    setMatchIndex((current) => current + 1)
  }

  if (finished) {
    return (
      <main className={`page ${themeClass}`}>
        <Card className="selection-card">
          <span className="finish-icon" aria-hidden="true">
            *
          </span>

          <h1>¡Terminaste la lección de la letra N!</h1>

          <p className="text-instruction">
            Aprendiste el sonido /n/, sus sílabas na, ne, ni, no, nu y
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
            disabled
            onClick={() =>
              playAudio(null)
            }
          >
            Felicitación pendiente
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
    <main className={`page ${themeClass}`} aria-labelledby="n-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/n" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>

        <h1 id="n-final-title">Practica todo lo aprendido</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      <StarsCounter current={stars} total={totalExercises} label="Estrellas" />

      {phase === 'palabras' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Toca cada palabra y repítela en voz alta.
          </p>

          {practiceWord.isProperNoun && (
            <p className="text-instruction">
              Recuerda: los nombres propios se escriben con mayúscula.
            </p>
          )}

          <img
            className="selection-image selection-image--featured"
            src={practiceWord.image}
            alt={practiceWord.word}
          />

          <span className="text-word">{practiceWord.word}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            disabled={!practiceWord.audio}
            onClick={() => playAudio(practiceWord.audio)}
          >
            {getAudioLabel(practiceWord.word, practiceWord.audio)}
          </Button>

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            onClick={() => {
              if (isLastPracticeWord) {
                setPhaseIndex((current) => current + 1)
                return
              }

              setPracticeIndex((current) => current + 1)
            }}
          >
            {isLastPracticeWord ? 'Continuar' : 'Siguiente palabra'}
          </Button>
        </Card>
      )}

      {phase === 'oraciones' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Mira la imagen y elige la oración que corresponde.
          </p>

          <img
            className="selection-image selection-image--featured"
            src={sentenceChoice.image}
            alt={sentenceChoice.imageAlt}
          />

          <Button
            variant="audio"
            icon={Volume2}
            disabled={!sentenceChoice.sentenceAudio}
            onClick={() => playAudio(sentenceChoice.sentenceAudio)}
          >
            {getAudioLabel('Escuchar oración correcta', sentenceChoice.sentenceAudio)}
          </Button>

          <div className="selection-options">
            {sentenceChoice.options.map((option) => {
              const selected = selectedSentence === option

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
                  key={option}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedSentence(option)
                    setSentenceResult('')
                  }}
                >
                  <span className="selection-word">{option}</span>
                </button>
              )
            })}
          </div>

          {sentenceResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! {sentenceChoice.answer}
            </p>
          )}

          {sentenceResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa oración no corresponde a la imagen. Mira otra vez.
            </p>
          )}

          {sentenceResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedSentence}
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
                setSelectedSentence('')
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
              {sentenceIndex === nSentenceChoice.length - 1
                ? 'Siguiente parte'
                : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'relacionar' && (
        <Card className="selection-card">
          <p className="text-instruction">
            Lee la oración y selecciona la imagen que corresponde.
          </p>

          <p className="text-sentence">{matchItem.sentence}</p>

          <Button
            variant="audio"
            icon={Volume2}
            disabled={!matchItem.audio}
            onClick={() => playAudio(matchItem.audio)}
          >
            {getAudioLabel('Escuchar oración', matchItem.audio)}
          </Button>

          <div className="selection-options">
            {matchItem.options.map((option) => {
              const selected = selectedImage === option.image

              const stateClass =
                matchResult && selected
                  ? matchResult === 'correct'
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
                    setSelectedImage(option.image)
                    setMatchResult('')
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

          {matchResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! Esa imagen corresponde a la oración.
            </p>
          )}

          {matchResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa no es la imagen correcta. Lee otra vez.
            </p>
          )}

          {matchResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedImage}
              onClick={checkMatch}
            >
              Comprobar
            </Button>
          )}

          {matchResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedImage('')
                setMatchResult('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {matchResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextMatch}
            >
              {matchIndex === nSentenceImageMatch.length - 1
                ? 'Finalizar lección'
                : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadNFinalPage
