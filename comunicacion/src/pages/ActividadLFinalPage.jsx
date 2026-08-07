import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import StarsCounter from '../components/progress/StarsCounter'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  lPracticeWords,
  lSentenceCompletion,
  lSentenceInstructionAudio,
  lWordCounting,
  lWordCountingInstructionAudio,
  lWordImageMatchInstructionAudio,
  lWordImageMatch,
} from '../data/lFinal'
import { playAudio } from '../lib/audioPlayer'

const PHASES = ['palabras', 'oraciones', 'contar', 'relacionar']

const totalExercises =
  lSentenceCompletion.length + lWordCounting.length + lWordImageMatch.length

function ActividadLFinalPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const [stars, setStars] = useState(0)
  const [finished, setFinished] = useState(false)

  const themeClass = getLessonThemeClass('l')

  // Fase 0: practicar la lectura de palabras con L
  const [practiceIndex, setPracticeIndex] = useState(0)
  const practiceWord = lPracticeWords[practiceIndex]
  const isLastPracticeWord = practiceIndex === lPracticeWords.length - 1

  // Fase 1: completar oraciones con imágenes
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [sentenceResult, setSentenceResult] = useState('')

  const sentence = lSentenceCompletion[sentenceIndex]

  const checkSentence = () => {
    if (!selectedOption) return

    const isCorrect = selectedOption === sentence.answer

    setSentenceResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) setStars((current) => current + 1)
  }

  const nextSentence = () => {
    const isLast = sentenceIndex === lSentenceCompletion.length - 1

    setSelectedOption('')
    setSentenceResult('')

    if (isLast) {
      setPhaseIndex((current) => current + 1)
      return
    }

    setSentenceIndex((current) => current + 1)
  }

  // Fase 2: contar palabras en una oración
  const [countIndex, setCountIndex] = useState(0)
  const [taggedWords, setTaggedWords] = useState([])
  const [countSelected, setCountSelected] = useState(null)
  const [countResult, setCountResult] = useState('')

  const countSentence = lWordCounting[countIndex]

  const toggleWord = (position) => {
    setTaggedWords((current) =>
      current.includes(position)
        ? current.filter((item) => item !== position)
        : [...current, position],
    )
  }

  const checkCount = () => {
    if (countSelected === null) return

    const isCorrect = countSelected === countSentence.answer

    setCountResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) setStars((current) => current + 1)
  }

  const nextCountSentence = () => {
    const isLast = countIndex === lWordCounting.length - 1

    setTaggedWords([])
    setCountSelected(null)
    setCountResult('')

    if (isLast) {
      setPhaseIndex((current) => current + 1)
      return
    }

    setCountIndex((current) => current + 1)
  }

  // Fase 3: relacionar palabra con imagen
  const [matchIndex, setMatchIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState('')
  const [matchResult, setMatchResult] = useState('')

  const matchItem = lWordImageMatch[matchIndex]

  const checkMatch = () => {
    if (!selectedImage) return

    const isCorrect = selectedImage === matchItem.answerImage

    setMatchResult(isCorrect ? 'correct' : 'retry')

    if (isCorrect) setStars((current) => current + 1)
  }

  const nextMatch = () => {
    const isLast = matchIndex === lWordImageMatch.length - 1

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
            ⭐
          </span>

          <h1>¡Terminaste la lección de la letra L!</h1>

          <p className="text-instruction">
            Aprendiste el sonido /l/, sus sílabas la, le, li, lo, lu y
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
              playAudio('/audio/lecciones/l/felicitacion-final.mp3')
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
    <main className={`page ${themeClass}`} aria-labelledby="l-final-title">
      <BackButton label="Volver a la lección" to="/lecciones/l" />

      <header className="text-center">
        <span className="text-ui-label">Actividad final</span>

        <h1 id="l-final-title">Practica todo lo aprendido</h1>
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

          {practiceWord.color ? (
            <span
              className="practice-color-swatch"
              style={{ backgroundColor: practiceWord.color }}
              aria-hidden="true"
            />
          ) : (
            <img
              className="selection-image selection-image--featured"
              src={practiceWord.image}
              alt={practiceWord.word}
            />
          )}

          <span className="text-word">{practiceWord.word}</span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() => playAudio(practiceWord.audio)}
          >
            Escuchar palabra
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
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la oración y elige la imagen que la completa.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(lSentenceInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

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
              {sentenceIndex === lSentenceCompletion.length - 1
                ? 'Siguiente parte'
                : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'contar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca cada palabra de la oración para contarla. Luego elige
              cuántas palabras son.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(lWordCountingInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(countSentence.audio)}
          >
            Escuchar oración
          </Button>

          <div
            className="sentence-words"
            aria-label={countSentence.words.join(' ')}
          >
            {countSentence.words.map((word, position) => (
              <button
                className={[
                  'sentence-word-button',
                  'selection-button',
                  taggedWords.includes(position)
                    ? 'selection-button--selected'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                key={`${word}-${position}`}
                aria-pressed={taggedWords.includes(position)}
                onClick={() => toggleWord(position)}
              >
                <span className="selection-word">{word}</span>
              </button>
            ))}
          </div>

          <div className="selection-options">
            {countSentence.options.map((option) => {
              const selected = countSelected === option

              const stateClass =
                countResult && selected
                  ? countResult === 'correct'
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
                    setCountSelected(option)
                    setCountResult('')
                  }}
                >
                  <span className="text-word">{option}</span>
                </button>
              )
            })}
          </div>

          {countResult === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! La oración tiene {countSentence.answer} palabras.
            </p>
          )}

          {countResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Cuenta otra vez cada palabra con cuidado.
            </p>
          )}

          {countResult !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={countSelected === null}
              onClick={checkCount}
            >
              Comprobar
            </Button>
          )}

          {countResult === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setCountSelected(null)
                setCountResult('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {countResult === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextCountSentence}
            >
              {countIndex === lWordCounting.length - 1
                ? 'Siguiente parte'
                : 'Siguiente oración'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'relacionar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Escucha la palabra y selecciona la imagen que corresponde.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(lWordImageMatchInstructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <span className="text-word">{matchItem.word}</span>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() => playAudio(matchItem.audio)}
          >
            Escuchar palabra
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
              ¡Correcto! Esa es la imagen de {matchItem.word}.
            </p>
          )}

          {matchResult === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Esa no es la imagen correcta. Escucha otra vez.
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
              {matchIndex === lWordImageMatch.length - 1
                ? 'Finalizar lección'
                : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadLFinalPage
