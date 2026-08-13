import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Volume2 } from 'lucide-react'

import Button from '../components/common/Button'
import Card from '../components/common/Card'
import BackButton from '../components/navigation/BackButton'
import ProgressBar from '../components/progress/ProgressBar'
import { getLessonThemeClass } from '../data/lessonColors'
import {
  dImagePool,
  dPairInstructionAudio,
  dSelectionInstructionAudio,
  dSoundIntro,
  dSoundSelectionAnswerIds,
  dSoundPairMatching,
  dSyllableHearing,
  dSyllableHearingInstructionAudio,
} from '../data/dActivities'
import { playAudio } from '../lib/audioPlayer'
import '../styles/selection.css'
import '../styles/syllables.css'

const PHASES = ['sonido', 'seleccion', 'silabas', 'parejas']

function playIfAvailable(audio) {
  if (audio) playAudio(audio)
}

function selectionClass(isSelected, feedback) {
  if (!isSelected || !feedback) return isSelected ? 'selection-button--selected' : ''
  return feedback === 'correct' ? 'selection-button--correct' : 'selection-button--incorrect'
}

function ActividadDImagenesPage() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [selectedIds, setSelectedIds] = useState([])
  const [selectionFeedback, setSelectionFeedback] = useState('')
  const [syllableIndex, setSyllableIndex] = useState(0)
  const [selectedSyllables, setSelectedSyllables] = useState([])
  const [syllableFeedback, setSyllableFeedback] = useState('')
  const [firstPick, setFirstPick] = useState(null)
  const [secondPick, setSecondPick] = useState(null)
  const [matchedIds, setMatchedIds] = useState([])
  const [pairFeedback, setPairFeedback] = useState('')

  const phase = PHASES[phaseIndex]
  const themeClass = getLessonThemeClass('d')
  const syllableItem = dSyllableHearing[syllableIndex]
  const isPairsFinished = matchedIds.length === dSoundPairMatching.length

  const toggleSelected = (item) => {
    if (selectionFeedback === 'correct') return
    playIfAvailable(item.audio)
    setSelectionFeedback('')
    setSelectedIds((current) =>
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id],
    )
  }

  const checkSelection = () => {
    const isCorrect =
      selectedIds.length === dSoundSelectionAnswerIds.length &&
      dSoundSelectionAnswerIds.every((id) => selectedIds.includes(id))
    setSelectionFeedback(isCorrect ? 'correct' : 'retry')
  }

  const toggleSyllable = (syllable) => {
    if (syllableFeedback === 'correct') return
    setSyllableFeedback('')
    setSelectedSyllables((current) =>
      current.includes(syllable)
        ? current.filter((item) => item !== syllable)
        : [...current, syllable],
    )
  }

  const checkSyllable = () => {
    const isCorrect =
      selectedSyllables.length === syllableItem.answers.length &&
      selectedSyllables.every((item) => syllableItem.answers.includes(item))
    setSyllableFeedback(isCorrect ? 'correct' : 'retry')
  }

  const nextSyllable = () => {
    setSelectedSyllables([])
    setSyllableFeedback('')
    if (syllableIndex === dSyllableHearing.length - 1) {
      setPhaseIndex((current) => current + 1)
      return
    }
    setSyllableIndex((current) => current + 1)
  }

  const pickCard = (item) => {
    if (pairFeedback === 'retry' || matchedIds.includes(item.id)) return
    playIfAvailable(item.audio)
    if (firstPick?.id === item.id) {
      setFirstPick(null)
      return
    }
    if (!firstPick) {
      setFirstPick(item)
      return
    }
    if (!secondPick) setSecondPick(item)
  }

  const checkPair = () => {
    if (!firstPick || !secondPick) return
    if (firstPick.pairId === secondPick.pairId) {
      setMatchedIds((current) => [...current, firstPick.id, secondPick.id])
      setPairFeedback('correct')
      return
    }
    setPairFeedback('retry')
  }

  const continuePair = () => {
    setFirstPick(null)
    setSecondPick(null)
    setPairFeedback('')
  }

  return (
    <main className={`page selection-page ${themeClass}`} aria-labelledby="d-imagenes-title">
      <BackButton label="Volver a la lección" to="/lecciones/d" />
      <header className="text-center">
        <span className="text-ui-label">Actividad 1</span>
        <h1 id="d-imagenes-title">Reconocemos el sonido D</h1>
      </header>

      <ProgressBar value={phaseIndex + 1} max={PHASES.length} label={`Parte ${phaseIndex + 1} de ${PHASES.length}`} />

      {phase === 'sonido' && (
        <Card className="selection-card">
          <p className="text-instruction">Escucha el sonido de la letra D y la palabra dedo.</p>
          <Button variant="audio" icon={Volume2} onClick={() => playIfAvailable(dSoundIntro.instructionAudio)}>
            Escuchar instrucción
          </Button>

          <div className="selection-options">
            <span className="text-letter">D</span>
            <span className="text-letter">d</span>
          </div>
          <img className="selection-image selection-image--featured" src={dSoundIntro.mainWord.image} alt={dSoundIntro.mainWord.name} />
          <span className="text-word">{dSoundIntro.mainWord.name}</span>
          <Button variant="audio" size="large" icon={Volume2} onClick={() => playIfAvailable(dSoundIntro.letterAudio)}>
            Escuchar el sonido /d/
          </Button>
          <Button variant="audio" size="large" icon={Volume2} onClick={() => playIfAvailable(dSoundIntro.mainWord.audio)}>
            Escuchar dedo
          </Button>
          <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={() => setPhaseIndex(1)}>
            Continuar
          </Button>
        </Card>
      )}

      {phase === 'seleccion' && (
        <Card className="selection-card">
          <p className="text-instruction">Toca las imágenes cuyo nombre comienza con el sonido /d/.</p>
          <Button variant="audio" icon={Volume2} onClick={() => playIfAvailable(dSelectionInstructionAudio)}>
            Escuchar instrucción
          </Button>

          <div className="selection-options">
            {dImagePool.map((item) => {
              const selected = selectedIds.includes(item.id)
              return (
                <button className={['selection-button', selectionClass(selected, selectionFeedback)].filter(Boolean).join(' ')} type="button" key={item.id} aria-pressed={selected} onClick={() => toggleSelected(item)}>
                  <img className="selection-image" src={item.image} alt={item.name} />
                  <span className="selection-word">{item.name}</span>
                </button>
              )
            })}
          </div>
          {selectionFeedback === 'correct' && <p className="selection-feedback selection-feedback--correct" role="status">¡Muy bien! Todas empiezan con /d/.</p>}
          {selectionFeedback === 'retry' && <p className="selection-feedback selection-feedback--retry" role="status">Intenta nuevamente.</p>}
          {selectionFeedback !== 'correct' && <Button icon={Check} size="large" fullWidth disabled={selectedIds.length === 0} onClick={checkSelection}>Comprobar selección</Button>}
          {selectionFeedback === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSelectedIds([]); setSelectionFeedback('') }}>Intentar nuevamente</Button>}
          {selectionFeedback === 'correct' && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={() => setPhaseIndex(2)}>Siguiente parte</Button>}
        </Card>
      )}

      {phase === 'silabas' && (
        <Card className="syllables-card">
          <p className="text-instruction">¿En qué sílaba escuchas /d/?</p>
          <Button variant="audio" icon={Volume2} onClick={() => playIfAvailable(dSyllableHearingInstructionAudio)}>
            Escuchar instrucción
          </Button>

          <img className="selection-image selection-image--featured" src={syllableItem.image} alt={syllableItem.word} />
          <span className="text-word">{syllableItem.word}</span>
          <Button variant="audio" icon={Volume2} onClick={() => playIfAvailable(syllableItem.audio)}>Escuchar palabra</Button>
          <div className="syllables-options">
            {syllableItem.syllables.map((syllable) => {
              const selected = selectedSyllables.includes(syllable)
              return (
                <button className={['syllable-button', selectionClass(selected, syllableFeedback)].filter(Boolean).join(' ')} type="button" key={syllable} aria-pressed={selected} onClick={() => toggleSyllable(syllable)}>
                  {syllable}
                </button>
              )
            })}
          </div>
          {syllableFeedback === 'correct' && <p className="selection-feedback selection-feedback--correct" role="status">¡Correcto!</p>}
          {syllableFeedback === 'retry' && <p className="selection-feedback selection-feedback--retry" role="status">Intenta nuevamente.</p>}
          {syllableFeedback !== 'correct' && <Button icon={Check} size="large" fullWidth disabled={selectedSyllables.length === 0} onClick={checkSyllable}>Comprobar</Button>}
          {syllableFeedback === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={() => { setSelectedSyllables([]); setSyllableFeedback('') }}>Intentar nuevamente</Button>}
          {syllableFeedback === 'correct' && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={nextSyllable}>{syllableIndex === dSyllableHearing.length - 1 ? 'Siguiente parte' : 'Siguiente palabra'}</Button>}
        </Card>
      )}

      {phase === 'parejas' && (
        <Card className="selection-card">
          <p className="text-instruction">Relaciona palabras que empiezan con la misma sílaba.</p>
          <Button variant="audio" icon={Volume2} onClick={() => playIfAvailable(dPairInstructionAudio)}>
            Escuchar instrucción
          </Button>

          <div className="selection-options selection-options--pairs">
            {dSoundPairMatching.filter((item) => !matchedIds.includes(item.id)).map((item) => {
              const selected = firstPick?.id === item.id || secondPick?.id === item.id
              return (
                <button className={['selection-button', selected ? 'selection-button--selected' : ''].filter(Boolean).join(' ')} type="button" key={item.id} aria-pressed={selected} onClick={() => pickCard(item)}>
                  <img className="selection-image" src={item.image} alt={item.name} />
                  <span className="selection-word">{item.name}</span>
                </button>
              )
            })}
          </div>
          {pairFeedback === 'correct' && !isPairsFinished && <p className="selection-feedback selection-feedback--correct" role="status">¡Correcto! Empiezan con la misma sílaba.</p>}
          {pairFeedback === 'retry' && <p className="selection-feedback selection-feedback--retry" role="status">Intenta nuevamente.</p>}
          {!pairFeedback && <Button icon={Check} size="large" fullWidth disabled={!firstPick || !secondPick} onClick={checkPair}>Comprobar pareja</Button>}
          {pairFeedback === 'retry' && <Button variant="retry" icon={RotateCcw} size="large" fullWidth onClick={continuePair}>Intentar nuevamente</Button>}
          {pairFeedback === 'correct' && !isPairsFinished && <Button icon={ArrowRight} iconPosition="right" size="large" fullWidth onClick={continuePair}>Buscar otra pareja</Button>}
          {isPairsFinished && <Button to="/actividad/d-silabas" icon={ArrowRight} iconPosition="right" size="large" fullWidth>Ir a la siguiente actividad</Button>}
        </Card>
      )}
    </main>
  )
}

export default ActividadDImagenesPage
