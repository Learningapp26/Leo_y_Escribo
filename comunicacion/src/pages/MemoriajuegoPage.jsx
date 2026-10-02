import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, RotateCcw, Trophy } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import { crearMazoMemoria, tarjetas } from '../data/memoria'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/memoria.css'

// TODO: ajustar al id real del juego en units.js / lessonColors.js
const MEMORIA_ID = 'memoria'
const UNIT_PATH = '/lecciones/unidad/4'
const TOTAL_PAIRS = tarjetas.items.length
const FLIP_BACK_DELAY = 1200

const INITIAL_MESSAGE = 'Toca una carta para voltearla y busca su pareja.'

// Fisher-Yates: mezcla sin modificar el arreglo original.
function shuffle(list) {
  const result = [...list]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function createDeck() {
  return shuffle(crearMazoMemoria())
}

function MemoryCard({ card, isFlipped, isMatched, isIncorrect, disabled, onSelect }) {
  const isVisible = isFlipped || isMatched

  const label = isVisible
    ? card.type === 'image'
      ? `Imagen de ${card.alt}`
      : `Palabra ${card.value}`
    : 'Carta volteada'

  return (
    <button
      className={[
        'memory-card',
        isFlipped ? 'memory-card--flipped' : '',
        isMatched ? 'memory-card--matched' : '',
        isIncorrect ? 'memory-card--incorrect' : '',
      ].filter(Boolean).join(' ')}
      type="button"
      aria-label={label}
      aria-pressed={isVisible}
      disabled={disabled}
      onClick={() => onSelect(card)}
    >
      {isVisible ? (
        card.type === 'image' ? (
          <img className="memory-card__image" src={card.value} alt={card.alt} />
        ) : (
          <span className="memory-card__word">{card.value}</span>
        )
      ) : (
        <span className="memory-card__back" aria-hidden="true">?</span>
      )}
    </button>
  )
}

function MemoriaJuegoPage() {
  const [deck, setDeck] = useState(createDeck)
  const [flippedIds, setFlippedIds] = useState([])
  const [matchedPairIds, setMatchedPairIds] = useState([])
  const [isLocked, setIsLocked] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [feedback, setFeedback] = useState({ tone: 'neutral', message: INITIAL_MESSAGE })

  const completedRef = useRef(false)
  const timeoutRef = useRef(null)
  const themeClass = getLessonThemeClass(MEMORIA_ID)

  // Limpia el temporizador si el usuario sale de la página.
  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const selectCard = (card) => {
    if (isLocked || isComplete) return
    if (flippedIds.includes(card.id)) return
    if (matchedPairIds.includes(card.pairId)) return

    const nextFlipped = [...flippedIds, card.id]
    setFlippedIds(nextFlipped)

    // Primera carta de la jugada: solo se voltea.
    if (nextFlipped.length < 2) {
      setFeedback({ tone: 'neutral', message: 'Ahora busca la pareja.' })
      return
    }

    const [first, second] = nextFlipped.map((id) => deck.find((c) => c.id === id))
    const isCorrect = first.pairId === second.pairId

    registrarProgreso({
      actividad: MEMORIA_ID,
      correcto: isCorrect,
      detalle: {
        leccionId: MEMORIA_ID,
        fase: 'parejas',
        ejercicioId: first.pairId,
        parejaElegida: second.pairId,
      },
    })

    if (isCorrect) {
      const completed = matchedPairIds.length + 1 === TOTAL_PAIRS

      setMatchedPairIds((current) => [...current, first.pairId])
      setFlippedIds([])

      if (completed) {
        setIsComplete(true)
        setFeedback({ tone: 'correct', message: '¡Muy bien! Encontraste todas las parejas.' })

        if (!completedRef.current) {
          completedRef.current = true
          registrarLeccionCompletada(MEMORIA_ID)
        }
        return
      }

      setFeedback({ tone: 'correct', message: '¡Correcto! Son pareja. Sigue buscando.' })
      return
    }

    // Incorrecto: se muestran ambas cartas un momento y se vuelven a voltear.
    setIsLocked(true)
    setFeedback({ tone: 'retry', message: 'Esas cartas no son pareja. Vuelve a intentarlo.' })

    timeoutRef.current = setTimeout(() => {
      setFlippedIds([])
      setIsLocked(false)
      setFeedback({ tone: 'neutral', message: INITIAL_MESSAGE })
    }, FLIP_BACK_DELAY)
  }

  const restartGame = () => {
    clearTimeout(timeoutRef.current)
    completedRef.current = false
    setDeck(createDeck())
    setFlippedIds([])
    setMatchedPairIds([])
    setIsLocked(false)
    setIsComplete(false)
    setFeedback({ tone: 'neutral', message: INITIAL_MESSAGE })
  }

  if (isComplete) {
    return (
      <main className={`page memory-page ${themeClass}`} aria-labelledby="memoria-finished-title">
        <Card className="memory-finish-card">
          <Trophy aria-hidden="true" />
          <h1 id="memoria-finished-title">¡Completaste el juego de memoria!</h1>
          <p className="text-instruction">
            Encontraste las {TOTAL_PAIRS} parejas. ¡Excelente trabajo!
          </p>
          <Button icon={RotateCcw} size="large" fullWidth onClick={restartGame}>
            Jugar de nuevo
          </Button>
          <Button
            to={UNIT_PATH}
            variant="secondary"
            icon={ArrowRight}
            iconPosition="right"
            size="large"
            fullWidth
          >
            Volver a la Unidad 4
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main className={`page memory-page ${themeClass}`} aria-labelledby="memoria-title">
      <BackButton label="Volver a la Unidad 4" to={UNIT_PATH} />

      <header className="memory-header">
        <span className="text-ui-label">Unidad 4 · Juego de memoria</span>
        <h1 id="memoria-title">Memoria</h1>
        <p className="text-instruction">
          Encuentra cada imagen con su palabra.
        </p>
      </header>

      <section className="memory-progress" aria-label="Progreso del juego">
        <ProgressBar
          value={matchedPairIds.length}
          max={TOTAL_PAIRS}
          label={`${matchedPairIds.length} de ${TOTAL_PAIRS} parejas`}
        />
      </section>

      <Card className="memory-board-card" aria-labelledby="memoria-board-title">
        <div className="memory-board-card__heading">
          <h2 id="memoria-board-title">Tus cartas</h2>
          <Button variant="secondary" size="small" icon={RotateCcw} onClick={restartGame}>
            Reiniciar
          </Button>
        </div>

        <div className="memory-board" role="group" aria-label="Cartas del juego de memoria">
          {deck.map((card) => (
            <MemoryCard
              key={card.id}
              card={card}
              isFlipped={flippedIds.includes(card.id)}
              isMatched={matchedPairIds.includes(card.pairId)}
              isIncorrect={feedback.tone === 'retry' && flippedIds.includes(card.id)}
              disabled={isLocked || matchedPairIds.includes(card.pairId)}
              onSelect={selectCard}
            />
          ))}
        </div>

        <p className={`memory-feedback memory-feedback--${feedback.tone}`} role="status" aria-live="polite">
          {feedback.tone === 'correct' && <CheckCircle2 aria-hidden="true" />}
          {feedback.message}
        </p>
      </Card>
    </main>
  )
}

export default MemoriaJuegoPage