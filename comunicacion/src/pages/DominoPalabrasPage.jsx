import { useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles, Trophy } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  DOMINO_PALABRAS_ID,
  DOMINO_PALABRAS_TILES,
  DOMINO_START_TILE,
  shuffleDominoTiles,
} from '../data/dominoPalabrasData'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/domino-palabras.css'

function createGameState() {
  return {
    placedTiles: [DOMINO_START_TILE],
    availableTiles: shuffleDominoTiles(
      DOMINO_PALABRAS_TILES.filter((tile) => tile.id !== DOMINO_START_TILE.id),
    ),
  }
}

function DominoTile({ tile, interactive = false, isIncorrect = false, onSelect }) {
  const content = (
    <>
      <span className="domino-tile__image-side">
        <img src={tile.image} alt={tile.imageAlt} />
      </span>
      <span className="domino-tile__word-side">{tile.word}</span>
    </>
  )

  if (!interactive) {
    return <article className="domino-tile domino-tile--placed">{content}</article>
  }

  return (
    <button
      className={[
        'domino-tile',
        'domino-tile--available',
        isIncorrect ? 'domino-tile--incorrect' : '',
      ].filter(Boolean).join(' ')}
      type="button"
      aria-label={`Colocar ficha: imagen de ${tile.imageAlt.toLowerCase()} y palabra ${tile.word}`}
      onClick={() => onSelect(tile)}
    >
      {content}
    </button>
  )
}

function DominoPalabrasPage() {
  const [gameState, setGameState] = useState(createGameState)
  const [feedback, setFeedback] = useState({
    tone: 'neutral',
    message: 'Elige la ficha cuya imagen corresponde a la última palabra de la cadena.',
  })
  const [incorrectTileId, setIncorrectTileId] = useState(null)
  const [isComplete, setIsComplete] = useState(false)
  const completedRef = useRef(false)
  const themeClass = getLessonThemeClass(DOMINO_PALABRAS_ID)
  const { placedTiles, availableTiles } = gameState
  const expectedWord = placedTiles.at(-1).word

  const selectTile = (tile) => {
    if (isComplete) return

    const isCorrect = tile.imageId === expectedWord
    setIncorrectTileId(isCorrect ? null : tile.id)

    registrarProgreso({
      actividad: DOMINO_PALABRAS_ID,
      correcto: isCorrect,
      detalle: {
        leccionId: DOMINO_PALABRAS_ID,
        fase: 'cadena',
        ejercicioId: tile.id,
        palabraEsperada: expectedWord,
      },
    })

    if (!isCorrect) {
      setFeedback({
        tone: 'retry',
        message: `Busca la imagen de ${expectedWord} y vuelve a intentarlo.`,
      })
      return
    }

    const completed = placedTiles.length + 1 === DOMINO_PALABRAS_TILES.length
    setGameState((current) => ({
      placedTiles: [...current.placedTiles, tile],
      availableTiles: current.availableTiles.filter((availableTile) => availableTile.id !== tile.id),
    }))

    if (completed) {
      setIsComplete(true)
      setFeedback({
        tone: 'correct',
        message: '¡Muy bien! Completaste toda la cadena de dominó.',
      })

      if (!completedRef.current) {
        completedRef.current = true
        registrarLeccionCompletada(DOMINO_PALABRAS_ID)
      }
      return
    }

    setFeedback({
      tone: 'correct',
      message: `¡Muy bien! Ahora une la palabra ${tile.word} con su imagen.`,
    })
  }

  const restartGame = () => {
    completedRef.current = false
    setGameState(createGameState())
    setIncorrectTileId(null)
    setIsComplete(false)
    setFeedback({
      tone: 'neutral',
      message: 'Elige la ficha cuya imagen corresponde a la última palabra de la cadena.',
    })
  }

  if (isComplete) {
    return (
      <main className={`page domino-page ${themeClass}`} aria-labelledby="domino-finished-title">
        <Card className="domino-finish-card">
          <Trophy aria-hidden="true" />
          <h1 id="domino-finished-title">¡Completaste el dominó!</h1>
          <p className="text-instruction">
            Formaste una cadena con las 10 fichas. ¡Excelente lectura!
          </p>
          <Button icon={RotateCcw} size="large" fullWidth onClick={restartGame}>
            Jugar de nuevo
          </Button>
          <Button to="/lecciones/unidad/3" variant="secondary" icon={ArrowRight} iconPosition="right" size="large" fullWidth>
            Volver a la Unidad 3
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main className={`page domino-page ${themeClass}`} aria-labelledby="domino-title">
      <BackButton label="Volver a la Unidad 3" to="/lecciones/unidad/3" />

      <header className="domino-header">
        <span className="text-ui-label">Unidad 3 · Juego de palabras</span>
        <h1 id="domino-title">Dominó de palabras</h1>
        <p className="text-instruction">Une cada palabra con la imagen que le corresponde.</p>
      </header>

      <section className="domino-progress" aria-label="Progreso del dominó">
        <ProgressBar value={placedTiles.length} max={DOMINO_PALABRAS_TILES.length} label={`${placedTiles.length} de ${DOMINO_PALABRAS_TILES.length} fichas`} />
      </section>

      <Card className="domino-chain-card" aria-labelledby="domino-chain-title">
        <div className="domino-chain-card__heading">
          <Sparkles aria-hidden="true" />
          <div>
            <span className="text-ui-label">Tu cadena</span>
            <h2 id="domino-chain-title">La última palabra es: {expectedWord}</h2>
          </div>
        </div>
        <div className="domino-chain" aria-label={`Cadena con ${placedTiles.length} fichas`}>
          {placedTiles.map((tile) => <DominoTile key={tile.id} tile={tile} />)}
        </div>
      </Card>

      <Card className="domino-bank-card" aria-labelledby="domino-bank-title">
        <div className="domino-bank-card__heading">
          <div>
            <span className="text-ui-label">Fichas disponibles</span>
            <h2 id="domino-bank-title">Toca la imagen de {expectedWord}</h2>
          </div>
          <Button variant="secondary" size="small" icon={RotateCcw} onClick={restartGame}>
            Reiniciar
          </Button>
        </div>

        <div className="domino-bank" role="group" aria-label="Fichas disponibles para colocar">
          {availableTiles.map((tile) => (
            <DominoTile
              key={tile.id}
              tile={tile}
              interactive
              isIncorrect={incorrectTileId === tile.id}
              onSelect={selectTile}
            />
          ))}
        </div>

        <p className={`domino-feedback domino-feedback--${feedback.tone}`} role="status" aria-live="polite">
          {feedback.tone === 'correct' && <CheckCircle2 aria-hidden="true" />}
          {feedback.message}
        </p>
      </Card>
    </main>
  )
}

export default DominoPalabrasPage
