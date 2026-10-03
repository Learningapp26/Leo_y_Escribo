import {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Trophy,
  Volume2,
} from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  createJuguemosRounds,
  JUGUEMOS_PALABRAS_ID,
  JUGUEMOS_PICTURE_WORDS,
  JUGUEMOS_READING_WORDS,
} from '../data/juguemosPalabrasData'
import {
  registrarLeccionCompletada,
  registrarProgreso,
} from '../lib/progreso'
import '../styles/selection.css'

const ROUNDS_PER_STAGE = 5
const TOTAL_ROUNDS = ROUNDS_PER_STAGE * 2

function createGame() {
  return {
    pictures: createJuguemosRounds(
      JUGUEMOS_PICTURE_WORDS,
      ROUNDS_PER_STAGE,
    ),
    words: createJuguemosRounds(
      JUGUEMOS_READING_WORDS,
      ROUNDS_PER_STAGE,
    ),
  }
}

function JuguemosPalabras() {
  const [game, setGame] = useState(createGame)
  const [stage, setStage] =
    useState('pictures')
  const [roundIndex, setRoundIndex] =
    useState(0)
  const [selectedId, setSelectedId] =
    useState(null)
  const [incorrectIds, setIncorrectIds] =
    useState([])
  const [finished, setFinished] =
    useState(false)
  const [saveState, setSaveState] =
    useState('idle')

  const [feedback, setFeedback] = useState({
    tone: 'neutral',
    message:
      'Escucha la palabra y elige la respuesta correcta.',
  })

  const completedRef = useRef(false)

  const themeClass = getLessonThemeClass(
    JUGUEMOS_PALABRAS_ID,
  )

  const currentRound =
    game[stage][roundIndex]

  const isPictureStage =
    stage === 'pictures'

  const targetId = isPictureStage
    ? currentRound.target.id
    : currentRound.target

  const targetWord = isPictureStage
    ? currentRound.target.word
    : currentRound.target

  const answeredCorrectly =
    selectedId === targetId

  const completedRounds =
    (isPictureStage ? 0 : ROUNDS_PER_STAGE) +
    roundIndex +
    (answeredCorrectly ? 1 : 0)

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  function speakTarget() {
    if (!('speechSynthesis' in window)) {
      setFeedback({
        tone: 'retry',
        message:
          `No se pudo reproducir el audio. ` +
          `La palabra es “${targetWord}”.`,
      })

      return
    }

    window.speechSynthesis.cancel()

    const utterance =
      new SpeechSynthesisUtterance(targetWord)

    utterance.lang = 'es-GT'
    utterance.rate = 0.78

    window.speechSynthesis.speak(utterance)
  }

  function selectOption(option) {
    if (answeredCorrectly) return

    const optionId = isPictureStage
      ? option.id
      : option

    const optionWord = isPictureStage
      ? option.word
      : option

    const isCorrect =
      optionId === targetId

    registrarProgreso({
      actividad: JUGUEMOS_PALABRAS_ID,
      correcto: isCorrect,
      detalle: {
        leccionId: JUGUEMOS_PALABRAS_ID,
        fase: isPictureStage
          ? 'imagenes'
          : 'palabras',
        ejercicioId:
          `${stage}-${roundIndex + 1}`,
        palabraEsperada: targetWord,
        respuesta: optionWord,
      },
    })

    if (!isCorrect) {
      setIncorrectIds((current) => {
        if (current.includes(optionId)) {
          return current
        }

        return [
          ...current,
          optionId,
        ]
      })

      setFeedback({
        tone: 'retry',
        message:
          'Esa no es. Escucha otra vez y vuelve a intentarlo.',
      })

      return
    }

    setSelectedId(optionId)

    setFeedback({
      tone: 'correct',
      message:
        `¡Muy bien! Encontraste la palabra ${targetWord}.`,
    })
  }

  async function nextRound() {
    if (!answeredCorrectly) return

    if (
      roundIndex <
      ROUNDS_PER_STAGE - 1
    ) {
      setRoundIndex(
        (current) => current + 1,
      )
      setSelectedId(null)
      setIncorrectIds([])

      setFeedback({
        tone: 'neutral',
        message:
          'Escucha la nueva palabra y elige la respuesta correcta.',
      })

      return
    }

    if (isPictureStage) {
      setStage('words')
      setRoundIndex(0)
      setSelectedId(null)
      setIncorrectIds([])

      setFeedback({
        tone: 'neutral',
        message:
          'Ahora escucha y encuentra la palabra escrita.',
      })

      return
    }

    if (completedRef.current) return

    completedRef.current = true
    setSaveState('saving')

    const result = await registrarLeccionCompletada(
      JUGUEMOS_PALABRAS_ID,
    )

    if (result.error || result.skipped) {
      completedRef.current = false
      setSaveState('error')
      setFeedback({
        tone: 'retry',
        message: result.skipped
          ? 'Inicia sesión para guardar el juego y desbloquear el repaso.'
          : 'No pudimos guardar el juego. Inténtalo nuevamente.',
      })
      return
    }

    setSaveState('saved')
    setFinished(true)
  }

  function restartGame() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }

    completedRef.current = false

    setGame(createGame())
    setStage('pictures')
    setRoundIndex(0)
    setSelectedId(null)
    setIncorrectIds([])
    setFinished(false)
    setSaveState('idle')

    setFeedback({
      tone: 'neutral',
      message:
        'Escucha la palabra y elige la respuesta correcta.',
    })
  }

  if (finished) {
    return (
      <main
        className={
          `page selection-page ${themeClass}`
        }
        aria-labelledby="word-game-finished-title"
      >
        <Card className="selection-card">
          <Trophy
            className="finish-icon"
            aria-hidden="true"
          />

          <h1 id="word-game-finished-title">
            ¡Completaste el juego!
          </h1>

          <p className="text-instruction">
            Reconociste imágenes y palabras
            de la Unidad 1. ¡Excelente trabajo!
          </p>

          <Button
            icon={RotateCcw}
            size="large"
            fullWidth
            onClick={restartGame}
          >
            Jugar de nuevo
          </Button>

          <Button
            to="/lecciones/unidad/1"
            variant="secondary"
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
          >
            Volver a la Unidad 1
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main
      className={
        `page selection-page ${themeClass}`
      }
      aria-labelledby="word-game-title"
    >
      <BackButton
        label="Volver a la Unidad 1"
        to="/lecciones/unidad/1"
      />

      <header className="text-center">
        <span className="text-ui-label">
          Unidad 1 · Juego de palabras
        </span>

        <h1 id="word-game-title">
          ¡Juguemos con las palabras!
        </h1>

        <p className="text-instruction">
          Escucha con atención y encuentra
          la imagen o la palabra correcta.
        </p>
      </header>

      <ProgressBar
        value={completedRounds}
        max={TOTAL_ROUNDS}
        label={
          `${completedRounds} de ` +
          `${TOTAL_ROUNDS} retos`
        }
      />

      <Card
        className="selection-card"
        aria-labelledby="word-game-round-title"
      >
        <div className="selection-instructions">
          <span className="text-ui-label">
            {isPictureStage
              ? 'Parte 1 · Imágenes'
              : 'Parte 2 · Palabras'}
          </span>

          <h2 id="word-game-round-title">
            {isPictureStage
              ? '¿Qué dibujo escuchaste?'
              : '¿Qué palabra escuchaste?'}
          </h2>

          <p className="text-instruction">
            Reto{' '}
            {completedRounds +
              (answeredCorrectly ? 0 : 1)}
            {' '}de {TOTAL_ROUNDS}
          </p>
        </div>

        <Button
          variant="audio"
          size="large"
          icon={Volume2}
          onClick={speakTarget}
        >
          Escuchar palabra
        </Button>

        <div
          className={
            'selection-options ' +
            'selection-options--trio'
          }
          role="group"
          aria-label="Opciones de respuesta"
        >
          {currentRound.options.map(
            (option) => {
              const optionId =
                isPictureStage
                  ? option.id
                  : option

              const optionWord =
                isPictureStage
                  ? option.word
                  : option

              const isSelected =
                selectedId === optionId

              const isIncorrect =
                incorrectIds.includes(
                  optionId,
                )

              return (
                <button
                  key={optionId}
                  type="button"
                  className={[
                    'selection-button',
                    isSelected
                      ? 'selection-button--correct'
                      : '',
                    isIncorrect
                      ? 'selection-button--incorrect'
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={isSelected}
                  aria-disabled={
                    answeredCorrectly
                  }
                  onClick={() =>
                    selectOption(option)
                  }
                >
                  {isPictureStage && (
                    <img
                      className="selection-image"
                      src={option.image}
                      alt={option.imageAlt}
                    />
                  )}

                  <span className="selection-word">
                    {optionWord}
                  </span>
                </button>
              )
            },
          )}
        </div>

        <p
          className={[
            'selection-feedback',
            feedback.tone !== 'neutral'
              ? `selection-feedback--${feedback.tone}`
              : '',
          ]
            .filter(Boolean)
            .join(' ')}
          role="status"
          aria-live="polite"
        >
          {feedback.tone === 'correct' && (
            <CheckCircle2
              aria-hidden="true"
            />
          )}

          {feedback.message}
        </p>

        {answeredCorrectly && (
          <Button
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
            disabled={saveState === 'saving'}
            onClick={nextRound}
          >
            {isPictureStage &&
            roundIndex ===
              ROUNDS_PER_STAGE - 1
              ? 'Continuar con palabras'
              : !isPictureStage &&
                  roundIndex ===
                    ROUNDS_PER_STAGE - 1
                ? saveState === 'saving'
                  ? 'Guardando juego...'
                  : 'Terminar juego'
                : 'Siguiente palabra'}
          </Button>
        )}
      </Card>
    </main>
  )
}

export default JuguemosPalabras
