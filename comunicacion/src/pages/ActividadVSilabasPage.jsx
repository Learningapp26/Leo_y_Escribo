import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  vLetterPresentation,
  vSyllableImageExercises,
  vSyllableInstructionAudio,
  vWordSyllableExample,
  vWordSyllableExercises,
  vWordSyllableInstructionAudio,
} from '../data/vData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'
import '../styles/syllables.css'

const PHASES = ['letra', 'palabra', 'reconocer', 'palabras']
const WORD_SYLLABLE_OPTIONS = ['va', 've', 'vi', 'vo', 'vu']

function ActividadVSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('v')

  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  const [imageIndex, setImageIndex] = useState(0)
  const [selectedSyllable, setSelectedSyllable] = useState('')
  const [imageFeedback, setImageFeedback] = useState('')

  const imageExercise = vSyllableImageExercises[imageIndex]
  const isLastImage = imageIndex === vSyllableImageExercises.length - 1

  const checkImageSyllable = () => {
    if (!selectedSyllable) return

    const isCorrect = selectedSyllable === imageExercise.syllable

    setImageFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'v-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'v', fase: 'reconocer', ejercicioId: imageExercise.id },
    })
  }

  const nextImageExercise = () => {
    setSelectedSyllable('')
    setImageFeedback('')

    if (isLastImage) {
      goToNextPhase()
      return
    }

    setImageIndex((current) => current + 1)
  }

  const [wordIndex, setWordIndex] = useState(0)
  const [selectedWordSyllable, setSelectedWordSyllable] = useState('')
  const [wordFeedback, setWordFeedback] = useState('')

  const wordExercise = vWordSyllableExercises[wordIndex]
  const isLastWord = wordIndex === vWordSyllableExercises.length - 1

  const checkWordSyllable = () => {
    if (!selectedWordSyllable) return

    const isCorrect = selectedWordSyllable === wordExercise.answer

    setWordFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'v-silabas',
      correcto: isCorrect,
      detalle: { leccionId: 'v', fase: 'palabras', ejercicioId: wordExercise.id },
    })
  }

  const nextWordExercise = () => {
    setSelectedWordSyllable('')
    setWordFeedback('')
    setWordIndex((current) => current + 1)
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="v-silabas-title"
    >
      <BackButton label="Volver a la lección" to="/lecciones/v" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 2</span>

        <h1 id="v-silabas-title">Sílabas va, ve, vi, vo y vu</h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'letra' && (
        <Card className="syllables-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Conoce la letra V mayúscula y v minúscula. Toca cada
              combinación para escucharla.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(vLetterPresentation.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            <span className="text-letter">V</span>
            <span className="text-letter">v</span>
          </div>

          <Button variant="audio" size="large" icon={Volume2} onClick={() => playAudio(vLetterPresentation.soundAudio)}>
            Escuchar el sonido de v
          </Button>

          <div className="syllables-options">
            {vLetterPresentation.combinations.map((item) => (
              <button
                className="syllable-button"
                type="button"
                key={item.syllable}
                onClick={() => playAudio(item.audio)}
              >
                {item.syllable}
              </button>
            ))}
          </div>

          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={goToNextPhase}>
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'palabra' && (
        <Card className="syllables-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Ahora escucha esta palabra con v.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() => playAudio(vLetterPresentation.word.instructionAudio)}
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={vLetterPresentation.word.image}
            alt={vLetterPresentation.word.name}
          />

          <span className="text-word">{vLetterPresentation.word.name}</span>

          <Button variant="audio" size="large" icon={Volume2} onClick={() => playAudio(vLetterPresentation.word.audio)}>
            Escuchar palabra
          </Button>

          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={goToNextPhase}>
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'reconocer' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Observa la imagen, escucha la palabra y selecciona la sílaba
              con la que comienza.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(vSyllableInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={imageExercise.image}
            alt={imageExercise.word}
          />

          <span className="text-word">{imageExercise.word}</span>

          <Button variant="audio" icon={Volume2} onClick={() => playAudio(imageExercise.audio)}>
            Escuchar palabra
          </Button>

          <div className="selection-options">
            {imageExercise.options.map((syllable) => {
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
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedSyllable(syllable)
                    setImageFeedback('')
                  }}
                >
                  <span className="selection-word">{syllable}</span>
                </Button>
              )
            })}
          </div>

          {imageFeedback === 'correct' && (
            <p className="selection-feedback selection-feedback--correct" role="status">
              ¡Correcto! {imageExercise.word} comienza con {imageExercise.syllable}.
            </p>
          )}

          {imageFeedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Escucha la palabra otra vez y prueba con otra sílaba.
            </p>
          )}

          {imageFeedback !== 'correct' && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedSyllable} onClick={checkImageSyllable}>
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
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextImageExercise}>
              {isLastImage ? 'Continuar' : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'palabras' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Lee la palabra y toca la sílaba con la que empieza. Mira el
              ejemplo: <strong>{vWordSyllableExample.word}</strong> empieza
              con <strong>{vWordSyllableExample.answer}</strong>.
            </p>

            <Button variant="audio" icon={Volume2} onClick={() => playAudio(vWordSyllableInstructionAudio)}>
              Escuchar instrucción
            </Button>
          </div>

          <span className="text-word">{wordExercise.word}</span>

          <div className="selection-options">
            {WORD_SYLLABLE_OPTIONS.map((syllable) => {
              const selected = selectedWordSyllable === syllable

              const stateClass =
                selected && wordFeedback === 'correct'
                  ? 'selection-button--correct'
                  : selected && wordFeedback === 'retry'
                    ? 'selection-button--incorrect'
                    : selected
                      ? 'selection-button--selected'
                      : ''

              return (
                <Button
                  key={syllable}
                  variant="secondary"
                  className={['selection-button', stateClass].filter(Boolean).join(' ')}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedWordSyllable(syllable)
                    setWordFeedback('')
                  }}
                >
                  <span className="selection-word">{syllable}</span>
                </Button>
              )
            })}
          </div>

          {wordFeedback === 'correct' && (
            <p className="selection-feedback selection-feedback--correct" role="status">
              ¡Correcto! {wordExercise.word} empieza con {wordExercise.answer}.
            </p>
          )}

          {wordFeedback === 'retry' && (
            <p className="selection-feedback selection-feedback--retry" role="status">
              Esa no es la sílaba correcta. Lee la palabra otra vez.
            </p>
          )}

          {wordFeedback !== 'correct' && (
            <Button icon={Check} size="large" fullWidth disabled={!selectedWordSyllable} onClick={checkWordSyllable}>
              Comprobar
            </Button>
          )}

          {wordFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedWordSyllable('')
                setWordFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {wordFeedback === 'correct' && !isLastWord && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextWordExercise}>
              Siguiente palabra
            </Button>
          )}

          {wordFeedback === 'correct' && isLastWord && (
            <Button to="/actividad/v-completar" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
              Ir a la siguiente actividad
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default ActividadVSilabasPage
