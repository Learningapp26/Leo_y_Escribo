import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Cat, Check, ChevronRight, CircleHelp, Flag, Lightbulb, MessageCircle, Rat, RotateCcw, SpellCheck, Star, Trophy, Undo2 } from 'lucide-react'

import Button from '../components/common/Button'
import LessonAudioButton from '../components/common/LessonAudioButton'
import BackButton from '../components/navigation/BackButton'
import Alien from '../components/space/Alien'
import { RewardBurst } from '../components/space/Reward'
import { BOARD, GATO_RATON_ID, GLOBO_SLOW, GOAL_INDEX, PLAYERS, RULES, SPELL_FEEDBACK, WIN } from '../data/gatoRatonData'
import { getLessonThemeClass } from '../data/lessonColors'
import { playAudio, stopAudio } from '../lib/audioPlayer'
import { registrarLeccionCompletada, registrarProgreso } from '../lib/progreso'
import '../styles/solar.css'
import '../styles/gato-raton.css'

const UNIT_PATH = '/lecciones/unidad/5'
const STEP_MS = 380
const ROLL_MS = 900

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
const wait = (ms) => new Promise((resolve) => { setTimeout(resolve, reducedMotion() ? Math.min(ms, 120) : ms) })
const rollDie = () => 1 + Math.floor(Math.random() * 6)

// Anillo de 6 × 5 casillas alrededor de la META, en el orden del libro:
// abajo → derecha (sube) → arriba (va a la izquierda) → izquierda (baja).
function tilePosition(index) {
  if (index <= 5) return { row: 5, col: index + 1 }
  if (index <= 9) return { row: 10 - index, col: 6 }
  if (index <= 14) return { row: 1, col: 15 - index }
  return { row: index - 13, col: 1 }
}

function shuffle(list) {
  const result = [...list]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// ── Dado 3D ──────────────────────────────────────────────────────
const PIPS = { 1: [5], 2: [3, 7], 3: [3, 5, 7], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] }
const FACE_ROTATION = { 1: [0, 0], 2: [90, 0], 3: [0, -90], 4: [0, 90], 5: [-90, 0], 6: [0, 180] }

