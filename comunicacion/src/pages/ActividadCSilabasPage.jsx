import { useState } from 'react'
import {
  ArrowRight,
  Check,
  RotateCcw,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  cSyllableAudios,
  cSyllableImageExercises,
  cSyllableInstructionAudio,
  cSyllableSearchExercises,
  cSyllableSearchInstructionAudio,
} from '../data/cData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'

const PHASES = ['imagenes', 'buscar']
const syllableOptions = ['ca', 'co', 'cu']

function ActividadCSilabasPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('c')

  const [imageIndex, setImageIndex] = useState(0)

  const [
    selectedSyllable,
    setSelectedSyllable,
  ] = useState('')

  const [
    imageFeedback,
    setImageFeedback,
  ] = useState('')

  const [searchIndex, setSearchIndex] = useState(0)

  const [
    selectedWords,
    setSelectedWords,
  ] = useState([])

  const [
    searchFeedback,
    setSearchFeedback,
  ] = useState('')

  const imageExercise =
    cSyllableImageExercises[imageIndex]

  const searchExercise =
    cSyllableSearchExercises[searchIndex]

  const isLastImage =
    imageIndex ===
    cSyllableImageExercises.length - 1

  const isLastSearch =
    searchIndex ===
    cSyllableSearchExercises.length - 1

  const checkImageSyllable = () => {
    if (!selectedSyllable) return

    setImageFeedback(
      selectedSyllable ===
        imageExercise.syllable
        ? 'correct'
        : 'retry',
    )
  }

  const nextImageExercise = () => {
    setSelectedSyllable('')
    setImageFeedback('')

    if (isLastImage) {
      setPhaseIndex(1)
      return
    }

    setImageIndex(
      (current) => current + 1,
    )
  }

  const toggleSearchWord = (word) => {
    if (searchFeedback === 'correct') return

    setSearchFeedback('')

    setSelectedWords((current) =>
      current.includes(word)
        ? current.filter(
            (item) => item !== word,
          )
        : [...current, word],
    )
  }

  const checkSearchWords = () => {
    const answers = searchExercise.answers

    const isCorrect =
      selectedWords.length ===
        answers.length &&
      selectedWords.every((word) =>
        answers.includes(word),
      )

    setSearchFeedback(
      isCorrect ? 'correct' : 'retry',
    )
  }

  const resetSearchWords = () => {
    setSelectedWords([])
    setSearchFeedback('')
  }

  const nextSearchExercise = () => {
    resetSearchWords()

    setSearchIndex(
      (current) => current + 1,
    )
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="c-silabas-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/c"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad 2
        </span>

        <h1 id="c-silabas-title">
          Sílabas ca, co y cu
        </h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'imagenes' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Observa la imagen, escucha la
              palabra y selecciona la sílaba con
              la que comienza.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(
                  cSyllableInstructionAudio,
                )
              }
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={imageExercise.image}
            alt={imageExercise.word}
          />

          <span className="text-word">
            {imageExercise.word}
          </span>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() =>
              playAudio(imageExercise.audio)
            }
          >
            Escuchar palabra
          </Button>

          <div className="selection-options">
            {syllableOptions.map((syllable) => {
              const selected =
                selectedSyllable === syllable

              const stateClass =
                selected &&
                imageFeedback === 'correct'
                  ? 'selection-button--correct'
                  : selected &&
                      imageFeedback === 'retry'
                    ? 'selection-button--incorrect'
                    : selected
                      ? 'selection-button--selected'
                      : ''

              return (
                <Button
                  key={syllable}
                  variant="secondary"
                  className={[
                    'selection-button',
                    stateClass,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedSyllable(
                      syllable,
                    )
                    setImageFeedback('')

                    playAudio(
                      cSyllableAudios[
                        syllable
                      ],
                    )
                  }}
                >
                  <span className="selection-word">
                    {syllable}
                  </span>
                </Button>
              )
            })}
          </div>

          {imageFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! {imageExercise.word}{' '}
              comienza con{' '}
              {imageExercise.syllable}.
            </p>
          )}

          {imageFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Escucha la palabra otra vez y
              prueba con otra sílaba.
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
              {isLastImage
                ? 'Continuar'
                : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'buscar' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Busca en las palabras la sílaba{' '}
              <strong>
                {searchExercise.target}
              </strong>{' '}
              y selecciona todas las que la
              contienen.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(
                  cSyllableSearchInstructionAudio,
                )
              }
            >
              Escuchar instrucción
            </Button>
          </div>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(
                cSyllableAudios[
                  searchExercise.target
                ],
              )
            }
          >
            Escuchar {searchExercise.target}
          </Button>

          <div className="selection-options">
            {searchExercise.words.map((word) => {
              const selected =
                selectedWords.includes(word)

              const correctSelected =
                searchFeedback === 'correct' &&
                selected

              const incorrectSelected =
                searchFeedback === 'retry' &&
                selected &&
                !searchExercise.answers.includes(
                  word,
                )

              const stateClass =
                correctSelected
                  ? 'selection-button--correct'
                  : incorrectSelected
                    ? 'selection-button--incorrect'
                    : selected
                      ? 'selection-button--selected'
                      : ''

              return (
                <Button
                  key={word}
                  variant="secondary"
                  className={[
                    'selection-button',
                    stateClass,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() =>
                    toggleSearchWord(word)
                  }
                >
                  <span className="selection-word">
                    {word}
                  </span>
                </Button>
              )
            })}
          </div>

          {searchFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Encontraste todas las
              palabras con la sílaba{' '}
              {searchExercise.target}.
            </p>
          )}

          {searchFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa las palabras otra vez. Puede
              faltar alguna o puede haber una
              selección que no corresponde.
            </p>
          )}

          {searchFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={
                selectedWords.length === 0
              }
              onClick={checkSearchWords}
            >
              Comprobar selección
            </Button>
          )}

          {searchFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={resetSearchWords}
            >
              Intentar nuevamente
            </Button>
          )}

          {searchFeedback === 'correct' &&
            !isLastSearch && (
              <Button
                icon={ArrowRight}
                iconPosition="right"
                size="large"
                fullWidth
                onClick={nextSearchExercise}
              >
                Siguiente sílaba
              </Button>
            )}

          {searchFeedback === 'correct' &&
            isLastSearch && (
              <Button
                to="/actividad/c-completar"
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

export default ActividadCSilabasPage