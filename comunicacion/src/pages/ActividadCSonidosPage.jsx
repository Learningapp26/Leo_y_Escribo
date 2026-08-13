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
  cInitialSoundImages,
  cInitialSoundInstructionAudio,
  cMiddleSoundInstructionAudio,
  cMiddleSoundWords,
  cRhymeExercises,
  cRhymeInstructionAudio,
  cSoundExamples,
  cSoundIntro,
} from '../data/cData'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/completion.css'

const PHASES = [
  'sonido',
  'inicio',
  'segunda-silaba',
  'rimas',
]

const initialSoundAnswers = cInitialSoundImages
  .filter((item) => item.startsWithC)
  .map((item) => item.id)

function getSelectionState(
  isSelected,
  feedback,
) {
  if (!isSelected) return ''

  if (feedback === 'correct') {
    return 'selection-button--correct'
  }

  if (feedback === 'retry') {
    return 'selection-button--incorrect'
  }

  return 'selection-button--selected'
}

function ActividadCSonidosPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]

  const themeClass = getLessonThemeClass('c')

  const [
    selectedInitialIds,
    setSelectedInitialIds,
  ] = useState([])

  const [
    initialFeedback,
    setInitialFeedback,
  ] = useState('')

  const [middleIndex, setMiddleIndex] = useState(0)

  const [
    selectedMiddleIndex,
    setSelectedMiddleIndex,
  ] = useState(null)

  const [
    middleFeedback,
    setMiddleFeedback,
  ] = useState('')

  const [rhymeIndex, setRhymeIndex] = useState(0)

  const [
    selectedRhyme,
    setSelectedRhyme,
  ] = useState('')

  const [
    rhymeFeedback,
    setRhymeFeedback,
  ] = useState('')

  const middleExercise =
    cMiddleSoundWords[middleIndex]

  const rhymeExercise =
    cRhymeExercises[rhymeIndex]

  const isLastMiddle =
    middleIndex ===
    cMiddleSoundWords.length - 1

  const isLastRhyme =
    rhymeIndex ===
    cRhymeExercises.length - 1

  const goToNextPhase = () => {
    setPhaseIndex((current) => current + 1)
  }

  const toggleInitialImage = (item) => {
    if (initialFeedback === 'correct') return

    playAudio(item.audio)
    setInitialFeedback('')

    setSelectedInitialIds((current) =>
      current.includes(item.id)
        ? current.filter(
            (id) => id !== item.id,
          )
        : [...current, item.id],
    )
  }

  const checkInitialImages = () => {
    const isCorrect =
      selectedInitialIds.length ===
        initialSoundAnswers.length &&
      selectedInitialIds.every((id) =>
        initialSoundAnswers.includes(id),
      )

    setInitialFeedback(
      isCorrect ? 'correct' : 'retry',
    )
  }

  const retryInitialImages = () => {
    setSelectedInitialIds([])
    setInitialFeedback('')
  }

  const checkMiddleSound = () => {
    if (selectedMiddleIndex === null) return

    setMiddleFeedback(
      selectedMiddleIndex ===
        middleExercise.answerIndex
        ? 'correct'
        : 'retry',
    )
  }

  const nextMiddleWord = () => {
    setSelectedMiddleIndex(null)
    setMiddleFeedback('')

    if (isLastMiddle) {
      goToNextPhase()
      return
    }

    setMiddleIndex(
      (current) => current + 1,
    )
  }

  const checkRhyme = () => {
    if (!selectedRhyme) return

    const isCorrect =
      selectedRhyme === rhymeExercise.answer

    setRhymeFeedback(
      isCorrect ? 'correct' : 'retry',
    )

    if (isCorrect) {
      const answer =
        rhymeExercise.options.find(
          (option) =>
            option.name ===
            rhymeExercise.answer,
        )

      playAudio(answer?.audio)
    }
  }

  const retryRhyme = () => {
    setSelectedRhyme('')
    setRhymeFeedback('')
  }

  const nextRhyme = () => {
    setSelectedRhyme('')
    setRhymeFeedback('')

    setRhymeIndex(
      (current) => current + 1,
    )
  }

  return (
    <main
      className={`page selection-page ${themeClass}`}
      aria-labelledby="c-sonidos-title"
    >
      <BackButton
        label="Volver a la lección"
        to="/lecciones/c"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Actividad 1
        </span>

        <h1 id="c-sonidos-title">
          Reconozcamos el sonido de la letra C
        </h1>
      </header>

      <ProgressBar
        value={phaseIndex + 1}
        max={PHASES.length}
        label={`Parte ${phaseIndex + 1} de ${PHASES.length}`}
      />

      {phase === 'sonido' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Nombra despacio la palabra coco y
              escucha su primer sonido. Repítelo
              varias veces.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(
                  cSoundIntro.instructionAudio,
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
              playAudio(cSoundIntro.soundAudio)
            }
          >
            Escuchar el sonido /c/
          </Button>

          <img
            className="selection-image selection-image--featured"
            src={cSoundIntro.image}
            alt={cSoundIntro.imageAlt}
          />

          <span className="text-word">
            {cSoundIntro.word}
          </span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(cSoundIntro.wordAudio)
            }
          >
            Escuchar la palabra coco
          </Button>

          <p className="text-instruction">
            Escucha y repite: casa, come y cura.
          </p>

          <div className="completion-bank">
            {cSoundExamples.map((example) => (
              <Button
                key={example.word}
                variant="audio"
                icon={Volume2}
                onClick={() =>
                  playAudio(example.audio)
                }
              >
                {example.word}
              </Button>
            ))}
          </div>

          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            onClick={goToNextPhase}
          >
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'inicio' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Toca los dibujos cuyo nombre inicia
              con el mismo sonido que la palabra
              coco.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(
                  cInitialSoundInstructionAudio,
                )
              }
            >
              Escuchar instrucción
            </Button>
          </div>

          <div className="selection-options">
            {cInitialSoundImages.map((item) => {
              const selected =
                selectedInitialIds.includes(
                  item.id,
                )

              const stateClass =
                getSelectionState(
                  selected,
                  initialFeedback,
                )

              return (
                <Button
                  key={item.id}
                  variant="secondary"
                  className={[
                    'selection-button',
                    stateClass,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={selected}
                  onClick={() =>
                    toggleInitialImage(item)
                  }
                >
                  <span className="app-card__content">
                    <img
                      className="selection-image"
                      src={item.image}
                      alt={item.name}
                    />

                    <span className="selection-word">
                      {item.name}
                    </span>
                  </span>
                </Button>
              )
            })}
          </div>

          {initialFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! Caballo, corazón y cuna
              comienzan con el sonido /c/.
            </p>
          )}

          {initialFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Revisa otra vez. Escucha cada
              palabra y busca las que comienzan
              como coco.
            </p>
          )}

          {initialFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={
                selectedInitialIds.length === 0
              }
              onClick={checkInitialImages}
            >
              Comprobar selección
            </Button>
          )}

          {initialFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryInitialImages}
            >
              Intentar nuevamente
            </Button>
          )}

          {initialFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={goToNextPhase}
            >
              Siguiente parte
            </Button>
          )}
        </Card>
      )}

      {phase === 'segunda-silaba' && (
        <Card className="completion-card">
          <div className="completion-instructions">
            <p className="text-instruction">
              El sonido /c/ también puede
              escucharse después. Escucha cada
              palabra y toca la sílaba donde
              aparece.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(
                  cMiddleSoundInstructionAudio,
                )
              }
            >
              Escuchar instrucción
            </Button>
          </div>

          <span className="text-word">
            {middleExercise.word}
          </span>

          <Button
            variant="audio"
            size="large"
            icon={Volume2}
            onClick={() =>
              playAudio(middleExercise.audio)
            }
          >
            Escuchar palabra
          </Button>

          <div className="completion-bank">
            {middleExercise.syllables.map(
              (syllable, index) => {
                const selected =
                  selectedMiddleIndex === index

                const stateClass =
                  selected &&
                  middleFeedback === 'correct'
                    ? 'completion-correct'
                    : selected &&
                        middleFeedback === 'retry'
                      ? 'completion-incorrect'
                      : selected
                        ? 'completion-active'
                        : ''

                return (
                  <Button
                    key={`${middleExercise.id}-${syllable}`}
                    variant="secondary"
                    className={[
                      'completion-chip',
                      'text-syllable',
                      stateClass,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-pressed={selected}
                    onClick={() => {
                      setSelectedMiddleIndex(
                        index,
                      )
                      setMiddleFeedback('')
                    }}
                  >
                    {syllable}
                  </Button>
                )
              },
            )}
          </div>

          {middleFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Correcto! En{' '}
              {middleExercise.word}, el sonido
              /c/ está en la segunda sílaba.
            </p>
          )}

          {middleFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Escucha nuevamente y prueba con la
              otra sílaba.
            </p>
          )}

          {middleFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={
                selectedMiddleIndex === null
              }
              onClick={checkMiddleSound}
            >
              Comprobar
            </Button>
          )}

          {middleFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={() => {
                setSelectedMiddleIndex(null)
                setMiddleFeedback('')
              }}
            >
              Intentar nuevamente
            </Button>
          )}

          {middleFeedback === 'correct' && (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              size="large"
              fullWidth
              onClick={nextMiddleWord}
            >
              {isLastMiddle
                ? 'Continuar con las rimas'
                : 'Siguiente palabra'}
            </Button>
          )}
        </Card>
      )}

      {phase === 'rimas' && (
        <Card className="selection-card">
          <div className="selection-instructions">
            <p className="text-instruction">
              Algunos nombres terminan con el mismo
              sonido. Escucha la palabra y elige la
              imagen cuyo nombre rima con ella.
            </p>

            <Button
              variant="audio"
              icon={Volume2}
              onClick={() =>
                playAudio(
                  cRhymeInstructionAudio,
                )
              }
            >
              Escuchar instrucción
            </Button>
          </div>

          <img
            className="selection-image selection-image--featured"
            src={rhymeExercise.image}
            alt={rhymeExercise.word}
          />

          <span className="text-word">
            {rhymeExercise.word}
          </span>

          <Button
            variant="audio"
            icon={Volume2}
            onClick={() =>
              playAudio(rhymeExercise.audio)
            }
          >
            Escuchar palabra
          </Button>

          <div className="selection-options">
            {rhymeExercise.options.map(
              (option) => {
                const selected =
                  selectedRhyme === option.name

                const stateClass =
                  selected &&
                  rhymeFeedback === 'correct'
                    ? 'selection-button--correct'
                    : selected &&
                        rhymeFeedback === 'retry'
                      ? 'selection-button--incorrect'
                      : selected
                        ? 'selection-button--selected'
                        : ''

                return (
                  <Button
                    key={option.name}
                    variant="secondary"
                    className={[
                      'selection-button',
                      stateClass,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-pressed={selected}
                    onClick={() => {
                      setSelectedRhyme(
                        option.name,
                      )
                      setRhymeFeedback('')
                      playAudio(option.audio)
                    }}
                  >
                    <span className="app-card__content">
                      <img
                        className="selection-image"
                        src={option.image}
                        alt={option.name}
                      />

                      <span className="selection-word">
                        {option.name}
                      </span>
                    </span>
                  </Button>
                )
              },
            )}
          </div>

          {rhymeFeedback === 'correct' && (
            <p
              className="selection-feedback selection-feedback--correct"
              role="status"
            >
              ¡Muy bien! {rhymeExercise.word}{' '}
              rima con {rhymeExercise.answer}.
            </p>
          )}

          {rhymeFeedback === 'retry' && (
            <p
              className="selection-feedback selection-feedback--retry"
              role="status"
            >
              Escucha otra vez cómo termina la
              palabra y prueba de nuevo.
            </p>
          )}

          {rhymeFeedback !== 'correct' && (
            <Button
              icon={Check}
              size="large"
              fullWidth
              disabled={!selectedRhyme}
              onClick={checkRhyme}
            >
              Comprobar
            </Button>
          )}

          {rhymeFeedback === 'retry' && (
            <Button
              variant="retry"
              icon={RotateCcw}
              size="large"
              fullWidth
              onClick={retryRhyme}
            >
              Intentar nuevamente
            </Button>
          )}

          {rhymeFeedback === 'correct' &&
            !isLastRhyme && (
              <Button
                icon={ArrowRight}
                iconPosition="right"
                size="large"
                fullWidth
                onClick={nextRhyme}
              >
                Siguiente rima
              </Button>
            )}

          {rhymeFeedback === 'correct' &&
            isLastRhyme && (
              <Button
                to="/actividad/c-silabas"
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

export default ActividadCSonidosPage