function Die({ value, spins }) {
  const [x, y] = FACE_ROTATION[value]
  return (
    <div className="die" role="img" aria-label={`El dado muestra ${value}`}>
      <div className="die__cube" style={{ transform: `rotateX(${x + spins * 720}deg) rotateY(${y + spins * 720}deg)` }}>
        {[1, 2, 3, 4, 5, 6].map((face) => (
          <span key={face} className={`die__face die__face--${face}`} aria-hidden="true">
            {PIPS[face].map((cell) => <i key={cell} style={{ gridArea: `c${cell}` }} />)}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Casillas y fichas ────────────────────────────────────────────
const TILE_ICON = { start: Flag, task: MessageCircle, spell: SpellCheck, mouse: Rat, cat: Cat }

// Hacia dónde sigue el camino desde cada casilla (la última entra a la META).
function pathDirection(index) {
  if (index <= 4) return 'right'
  if (index <= 8) return 'up'
  if (index <= 13) return 'left'
  if (index <= 16) return 'down'
  return 'right'
}

function BoardTile({ tile, index, players, current }) {
  const { row, col } = tilePosition(index)
  const Icon = TILE_ICON[tile.type]
  const here = players.filter((player) => player.pos === index)
  return (
    <li className={`board-tile board-tile--${tile.type} board-tile--${tile.color ?? 'none'}`}
      style={{ gridRow: row, gridColumn: col }} aria-label={`Casilla ${index}: ${tile.text ?? tile.short}`}>
      {tile.big
        ? <span className="board-tile__letter">{tile.short}</span>
        : <>
          {Icon && <Icon className="board-tile__icon" aria-hidden="true" />}
          <span className="board-tile__label">{tile.short}</span>
        </>}
      <ChevronRight className={`board-tile__arrow board-tile__arrow--${pathDirection(index)}`} aria-hidden="true" />
      {here.length > 0 && <span className="board-tile__tokens">
        {here.map((player) => (
          <span key={`${player.id}-${player.pos}`} className={`token${player.id === current ? ' token--active' : ''}`}
            style={{ '--token': player.color }} aria-label={`Ficha de ${player.name}`}>{player.id}</span>
        ))}
      </span>}
    </li>
  )
}

function Goal({ players }) {
  const here = players.filter((player) => player.pos === GOAL_INDEX)
  return (
    <li className="board-goal" style={{ gridRow: '2 / 5', gridColumn: '2 / 6' }} aria-label="Meta">
      <span className="board-goal__chase" aria-hidden="true">
        <Rat className="board-goal__rat" />
        <Cat className="board-goal__cat" />
      </span>
      <Trophy className="board-goal__trophy" aria-hidden="true" />
      <span className="board-goal__label">META</span>
      {here.length > 0 && <span className="board-tile__tokens">
        {here.map((player) => <span key={player.id} className="token" style={{ '--token': player.color }}>{player.id}</span>)}
      </span>}
    </li>
  )
}

// ── Tarjetas de reto ─────────────────────────────────────────────
function SpellChallenge({ word, onSolved }) {
  const [letters] = useState(() => {
    let mixed = shuffle([...word])
    while (mixed.join('') === word) mixed = shuffle([...word])
    return mixed
  })
  const [picked, setPicked] = useState([])
  const [state, setState] = useState('')
  const answer = picked.map((index) => letters[index]).join('')

  const pick = (index) => {
    if (state === 'correct' || picked.includes(index)) return
    const next = [...picked, index]
    setPicked(next)
    if (next.length < word.length) return
    const correct = next.map((item) => letters[item]).join('') === word
    setState(correct ? 'correct' : 'retry')
    playAudio((correct ? SPELL_FEEDBACK.correct : SPELL_FEEDBACK.retry).src)
    registrarProgreso({ actividad: GATO_RATON_ID, correcto: correct,
      detalle: { leccionId: GATO_RATON_ID, ejercicioId: 'deletrear-grasa' } })
    if (correct) onSolved()
  }

  return (
    <div className="spell">
      <div className="spell__slots" aria-live="polite" aria-label="Tu palabra">
        {[...word].map((_, index) => (
          <span key={index} className={`spell__slot${state ? ` spell__slot--${state}` : ''}`}>{answer[index] ?? ''}</span>
        ))}
      </div>
      <div className="spell__letters">
        {letters.map((letter, index) => (
          <button key={index} type="button" className="spell__letter" disabled={picked.includes(index) || state === 'correct'}
            onClick={() => pick(index)}>{letter}</button>
        ))}
      </div>
      {state === 'retry' && <p className="challenge__feedback challenge__feedback--retry" role="status">Casi. Escucha de nuevo e inténtalo otra vez.</p>}
      {state === 'correct' && <p className="challenge__feedback challenge__feedback--correct" role="status">¡Muy bien! g · r · a · s · a</p>}
      {state !== 'correct' && <div className="challenge__row">
        <Button variant="secondary" icon={Undo2} disabled={!picked.length}
          onClick={() => { setPicked((current) => current.slice(0, -1)); setState('') }}>Quitar la última</Button>
        {state === 'retry' && <Button variant="retry" icon={RotateCcw} onClick={() => { setPicked([]); setState('') }}>Otra vez</Button>}
      </div>}
    </div>
  )
}

function ChallengeCard({ card, player, onDone }) {
  const tile = BOARD[card.index]
  const [showHints, setShowHints] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [solved, setSolved] = useState(false)

  if (card.kind === 'skip') {
    return <Modal tone="cat" title={`${player.name} pierde este turno`}>
      <Cat className="challenge__hero challenge__hero--sleep" aria-hidden="true" />
      <p className="challenge__text">El gato todavía no te deja jugar. ¡En el próximo turno sí!</p>
      <Button size="large" icon={ArrowRight} iconPosition="right" autoFocus onClick={onDone}>Seguir</Button>
    </Modal>
  }

  if (tile.type === 'mouse' || tile.type === 'cat') {
    const Icon = tile.type === 'mouse' ? Rat : Cat
    return <Modal tone={tile.type} title={tile.short}>
      <Icon className={`challenge__hero challenge__hero--${tile.type}`} aria-hidden="true" />
      <p className="challenge__text">{tile.text}</p>
      <LessonAudioButton audio={tile.audio}>Escuchar</LessonAudioButton>
      <Button size="large" icon={ArrowRight} iconPosition="right" autoFocus onClick={onDone}>
        {tile.type === 'mouse' ? 'Avanzar una casilla' : 'Seguir'}
      </Button>
    </Modal>
  }

  return <Modal tone={tile.color} title={`Reto de ${player.name}`}>
    <p className="challenge__text">{tile.text}</p>
    <LessonAudioButton audio={tile.audio}>Escuchar el reto</LessonAudioButton>
    {tile.picture && <img className="challenge__picture" src={tile.picture} alt={tile.short} />}
    {tile.syllables && <>
      <p className="challenge__syllables">{tile.syllables.join(' · ')}</p>
      <LessonAudioButton audio={GLOBO_SLOW}>Escuchar despacio</LessonAudioButton>
    </>}
    {tile.example && <p className="challenge__example">{tile.example}</p>}
    {tile.type === 'spell' && <SpellChallenge word={tile.word} onSolved={() => setSolved(true)} />}

    {tile.hints && (showHints
      ? <ul className="challenge__hints" aria-label="Ideas">
        {tile.hints.map((item) => <li key={item.label}>
          {item.image ? <img src={item.image} alt="" /> : <span className="challenge__hint-dot" aria-hidden="true">{item.label[0]}</span>}
          <span>{item.label}</span>
        </li>)}
      </ul>
      : <Button variant="secondary" icon={Lightbulb} onClick={() => setShowHints(true)}>¿Necesitas una idea?</Button>)}
    {tile.answer && (showAnswer
      ? <p className="challenge__example" role="status">{tile.answer}</p>
      : <Button variant="secondary" icon={Lightbulb} onClick={() => setShowAnswer(true)}>Ver la respuesta</Button>)}

    {(tile.type !== 'spell' || solved) && <Button size="large" icon={Check} autoFocus={tile.type !== 'spell'} onClick={onDone}>
      {tile.type === 'spell' ? '¡Seguir!' : '¡Lo dije!'}
    </Button>}
  </Modal>
}

function Modal({ tone, title, children }) {
  return (
    <div className="challenge-backdrop">
      <section className={`challenge challenge--${tone}`} role="dialog" aria-modal="true" aria-labelledby="challenge-title">
        <h2 id="challenge-title" className="challenge__title">{title}</h2>
        {children}
      </section>
    </div>
  )
}

// ── Página ───────────────────────────────────────────────────────
const newPlayers = (count) => PLAYERS.slice(0, count).map((player) => ({ ...player, pos: 0, skip: false, stars: 0 }))

function GatoRatonPage() {
  const [phase, setPhase] = useState('setup') // setup | order | play | won
  const [players, setPlayers] = useState([])
  const [current, setCurrent] = useState(0)
  const [die, setDie] = useState({ value: 1, spins: 0 })
  const [busy, setBusy] = useState(false)
  const [card, setCard] = useState(null)
  const [orderRolls, setOrderRolls] = useState({})
  const [contenders, setContenders] = useState([])
  const [message, setMessage] = useState('')
  const [showRules, setShowRules] = useState(false)
  const playersRef = useRef(players)
  const completed = useRef(false)
  const alive = useRef(true)
  const themeClass = getLessonThemeClass(GATO_RATON_ID)

  useEffect(() => { playersRef.current = players }, [players])
  useEffect(() => { alive.current = true; return () => { alive.current = false; stopAudio() } }, [])

  const updatePlayer = (index, change) => setPlayers((list) => list.map((player, i) => (i === index ? { ...player, ...change(player) } : player)))

  const spin = async () => {
    const value = rollDie()
    setDie((state) => ({ value, spins: state.spins + 1 }))
    await wait(ROLL_MS)
    return value
  }

  const start = (count) => {
    const list = newPlayers(count)
    setPlayers(list)
    setDie({ value: 1, spins: 0 })
    setCard(null)
    completed.current = false
    if (count === 1) {
      setCurrent(0)
      setPhase('play')
      setMessage('Toca el dado para empezar.')
      return
    }
    setOrderRolls({})
    setContenders(list.map((_, index) => index))
    setCurrent(0)
    setPhase('order')
    setMessage('¿Quién empieza? Cada jugador toca el dado. Empieza quien saque el número mayor.')
  }

  // Ronda para decidir quién empieza; si hay empate, desempatan solo los empatados.
  const rollForOrder = async () => {
    if (busy) return
    setBusy(true)
    const value = await spin()
    if (!alive.current) return
    const rolls = { ...orderRolls, [contenders[current]]: value }
    setOrderRolls(rolls)
    const position = current + 1
    if (position < contenders.length) {
      setCurrent(position)
      setBusy(false)
      return
    }
    const best = Math.max(...contenders.map((index) => rolls[index]))
    const tied = contenders.filter((index) => rolls[index] === best)
    if (tied.length === 1) {
      await wait(700)
      setCurrent(tied[0])
      setPhase('play')
      setMessage(`¡Empieza ${PLAYERS[tied[0]].name}! Toca el dado.`)
    } else {
      setContenders(tied)
      setCurrent(0)
      setMessage(`¡Empate! ${tied.map((index) => PLAYERS[index].name).join(' y ')} vuelven a tirar.`)
    }
    setBusy(false)
  }

  const moveSteps = async (index, steps) => {
    for (let step = 0; step < steps; step += 1) {
      const position = playersRef.current[index].pos
      if (position >= GOAL_INDEX) break
      updatePlayer(index, () => ({ pos: position + 1 }))
      await wait(STEP_MS)
      if (!alive.current) return null
    }
    return playersRef.current[index].pos
  }

  const land = (index, position) => {
    const tile = BOARD[position]
    if (tile.type === 'goal') {
      setPhase('won')
      setBusy(false)
      playAudio(WIN.src)
      if (!completed.current) {
        completed.current = true
        registrarLeccionCompletada(GATO_RATON_ID)
      }
      return
    }
    setCard({ kind: 'tile', index: position })
    if (tile.audio) playAudio(tile.audio.src)
  }

  const nextTurn = (from) => {
    const count = playersRef.current.length
    const next = (from + 1) % count
    setCurrent(next)
    if (playersRef.current[next].skip) {
      updatePlayer(next, () => ({ skip: false }))
      setCard({ kind: 'skip' })
      return
    }
    setBusy(false)
    setMessage(`Turno de ${playersRef.current[next].name}. Toca el dado.`)
  }

  const roll = async () => {
    if (busy || card) return
    setBusy(true)
    setMessage('')
    const value = await spin()
    if (!alive.current) return
    setMessage(`${playersRef.current[current].name} sacó ${value}.`)
    const position = await moveSteps(current, value)
    if (position !== null) land(current, position)
  }

  const finishCard = async () => {
    const shown = card
    setCard(null)
    stopAudio()
    if (shown.kind === 'skip') {
      nextTurn(current)
      return
    }
    const tile = BOARD[shown.index]
    if (tile.type === 'mouse') {
      const position = await moveSteps(current, 1)
      if (position !== null) land(current, position)
      return
    }
    if (tile.type === 'cat') updatePlayer(current, () => ({ skip: true }))
    if (tile.type === 'task' || tile.type === 'spell') updatePlayer(current, (player) => ({ stars: player.stars + 1 }))
    nextTurn(current)
  }

  const player = players[phase === 'order' ? contenders[current] : current]

  if (phase === 'won') {
    const winner = players[current]
    return (
      <main className={`page gato-page ${themeClass}`} aria-labelledby="gato-won-title">
        <section className="gato-won">
          <h1 id="gato-won-title" className="visually-hidden">¡Llegaste a la meta!</h1>
          <RewardBurst lessonId={GATO_RATON_ID} title={players.length > 1 ? `¡${winner.name} llegó a la meta!` : '¡Llegaste a la meta!'} />
          {players.length > 1 && <ul className="gato-won__scores" aria-label="Retos cumplidos">
            {players.map((item) => <li key={item.id} style={{ '--token': item.color }}>
              <span className="token">{item.id}</span>{item.name}<span className="gato-won__stars"><Star aria-hidden="true" />{item.stars}</span>
            </li>)}
          </ul>}
          <div className="gato-won__actions">
            <Button size="large" icon={RotateCcw} onClick={() => start(players.length)}>Jugar de nuevo</Button>
            <Button to={UNIT_PATH} variant="secondary" size="large" icon={ArrowRight} iconPosition="right">Volver a la Unidad 5</Button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className={`page gato-page ${themeClass}`} aria-labelledby="gato-title">
      <header className="space-header">
        <BackButton label="Volver a la Unidad 5" to={UNIT_PATH} />
        <div>
          <span className="space-header__label">Unidad 5 · Juego final</span>
          <h1 id="gato-title" className="space-header__title">¡El gato y el ratón!</h1>
        </div>
        <span className="space-header__end">
          <Button variant="secondary" icon={CircleHelp} onClick={() => { setShowRules(true); playAudio(RULES.src) }}>¿Cómo jugar?</Button>
        </span>
      </header>

      {phase === 'setup' ? (
        <section className="gato-setup" aria-labelledby="setup-title">
          <h2 id="setup-title">¿Cuántos van a jugar?</h2>
          <p className="gato-setup__hint">Elige con cuántos compañeros juegas. Cada uno será un marcianito.</p>
          <div className="gato-setup__options">
            {[1, 2, 3, 4].map((count) => (
              <button key={count} type="button" className="gato-setup__option" onClick={() => start(count)}>
                <span className="gato-setup__aliens" aria-hidden="true">
                  {PLAYERS.slice(0, count).map((item) => <Alien key={item.id} color={item.color} scale={0.42} mood="happy" />)}
                </span>
                <span className="gato-setup__count">{count === 1 ? 'Yo solo' : `${count} jugadores`}</span>
              </button>
            ))}
          </div>
          <LessonAudioButton audio={RULES}>Escuchar cómo se juega</LessonAudioButton>
        </section>
      ) : (
        <div className="gato-layout">
          <ol className="board" aria-label="Tablero del gato y el ratón">
            {BOARD.slice(0, GOAL_INDEX).map((tile, index) => (
              <BoardTile key={tile.id} tile={tile} index={index} players={players} current={phase === 'play' ? player?.id : null} />
            ))}
            <Goal players={players} />
          </ol>

          <aside className="gato-panel" aria-label="Turno y dado">
            {player && <div className="gato-panel__turn" style={{ '--token': player.color }}>
              <Alien color={player.color} scale={0.55} mood={busy ? 'talking' : 'happy'} label={player.name} />
              <div>
                <span className="gato-panel__label">{phase === 'order' ? '¿Quién empieza?' : 'Es el turno de'}</span>
                <strong className="gato-panel__name">{player.name}</strong>
              </div>
            </div>}

            <Die value={die.value} spins={die.spins} />
            <Button size="large" fullWidth disabled={busy || !!card} onClick={phase === 'order' ? rollForOrder : roll}>
              {busy && !card ? '¡Rodando!' : 'Tocar el dado'}
            </Button>
            <p className="gato-panel__message" role="status" aria-live="polite">{message}</p>

            {players.length > 1 && <ul className="gato-panel__players">
              {players.map((item, index) => <li key={item.id} className={item.id === player?.id ? 'is-active' : ''} style={{ '--token': item.color }}>
                <span className="token">{item.id}</span>
                <span>{item.name}</span>
                {phase === 'order' && orderRolls[index] !== undefined && <span className="gato-panel__roll">{orderRolls[index]}</span>}
                {phase === 'play' && <span className="gato-panel__stars"><Star aria-hidden="true" />{item.stars}</span>}
                {item.skip && <Cat className="gato-panel__skip" aria-label="Pierde el próximo turno" />}
              </li>)}
            </ul>}
          </aside>
        </div>
      )}

      {card && <ChallengeCard key={`${card.kind}-${card.index}-${current}`} card={card} player={players[current]} onDone={finishCard} />}

      {showRules && <Modal tone="sky" title="¿Cómo jugar?">
        <p className="challenge__text challenge__text--rules">{RULES.text}</p>
        <LessonAudioButton audio={RULES}>Escuchar</LessonAudioButton>
        <Button size="large" icon={Check} autoFocus onClick={() => { setShowRules(false); stopAudio() }}>¡Entendido!</Button>
      </Modal>}
    </main>
  )
}

export default GatoRatonPage
