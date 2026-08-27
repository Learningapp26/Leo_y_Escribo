import { useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Check,
  Dice5,
  Footprints,
  PencilLine,
  RotateCcw,
  Sparkles,
  Trophy,
} from 'lucide-react'

import Button from '../components/common/Button'
import AudioPlaceholderButton from '../components/common/AudioPlaceholderButton'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  BOARD_EFFECTS,
  BOARD_ORDER,
  SQUARE_TASKS,
  SUBIDAS_RESBALONES_ID,
} from '../data/subidasResbalonesData'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/subidas-resbalones.css'

const MOVE_DELAY = 550
const EFFECT_DELAY = 800

function SubidasResbalonesPage() {
  const [position, setPosition] = useState(0)
  const [dieValue, setDieValue] = useState(null)
  const [turnState, setTurnState] = useState('ready')
  const [eventTone, setEventTone] = useState('neutral')
  const [pendingSquare, setPendingSquare] = useState(null)
  const [eventMessage, setEventMessage] = useState('Lanza el dado para comenzar.')
  const [answers, setAnswers] = useState([])
  const [feedback, setFeedback] = useState('')
  const [finished, setFinished] = useState(false)
  const completedRef = useRef(false)

  const themeClass = getLessonThemeClass(SUBIDAS_RESBALONES_ID)
  const currentTask = pendingSquare ? SQUARE_TASKS[pendingSquare] : null
  const diceDisabled = turnState !== 'ready' || finished

  const moveTo = (nextPosition) => {
    setTurnState('moving')
    setPosition(nextPosition)
  }

  const resolveLanding = (square) => {
    const task = SQUARE_TASKS[square]
    const effect = BOARD_EFFECTS[square]

    if (task) {
      setPendingSquare(square)
      setAnswers([])
      setFeedback('')
      setTurnState('pending')
      setEventTone('challenge')
      setEventMessage(`Llegaste a la casilla ${square}. ¡Completa el reto!`)
      return
    }

    if (!effect) {
      setTurnState('ready')
      setEventTone('neutral')
      setEventMessage(square === 17 ? '¡Casilla tranquila! Puedes lanzar el dado otra vez.' : '¡Buen camino! Lanza el dado otra vez.')
      return
    }

    const isSlide = effect.type === 'slide'
    const label = isSlide ? '¡Cuidado! Resbalas' : effect.type === 'advance' ? '¡Avanzas un espacio!' : '¡Subes por la escalera!'
    setEventTone(isSlide ? 'slide' : 'ladder')
    setEventMessage(`${label} hasta la casilla ${effect.destination}.`)

    window.setTimeout(() => {
      moveTo(effect.destination)
      window.setTimeout(() => resolveLanding(effect.destination), MOVE_DELAY)
    }, EFFECT_DELAY)
  }

  const rollDie = () => {
    if (diceDisabled) return

    setTurnState('rolling')
    setEventTone('neutral')
    setDieValue(null)
    setEventMessage('El dado está girando…')

    window.setTimeout(() => {
      const value = Math.floor(Math.random() * 6) + 1
      const landing = Math.min(position + value, 20)

      setDieValue(value)
      setEventMessage(`Sacaste ${value}. Avanzas a la casilla ${landing}.`)
      moveTo(landing)

      window.setTimeout(() => resolveLanding(landing), MOVE_DELAY)
    }, MOVE_DELAY)
  }

  const toggleAnswer = (optionId) => {
    if (!currentTask || feedback === 'correct') return

    setAnswers((current) => {
      if (current.includes(optionId)) {
        return current.filter((answer) => answer !== optionId)
      }

      if (current.length >= currentTask.selectionCount) return current

      return [...current, optionId]
    })
    setFeedback('')
  }

  const checkTask = () => {
    if (!currentTask) return

    const isCorrect = currentTask.validate(answers)
    setFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: SUBIDAS_RESBALONES_ID,
      correcto: isCorrect,
      detalle: {
        leccionId: SUBIDAS_RESBALONES_ID,
        fase: 'tablero',
        ejercicioId: `casilla-${pendingSquare}`,
        casilla: pendingSquare,
      },
    })

    if (!isCorrect) return

    if (pendingSquare === 20) {
      if (!completedRef.current) {
        completedRef.current = true
        registrarLeccionCompletada(SUBIDAS_RESBALONES_ID)
      }
      setFinished(true)
      return
    }

    const effect = BOARD_EFFECTS[pendingSquare]
    if (effect?.type === 'ladder-task') {
      setEventMessage(`¡Respuesta correcta! Subes hasta la casilla ${effect.destination}.`)
      setTurnState('moving')
      setEventTone('ladder')
      window.setTimeout(() => {
        setPosition(effect.destination)
        setPendingSquare(null)
        window.setTimeout(() => resolveLanding(effect.destination), MOVE_DELAY)
      }, MOVE_DELAY)
      return
    }

  }

  const continueGame = () => {
    setPendingSquare(null)
    setFeedback('')
    setTurnState('ready')
    setEventTone('neutral')
    setEventMessage('¡Respuesta correcta! Puedes lanzar el dado otra vez.')
  }

  const restartGame = () => {
    completedRef.current = false
    setPosition(0)
    setDieValue(null)
    setTurnState('ready')
    setEventTone('neutral')
    setPendingSquare(null)
    setEventMessage('Lanza el dado para comenzar.')
    setAnswers([])
    setFeedback('')
    setFinished(false)
  }

  if (finished) {
    return (
      <main className={`page board-game-page ${themeClass}`} aria-labelledby="board-finished-title">
        <Card className="board-game-finish-card">
          <Trophy aria-hidden="true" />
          <h1 id="board-finished-title">¡Llegaste a la meta!</h1>
          <p className="text-instruction">
            Completaste Subidas y resbalones de palabras. ¡Tu lección fue registrada!
          </p>
          <Button icon={RotateCcw} size="large" fullWidth onClick={restartGame}>
            Volver a jugar
          </Button>
          <Button to="/lecciones/unidad/2" variant="secondary" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
            Volver a la Unidad 2
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main className={`page board-game-page ${themeClass}`} aria-labelledby="board-game-title">
      <BackButton label="Volver a la Unidad 2" to="/lecciones/unidad/2" />

      <header className="board-game-header">
        <span className="text-ui-label">Unidad 2 · Juego de palabras</span>
        <h1 id="board-game-title">Subidas y resbalones de palabras</h1>
        <p className="text-instruction">Lanza el dado, avanza con tu ficha y supera los retos de cada casilla.</p>
        <AudioPlaceholderButton>
          Escuchar instrucciones
        </AudioPlaceholderButton>
      </header>

      <section className="board-game-layout" aria-label="Tablero de Subidas y resbalones de palabras">
        <div className="board-game-board" role="group" aria-label={`Tu ficha está en la casilla ${position || 'Salida'}`}>
          {BOARD_ORDER.map((square) => {
            const effect = BOARD_EFFECTS[square]
            const task = SQUARE_TASKS[square]
            const hasToken = position === square
            const isCurrent = pendingSquare === square
            const effectClass = effect?.type === 'slide'
              ? 'board-square--slide'
              : effect
                ? 'board-square--ladder'
                : task
                  ? 'board-square--task'
                  : ''

            return (
              <div
                key={square}
                className={['board-square', effectClass, hasToken ? 'board-square--token' : '', isCurrent ? 'board-square--current' : ''].filter(Boolean).join(' ')}
                aria-label={`Casilla ${square}${effect ? `. ${effect.label}` : task ? '. Tiene un reto de palabras.' : ''}${hasToken ? '. Tu ficha está aquí.' : ''}`}
              >
                <span className="board-square__number">{square}</span>
                {square === 1 && <span className="board-square__label">🚩 Salida</span>}
                {square === 20 && <span className="board-square__label">🏆 Meta</span>}
                {effect?.type === 'slide' && <ArrowDown className="board-square__effect" aria-hidden="true" />}
                {effect && effect.type !== 'slide' && <ArrowUp className="board-square__effect" aria-hidden="true" />}
                {task && !effect && <PencilLine className="board-square__task" aria-hidden="true" />}
                {hasToken && <Footprints className="board-square__token" aria-label="Tu ficha" />}
                {effect && <span className="board-square__destination">{effect.label}</span>}
              </div>
            )
          })}
        </div>

        <aside className={`board-game-turn board-game-turn--${eventTone}`} aria-live="polite">
          <div className={['board-die', turnState === 'rolling' ? 'board-die--rolling' : ''].join(' ')} aria-label={dieValue ? `Resultado del dado: ${dieValue}` : 'Dado digital'}>
            <Dice5 aria-hidden="true" />
            <strong>{dieValue ?? '?'}</strong>
          </div>
          <p>{eventMessage}</p>
          <Button icon={Dice5} size="large" fullWidth disabled={diceDisabled} onClick={rollDie}>
            {turnState === 'rolling' ? 'Lanzando…' : 'Lanzar dado'}
          </Button>
        </aside>
      </section>

      <div className="board-game-legend" aria-label="Leyenda del tablero">
        <span><ArrowUp aria-hidden="true" /> Escalera: sube</span>
        <span><ArrowDown aria-hidden="true" /> Resbalón: baja</span>
        <span><PencilLine aria-hidden="true" /> Reto de palabras</span>
      </div>

      {currentTask && (
        <Card className="board-game-challenge" aria-labelledby="board-challenge-title">
          <div className="board-game-challenge__heading">
            <Sparkles aria-hidden="true" />
            <div>
              <span className="text-ui-label">Reto de la casilla {pendingSquare}</span>
              <h2 id="board-challenge-title">{currentTask.prompt}</h2>
            </div>
          </div>

          {currentTask.image && (
            <img className="board-game-challenge__image" src={currentTask.image} alt={currentTask.imageAlt} />
          )}

          <p className="board-game-challenge__hint">{currentTask.hint}</p>

          <AudioPlaceholderButton>
            Escuchar reto
          </AudioPlaceholderButton>

          <div
            className="board-game-choices"
            role="group"
            aria-label={`Opciones para el reto de la casilla ${pendingSquare}`}
          >
            {currentTask.options.map((option) => {
              const isSelected = answers.includes(option.id)
              const stateClass = feedback && isSelected
                ? feedback === 'correct'
                  ? 'board-game-choice--correct'
                  : 'board-game-choice--incorrect'
                : isSelected
                  ? 'board-game-choice--selected'
                  : ''

              return (
                <Button
                  key={option.id}
                  variant="secondary"
                  className={['board-game-choice', stateClass].filter(Boolean).join(' ')}
                  aria-pressed={isSelected}
                  disabled={feedback === 'correct'}
                  onClick={() => toggleAnswer(option.id)}
                >
                  {option.label}
                </Button>
              )
            })}
          </div>

          {feedback === 'correct' && <p className="selection-feedback selection-feedback--correct" role="status">{currentTask.success}</p>}
          {feedback === 'retry' && <p className="selection-feedback selection-feedback--retry" role="status">{currentTask.retry}</p>}

          {feedback !== 'correct' && (
            <Button icon={Check} size="large" fullWidth disabled={answers.length !== currentTask.selectionCount} onClick={checkTask}>
              Revisar respuesta
            </Button>
          )}

          {feedback === 'retry' && (
            <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setAnswers([]); setFeedback('') }}>
              Intentar nuevamente
            </Button>
          )}

          {feedback === 'correct' && pendingSquare !== 2 && pendingSquare !== 20 && (
            <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={continueGame}>
              Continuar el juego
            </Button>
          )}
        </Card>
      )}
    </main>
  )
}

export default SubidasResbalonesPage
