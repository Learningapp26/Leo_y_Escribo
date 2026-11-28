import { togglePairSelection, isDistinctPair } from '../lib/pairSelection'
import ActivityFeedback from '../components/common/ActivityFeedback'
import ListeningWords from '../components/lessons/ListeningWords'
import SoundIntroduction, { WordSound } from '../components/lessons/SoundIntroduction'
import BookLessonImage from '../components/lessons/BookLessonImage'
import { useRef, useState } from 'react'
import { ArrowRight, Check, RotateCcw } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import LessonAudioButton from '../components/common/LessonAudioButton'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  asAudio,
  nFinalPairMatching,
  nInitialPairMatching,
  nInitialSelection,
  nSoundIntro,
} from '../data/nData'
import { playAudio } from '../lib/audioPlayer'
import { registrarProgreso } from '../lib/progreso'
import '../styles/selection.css'

const PHASES = ['sonido', 'seleccion', 'parejas-inicio', 'parejas-final']

function playIfAvailable(audio) {
  if (audio) playAudio(audio)
}

function Instruction({ text, audio }) {
  return (
    <div className="selection-instructions">
      <p className="text-instruction">{text}</p>
      <LessonAudioButton audio={asAudio(audio)}>Escuchar instrucción</LessonAudioButton>
    </div>
  )
}

// Fase 2: tocar las imágenes que empiezan con /n/
function InitialSelection({ onNext }) {
  const { items, instructionAudio } = nInitialSelection
  const targetIds = items.filter((item) => item.startsWithN).map((item) => item.id)
  const [selectedIds, setSelectedIds] = useState([])
  const [feedback, setFeedback] = useState('')
  const answerLock = useRef(false)

  const toggle = (item) => {
    if (feedback) return
    playIfAvailable(item.audio)
    setSelectedIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const check = () => {
    if (!selectedIds.length || answerLock.current) return
    answerLock.current = true
    const isCorrect =
      selectedIds.length === targetIds.length &&
      selectedIds.every((id) => targetIds.includes(id))

    setFeedback(isCorrect ? 'correct' : 'retry')

    registrarProgreso({
      actividad: 'n-imagenes',
      correcto: isCorrect,
      detalle: { leccionId: 'n', fase: 'seleccion' },
    })
  }

  return (
    <Card className="selection-card">
      <Instruction
        text="Toca las imágenes cuyo nombre empieza con el mismo sonido que nariz."
        audio={instructionAudio}
      />

      <div className="selection-options">
        {items.map((item) => {
          const selected = selectedIds.includes(item.id)
          const stateClass = selected && feedback
            ? feedback === 'correct' ? 'selection-button--correct' : 'selection-button--incorrect'
            : selected ? 'selection-button--selected' : ''

          return (
            <button
              className={['selection-button', stateClass].filter(Boolean).join(' ')}
              type="button"
              key={item.id}
              aria-pressed={selected}
              disabled={Boolean(feedback)}
              onClick={() => toggle(item)}
            >
              <BookLessonImage className="selection-image" src={item.image} alt={item.name} hideLabel key={item.image} />
              <span className="selection-word">{item.name}</span>
            </button>
          )
        })}
      </div>

      {feedback === 'correct' && (
        <ActivityFeedback correct message={<>¡Muy bien! Todas empiezan con el sonido /n/.</>} />
      )}
      {feedback === 'retry' && (
        <ActivityFeedback correct={false} message={<>Revisa otra vez. Algunas imágenes no empiezan con /n/.</>} />
      )}

      {!feedback && (
        <Button icon={Check} size="large" fullWidth disabled={selectedIds.length === 0} onClick={check}>
          Comprobar selección
        </Button>
      )}
      {feedback === 'retry' && (
        <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { answerLock.current = false; setSelectedIds([]); setFeedback('') }}>
          Volver a intentar
        </Button>
      )}
      {feedback === 'correct' && (
        <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={onNext}>
          Siguiente parte
        </Button>
      )}
    </Card>
  )
}

// Fases 3 y 4: elegir dos imágenes que formen pareja
function PairMatching({
  items, instruction, instructionAudio, isValidPair, total, fase,
  okText, badText, hideMatched = false, finishLabel, onFinish, finishTo,
}) {
  const [first, setFirst] = useState(null)
  const [second, setSecond] = useState(null)
  const [matchedIds, setMatchedIds] = useState([])
  const [feedback, setFeedback] = useState('')
  const answerLock = useRef(false)
  const finished = matchedIds.length >= total

  const pick = (item) => {
    if (feedback || matchedIds.includes(item.id)) return
    playIfAvailable(item.audio)
    const [nextFirst = null, nextSecond = null] = togglePairSelection([first, second], item)
    setFirst(nextFirst)
    setSecond(nextSecond)
  }

  const check = () => {
    if (answerLock.current || feedback || !isDistinctPair(first, second, matchedIds)) return
    answerLock.current = true
    const isCorrect = isValidPair(first, second)

    registrarProgreso({
      actividad: 'n-imagenes',
      correcto: isCorrect,
      detalle: { leccionId: 'n', fase },
    })

    if (isCorrect) {
      setMatchedIds((current) => [...current, first.id, second.id])
      setFeedback('correct')
      return
    }
    setFeedback('retry')
  }

  const reset = () => {
    answerLock.current = false
    setFirst(null)
    setSecond(null)
    setFeedback('')
  }

  const visible = hideMatched ? items.filter((item) => !matchedIds.includes(item.id)) : items

  return (
    <Card className="selection-card">
      <Instruction text={instruction} audio={instructionAudio} />

      <div className="selection-options">
        {visible.map((item) => {
          const selected = first?.id === item.id || second?.id === item.id
          const matched = matchedIds.includes(item.id)
          return (
            <button
              className={[
                'selection-button',
                selected ? 'selection-button--selected' : '',
                matched ? 'selection-button--correct' : '',
              ].filter(Boolean).join(' ')}
              type="button"
              key={item.id}
              disabled={Boolean(feedback) || matched}
              aria-pressed={selected}
              onClick={() => pick(item)}
            >
              <BookLessonImage className="selection-image" src={item.image} alt={item.name} hideLabel key={item.image} />
              <span className="selection-word">{item.name}</span>
            </button>
          )
        })}
      </div>

      {feedback === 'correct' && <ActivityFeedback correct message={<>{okText}</>} />}
      {feedback === 'retry' && <ActivityFeedback correct={false} message={<>{badText}</>} />}

      {!feedback && !finished && (
        <Button icon={Check} size="large" fullWidth disabled={!isDistinctPair(first, second, matchedIds)} onClick={check}>
          Comprobar pareja
        </Button>
      )}
      {feedback === 'retry' && (
        <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={reset}>
          Volver a intentar
        </Button>
      )}
      {feedback === 'correct' && !finished && (
        <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={reset}>
          Buscar otra pareja
        </Button>
      )}
      {finished && finishTo && (
        <Button to={finishTo} icon={ArrowRight} iconPosition="right" size="large" fullWidth>
          {finishLabel}
        </Button>
      )}
      {finished && !finishTo && (
        <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={onFinish}>
          {finishLabel}
        </Button>
      )}
    </Card>
  )
}

function ActividadNImagenesPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('n')
  const goToNextPhase = () => setPhaseIndex((current) => current + 1)

  const initialTotal = nInitialPairMatching.items.filter((item) => item.startsWithN).length

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="n-imagenes-title">
      <BackButton label="Volver a la lección" to="/lecciones/n" />

      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>
        <h1 id="n-imagenes-title">Reconocemos el sonido N</h1>
      </header>

      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />

      {phase === 'sonido' && (
        <Card className="selection-card">
          <Instruction
            text="Escucha el sonido de la letra N y la palabra nariz."
            audio={nSoundIntro.instructionAudio}
          />

          <SoundIntroduction
            sounds={[{ letter: 'n', audioSrc: nSoundIntro.soundAudio }]}
          />
          <BookLessonImage key={nSoundIntro.mainWord.image} src={nSoundIntro.mainWord.image} alt={nSoundIntro.mainWord.name} featured hideLabel />
          <WordSound word={nSoundIntro.mainWord.name} audioSrc={nSoundIntro.mainWord.audio} />

          <ListeningWords items={nSoundIntro.exampleWords} letter="N" />

          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={goToNextPhase}>
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'seleccion' && <InitialSelection onNext={goToNextPhase} />}

      {phase === 'parejas-inicio' && (
        <PairMatching
          key="parejas-inicio"
          items={nInitialPairMatching.items}
          instruction="Selecciona dos imágenes que empiecen con el mismo sonido."
          instructionAudio={nInitialPairMatching.instructionAudio}
          isValidPair={(a, b) => a.startsWithN && b.startsWithN}
          total={initialTotal}
          fase="parejas-inicio"
          okText="¡Correcto! Las dos empiezan con /n/."
          badText="Esas imágenes no empiezan con el mismo sonido."
          finishLabel="Siguiente parte"
          onFinish={goToNextPhase}
        />
      )}

      {phase === 'parejas-final' && (
        <PairMatching
          key="parejas-final"
          items={nFinalPairMatching.items}
          instruction="Observa los dibujos. Fíjate en el sonido final y une los que riman, como camión y limón."
          instructionAudio={nFinalPairMatching.instructionAudio}
          isValidPair={(a, b) => a.pairId === b.pairId}
          total={nFinalPairMatching.items.length}
          fase="parejas-final"
          okText="¡Correcto! Terminan igual."
          badText="Esas palabras no terminan igual. Inténtalo de nuevo."
          hideMatched
          finishLabel="Ir a la siguiente actividad"
          finishTo="/actividad/n-silabas"
        />
      )}
    </main>
  )
}

export default ActividadNImagenesPage
